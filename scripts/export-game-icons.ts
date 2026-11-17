/**
 * Extracts a small set of named icons from the game client archive.
 * A maintainer runs `npm run game-icons` when the archive is on disk.
 * The PNGs are committed, so CI and other apps never need the archive.
 *
 * FieldMap_Hex.g1t holds one sprite per texture, format 0x36: 16-bit RGBA4444
 * with red in the high nibble and alpha in the low nibble.
 */
import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { deflateSync } from 'node:zlib';
import { fileURLToPath } from 'node:url';

const PACKAGE_NAME = 'com.square_enix.android_googleplay.DFFOperaOmnian';

const ICONS: { file: string; index: number; name: string }[] = [
  { file: 'FieldMap_Hex.g1t.dz', index: 8, name: 'cutscene' },
  { file: 'FieldMap_Hex.g1t.dz', index: 22, name: 'battle' },
  { file: 'FieldMap_Hex.g1t.dz', index: 6, name: 'treasure' },
  { file: 'FieldMap_Hex.g1t.dz', index: 10, name: 'move' },
  { file: 'FieldMap_Hex.g1t.dz', index: 9, name: 'portal' },
  { file: 'FieldMap_Hex.g1t.dz', index: 33, name: 'start' },
  { file: 'FieldMap_Hex.g1t.dz', index: 34, name: 'goal' },
];

function repoRoot(): string {
  return resolve(fileURLToPath(new URL('..', import.meta.url)));
}

function archiveRoot(): string {
  return resolve(process.env.DFFOO_GAME_DIR ?? resolve(repoRoot(), '..', 'dffoogg-game'), 'archive');
}

function unpackerRoot(): string {
  return process.env.DFFOO_UNPACKER ?? resolve(repoRoot(), 'node_modules', 'oo_tool');
}

function indexAssets(): Map<string, string> {
  const directory = resolve(archiveRoot(), 'sdcard', 'Android', 'data', PACKAGE_NAME, 'files');
  if (!existsSync(directory)) throw new Error(`downloaded files are not in ${directory}`);
  const found = new Map<string, string>();
  const stack = [directory];
  while (stack.length) {
    const current = stack.pop()!;
    for (const entry of readdirSync(current, { withFileTypes: true })) {
      const path = join(current, entry.name);
      if (entry.isDirectory()) stack.push(path);
      else found.set(entry.name.toLowerCase(), path);
    }
  }
  return found;
}

function unpack(source: string, name: string): Buffer {
  const cache = join(tmpdir(), 'dffoo-game-icons');
  mkdirSync(cache, { recursive: true });
  const unpacked = join(cache, name.replace(/\.dz$/i, ''));
  if (!existsSync(unpacked)) {
    const copy = join(cache, name);
    writeFileSync(copy, readFileSync(source));
    const unpacker = unpackerRoot();
    const result = spawnSync(process.execPath, [join(unpacker, 'build', 'lib', 'app.cjs'), '-u', copy], {
      cwd: join(unpacker, 'dist'),
      encoding: 'utf8',
    });
    if (result.status !== 0 || !existsSync(unpacked)) {
      throw new Error(result.stderr || result.stdout || `could not unpack ${name}`);
    }
  }
  return readFileSync(unpacked);
}

function expand(nibble: number): number {
  return nibble * 17;
}

function decodeTexture(g1t: Buffer, index: number): { rgba: Buffer; width: number; height: number } {
  if (g1t.subarray(0, 4).toString('latin1') !== 'GT1G') throw new Error('not a g1t');
  const table = g1t.readUInt32LE(0x0c);
  const count = g1t.readUInt32LE(0x10);
  if (index >= count) throw new Error(`texture ${index} is past ${count}`);
  const start = table + g1t.readUInt32LE(table + index * 4);
  const format = g1t[start + 1];
  const dxdy = g1t[start + 2];
  const width = 1 << (dxdy & 0x0f);
  const height = 1 << (dxdy >> 4);
  if (format !== 0x36) throw new Error(`texture ${index} is format 0x${format.toString(16)}, expected 0x36`);
  const data = g1t.subarray(start + 8, start + 8 + width * height * 2);
  const rgba = Buffer.alloc(width * height * 4);
  for (let pixel = 0; pixel < width * height; pixel += 1) {
    const packed = data.readUInt16LE(pixel * 2);
    rgba[pixel * 4] = expand((packed >> 12) & 0x0f);
    rgba[pixel * 4 + 1] = expand((packed >> 8) & 0x0f);
    rgba[pixel * 4 + 2] = expand((packed >> 4) & 0x0f);
    rgba[pixel * 4 + 3] = expand(packed & 0x0f);
  }
  return { rgba, width, height };
}

function trim(image: { rgba: Buffer; width: number; height: number }): { rgba: Buffer; width: number; height: number } {
  let minX = image.width;
  let minY = image.height;
  let maxX = 0;
  let maxY = 0;
  for (let y = 0; y < image.height; y += 1) {
    for (let x = 0; x < image.width; x += 1) {
      if (image.rgba[(y * image.width + x) * 4 + 3] === 0) continue;
      if (x < minX) minX = x;
      if (y < minY) minY = y;
      if (x > maxX) maxX = x;
      if (y > maxY) maxY = y;
    }
  }
  if (maxX < minX) return image;
  const pad = 2;
  minX = Math.max(0, minX - pad);
  minY = Math.max(0, minY - pad);
  maxX = Math.min(image.width - 1, maxX + pad);
  maxY = Math.min(image.height - 1, maxY + pad);
  const width = maxX - minX + 1;
  const height = maxY - minY + 1;
  const rgba = Buffer.alloc(width * height * 4);
  for (let y = 0; y < height; y += 1) {
    image.rgba.copy(rgba, y * width * 4, ((minY + y) * image.width + minX) * 4, ((minY + y) * image.width + minX + width) * 4);
  }
  return { rgba, width, height };
}

function crc32(bytes: Buffer): number {
  let crc = 0xffffffff;
  for (const byte of bytes) {
    crc ^= byte;
    for (let bit = 0; bit < 8; bit += 1) crc = (crc >>> 1) ^ (0xedb88320 & -(crc & 1));
  }
  return ~crc >>> 0;
}

function chunk(type: string, data: Buffer): Buffer {
  const name = Buffer.from(type, 'latin1');
  const header = Buffer.alloc(8);
  header.writeUInt32BE(data.length, 0);
  name.copy(header, 4);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(Buffer.concat([name, data])), 0);
  return Buffer.concat([header, data, crc]);
}

function encodePng(rgba: Buffer, width: number, height: number): Buffer {
  const stride = width * 4;
  const raw = Buffer.alloc((stride + 1) * height);
  for (let y = 0; y < height; y += 1) {
    raw[y * (stride + 1)] = 0;
    rgba.copy(raw, y * (stride + 1) + 1, y * stride, y * stride + stride);
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;
  return Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    chunk('IHDR', ihdr),
    chunk('IDAT', deflateSync(raw)),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

function exportGameIcons(): void {
  const assets = indexAssets();
  const outDir = join(repoRoot(), 'src', 'components', 'omnia-ui', 'game-icons');
  mkdirSync(outDir, { recursive: true });
  const decoded = new Map<string, Buffer>();
  const manifest: { name: string; file: string; index: number; width: number; height: number }[] = [];
  for (const icon of ICONS) {
    let g1t = decoded.get(icon.file);
    if (!g1t) {
      const source = assets.get(icon.file.toLowerCase());
      if (!source) throw new Error(`missing ${icon.file}`);
      g1t = unpack(source, icon.file);
      decoded.set(icon.file, g1t);
    }
    const image = trim(decodeTexture(g1t, icon.index));
    writeFileSync(join(outDir, `${icon.name}.png`), encodePng(image.rgba, image.width, image.height));
    manifest.push({ ...icon, width: image.width, height: image.height });
    console.log(`${icon.name} ${image.width}x${image.height}`);
  }
  writeFileSync(join(outDir, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`);
}

exportGameIcons();

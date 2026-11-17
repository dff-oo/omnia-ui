import type { Metadata } from "next";
import type { ComponentType } from "react";
import {
  Badge,
  Button,
  Callout,
  Panel,
  RarityMarker,
  SectionHeading,
  StatusBadge,
  TextField,
  ThemeRoot,
} from "@/components/omnia-ui";
import * as Icons from "@/components/omnia-ui/icons";
import type { IconProps } from "@/components/omnia-ui/icons";
import shared from "../_showcase/showcase.module.css";
import styles from "./foundations.module.css";

export const metadata: Metadata = { title: "Foundations" };

const palette = [
  { name: "Canvas", token: "--omnia-canvas" },
  { name: "Surface 1", token: "--omnia-surface-1" },
  { name: "Surface 2", token: "--omnia-surface-2" },
  { name: "Surface 3", token: "--omnia-surface-3" },
  { name: "Border", token: "--omnia-border" },
  { name: "Border strong", token: "--omnia-border-strong" },
  { name: "Foreground", token: "--omnia-fg" },
  { name: "Muted text", token: "--omnia-fg-muted" },
  { name: "Accent", token: "--omnia-accent" },
  { name: "Accent strong", token: "--omnia-accent-strong" },
  { name: "Gold", token: "--omnia-gold" },
  { name: "Violet", token: "--omnia-violet" },
  { name: "Success", token: "--omnia-success" },
  { name: "Warning", token: "--omnia-warning" },
  { name: "Danger", token: "--omnia-danger" },
  { name: "Focus", token: "--omnia-focus" },
];

const typeScale = [
  { label: "Display", token: "--omnia-text-display", sample: "Where the crystals sing", display: true },
  { label: "Page · 32", token: "--omnia-text-page", sample: "Party management" },
  { label: "Section · 24", token: "--omnia-text-section", sample: "Equipment" },
  { label: "Lead · 18", token: "--omnia-text-lead", sample: "Assemble three members and set out." },
  { label: "Body · 16", token: "--omnia-text-body", sample: "Readable body copy at a comfortable measure and line height." },
  { label: "Small · 14", token: "--omnia-text-small", sample: "Labels, descriptions and secondary metadata." },
  { label: "Caption · 12", token: "--omnia-text-caption", sample: "Non-essential metadata only — 12,400 / 12,400" },
];

const spacing = [4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80];
const radii = [
  { label: "xs · 6", token: "--omnia-radius-xs" },
  { label: "sm · 10", token: "--omnia-radius-sm" },
  { label: "md · 14", token: "--omnia-radius-md" },
  { label: "lg · 20", token: "--omnia-radius-lg" },
  { label: "pill", token: "--omnia-radius-pill" },
];

const iconEntries = Object.entries(Icons)
  .filter(([name]) => name.endsWith("Icon"))
  .map(([name, Icon]) => [name.replace(/Icon$/, ""), Icon as ComponentType<IconProps>] as const);

function ThemeSample() {
  return (
    <div className={shared.stack}>
      <div className={shared.row}>
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
      </div>
      <TextField label="Party name" defaultValue="Dawn Wardens" description="Shown to friends." />
      <div className={shared.row}>
        <StatusBadge status="success">Cleared</StatusBadge>
        <StatusBadge status="warning">Expiring</StatusBadge>
        <Badge tone="gold">Max level</Badge>
        <RarityMarker tier={5} label="Legendary" />
      </div>
      <Callout tone="info" title="Portals follow the page theme">
        Popups opened from this preview render at the document root and use the page theme.
      </Callout>
    </div>
  );
}

export default function FoundationsPage() {
  return (
    <div className={shared.page}>
      <SectionHeading
        level={1}
        size="page"
        title="Foundations"
        description="Semantic tokens drive every component. Switch themes in the header to see the palette update."
      />

      <section className={shared.section} aria-labelledby="palette">
        <SectionHeading id="palette" title="Palette" description="Semantic roles, not raw colours. Gold is reserved for rare or maxed states." />
        <ul className={styles.swatches}>
          {palette.map((swatch) => (
            <li key={swatch.token} className={styles.swatch}>
              <span className={styles.chip} style={{ background: `var(${swatch.token})` }} aria-hidden />
              <span className={styles.swatchText}>
                <span className={styles.swatchName}>{swatch.name}</span>
                <code className={styles.swatchToken}>{swatch.token}</code>
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className={shared.section} aria-labelledby="themes">
        <SectionHeading
          id="themes"
          title="Dark and light"
          description="One component API, two appearance modes. Dark is the immersive app mode; light suits editorial pages."
        />
        <div className={shared.grid2}>
          <ThemeRoot theme="dark" className={styles.themePreview}>
            <p className={shared.label}>Dark</p>
            <ThemeSample />
          </ThemeRoot>
          <ThemeRoot theme="light" className={styles.themePreview}>
            <p className={shared.label}>Light</p>
            <ThemeSample />
          </ThemeRoot>
        </div>
      </section>

      <section className={shared.section} aria-labelledby="type">
        <SectionHeading
          id="type"
          title="Typography"
          description="System UI stack for everything functional. The editorial serif is reserved for one hero title per page."
        />
        <Panel surface="plain">
          {typeScale.map((type) => (
            <div key={type.token} className={styles.typeSpecimen}>
              <span className={styles.typeMeta}>{type.label}</span>
              <span
                style={{
                  fontSize: `var(${type.token})`,
                  fontFamily: type.display ? "var(--omnia-font-display)" : undefined,
                  lineHeight: 1.25,
                }}
              >
                {type.sample}
              </span>
            </div>
          ))}
        </Panel>
      </section>

      <div className={shared.grid2}>
        <section className={shared.section} aria-labelledby="spacing">
          <SectionHeading id="spacing" title="Spacing" />
          <ul className={styles.scale}>
            {spacing.map((value) => (
              <li key={value} className={styles.scaleRow}>
                <span>{value}px</span>
                <span className={styles.bar} style={{ width: value }} aria-hidden />
              </li>
            ))}
          </ul>
        </section>
        <section className={shared.section} aria-labelledby="radii">
          <SectionHeading id="radii" title="Radii" />
          <ul className={styles.radii}>
            {radii.map((radius) => (
              <li key={radius.token} className={styles.radius} style={{ borderRadius: `var(${radius.token})` }}>
                {radius.label}
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className={shared.section} aria-labelledby="elevation">
        <SectionHeading id="elevation" title="Elevation" description="Three shadow levels, plus the rare signature treatment." />
        <ul className={styles.shadows}>
          <li className={styles.shadow} style={{ boxShadow: "var(--omnia-shadow-subtle)" }}>
            Subtle
          </li>
          <li className={styles.shadow} style={{ boxShadow: "var(--omnia-shadow-raised)" }}>
            Raised
          </li>
          <li className={styles.shadow} style={{ boxShadow: "var(--omnia-shadow-overlay)" }}>
            Overlay
          </li>
          <li>
            <Panel surface="signature" density="compact">
              Signature
            </Panel>
          </li>
        </ul>
      </section>

      <section className={shared.section} aria-labelledby="icons">
        <SectionHeading
          id="icons"
          title="Icons"
          description="Locally authored on a 24px grid, 1.75px stroke, currentColor. Decorative by default; pass label for standalone use."
        />
        <ul className={styles.icons}>
          {iconEntries.map(([name, Icon]) => (
            <li key={name} className={styles.icon}>
              <Icon size={24} />
              <span>{name}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

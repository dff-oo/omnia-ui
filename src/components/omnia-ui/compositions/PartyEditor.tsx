"use client";

import { useEffect, useRef, useState } from "react";
import { Badge } from "../foundations/Badge";
import { Button, IconButton } from "../foundations/Button";
import { AlertDialog, AlertDialogClose, Dialog, DialogClose } from "../foundations/Dialog";
import { ImageFrame } from "../foundations/Media";
import { ChevronLeftIcon, ChevronRightIcon, CloseIcon, PlusIcon, SwapIcon } from "../icons";
import { PortraitCard } from "../signature/Cards";
import { LevelBadge, RarityMarker } from "../signature/Data";
import styles from "./Compositions.module.css";
import type { CharacterSummary } from "./types";

type PartySlots = (string | null)[];

export interface PartyEditorProps {
  roster: CharacterSummary[];
  initialParty: PartySlots;
  /** Async save. Defaults to a simulated request for the showcase. */
  onSave?: (party: PartySlots) => Promise<void>;
  showArt?: boolean;
}

const simulateSave = () => new Promise<void>((resolve) => setTimeout(resolve, 900));

export function PartyEditor({ roster, initialParty, onSave = simulateSave, showArt = true }: PartyEditorProps) {
  const [party, setParty] = useState<PartySlots>(initialParty);
  const [pickerSlot, setPickerSlot] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState("");
  const statusTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(statusTimer.current), []);

  const byId = new Map(roster.map((character) => [character.id, character]));
  const dirty = party.some((id, index) => id !== initialParty[index]);

  const update = (next: PartySlots, message: string) => {
    setParty(next);
    setStatus(message);
  };

  const assign = (slot: number, id: string) => {
    const next = [...party];
    const existing = next.indexOf(id);
    if (existing !== -1) next[existing] = next[slot];
    next[slot] = id;
    update(next, `${byId.get(id)?.name} placed in slot ${slot + 1}.`);
    setPickerSlot(null);
  };

  const move = (slot: number, direction: -1 | 1) => {
    const target = slot + direction;
    const next = [...party];
    [next[slot], next[target]] = [next[target], next[slot]];
    update(next, `${byId.get(next[target] ?? "")?.name} moved to slot ${target + 1}.`);
  };

  const remove = (slot: number) => {
    const next = [...party];
    const name = byId.get(next[slot] ?? "")?.name;
    next[slot] = null;
    update(next, `${name} removed from the party.`);
  };

  const save = async () => {
    setSaving(true);
    setStatus("");
    await onSave(party);
    setSaving(false);
    setStatus("Party saved.");
    clearTimeout(statusTimer.current);
    statusTimer.current = setTimeout(() => setStatus(""), 4000);
  };

  return (
    <div className={styles.overviewMain}>
      <ol className={styles.party} aria-label="Party slots">
        {party.map((id, slot) => {
          const member = id ? byId.get(id) : undefined;
          return (
            <li key={slot} className={styles.partySlot}>
              <span className={styles.partySlotLabel}>Slot {slot + 1}</span>
              {member ? (
                <PortraitCard
                  title={member.name}
                  subtitle={`${member.role} · ${member.affinity}`}
                  image={{ placeholderHue: member.hue, showMissing: !showArt }}
                  ratio={4 / 3}
                  overlayStart={<LevelBadge level={member.level} max={member.maxLevel} progress={member.progress} size={40} />}
                  meta={<RarityMarker tier={member.rarity.tier} label={member.rarity.label} />}
                  actions={
                    <div className={styles.slotActions}>
                      <Button size="sm" variant="secondary" startIcon={<SwapIcon size={16} />} onClick={() => setPickerSlot(slot)}>
                        Change
                      </Button>
                      <IconButton
                        size="sm"
                        label={`Move ${member.name} left`}
                        icon={<ChevronLeftIcon size={16} />}
                        disabled={slot === 0}
                        onClick={() => move(slot, -1)}
                      />
                      <IconButton
                        size="sm"
                        label={`Move ${member.name} right`}
                        icon={<ChevronRightIcon size={16} />}
                        disabled={slot === party.length - 1}
                        onClick={() => move(slot, 1)}
                      />
                      <IconButton
                        size="sm"
                        label={`Remove ${member.name}`}
                        icon={<CloseIcon size={16} />}
                        onClick={() => remove(slot)}
                      />
                    </div>
                  }
                />
              ) : (
                <button type="button" className={styles.emptySlot} onClick={() => setPickerSlot(slot)}>
                  <PlusIcon size={24} />
                  <span>Add member</span>
                  <span className="omnia-sr-only">to slot {slot + 1}</span>
                </button>
              )}
            </li>
          );
        })}
      </ol>

      <div className={styles.saveBar}>
        <p role="status" className={styles.resultBar}>
          {status}
        </p>
        <AlertDialog
          title="Clear the whole party?"
          description="All three slots will be emptied. You can rebuild the party at any time."
          trigger={
            <Button variant="ghost" disabled={party.every((id) => id === null)}>
              Clear party
            </Button>
          }
          actions={
            <>
              <AlertDialogClose render={<Button variant="secondary" />}>Cancel</AlertDialogClose>
              <AlertDialogClose
                render={<Button variant="danger" />}
                onClick={() => update(party.map(() => null), "Party cleared.")}
              >
                Clear party
              </AlertDialogClose>
            </>
          }
        />
        <Button variant="primary" onClick={save} loading={saving} disabled={!dirty && !saving}>
          Save party
        </Button>
      </div>

      <Dialog
        open={pickerSlot !== null}
        onOpenChange={(open) => !open && setPickerSlot(null)}
        title={pickerSlot !== null ? `Choose a member for slot ${pickerSlot + 1}` : "Choose a member"}
        description="Members already in the party will swap places."
        actions={<DialogClose render={<Button variant="secondary" />}>Cancel</DialogClose>}
      >
        <ul className={styles.picker}>
          {roster.map((character) => {
            const currentSlot = party.indexOf(character.id);
            const isHere = pickerSlot !== null && currentSlot === pickerSlot;
            return (
              <li key={character.id}>
                <button
                  type="button"
                  className={styles.pickerOption}
                  disabled={isHere}
                  onClick={() => pickerSlot !== null && assign(pickerSlot, character.id)}
                >
                  <ImageFrame ratio={1} placeholderHue={character.hue} showMissing={!showArt} className={styles.pickerThumb} />
                  <span className={styles.pickerText}>
                    <span className={styles.pickerName}>{character.name}</span>
                    <span className={styles.pickerMeta}>
                      Lv {character.level} · {character.role}
                    </span>
                  </span>
                  {currentSlot !== -1 && <Badge tone={isHere ? "accent" : "neutral"}>Slot {currentSlot + 1}</Badge>}
                </button>
              </li>
            );
          })}
        </ul>
      </Dialog>
    </div>
  );
}

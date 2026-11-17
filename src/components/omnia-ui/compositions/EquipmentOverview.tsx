"use client";

import { useState } from "react";
import { Button } from "../foundations/Button";
import { EmptyState } from "../foundations/Feedback";
import { Panel } from "../foundations/Panel";
import { EquipmentSlot } from "../signature/Cards";
import { RarityMarker, StatList, toneForTier } from "../signature/Data";
import { slotIcon, slotLabel } from "./shared";
import styles from "./Compositions.module.css";
import type { EquipmentItem, EquipmentSlotKind } from "./types";

const slotOrder: EquipmentSlotKind[] = ["weapon", "armor", "accessory", "charm"];

export interface EquipmentOverviewProps {
  initialEquipment: Partial<Record<EquipmentSlotKind, EquipmentItem>>;
  inventory: EquipmentItem[];
}

function compare(candidate: EquipmentItem, equipped?: EquipmentItem) {
  return candidate.stats.map((stat) => {
    const current = equipped?.stats.find((s) => s.label === stat.label)?.value ?? 0;
    return { label: stat.label, value: stat.value, delta: stat.value - current };
  });
}

export function EquipmentOverview({ initialEquipment, inventory }: EquipmentOverviewProps) {
  const [equipped, setEquipped] = useState(initialEquipment);
  const [selected, setSelected] = useState<EquipmentSlotKind>("weapon");
  const [status, setStatus] = useState("");

  const current = equipped[selected];
  const candidates = inventory.filter((item) => item.slot === selected && item.id !== current?.id);

  const equip = (item: EquipmentItem) => {
    setEquipped((prev) => ({ ...prev, [item.slot]: item }));
    setStatus(`${item.name} equipped.`);
  };

  const unequip = () => {
    if (!current) return;
    setEquipped((prev) => ({ ...prev, [selected]: undefined }));
    setStatus(`${current.name} unequipped.`);
  };

  return (
    <div className={styles.equipment}>
      <ul className={styles.slotList} aria-label="Equipment slots">
        {slotOrder.map((slot) => {
          const item = equipped[slot];
          return (
            <li key={slot} className={slot === selected ? styles.slotSelected : undefined}>
              <EquipmentSlot
                slot={slotLabel[slot]}
                icon={slotIcon[slot]}
                item={
                  item && {
                    name: item.name,
                    rarity: item.rarity,
                    detail: `Lv ${item.level} / ${item.maxLevel}`,
                    tone: toneForTier(item.rarity.tier),
                  }
                }
                onSelect={() => setSelected(slot)}
                actionLabel={slot === selected ? "Viewing" : "View"}
              />
            </li>
          );
        })}
      </ul>

      <Panel
        heading={slotLabel[selected]}
        description={current ? "Currently equipped" : "Nothing equipped in this slot"}
        actions={
          current && (
            <Button size="sm" variant="ghost" onClick={unequip}>
              Unequip
            </Button>
          )
        }
      >
        <p role="status" className="omnia-sr-only">
          {status}
        </p>
        {current && (
          <>
            <div className={styles.candidateMain}>
              <span className={styles.candidateName}>{current.name}</span>
              <RarityMarker tier={current.rarity.tier} label={current.rarity.label} />
            </div>
            <StatList
              layout="rows"
              items={[{ label: "Level", value: `${current.level} / ${current.maxLevel}` }, ...current.stats]}
            />
          </>
        )}

        <h3 className={styles.partySlotLabel}>Available in inventory</h3>
        {candidates.length === 0 ? (
          <EmptyState
            title="No other items for this slot"
            description="Items you collect for this slot will appear here."
            headingLevel={4}
          />
        ) : (
          <ul className={styles.candidates}>
            {candidates.map((item) => (
              <li key={item.id} className={styles.candidate}>
                <div className={styles.candidateMain}>
                  <span className={styles.candidateName}>{item.name}</span>
                  <RarityMarker tier={item.rarity.tier} label={item.rarity.label} />
                </div>
                <StatList className={styles.candidateStats} items={compare(item, current)} minTileWidth={110} />
                <Button size="sm" variant="primary" onClick={() => equip(item)}>
                  Equip
                </Button>
              </li>
            ))}
          </ul>
        )}
      </Panel>
    </div>
  );
}

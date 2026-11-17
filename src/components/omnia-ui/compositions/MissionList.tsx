"use client";

import { useState } from "react";
import { Button } from "../foundations/Button";
import { Progress } from "../foundations/Feedback";
import { cx } from "../lib/cx";
import { formatNumber } from "../lib/format";
import { RewardTile, type RewardState } from "../signature/Cards";
import { rewardIcon, rewardTone } from "./shared";
import styles from "./Compositions.module.css";
import type { MissionSummary } from "./types";

function stateFor(mission: MissionSummary): RewardState {
  if (mission.claimed) return "claimed";
  return mission.progress >= mission.target ? "claimable" : "available";
}

export interface MissionListProps {
  missions: MissionSummary[];
}

export function MissionList({ missions: initial }: MissionListProps) {
  const [missions, setMissions] = useState(initial);
  const [announcement, setAnnouncement] = useState("");

  const groups = Array.from(new Set(missions.map((mission) => mission.group)));

  const claim = (ids: string[]) => {
    const claimed = missions.filter((mission) => ids.includes(mission.id));
    setMissions((prev) => prev.map((mission) => (ids.includes(mission.id) ? { ...mission, claimed: true } : mission)));
    setAnnouncement(
      `Claimed ${claimed.map((m) => `${formatNumber(m.reward.quantity)} ${m.reward.name}`).join(", ")}.`,
    );
  };

  return (
    <div className={styles.missionGroups}>
      <p role="status" className="omnia-sr-only">
        {announcement}
      </p>
      {groups.map((group) => {
        const items = missions.filter((mission) => mission.group === group);
        const claimable = items.filter((mission) => stateFor(mission) === "claimable");
        const headingId = `missions-${group.toLowerCase()}`;
        return (
          <section key={group} aria-labelledby={headingId}>
            <div className={styles.missionGroupHeader}>
              <h3 id={headingId} className={styles.missionGroupTitle}>
                {group} missions
              </h3>
              <Button
                size="sm"
                variant="outline"
                disabled={claimable.length === 0}
                onClick={() => claim(claimable.map((mission) => mission.id))}
              >
                Claim all{claimable.length > 0 ? ` (${claimable.length})` : ""}
              </Button>
            </div>
            <ul className={styles.missions}>
              {items.map((mission) => {
                const state = stateFor(mission);
                return (
                  <li key={mission.id} className={cx(styles.mission, state === "claimed" && styles.missionDone)}>
                    <Progress
                      label={mission.goal}
                      value={Math.min(mission.progress, mission.target)}
                      max={mission.target}
                      valueLabel={`${formatNumber(Math.min(mission.progress, mission.target))} / ${formatNumber(mission.target)}`}
                      tone={state === "available" ? "accent" : "success"}
                    />
                    <RewardTile
                      layout="row"
                      className={styles.missionReward}
                      name={mission.reward.name}
                      icon={rewardIcon[mission.reward.kind]}
                      tone={rewardTone[mission.reward.kind]}
                      quantity={mission.reward.quantity}
                      state={state}
                      onClaim={() => claim([mission.id])}
                    />
                  </li>
                );
              })}
            </ul>
          </section>
        );
      })}
    </div>
  );
}

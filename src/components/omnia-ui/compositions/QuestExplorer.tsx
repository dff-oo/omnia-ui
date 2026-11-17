import { Badge } from "../foundations/Badge";
import { Progress } from "../foundations/Feedback";
import { Tab, TabList, TabPanel, Tabs } from "../foundations/Tabs";
import { formatCompact } from "../lib/format";
import { QuestNode } from "../signature/Cards";
import { rewardIcon } from "./shared";
import styles from "./Compositions.module.css";
import type { ChapterSummary, RewardSummary } from "./types";

function RewardPreview({ rewards }: { rewards: RewardSummary[] }) {
  return (
    <span className={styles.rewardPreview}>
      <span className="omnia-sr-only">Rewards:</span>
      {rewards.map((reward) => (
        <span key={reward.id} className={styles.rewardPreviewItem}>
          <span aria-hidden>{rewardIcon[reward.kind]}</span>
          <span className="omnia-sr-only">{reward.name}</span>×{formatCompact(reward.quantity)}
        </span>
      ))}
    </span>
  );
}

export interface QuestExplorerProps {
  chapters: ChapterSummary[];
  /** Detail links are built as `{hrefPrefix}{quest.id}`. */
  hrefPrefix?: string;
}

export function QuestExplorer({ chapters, hrefPrefix = "#quest-" }: QuestExplorerProps) {
  return (
    <Tabs defaultValue={chapters[0]?.id}>
      <TabList aria-label="Chapters">
        {chapters.map((chapter, index) => (
          <Tab key={chapter.id} value={chapter.id}>
            <span>
              Chapter {index + 1}
              <span className="omnia-sr-only">: {chapter.title}</span>
            </span>
          </Tab>
        ))}
      </TabList>
      {chapters.map((chapter) => {
        const cleared = chapter.quests.filter((quest) => quest.state === "cleared").length;
        return (
          <TabPanel key={chapter.id} value={chapter.id} className={styles.overviewMain}>
            <Progress
              label={chapter.title}
              value={cleared}
              max={chapter.quests.length}
              valueLabel={`${cleared} of ${chapter.quests.length} cleared`}
              tone={cleared === chapter.quests.length ? "success" : "accent"}
            />
            <ol className={styles.questList}>
              {chapter.quests.map((quest) => (
                <li key={quest.id} id={`quest-${quest.id}`}>
                  <QuestNode
                    title={quest.title}
                    status={quest.state}
                    eyebrow={`Stage ${quest.stage}`}
                    href={`${hrefPrefix}${quest.id}`}
                    trailing={
                      <>
                        <Badge>Lv {quest.recommendedLevel}</Badge>
                        <RewardPreview rewards={quest.rewards} />
                      </>
                    }
                  />
                </li>
              ))}
            </ol>
          </TabPanel>
        );
      })}
    </Tabs>
  );
}

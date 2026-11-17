import type { Metadata } from "next";
import Link from "next/link";
import {
  Button,
  buttonClasses,
  CoinIcon,
  GameIcon,
  GemIcon,
  MissionList,
  QuestExplorer,
  ResultSummary,
  RewardTile,
  SectionHeading,
  StatList,
} from "@/components/omnia-ui";
import { chapters, missions } from "@/fixtures/omnia";
import shared from "../_showcase/showcase.module.css";

export const metadata: Metadata = { title: "Quests & rewards" };

export default function QuestsPage() {
  return (
    <div className={shared.page}>
      <SectionHeading
        level={1}
        size="page"
        title="Quests & rewards"
        description="Quest state is shown with text and icon as well as colour. Locked stages are not links."
      />

      <section className={shared.section} aria-labelledby="explorer">
        <SectionHeading id="explorer" title="Quest explorer" />
        <QuestExplorer chapters={chapters} />
      </section>

      <section className={shared.section} aria-labelledby="missions">
        <SectionHeading id="missions" title="Missions" description="Claim individually or all at once; claimed rewards remain listed." />
        <MissionList missions={missions} />
      </section>

      <section className={shared.section} aria-labelledby="result">
        <SectionHeading id="result" title="Result summary" description="Celebration motion is brief and disabled under reduced motion." />
        <ResultSummary
          celebrate
          headingLevel={3}
          title="Stage cleared"
          subtitle="Where the Crystals Sing · Chapter 1, stage 3"
          stats={
            <StatList
              items={[
                { label: "Turns", value: 15 },
                { label: "Score", value: 3836665 },
                { label: "Party HP left", value: "84%" },
              ]}
            />
          }
          rewards={[
            <RewardTile key="g" name="Gems" icon={<GemIcon size={24} />} quantity={100} state="claimed" />,
            <RewardTile key="t" name="Treasure" icon={<GameIcon name="treasure" size={24} />} quantity={1} state="claimed" />,
            <RewardTile key="c" name="Coins" icon={<CoinIcon size={24} />} tone="gold" quantity={5000} state="claimed" />,
          ]}
          actions={
            <>
              <Link href="#explorer" className={buttonClasses({ variant: "secondary" })}>
                Back to stages
              </Link>
              <Button variant="primary">Next stage</Button>
            </>
          }
        />
      </section>
    </div>
  );
}

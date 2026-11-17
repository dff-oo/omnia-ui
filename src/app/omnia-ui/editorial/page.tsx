import type { Metadata } from "next";
import Link from "next/link";
import {
  ArmorIcon,
  Badge,
  BannerFeature,
  buttonClasses,
  Card,
  CrystalPanel,
  ImageFrame,
  Ornament,
  RarityMarker,
  ScrollIcon,
  SectionHeading,
  StatusBadge,
  Tab,
  TabList,
  TabPanel,
  Tabs,
} from "@/components/omnia-ui";
import shared from "../_showcase/showcase.module.css";
import styles from "./editorial.module.css";

export const metadata: Metadata = { title: "Editorial" };

const features = [
  { title: "New story stages", body: "Six stages continue the Tides of Halvar chapter.", hue: 196, badge: <Badge tone="accent">Story</Badge> },
  { title: "Starweave armour set", body: "Earn the full set through event missions.", hue: 268, badge: <RarityMarker tier={4} label="Epic" /> },
  { title: "Daily login rewards", body: "Fourteen days of rewards, no purchase needed.", hue: 48, badge: <Badge tone="gold">Free</Badge> },
];

const schedule = {
  part1: [
    { name: "Event opens", date: "Feb 1 · 08:00 UTC" },
    { name: "Stages 1–3 available", date: "Feb 1 · 08:00 UTC" },
    { name: "Bonus weekend", date: "Feb 7 – Feb 9" },
  ],
  part2: [
    { name: "Stages 4–6 available", date: "Feb 14 · 08:00 UTC" },
    { name: "Challenge stage", date: "Feb 21 · 08:00 UTC" },
    { name: "Event closes", date: "Feb 28 · 23:59 UTC" },
  ],
};

export default function EditorialPage() {
  return (
    <div className={shared.page}>
      <BannerFeature
        headingLevel={1}
        eyebrow="Campaign · Limited"
        title="Crystalline Dawn"
        description="A month-long event of new story stages, an exclusive armour set and daily rewards for every traveller."
        availability="Feb 1 – Feb 28 · UTC"
        image={{ placeholderHue: 230 }}
        actions={
          <>
            <Link href="/omnia-ui/quests" className={buttonClasses({ variant: "primary", size: "lg" })}>
              Play the event
            </Link>
            <Link href="#schedule" className={buttonClasses({ variant: "secondary", size: "lg" })}>
              View schedule
            </Link>
          </>
        }
      />

      <section className={shared.section} aria-labelledby="intro">
        <SectionHeading id="intro" eyebrow="The story" title="Light returns to the shattered gate" />
        <div className={styles.prose}>
          <p>
            When the crystals beneath Halvar begin to sing again, the wardens set out to learn why. Editorial pages use a
            calmer rhythm: generous whitespace, a readable measure and fewer, larger elements.
          </p>
          <p>
            Long-form text stays in the sans-serif body face. The serif is reserved for the hero title only.
          </p>
        </div>
      </section>

      <Ornament />

      <section className={shared.section} aria-labelledby="highlights">
        <SectionHeading id="highlights" title="Highlights" />
        <ul className={shared.grid3} style={{ listStyle: "none", margin: 0, padding: 0 }}>
          {features.map((feature) => (
            <Card key={feature.title} as="li" surface="raised" className={styles.featureCard}>
              <ImageFrame ratio={16 / 9} placeholderHue={feature.hue} />
              <h3>{feature.title}</h3>
              <p>{feature.body}</p>
              <div>{feature.badge}</div>
            </Card>
          ))}
        </ul>
      </section>

      <section className={shared.section} aria-labelledby="schedule">
        <SectionHeading id="schedule" title="Schedule" description="All times are UTC." />
        <Tabs defaultValue="part1">
          <TabList aria-label="Event parts">
            <Tab value="part1">Part 1</Tab>
            <Tab value="part2">Part 2</Tab>
          </TabList>
          {(Object.keys(schedule) as (keyof typeof schedule)[]).map((part) => (
            <TabPanel key={part} value={part}>
              <ul className={styles.schedule}>
                {schedule[part].map((item) => (
                  <li key={item.name} className={styles.scheduleItem}>
                    <span>{item.name}</span>
                    <span className={styles.scheduleDate}>{item.date}</span>
                  </li>
                ))}
              </ul>
            </TabPanel>
          ))}
        </Tabs>
      </section>

      <CrystalPanel>
        <div className={styles.cta}>
          <div className={styles.ctaText}>
            <StatusBadge status="warning">Ends Feb 28</StatusBadge>
            <h2>Don&rsquo;t miss the Starweave set</h2>
            <p>Complete event missions before the event closes to collect every piece.</p>
          </div>
          <div className={shared.row}>
            <Link href="/omnia-ui/quests#missions" className={buttonClasses({ variant: "primary" })}>
              <ScrollIcon size={20} /> View missions
            </Link>
            <Link href="/omnia-ui/party#equipment" className={buttonClasses({ variant: "secondary" })}>
              <ArmorIcon size={20} /> Equipment
            </Link>
          </div>
        </div>
      </CrystalPanel>

      <footer className={styles.footer} aria-label="Campaign links">
        <div>
          <h2>Campaign</h2>
          <ul>
            <li>
              <Link href="#intro">Story</Link>
            </li>
            <li>
              <Link href="#highlights">Highlights</Link>
            </li>
            <li>
              <Link href="#schedule">Schedule</Link>
            </li>
          </ul>
        </div>
        <div>
          <h2>Showcase</h2>
          <ul>
            <li>
              <Link href="/omnia-ui/components">Components</Link>
            </li>
            <li>
              <Link href="/omnia-ui/accessibility">Accessibility</Link>
            </li>
          </ul>
        </div>
        <div>
          <h2>About</h2>
          <p className={shared.note}>Fictional campaign content created for this design system.</p>
        </div>
      </footer>
    </div>
  );
}

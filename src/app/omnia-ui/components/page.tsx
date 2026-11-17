import type { Metadata } from "next";
import Link from "next/link";
import {
  ArmorIcon,
  Avatar,
  Badge,
  BannerFeature,
  Button,
  buttonClasses,
  Callout,
  Card,
  CoinIcon,
  Combobox,
  CrystalIcon,
  EmptyState,
  EquipmentSlot,
  FeatureAction,
  GemIcon,
  GiftIcon,
  IconButton,
  ImageFrame,
  LevelBadge,
  Ornament,
  Panel,
  PartyIcon,
  PlusIcon,
  PortraitCard,
  Progress,
  QuestNode,
  RarityMarker,
  ResourceCounter,
  ResultSummary,
  RewardTile,
  ScrollIcon,
  SearchIcon,
  SectionHeading,
  Select,
  Separator,
  SettingsIcon,
  Skeleton,
  StatBar,
  StatList,
  StatusBadge,
  Switch,
  Tab,
  TabList,
  TabPanel,
  Tabs,
  TextArea,
  TextField,
  CopyField,
  ThemeToggle,
  TicketIcon,
} from "@/components/omnia-ui";
import { characters } from "@/fixtures/omnia";
import shared from "../_showcase/showcase.module.css";
import { ChoiceDemo, FormDemo, InteractiveSignatureDemo, LoadingButtonDemo, OverlayDemo } from "../_showcase/demos";

export const metadata: Metadata = { title: "Components" };

const variants = ["primary", "secondary", "outline", "ghost", "danger"] as const;

export default function ComponentsPage() {
  return (
    <div className={shared.page}>
      <SectionHeading
        level={1}
        size="page"
        title="Components"
        description="Each primitive in its documented states. Tab through the page to check focus visibility."
      />

      {/* Buttons ---------------------------------------------------------- */}
      <section className={shared.section} aria-labelledby="buttons">
        <SectionHeading id="buttons" title="Button & IconButton" />
        <Panel surface="plain">
          <p className={shared.label}>Variants</p>
          <div className={shared.row}>
            {variants.map((variant) => (
              <Button key={variant} variant={variant}>
                {variant[0].toUpperCase() + variant.slice(1)}
              </Button>
            ))}
          </div>
          <p className={shared.label}>Sizes · sm keeps a 44px hit area</p>
          <div className={shared.row}>
            <Button size="sm" variant="primary">
              Small
            </Button>
            <Button variant="primary">Medium</Button>
            <Button size="lg" variant="primary">
              Large
            </Button>
          </div>
          <p className={shared.label}>Icons, disabled, link</p>
          <div className={shared.row}>
            <Button variant="secondary" startIcon={<PlusIcon size={16} />}>
              Add member
            </Button>
            <Button variant="primary" disabled>
              Disabled
            </Button>
            <Link href="/omnia-ui/party" className={buttonClasses({ variant: "outline" })}>
              Link styled as button
            </Link>
            <IconButton label="Settings" icon={<SettingsIcon />} />
            <IconButton label="Search" icon={<SearchIcon />} variant="secondary" />
            <IconButton label="Add" icon={<PlusIcon />} variant="primary" size="sm" />
          </div>
          <p className={shared.label}>Loading</p>
          <LoadingButtonDemo />
        </Panel>
      </section>

      {/* Fields ----------------------------------------------------------- */}
      <section className={shared.section} aria-labelledby="fields">
        <SectionHeading id="fields" title="Text fields, Select & Combobox" />
        <Panel surface="plain">
          <div className={shared.grid2}>
            <TextField label="Default" placeholder="Type here" />
            <TextField label="With description" description="Visible to party members." defaultValue="Dawn Wardens" />
            <TextField label="Prefix & suffix" prefix={<GemIcon size={16} />} suffix="gems" inputMode="numeric" defaultValue="500" />
            <TextField label="Required" required placeholder="Required field" />
            <TextField label="Invalid" defaultValue="!!" error="Use letters and numbers only." />
            <TextField label="Disabled" disabled defaultValue="Locked value" />
            <CopyField label="Copy field" value="https://example.test/field#f=token" description="Copies the value shown." />
            <div>
              <p className={shared.label}>Theme toggle</p>
              <ThemeToggle />
            </div>
            <Select
              label="Grouped select"
              placeholder="Choose a slot"
              options={[
                { label: "Gear", options: [{ value: "weapon", label: "Weapon" }, { value: "armor", label: "Armor" }] },
                { label: "Trinkets", options: [{ value: "accessory", label: "Accessory" }, { value: "charm", label: "Charm", disabled: true }] },
              ]}
            />
            <Select label="Invalid select" error="Choose a region." options={[{ value: "global", label: "Global" }]} />
            <Select label="Disabled select" disabled defaultValue="global" options={[{ value: "global", label: "Global" }]} />
            <Combobox
              label="Combobox"
              description="Type to filter long lists."
              placeholder="Search characters"
              clearable
              options={characters.map((character) => ({ value: character.id, label: character.name }))}
            />
            <Combobox
              label="Invalid combobox"
              error="Choose a character."
              options={characters.map((character) => ({ value: character.id, label: character.name }))}
            />
            <TextArea label="Text area" description="Resizes vertically." placeholder="Notes" />
          </div>
        </Panel>
      </section>

      <section className={shared.section} aria-labelledby="choices">
        <SectionHeading id="choices" title="Checkbox, Switch & RadioGroup" />
        <Panel surface="plain">
          <ChoiceDemo />
          <Separator />
          <div className={shared.grid2}>
            <Switch label="Battle animations" defaultChecked description="Turn off to speed up battles." />
            <Switch label="Disabled switch" disabled />
          </div>
        </Panel>
      </section>

      <section className={shared.section} aria-labelledby="form">
        <SectionHeading id="form" title="Validation" description="Submit empty to see connected, announced error messages." />
        <Panel surface="plain">
          <FormDemo />
        </Panel>
      </section>

      {/* Overlays --------------------------------------------------------- */}
      <section className={shared.section} aria-labelledby="overlays">
        <SectionHeading
          id="overlays"
          title="Dialog, AlertDialog, Menu, Popover, Tooltip"
          description="Focus is trapped and returned; Escape dismisses. Tooltips are supplementary only."
        />
        <Panel surface="plain">
          <OverlayDemo />
        </Panel>
      </section>

      {/* Tabs ------------------------------------------------------------- */}
      <section className={shared.section} aria-labelledby="tabs">
        <SectionHeading id="tabs" title="Tabs" description="Arrow keys move between tabs; Enter or Space activates." />
        <Panel surface="plain">
          <Tabs defaultValue="missions">
            <TabList aria-label="Quest details">
              <Tab value="missions">Missions</Tab>
              <Tab value="score">Score</Tab>
              <Tab value="enemies">Enemy info</Tab>
              <Tab value="locked" disabled>
                Locked
              </Tab>
            </TabList>
            <TabPanel value="missions">Clear without any party member falling.</TabPanel>
            <TabPanel value="score">Best score: 3,836,665</TabPanel>
            <TabPanel value="enemies">No enemy data recorded yet.</TabPanel>
          </Tabs>
        </Panel>
      </section>

      {/* Feedback --------------------------------------------------------- */}
      <section className={shared.section} aria-labelledby="feedback">
        <SectionHeading id="feedback" title="Badges, progress, skeletons, callouts" />
        <Panel surface="plain">
          <div className={shared.row}>
            <Badge>Neutral</Badge>
            <Badge tone="accent">Accent</Badge>
            <Badge tone="success">Success</Badge>
            <Badge tone="warning">Warning</Badge>
            <Badge tone="danger">Danger</Badge>
            <Badge tone="gold">Gold</Badge>
            <Badge tone="violet">Violet</Badge>
            <Badge tone="accent" variant="outline" size="md">
              Outline md
            </Badge>
          </div>
          <div className={shared.row}>
            <StatusBadge status="info">New</StatusBadge>
            <StatusBadge status="success">Cleared</StatusBadge>
            <StatusBadge status="warning">Ends in 2 days</StatusBadge>
            <StatusBadge status="danger">Failed</StatusBadge>
          </div>
          <div className={shared.grid2}>
            <Progress label="Chapter progress" value={3} max={5} valueLabel="3 of 5 stages" />
            <Progress label="Complete" value={100} tone="success" />
            <Progress label="Downloading assets" value={null} />
            <div className={shared.stack} aria-hidden>
              <Skeleton shape="text" width="60%" />
              <Skeleton shape="text" width="90%" />
              <div className={shared.row}>
                <Skeleton shape="circle" width={40} height={40} />
                <Skeleton width={120} height={40} />
              </div>
            </div>
          </div>
          <div className={shared.grid2}>
            <Callout tone="info" title="Maintenance window">
              Services pause on Thursday from 02:00 to 04:00 UTC.
            </Callout>
            <Callout tone="success" title="Party saved" />
            <Callout tone="warning" title="Stamina nearly full">
              Spend stamina soon to avoid losing regeneration.
            </Callout>
            <Callout tone="danger" title="Couldn&rsquo;t load rewards">
              Check your connection and try again.
            </Callout>
          </div>
          <EmptyState
            icon={<GiftIcon size={24} />}
            title="No rewards waiting"
            description="Complete missions to earn rewards. They will appear here until you claim them."
            actions={<Link href="/omnia-ui/quests" className={buttonClasses({ variant: "secondary" })}>View missions</Link>}
          />
        </Panel>
      </section>

      {/* Surfaces --------------------------------------------------------- */}
      <section className={shared.section} aria-labelledby="surfaces">
        <SectionHeading id="surfaces" title="Panel & Card" description="Signature is a rare variant — not the default card style." />
        <div className={shared.grid2}>
          <Panel surface="plain" heading="Plain" description="Flat, bordered." headingLevel={3}>
            Body content.
          </Panel>
          <Panel surface="raised" heading="Raised" description="Default for sections." headingLevel={3}>
            Body content.
          </Panel>
          <Panel surface="inset" heading="Inset" description="Nested emphasis." headingLevel={3}>
            Body content.
          </Panel>
          <Panel
            surface="signature"
            heading="Signature"
            description="Faceted corners, faint edge glow."
            headingLevel={3}
            actions={<Badge tone="gold">Rare</Badge>}
          >
            Body content.
          </Panel>
        </div>
        <div className={shared.grid3}>
          <Card
            as="article"
            heading="Card with footer"
            description="Cards are not click targets."
            footer={
              <Button size="sm" variant="secondary">
                Details
              </Button>
            }
          >
            Put links and buttons inside the card instead.
          </Card>
          <Card surface="raised" heading="Raised card" actions={<IconButton size="sm" label="More" icon={<SettingsIcon size={16} />} />}>
            Header actions align opposite the heading.
          </Card>
        </div>
      </section>

      {/* Media ------------------------------------------------------------ */}
      <section className={shared.section} aria-labelledby="media">
        <SectionHeading id="media" title="Avatar & ImageFrame" />
        <Panel surface="plain">
          <div className={shared.row}>
            <Avatar name="Aster Vale" size={32} />
            <Avatar name="Mira Solenne" size={40} />
            <Avatar name="Kaito Rhune" size={48} shape="rounded" />
            <Avatar name="Lysa Corwen" size={64} />
          </div>
          <div className={shared.grid3}>
            <ImageFrame ratio={4 / 3} placeholderHue={218} />
            <ImageFrame ratio={4 / 3} placeholderHue={18} />
            <ImageFrame ratio={4 / 3} showMissing />
          </div>
        </Panel>
      </section>

      <Ornament />

      {/* Signature -------------------------------------------------------- */}
      <section className={shared.section} aria-labelledby="signature">
        <SectionHeading
          id="signature"
          eyebrow="Signature"
          title="Omnia components"
          description="Original, game-adjacent presentation built from the same tokens."
        />

        <Panel surface="plain" heading="Data display" headingLevel={3}>
          <div className={shared.row}>
            <ResourceCounter label="Gems" value={32000} icon={<GemIcon size={16} />} />
            <ResourceCounter label="Coins" value={526550} icon={<CoinIcon size={16} />} tone="gold" compact />
            <ResourceCounter label="Tickets" value={3} max={10} icon={<TicketIcon size={16} />} tone="violet" />
          </div>
          <StatList
            items={[
              { label: "HP", value: 12400, delta: 600 },
              { label: "Attack", value: 3329, delta: -42 },
              { label: "Defense", value: 3642 },
              { label: "Speed", value: 118, unit: "pts" },
            ]}
          />
          <div className={shared.grid2}>
            <StatList
              layout="rows"
              items={[
                { label: "Initial BRV", value: 4243 },
                { label: "Max BRV", value: 11591 },
                { label: "CP", value: "381 / 410" },
              ]}
            />
            <div className={shared.stack}>
              <StatBar label="HP" value={10820} max={12400} unit="HP" tone="success" />
              <StatBar label="Shield" value={2200} max={9000} tone="accent" />
              <StatBar label="Critical HP" value={900} max={9000} tone="danger" />
            </div>
          </div>
          <div className={shared.row}>
            <LevelBadge level={12} max={60} progress={0.3} size={40} />
            <LevelBadge level={64} max={80} progress={0.75} />
            <LevelBadge level={90} max={90} size={64} />
            <Separator orientation="vertical" />
            {[1, 2, 3, 4, 5].map((tier) => (
              <RarityMarker key={tier} tier={tier} label={["Common", "Uncommon", "Rare", "Epic", "Legendary"][tier - 1]} />
            ))}
          </div>
        </Panel>

        <Panel surface="plain" heading="Destinations & items" headingLevel={3}>
          <div className={shared.grid2}>
            <FeatureAction
              href="/omnia-ui/characters"
              icon={<PartyIcon size={24} />}
              title="Characters"
              description="Manage your roster"
              badge={<Badge tone="accent">2 new</Badge>}
            />
            <FeatureAction href="/omnia-ui/quests" icon={<ScrollIcon size={24} />} title="Quests" description="Continue Chapter 1" />
          </div>
          <div className={shared.grid3}>
            <PortraitCard
              title="Aster Vale"
              subtitle="Warden of the Dawn Gate"
              href="/omnia-ui/characters"
              image={{ placeholderHue: 218 }}
              overlayStart={<LevelBadge level={90} max={90} size={40} />}
              meta={<RarityMarker tier={5} label="Legendary" />}
              selected
            />
            <PortraitCard
              title="Kaito Rhune"
              subtitle="Ashen Ranger"
              image={{ placeholderHue: 18 }}
              overlayStart={<LevelBadge level={64} max={80} progress={0.75} size={40} />}
              meta={<RarityMarker tier={4} label="Epic" />}
              actions={
                <Button size="sm" variant="secondary">
                  Equip
                </Button>
              }
            />
            <PortraitCard title="Unknown traveller" subtitle="No artwork available" image={{ showMissing: true }} />
          </div>
          <div className={shared.grid2}>
            <div className={shared.stack}>
              <EquipmentSlot
                slot="Armor"
                icon={<ArmorIcon size={24} />}
                item={{ name: "Starweave Mantle", rarity: { tier: 4, label: "Epic" }, detail: "Lv 30 / 35", tone: "violet" }}
              />
              <EquipmentSlot slot="Accessory" icon={<CrystalIcon size={24} />} item={null} />
            </div>
            <div className={shared.stack}>
              <QuestNode title="Light on the Horizon" status="cleared" eyebrow="Stage 1" href="#" />
              <QuestNode title="Where the Crystals Sing" status="current" eyebrow="Stage 3" href="#" />
              <QuestNode title="The Warden Waits" status="available" eyebrow="Stage 4" href="#" />
              <QuestNode title="Echoes Beneath" status="locked" eyebrow="Stage 5" href="#" />
            </div>
          </div>
          <div className={shared.grid3}>
            <RewardTile name="Gems" icon={<GemIcon size={24} />} quantity={100} state="available" />
            <RewardTile name="Summon ticket" icon={<TicketIcon size={24} />} quantity={1} tone="violet" state="claimed" />
            <RewardTile name="Gift box" icon={<GiftIcon size={24} />} quantity={1} tone="gold" state="locked" />
          </div>
        </Panel>

        <Panel surface="plain" heading="Interactive states" headingLevel={3}>
          <InteractiveSignatureDemo />
        </Panel>

        <ResultSummary
          celebrate
          title="Quest cleared"
          subtitle="Where the Crystals Sing · 15 turns"
          stats={
            <StatList
              items={[
                { label: "Turns", value: 15 },
                { label: "Score", value: 3836665 },
                { label: "Damage taken", value: 2292 },
              ]}
            />
          }
          rewards={[
            <RewardTile key="g" name="Gems" icon={<GemIcon size={24} />} quantity={100} state="claimed" />,
            <RewardTile key="t" name="Summon ticket" icon={<TicketIcon size={24} />} tone="violet" quantity={1} state="claimed" />,
            <RewardTile key="c" name="Coins" icon={<CoinIcon size={24} />} tone="gold" quantity={5000} state="claimed" />,
          ]}
          actions={
            <>
              <Link href="/omnia-ui/quests" className={buttonClasses({ variant: "secondary" })}>
                Back to quests
              </Link>
              <Button variant="primary">Next stage</Button>
            </>
          }
        />

        <BannerFeature
          eyebrow="Limited campaign"
          title="Crystalline Dawn"
          description="A seasonal event with new story stages and an exclusive armour set."
          availability="Until 28 Feb · 23:59 UTC"
          image={{ placeholderHue: 230 }}
          actions={
            <>
              <Button variant="primary" size="lg">
                Join the event
              </Button>
              <Button variant="secondary" size="lg">
                Details
              </Button>
            </>
          }
        />
      </section>

      <section className={shared.section} aria-labelledby="text-areas-note">
        <SectionHeading id="text-areas-note" title="Not included" />
        <p className={shared.note}>
          Toast is intentionally omitted: no flow in the showcase needs an interruptive transient message. Status
          updates use inline <code>role=&quot;status&quot;</code> regions instead.
        </p>
      </section>
    </div>
  );
}

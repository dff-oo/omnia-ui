import type { Metadata } from "next";
import { Callout, Panel, SectionHeading } from "@/components/omnia-ui";
import { characters } from "@/fixtures/omnia";
import shared from "../_showcase/showcase.module.css";
import { Playground } from "./Playground";
import styles from "./playground.module.css";

export const metadata: Metadata = { title: "Accessibility" };

export default function AccessibilityPage() {
  return (
    <div className={shared.page}>
      <SectionHeading
        level={1}
        size="page"
        title="Accessibility playground"
        description="Stress the components with zoom, reduced motion, missing images, long strings and a narrow viewport."
      />

      <Playground character={characters[0]} />

      <div className={shared.grid2}>
        <Panel surface="plain" heading="Built in" headingLevel={2}>
          <ul className={styles.checklist}>
            <li>Visible focus ring on every interactive element; Base UI handles focus trap and return for overlays.</li>
            <li>Status uses text and icon, never colour alone (quests, badges, deltas, rarity).</li>
            <li>Minimum 44px hit area, including small buttons.</li>
            <li>Changes in roster, party, missions and forms are announced through status regions.</li>
            <li>Forced-colours fallbacks for faceted surfaces, controls and meters.</li>
            <li>Motion honours <code>prefers-reduced-motion</code>; transparency honours <code>prefers-reduced-transparency</code>.</li>
          </ul>
        </Panel>
        <Panel surface="plain" heading="Check manually" headingLevel={2}>
          <ul className={styles.checklist}>
            <li>Keyboard only: Tab through every page; arrow keys inside tabs, radios, menus and segmented controls.</li>
            <li>Screen reader pass (NVDA, VoiceOver) on dialogs, select and the party editor.</li>
            <li>Browser zoom at 200% and 400% (reflow) on the real page, not just this preview.</li>
            <li>Windows High Contrast / forced colours.</li>
          </ul>
          <Callout tone="info" title="Not an audit">
            These checks support, but do not replace, testing with assistive technology users.
          </Callout>
        </Panel>
      </div>
    </div>
  );
}

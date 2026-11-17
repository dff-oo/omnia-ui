import type { Metadata } from "next";
import { EquipmentOverview, PartyEditor, SectionHeading } from "@/components/omnia-ui";
import { characters, equipment } from "@/fixtures/omnia";
import shared from "../_showcase/showcase.module.css";

export const metadata: Metadata = { title: "Party & equipment" };

const lead = characters[0];

export default function PartyPage() {
  return (
    <div className={shared.page}>
      <SectionHeading
        level={1}
        size="page"
        title="Party & equipment"
        description="Every drag-like action has a button alternative: change, move left or right, and remove. Changes are announced."
      />

      <section className={shared.section} aria-labelledby="party">
        <SectionHeading id="party" title="Party editor" description="Three slots. One is empty to show the empty-slot state." />
        <PartyEditor roster={characters} initialParty={["aster", "mira", null]} />
      </section>

      <section className={shared.section} aria-labelledby="equipment">
        <SectionHeading id="equipment" title={`Equipment · ${lead.name}`} description="Compare candidates before equipping. Deltas use sign and arrow, not colour alone." />
        <EquipmentOverview initialEquipment={lead.equipment} inventory={Object.values(equipment)} />
      </section>
    </div>
  );
}

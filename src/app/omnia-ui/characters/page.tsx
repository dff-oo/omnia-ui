import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import {
  buttonClasses,
  CharacterOverview,
  CharacterRoster,
  SectionHeading,
  Skeleton,
} from "@/components/omnia-ui";
import { characters, roles } from "@/fixtures/omnia";
import shared from "../_showcase/showcase.module.css";

export const metadata: Metadata = { title: "Characters" };

type SearchParams = PageProps<"/omnia-ui/characters">["searchParams"];

async function SelectedCharacter({ searchParams }: { searchParams: SearchParams }) {
  const { c } = await searchParams;
  const selected = characters.find((character) => character.id === c) ?? characters[0];
  return (
    <CharacterOverview
      character={selected}
      headingLevel={3}
      actions={
        <>
          <Link href="/omnia-ui/party" className={buttonClasses({ variant: "primary" })}>
            Add to party
          </Link>
          <Link href="/omnia-ui/party#equipment" className={buttonClasses({ variant: "secondary" })}>
            Equipment
          </Link>
        </>
      }
    />
  );
}

export default function CharactersPage({ searchParams }: PageProps<"/omnia-ui/characters">) {
  return (
    <div className={shared.page}>
      <SectionHeading
        level={1}
        size="page"
        title="Characters"
        description="A roster with search, filtering, sorting and grid/list views, plus a detail overview. Selecting a character updates the URL."
      />

      <section className={shared.section} aria-labelledby="overview">
        <SectionHeading id="overview" eyebrow="Selected" title="Character overview" />
        <Suspense fallback={<Skeleton height={320} />}>
          <SelectedCharacter searchParams={searchParams} />
        </Suspense>
      </section>

      <section className={shared.section} aria-labelledby="roster">
        <SectionHeading id="roster" title="Roster" description="Includes a deliberately long name to test wrapping." />
        <CharacterRoster characters={characters} roles={roles} hrefPrefix="/omnia-ui/characters?c=" />
      </section>

      <section className={shared.section} aria-labelledby="loading">
        <SectionHeading id="loading" title="Loading state" />
        <CharacterRoster characters={[]} roles={roles} loading />
      </section>

      <section className={shared.section} aria-labelledby="empty">
        <SectionHeading id="empty" title="Empty state" />
        <CharacterRoster characters={[]} roles={roles} />
      </section>
    </div>
  );
}

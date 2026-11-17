"use client";

import Link from "next/link";
import { memo, useDeferredValue, useMemo, useState } from "react";
import { Button } from "../foundations/Button";
import { Badge } from "../foundations/Badge";
import { EmptyState, Skeleton } from "../foundations/Feedback";
import { ImageFrame } from "../foundations/Media";
import { SegmentedControl } from "../foundations/SegmentedControl";
import { Select } from "../foundations/Select";
import { TextField } from "../foundations/TextField";
import { GridIcon, ListIcon, SearchIcon } from "../icons";
import { PortraitCard } from "../signature/Cards";
import { LevelBadge, RarityMarker } from "../signature/Data";
import styles from "./Compositions.module.css";
import type { CharacterSummary } from "./types";

type SortKey = "level" | "rarity" | "name";
type View = "grid" | "list";

export interface CharacterRosterProps {
  characters: CharacterSummary[];
  roles: string[];
  loading?: boolean;
  /** Detail links are built as `{hrefPrefix}{character.id}`. */
  hrefPrefix?: string;
  showArt?: boolean;
}

const sorters: Record<SortKey, (a: CharacterSummary, b: CharacterSummary) => number> = {
  level: (a, b) => b.level - a.level || a.name.localeCompare(b.name),
  rarity: (a, b) => b.rarity.tier - a.rarity.tier || b.level - a.level,
  name: (a, b) => a.name.localeCompare(b.name),
};

const RosterCard = memo(function RosterCard({
  character,
  href,
  showArt,
}: {
  character: CharacterSummary;
  href?: string;
  showArt: boolean;
}) {
  return (
    <PortraitCard
      title={character.name}
      subtitle={character.epithet}
      href={href}
      image={{ placeholderHue: character.hue, showMissing: !showArt }}
      overlayStart={<LevelBadge level={character.level} max={character.maxLevel} progress={character.progress} size={40} />}
      meta={
        <>
          <RarityMarker tier={character.rarity.tier} label={character.rarity.label} />
          <Badge>{character.role}</Badge>
        </>
      }
    />
  );
});

const RosterRow = memo(function RosterRow({
  character,
  href,
  showArt,
}: {
  character: CharacterSummary;
  href?: string;
  showArt: boolean;
}) {
  return (
    <div className={styles.row}>
      <ImageFrame ratio={1} placeholderHue={character.hue} showMissing={!showArt} />
      <div className={styles.rowText}>
        <span className={styles.rowName}>{href ? <Link href={href}>{character.name}</Link> : character.name}</span>
        <span className={styles.rowMeta}>
          <span>{character.role}</span>
          <span>{character.affinity}</span>
        </span>
      </div>
      <div className={styles.rowEnd}>
        <RarityMarker tier={character.rarity.tier} label={character.rarity.label} />
        <LevelBadge level={character.level} max={character.maxLevel} progress={character.progress} size={40} />
      </div>
    </div>
  );
});

export function CharacterRoster({ characters, roles, loading, hrefPrefix, showArt = true }: CharacterRosterProps) {
  const [query, setQuery] = useState("");
  const [role, setRole] = useState<string>("all");
  const [sort, setSort] = useState<SortKey>("level");
  const [view, setView] = useState<View>("grid");
  const deferredQuery = useDeferredValue(query);

  const visible = useMemo(() => {
    const needle = deferredQuery.trim().toLowerCase();
    return characters
      .filter((character) => role === "all" || character.role === role)
      .filter(
        (character) =>
          !needle ||
          character.name.toLowerCase().includes(needle) ||
          character.epithet.toLowerCase().includes(needle),
      )
      .sort(sorters[sort]);
  }, [characters, deferredQuery, role, sort]);

  const filtered = query !== "" || role !== "all";
  const resetFilters = () => {
    setQuery("");
    setRole("all");
  };

  return (
    <div className={styles.overviewMain} aria-busy={loading || undefined}>
      <div className={styles.toolbar}>
        <TextField
          label="Search"
          type="search"
          placeholder="Name or title"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          prefix={<SearchIcon size={16} />}
        />
        <Select
          label="Role"
          value={role}
          onValueChange={(next) => setRole(next ?? "all")}
          options={[{ value: "all", label: "All roles" }, ...roles.map((r) => ({ value: r, label: r }))]}
        />
        <Select
          label="Sort by"
          value={sort}
          onValueChange={(next) => setSort((next as SortKey) ?? "level")}
          options={[
            { value: "level", label: "Level" },
            { value: "rarity", label: "Rarity" },
            { value: "name", label: "Name" },
          ]}
        />
        <SegmentedControl
          label="Layout"
          iconOnly
          value={view}
          onValueChange={setView}
          options={[
            { value: "grid", label: "Grid", icon: <GridIcon size={16} /> },
            { value: "list", label: "List", icon: <ListIcon size={16} /> },
          ]}
        />
      </div>

      <div className={styles.resultBar}>
        <p role="status">
          {loading ? "Loading characters…" : `${visible.length} of ${characters.length} characters`}
        </p>
        {filtered && !loading && (
          <Button size="sm" variant="ghost" onClick={resetFilters}>
            Clear filters
          </Button>
        )}
      </div>

      {loading ? (
        <ul className={styles.grid} aria-hidden>
          {Array.from({ length: 4 }, (_, index) => (
            <li key={index} className={styles.cardSkeleton}>
              <Skeleton height={240} />
              <Skeleton shape="text" width="70%" />
              <Skeleton shape="text" width="45%" />
            </li>
          ))}
        </ul>
      ) : visible.length === 0 ? (
        <EmptyState
          icon={<SearchIcon size={24} />}
          title="No characters match"
          description="Try a different name, or clear the filters to see the whole roster."
          actions={
            <Button variant="secondary" onClick={resetFilters}>
              Clear filters
            </Button>
          }
        />
      ) : view === "grid" ? (
        <ul className={styles.grid}>
          {visible.map((character) => (
            <li key={character.id}>
              <RosterCard character={character} href={hrefPrefix ? `${hrefPrefix}${character.id}` : undefined} showArt={showArt} />
            </li>
          ))}
        </ul>
      ) : (
        <ul className={styles.list}>
          {visible.map((character) => (
            <li key={character.id}>
              <RosterRow character={character} href={hrefPrefix ? `${hrefPrefix}${character.id}` : undefined} showArt={showArt} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

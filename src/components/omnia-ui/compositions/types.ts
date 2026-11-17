/*
 * Illustrative data shapes for the demo compositions.
 * These are presentation contracts only — no game rules, formulas or real game data.
 */

export type RewardKind = "gem" | "coin" | "ticket" | "crystal" | "gift";

export interface RewardSummary {
  id: string;
  name: string;
  kind: RewardKind;
  quantity: number;
  /** 1-based rarity tier, used only for colour/label. */
  tier?: number;
}

export interface RarityTier {
  tier: number;
  label: string;
}

export type EquipmentSlotKind = "weapon" | "armor" | "accessory" | "charm";

export interface EquipmentItem {
  id: string;
  slot: EquipmentSlotKind;
  name: string;
  rarity: RarityTier;
  level: number;
  maxLevel: number;
  stats: { label: string; value: number }[];
}

export interface CharacterSummary {
  id: string;
  name: string;
  epithet: string;
  role: string;
  affinity: string;
  level: number;
  maxLevel: number;
  /** 0–1 progress to the next level. */
  progress: number;
  rarity: RarityTier;
  /** Placeholder art hue. */
  hue: number;
  stats: {
    hp: number;
    maxHp: number;
    attack: number;
    defense: number;
    speed: number;
  };
  equipment: Partial<Record<EquipmentSlotKind, EquipmentItem>>;
}

export type QuestState = "locked" | "available" | "current" | "cleared";

export interface QuestSummary {
  id: string;
  chapterId: string;
  stage: number;
  title: string;
  state: QuestState;
  recommendedLevel: number;
  rewards: RewardSummary[];
}

export interface ChapterSummary {
  id: string;
  title: string;
  quests: QuestSummary[];
}

export interface MissionSummary {
  id: string;
  group: string;
  goal: string;
  progress: number;
  target: number;
  reward: RewardSummary;
  claimed: boolean;
}

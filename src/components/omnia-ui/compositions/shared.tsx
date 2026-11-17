import type { ReactNode } from "react";
import { ArmorIcon, CoinIcon, CrystalIcon, GemIcon, GiftIcon, RingIcon, SparkleIcon, SwordIcon, TicketIcon } from "../icons";
import type { Tone } from "../signature/Data";
import type { EquipmentSlotKind, RewardKind } from "./types";

export const rewardIcon: Record<RewardKind, ReactNode> = {
  gem: <GemIcon size={24} />,
  coin: <CoinIcon size={24} />,
  ticket: <TicketIcon size={24} />,
  crystal: <CrystalIcon size={24} />,
  gift: <GiftIcon size={24} />,
};

export const rewardTone: Record<RewardKind, Tone> = {
  gem: "accent",
  coin: "gold",
  ticket: "violet",
  crystal: "accent",
  gift: "gold",
};

export const slotIcon: Record<EquipmentSlotKind, ReactNode> = {
  weapon: <SwordIcon size={24} />,
  armor: <ArmorIcon size={24} />,
  accessory: <RingIcon size={24} />,
  charm: <SparkleIcon size={24} />,
};

export const slotLabel: Record<EquipmentSlotKind, string> = {
  weapon: "Weapon",
  armor: "Armor",
  accessory: "Accessory",
  charm: "Charm",
};
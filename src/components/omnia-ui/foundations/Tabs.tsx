import { Tabs as BaseTabs } from "@base-ui/react/tabs";
import type { ComponentProps } from "react";
import { cx } from "../lib/cx";
import styles from "./Tabs.module.css";

type WithStringClassName<T> = Omit<T, "className"> & { className?: string };

export type TabsProps = WithStringClassName<ComponentProps<typeof BaseTabs.Root>>;

export function Tabs({ className, ...props }: TabsProps) {
  return <BaseTabs.Root className={cx(styles.root, className)} {...props} />;
}

export type TabListProps = WithStringClassName<ComponentProps<typeof BaseTabs.List>>;

export function TabList({ className, children, ...props }: TabListProps) {
  return (
    <BaseTabs.List className={cx(styles.list, className)} {...props}>
      {children}
      <BaseTabs.Indicator className={styles.indicator} />
    </BaseTabs.List>
  );
}

export type TabProps = WithStringClassName<ComponentProps<typeof BaseTabs.Tab>>;

export function Tab({ className, ...props }: TabProps) {
  return <BaseTabs.Tab className={cx(styles.tab, className)} {...props} />;
}

export type TabPanelProps = WithStringClassName<ComponentProps<typeof BaseTabs.Panel>>;

export function TabPanel({ className, ...props }: TabPanelProps) {
  return <BaseTabs.Panel className={cx(styles.panel, className)} {...props} />;
}

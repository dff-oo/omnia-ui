"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { sections } from "./sections";
import styles from "./showcase.module.css";

export function ShowcaseNav() {
  const pathname = usePathname();
  return (
    <nav aria-label="Showcase sections" className={styles.nav}>
      <ul className={styles.navList}>
        {sections.map((section) => (
          <li key={section.href}>
            <Link
              href={section.href}
              className={styles.navLink}
              aria-current={pathname === section.href ? "page" : undefined}
            >
              {section.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

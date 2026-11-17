import Link from "next/link";
import { Badge, CrystalIcon, ThemeSwitcher } from "@/components/omnia-ui";
import { ShowcaseNav } from "./_showcase/ShowcaseNav";
import styles from "./_showcase/showcase.module.css";

export default function ShowcaseLayout({ children }: LayoutProps<"/omnia-ui">) {
  return (
    <div className={styles.shell}>
      <a href="#main" className={styles.skip}>
        Skip to content
      </a>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <Link href="/omnia-ui" className={styles.brand}>
            <span className={styles.brandMark} aria-hidden>
              <CrystalIcon size={20} />
            </span>
            <span className={styles.brandName}>Omnia UI</span>
            <Badge tone="accent" className={styles.brandBadge}>
              Showcase
            </Badge>
          </Link>
          <ThemeSwitcher />
        </div>
      </header>
      <div className={styles.layout}>
        <ShowcaseNav />
        <main id="main" tabIndex={-1} className={styles.main}>
          {children}
        </main>
      </div>
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          Omnia UI is an independent design system inspired by the mood of <i>Dissidia Final Fantasy Opera Omnia</i>.
          It is not affiliated with or endorsed by Square Enix. All artwork shown is generated placeholder art.
        </div>
      </footer>
    </div>
  );
}

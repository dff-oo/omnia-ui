import type { Metadata } from "next";
import { ThemeScript, TooltipProvider } from "@/components/omnia-ui";
import "@/components/omnia-ui/styles/tokens.css";
import "@/components/omnia-ui/styles/globals.css";

export const metadata: Metadata = {
  title: {
    default: "Omnia UI",
    template: "%s · Omnia UI",
  },
  description: "A modern fantasy-inflected React design system built on Base UI.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-omnia-theme="dark" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body>
        <div className="omnia-root">
          <TooltipProvider>{children}</TooltipProvider>
        </div>
      </body>
    </html>
  );
}

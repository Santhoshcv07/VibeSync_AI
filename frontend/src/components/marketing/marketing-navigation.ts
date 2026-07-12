export interface MarketingNavigationItem {
  label: string;
  href: string;
}

export const marketingNavigation: readonly MarketingNavigationItem[] = [
  {
    label: "How It Works",
    href: "/how-it-works",
  },
  {
    label: "About",
    href: "/about",
  },
];

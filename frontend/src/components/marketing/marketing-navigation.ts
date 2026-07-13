export interface MarketingNavigationItem {
  label: string;
  href: string;
}

export const marketingNavigation: readonly MarketingNavigationItem[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "How It Works",
    href: "#how-it-works",
  },
  {
    label: "Features",
    href: "#features",
  },
  {
    label: "Vibes",
    href: "/generate",
  },
  {
    label: "Pricing",
    href: "#pricing",
  },
  {
    label: "Blog",
    href: "#blog",
  },
];

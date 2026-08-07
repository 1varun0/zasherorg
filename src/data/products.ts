export type Product = {
  id: string;
  name: string;
  tag: string;
  description: string;
  href: string;
  accentColor: string; // Used to map to CSS variables like --sage, --amber
  svgIcon: string;
  status: 'live' | 'coming_soon';
};

export const products: Product[] = [
  {
    id: 'mindjournal',
    name: 'Mindjournal',
    tag: 'Mental health',
    description: 'A local-first journal to track your mental state. No streaks, no social features, no noise.',
    href: '/mindjournal',
    accentColor: 'sage',
    svgIcon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="10" cy="12" r="6" opacity="0.4"/><circle cx="14" cy="12" r="6"/></svg>',
    status: 'live',
  },
  {
    id: 'productivity',
    name: 'Productivity',
    tag: 'Organizing yourself',
    description: 'A daily planner built around priorities, not checklists. Block your time and ignore the noise.',
    href: '/productivity',
    accentColor: 'amber',
    svgIcon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="4" width="6" height="6" rx="1"/><rect x="14" y="4" width="6" height="6" rx="1" opacity="0.4"/><rect x="4" y="14" width="6" height="6" rx="1" opacity="0.4"/><rect x="14" y="14" width="6" height="6" rx="1"/></svg>',
    status: 'live',
  },
  {
    id: 'wallet-tracker',
    name: 'Wallet Tracker',
    tag: 'Coming next — Money',
    description: 'A manual expense tracker that forces you to face your spending. Currently in early development.',
    href: '/wallet-tracker',
    accentColor: 'slate',
    svgIcon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 18l6-6 4 4 6-8" /><path d="M14 8h6v6" opacity="0.4"/></svg>',
    status: 'coming_soon',
  }
];

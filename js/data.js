// ── BIN SVG ICONS (white silhouettes) ──────────────────────────────────────

const ICONS = {
  food: `<svg viewBox="0 0 56 72" fill="white" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="18" cy="40" rx="14" ry="22"/>
    <ellipse cx="38" cy="40" rx="14" ry="22"/>
    <rect x="25" y="5" width="6" height="13" rx="3"/>
    <path d="M28 12 Q37 5 41 10" stroke="white" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  </svg>`,

  paperPkg: `<svg viewBox="0 0 56 72" fill="white" xmlns="http://www.w3.org/2000/svg">
    <polygon points="28,8 48,30 8,30"/>
    <rect x="8" y="30" width="40" height="36" rx="4"/>
    <line x1="28" y1="30" x2="28" y2="8" stroke="rgba(161,120,74,0.35)" stroke-width="1.5"/>
  </svg>`,

  plastic: `<svg viewBox="0 0 56 72" fill="white" xmlns="http://www.w3.org/2000/svg">
    <rect x="22" y="4" width="12" height="7" rx="3"/>
    <rect x="23" y="11" width="10" height="11" rx="3"/>
    <path d="M23 22 Q8 29 8 40 L8 64 Q8 68 13 68 L43 68 Q48 68 48 64 L48 40 Q48 29 33 22 Z"/>
  </svg>`,

  paper: `<svg viewBox="0 0 60 72" fill="white" xmlns="http://www.w3.org/2000/svg">
    <rect x="4"  y="52" width="48" height="14" rx="3" opacity="0.65"/>
    <rect x="8"  y="36" width="48" height="15" rx="3" opacity="0.82"/>
    <rect x="4"  y="20" width="48" height="15" rx="3"/>
    <rect x="10" y="25" width="28" height="2.5" rx="1.2" fill="rgba(21,101,192,0.5)"/>
    <rect x="10" y="30" width="18" height="2.5" rx="1.2" fill="rgba(21,101,192,0.5)"/>
  </svg>`,

  metal: `<svg viewBox="0 0 56 72" fill="white" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="28" cy="17" rx="20" ry="7"/>
    <rect x="8" y="17" width="40" height="38"/>
    <ellipse cx="28" cy="55" rx="20" ry="7"/>
    <ellipse cx="28" cy="17" rx="13" ry="4" fill="rgba(84,110,122,0.35)"/>
    <rect x="10" y="29" width="36" height="14" fill="rgba(255,255,255,0.12)" rx="2"/>
  </svg>`
};

// ── BIN DEFINITIONS ────────────────────────────────────────────────────────

const BINS = [
  { key: 'food',      label: 'Food Waste',   swedish: 'Matavfall',              color: '#2e7d32', icon: ICONS.food },
  { key: 'paperPkg',  label: 'Paper Pkg',    swedish: 'Pappers\u200Bf\u00F6rp.', color: '#8d6e63', icon: ICONS.paperPkg },
  { key: 'plastic',   label: 'Plastic Pkg',  swedish: 'Plast\u200Bf\u00F6rp.',   color: '#7b1fa2', icon: ICONS.plastic },
  { key: 'paper',     label: 'Newspaper',    swedish: 'Tidningar',               color: '#1565c0', icon: ICONS.paper },
  { key: 'metal',     label: 'Metal',        swedish: 'Metall\u200Bf\u00F6rp.',  color: '#546e7a', icon: ICONS.metal }
];

// ── QUESTION BANK ──────────────────────────────────────────────────────────

const QUESTIONS = [
  {
    item: 'Plastic water bottle',
    emoji: '🧴',
    correctBin: 'plastic',
    hint: 'Clean plastic containers go to Plastic Packaging (Plastförpackningar).'
  },
  {
    item: 'Banana peel',
    emoji: '🍌',
    correctBin: 'food',
    hint: 'Food scraps become biogas and biofertilizer — they power buses!'
  },
  {
    item: 'Aluminium soda can',
    emoji: '🥫',
    correctBin: 'metal',
    hint: 'Metal packaging is infinitely recyclable and extremely valuable.'
  },
  {
    item: 'Newspaper',
    emoji: '📰',
    correctBin: 'paper',
    hint: 'Newspapers and magazines go to Newspaper & Paper (Tidningar & papper).'
  },
  {
    item: 'Milk carton (Tetra Pak)',
    emoji: '🥛',
    correctBin: 'paperPkg',
    hint: 'Liquid food cartons go to Paper Packaging (Pappers­förpackningar).'
  },
  {
    item: 'Apple core',
    emoji: '🍎',
    correctBin: 'food',
    hint: 'All food leftovers, including fruit cores, go to Food Waste (Matavfall).'
  },
  {
    item: 'Cardboard egg carton',
    emoji: '🥚',
    correctBin: 'paperPkg',
    hint: 'Cardboard packaging like egg cartons goes to Paper Packaging.'
  },
  {
    item: 'Ketchup bottle (plastic)',
    emoji: '🍅',
    correctBin: 'plastic',
    hint: 'Rinse it and sort it into Plastic Packaging.'
  },
  {
    item: 'Tin soup can',
    emoji: '🥣',
    correctBin: 'metal',
    hint: 'Steel and tin cans go to Metal Packaging (Metallförpackningar).'
  },
  {
    item: 'Office paper / printing paper',
    emoji: '📄',
    correctBin: 'paper',
    hint: 'Loose paper and magazines go to Newspaper & Paper.'
  }
];

export interface OCItem {
  id: string;
  label: string;
  emoji: string;
  /** Purely cosmetic accent color for the item's card — not a rarity tier. */
  color: string;
}

export interface OCCase {
  id: string;
  name: string;
  tagline: string;
  accent: string;
  items: OCItem[];
}

export interface CaseGroup {
  id: string;
  name: string;
  description: string;
  cases: OCCase[];
}

/** One resolved pick, stored per case id once a case has been opened. */
export interface CaseResult {
  caseId: string;
  item: OCItem;
  rolledAt: number;
}

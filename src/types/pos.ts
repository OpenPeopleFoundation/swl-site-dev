export type TableZone = "dining" | "chef" | "bar";
export type TableStatus = "open" | "ordering" | "served" | "paying";

export type TableBlock = {
  id: string;
  label: string;
  seats: number;
  zone: TableZone;
  canCombine: boolean;
  status: TableStatus;
  currentCourse?: string;
  lastOrderMinutes?: number;
  seatedMinutes?: number;
  guestNames?: string[];
  billTotal?: number;
};

export type MenuItem = {
  id: string;
  name: string;
  price: number;
  tags?: string[];
  modifierKey?: string;
};

export type MenuCategory = {
  id: string;
  label: string;
  color: string;
  items: MenuItem[];
};

export type ModifierSuggestion = {
  id: string;
  label: string;
  defaultApplied?: boolean;
};

export type PosCheckStatus = "open" | "fired" | "settled";

export type PosCheck = {
  id: string;
  tableSlugs: string[];
  status: PosCheckStatus;
  guestNames: string[];
  currentCourse: string | null;
  receiptNote: string | null;
  revision: number;
  openedBy: string;
  openedAt: string;
  updatedAt: string;
};

export type PosCheckLine = {
  id: string;
  checkId: string;
  name: string;
  seat: string;
  price: number;
  qty: number;
  menuItemId?: string | null;
  modifierKey?: string | null;
  modifiers: string[];
  comp: boolean;
  splitMode: "none" | "even" | "custom";
  transferTo?: string | null;
  customSplitNote?: string | null;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
};

export type PosBootstrapPayload = {
  tables: TableBlock[];
  menu: MenuCategory[];
  modifiers: Record<string, ModifierSuggestion[]>;
  checks: PosCheck[];
  checkLines: PosCheckLine[];
};

export type AddLinePayload = Pick<
  PosCheckLine,
  "name" | "seat" | "price" | "menuItemId" | "modifierKey" | "modifiers"
> & { qty?: number };

export type UpdateLinePayload = {
  lineId: string;
  qty?: number;
  comp?: boolean;
  splitMode?: "none" | "even" | "custom";
  transferTo?: string | null;
  customSplitNote?: string | null;
  modifiers?: string[];
};

export type UpdateCheckPayload = {
  guestNames?: string[];
  currentCourse?: string | null;
  receiptNote?: string | null;
  status?: PosCheckStatus;
  expectedRevision?: number;
};

// Legacy types for compatibility with older POS code
export type TableDefinition = {
  dbId: string;
  id: string;
  label: string;
  seats: number;
  zone: TableZone;
  canCombine: boolean;
  sortOrder: number;
};

export type PosTicket = {
  id: string;
  tableIds: string[];
  tableSlugs: string[];
  seatMap: string[];
  guestNames: string[];
  status: string;
  currentCourse: string | null;
  receiptNote: string | null;
  lastFireAt: string | null;
  seatedAt: string | null;
  revision: number;
  updatedAt: string | null;
};

export type PosTicketLine = {
  id: string;
  ticketId: string;
  menuItemId: string | null;
  name: string;
  seat: string;
  price: number;
  qty: number;
  modifierKey: string | null;
  modifiers: string[];
  comp: boolean;
  splitMode: "none" | "even" | "custom";
  transferTo: string | null;
  customSplitNote: string | null;
  createdAt: string;
  updatedAt: string | null;
};


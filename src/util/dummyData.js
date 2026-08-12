/** Hardcoded demo account — credentials + FE-only page data */
export const DEMO_USER = {
  email: "abcd@gmail.com",
  password: "abcd",
  fullName: "Demo User",
};

export const DUMMY_BUDGETS = [
  { id: "b1", category: "Food & Dining", limit: 8000, spent: 6390, icon: "🍔" },
  { id: "b2", category: "Transport", limit: 4000, spent: 3180, icon: "🚗" },
  { id: "b3", category: "Shopping", limit: 8000, spent: 7700, icon: "🛍️" },
  { id: "b4", category: "Entertainment", limit: 2500, spent: 1549, icon: "🎬" },
  { id: "b5", category: "Utilities", limit: 4000, spent: 2849, icon: "💡" },
  { id: "b6", category: "Health", limit: 3000, spent: 980, icon: "🏥" },
  { id: "b7", category: "Rent", limit: 22000, spent: 22000, icon: "🏠" },
];

export const DUMMY_GOALS = [
  { id: "g1", name: "Emergency Fund", target: 150000, saved: 62000, icon: "🛡️", deadline: "2026-12-31" },
  { id: "g2", name: "Goa Trip", target: 40000, saved: 22500, icon: "✈️", deadline: "2026-10-15" },
  { id: "g3", name: "New MacBook", target: 120000, saved: 48000, icon: "💻", deadline: "2027-03-01" },
  { id: "g4", name: "SIP Top-up", target: 50000, saved: 18000, icon: "📈", deadline: "2026-11-30" },
];

export const DUMMY_BILLS = [
  { id: "bl1", name: "Electricity Bill", amount: 1850, dueDate: "2026-07-28", paid: false, icon: "⚡" },
  { id: "bl2", name: "Internet (Airtel)", amount: 999, dueDate: "2026-08-05", paid: false, icon: "📶" },
  { id: "bl3", name: "Netflix", amount: 649, dueDate: "2026-08-01", paid: true, icon: "📺" },
  { id: "bl4", name: "Rent", amount: 22000, dueDate: "2026-08-01", paid: false, icon: "🏠" },
  { id: "bl5", name: "Mobile Recharge", amount: 299, dueDate: "2026-07-30", paid: false, icon: "📱" },
  { id: "bl6", name: "Gym Membership", amount: 1500, dueDate: "2026-08-03", paid: false, icon: "🏋️" },
];

const BASE_KEYS = {
  budgets: "mm_budgets",
  goals: "mm_goals",
  bills: "mm_bills",
  seeded: "mm_seeded",
};

const LEGACY_KEYS = ["mm_budgets", "mm_goals", "mm_bills", "mm_seeded_v2_demo"];

function currentEmail() {
  return (localStorage.getItem("userEmail") || "").toLowerCase().trim();
}

function isDemoUser(email = currentEmail()) {
  return email === DEMO_USER.email.toLowerCase();
}

function scopedKey(baseKey, email = currentEmail()) {
  const scope = email || "guest";
  return `${baseKey}__${scope}`;
}

/** Remove old global (non-scoped) demo keys so they cannot leak to new users */
export function clearLegacyDemoKeys() {
  LEGACY_KEYS.forEach((key) => localStorage.removeItem(key));
}

export function setActiveUserEmail(email) {
  if (email) {
    localStorage.setItem("userEmail", email.toLowerCase().trim());
  } else {
    localStorage.removeItem("userEmail");
  }
}

export function seedDummyData(force = false) {
  const email = currentEmail();
  if (!isDemoUser(email)) return;

  const seededKey = scopedKey(BASE_KEYS.seeded, email);
  if (!force && localStorage.getItem(seededKey)) return;

  localStorage.setItem(scopedKey(BASE_KEYS.budgets, email), JSON.stringify(DUMMY_BUDGETS));
  localStorage.setItem(scopedKey(BASE_KEYS.goals, email), JSON.stringify(DUMMY_GOALS));
  localStorage.setItem(scopedKey(BASE_KEYS.bills, email), JSON.stringify(DUMMY_BILLS));
  localStorage.setItem(seededKey, "1");
}

/** Ensure the signed-in user has their own empty lists (new users) or demo data (demo user) */
export function initUserLocalData(email) {
  clearLegacyDemoKeys();
  setActiveUserEmail(email);

  if (isDemoUser(email)) {
    seedDummyData(true);
    return;
  }

  const normalized = (email || "").toLowerCase().trim();
  [BASE_KEYS.budgets, BASE_KEYS.goals, BASE_KEYS.bills].forEach((baseKey) => {
    const key = scopedKey(baseKey, normalized);
    if (!localStorage.getItem(key)) {
      localStorage.setItem(key, JSON.stringify([]));
    }
  });
}

export function loadList(key, fallback = []) {
  try {
    const raw = localStorage.getItem(scopedKey(key));
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function saveList(key, list) {
  localStorage.setItem(scopedKey(key), JSON.stringify(list));
}

export const STORE_KEYS = BASE_KEYS;
export { isDemoUser };

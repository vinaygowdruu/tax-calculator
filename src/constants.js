// ─── FY 2025-26 Tax Constants ────────────────────────────────────────────────
// All values in INR. Source: Finance Act 2025 / Budget 2025-26.

// Standard Deductions (Section 16(ia))
export const STANDARD_DEDUCTION_NEW = 75_000
export const STANDARD_DEDUCTION_OLD = 50_000

// Professional Tax cap (Section 16(iii)) — both regimes
export const PROF_TAX_CAP = 2_500

// Employer NPS deduction cap (Section 80CCD(2)) — both regimes
export const EMPLOYER_NPS_PCT_OF_BASIC = 0.14   // 14% of basic salary

// 80C combined cap — old regime only
export const CAP_80C = 1_50_000

// Personal NPS (Section 80CCD(1B)) — old regime only, over and above 80C
export const CAP_80CCD1B = 50_000

// 80D limits — old regime only
export const CAP_80D_SELF_BELOW60  = 25_000
export const CAP_80D_SELF_ABOVE60  = 50_000    // user is 60+
export const CAP_80D_PARENTS_BELOW60 = 25_000
export const CAP_80D_PARENTS_ABOVE60  = 50_000  // parents are 60+

// Home loan interest — Section 24(b), old regime only, self-occupied
export const CAP_24B = 2_00_000

// Savings interest deduction — old regime only
export const CAP_80TTA = 10_000   // below 60, savings account only
export const CAP_80TTB = 50_000   // 60+, savings + FD interest combined

// Section 87A Rebate — New Regime
export const REBATE_87A_NEW_INCOME_LIMIT = 12_00_000
export const REBATE_87A_NEW_MAX          = 60_000
// Marginal relief threshold — new regime
export const MARGINAL_RELIEF_THRESHOLD   = 12_00_000

// Section 87A Rebate — Old Regime (NOT available for super senior 80+)
export const REBATE_87A_OLD_INCOME_LIMIT = 5_00_000
export const REBATE_87A_OLD_MAX          = 12_500

// Cess — both regimes, applied after rebate
export const CESS_RATE = 0.04

// HRA percentages for exemption calculation
export const HRA_METRO_PCT    = 0.50   // metro cities
export const HRA_NONMETRO_PCT = 0.40   // all other cities
// Metro cities for FY 2025-26: Delhi, Mumbai, Kolkata, Chennai only
// Bangalore, Hyderabad, Pune, Ahmedabad become metro from FY 2026-27

// ─── Tax Slabs ────────────────────────────────────────────────────────────────
// Each slab: { upTo: number | null, rate: number }
// upTo: null means "above this" (highest slab)

export const NEW_REGIME_SLABS = [
  { upTo: 4_00_000,  rate: 0.00 },
  { upTo: 8_00_000,  rate: 0.05 },
  { upTo: 12_00_000, rate: 0.10 },
  { upTo: 16_00_000, rate: 0.15 },
  { upTo: 20_00_000, rate: 0.20 },
  { upTo: 24_00_000, rate: 0.25 },
  { upTo: null,      rate: 0.30 },
]

export const OLD_REGIME_SLABS_BELOW60 = [
  { upTo: 2_50_000,  rate: 0.00 },
  { upTo: 5_00_000,  rate: 0.05 },
  { upTo: 10_00_000, rate: 0.20 },
  { upTo: null,      rate: 0.30 },
]

export const OLD_REGIME_SLABS_SENIOR = [   // 60–79 years
  { upTo: 3_00_000,  rate: 0.00 },
  { upTo: 5_00_000,  rate: 0.05 },
  { upTo: 10_00_000, rate: 0.20 },
  { upTo: null,      rate: 0.30 },
]

export const OLD_REGIME_SLABS_SUPER_SENIOR = [  // 80+ years
  { upTo: 5_00_000,  rate: 0.00 },
  { upTo: 10_00_000, rate: 0.20 },
  { upTo: null,      rate: 0.30 },
]

// Old regime basic exemption limits (for reference / display)
export const BASIC_EXEMPTION_OLD = {
  below60:     2_50_000,
  senior:      3_00_000,
  superSenior: 5_00_000,
}

// ─── Latest Tax News (curated) ───────────────────────────────────────────────
// Hand-picked recent updates on Indian income-tax rules. Update manually when
// the tax landscape changes. `date` is ISO (YYYY-MM-DD); newest first.
// `tag` groups items: 'Budget' | 'Regime' | 'Deadline' | 'Update'.
export const TAX_NEWS = [
  {
    date: '2025-07-31',
    tag: 'Deadline',
    title: 'ITR filing deadline for FY 2024-25 extended to 15 September 2025',
    summary:
      'The CBDT extended the due date for non-audit taxpayers to file returns for AY 2025-26, giving salaried individuals extra time.',
  },
  {
    date: '2025-04-01',
    tag: 'Regime',
    title: 'New tax regime is now the default from FY 2025-26',
    summary:
      'Unless you actively opt for the old regime, the new regime applies by default — with a ₹75,000 standard deduction and higher slab thresholds.',
  },
  {
    date: '2025-02-01',
    tag: 'Budget',
    title: 'Budget 2025: No income tax up to ₹12 lakh under the new regime',
    summary:
      'The enhanced Section 87A rebate means individuals with taxable income up to ₹12,00,000 pay zero tax under the new regime (₹12.75L with standard deduction).',
  },
  {
    date: '2025-02-01',
    tag: 'Budget',
    title: 'Revised new-regime slabs announced for FY 2025-26',
    summary:
      'Budget 2025 restructured the new-regime slabs, widening the 0% band and lowering effective rates for middle-income salaried taxpayers.',
  },
]

// ─── Wealth & Savings Quotes (curated) ───────────────────────────────────────
// Shown once per page. Picked deterministically by step number so each page has
// a stable quote that differs from its neighbours.
export const WEALTH_QUOTES = [
  { text: 'Do not save what is left after spending, but spend what is left after saving.', author: 'Warren Buffett' },
  { text: 'A penny saved is a penny earned.', author: 'Benjamin Franklin' },
  { text: 'The habit of saving is itself an education; it fosters every virtue, teaches self-denial, and cultivates the sense of order.', author: 'T. T. Munger' },
  { text: 'Never spend your money before you have earned it.', author: 'Thomas Jefferson' },
  { text: 'It is not how much money you make, but how much money you keep.', author: 'Robert Kiyosaki' },
  { text: 'Wealth consists not in having great possessions, but in having few wants.', author: 'Epictetus' },
  { text: 'An investment in knowledge pays the best interest.', author: 'Benjamin Franklin' },
  { text: 'The individual investor should act consistently as an investor and not as a speculator.', author: 'Benjamin Graham' },
  { text: 'Money is a terrible master but an excellent servant.', author: 'P. T. Barnum' },
  { text: 'The stock market is a device for transferring money from the impatient to the patient.', author: 'Warren Buffett' },
  { text: 'Beware of little expenses; a small leak will sink a great ship.', author: 'Benjamin Franklin' },
  { text: 'Rule No. 1: Never lose money. Rule No. 2: Never forget rule No. 1.', author: 'Warren Buffett' },
  { text: 'Financial peace isn’t the acquisition of stuff. It’s learning to live on less than you make.', author: 'Dave Ramsey' },
  { text: 'The goal isn’t more money. The goal is living life on your terms.', author: 'Chris Brogan' },
]

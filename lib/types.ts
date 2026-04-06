// ─── Contact Form ────────────────────────────────────────────────────────────

export interface ContactFormData {
    fullName: string
    email: string
    phone?: string
    company?: string
    suburb?: string
    message: string
  }
  
  // ─── Quote Form ──────────────────────────────────────────────────────────────
  
  export interface QuoteFormData {
    propertyType: string
    bedrooms: number
    bathrooms: number
    serviceType: string
    frequency: string
    condition: string
    extras: string[]
    fullName: string
    email: string
    phone?: string
    suburb?: string
  }
  
  // ─── Quote Result ────────────────────────────────────────────────────────────
  
  export interface QuoteResult {
    low: number
    high: number
  }
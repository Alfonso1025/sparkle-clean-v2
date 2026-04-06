import { Resend } from "resend"
import { ContactFormData, QuoteFormData, QuoteResult } from "./types"

const resend = new Resend(process.env.RESEND_API_KEY)
const ownerEmail = process.env.CONTACT_EMAIL
// ─── Interface ───────────────────────────────────────────────────────────────

export interface IEmailHTML {
  to: string
  buildPayload(): {
    from: string
    to: string
    replyTo?: string
    subject: string
    html: string
  }
}

// ─── Contact Enquiry ─────────────────────────────────────────────────────────

export class ContactEnquiry implements IEmailHTML {
  to: string
  private data: ContactFormData

  constructor(data: ContactFormData) {
    this.data = data
    if (!ownerEmail) throw new Error("CONTACT_EMAIL environment variable is not set")
    this.to = ownerEmail
  }

  buildPayload() {
    return {
      from: "Sparkle Clean Website <onboarding@resend.dev>",
      to: this.to,
      replyTo: this.data.email,
      subject: `New Enquiry from ${this.data.fullName}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1c1917; border-bottom: 2px solid #fbbf24; padding-bottom: 8px;">
            New Enquiry — Sparkle Clean
          </h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
            <tr>
              <td style="padding: 8px 0; color: #78716c; width: 140px;">Name</td>
              <td style="padding: 8px 0; color: #1c1917; font-weight: bold;">${this.data.fullName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #78716c;">Email</td>
              <td style="padding: 8px 0;">
                <a href="mailto:${this.data.email}" style="color: #d97706;">${this.data.email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #78716c;">Phone</td>
              <td style="padding: 8px 0; color: #1c1917;">${this.data.phone ?? "Not provided"}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #78716c;">Company</td>
              <td style="padding: 8px 0; color: #1c1917;">${this.data.company ?? "Not provided"}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #78716c;">Suburb</td>
              <td style="padding: 8px 0; color: #1c1917;">${this.data.suburb ?? "Not provided"}</td>
            </tr>
          </table>
          <div style="margin-top: 24px;">
            <p style="color: #78716c; margin-bottom: 8px;">Message</p>
            <div style="background: #f5f5f4; padding: 16px; color: #1c1917; line-height: 1.6; white-space: pre-wrap;">
              ${this.data.message}
            </div>
          </div>
          <p style="margin-top: 24px; color: #a8a29e; font-size: 12px;">
            Sent from the Sparkle Clean website contact form.
            Reply directly to this email to respond to ${this.data.fullName}.
          </p>
        </div>
      `,
    }
  }
}

// ─── Quote Enquiry — Owner ────────────────────────────────────────────────────

export class QuoteEnquiryOwner implements IEmailHTML {
  to: string
  private data: QuoteFormData
  private quote: QuoteResult

  constructor(data: QuoteFormData, quote: QuoteResult) {
    this.data = data
    this.quote = quote
    if (!ownerEmail) throw new Error("CONTACT_EMAIL environment variable is not set")
    this.to = ownerEmail
  }

  buildPayload() {
    const extrasDisplay = this.data.extras.length > 0
      ? this.data.extras.join(", ")
      : "None"

    return {
      from: "Sparkle Clean Website <onboarding@resend.dev>",
      to: this.to,
      replyTo: this.data.email,
      subject: `New Quote Request from ${this.data.fullName} — $${this.quote.low}–$${this.quote.high}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1c1917; border-bottom: 2px solid #fbbf24; padding-bottom: 8px;">
            New Quote Request — Sparkle Clean
          </h2>

          <h3 style="color: #1c1917; margin-top: 24px;">Customer Details</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #78716c; width: 140px;">Name</td>
              <td style="padding: 8px 0; color: #1c1917; font-weight: bold;">${this.data.fullName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #78716c;">Email</td>
              <td style="padding: 8px 0;">
                <a href="mailto:${this.data.email}" style="color: #d97706;">${this.data.email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #78716c;">Phone</td>
              <td style="padding: 8px 0; color: #1c1917;">${this.data.phone ?? "Not provided"}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #78716c;">Suburb</td>
              <td style="padding: 8px 0; color: #1c1917;">${this.data.suburb ?? "Not provided"}</td>
            </tr>
          </table>

          <h3 style="color: #1c1917; margin-top: 24px;">Property Details</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #78716c; width: 140px;">Property Type</td>
              <td style="padding: 8px 0; color: #1c1917;">${this.data.propertyType}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #78716c;">Bedrooms</td>
              <td style="padding: 8px 0; color: #1c1917;">${this.data.bedrooms}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #78716c;">Bathrooms</td>
              <td style="padding: 8px 0; color: #1c1917;">${this.data.bathrooms}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #78716c;">Service Type</td>
              <td style="padding: 8px 0; color: #1c1917;">${this.data.serviceType}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #78716c;">Frequency</td>
              <td style="padding: 8px 0; color: #1c1917;">${this.data.frequency}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #78716c;">Condition</td>
              <td style="padding: 8px 0; color: #1c1917;">${this.data.condition}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #78716c;">Extras</td>
              <td style="padding: 8px 0; color: #1c1917;">${extrasDisplay}</td>
            </tr>
          </table>

          <div style="margin-top: 24px; background: #fef3c7; border-left: 4px solid #fbbf24; padding: 16px;">
            <p style="color: #78716c; margin: 0 0 4px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;">
              Estimated Quote
            </p>
            <p style="color: #1c1917; font-size: 28px; font-weight: 300; margin: 0;">
              $${this.quote.low} – $${this.quote.high}
            </p>
          </div>

          <p style="margin-top: 24px; color: #a8a29e; font-size: 12px;">
            Sent from the Sparkle Clean quote calculator.
            Reply directly to this email to follow up with ${this.data.fullName}.
          </p>
        </div>
      `,
    }
  }
}

// ─── Quote Enquiry — User ─────────────────────────────────────────────────────

export class QuoteEnquiryUser implements IEmailHTML {
  to: string
  private data: QuoteFormData
  private quote: QuoteResult

  constructor(data: QuoteFormData, quote: QuoteResult) {
    this.data = data
    this.to = data.email
    this.quote = quote
  }

  buildPayload() {
    const extrasDisplay = this.data.extras.length > 0
      ? this.data.extras.join(", ")
      : "None selected"

    return {
      from: "Sparkle Clean <onboarding@resend.dev>",
      to: this.to,
      subject: `Your Sparkle Clean Quote — $${this.quote.low}–$${this.quote.high}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #1c1917; padding: 32px; text-align: center;">
            <h1 style="color: #fbbf24; font-weight: 300; letter-spacing: 0.2em; text-transform: uppercase; margin: 0;">
              Sparkle Clean
            </h1>
          </div>

          <div style="padding: 32px;">
            <p style="color: #1c1917;">Hi ${this.data.fullName},</p>
            <p style="color: #44403c; line-height: 1.6;">
              Thank you for using our quote calculator. Here is a summary of your estimated quote.
            </p>

            <div style="background: #fef3c7; border-left: 4px solid #fbbf24; padding: 24px; margin: 24px 0; text-align: center;">
              <p style="color: #78716c; margin: 0 0 4px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;">
                Your Estimated Price
              </p>
              <p style="color: #1c1917; font-size: 36px; font-weight: 300; margin: 0;">
                $${this.quote.low} – $${this.quote.high}
              </p>
            </div>

            <h3 style="color: #1c1917; border-bottom: 1px solid #e7e5e4; padding-bottom: 8px;">
              Quote Summary
            </h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #78716c; width: 140px;">Property</td>
                <td style="padding: 8px 0; color: #1c1917;">${this.data.propertyType}, ${this.data.bedrooms} bed / ${this.data.bathrooms} bath</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #78716c;">Service</td>
                <td style="padding: 8px 0; color: #1c1917;">${this.data.serviceType}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #78716c;">Frequency</td>
                <td style="padding: 8px 0; color: #1c1917;">${this.data.frequency}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #78716c;">Extras</td>
                <td style="padding: 8px 0; color: #1c1917;">${extrasDisplay}</td>
              </tr>
            </table>

            <div style="margin-top: 32px; text-align: center;">
              
                href="tel:0412345678"
                style="display: inline-block; background: #fbbf24; color: #1c1917; padding: 14px 32px; text-decoration: none; text-transform: uppercase; letter-spacing: 0.15em; font-size: 13px;"
              >
                Call to Book — 0412 345 678
              </a>
            </div>

            <p style="color: #78716c; font-size: 12px; margin-top: 32px; line-height: 1.6;">
              This is an estimate only. Final pricing is confirmed after a property inspection.
              Our team will be in touch within 2 hours during business hours.
            </p>
          </div>

          <div style="background: #1c1917; padding: 16px; text-align: center;">
            <p style="color: #78716c; font-size: 11px; margin: 0;">
              Sparkle Clean — Campbelltown NSW 2560 — hello@sparkleclean.com.au
            </p>
          </div>
        </div>
      `,
    }
  }
}

// ─── Send Email ───────────────────────────────────────────────────────────────

export const sendEmail = async (email: IEmailHTML): Promise<{ error: string | null }> => {
  try {
    const payload = email.buildPayload()
    const { error } = await resend.emails.send(payload)
    if (error) {
      console.error("Resend error:", error)
      return { error: error.message }
    }
    return { error: null }
  } catch (err) {
    console.error("sendEmail unexpected error:", err)
    return { error: "Unexpected error sending email." }
  }
}
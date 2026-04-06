import { NextRequest, NextResponse } from "next/server"
import { ContactFormData } from "@/lib/types"
import { ContactEnquiry } from "@/lib/sendEmail"
import { sendEmail } from "@/lib/sendEmail"

// Basic email format check
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

// Strip HTML tags to prevent injection
function sanitise(value: string): string {
  return value.replace(/<[^>]*>/g, "").trim()
}

export async function POST(req: NextRequest) {
  try {
    // 1. Parse the request body
    const body = await req.json()
    const { fullName, email, phone, company, suburb, message } = body

    // 2. Server-side validation of required fields
    if (!fullName || !email || !message) {
      return NextResponse.json(
        { error: "Full name, email and message are required." },
        { status: 400 }
      )
    }

    // 3. Validate email format
    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      )
    }

    // 4. Enforce length limits to prevent abuse
    if (fullName.length > 100 || message.length > 2000) {
      return NextResponse.json(
        { error: "Input exceeds maximum allowed length." },
        { status: 400 }
      )
    }

    // 5. Sanitise all inputs
    const cleanData: ContactFormData = {
      fullName: sanitise(fullName),
      email: sanitise(email),
      phone: phone ? sanitise(phone) : undefined,
      company: company ? sanitise(company) : undefined,
      suburb: suburb ? sanitise(suburb) : undefined,
      message: sanitise(message),
    }
     
    // 6. Send email via Resend
    const contactEnquiry = new ContactEnquiry(cleanData)
    const { error: emailError } = await sendEmail(contactEnquiry)

    // 7. Handle Resend error
    if (emailError) {
      console.error("Resend error:", emailError)
      return NextResponse.json(
        { error: "Failed to send email. Please try again." },
        { status: 500 }
      )
    }

    // 8. Success
    return NextResponse.json(
      { success: true },
      { status: 200 }
    )

  } catch (err) {
    // 9. Catch unexpected errors (network, JSON parse, etc.)
    console.error("Contact API error:", err)
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    )
  }
}

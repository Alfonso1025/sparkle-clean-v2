import { NextRequest, NextResponse } from "next/server"
import { QuoteFormData } from "@/lib/types"
import { QuoteEnquiryOwner, QuoteEnquiryUser, sendEmail } from "@/lib/sendEmail"

// Strip HTML tags to prevent injection
function sanitise(value: string): string {
  return value.replace(/<[^>]*>/g, "").trim()
}

// Basic email format check
function isValidEmail(email: string): boolean {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)
}

function calculateQuote(data: QuoteFormData): { low: number; high: number } {
  const BASE_PRICE: Record<string, number> = {
    regular: 80,
    "end-of-lease": 200,
    spring: 150,
    carpet: 100,
  }
  const BEDROOM_RATE = 25
  const BATHROOM_RATE = 30
  const EXTRAS_PRICE: Record<string, number> = {
    oven: 40,
    fridge: 30,
    windows: 35,
    balcony: 25,
    garage: 30,
    "carpet-steam": 60,
  }
  const CONDITION_MULTIPLIER: Record<string, number> = {
    "Well Maintained": 1.0,
    "Standard": 1.15,
    "Needs Extra Attention": 1.35,
  }
  const FREQUENCY_DISCOUNT: Record<string, number> = {
    "One-Off": 1.0,
    "Monthly": 0.95,
    "Fortnightly": 0.90,
    "Weekly": 0.85,
  }
 

  const base = BASE_PRICE[data.serviceType] ?? 80
  const rooms = (data.bedrooms * BEDROOM_RATE) + (data.bathrooms * BATHROOM_RATE)
  const extras = data.extras.reduce((sum, extraId) => {
    return sum + (EXTRAS_PRICE[extraId] ?? 0)
  }, 0)
  const conditionMultiplier = CONDITION_MULTIPLIER[data.condition] ?? 1.0
  const frequencyDiscount = FREQUENCY_DISCOUNT[data.frequency] ?? 1.0
  

  const raw = (base + rooms + extras) * conditionMultiplier * frequencyDiscount 
  const mid = Math.round(raw / 10) * 10
  const low = Math.round((mid * 0.90) / 10) * 10
  const high = Math.round((mid * 1.10) / 10) * 10

  return { low, high }
}

export async function POST(req: NextRequest) {
  try {
    // 1. Parse the request body
    const body = await req.json()
    const {
      propertyType, bedrooms, bathrooms,
      serviceType, frequency, condition,
      extras, fullName, email, phone, suburb
    } = body

    // 2. Validate required fields
    if (!propertyType || !serviceType || !frequency || !condition) {
      return NextResponse.json(
        { error: "Please complete all required steps." },
        { status: 400 }
      )
    }

    if (!fullName || !email) {
      return NextResponse.json(
        { error: "Full name and email are required." },
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

    // 4. Validate numeric fields
    if (
      typeof bedrooms !== "number" ||
      typeof bathrooms !== "number" ||
      bedrooms < 0 || bedrooms > 6 ||
      bathrooms < 1 || bathrooms > 4
    ) {
      return NextResponse.json(
        { error: "Invalid bedroom or bathroom values." },
        { status: 400 }
      )
    }

    // 5. Validate extras is an array
    if (!Array.isArray(extras)) {
      return NextResponse.json(
        { error: "Invalid extras format." },
        { status: 400 }
      )
    }

    // 6. Sanitise string inputs
    const clean: QuoteFormData = {
      propertyType: sanitise(propertyType),
      bedrooms,
      bathrooms,
      serviceType: sanitise(serviceType),
      frequency: sanitise(frequency),
      condition: sanitise(condition),
      extras: extras.map((e: string) => sanitise(e)),
      fullName: sanitise(fullName),
      email: sanitise(email),
      phone: phone ? sanitise(phone) : undefined,
      suburb: suburb ? sanitise(suburb) : undefined,
    }

    // 7. Calculate the quote
    const quote = calculateQuote(clean)

    // 8. Send email to owner
    const { error: ownerEmailError } = await sendEmail(new QuoteEnquiryOwner(clean, quote))
    if (ownerEmailError) {
      console.error("Owner email error:", ownerEmailError)
      return NextResponse.json(
        { error: "Failed to send quote. Please try again." },
        { status: 500 }
      )
    }

    // 9. Send email to user
    const { error: userEmailError } = await sendEmail(new QuoteEnquiryUser(clean, quote))
    if (userEmailError) {
      // Non-fatal — owner was notified, user email failed
      // Log it but don't fail the request
      console.error("User email error:", userEmailError)
    }

    // 10. Return the quote to the client
    return NextResponse.json(
      { success: true, quote },
      { status: 200 }
    )

  } catch (err) {
    console.error("Quote API error:", err)
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    )
  }
}
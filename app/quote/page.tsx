"use client"

import { useState } from "react"
import {
  Home,
  Building,
  Briefcase,
  LayoutGrid,
  Sparkles,
  KeyRound,
  Layers,
  Wind,
  Flame,
  Refrigerator,
  Square,
  Car,
  Minus,
  Plus,
  Check,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

interface FormData {
  propertyType: string
  bedrooms: number
  bathrooms: number
  serviceType: string
  frequency: string
  condition: string
  extras: string[]
  fullName: string
  email: string
  phone: string
  suburb: string
}

const STEPS = ["Property", "Service", "Extras", "Details", "Quote"]

const PROPERTY_TYPES = [
  { id: "house", label: "House", icon: Home },
  { id: "apartment", label: "Apartment", icon: Building },
  { id: "office", label: "Office", icon: Briefcase },
  { id: "other", label: "Other", icon: LayoutGrid },
]

const SERVICE_TYPES = [
  { id: "regular", label: "Regular Clean", icon: Sparkles },
  { id: "end-of-lease", label: "End of Lease", icon: KeyRound },
  { id: "spring", label: "Spring Clean", icon: Layers },
  { id: "carpet", label: "Carpet Only", icon: Wind },
]

const FREQUENCIES = ["One-Off", "Weekly", "Fortnightly", "Monthly"]

const CONDITIONS = ["Well Maintained", "Standard", "Needs Extra Attention"]

const EXTRAS = [
  { id: "oven", label: "Oven Clean", icon: Flame },
  { id: "fridge", label: "Fridge Clean", icon: Refrigerator },
  { id: "windows", label: "Interior Windows", icon: Square },
  { id: "balcony", label: "Balcony/Patio", icon: Wind },
  { id: "garage", label: "Garage", icon: Car },
  { id: "carpet-steam", label: "Carpet Steam Clean", icon: Layers },
]

export default function QuotePage() {

  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    propertyType: "",
    bedrooms: 3,
    bathrooms: 2,
    serviceType: "",
    frequency: "",
    condition: "",
    extras: [],
    fullName: "",
    email: "",
    phone: "",
    suburb: "",
  })
  const [submitError,setSubmitError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [quote, setQuote] = useState<{ low: number; high: number } | null>(null)

  const [validationError, setValidationError] = useState<string | null>(null)
  const updateFormData = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setFormData((prev) => ({ ...prev, [key]: value }))
    // Clear validation error as soon as user makes a change
    setValidationError(null)
  }

  const toggleExtra = (extraId: string) => {
    setFormData((prev) => ({
      ...prev,
      extras: prev.extras.includes(extraId)
        ? prev.extras.filter((e) => e !== extraId)
        : [...prev.extras, extraId],
    }))
  }
  function validateStep(step: number, formData: FormData): string | null {
    switch (step) {
      case 1:
        if (!formData.propertyType) return "Please select a property type."
        return null
      case 2:
        if (!formData.serviceType) return "Please select a cleaning type."
        if (!formData.frequency) return "Please select how often you'd like the service."
        if (!formData.condition) return "Please describe the property condition."
        return null
      case 3:
        // Extras are optional — no validation needed
        return null
      case 4:
        if (!formData.fullName.trim()) return "Please enter your full name."
        if (!formData.email.trim()) return "Please enter your email address."
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(formData.email))
          return "Please enter a valid email address."
        return null
      default:
        return null
    }
  }
  const handleNext = () => {
    const error = validateStep(currentStep, formData)
    if (error) {
      setValidationError(error)
      return
    }
    setValidationError(null)
    if (currentStep < 5) setCurrentStep((prev) => prev + 1)
  }

  const handleBack = () => {
    setValidationError(null)
    if (currentStep > 1) setCurrentStep((prev) => prev - 1)
  }
  const submitForm = async ()=>{
    // Run step 4 validation first
    const error = validateStep(4, formData)
    if (error) {
      setValidationError(error)
      return
    }

    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const response = await fetch("/api/quote", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
          })

      const data = await response.json()

      if (!response.ok) {
        setSubmitError(data.error || "Something went wrong. Please try again.")
        setIsSubmitting(false)
        return
    }

    // Store the calculated quote from the server
    setQuote(data.quote)
    // Advance to step 5
    setCurrentStep(5)

    } catch (err) {
      console.log(err)
      setSubmitError("Unable to calculate your quote. Please check your connection or call us directly.")
    } finally {
      setIsSubmitting(false)
    }
  }
  return (
    <main className="relative min-h-screen bg-white overflow-hidden">
      {/* Background gradient matching Hero */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(14,165,233,0.08)_0%,_transparent_50%),_radial-gradient(ellipse_at_bottom_left,_rgba(14,165,233,0.05)_0%,_transparent_50%)]" />

      <div className="relative z-10 mx-auto max-w-2xl px-6 py-16 lg:py-24">
        {/* Header */}
        <div className="mb-12 text-center">
          <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-[0.15em] text-sky-600">
            Free Quote Calculator
          </span>
          <h1 className="mb-4 text-2xl font-bold uppercase tracking-wide text-slate-800 md:text-3xl">
            Get Your Instant Quote
          </h1>
          <p className="text-base font-medium text-slate-600">
            Answer a few quick questions and we&apos;ll calculate your price instantly
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-12">
          <div className="flex items-center justify-between">
            {STEPS.map((step, index) => {
              const stepNumber = index + 1
              const isCompleted = stepNumber < currentStep
              const isCurrent = stepNumber === currentStep

              return (
                <div key={step} className="flex flex-1 items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-md text-sm font-medium transition-colors duration-300 ${
                        isCurrent
                          ? "bg-sky-600 text-white"
                          : isCompleted
                            ? "border border-sky-500 bg-sky-50 text-sky-600"
                            : "bg-slate-100 text-slate-400"
                      }`}
                    >
                      {stepNumber}
                    </div>
                    <span className="mt-2 hidden text-xs font-medium uppercase tracking-widest text-slate-500 sm:block">
                      {step}
                    </span>
                  </div>
                  {index < STEPS.length - 1 && (
                    <div
                      className={`mx-2 h-px flex-1 ${
                        isCompleted ? "bg-sky-400" : "bg-slate-200"
                      }`}
                    />
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Step Card */}
        <div className="rounded-md border border-slate-200 bg-white p-6 shadow-lg ring-1 ring-slate-100 md:p-8">
          {/* Step 1: Property */}
          {currentStep === 1 && (
            <div className="animate-fade-in">
              <h2 className="mb-6 text-lg font-semibold uppercase tracking-widest text-slate-800">
                Property
              </h2>
              <p className="mb-6 text-sm font-medium text-slate-600">
                What type of property are you booking for?
              </p>

              <div className="mb-8 grid grid-cols-2 gap-4">
                {PROPERTY_TYPES.map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => updateFormData("propertyType", id)}
                    className={`flex flex-col items-center rounded-md border p-4 shadow-sm transition-all duration-300 ${
                      formData.propertyType === id
                        ? "border-sky-500 bg-sky-50 shadow-sky-100"
                        : "border-slate-200 bg-slate-50/70 hover:border-sky-400 hover:bg-sky-50/80 hover:shadow-md"
                    }`}
                  >
                    <Icon className="mb-2 h-6 w-6 text-sky-600" />
                    <span className="text-sm font-medium uppercase tracking-widest text-slate-800">
                      {label}
                    </span>
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Bedrooms */}
                <div>
                  <label className="mb-2 block text-sm font-semibold uppercase tracking-widest text-slate-700">
                    Bedrooms
                  </label>
                  <div className="flex items-center rounded-md border border-slate-200 bg-slate-50/70 shadow-sm">
                    <button
                      onClick={() =>
                        updateFormData("bedrooms", Math.max(0, formData.bedrooms - 1))
                      }
                      className="p-3 text-sky-600 transition-colors duration-300 hover:bg-sky-50/80"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="flex-1 text-center font-medium text-slate-800">
                      {formData.bedrooms}
                    </span>
                    <button
                      onClick={() =>
                        updateFormData("bedrooms", Math.min(6, formData.bedrooms + 1))
                      }
                      className="p-3 text-sky-600 transition-colors duration-300 hover:bg-sky-50"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Bathrooms */}
                <div>
                  <label className="mb-2 block text-sm font-semibold uppercase tracking-widest text-slate-700">
                    Bathrooms
                  </label>
                  <div className="flex items-center rounded-md border border-slate-200 bg-slate-50/70 shadow-sm">
                    <button
                      onClick={() =>
                        updateFormData("bathrooms", Math.max(1, formData.bathrooms - 1))
                      }
                      className="p-3 text-sky-600 transition-colors duration-300 hover:bg-sky-50/80"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="flex-1 text-center font-medium text-slate-800">
                      {formData.bathrooms}
                    </span>
                    <button
                      onClick={() =>
                        updateFormData("bathrooms", Math.min(4, formData.bathrooms + 1))
                      }
                      className="p-3 text-sky-600 transition-colors duration-300 hover:bg-sky-50"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Service */}
          {currentStep === 2 && (
            <div className="animate-fade-in">
              <h2 className="mb-6 text-lg font-semibold uppercase tracking-widest text-slate-800">
                Service
              </h2>
              <p className="mb-6 text-sm font-medium text-slate-600">
                What type of cleaning do you need?
              </p>

              <div className="mb-8 grid grid-cols-2 gap-4">
                {SERVICE_TYPES.map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => updateFormData("serviceType", id)}
                    className={`flex flex-col items-center rounded-md border p-4 shadow-sm transition-all duration-300 ${
                      formData.serviceType === id
                        ? "border-sky-500 bg-sky-50 shadow-sky-100"
                        : "border-slate-200 bg-slate-50/70 hover:border-sky-400 hover:bg-sky-50/80 hover:shadow-md"
                    }`}
                  >
                    <Icon className="mb-2 h-6 w-6 text-sky-600" />
                    <span className="text-center text-sm font-medium uppercase tracking-widest text-slate-800">
                      {label}
                    </span>
                  </button>
                ))}
              </div>

              <p className="mb-4 text-sm font-medium text-slate-600">
                How often would you like this service?
              </p>
              <div className="mb-8 flex flex-wrap gap-2">
                {FREQUENCIES.map((freq) => (
                  <button
                    key={freq}
                    onClick={() => updateFormData("frequency", freq)}
                    className={`rounded-md border px-4 py-2 text-xs font-semibold uppercase tracking-widest shadow-sm transition-all duration-300 ${
                      formData.frequency === freq
                        ? "border-sky-600 bg-sky-600 text-white shadow-sky-200"
                        : "border-slate-200 bg-slate-50/70 text-slate-700 hover:border-sky-400 hover:bg-sky-50/80 hover:shadow-md"
                    }`}
                  >
                    {freq}
                  </button>
                ))}
              </div>

              <p className="mb-4 text-sm font-medium text-slate-600">
                How would you describe the property condition?
              </p>
              <div className="flex flex-wrap gap-2">
                {CONDITIONS.map((cond) => (
                  <button
                    key={cond}
                    onClick={() => updateFormData("condition", cond)}
                    className={`rounded-md border px-4 py-2 text-xs font-semibold uppercase tracking-widest shadow-sm transition-all duration-300 ${
                      formData.condition === cond
                        ? "border-sky-600 bg-sky-600 text-white shadow-sky-200"
                        : "border-slate-200 bg-slate-50/70 text-slate-700 hover:border-sky-400 hover:bg-sky-50/80 hover:shadow-md"
                    }`}
                  >
                    {cond}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Extras */}
          {currentStep === 3 && (
            <div className="animate-fade-in">
              <h2 className="mb-2 text-lg font-semibold uppercase tracking-widest text-slate-800">
                Extras
              </h2>
              <p className="mb-6 text-sm font-medium text-slate-600">
                Would you like to add any extras? Each extra is added to your final quote.
              </p>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {EXTRAS.map(({ id, label, icon: Icon }) => {
                  const isSelected = formData.extras.includes(id)
                  return (
                    <button
                      key={id}
                      onClick={() => toggleExtra(id)}
                      className={`flex items-center justify-between rounded-md border p-4 shadow-sm transition-all duration-300 ${
                        isSelected
                          ? "border-sky-500 bg-sky-50 shadow-sky-100"
                          : "border-slate-200 bg-slate-50/70 hover:border-sky-400 hover:bg-sky-50/80 hover:shadow-md"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon
                          className={`h-5 w-5 transition-colors duration-300 ${
                            isSelected ? "text-sky-600" : "text-slate-400"
                          }`}
                        />
                        <span
                          className={`text-sm font-medium uppercase tracking-widest transition-colors duration-300 ${
                            isSelected ? "text-sky-600" : "text-slate-600"
                          }`}
                        >
                          {label}
                        </span>
                      </div>
                      {/* Toggle Switch */}
                      <div
                        className={`relative h-6 w-11 rounded-full transition-colors duration-300 ${
                          isSelected ? "bg-sky-600" : "bg-slate-200"
                        }`}
                      >
                        <div
                          className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-all duration-300 ${
                            isSelected ? "left-6" : "left-1"
                          }`}
                        />
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* Step 4: Details */}
          {currentStep === 4 && (
            <div className="animate-fade-in">
              <h2 className="mb-2 text-lg font-semibold uppercase tracking-widest text-slate-800">
                Details
              </h2>
              <p className="mb-6 text-sm font-medium text-slate-600">
                Almost there. Enter your details to receive your quote.
              </p>

              <div className="space-y-6">
                <div>
                  <label className="mb-2 block text-sm font-semibold uppercase tracking-widest text-slate-700">
                    Full Name <span className="text-sky-600">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => updateFormData("fullName", e.target.value)}
                    placeholder="Your full name"
                    className="w-full rounded-md border border-slate-200 bg-slate-50/70 px-4 py-3 text-slate-800 shadow-sm placeholder:text-slate-400 focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-sky-500 focus:shadow-md"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold uppercase tracking-widest text-slate-700">
                    Email Address <span className="text-sky-600">*</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateFormData("email", e.target.value)}
                    placeholder="your@email.com"
                    className="w-full rounded-md border border-slate-200 bg-slate-50/70 px-4 py-3 text-slate-800 shadow-sm placeholder:text-slate-400 focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-sky-500 focus:shadow-md"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold uppercase tracking-widest text-slate-700">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => updateFormData("phone", e.target.value)}
                    placeholder="0400 000 000"
                    className="w-full rounded-md border border-slate-200 bg-slate-50/70 px-4 py-3 text-slate-800 shadow-sm placeholder:text-slate-400 focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-sky-500 focus:shadow-md"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold uppercase tracking-widest text-slate-700">
                    Suburb
                  </label>
                  <input
                    type="text"
                    value={formData.suburb}
                    onChange={(e) => updateFormData("suburb", e.target.value)}
                    placeholder="Your suburb"
                    className="w-full rounded-md border border-slate-200 bg-slate-50/70 px-4 py-3 text-slate-800 shadow-sm placeholder:text-slate-400 focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-sky-500 focus:shadow-md"
                  />
                </div>

                <p className="text-xs font-medium text-slate-500">
                  We&apos;ll only use your details to send your quote and follow up. No spam.
                </p>
              </div>
            </div>
          )}

          {/* Step 5: Quote */}
          {currentStep === 5 && (
            <div className="animate-fade-in">
              <h2 className="mb-8 text-lg font-semibold uppercase tracking-widest text-slate-800">
                Your Quote
              </h2>

              <div className="mb-8 text-center">
                <p className="text-4xl font-bold tracking-wide text-sky-600">
                  {quote ? `From $${quote.low} – $${quote.high}` : "Calculating..."}
                </p>
              </div>

              <div className="mb-6 space-y-3">
                {formData.propertyType && (
                  <div className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-sky-600" />
                    <span className="text-sm font-medium text-slate-600">
                      {PROPERTY_TYPES.find((p) => p.id === formData.propertyType)?.label}
                    </span>
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-sky-600" />
                  <span className="text-sm font-medium text-slate-600">
                    {formData.bedrooms} Bedrooms, {formData.bathrooms} Bathrooms
                  </span>
                </div>
                {formData.serviceType && (
                  <div className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-sky-600" />
                    <span className="text-sm font-medium text-slate-600">
                      {SERVICE_TYPES.find((s) => s.id === formData.serviceType)?.label}
                    </span>
                  </div>
                )}
                {formData.frequency && (
                  <div className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-sky-600" />
                    <span className="text-sm font-medium text-slate-600">
                      {formData.frequency}
                    </span>
                  </div>
                )}
                {formData.extras.length > 0 && (
                  <div className="flex items-start gap-3">
                    <Check className="mt-0.5 h-4 w-4 text-sky-600" />
                    <span className="text-sm font-medium text-slate-600">
                      Extras:{" "}
                      {formData.extras
                        .map((e) => EXTRAS.find((ex) => ex.id === e)?.label)
                        .join(", ")}
                    </span>
                  </div>
                )}
              </div>

              <div className="mb-6 border-t border-slate-100" />

              <div className="flex flex-col gap-4 sm:flex-row">
                <a
                  href="/#contact"
                  className="flex-1 rounded-md bg-sky-600 px-6 py-4 text-center text-sm font-semibold uppercase tracking-widest text-white transition-colors duration-300 hover:bg-sky-700"
                >
                  Book This Clean
                </a>
                <a
                  href="tel:0412345678"
                  className="flex-1 rounded-md border border-slate-800 bg-slate-800 px-6 py-4 text-center text-sm font-semibold uppercase tracking-widest text-white transition-colors duration-300 hover:bg-slate-700"
                >
                  Call to Discuss
                </a>
              </div>

              <p className="mt-6 text-center text-xs font-medium text-slate-500">
                This is an estimate. Final price confirmed after property inspection.
              </p>
            </div>
          )}

          {/* Validation Error */}
          {validationError && (
            <div className="mt-6 rounded-md border border-red-200 bg-red-50 px-4 py-3">
              <p className="text-sm font-medium text-red-600">{validationError}</p>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="mt-8 flex justify-between">
          {currentStep > 1 && currentStep < 5 ? (
            <button
              onClick={handleBack}
              className="flex items-center gap-2 rounded-md border border-slate-200 px-6 py-3 text-sm font-medium uppercase tracking-widest text-slate-600 transition-colors duration-300 hover:bg-slate-50"
            >
              <ChevronLeft className="h-4 w-4" />
              Back
            </button>
          ) : (
            <div />
          )}

          {currentStep < 4 && (
            <button
              onClick={handleNext}
              className="ml-auto flex items-center gap-2 rounded-md bg-sky-600 px-6 py-3 text-sm font-semibold uppercase tracking-widest text-white transition-colors duration-300 hover:bg-sky-700"
            >
              {currentStep === 4 ? "Calculate My Quote" : "Next"}
              <ChevronRight className="h-4 w-4" />
            </button>
          )}
          {currentStep === 4 && (
            <button
              onClick={submitForm}
              disabled={isSubmitting}
              className="ml-auto flex items-center gap-2 rounded-md bg-sky-600 px-6 py-3 text-sm font-semibold uppercase tracking-widest text-white transition-colors duration-300 hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? "Calculating..." : "Calculate My Quote"}
              <ChevronRight className="h-4 w-4" />
            </button>
          )}
          {submitError && (
            <div className="mt-6 rounded-md border border-red-200 bg-red-50 px-4 py-3">
              <p className="text-sm font-medium text-red-600">{submitError}</p>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </main>
  )
}



 


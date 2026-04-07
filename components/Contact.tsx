"use client"

import { useState } from "react"

type FormState = "default" | "loading" | "success" | "error"

export default function Contact() {

  const googleMapsEmbeded = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d52883.219319955424!2d150.76363377142994!3d-34.06435602667285!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b12ee5195038d7f%3A0x5017d681632af40!2sCampbelltown%20Nueva%20Gales%20del%20Sur%202560!5e0!3m2!1ses-419!2sau!4v1775068274970!5m2!1ses-419!2sau"
  const [formState, setFormState] = useState<FormState>("default")
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    suburb: "",
    message: "",
  })
  const [errorMessage, setErrorMessage] = useState('something went wrong')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('form submission triggered')
    // Client-side validation before hitting the server
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.message.trim()) {
      setFormState("error")
      setErrorMessage("Please fill in all required fields.")
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setFormState("error")
      setErrorMessage("Please enter a valid email address.")
      console.log(errorMessage)
      return
    }
    console.log(formState)
    setFormState("loading")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        setFormState("error")
        setErrorMessage(data.error || "Something went wrong. Please try again.")
        return
      }

      setFormState("success")

    } catch (err) {
      // Network failure or server completely unreachable
      console.log(err)
      setFormState("error")
      setErrorMessage("Unable to send your message. Please check your connection or call us directly.")
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <section id="contact" className="bg-white py-24 px-6 lg:py-32 lg:px-12 relative overflow-hidden">
      {/* Background gradient matching Hero */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(14,165,233,0.08)_0%,_transparent_50%),_radial-gradient(ellipse_at_bottom_left,_rgba(14,165,233,0.05)_0%,_transparent_50%)]" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-sky-600 text-sm font-semibold tracking-[0.15em] uppercase">
            Get In Touch
          </span>
          <h2 className="text-slate-800 text-3xl lg:text-5xl font-bold tracking-wide mt-4">
            Request a Free Quote
          </h2>
          <p className="text-slate-600 mt-4 font-medium tracking-wide">
            We&apos;ll get back to you within 2 hours during business hours
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Column - Contact Form */}
          <div>
            {formState === "success" ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-16 h-16 border border-sky-600 flex items-center justify-center mb-6 rounded-md">
                  <svg
                    className="w-8 h-8 text-sky-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="text-slate-800 text-2xl font-bold tracking-wide mb-4">
                  Message Sent
                </h3>
                <p className="text-slate-600 font-medium tracking-wide">
                  We&apos;ll be in touch within 2 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                {/* Error Banner */}
                {formState === "error" && (
                  <div className="bg-red-50 border border-red-200 p-4 rounded-md">
                    <p className="text-red-600 text-sm font-medium tracking-wide">
                      {errorMessage}
                    </p>
                  </div>
                )}

                {/* Name + Email Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="fullName"
                      className="block text-slate-700 text-sm tracking-wide uppercase font-semibold mb-2"
                    >
                      Full Name <span className="text-sky-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Your full name"
                      className="w-full bg-slate-50 border border-slate-300 text-slate-800 placeholder-slate-400 px-4 py-3 font-medium tracking-wide focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 transition-colors duration-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-slate-700 text-sm tracking-wide uppercase font-semibold mb-2"
                    >
                      Email Address <span className="text-sky-600">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className="w-full bg-slate-50 border border-slate-300 text-slate-800 placeholder-slate-400 px-4 py-3 font-medium tracking-wide focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 transition-colors duration-300 rounded-md"
                    />
                  </div>
                </div>

                {/* Phone + Company Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-slate-700 text-sm tracking-wide uppercase font-semibold mb-2"
                    >
                      Phone Number <span className="text-slate-400 text-xs normal-case tracking-normal">(optional)</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="0412 345 678"
                      className="w-full bg-slate-50 border border-slate-300 text-slate-800 placeholder-slate-400 px-4 py-3 font-medium tracking-wide focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 transition-colors duration-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="company"
                      className="block text-slate-700 text-sm tracking-wide uppercase font-semibold mb-2"
                    >
                      Company Name <span className="text-slate-400 text-xs normal-case tracking-normal">(optional)</span>
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Your company"
                      className="w-full bg-slate-50 border border-slate-300 text-slate-800 placeholder-slate-400 px-4 py-3 font-medium tracking-wide focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 transition-colors duration-300 rounded-md"
                    />
                  </div>
                </div>

                {/* Suburb Row */}
                <div>
                  <label
                    htmlFor="suburb"
                    className="block text-slate-700 text-sm tracking-wide uppercase font-semibold mb-2"
                  >
                    Suburb <span className="text-slate-400 text-xs normal-case tracking-normal">(optional)</span>
                  </label>
                  <input
                    type="text"
                    id="suburb"
                    name="suburb"
                    value={formData.suburb}
                    onChange={handleChange}
                    placeholder="e.g. Campbelltown"
                    className="w-full bg-slate-50 border border-slate-300 text-slate-800 placeholder-slate-400 px-4 py-3 font-medium tracking-wide focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 transition-colors duration-300 rounded-md"
                  />
                </div>

                {/* Message Row */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-slate-700 text-sm tracking-wide uppercase font-semibold mb-2"
                  >
                    Message <span className="text-sky-600">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your cleaning needs..."
                    className="w-full bg-slate-50 border border-slate-300 text-slate-800 placeholder-slate-400 px-4 py-3 font-medium tracking-wide focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 transition-colors duration-300 resize-none rounded-md"
                  />
                </div>

                {/* Submit Button */}
                <div className="flex justify-start lg:justify-end">
                  <button
                    type="submit"
                    disabled={formState === "loading"}
                    className="w-full lg:w-auto bg-sky-600 hover:bg-sky-700 text-white px-10 py-4 text-xs tracking-[0.2em] uppercase font-semibold rounded-md transition-colors duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {formState === "loading" ? "Sending..." : "Send Message"}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right Column - Business Details */}
          <div>
            <h3 className="text-slate-800 text-xl font-bold tracking-wide mb-8">
              Find Us
            </h3>

            <div className="space-y-6 mb-10">
              {/* Phone */}
              <div className="flex items-center gap-4">
                <svg
                  className="w-5 h-5 text-sky-600 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <a
                  href="tel:0412345678"
                  className="text-slate-700 font-medium tracking-wide hover:text-sky-600 transition-colors duration-300"
                >
                  0412 345 678
                </a>
              </div>

              {/* Email */}
              <div className="flex items-center gap-4">
                <svg
                  className="w-5 h-5 text-sky-600 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <a
                  href="mailto:hello@sparkleclean.com.au"
                  className="text-slate-700 font-medium tracking-wide hover:text-sky-600 transition-colors duration-300"
                >
                  hello@sparkleclean.com.au
                </a>
              </div>

              {/* Hours */}
              <div className="flex items-center gap-4">
                <svg
                  className="w-5 h-5 text-sky-600 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-slate-700 font-medium tracking-wide">
                  Mon–Sat 7am–7pm, Sun 8am–5pm
                </span>
              </div>

              {/* Address */}
              <div className="flex items-center gap-4">
                <svg
                  className="w-5 h-5 text-sky-600 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span className="text-slate-700 font-medium tracking-wide">
                  Campbelltown NSW 2560
                </span>
              </div>
            </div>

            {/* Google Maps Embed */}
            <div className="border border-slate-200 overflow-hidden h-64 rounded-md">
              <iframe
                src={googleMapsEmbeded}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


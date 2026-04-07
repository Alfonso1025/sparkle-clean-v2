"use client"

import { Star } from "lucide-react"

const testimonials = [
  {
    quote:
      "Sparkle Clean transformed our home before we listed it for sale. The end of lease clean was immaculate — our property manager was genuinely impressed. Worth every cent.",
    name: "Sarah M.",
    location: "Campbelltown",
    service: "End of Lease Clean",
  },
  {
    quote:
      "We've had them in fortnightly for six months now. Consistent, thorough, and the team is always respectful of our space. The house smells amazing after every visit.",
    name: "James & Lisa T.",
    location: "Narellan",
    service: "Residential Cleaning",
  },
  {
    quote:
      "As a small business owner I needed after-hours cleaning for my office. Sparkle Clean are punctual, professional, and discreet. Highly recommend for any commercial space.",
    name: "David K.",
    location: "Macarthur",
    service: "Commercial Cleaning",
  },
]

export function Testimonials() {
  return (
    <section
      id="testimonials"
      className="relative bg-white py-24 px-6 lg:py-32 lg:px-12"
    >
      {/* Top border line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-slate-100" />

      {/* Subtle gradient overlay matching Hero */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(14,165,233,0.05)_0%,_transparent_50%)]" />

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 lg:mb-20">
          <span className="text-sky-600 text-xs font-semibold tracking-[0.2em] uppercase">
            What Our Clients Say
          </span>
          <h2 className="mt-4 text-2xl md:text-3xl lg:text-4xl text-slate-800 font-bold tracking-wide">
            Trusted by Homeowners Across Campbelltown
          </h2>
          <p className="mt-4 text-slate-600 text-sm lg:text-base font-medium tracking-wide">
            {"Don't just take our word for it"}
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group bg-white border border-slate-100 shadow-sm p-6 lg:p-8 rounded-md transition-all duration-300 hover:border-sky-200 hover:shadow-md"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 text-sky-500 fill-sky-500"
                  />
                ))}
              </div>

              {/* Quote */}
              <div className="relative">
                {/* Decorative opening quote */}
                <span className="absolute -top-4 -left-2 text-6xl lg:text-7xl text-sky-500/20 font-serif leading-none select-none">
                  &ldquo;
                </span>
                <p className="relative text-slate-600 italic leading-relaxed text-sm lg:text-base pl-4">
                  {testimonial.quote}
                </p>
              </div>

              {/* Divider */}
              <div className="my-6 h-px bg-slate-100" />

              {/* Reviewer info */}
              <div>
                <p className="text-slate-800 font-semibold tracking-wide text-sm">
                  {testimonial.name}
                </p>
                <p className="mt-1 text-slate-500 text-xs lg:text-sm">
                  {testimonial.location} &middot; {testimonial.service}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom border line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-slate-100" />
    </section>
  )
}

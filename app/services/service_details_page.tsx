"use client"

import { DollarSign, Clock, Calendar, Check, Sparkles, Shield, Award } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface ServiceDetailPageProps {
  serviceName: string
  tagline: string
  heroImage?: string
  priceFrom: number
  duration: string
  availability: string
  includedItems: string[]
  includedImage?: string
  whyChooseUs: {
    icon: "sparkles" | "shield" | "award"
    heading: string
    description: string
  }[]
  pricingIncludes: string[]
}

const iconMap = {
  sparkles: Sparkles,
  shield: Shield,
  award: Award,
}

export default function ServiceDetailPage({
  serviceName,
  tagline,
  heroImage = "https://picsum.photos/1400/600?random=10",
  priceFrom,
  duration,
  availability,
  includedItems,
  includedImage = "https://picsum.photos/600/700?random=11",
  whyChooseUs,
  pricingIncludes,
}: ServiceDetailPageProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* 1. Service Hero */}
      <section className="relative h-96 lg:h-[600px] w-full overflow-hidden">
        <Image
          src={heroImage}
          alt={serviceName}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/70 to-transparent" />
        <div className="relative z-10 h-full flex items-center">
          <div className="px-6 md:px-12 lg:px-24 max-w-3xl">
            <div className="border-l-2 border-sky-400 pl-6">
              {/* Breadcrumb */}
              <p className="text-slate-300 text-sm tracking-widest uppercase mb-4">
                Services / {serviceName}
              </p>
              {/* Headline */}
              <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-light tracking-widest uppercase mb-4">
                {serviceName}
              </h1>
              {/* Tagline */}
              <p className="text-slate-300 text-base lg:text-lg mb-8">
                {tagline}
              </p>
              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/#contact"
                  className="inline-block bg-sky-600 text-white px-8 py-4 text-xs tracking-[0.2em] uppercase font-semibold rounded-md hover:bg-sky-700 transition-colors duration-300 text-center"
                >
                  Get a Free Quote
                </Link>
                <Link
                  href="tel:0412345678"
                  className="inline-block border border-sky-600 text-sky-400 px-8 py-4 text-xs tracking-[0.2em] uppercase font-semibold rounded-md hover:bg-sky-600/10 transition-colors duration-300 text-center"
                >
                  Call 0412 345 678
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Overview Strip */}
      <section className="bg-slate-900">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-sky-900/30">
          {/* Price */}
          <div className="flex items-center justify-center gap-4 p-6 lg:p-8">
            <DollarSign className="w-6 h-6 text-sky-400 flex-shrink-0" />
            <div>
              <p className="text-slate-400 text-xs tracking-widest uppercase mb-1">Starting From</p>
              <p className="text-white text-lg font-light tracking-wide">${priceFrom}</p>
            </div>
          </div>
          {/* Duration */}
          <div className="flex items-center justify-center gap-4 p-6 lg:p-8">
            <Clock className="w-6 h-6 text-sky-400 flex-shrink-0" />
            <div>
              <p className="text-slate-400 text-xs tracking-widest uppercase mb-1">Duration</p>
              <p className="text-white text-lg font-light tracking-wide">{duration}</p>
            </div>
          </div>
          {/* Availability */}
          <div className="flex items-center justify-center gap-4 p-6 lg:p-8">
            <Calendar className="w-6 h-6 text-sky-400 flex-shrink-0" />
            <div>
              <p className="text-slate-400 text-xs tracking-widest uppercase mb-1">Availability</p>
              <p className="text-white text-lg font-light tracking-wide">{availability}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. What's Included */}
      <section className="relative bg-white py-16 lg:py-24 overflow-hidden">
        {/* Background gradient matching Services */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(14,165,233,0.08)_0%,_transparent_50%),_radial-gradient(ellipse_at_bottom_left,_rgba(14,165,233,0.05)_0%,_transparent_50%)]" />
        <div className="relative z-10 px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            {/* Left Column - Content */}
            <div className="lg:col-span-2">
              <h2 className="text-slate-800 text-2xl lg:text-3xl font-bold tracking-wide uppercase mb-10">
                What&apos;s Included
              </h2>
              <ul className="space-y-4">
                {includedItems.map((item, index) => (
                  <li key={index} className="flex items-start gap-4">
                    <Check className="w-5 h-5 text-sky-500 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-600 text-base lg:text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* Right Column - Image */}
            <div className="lg:col-span-1">
              <div className="relative h-80 lg:h-full min-h-[400px] border border-slate-100 rounded-md overflow-hidden shadow-sm">
                <Image
                  src={includedImage}
                  alt="Service details"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Why Choose Us for This Service */}
      <section className="bg-slate-900 py-16 lg:py-24">
        <div className="px-6 md:px-12 lg:px-24">
          <h2 className="text-white text-2xl lg:text-3xl font-bold tracking-wide uppercase mb-12 text-center">
            Why Choose Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {whyChooseUs.map((item, index) => {
              const IconComponent = iconMap[item.icon]
              return (
                <div
                  key={index}
                  className="bg-slate-800/50 border border-sky-900/30 rounded-md p-6 lg:p-8 transition-all duration-300 hover:border-sky-500/60 hover:shadow-md"
                >
                  <IconComponent className="w-8 h-8 text-sky-400 mb-4" />
                  <h3 className="text-white text-sm tracking-widest uppercase font-semibold mb-3">
                    {item.heading}
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 5. Pricing Block */}
      <section className="relative bg-white py-16 lg:py-24 overflow-hidden">
        {/* Background gradient matching Services */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(14,165,233,0.08)_0%,_transparent_50%),_radial-gradient(ellipse_at_bottom_left,_rgba(14,165,233,0.05)_0%,_transparent_50%)]" />
        <div className="relative z-10 px-6 md:px-12 lg:px-24">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-slate-800 text-2xl lg:text-3xl font-bold tracking-wide uppercase mb-12">
              Simple, Transparent Pricing
            </h2>
            <div className="border border-slate-100 rounded-md shadow-sm p-8 lg:p-12 bg-white">
              <p className="text-sky-500 text-4xl lg:text-5xl font-light tracking-wide mb-8">
                From ${priceFrom}
              </p>
              <ul className="space-y-3 mb-10">
                {pricingIncludes.map((item, index) => (
                  <li key={index} className="flex items-center justify-center gap-3">
                    <Check className="w-4 h-4 text-sky-500 flex-shrink-0" />
                    <span className="text-slate-600 text-sm lg:text-base">{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/#contact"
                className="inline-block bg-sky-600 text-white px-10 py-4 text-xs tracking-[0.2em] uppercase font-semibold rounded-md hover:bg-sky-700 transition-colors duration-300"
              >
                Book This Service
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CTA Banner */}
      <section className="bg-slate-900 py-16 lg:py-20">
        <div className="px-6 md:px-12 lg:px-24 text-center">
          <h2 className="text-white text-2xl lg:text-3xl font-bold tracking-wide uppercase mb-4">
            Ready for a Spotless Space?
          </h2>
          <p className="text-slate-300 text-base lg:text-lg mb-10 max-w-xl mx-auto">
            Get a free quote today. We&apos;ll respond within 2 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/#contact"
              className="inline-block bg-sky-600 text-white px-10 py-4 text-xs tracking-[0.2em] uppercase font-semibold rounded-md hover:bg-sky-700 transition-colors duration-300"
            >
              Get a Free Quote
            </Link>
            <Link
              href="tel:0412345678"
              className="inline-block border border-sky-400 text-sky-400 px-10 py-4 text-xs tracking-[0.2em] uppercase font-semibold rounded-md hover:bg-sky-400/10 transition-colors duration-300"
            >
              Call Us Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

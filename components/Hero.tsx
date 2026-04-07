"use client"

import { useEffect, useRef } from "react"
import { Phone, Check, ChevronDown } from "lucide-react"
import { useRouter } from "next/navigation"

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const router = useRouter()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    const particles: Array<{
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      opacity: number
    }> = []

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const createParticles = () => {
      particles.length = 0
      const particleCount = Math.floor((canvas.width * canvas.height) / 25000)
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5,
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: (Math.random() - 0.5) * 0.3,
          opacity: Math.random() * 0.3 + 0.1,
        })
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle) => {
        particle.x += particle.speedX
        particle.y += particle.speedY

        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(14, 165, 233, ${particle.opacity})`
        ctx.fill()
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    resizeCanvas()
    createParticles()
    animate()

    window.addEventListener("resize", () => {
      resizeCanvas()
      createParticles()
    })

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  const handleGetQuote = () => {
    if (process.env.NEXT_PUBLIC_ENABLE_QUOTE_TOOL === "true") {
      router.push("/quote")
    } else {
      router.push("/#contact")
    }
  }

  const scrollDown = () => {
    window.scrollBy({ top: window.innerHeight, behavior: "smooth" })
  }

  return (
    <section className="relative min-h-[85vh] md:min-h-screen w-full bg-white overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(14,165,233,0.08)_0%,_transparent_50%),_radial-gradient(ellipse_at_bottom_left,_rgba(14,165,233,0.05)_0%,_transparent_50%)]" />

      {/* Animated particles canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center min-h-[85vh] md:min-h-screen px-6 md:px-12 lg:px-24">
        <div className="max-w-4xl mx-auto md:mx-0 text-center md:text-left pt-20 pb-24 md:py-0">
          {/* Label */}
          <p className="text-sky-600 text-sm md:text-base tracking-[0.15em] uppercase font-semibold mb-4 md:mb-6">
            Campbelltown&apos;s Premier Cleaning Service
          </p>

          {/* Headline */}
          <h1 className="text-slate-800 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-wide leading-tight mb-6 md:mb-8">
            A Spotless Home,
            <br />
            Effortlessly Maintained
          </h1>

          {/* Subheadline */}
          <p className="text-slate-600 text-base md:text-lg font-medium leading-relaxed max-w-xl mx-auto md:mx-0 mb-8 md:mb-10">
            Professional residential, commercial and end of lease cleaning
            services. Fully insured, eco-friendly, and available same-day.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mb-10 md:mb-12">
            <button
              onClick={handleGetQuote}
              className="bg-sky-600 hover:bg-sky-700 text-white px-8 py-4 text-xs tracking-[0.2em] uppercase font-semibold rounded-md transition-colors duration-300"
            >
              Get a Free Quote
            </button>
            <a
              href="tel:0412345678"
              className="inline-flex items-center justify-center gap-3 !bg-slate-800 border !border-slate-800 !text-white px-8 py-4 text-xs tracking-[0.2em] uppercase font-medium rounded-md hover:!bg-slate-700 hover:!border-slate-700 transition-all duration-300"
            >
              <Phone className="w-4 h-4" />
              Call Us Now
            </a>
          </div>

          {/* Trust signals */}
          <div className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-3">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-sky-600" />
              <span className="text-slate-700 text-sm tracking-wide uppercase font-medium">
                Fully Insured
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-sky-600" />
              <span className="text-slate-700 text-sm tracking-wide uppercase font-medium">
                Eco-Friendly
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-sky-600" />
              <span className="text-slate-700 text-sm tracking-wide uppercase font-medium">
                Same-Day Service
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom divider */}
      <div className="absolute bottom-16 left-0 right-0 h-px bg-slate-100" />

      {/* Scroll indicator */}
      <button
        onClick={scrollDown}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-sky-500/60 hover:text-sky-500 transition-colors duration-300 animate-bounce"
        aria-label="Scroll down"
      >
        <ChevronDown className="w-6 h-6" />
      </button>
    </section>
  )
}

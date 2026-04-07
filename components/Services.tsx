import Link from "next/link"
import { Home, Building2, KeyRound, Layers } from "lucide-react"

const services = [
  {
    icon: Home,
    title: "Residential Cleaning",
    description: "Thorough, reliable cleaning for your home. Weekly, fortnightly or one-off.",
    href: "/services/residential",
    image: "https://picsum.photos/800/600?random=1",
  },
  {
    icon: Building2,
    title: "Commercial Cleaning",
    description: "Professional cleaning for offices and commercial spaces. After-hours available.",
    href: "/services/commercial",
    image: "https://picsum.photos/800/600?random=2",
  },
  {
    icon: KeyRound,
    title: "End of Lease Cleaning",
    description: "Bond-back guaranteed cleaning that meets real estate agent standards.",
    href: "/services/end-of-lease",
    image: "https://picsum.photos/800/600?random=3",
  },
  {
    icon: Layers,
    title: "Carpet Cleaning",
    description: "Deep steam cleaning that removes stains, allergens and odours.",
    href: "/services/carpet",
    image: "https://picsum.photos/800/600?random=4",
  },
]

export function Services() {
  return (
    <section
      id="services"
      className="relative bg-white px-6 py-24 lg:px-12 lg:py-32 overflow-hidden"
    >
      {/* Background gradient matching Hero */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(14,165,233,0.08)_0%,_transparent_50%),_radial-gradient(ellipse_at_bottom_left,_rgba(14,165,233,0.05)_0%,_transparent_50%)]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-12 text-center lg:mb-16">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.15em] text-sky-600">
            What We Offer
          </p>
          <h2 className="mb-4 text-2xl font-bold uppercase tracking-wide text-slate-800 md:text-3xl lg:text-4xl">
            Our Cleaning Services
          </h2>
          <p className="text-base font-medium text-slate-600">
            Professional cleaning solutions tailored to your needs
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {services.map((service) => (
            <Link
              key={service.title}
              href={service.href}
              className="group relative h-72 overflow-hidden rounded-md border border-slate-100 shadow-sm transition-all duration-300 hover:border-sky-500/60 hover:shadow-md md:h-80"
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <img
                  src={service.image}
                  alt={service.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-900/50 to-transparent" />

              {/* Icon */}
              <div className="absolute left-4 top-4 lg:left-6 lg:top-6">
                <service.icon className="h-5 w-5 text-sky-400" strokeWidth={1.5} />
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-6">
                <h3 className="mb-2 text-sm font-semibold uppercase tracking-widest text-white">
                  {service.title}
                </h3>
                <p className="mb-4 text-xs font-medium leading-relaxed text-slate-300">
                  {service.description}
                </p>
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-400 transition-colors duration-300 group-hover:text-sky-300">
                  {"Learn More →"}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

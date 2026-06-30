import Image from "next/image"
import FloatingCandies from "./FloatingCandies"

const socialPosts = [
  { id: "s1", image: "/placeholder-social.svg", likes: "234" },
  { id: "s2", image: "/placeholder-social.svg", likes: "189" },
  { id: "s3", image: "/placeholder-social.svg", likes: "312" },
  { id: "s4", image: "/placeholder-social.svg", likes: "156" },
  { id: "s5", image: "/placeholder-social.svg", likes: "278" },
  { id: "s6", image: "/placeholder-social.svg", likes: "203" },
]

const candies = [
  { emoji: "🍬", position: { top: "5%", left: "3%" }, animation: "float-slow" as const, size: "text-2xl" },
  { emoji: "🍭", position: { top: "8%", right: "6%" }, animation: "float" as const, size: "text-3xl" },
  { emoji: "🍫", position: { bottom: "6%", left: "6%" }, animation: "float-delayed" as const, size: "text-xl" },
  { emoji: "🍩", position: { bottom: "5%", right: "4%" }, animation: "float" as const, size: "text-2xl" },
  { emoji: "🍪", position: { top: "3%", left: "40%" }, animation: "float" as const, size: "text-xl" },
  { emoji: "🧁", position: { top: "12%", right: "25%" }, animation: "float-delayed" as const, size: "text-2xl" },
  { emoji: "🍿", position: { bottom: "3%", left: "35%" }, animation: "float-slow" as const, size: "text-lg" },
  { emoji: "🍡", position: { bottom: "10%", right: "30%" }, animation: "float" as const, size: "text-xl" },
]

export default function Social() {
  return (
    <section className="relative py-20 bg-cream overflow-hidden">
      <FloatingCandies candies={candies} />
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <span className="inline-block bg-primary/10 text-primary text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            📸 Seguinos en redes
          </span>
          <div className="mb-3 flex justify-center">
            <a
              href="https://www.instagram.com/crokangol/?hl=es"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary/10 text-primary text-sm font-semibold px-5 py-2 rounded-full hover:bg-primary hover:text-white transition-colors"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
              @crokangol
            </a>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl text-dark mb-3">
            Seguinos en Instagram
          </h2>
          <p className="font-body text-gray text-lg max-w-xl mx-auto">
            Compartimos novedades, promos y momentos dulces todos los días
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 max-w-4xl mx-auto">
          {socialPosts.map((post, i) => (
            <a
              key={post.id}
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="relative group rounded-xl overflow-hidden aspect-square animate-fade-up"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <Image
                src={post.image}
                alt="Post de Instagram"
                width={300}
                height={300}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/40 transition-colors flex items-center justify-center">
                <span className="text-white font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                  ❤️ {post.likes}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

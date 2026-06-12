import { socialPosts } from "@/data/mock"
import Image from "next/image"
import FloatingCandies from "./FloatingCandies"

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
          <h2 className="font-display text-3xl sm:text-4xl text-dark mb-3">
            @crokangol
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

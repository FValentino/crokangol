import { WHATSAPP_URL } from "@/lib/constants"
import FloatingCandies from "./FloatingCandies"

const candies = [
  { emoji: "🍫", position: { top: "4%", left: "8%" }, animation: "float" as const, size: "text-3xl" },
  { emoji: "🍬", position: { top: "8%", right: "12%" }, animation: "float-delayed" as const, size: "text-2xl" },
  { emoji: "🍭", position: { bottom: "8%", left: "20%" }, animation: "float-slow" as const, size: "text-3xl" },
  { emoji: "🍩", position: { bottom: "12%", right: "15%" }, animation: "float" as const, size: "text-2xl" },
  { emoji: "🍪", position: { top: "16%", left: "40%" }, animation: "float-delayed" as const, size: "text-xl" },
  { emoji: "🧁", position: { top: "20%", right: "35%" }, animation: "float-slow" as const, size: "text-2xl" },
  { emoji: "🍿", position: { bottom: "16%", left: "55%" }, animation: "float" as const, size: "text-lg" },
  { emoji: "🍡", position: { bottom: "20%", right: "40%" }, animation: "float-delayed" as const, size: "text-xl" },
]

export default function Promotions() {
  return (
    <section className="relative py-20 bg-primary overflow-hidden">
      <FloatingCandies candies={candies} />
      <div className="container mx-auto px-4 text-center relative z-10">
        <span className="inline-block bg-secondary text-dark text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
          🎁 Ofertas especiales
        </span>
        <h2 className="font-display text-3xl sm:text-4xl text-white mb-4">
          ¡Descuentos por compras al por mayor!
        </h2>
        <p className="font-body text-white/80 text-lg max-w-2xl mx-auto mb-8">
          Hacé tu pedido hoy y recibí beneficios exclusivos en tu primera compra.
          Consultá por promociones combinadas.
        </p>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-white text-primary font-semibold px-10 py-3.5 rounded-full hover:scale-105 transition-transform shadow-lg"
        >
          Consultar Promociones
        </a>
      </div>
    </section>
  )
}

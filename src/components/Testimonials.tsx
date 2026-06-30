import FloatingCandies from "./FloatingCandies"

const testimonials = [
  { id: "t1", name: "María G.", text: "Excelente atención y gran variedad de productos. Siempre encuentro lo que busco para los cumpleaños de mis hijos.", rating: 5 },
  { id: "t2", name: "Carlos M.", text: "Los mejores precios del barrio y la calidad es inmejorable. Muy recomendable.", rating: 5 },
  { id: "t3", name: "Laura P.", text: "Hago todos mis pedidos por WhatsApp y me llegan en el día. Súper práctico y confiable.", rating: 5 },
  { id: "t4", name: "José R.", text: "La atención personalizada es lo que más valoro. Siempre tienen lo último en golosinas.", rating: 4 },
]

const candies = [
  { emoji: "🍬", position: { top: "5%", left: "3%" }, animation: "float-delayed" as const, size: "text-2xl" },
  { emoji: "🍭", position: { top: "10%", right: "5%" }, animation: "float" as const, size: "text-3xl" },
  { emoji: "🍫", position: { bottom: "6%", left: "8%" }, animation: "float" as const, size: "text-xl" },
  { emoji: "🍩", position: { bottom: "8%", right: "3%" }, animation: "float-slow" as const, size: "text-2xl" },
  { emoji: "🍪", position: { top: "3%", left: "35%" }, animation: "float" as const, size: "text-xl" },
  { emoji: "🧁", position: { top: "6%", right: "30%" }, animation: "float-slow" as const, size: "text-2xl" },
  { emoji: "🍿", position: { bottom: "4%", left: "40%" }, animation: "float-delayed" as const, size: "text-lg" },
  { emoji: "🍡", position: { bottom: "10%", right: "35%" }, animation: "float" as const, size: "text-xl" },
]

function Stars({ count }: { count: number }) {
  return (
    <span className="text-secondary text-lg">
      {"★".repeat(count)}{"☆".repeat(5 - count)}
    </span>
  )
}

export default function Testimonials() {
  return (
    <section className="relative py-20 bg-pastel overflow-hidden">
      <FloatingCandies candies={candies} />
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl sm:text-4xl text-dark mb-3">
            Lo que dicen nuestros clientes
          </h2>
          <p className="font-body text-gray text-lg max-w-xl mx-auto">
            La opinión de quienes ya nos eligieron
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={t.id}
              className="bg-white rounded-2xl p-6 shadow-sm hover:-translate-y-1.5 hover:shadow-lg transition-all animate-fade-up"
              style={{ animationDelay: `${i * 0.12}s` }}
            >
              <Stars count={t.rating} />
              <p className="font-body text-dark text-sm leading-relaxed mt-3 mb-4">
                &ldquo;{t.text}&rdquo;
              </p>
              <p className="font-display text-primary font-semibold text-sm">- {t.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

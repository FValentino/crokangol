import Image from "next/image"
import FloatingCandies from "./FloatingCandies"

const candies = [
  { emoji: "🍭", position: { top: "6%", left: "4%" }, animation: "float" as const, size: "text-3xl" },
  { emoji: "🍬", position: { top: "8%", right: "6%" }, animation: "float-delayed" as const, size: "text-2xl" },
  { emoji: "🍩", position: { bottom: "5%", left: "8%" }, animation: "float-slow" as const, size: "text-xl" },
  { emoji: "🍫", position: { bottom: "6%", right: "4%" }, animation: "float" as const, size: "text-2xl" },
  { emoji: "🍪", position: { top: "3%", left: "45%" }, animation: "float-delayed" as const, size: "text-xl" },
  { emoji: "🧁", position: { top: "12%", right: "30%" }, animation: "float" as const, size: "text-2xl" },
  { emoji: "🍿", position: { bottom: "3%", left: "35%" }, animation: "float-slow" as const, size: "text-lg" },
  { emoji: "🍡", position: { bottom: "10%", right: "25%" }, animation: "float-delayed" as const, size: "text-xl" },
]

export default function About() {
  return (
    <section id="nosotros" className="relative py-20 bg-cream overflow-hidden">
      <FloatingCandies candies={candies} />
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1">
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/placeholder-store.svg"
                alt="Nuestro local"
                width={600}
                height={400}
                className="w-full h-auto"
              />
            </div>
          </div>
          <div className="flex-1">
            <span className="inline-block bg-primary/10 text-primary text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
              📖 Nuestra Historia
            </span>
            <h2 className="font-display text-3xl sm:text-4xl text-dark mb-6">
              Compartiendo momentos dulces desde siempre
            </h2>
            <div className="font-body text-gray space-y-4 leading-relaxed">
              <p>
                En <strong className="text-primary">Crokangol Golosinas</strong> sabemos que
                cada golosina es parte de un recuerdo: el cumpleaños de un hijo, una reunión
                con amigos, un antojo compartido o un pequeño capricho que alegra el día.
              </p>
              <p>
                Desde nuestros inicios nos dedicamos a seleccionar los mejores productos
                para ofrecer variedad, calidad y los precios más justos. Nuestra tienda es
                un lugar de encuentro donde chicos y grandes encuentran su golosina favorita.
              </p>
              <p>
                Hoy seguimos creciendo con la misma pasión de siempre, sumando nuevas
                formas de llegar a vos: a través de nuestra web, por WhatsApp o visitándonos
                en el local. Porque la dulzura se disfruta más cuando se comparte.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

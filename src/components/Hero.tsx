import { CandyMascotLeft, CandyMascotRight, LollipopSVG } from "./CandyMascot"
import { WHATSAPP_URL } from "@/lib/constants"
import FloatingCandies from "./FloatingCandies"
import type { CandyConfig } from "./FloatingCandies"

const floatingCandies: CandyConfig[] = [
  { emoji: "🍫", position: { top: "15%", left: "10%" }, animation: "float", size: "text-2xl" },
  { emoji: "🍬", position: { top: "25%", right: "15%" }, animation: "float-delayed", size: "text-xl" },
  { emoji: "🍭", position: { top: "35%", left: "5%" }, animation: "float-slow", size: "text-3xl" },
  { emoji: "🍩", position: { top: "45%", right: "25%" }, animation: "float-delayed", size: "text-2xl" },
  { emoji: "🍪", position: { top: "55%", right: "10%" }, animation: "float-slow", size: "text-xl" },
  { emoji: "🥤", position: { top: "65%", left: "15%" }, animation: "float", size: "text-2xl" },
  { emoji: "🍿", position: { top: "75%", left: "45%" }, animation: "float", size: "text-lg" },
  { emoji: "🧁", position: { top: "85%", right: "45%" }, animation: "float-delayed", size: "text-2xl" },
  { emoji: "🍡", position: { top: "95%", left: "30%" }, animation: "float-slow", size: "text-xl" },
  { emoji: "🎂", position: { top: "105%", right: "35%" }, animation: "float", size: "text-lg" },
  { emoji: "🍦", position: { top: "115%", left: "20%" }, animation: "float-slow", size: "text-2xl" },
  { emoji: "🍿", position: { top: "125%", right: "30%" }, animation: "float-delayed", size: "text-xl" },
]

export default function Hero() {
  return (
    <section id="inicio" className="relative h-dvh pt-16 flex items-center justify-center overflow-hidden bg-gradient-to-b from-cream to-pastel">
      <FloatingCandies candies={floatingCandies} />
      <div className="relative z-10 container mx-auto px-4 py-12 md:py-24 flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
        <div className="flex-1 text-center lg:text-left">
          <span className="inline-block bg-secondary text-dark text-sm font-semibold px-4 py-1.5 rounded-full mb-6 animate-fade-up">
            🎉 Nueva temporada
          </span>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-dark leading-tight mb-6 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            La dulzura que acompaña{" "}
            <span className="text-primary">tus mejores momentos</span>
          </h1>
          <p className="font-body text-gray text-lg sm:text-xl max-w-xl mx-auto lg:mx-0 mb-8 animate-fade-up" style={{ animationDelay: "0.2s" }}>
            Descubrí cientos de golosinas, promociones y productos para compartir con quienes más querés.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <a
              href="/productos"
              className="bg-primary text-white font-semibold px-8 py-3.5 rounded-full text-center hover:scale-105 transition-transform shadow-lg shadow-primary/30"
            >
              Ver Productos
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-dark font-semibold px-8 py-3.5 rounded-full text-center border-2 border-gray/20 hover:scale-105 transition-transform"
            >
              Contactar por WhatsApp
            </a>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center gap-2 animate-fade-up" style={{ animationDelay: "0.4s" }}>
          <CandyMascotLeft className="w-24 sm:w-32 md:w-44" />
          <LollipopSVG className="w-14 sm:w-16 md:w-20 -mx-3 sm:-mx-4 relative z-10 drop-shadow-lg" />
          <CandyMascotRight className="w-24 sm:w-32 md:w-44" />
        </div>
      </div>
    </section>
  )
}

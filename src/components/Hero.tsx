import { CandyMascotLeft, CandyMascotRight, LollipopSVG } from "./CandyMascot"

const floatingCandies = [
  { emoji: "🍫", x: "10%", delay: "0s", size: "text-2xl" },
  { emoji: "🍬", x: "85%", delay: "1s", size: "text-xl" },
  { emoji: "🍭", x: "5%", delay: "2s", size: "text-3xl" },
  { emoji: "🍩", x: "75%", delay: "0.5s", size: "text-2xl" },
  { emoji: "🍪", x: "90%", delay: "3s", size: "text-xl" },
  { emoji: "🥤", x: "15%", delay: "1.5s", size: "text-2xl" },
  { emoji: "🍿", x: "45%", delay: "0.8s", size: "text-lg" },
  { emoji: "🧁", x: "55%", delay: "2.5s", size: "text-2xl" },
  { emoji: "🍡", x: "30%", delay: "1.2s", size: "text-xl" },
  { emoji: "🎂", x: "65%", delay: "3.5s", size: "text-lg" },
  { emoji: "🍦", x: "20%", delay: "0.3s", size: "text-2xl" },
  { emoji: "🍿", x: "70%", delay: "1.8s", size: "text-xl" },
]

export default function Hero() {
  return (
    <section id="inicio" className="relative min-h-screen pt-16 flex items-center justify-center overflow-hidden bg-gradient-to-b from-cream to-pastel">
      {floatingCandies.map((candy, i) => (
        <span
          key={i}
          className={`absolute animate-float ${candy.size} opacity-60`}
          style={{ left: candy.x, top: `${15 + i * 10}%`, animationDelay: candy.delay }}
        >
          {candy.emoji}
        </span>
      ))}
      <div className="relative z-10 container mx-auto px-4 py-24 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
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
              href="https://wa.me/5491123456789"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-dark font-semibold px-8 py-3.5 rounded-full text-center border-2 border-gray/20 hover:scale-105 transition-transform"
            >
              Contactar por WhatsApp
            </a>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center gap-2 animate-fade-up" style={{ animationDelay: "0.4s" }}>
          <CandyMascotLeft className="w-28 sm:w-36 md:w-44" />
          <LollipopSVG className="w-8 sm:w-10 md:w-12 -mx-2 sm:-mx-1 relative z-10 drop-shadow-lg" />
          <CandyMascotRight className="w-28 sm:w-36 md:w-44" />
        </div>
      </div>
    </section>
  )
}

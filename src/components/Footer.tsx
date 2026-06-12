import FloatingCandies from "./FloatingCandies"

const candies = [
  { emoji: "🍬", position: { top: "5%", left: "4%" }, animation: "float" as const, size: "text-2xl" },
  { emoji: "🍭", position: { top: "8%", right: "5%" }, animation: "float-delayed" as const, size: "text-3xl" },
  { emoji: "🍫", position: { bottom: "4%", left: "8%" }, animation: "float-slow" as const, size: "text-xl" },
  { emoji: "🍩", position: { bottom: "6%", right: "3%" }, animation: "float" as const, size: "text-2xl" },
  { emoji: "🍪", position: { top: "3%", left: "35%" }, animation: "float-delayed" as const, size: "text-xl" },
  { emoji: "🧁", position: { top: "12%", right: "25%" }, animation: "float" as const, size: "text-2xl" },
  { emoji: "🍿", position: { bottom: "3%", left: "40%" }, animation: "float-slow" as const, size: "text-lg" },
  { emoji: "🍡", position: { bottom: "10%", right: "30%" }, animation: "float" as const, size: "text-xl" },
]

export default function Footer() {
  return (
    <footer className="relative bg-dark text-white overflow-hidden">
      <FloatingCandies candies={candies} />
      <div className="container mx-auto px-4 py-10 lg:py-16 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10">
          <div>
            <h3 className="font-display text-xl lg:text-2xl text-primary mb-3 lg:mb-4">
              Crokangol
            </h3>
            <p className="font-body text-sm text-primary/80 leading-relaxed">
              Compartiendo momentos dulces desde siempre. Tu tienda de golosinas de confianza.
            </p>
          </div>
          <div>
            <h4 className="font-display text-base lg:text-lg mb-2 lg:mb-4">Contacto</h4>
            <ul className="font-body text-sm space-y-2">
              <li className="flex items-center gap-2">
                <span>📍</span>
                <span className="text-primary/80">Av. Alberdi 499, Resistencia, Chaco</span>
              </li>
              <li className="flex items-center gap-2">
                <span>📞</span>
                <a href="tel:+543624006615" className="text-primary/80 hover:text-white transition-colors">
                  3624 006615
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span>📱</span>
                <a
                  href="https://wa.me/5493624006615"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary/80 hover:text-white transition-colors"
                >
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-display text-base lg:text-lg mb-2 lg:mb-4">Horarios</h4>
            <ul className="font-body text-sm space-y-2 text-primary/80">
              <li>Lun - Sáb: 09:00 - 12:00</li>
              <li className="text-primary/80">Lun - Sáb: 17:00 - 20:00</li>
              <li className="text-primary/80">Dom: Cerrado</li>
            </ul>
          </div>
          <div>
            <h4 className="font-display text-primary/80 text-base lg:text-lg mb-2 lg:mb-4">Seguinos</h4>
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/crokangol/?hl=es"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors"
              >
                <span className="text-lg">📷</span>
              </a>
              <a
                href="https://wa.me/5493624006615"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors"
              >
                <span className="text-lg">💬</span>
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 mt-8 lg:mt-10 pt-6 lg:pt-8 text-center font-body text-xs lg:text-sm text-gray">
          <p>© {new Date().getFullYear()} Crokangol Golosinas. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

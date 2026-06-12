export default function Promotions() {
  return (
    <section className="relative py-20 bg-primary overflow-hidden">
      <span className="absolute top-4 left-[8%] text-3xl animate-float opacity-60">🍫</span>
      <span className="absolute top-8 right-[12%] text-2xl animate-float-delayed opacity-60">🍬</span>
      <span className="absolute bottom-8 left-[20%] text-3xl animate-float-slow opacity-60">🍭</span>
      <span className="absolute bottom-12 right-[15%] text-2xl animate-float opacity-60">🍩</span>
      <span className="absolute top-16 left-[40%] text-xl animate-float-delayed opacity-60">🍪</span>
      <span className="absolute top-20 right-[35%] text-2xl animate-float-slow opacity-60">🧁</span>
      <span className="absolute bottom-16 left-[55%] text-lg animate-float opacity-60">🍿</span>
      <span className="absolute bottom-20 right-[40%] text-xl animate-float-delayed opacity-60">🍡</span>
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
          href="https://wa.me/5493624006615"
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

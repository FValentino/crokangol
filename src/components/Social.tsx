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
            <a
              href="https://www.instagram.com/crokangol/?hl=es"
              target="_blank"
              rel="noopener noreferrer"
              className="w-[60%] md:w-[30%] flex justify-center items-center mx-auto gap-2 bg-white/10 rounded-full px-4 py-2 hover:bg-primary transition-colors "
            >
              {/* Cambié la etiqueta sr-only por un contenedor normal para el SVG */}
              <span className="flex items-center justify-center w-10 h-10">
                <svg 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg" 
                  stroke="#FF0069"
                >
                  <g strokeWidth={0}></g>
                  <g strokeLinecap="round" strokeLinejoin="round"></g>
                  <g> 
                    <path 
                      fillRule="evenodd" 
                      clipRule="evenodd" 
                      d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" 
                      fill="#FF0069" // Corregido el doble ##
                    /> 
                    <path 
                      d="M18 5C17.4477 5 17 5.44772 17 6C17 6.55228 17.4477 7 18 7C18.5523 7 19 6.55228 19 6C19 5.44772 18.5523 5 18 5Z" 
                      fill="#FF0069" // Corregido el doble ##
                    /> 
                    <path 
                      fillRule="evenodd" 
                      clipRule="evenodd" 
                      d="M1.65396 4.27606C1 5.55953 1 7.23969 1 10.6V13.4C1 16.7603 1 18.4405 1.65396 19.7239C2.2292 20.8529 3.14708 21.7708 4.27606 22.346C5.55953 23 7.23969 23 10.6 23H13.4C16.7603 23 18.4405 23 19.7239 22.346C20.8529 21.7708 21.7708 20.8529 22.346 19.7239C23 18.4405 23 16.7603 23 13.4V10.6C23 7.23969 23 5.55953 22.346 4.27606C21.7708 3.14708 20.8529 2.2292 19.7239 1.65396C18.4405 1 16.7603 1 13.4 1H10.6C7.23969 1 5.55953 1 4.27606 1.65396C3.14708 2.2292 2.2292 3.14708 1.65396 4.27606ZM13.4 3H10.6C8.88684 3 7.72225 3.00156 6.82208 3.0751C5.94524 3.14674 5.49684 3.27659 5.18404 3.43597C4.43139 3.81947 3.81947 4.43139 3.43597 5.18404C3.27659 5.49684 3.14674 5.94524 3.0751 6.82208C3.00156 7.72225 3 8.88684 3 10.6V13.4C3 15.1132 3.00156 16.2777 3.0751 17.1779C3.14674 18.0548 3.27659 18.5032 3.43597 18.816C3.81947 19.5686 4.43139 20.1805 5.18404 20.564C5.49684 20.7234 5.94524 20.8533 6.82208 20.9249C7.72225 20.9984 8.88684 21 10.6 21H13.4C15.1132 21 16.2777 20.9984 17.1779 20.9249C18.0548 20.8533 18.5032 20.7234 18.816 20.564C19.5686 20.1805 20.1805 19.5686 20.564 18.816C20.7234 18.5032 20.8533 18.0548 20.9249 17.1779C20.9984 16.2777 21 15.1132 21 13.4V10.6C21 8.88684 20.9984 7.72225 20.9249 6.82208C20.8533 5.94524 20.7234 5.49684 20.564 5.18404C20.1805 4.43139 19.5686 3.81947 18.816 3.43597C18.5032 3.27659 18.0548 3.14674 17.1779 3.0751C16.2777 3.00156 15.1132 3 13.4 3Z" 
                      fill="#FF0069" // Corregido el doble ##
                    /> 
                  </g>
                </svg>
                <span className="sr-only">Instagram</span>                 
              </span>
              Crokangol
            </a>
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

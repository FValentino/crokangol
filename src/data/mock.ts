export interface Category {
  id: string
  name: string
  description: string
  icon: string
  bgColor: string
}

export interface Product {
  id: string
  name: string
  price: string
  image: string
  category: string
  badge?: string
}

export interface Testimonial {
  id: string
  name: string
  text: string
  rating: number
}

export interface SocialPost {
  id: string
  image: string
  likes: string
}

export const categories: Category[] = [
  { id: "chocolates", name: "Chocolates", description: "Tabletas, bombones y más", icon: "🍫", bgColor: "bg-amber-50" },
  { id: "caramelos", name: "Caramelos", description: "Duros, blandos y ácidos", icon: "🍬", bgColor: "bg-pink-50" },
  { id: "galletitas", name: "Galletitas", description: "Dulces y rellenas", icon: "🍪", bgColor: "bg-yellow-50" },
  { id: "snacks", name: "Snacks", description: "Salados para compartir", icon: "🥨", bgColor: "bg-orange-50" },
  { id: "bebidas", name: "Bebidas", description: "Jugos, gaseosas y más", icon: "🥤", bgColor: "bg-blue-50" },
  { id: "promociones", name: "Promociones", description: "Combos y ofertas especiales", icon: "🎉", bgColor: "bg-purple-50" },
]

export const products: Product[] = [
  { id: "p1", name: "Chocolate con Leche 100g", price: "$2.500", image: "/placeholder-product.svg", category: "chocolates", badge: "Más vendido" },
  { id: "p2", name: "Chocolate Blanco 80g", price: "$2.800", image: "/placeholder-product.svg", category: "chocolates", badge: "Nuevo" },
  { id: "p3", name: "Caramelos Masticables 200g", price: "$1.900", image: "/placeholder-product.svg", category: "caramelos" },
  { id: "p4", name: "Caramelos Ácidos 150g", price: "$1.500", image: "/placeholder-product.svg", category: "caramelos" },
  { id: "p5", name: "Galletitas Rellenas x12", price: "$3.200", image: "/placeholder-product.svg", category: "galletitas", badge: "Oferta" },
  { id: "p6", name: "Galletitas con Chips x8", price: "$2.900", image: "/placeholder-product.svg", category: "galletitas" },
  { id: "p7", name: "Mix de Snacks 300g", price: "$4.100", image: "/placeholder-product.svg", category: "snacks" },
  { id: "p8", name: "Papas Fritas 120g", price: "$1.800", image: "/placeholder-product.svg", category: "snacks" },
]

export const testimonials: Testimonial[] = [
  { id: "t1", name: "María G.", text: "Excelente atención y gran variedad de productos. Siempre encuentro lo que busco para los cumpleaños de mis hijos.", rating: 5 },
  { id: "t2", name: "Carlos M.", text: "Los mejores precios del barrio y la calidad es inmejorable. Muy recomendable.", rating: 5 },
  { id: "t3", name: "Laura P.", text: "Hago todos mis pedidos por WhatsApp y me llegan en el día. Súper práctico y confiable.", rating: 5 },
  { id: "t4", name: "José R.", text: "La atención personalizada es lo que más valoro. Siempre tienen lo último en golosinas.", rating: 4 },
]

export const socialPosts: SocialPost[] = [
  { id: "s1", image: "/placeholder-social.svg", likes: "234" },
  { id: "s2", image: "/placeholder-social.svg", likes: "189" },
  { id: "s3", image: "/placeholder-social.svg", likes: "312" },
  { id: "s4", image: "/placeholder-social.svg", likes: "156" },
  { id: "s5", image: "/placeholder-social.svg", likes: "278" },
  { id: "s6", image: "/placeholder-social.svg", likes: "203" },
]

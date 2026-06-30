import "reflect-metadata"
import { DataSource } from "typeorm"
import { Store } from "@/backend/domain/store/Store.entity"
import { Category } from "@/backend/domain/category/Category.entity"
import { Product } from "@/backend/domain/product/Product.entity"
import { ProductPhoto } from "@/backend/domain/product/ProductPhoto.entity"
import { StoreProduct } from "@/backend/domain/store-product/StoreProduct.entity"
import { Client } from "@/backend/domain/client/Client.entity"
import { Cart } from "@/backend/domain/cart/Cart.entity"
import { CartItem } from "@/backend/domain/cart/CartItem.entity"
import { Order } from "@/backend/domain/order/Order.entity"
import { OrderItem } from "@/backend/domain/order/OrderItem.entity"

const entities = [
  Store, Category, Product, ProductPhoto, StoreProduct,
  Client, Cart, CartItem, Order, OrderItem,
]

const DEV_DOMAIN = "localhost"

interface ProductSeed {
  name: string
  slug: string
  description: string
  weightKg: number
  lengthCm: number
  heightCm: number
  widthCm: number
  quantity: number
  price: number
  priceType: "per_box" | "per_unit" | "both"
  minQuantity: number
  offerPrice?: number
  offerUntil?: string
  categorySlug: string
  imageUrl?: string
}

const categories: { name: string; slug: string }[] = [
  { name: "Chocolates", slug: "chocolates" },
  { name: "Caramelos", slug: "caramelos" },
  { name: "Galletitas", slug: "galletitas" },
  { name: "Snacks", slug: "snacks" },
]

const products: ProductSeed[] = [
  // Chocolates
  {
    name: "Tableta Chocolate Blanco",
    slug: "tableta-chocolate-blanco",
    description: "Tableta de chocolate blanco premium, ideal para compartir",
    weightKg: 0.15,
    lengthCm: 15, heightCm: 7, widthCm: 1,
    quantity: 50, price: 1200, priceType: "per_unit", minQuantity: 1,
    categorySlug: "chocolates",
    imageUrl: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=400",
  },
  {
    name: "Bombones Surtidos",
    slug: "bombones-surtidos",
    description: "Caja con 12 bombones de sabores variados",
    weightKg: 0.25,
    lengthCm: 20, heightCm: 15, widthCm: 3,
    quantity: 30, price: 2500, priceType: "per_unit", minQuantity: 1,
    categorySlug: "chocolates",
    imageUrl: "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=400",
  },
  {
    name: "Chocolate con Maní",
    slug: "chocolate-mani",
    description: "Barra de chocolate semi-amargo con maní tostado",
    weightKg: 0.1,
    lengthCm: 12, heightCm: 6, widthCm: 1,
    quantity: 80, price: 900, priceType: "per_unit", minQuantity: 1,
    categorySlug: "chocolates",
    imageUrl: "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=400",
  },

  // Caramelos
  {
    name: "Caramelos Masticables Sabor Frutilla",
    slug: "caramelos-masticables-frutilla",
    description: "Caramelos blandos sabor frutilla, bolsa x 100g",
    weightKg: 0.1,
    lengthCm: 10, heightCm: 5, widthCm: 2,
    quantity: 100, price: 600, priceType: "per_unit", minQuantity: 1,
    offerPrice: 480, offerUntil: "2026-08-01",
    categorySlug: "caramelos",
    imageUrl: "https://images.unsplash.com/photo-1570475735025-6cd1cd5c779d?w=400",
  },
  {
    name: "Paletas de Caramelo Duro",
    slug: "paletas-caramelo-duro",
    description: "Paletas surtidas de caramelo duro con palito",
    weightKg: 0.2,
    lengthCm: 15, heightCm: 10, widthCm: 5,
    quantity: 60, price: 800, priceType: "per_unit", minQuantity: 1,
    categorySlug: "caramelos",
    imageUrl: "https://images.unsplash.com/photo-1581798459219-318e76ae3b32?w=400",
  },
  {
    name: "Gomitas Ácidas Ositos",
    slug: "gomitas-acidas-ositos",
    description: "Gomitas con forma de osito recubiertas de azúcar ácida",
    weightKg: 0.15,
    lengthCm: 12, heightCm: 8, widthCm: 3,
    quantity: 90, price: 700, priceType: "per_unit", minQuantity: 1,
    categorySlug: "caramelos",
    imageUrl: "https://images.unsplash.com/photo-1582058091505-f87a2c55a521?w=400",
  },

  // Galletitas
  {
    name: "Galletitas Rellenas de Crema",
    slug: "galletitas-rellenas-crema",
    description: "Galletitas sabor vainilla con relleno cremoso, pack x 6",
    weightKg: 0.3,
    lengthCm: 20, heightCm: 12, widthCm: 4,
    quantity: 40, price: 1500, priceType: "per_unit", minQuantity: 1,
    categorySlug: "galletitas",
    imageUrl: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400",
  },
  {
    name: "Galletitas de Coco",
    slug: "galletitas-coco",
    description: "Galletitas artesanales de coco, bolsa x 200g",
    weightKg: 0.2,
    lengthCm: 15, heightCm: 10, widthCm: 3,
    quantity: 50, price: 1100, priceType: "per_unit", minQuantity: 1,
    categorySlug: "galletitas",
    imageUrl: "https://images.unsplash.com/photo-1596050372449-3b0308593bf0?w=400",
  },
  {
    name: "Galletitas Saladas Integrales",
    slug: "galletitas-saladas-integrales",
    description: "Galletitas saladas de harina integral con semillas",
    weightKg: 0.25,
    lengthCm: 18, heightCm: 10, widthCm: 4,
    quantity: 35, price: 950, priceType: "per_unit", minQuantity: 1,
    categorySlug: "galletitas",
    imageUrl: "https://images.unsplash.com/photo-1619546952812-520e98064a60?w=400",
  },

  // Snacks
  {
    name: "Mix de Frutos Secos",
    slug: "mix-frutos-secos",
    description: "Combinación de almendras, nueces y castañas",
    weightKg: 0.2,
    lengthCm: 15, heightCm: 10, widthCm: 3,
    quantity: 70, price: 1800, priceType: "per_unit", minQuantity: 1,
    categorySlug: "snacks",
    imageUrl: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=400",
  },
  {
    name: "Papas Fritas Clásicas",
    slug: "papas-fritas-clasicas",
    description: "Papas fritas sabor original, paquete x 120g",
    weightKg: 0.12,
    lengthCm: 25, heightCm: 15, widthCm: 3,
    quantity: 100, price: 850, priceType: "per_unit", minQuantity: 1,
    categorySlug: "snacks",
    imageUrl: "https://images.unsplash.com/photo-1613919113641-0afc2a0cf4b4?w=400",
  },
  {
    name: "Palitos Salados",
    slug: "palitos-salados",
    description: "Palitos de pan con sal gruesa, ideal para picadas",
    weightKg: 0.18,
    lengthCm: 20, heightCm: 8, widthCm: 3,
    quantity: 45, price: 650, priceType: "per_unit", minQuantity: 1,
    offerPrice: 520, offerUntil: "2026-07-20",
    categorySlug: "snacks",
    imageUrl: "https://images.unsplash.com/photo-1614961234417-16e1e2e05ca2?w=400",
  },
]

async function seed() {
  console.log("🔌 Conectando a la base de datos...")
  const ds = new DataSource({
    type: "postgres",
    url: process.env.DATABASE_URL,
    synchronize: true,
    dropSchema: true,
    entities,
    ssl: { rejectUnauthorized: false },
  })
  await ds.initialize()
  console.log("🔄 Esquema recreado desde cero")

  // --- Store ---
  const storeRepo = ds.getRepository(Store)
  let store = await storeRepo.findOneBy({ domain: DEV_DOMAIN })
  if (!store) {
    store = storeRepo.create({
      name: "Tienda de Prueba",
      domain: DEV_DOMAIN,
      uuid: crypto.randomUUID(),
      address: "Av. Siempre Viva 123, Córdoba",
      phone: "5493512345678",
      email: "tienda@ejemplo.com",
      active: true,
    })
    await storeRepo.save(store)
    console.log(`✅ Store creada: "${store.name}" (domain: ${DEV_DOMAIN})`)
  } else {
    console.log(`ℹ️ Store existente: "${store.name}" (domain: ${DEV_DOMAIN})`)
  }

  // --- Categories ---
  const categoryRepo = ds.getRepository(Category)
  const categoryMap = new Map<string, Category>()

  for (const cat of categories) {
    let category = await categoryRepo.findOneBy({ store: { id: store.id }, slug: cat.slug })
    if (!category) {
      category = categoryRepo.create({ store, name: cat.name, slug: cat.slug })
      await categoryRepo.save(category)
      console.log(`  ✅ Categoría: ${cat.name}`)
    } else {
      console.log(`  ℹ️ Categoría existente: ${cat.name}`)
    }
    categoryMap.set(cat.slug, category)
  }

  // --- Products ---
  const productRepo = ds.getRepository(Product)
  const spRepo = ds.getRepository(StoreProduct)
  const photoRepo = ds.getRepository(ProductPhoto)

  for (const p of products) {
    let product = await productRepo.findOneBy({ slug: p.slug })

    if (!product) {
      product = productRepo.create({
        name: p.name,
        slug: p.slug,
        description: p.description,
        weightKg: p.weightKg,
        lengthCm: p.lengthCm,
        heightCm: p.heightCm,
        widthCm: p.widthCm,
        quantity: p.quantity,
        active: true,
      })
      await productRepo.save(product)

      // Add photo if imageUrl provided
      if (p.imageUrl) {
        const photo = photoRepo.create({
          product,
          storeId: store.id,
          url: p.imageUrl,
          isPrimary: true,
          sortOrder: 0,
        })
        await photoRepo.save(photo)
      }
    }

    // Link store → product → category
    const existing = await spRepo.findOneBy({
      store: { id: store.id },
      product: { id: product.id },
    })

    if (!existing) {
      const sp = spRepo.create({
        store,
        product,
        category: categoryMap.get(p.categorySlug) ?? null,
        priceType: p.priceType,
        price: p.price,
        minQuantity: p.minQuantity,
        offerPrice: p.offerPrice ?? null,
        offerUntil: p.offerUntil ? new Date(p.offerUntil) : null,
        active: true,
      })
      await spRepo.save(sp)
      console.log(`  ✅ Producto: ${p.name} ($${p.price})`)
    } else {
      console.log(`  ℹ️ Producto existente: ${p.name}`)
    }
  }

  console.log("\n🎉 Seed completado!")
  await ds.destroy()
}

seed().catch((err) => {
  console.error("💥 Error en seed:", err)
  process.exit(1)
})

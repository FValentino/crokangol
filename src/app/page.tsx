import Navbar from "@/components/Navbar"
import Hero from "@/components/Hero"
import Categories from "@/components/Categories"
import FeaturedProducts from "@/components/FeaturedProducts"
import Promotions from "@/components/Promotions"
import About from "@/components/About"
import Testimonials from "@/components/Testimonials"
import Social from "@/components/Social"
import Footer from "@/components/Footer"
export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Categories />
      <FeaturedProducts />
      <Promotions />
      <About />
      <Testimonials />
      <Social />
      <Footer />
    </>
  )
}

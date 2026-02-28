import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "../components/common/Container";
import ProductCard from "../components/common/ProductCard";
import { getProducts } from "../services/productService";
import { useLocation } from "react-router-dom";
import { useRef } from "react";

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetchFeatured();
  }, []);

  const fetchFeatured = async () => {
    try {
      const data = await getProducts();      
      const newest = [...data]
        .sort((a, b) => b.id - a.id)
        .slice(0, 7);

      setFeaturedProducts(newest);

    } catch (err) {
      console.error(err);
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get("category");

    if (category) {
      setCategoryFilter(category);
    }
  }, [location.search]);

  return (
    <div>
      <Categories navigate={navigate} />
      <Hero navigate={navigate} />
      <LatestArrivals products={featuredProducts} />
      
      <WeddingBanner/>
      <StoreLocation/>
      
    </div>
  );
}

function Hero({ navigate }) {
  return (
    <section
      className="relative h-[45vh] md:h-[90vh] lg:h-[100vh] flex items-center"
      style={{
        backgroundImage: "url('/bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center right",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/55 md:bg-black/45 lg:bg-black/40"></div>

      <Container>
        <div className="relative z-10 max-w-2xl text-white">

          <div className="space-y-6 text-center md:text-left">

            {/* Small Label */}
            <p className="uppercase tracking-[6px] text-xs md:text-sm text-gray-200">
              Premium Ethnic Wear
            </p>

            {/* Heading */}
            <h1 className="font-serif font-semibold leading-tight
                           text-3xl 
                           md:text-5xl 
                           lg:text-6xl">
              Where Tradition <br />
              Meets Royal Elegance
            </h1>

            {/* Sub Text */}
            <p className="text-gray-200 
                          text-sm 
                          md:text-lg 
                          lg:text-xl 
                          max-w-xl">
              Premium bridal & festive collections crafted for your most special celebrations.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">

              <button
                onClick={() => navigate("/products")}
                className="px-8 py-3 md:py-4 rounded-full bg-white text-black font-medium 
                           hover:scale-105 transition duration-300"
              >
                Explore Collection
              </button>

              <button
                onClick={() => navigate("/products?category=Lehenga")}
                className="px-8 py-3 md:py-4 rounded-full bg-[#8B1E2D] text-white 
                           hover:scale-105 transition duration-300"
              >
                Wedding Collection
              </button>

            </div>

          </div>
        </div>
      </Container>
    </section>
  );
}

function Categories({ navigate }) {
  const categories = [
    { name: "Sarees", image: "/categories/Sarees.jpg" },
    { name: "Designer Suits", image: "/categories/Designer Suits.jpg" },
    { name: "Unstitched Suits", image: "/categories/Unstitched Suits.jpg" },
    { name: "Lehenga", image: "/categories/Lehenga.jpg" },
    { name: "Party Wear", image: "/categories/Party Wear.jpg" },
    { name: "New Arrivals", image: "/categories/New Arrivals.jpg" },
  ];

  return (
    <section className="py-4 bg-white">
      <Container>

        {/* Mobile Scroll + Desktop Grid */}
        <div className="flex md:grid md:grid-cols-6 gap-3 overflow-x-auto md:overflow-visible no-scrollbar px-1">

          {categories.map((cat, index) => (
            <div
              key={index}
              onClick={() =>
                navigate(`/products?category=${encodeURIComponent(cat.name)}`)
              }
              className="min-w-[90px] md:min-w-0 text-center cursor-pointer group flex-shrink-0"
            >
              {/* Circle Image */}
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-[#C4A24B] overflow-hidden bg-white shadow-md group-hover:scale-105 transition duration-300 mx-auto">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Category Name */}
              <p className="mt-2 text-xs md:text-sm font-medium text-[#3E2C1C] whitespace-nowrap">
                {cat.name}
              </p>
            </div>
          ))}

        </div>

      </Container>
    </section>
  );
}


function WeddingBanner() {
  const whatsappNumber = "919557201975";

  return (
    <section
      className="relative h-[45vh] md:h-[70vh] lg:h-[80vh] flex items-center"
      style={{
        backgroundImage: "url('/bg.png')",
      }}
    >
      {/* Overlay */}
      
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70"></div>

      <Container>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10 text-white">

          {/* LEFT CONTENT */}
          <div className="max-w-xl text-center md:text-left space-y-5">

            <p className="uppercase tracking-[4px] text-xs text-gray-300">
              Exclusive Bridal Wear
            </p>

            <h2 className="text-3xl md:text-4xl font-serif leading-tight">
              Wedding Special Collection
            </h2>

            <p className="text-gray-200 text-sm md:text-base">
              Discover handcrafted bridal lehengas & designer outfits
              for your most unforgettable day.
            </p>

            <div className="flex flex-col md:flex-row gap-4 mt-6">

              {/* View Collection */}
              <button
                onClick={() => window.location.href = "/products?category=Lehenga"}
                className="px-6 py-3 rounded-full bg-white text-black font-medium hover:opacity-90 transition"
              >
                Explore Collection
              </button>

              {/* WhatsApp Button */}
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full bg-[#25D366] text-white font-medium hover:opacity-90 transition text-center"
              >
                Chat on WhatsApp
              </a>

            </div>

          </div>

          {/* RIGHT IMAGE (Optional model) */}
          {/* <div className="hidden md:block">
            <img
              src="/wedding-model.png"
              alt="Bridal Collection"
              className="w-[350px]"
            />
          </div> */}

        </div>
      </Container>
    </section>
  );
}

function StoreLocation() {
  const mapsEmbedLink =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3454.64832894248!2d77.4012545!3d30.01825269999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390eef000b7f731f%3A0xfdcbc50422e0e439!2sDeep%20fashion%20sarsawa!5e0!3m2!1sen!2sin!4v1771327490589!5m2!1sen!2sin";

  const mapsDirectionLink =
    "https://maps.app.goo.gl/Xw6Q1LHaE7sCF6ZJ6";

  return (
    <section className="py-16 bg-[#F5F1E8]">
      <Container>

        {/* Heading */}
        <h2 className="text-2xl md:text-3xl font-serif text-[#3E2C1C] mb-10">
          Store Location
        </h2>

        {/* Grid Layout */}
        <div className="grid md:grid-cols-2 gap-8 items-start">

          {/* LEFT — Google Map */}
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <iframe
              src={mapsEmbedLink}
              className="w-full h-[280px] md:h-[400px]"
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>

          {/* RIGHT — Shop Image */}
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <img
              src="/shop.jpg"   
              alt="Deep Fashion Store"
              className="w-full h-[280px] md:h-[400px] object-cover"
            />
          </div>

        </div>

        {/* Address Section */}
        <div className="mt-8 text-center md:text-left space-y-4">

          <p className="text-gray-700 leading-relaxed text-sm md:text-base">
            Opposite Gurudwara, Near Chawla ultrasound,<br />
            Sarsawa, Saharanpur,<br />
            Uttar Pradesh, India
          </p>

          {/* Buttons */}
          <div className="flex flex-col md:flex-row gap-4 mt-4">

            <a
              href={mapsDirectionLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full bg-[#8B1E2D] text-white font-medium hover:opacity-90 transition text-center"
            >
              Get Directions
            </a>

            <a
              href="tel:+919557201975"   
              className="px-6 py-3 rounded-full border border-[#8B1E2D] text-[#8B1E2D] font-medium hover:bg-[#8B1E2D] hover:text-white transition text-center"
            >
              Call Store
            </a>

          </div>

        </div>

      </Container>
    </section>
  );
}

function LatestArrivals({ products }) {
  const navigate = useNavigate();
  const sliderRef = useRef(null);

  const scrollLeft = () => {
    sliderRef.current.scrollBy({ left: -250, behavior: "smooth" });
  };

  const scrollRight = () => {
    sliderRef.current.scrollBy({ left: 250, behavior: "smooth" });
  };

  return (
    <section className="py-14 bg-[#F5F1E8]">
      <Container>

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-serif text-[#3E2C1C]">
            Latest Arrivals
          </h2>

          <div className="flex gap-3">
            <button
              onClick={scrollLeft}
              className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-white transition"
            >
              ‹
            </button>
            <button
              onClick={scrollRight}
              className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-white transition"
            >
              ›
            </button>
          </div>
        </div>

        {/* Slider */}
        <div
          ref={sliderRef}
          className="flex gap-6 overflow-x-auto pb-4 scroll-smooth"
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="min-w-[180px] bg-white rounded-xl shadow-sm p-3 cursor-pointer hover:shadow-lg transition"
              onClick={() => navigate(`/product/${product.id}`)}
            >
              <img
                src={product.images?.[0]?.image_url}
                alt={product.name}
                className="rounded-lg object-cover w-full h-[220px]"
              />

              <h3 className="mt-3 text-sm font-medium text-[#3E2C1C]">
                {product.name}
              </h3>

              <div className="flex items-center mt-1 text-yellow-500 text-sm">
                ★★★★★
              </div>
            </div>
          ))}

          {/* View All Card */}
          <div
            onClick={() => navigate("/products")}
            className="min-w-[180px] bg-white rounded-xl shadow-sm p-3 flex items-center justify-center cursor-pointer hover:bg-[#eee] transition"
          >
            <div className="text-center">
              <p className="text-lg font-semibold text-[#8B1E2D]">
                View All
              </p>
              <p className="text-sm text-gray-500">
                Products →
              </p>
            </div>
          </div>

        </div>

      </Container>
    </section>
  );
}
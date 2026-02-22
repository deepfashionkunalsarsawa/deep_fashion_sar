import { useEffect, useState, useMemo } from "react";
import Container from "../components/common/Container";
import { getProducts } from "../services/productService";
import { useLocation, useNavigate } from "react-router-dom";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [occasionFilter, setOccasionFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  /* ===== URL CATEGORY SAFE LOGIC (YOUR ORIGINAL) ===== */
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get("category");

    if (!category || category.trim() === "") {
      setCategoryFilter("");
      return;
    }

    const validCategories = [
      "Sarees",
      "Designer Suits",
      "Kurtis",
      "Lehenga",
      "Party Wear",
      "New Arrivals",
    ];

    if (validCategories.includes(category)) {
      setCategoryFilter(category);
    } else {
      setCategoryFilter(""); // unknown → show all
    }
  }, [location.search]);

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  };

  /* ===== FILTERED PRODUCTS (SAFE FALLBACK LOGIC) ===== */
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // CATEGORY
    if (categoryFilter) {
      const matched = result.filter(
        (p) =>
          p.category?.toLowerCase() === categoryFilter.toLowerCase()
      );

      result = matched.length > 0 ? matched : products;
    }

    // OCCASION
    if (occasionFilter) {
      result = result.filter(
        (p) =>
          p.occasion?.toLowerCase() === occasionFilter.toLowerCase()
      );
    }

    // SEARCH
    if (searchTerm.trim() !== "") {
      result = result.filter((p) =>
        p.name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // SORT
    if (sortOrder === "low") {
      result = [...result].sort((a, b) => a.price - b.price);
    }

    if (sortOrder === "high") {
      result = [...result].sort((a, b) => b.price - a.price);
    }

    return result;
  }, [products, categoryFilter, occasionFilter, sortOrder, searchTerm]);

  return (
    <section className="bg-[#F5F1E8] min-h-screen pb-24">
      <Container>
        <div className="pt-6 pb-4 flex items-center justify-between gap-4">
          
          <h1 className="text-xl font-serif text-[#3E2C1C]">
            Products
          </h1>

          {/* Smaller Search */}
          <div className="relative w-[55%] max-w-sm">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-[#D8D2C4] bg-white rounded-full py-2.5 pl-4 pr-10 focus:outline-none shadow-sm text-sm"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8B6A2B] text-sm">
              🔍
            </span>
          </div>

        </div>
        


        {/* CATEGORY SLIDER */}
        <div className="flex gap-4 overflow-x-auto pb-5 no-scrollbar">
          {["Sarees", "Lehenga", "Designer Suits", "Party Wear", "Unstictched Suits"].map((cat) => (
            <div
              key={cat}
              onClick={() =>
                setCategoryFilter(
                  categoryFilter === cat ? "" : cat
                )
              }
              className="flex flex-col items-center min-w-[75px] cursor-pointer"
            >
              <div
                className={`w-16 h-16 rounded-full border-2 ${
                  categoryFilter === cat
                    ? "border-[#8B6A2B]"
                    : "border-[#D4AF37]"
                } overflow-hidden bg-white shadow-sm`}
              >
                <img
                  src={`/categories/${cat}.jpg`}
                  alt={cat}
                  className="w-full h-full object-cover"
                />
              </div>

              <p className="text-xs mt-2 text-[#3E2C1C]">
                {cat}
              </p>
            </div>
          ))}
        </div>

        {/* OCCASION + SORT FILTERS */}
        <div className="flex gap-3 mb-6">
          <select
            value={occasionFilter}
            onChange={(e) => setOccasionFilter(e.target.value)}
            className="flex-1 px-3 py-2 rounded-lg border bg-white"
          >
            <option value="">All Occasions</option>
            <option value="Wedding">Wedding</option>
            <option value="Festival">Festival</option>
            <option value="Casual">Casual</option>
          </select>

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="flex-1 px-3 py-2 rounded-lg border bg-white"
          >
            <option value="">Sort</option>
            <option value="low">Low to High</option>
            <option value="high">High to Low</option>
          </select>
        </div>

        {/* PRODUCTS GRID */}
        <div className="grid grid-cols-2 gap-5">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => navigate(`/product/${product.id}`)}
              className="bg-white rounded-2xl shadow-md p-4 cursor-pointer hover:shadow-lg transition"
            >
              <div className="rounded-xl overflow-hidden bg-[#EFE9DD]">
                <img
                  src={product.images?.[0]?.image_url}
                  alt={product.name}
                  className="w-full h-[250px] object-cover rounded-xl"
                />
              </div>

              <div className="mt-3">
                <h3 className="text-sm font-medium text-[#3E2C1C]">
                  {product.name}
                </h3>

                <p className="mt-1 font-semibold text-[#3E2C1C]">
                  ₹{product.price}
                </p>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/product/${product.id}`);
                  }}
                  className="mt-3 w-full bg-[#C49A2C] text-white py-2 rounded-full text-sm"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

      </Container>
    </section>
  );
}
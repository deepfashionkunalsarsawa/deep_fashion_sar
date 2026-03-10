import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Container from "../components/common/Container";
import { getProductById, getProducts } from "../services/productService";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);

  const sizes = ["M", "L", "XL", "XXL"];
  const colors = ["Maroon", "Purple", "Red"];

  useEffect(() => {
    window.scrollTo(0, 0);
    setProduct(null);          
    setSelectedImage("");      
    setSelectedSize("");
    setSelectedColor("");
    setQuantity(1);

    fetchProduct();
    
  }, [id]);


  const fetchProduct = async () => {
    try {
      const data = await getProductById(id);
      setProduct(data);
      fetchRelatedProducts(data);

      // Set first image safely
      if (data.images && data.images.length > 0) {
        setSelectedImage(data.images[0].image_url);
      } else {
        setSelectedImage("");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  const fetchRelatedProducts = async (currentProduct) => {
    try {
      const data = await getProducts();

      const filtered = data
        .filter(
          (item) =>
            item.category === currentProduct.category &&
            item.id !== currentProduct.id
        )
        .slice(0, 8);

      setRelatedProducts(filtered);
    } catch (error) {
      console.error(error);
    }
  };


  if (!product) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  
  const discountPercent = 52;

  const originalPrice = product.price; // actual price
  const finalPrice = Math.round(product.price * (1 - discountPercent / 100));

  const savedAmount = originalPrice - finalPrice;

  const handleWhatsAppOrder = () => {
    const message = `
I want to order:
Product: ${product.name}
Size: ${selectedSize || "Not Selected"}
Color: ${selectedColor || "Not Selected"}
Quantity: ${quantity}
Price: ₹${product.price}
`;

    const whatsappURL = `https://wa.me/919557201975?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappURL, "_blank");
  };

  return (
    <section className="py-16 bg-soft min-h-screen">
      <Container>
        <div className="grid md:grid-cols-2 gap-12">

          {/* Image Section */}
          <div>

            {/* Main Image */}
            {selectedImage && (
              <img
                src={selectedImage}
                alt={product.name}
                className="rounded-2xl shadow-lg w-full"
              />
            )}

            {/* Thumbnails (multiple image support) */}
            {product.images && product.images.length > 0 && (
              <div className="flex gap-3 mt-4">
                {product.images.map((img, index) => (
                  <img
                    key={index}
                    src={img.image_url}
                    alt="thumbnail"
                    onClick={() => setSelectedImage(img.image_url)}
                    className={`w-20 h-20 object-cover rounded-lg cursor-pointer border hover:border-primary
                      ${
                        selectedImage === img.image_url
                          ? "border-primary ring-2 ring-primary"
                          : ""
                      }`}
                  />
                ))}
              </div>
            )}

          </div>

          {/* Details Section */}
          <div className="space-y-6">

            <h1 className="text-3xl font-bold text-primary">
              {product.name}
            </h1>
            <div>
              <div className="flex items-center gap-4">
                <span className="text-2xl font-bold text-primary">
                  ₹{finalPrice}
                </span>

                <span className="text-gray-400 line-through text-lg">
                  ₹{originalPrice}
                </span>

                <span className="text-green-600 font-semibold text-sm">
                  {discountPercent}% OFF
                </span>
              </div>

              <p className="text-green-600 text-sm mt-1">
                Save ₹{savedAmount}
              </p>
            </div>



            <p className="text-gray-600">{product.description}</p>


            {product.fabric && (
              <div className="text-gray-700">
                <span className="font-semibold text-primary">Fabric:</span>{" "}
                {product.fabric}
              </div>
            )}



            {/* Shipping & Trust Info */}
            <div className="space-y-2 pt-4 border-t">

              <div className="flex items-center gap-3 text-sm text-gray-700">
                <span className="text-green-600">
                  {/* Truck Icon */}
                  <svg viewBox="0 0 50 50" width="20" height="20" fill="currentColor">
                    <path d="M 0 8 L 0 10 L 28.09375 10 C 28.492188 10 29 10.507813 29 10.90625 L 29 38 L 18.90625 38 C 18.429688 35.164063 15.964844 33 13 33 C 10.035156 33 7.570313 35.164063 7.09375 38 L 3 38 C 2.445313 38 2 37.554688 2 37 L 2 28 L 0 28 L 0 37 C 0 38.644531 1.355469 40 3 40 L 7.09375 40 C 7.570313 42.835938 10.035156 45 13 45 C 15.964844 45 18.429688 42.835938 18.90625 40 L 34.09375 40 C 34.570313 42.835938 37.035156 45 40 45 C 42.964844 45 45.429688 42.835938 45.90625 40 L 47 40 C 47.832031 40 48.5625 39.625 49.09375 39.09375 C 49.625 38.5625 50 37.832031 50 37 L 50 27.40625 C 50 26.28125 49.570313 25.25 49.1875 24.46875 C 48.804688 23.6875 48.40625 23.125 48.40625 23.125 L 48.40625 23.09375 L 44.3125 17.59375 L 44.28125 17.59375 L 44.28125 17.5625 C 43.394531 16.453125 41.972656 15 40 15 L 32 15 C 31.640625 15 31.3125 15.066406 31 15.1875 L 31 10.90625 C 31 9.304688 29.695313 8 28.09375 8 Z M 0 12 L 0 14 L 18 14 L 18 12 Z M 0 16 L 0 18 L 15 18 L 15 16 Z M 32 17 L 36 17 L 36 26 C 36 26.832031 36.375 27.5625 36.90625 28.09375 C 37.4375 28.625 38.167969 29 39 29 L 48 29 L 48 37 C 48 37.167969 47.875 37.4375 47.65625 37.65625 C 47.4375 37.875 47.167969 38 47 38 L 45.90625 38 C 45.429688 35.164063 42.964844 33 40 33 C 37.035156 33 34.570313 35.164063 34.09375 38 L 31 38 L 31 18 C 31 17.832031 31.125 17.5625 31.34375 17.34375 C 31.5625 17.125 31.832031 17 32 17 Z M 38 17 L 40 17 C 40.824219 17 41.972656 17.925781 42.6875 18.8125 L 46.78125 24.28125 L 46.8125 24.3125 C 46.832031 24.339844 47.101563 24.722656 47.40625 25.34375 C 47.660156 25.859375 47.792969 26.472656 47.875 27 L 39 27 C 38.832031 27 38.5625 26.875 38.34375 26.65625 C 38.125 26.4375 38 26.167969 38 26 Z M 0 20 L 0 22 L 12 22 L 12 20 Z M 0 24 L 0 26 L 9 26 L 9 24 Z M 13 35 C 15.222656 35 17 36.777344 17 39 C 17 41.222656 15.222656 43 13 43 C 10.777344 43 9 41.222656 9 39 C 9 36.777344 10.777344 35 13 35 Z M 40 35 C 42.222656 35 44 36.777344 44 39 C 44 41.222656 42.222656 43 40 43 C 37.777344 43 36 41.222656 36 39 C 36 36.777344 37.777344 35 40 35 Z"/>
                  </svg>
                </span>

                Free Delivery in Sarsawa (within 3km)
              </div>


              <div className="flex items-center gap-3 text-sm text-gray-700">
                <span className="text-primary">

                  {/* Location Icon */}
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                    
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                  </svg>

                </span>

                ₹ Delivery charges applicable beyond 3km
              </div>


              <div className="flex items-center gap-3 text-sm text-gray-700">
                <span className="text-green-600">

                  {/* Trust Icon */}
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                  </svg>

                </span>

                Trusted Local Store in Sarsawa
              </div>

            </div>



            {/* Size Selector */}
            <div>
              <p className="font-semibold mb-3 text-lg">Select Size:</p>
              <div className="flex gap-3 flex-wrap">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-5 py-2 rounded-lg border transition duration-300
                      ${
                        selectedSize === size
                          ? "bg-primary text-white border-primary"
                          : "bg-white text-gray-700 border-gray-300 hover:border-primary"
                      }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selector */}
            {/* <div>
              <p className="font-semibold mb-3 text-lg">Select Color:</p>
              <div className="flex gap-3 flex-wrap">
                {colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-5 py-2 rounded-lg border transition duration-300
                      ${
                        selectedColor === color
                          ? "bg-primary text-white border-primary"
                          : "bg-white text-gray-700 border-gray-300 hover:border-primary"
                      }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div> */}

            {/* Quantity */}
            <div>
              <p className="font-semibold mb-2">Quantity:</p>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="border px-4 py-2 rounded-lg w-24"
              />
            </div>

            {/* WhatsApp Button */}
            <button
              onClick={handleWhatsAppOrder}
              className="w-full md:w-auto bg-[#8B1E2D] hover:bg-[#741826] text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Order on WhatsApp
            </button>

          </div>
        </div>

        {/* Related Products */}
        <div className="mt-20">
          <h2 className="text-2xl font-bold mb-8 text-primary">
            You May Also Like
          </h2>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((item) => {
              const itemFinal = Math.round(item.price * 0.48);
              const itemSaved = item.price - itemFinal;

              return (
                <div
                  key={item.id}
                  onClick={() => navigate(`/product/${item.id}`)}
                  className="bg-white rounded-2xl shadow-md p-4 cursor-pointer hover:shadow-xl hover:-translate-y-1 transition"
                >
                  <img
                    src={item.images?.[0]?.image_url}
                    alt={item.name}
                    className="w-full h-[200px] object-cover rounded-xl"
                  />

                  <h5 className="text-gray-400 text-xs mt-2">
                    DEEP FASHION
                  </h5>

                  <h3 className="mt-2 text-sm font-medium text-[#3E2C1C]">
                    {item.name}
                  </h3>

                  <div className="mt-2">
                    <div className="flex items-center gap-3">
                      <span className="text-lg font-semibold text-[#3E2C1C]">
                        ₹{itemFinal}
                      </span>

                      <span className="text-gray-400 line-through text-sm">
                        ₹{item.price}
                      </span>
                    </div>

                    <p className="text-green-600 text-sm font-medium mt-1">
                      Save ₹{itemSaved}
                    </p>
                  </div>
                </div>
              );
            })}            
          </div>

          <div className="text-center mt-10">
            <button
              onClick={() => navigate("/products")}
              className="bg-primary text-white px-8 py-3 rounded-full hover:bg-secondary transition"
            >
              View All Products
            </button>
          </div>
        </div>

      </Container>
    </section>
  );
}
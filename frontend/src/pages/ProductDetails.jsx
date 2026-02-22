import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Container from "../components/common/Container";
import { getProductById } from "../services/productService";

export default function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);

  // Temporary static options (since backend doesn't store these yet)
  const sizes = ["S", "M", "L", "XL"];
  const colors = ["Maroon", "Purple", "Red"];

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const data = await getProductById(id);
      setProduct(data);
      setSelectedImage(data.images?.[0]?.image_url || "");
    
    }
      catch (error) {
      console.error(error);
      alert("Something went wrong");
    }



  };

  if (!product) {
    return <div className="p-10 text-center">Loading...</div>;
  }

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
        <div className="grid md:grid-cols-2 gap-10">

          {/* Image Section */}
          <div>
            {selectedImage && (
              <img
                src={selectedImage}
                alt={product.name}
                className="rounded-2xl shadow-lg w-full"
              />
            )}

            <div className="flex gap-3 mt-4">
              {product.images?.map((img, index) => (
                <img
                  key={index}
                  src={img.image_url}
                  alt="thumbnail"
                  onClick={() => setSelectedImage(img.image_url)}
                  className="w-20 h-20 object-cover rounded-lg cursor-pointer border"
                />
              ))}
            </div>
          </div>

          {/* Details Section */}
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-primary">
              {product.name}
            </h1>

            <p className="text-xl font-semibold text-primary">
              ₹ {product.price}
            </p>

            <p>{product.description}</p>

            {/* Size Selector */}
            <div>
              <p className="font-semibold mb-2">Select Size:</p>
              <div className="flex gap-3">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border rounded-lg ${
                      selectedSize === size
                        ? "bg-primary text-white"
                        : ""
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selector */}
            <div>
              <p className="font-semibold mb-2">Select Color:</p>
              <div className="flex gap-3">
                {colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 border rounded-lg ${
                      selectedColor === color
                        ? "bg-primary text-white"
                        : ""
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <p className="font-semibold mb-2">Quantity:</p>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="border px-3 py-2 rounded-lg w-24"
              />
            </div>

            {/* WhatsApp Button */}
            <button
              onClick={handleWhatsAppOrder}
              className="bg-primary text-white px-6 py-3 rounded-full shadow-lg hover:bg-secondary transition"
            >
              Order on WhatsApp
            </button>
          </div>

        </div>
      </Container>
    </section>
  );
}

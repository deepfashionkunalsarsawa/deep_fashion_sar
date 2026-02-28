// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import Container from "../components/common/Container";
// import { getProductById, getProducts } from "../services/productService";

// export default function ProductDetails() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [product, setProduct] = useState(null);
//   const [relatedProducts, setRelatedProducts] = useState([]);
//   const [selectedImage, setSelectedImage] = useState("");
//   const [selectedSize, setSelectedSize] = useState("");
//   const [selectedColor, setSelectedColor] = useState("");
//   const [quantity, setQuantity] = useState(1);

//   const sizes = ["M", "L", "XL", "XXL"];
//   const colors = ["Maroon", "Purple", "Red"];

//   useEffect(() => {
//     fetchProduct();
//     fetchRelatedProducts();
//   }, []);

//   const fetchProduct = async () => {
//     try {
//       const data = await getProductById(id);
//       setProduct(data);
//       setSelectedImage(data.images?.[0]?.image_url || "");
//     } catch (error) {
//       console.error(error);
//       alert("Something went wrong");
//     }
//   };

//   const fetchRelatedProducts = async () => {
//     try {
//       const data = await getProducts();
//       setRelatedProducts(data.slice(0, 8));
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   if (!product) {
//     return <div className="p-10 text-center">Loading...</div>;
//   }

//   // Discount Logic (+400 fake MRP)
//   const originalPrice = product.price + 400;
//   const discountPercent = Math.round(
//     ((originalPrice - product.price) / originalPrice) * 100
//   );

//   const handleWhatsAppOrder = () => {
//     const message = `
// I want to order:
// Product: ${product.name}
// Size: ${selectedSize || "Not Selected"}
// Color: ${selectedColor || "Not Selected"}
// Quantity: ${quantity}
// Price: ₹${product.price}
// `;

//     const whatsappURL = `https://wa.me/919557201975?text=${encodeURIComponent(
//       message
//     )}`;

//     window.open(whatsappURL, "_blank");
//   };

//   return (
//     <section className="py-16 bg-soft min-h-screen">
//       <Container>
//         <div className="grid md:grid-cols-2 gap-12">

//           {/* Image Section */}
//           <div>
//             {selectedImage && (
//               <img
//                 src={selectedImage}
//                 alt={product.name}
//                 className="rounded-2xl shadow-lg w-full"
//               />
//             )}

//             <div className="flex gap-3 mt-4">
//               {product.images?.map((img, index) => (
//                 <img
//                   key={index}
//                   src={img.image_url}
//                   alt="thumbnail"
//                   onClick={() => setSelectedImage(img.image_url)}
//                   className="w-20 h-20 object-cover rounded-lg cursor-pointer border hover:border-primary"
//                 />
//               ))}
//             </div>
//           </div>

//           {/* Details Section */}
//           <div className="space-y-6">

//             <h1 className="text-3xl font-bold text-primary">
//               {product.name}
//             </h1>

//             {/* Price Section with Discount */}
//             <div>
//               <div className="flex items-center gap-4">
//                 <span className="text-2xl font-bold text-primary">
//                   ₹{product.price}
//                 </span>

//                 <span className="text-gray-400 line-through text-lg">
//                   ₹{originalPrice}
//                 </span>

//                 <span className="text-green-600 font-semibold text-sm">
//                   {discountPercent}% OFF
//                 </span>
//               </div>

//               <p className="text-green-600 text-sm mt-1">
//                 Save ₹400
//               </p>
//             </div>

//             <p className="text-gray-600">{product.description}</p>

//             {/* Size Selector */}
//             <div>
//               <p className="font-semibold mb-3 text-lg">Select Size:</p>
//               <div className="flex gap-3 flex-wrap">
//                 {sizes.map((size) => (
//                   <button
//                     key={size}
//                     onClick={() => setSelectedSize(size)}
//                     className={`
//                       px-5 py-2 rounded-lg border transition duration-300
//                       ${
//                         selectedSize === size
//                           ? "bg-primary text-white border-primary"
//                           : "bg-white text-gray-700 border-gray-300 hover:border-primary"
//                       }
//                     `}
//                   >
//                     {size}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Color Selector */}
//             <div>
//               <p className="font-semibold mb-3 text-lg">Select Color:</p>
//               <div className="flex gap-3 flex-wrap">
//                 {colors.map((color) => (
//                   <button
//                     key={color}
//                     onClick={() => setSelectedColor(color)}
//                     className={`
//                       px-5 py-2 rounded-lg border transition duration-300
//                       ${
//                         selectedColor === color
//                           ? "bg-primary text-white border-primary"
//                           : "bg-white text-gray-700 border-gray-300 hover:border-primary"
//                       }
//                     `}
//                   >
//                     {color}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Quantity */}
//             <div>
//               <p className="font-semibold mb-2">Quantity:</p>
//               <input
//                 type="number"
//                 min="1"
//                 value={quantity}
//                 onChange={(e) => setQuantity(e.target.value)}
//                 className="border px-4 py-2 rounded-lg w-24"
//               />
//             </div>

//             {/* WhatsApp Button */}
//             <button
//               onClick={handleWhatsAppOrder}
//               className="
//                 w-full md:w-auto
//                 bg-[#8B1E2D]
//                 hover:bg-[#741826]
//                 text-white
//                 font-semibold
//                 py-3 px-8
//                 rounded-full
//                 shadow-lg
//                 hover:shadow-xl
//                 transition-all duration-300
//               "
//             >
//               Order on WhatsApp
//             </button>

//           </div>
//         </div>

//         {/* Related Products */}
//         <div className="mt-20">
//           <h2 className="text-2xl font-bold mb-8 text-primary">
//             You May Also Like
//           </h2>

//           <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
//             {relatedProducts.slice(0, 8).map((item) => (
//               <div
//                 key={item.id}
//                 onClick={() => navigate(`/product/${item.id}`)}
//                 className="bg-white rounded-2xl shadow-md p-4 cursor-pointer hover:shadow-xl hover:-translate-y-1 transition"
//               >
//                 <img
//                   src={item.images?.[0]?.image_url}
//                   alt={item.name}
//                   className="w-full h-[200px] object-cover rounded-xl"
//                 />
//                 <h5 className="text-gray-400 font-light text-bold text-xs" >DEEP FASHION</h5>

//                 <h3 className="mt-3 text-sm font-medium text-[#3E2C1C]">
//                   {item.name}
//                 </h3>

                

//                 <div className="mt-2">
//                   <div className="flex items-center gap-3">
//                     <span className="text-lg font-semibold text-[#3E2C1C]">
//                       ₹{product.price}
//                     </span>

//                     <span className="text-gray-400 line-through text-sm">
//                       ₹{product.price + 400}
//                     </span>
//                   </div>

//                   <p className="text-green-600 text-sm font-medium mt-1">
//                     Save ₹400
//                   </p>
//                 </div>

                
//               </div>
//             ))}
//           </div>

//           <div className="text-center mt-10">
//             <button
//               onClick={() => navigate("/products")}
//               className="bg-primary text-white px-8 py-3 rounded-full hover:bg-secondary transition"
//             >
//               View All Products
//             </button>
//           </div>
//         </div>

//       </Container>
//     </section>
//   );
// }

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
    fetchProduct();
    fetchRelatedProducts();
  }, [id]); // important for image refresh

  const fetchProduct = async () => {
    try {
      const data = await getProductById(id);
      setProduct(data);

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

  const fetchRelatedProducts = async () => {
    try {
      const data = await getProducts();
      setRelatedProducts(data.slice(0, 8));
    } catch (error) {
      console.error(error);
    }
  };

  if (!product) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  const originalPrice = product.price + 400;
  const discountPercent = Math.round(
    ((originalPrice - product.price) / originalPrice) * 100
  );

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
                  ₹{product.price}
                </span>

                <span className="text-gray-400 line-through text-lg">
                  ₹{originalPrice}
                </span>

                <span className="text-green-600 font-semibold text-sm">
                  {discountPercent}% OFF
                </span>
              </div>

              <p className="text-green-600 text-sm mt-1">
                Save ₹400
              </p>
            </div>

            <p className="text-gray-600">{product.description}</p>

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
            <div>
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
            </div>

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
            {relatedProducts.map((item) => (
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
                      ₹{item.price}
                    </span>

                    <span className="text-gray-400 line-through text-sm">
                      ₹{item.price + 400}
                    </span>
                  </div>

                  <p className="text-green-600 text-sm font-medium mt-1">
                    Save ₹400
                  </p>
                </div>

              </div>
            ))}
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
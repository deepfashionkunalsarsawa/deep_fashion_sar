import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition">    
      <img
        src={product.images?.[0]?.image_url}
        alt={product.name}
        className="w-full h-64 object-cover"
      />
      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-lg">{product.name}</h3>

        <p className="text-primary font-bold">₹ {product.price.toLocaleString("en-IN")}</p>

        <Link
          to={`/product/${product.id}`}
          className="block bg-primary text-white text-center py-2 rounded-lg mt-3 hover:bg-secondary transition"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}


import { useEffect, useState } from "react";
import { getCart, removeFromCart, updateQuantity } from "../utils/cart";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setCart(getCart());
  }, []);

  const refreshCart = () => {
    setCart(getCart());
  };

  const getTotal = () => {
    return cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const handleWhatsAppOrder = () => {
    const baseURL = window.location.origin; // ✅ ADD THIS

    let message = "I want to order:\n\n";

    cart.forEach((item, i) => {
      message += `${i + 1}. ${item.name}
  Size: ${item.size}
  Qty: ${item.quantity}
  Price: ₹${item.price}
  Link: ${baseURL}/product/${item.id}

  `;
    });

    message += `Total: ₹${getTotal()}`;

    window.open(
      `https://wa.me/919557201975?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  return (
    <div className="p-6 min-h-screen">
      
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-sm text-gray-600 hover:text-black flex items-center gap-1"
      >
        ← Back
      </button>

      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
      {cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <>
          {cart.map((item, index) => (
            <div
              key={index}
              className="flex gap-4 mb-4 border p-4 rounded-lg"
            >
              <img
                src={item.image}
                onClick={() => navigate(`/product/${item.id}`)}
                className="w-24 h-24 object-cover rounded cursor-pointer"
              />

              <div 
                className="flex-1 cursor-pointer"
                onClick={() => navigate(`/product/${item.id}`)}
              >
                <h3 className="font-semibold">{item.name}</h3>
                <p>Size: {item.size}</p>

                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => {
                    updateQuantity(index, Number(e.target.value));
                    refreshCart();
                  }}
                  className="border w-16 mt-2"
                />

                <p className="mt-2">₹{item.price}</p>
              </div>

              <button
                onClick={() => {
                  removeFromCart(index);
                  refreshCart();
                }}
                className="text-red-500"
              >
                Remove
              </button>
            </div>
          ))}

          <h2 className="text-xl font-bold mt-4">
            Total: ₹{getTotal()}
          </h2>

          <button
            onClick={handleWhatsAppOrder}
            className="mt-4 bg-green-600 text-white px-6 py-3 rounded"
          >
            Order on WhatsApp
          </button>
        </>
      )}
    </div>
  );
}
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCart, removeFromCart } from "../../utils/cart";


export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const location = useLocation();
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  // Auto close when route changes
  useEffect(() => {
    setMenuOpen(false);
    setShopOpen(false);
  }, [location]);

  // Swipe to close
  let startX = 0;

  const handleTouchStart = (e) => {
    startX = e.touches[0].clientX;
  };
  const refreshCart = () => {
    const cart = getCart();
    setCartItems(cart);
    setCartCount(cart.length);
  };
  useEffect(() => {
    refreshCart();

    window.addEventListener("storage", refreshCart);

    return () => window.removeEventListener("storage", refreshCart);
  }, []);

  const handleTouchEnd = (e) => {
    const endX = e.changedTouches[0].clientX;

    if (startX - endX > 80) {
      setMenuOpen(false);
    }
  };
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const updateCart = () => {
      const cart = getCart();
      setCartCount(cart.length);
    };

    updateCart();
    window.addEventListener("storage", updateCart);

    return () => window.removeEventListener("storage", updateCart);
  }, []);

  useEffect(() => {
    const updateCart = () => {
      const cart = getCart();
      setCartItems(cart);
      setCartCount(cart.length);
    };

    updateCart();
    window.addEventListener("storage", updateCart);

    return () => window.removeEventListener("storage", updateCart);
  }, []);

  return (
    <nav className="bg-[#F9F6EF] border-b border-[#e6dcc8]">

      {/* Top Bar */}
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between relative">

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl text-[#3E2C1C]"
          onClick={() => setMenuOpen(true)}
        >
          ☰
        </button>

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center justify-center md:justify-start gap-3 flex-1"
        >
          <img
            src="/logo.png"
            alt="Deep Fashion Logo"
            className="h-8 md:h-10 object-contain"
          />

          <span className="font-serif text-lg md:text-2xl tracking-widest bg-gradient-to-r from-[#D4AF37] to-[#b88a2b] bg-clip-text text-transparent">
            DEEP FASHION SARSAWA
          </span>
        </Link>
        {/* <Link to="/cart" className="block hover:text-[#C4A24B] md:hidden">
          🛒
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 rounded-full">
              {cartCount}
            </span>
          )}
        </Link> */}

        <button
          onClick={() => setCartOpen(true)}
          className="relative md:hidden text-xl"
        >
          🛒
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 rounded-full">
              {cartCount}
            </span>
          )}
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 text-[#3E2C1C] font-medium">
          <Link to="/" className="hover:text-[#C4A24B] transition">
            Home
          </Link>

          <Link to="/products" className="hover:text-[#C4A24B] transition">
            Shop
          </Link>

          <Link to="/about" className="hover:text-[#C4A24B] transition">
            About
          </Link>

          <Link to="/contact" className="hover:text-[#C4A24B] transition">
            Contact
          </Link>

          <Link to="/cart" className="block hover:text-[#C4A24B]">
            🛒
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 rounded-full">
                {cartCount}
              </span>
            )}
          </Link>

        </div>
      </div>

      {/* Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className={`fixed top-0 left-0 h-full w-72 bg-[#F9F6EF] text-[#3E2C1C] shadow-xl z-50
        transform transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
        ${menuOpen ? "translate-x-0" : "-translate-x-full"} md:hidden`}
      >

        {/* Sidebar Header */}
        <div className="flex justify-between items-center p-5 border-b border-[#e6dcc8]">

          <span className="font-serif text-lg tracking-widest text-[#C4A24B]">
            DEEP FASHION
          </span>

          <button
            onClick={() => setMenuOpen(false)}
            className="text-2xl hover:text-[#C4A24B]"
          >
            ✕
          </button>
        </div>

        {/* Menu Items */}
        <div className="p-6 space-y-6 text-lg">

          <Link
            to="/"
            className="block hover:text-[#C4A24B]"
          >
            Home
          </Link>

          {/* Shop Dropdown */}
          <div>

            <button
              onClick={() => setShopOpen(!shopOpen)}
              className="flex justify-between w-full hover:text-[#C4A24B]"
            >
              Shop
              <span>{shopOpen ? "−" : "+"}</span>
            </button>

          

            {shopOpen && (
              <div className="mt-3 ml-4 space-y-3 text-base text-[#5a4630]">

                <Link 
                  to="/products?category=Designer Suits" 
                  className="block hover:text-[#C4A24B]"
                >
                  Designer Suits
                </Link>

                <Link 
                  to="/products?category=Sarees" 
                  className="block hover:text-[#C4A24B]"
                >
                  Sarees
                </Link>

                <Link 
                  to="/products?category=Unstitched Suits" 
                  className="block hover:text-[#C4A24B]"
                >
                  Unstitched Suits
                </Link>

                <Link 
                  to="/products?category=Lehenga" 
                  className="block hover:text-[#C4A24B]"
                >
                  Lehenga
                </Link>

                <Link 
                  to="/products?category=Party Wear" 
                  className="block hover:text-[#C4A24B]"
                >
                  Party Wear
                </Link>


              </div>
            )}



          </div>
          <Link to="/cart" className="block hover:text-[#C4A24B]">
            Cart 🛒
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 rounded-full">
                {cartCount}
              </span>
            )}
          </Link>
          <Link
            to="/about"
            className="block hover:text-[#C4A24B]"
          >
            About
          </Link>

          <Link
            to="/contact"
            className="block hover:text-[#C4A24B]"
          >
            Contact
          </Link>

        </div>

      </div>
      {/* Menu Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* ✅ Cart Overlay (ADD HERE) */}
      {cartOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          onClick={() => setCartOpen(false)}
        />
      )}
      {/* ✅ Cart Sidebar (RIGHT SIDE) */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white z-50 shadow-xl
        transform transition-transform duration-300
        ${cartOpen ? "translate-x-0" : "translate-x-full"}`}
      >

        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="font-semibold text-lg">Your Cart</h2>
          <button onClick={() => setCartOpen(false)}>✕</button>
        </div>

        {/* Content */}
        <div className="p-4">
          {cartItems.length === 0 ? (
            <p className="text-gray-500">Cart is empty</p>
          ) : (
            <>
              {/* Show only 3 items */}
              {cartItems.slice(0, 3).map((item, index) => (
                <div key={index} className="flex gap-3 mb-4 border-b pb-3">

                  <img
                    src={item.image}
                    className="w-14 h-14 object-cover rounded"
                  />

                  <div className="flex-1">
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-xs text-gray-500">
                      Qty: {item.quantity}
                    </p>
                    <p className="text-sm font-semibold">
                      ₹{item.price}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      removeFromCart(index);
                      refreshCart();
                    }}
                    className="text-red-500 text-sm hover:scale-110 transition"
                  >
                    ✕
                  </button>
                </div>
              ))}

              {/* If more items */}
              {cartItems.length > 3 && (
                <p className="text-xs text-gray-500 mb-3">
                  +{cartItems.length - 3} more items
                </p>
              )}

              {/* Total */}
              <div className="mt-4 border-t pt-3 font-semibold">
                Total: ₹
                {cartItems.reduce(
                  (total, item) => total + item.price * item.quantity,
                  0
                )}
              </div>

              {/* Buttons */}
              <div className="mt-4 flex flex-col gap-2">

                <button
                  onClick={() => {
                    setCartOpen(false);
                    navigate("/cart");
                  }}
                  className="bg-black text-white py-2 rounded-lg"
                >
                  View Full Cart
                </button>

                <button
                  onClick={() => {
                    setCartOpen(false);
                    navigate("/cart");
                  }}
                  className="bg-green-600 text-white py-2 rounded-lg"
                >
                  Checkout on WhatsApp
                </button>

              </div>
            </>
          )}
        </div>

      </div>



    </nav>
  );
}
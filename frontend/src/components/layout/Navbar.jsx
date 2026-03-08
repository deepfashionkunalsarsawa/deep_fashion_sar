// import { Link } from "react-router-dom";
// import { useState } from "react";

// export default function Navbar() {
//   const [menuOpen, setMenuOpen] = useState(false);

//   return (
//     <nav className="bg-[#F9F6EF] border-b border-[#e6dcc8]">

//       {/* Top Bar */}
      
//       <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between relative">

//         {/* Mobile Menu Button */}
//         <button
//           className="md:hidden text-[#3E2C1C]"
//           onClick={() => setMenuOpen(!menuOpen)}
//         >
//           ☰
//         </button>

//         {/* Logo Centered */}
        
//         <Link
//           to="/"
//           className="flex items-center justify-center md:justify-start gap-3 flex-1"
//         >
//           {/* Logo Image */}
//           <img
//             src="/logo.png"
//             alt="Deep Fashion Logo"
//             className="h-8 md:h-10 object-contain"
//           />

//           {/* Brand Name */}
//           <span className="font-serif text-lg md:text-2xl tracking-widest bg-gradient-to-r from-[#D4AF37] to-[#b88a2b] bg-clip-text text-transparent">
//             DEEP FASHION SARSAWA
//           </span>
//         </Link>
//         {/* Desktop Menu */}
//         <div className="hidden md:flex space-x-8 text-[#3E2C1C] font-medium">
//           <Link to="/" className="hover:text-[#C4A24B] transition">
//             Home
//           </Link>
//           <Link to="/products" className="hover:text-[#C4A24B] transition">
//             Shop
//           </Link>
//           <Link to="/about" className="hover:text-[#C4A24B] transition">
//             About
//           </Link>
//           <Link to="/contact" className="hover:text-[#C4A24B] transition">
//             Contact
//           </Link>
//         </div>

//       </div>

//       {/* Mobile Dropdown Menu */}
//       {/* {menuOpen && (
//         <div className="md:hidden px-6 pb-4 space-y-4 bg-[#F9F6EF] text-[#3E2C1C] font-medium">
//           <Link to="/" onClick={() => setMenuOpen(false)} className="block">
//             Home
//           </Link>
//           <Link to="/products" onClick={() => setMenuOpen(false)} className="block">
//             Shop
//           </Link>
//           <Link to="/about" onClick={() => setMenuOpen(false)} className="block">
//             About
//           </Link>
//           <Link to="/contact" onClick={() => setMenuOpen(false)} className="block">
//             Contact
//           </Link>
//         </div>
//       )} */}
//       <div
//         className={`fixed top-0 left-0 h-full w-64 bg-[#F9F6EF] text-[#3E2C1C] font-medium transform transition-transform duration-300 ease-in-out
//         ${menuOpen ? "translate-x-0" : "-translate-x-full"} md:hidden`}
//       >
//         <div className="p-6 space-y-4">
//           <Link to="/" onClick={() => setMenuOpen(false)} className="block">
//             Home
//           </Link>

//           <Link to="/products" onClick={() => setMenuOpen(false)} className="block">
//             Shop
//           </Link>

//           <Link to="/about" onClick={() => setMenuOpen(false)} className="block">
//             About
//           </Link>

//           <Link to="/contact" onClick={() => setMenuOpen(false)} className="block">
//             Contact
//           </Link>
//         </div>
//       </div>
//     </nav>
//   );
// }

import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const location = useLocation();

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

  const handleTouchEnd = (e) => {
    const endX = e.changedTouches[0].clientX;

    if (startX - endX > 80) {
      setMenuOpen(false);
    }
  };

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

    </nav>
  );
}
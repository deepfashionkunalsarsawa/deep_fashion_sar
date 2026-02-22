import { Link } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-[#F9F6EF] border-b border-[#e6dcc8]">

      {/* Top Bar */}
      
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between relative">

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-[#3E2C1C]"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        {/* Logo Centered */}
        
        <Link
          to="/"
          className="flex items-center justify-center md:justify-start gap-3 flex-1"
        >
          {/* Logo Image */}
          <img
            src="/logo.png"
            alt="Deep Fashion Logo"
            className="h-8 md:h-10 object-contain"
          />

          {/* Brand Name */}
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

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden px-6 pb-4 space-y-4 bg-[#F9F6EF] text-[#3E2C1C] font-medium">
          <Link to="/" onClick={() => setMenuOpen(false)} className="block">
            Home
          </Link>
          <Link to="/products" onClick={() => setMenuOpen(false)} className="block">
            Shop
          </Link>
          <Link to="/about" onClick={() => setMenuOpen(false)} className="block">
            About
          </Link>
          <Link to="/contact" onClick={() => setMenuOpen(false)} className="block">
            Contact
          </Link>
        </div>
      )}

    </nav>
  );
}
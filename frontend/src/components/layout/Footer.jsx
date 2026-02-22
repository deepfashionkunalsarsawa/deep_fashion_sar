import { Link } from "react-router-dom";

export default function Footer() {
  return (

    <footer className="bg-primary text-white mt-16 py-12">
      <div className="max-w-7xl mx-auto px-6">

        {/* Brand Centered */}
        <div className="text-center mb-10">
          <h2 className="text-2xl font-serif font-semibold">
            Deep Fashion Sarsawa
          </h2>
          <p className="text-sm mt-3 max-w-md mx-auto">
            Elegant ethnic wear crafted for weddings,
            festivals, and special occasions.
          </p>
        </div>

        {/* Links Section */}
        <div className="grid grid-cols-2 gap-10 max-w-md mx-auto">

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-3">Quick Links</h3>
            <div className="flex flex-col gap-2 text-sm">
              <Link to="/">Home</Link>
              <Link to="/products">Shop</Link>
              <Link to="/about">About</Link>
              <Link to="/contact">Contact</Link>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-3">Legal</h3>
            <div className="flex flex-col gap-2 text-sm">
              <Link to="/privacy">Privacy Policy</Link>
              <Link to="/terms">Terms & Conditions</Link>
              <Link to="/refund">Refund Policy</Link>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="text-center text-sm mt-10 opacity-80">
          © {new Date().getFullYear()} Deep Fashion Sarsawa. All rights reserved.
        </div>

      </div>
    </footer>
  );
}

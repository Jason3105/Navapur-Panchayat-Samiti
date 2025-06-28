/* src/components/Header.tsx
   -------------------------------------------------------------- */
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import GoogleTranslator from "@/components/GoogleTranslator"; // ⬅️ translator modal

const Header = () => {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  const links = [
    { name: "Home",       href: "/" },
    { name: "Schemes",    href: "/schemes" },
    { name: "Services",   href: "/services" },
    { name: "About Us",   href: "/about" },
    { name: "Our Team",   href: "/team" },
    { name: "Gallery",    href: "/gallery" },
    { name: "Contact Us", href: "/contact" }
  ];

  const NavLinks = ({ onClick }: { onClick?: () => void }) => (
    <>
      {links.map((l) => (
        <Link
          key={l.name}
          to={l.href}
          onClick={onClick}
          className="font-medium text-gray-700 hover:text-blue-600 transition-colors"
        >
          {l.name}
        </Link>
      ))}
    </>
  );

  return (
    <header className="sticky top-0 z-50 bg-white shadow-lg">
      {/* --- Thin GoI banner ------------------------------------------- */}
      <div className="bg-orange-500 py-2 text-center text-sm text-white">
        Government of India&nbsp;|&nbsp;Government of Maharashtra
      </div>

      {/* --- Main header row ------------------------------------------- */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          {/* Logo & title */}
          <div className="flex items-center space-x-4">
            <img
              src="/logo.png"
              alt="India Flag"
              className="h-12 w-18"
            />
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                Panchayat Samiti Navapur
              </h1>
              <p className="text-sm text-gray-600">Nandurbar, Maharashtra</p>
            </div>
          </div>

          {/* Desktop nav */}
          <nav className="hidden items-center space-x-8 lg:flex">
            <NavLinks />
            {/* Translator dropdown button */}
            <GoogleTranslator />
          </nav>

          {/* Mobile menu toggle */}
          <Button
            variant="outline"
            size="sm"
            className="lg:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Toggle navigation"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile nav panel */}
        {open && (
          <div className="border-t py-4 lg:hidden">
            <nav className="flex flex-col space-y-4">
              <NavLinks onClick={() => setOpen(false)} />
              <div className="border-t pt-4">
                <GoogleTranslator />
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

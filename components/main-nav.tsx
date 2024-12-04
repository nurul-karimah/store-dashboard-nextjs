"use client";

import { cn } from "@/lib/utils";
import { Category } from "@/types";
import { Heart, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface MainNavProps {
  data: Category[];
}

const MainNav: React.FC<MainNavProps> = ({ data }) => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const routes = data.map((route) => ({
    href: `/category/${route.id}`,
    label: route.name,
    active: pathname === `/category/${route.id}`,
  }));

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="mx-6 flex items-center lg:justify-between justify-end w-full">
      <div className="flex lg:hidden items-center space-x-4 lg:space-x-6">

        {/* Hamburger button for mobile */}
        <button
          className="lg:hidden text-gray-600"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Dropdown menu for mobile */}
        {isMenuOpen && (
          <div className="lg:hidden flex flex-col absolute top-12 right-16 z-50 bg-white shadow-md p-8">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "text-base font-medium transition-colors hover:text-black",
                  route.active ? "text-black" : "text-neutral-500"
                )}
              >
                {route.label}
              </Link>
            ))}
            <Link
              href="/favorite"
              className="text-base flex font-medium transition-colors hover:text-black"
            >
              Favorites
              {/* <Heart size={15} /> */}
            </Link>
          </div>
        )}
        </div>

        {/* Links for desktop */}
        <div className="hidden lg:flex space-x-4">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-black",
                route.active ? "text-black" : "text-neutral-500"
              )}
            >
              {route.label}
            </Link>
          ))}
      </div>

        {/* Favorite link */}
        <Link
          href="/favorite"
          className="text-sm lg:flex hidden font-medium transition-colors hover:text-black"
        >
          Favorites
          <Heart size={15} />
        </Link>
    </nav>
  );
};

export default MainNav;

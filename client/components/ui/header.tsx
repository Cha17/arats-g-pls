"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import Background from "./background";
import { AuthButtons } from "../auth/auth-buttons";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
      <nav className="container mx-auto px-4 py-4">
        <Background />
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <Image
              src="/G!.png"
              alt="G-ARATS Logo"
              width={50}
              height={50}
              className="cursor-pointer hover:opacity-80 transition-opacity"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/events" className="text-gray-900 hover:text-blue-800">
              Events
            </Link>
            <Link href="/about" className="text-gray-900 hover:text-blue-800">
              About
            </Link>
            <Link href="/contact" className="text-gray-900 hover:text-blue-800">
              Contact
            </Link>

            <AuthButtons />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <i
              className={`fas ${isMobileMenuOpen ? "fa-times" : "fa-bars"}`}
            ></i>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-4">
              <Link
                href="/events"
                className="text-gray-700 hover:text-blue-600 py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Events
              </Link>
              <Link
                href="/about"
                className="text-gray-700 hover:text-blue-600 py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-gray-700 hover:text-blue-600 py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <div className="space-y-3">
                <AuthButtons />
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;

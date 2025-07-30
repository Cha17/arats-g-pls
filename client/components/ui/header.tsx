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

            <LoginLink className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-950 hover:bg-pink-300 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">
              Sign In
            </LoginLink>
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
                {/* <AuthButtons /> */}
                <LoginLink className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">
                  Sign Innnn
                </LoginLink>
              </div>
              <LoginLink className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">
                Sign Innnn
              </LoginLink>
              <Link
                href="/login"
                className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 inline-block text-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Login
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;

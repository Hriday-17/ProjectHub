"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { X, Search } from "lucide-react"
import { motion } from "framer-motion"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isMounted, setIsMounted] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  // Set mounted state when component mounts
  useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [])

  useEffect(() => {
    // Only run this effect on the client side
    if (typeof window === 'undefined') return;
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      // Only hide navbar when scrolling down and past a certain threshold
      if (currentScrollY > 100 && currentScrollY > lastScrollY) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [lastScrollY])

  // Close menu when pressing escape key
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleEscKey);
    
    return () => {
      window.removeEventListener('keydown', handleEscKey);
    };
  }, [isMenuOpen]);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (typeof window === 'undefined' || !isMounted) return;
    
    try {
      if (isMenuOpen) {
        document.body.classList.add('overflow-hidden');
      } else {
        document.body.classList.remove('overflow-hidden');
      }
      
      return () => {
        document.body.classList.remove('overflow-hidden');
      };
    } catch (error) {
      console.error("Error manipulating body class:", error);
    }
  }, [isMenuOpen, isMounted]);

  // Early return if not mounted to prevent hydration issues
  if (!isMounted) {
    return (
      <>
        <header className="fixed top-0 left-0 right-0 z-50 w-full shadow-md">
          <div className="bg-[#1e3a3a] text-white">
            <div className="container mx-auto px-4 flex items-center justify-between h-16">
              <div className="flex items-center">
                <Link href="/" className="font-bold text-xl">
                  <div className="flex items-center">
                    <span className="mr-1">Project</span>
                    <span className="text-[#6b3e7c]">Hub</span>
                  </div>
                </Link>
              </div>
              <div className="flex items-center">
                <div className="relative mr-4 hidden sm:block">
                  <div className="bg-[#253c3c] rounded-full flex items-center">
                    <Input 
                      placeholder="Search..." 
                      className="bg-transparent border-none focus:ring-0 focus:border-transparent pl-10 pr-4 py-2 text-white h-9 rounded-full w-32 md:w-44 lg:w-64" 
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  </div>
                </div>
                <Button
                  variant="ghost"
                  className="sm:hidden rounded-full h-9 w-9 mr-2 bg-[#253c3c] hover:bg-[#2e4747] p-0 flex items-center justify-center"
                  aria-label="Search"
                >
                  <Search className="text-gray-400 h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  className="h-16 px-6 text-white rounded-none bg-[#6b3e7c] hover:bg-[#5a2e6b]"
                  aria-label="Menu"
                >
                  <span className="mr-2">Menu</span>
                  <div className="space-y-1">
                    <div className="w-5 h-0.5 bg-white"></div>
                    <div className="w-5 h-0.5 bg-white"></div>
                    <div className="w-5 h-0.5 bg-white"></div>
                  </div>
                </Button>
              </div>
            </div>
          </div>
        </header>
        <div className="h-16"></div>
      </>
    );
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 w-full shadow-md">
        {/* Top Dark Header */}
        <div className="bg-[#1e3a3a] text-white">
          <div className="container mx-auto px-4 flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="font-bold text-xl">
                <div className="flex items-center">
                  <span className="mr-1">Project</span>
                  <span className="text-[#6b3e7c]">Hub</span>
                </div>
              </Link>
            </div>

            {/* Search and Menu */}
            <div className="flex items-center">
              {/* Search */}
              <div className="relative mr-4 hidden sm:block">
                <div className="bg-[#253c3c] rounded-full flex items-center">
                  <Input 
                    placeholder="Search..." 
                    className="bg-transparent border-none focus:ring-0 focus:border-transparent pl-10 pr-4 py-2 text-white h-9 rounded-full w-32 md:w-44 lg:w-64" 
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                </div>
              </div>

              {/* Mobile Search Button */}
              <Button
                variant="ghost"
                className="sm:hidden rounded-full h-9 w-9 mr-2 bg-[#253c3c] hover:bg-[#2e4747] p-0 flex items-center justify-center"
                aria-label="Search"
              >
                <Search className="text-gray-400 h-4 w-4" />
              </Button>

              {/* Menu Button */}
              <Button
                variant="ghost"
                className={`h-16 px-6 text-white rounded-none ${isMenuOpen ? 'bg-[#6b3e7c]' : 'bg-[#6b3e7c] hover:bg-[#5a2e6b]'}`}
                onClick={toggleMenu}
                aria-expanded={isMenuOpen}
                aria-label="Menu"
              >
                <span className="mr-2">Menu</span>
                {isMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <div className="space-y-1">
                    <div className="w-5 h-0.5 bg-white"></div>
                    <div className="w-5 h-0.5 bg-white"></div>
                    <div className="w-5 h-0.5 bg-white"></div>
                  </div>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Expanded Menu */}
        {isMenuOpen && (
          <div className="bg-[#6b3e7c] text-white">
            <div className="container mx-auto px-4 py-6">
              <div className="flex flex-col md:flex-row md:space-x-8 space-y-4 md:space-y-0">
                <NavLink href="/" onClick={toggleMenu}>Home</NavLink>
                <NavLink href="/about" onClick={toggleMenu}>About</NavLink>
                <NavLink href="/projects" onClick={toggleMenu}>Projects</NavLink>
                <NavLink href="/mentors" onClick={toggleMenu}>Mentors</NavLink>
                <NavLink href="/tasks" onClick={toggleMenu}>Tasks</NavLink>
                <NavLink href="/news" onClick={toggleMenu}>News</NavLink>
                <NavLink href="/contact" onClick={toggleMenu}>Contact</NavLink>
              </div>
              
              {/* Mobile Search (Only visible on mobile) */}
              <div className="mt-6 sm:hidden">
                <div className="relative">
                  <Input 
                    placeholder="Search..." 
                    className="bg-white/10 border-none focus:ring-0 pl-10 text-white rounded-md w-full" 
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 h-4 w-4" />
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Spacer to prevent content from being hidden under the navbar */}
      <div className="h-16"></div>
    </>
  )
}

function NavLink({ 
  href, 
  onClick, 
  children 
}: { 
  href: string; 
  onClick?: () => void; 
  children: React.ReactNode 
}) {
  return (
    <Link
      href={href}
      className="text-white text-lg font-medium transition-colors hover:text-gray-200"
      onClick={onClick}
    >
      {children}
    </Link>
  )
}

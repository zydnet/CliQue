"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, ShoppingCart, User, Bell, Moon, Sun, LogOut, Settings, ArrowLeft, Mail, Github, Home as HomeIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "./theme-provider"
import { CartIcon } from "./cart-icon"
import { ResponsiveManager } from "@/lib/responsive-manager"
import { AuthManager, type BaseUser } from "@/lib/user-manager"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { motion } from "framer-motion"
import clsx from "clsx"
import { usePathname, useRouter } from "next/navigation"

// An array of navigation links for easier mapping and state management
const navLinks = [
  { href: "/deals", label: "Active Deals", auth: "any" },
  { href: "/create-deal", label: "Create Deal", auth: "create_deals" },
  { href: "/vendors", label: "Vendors", auth: "any" },
  { href: "/how-it-works", label: "How It Works", auth: "any" },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState<BaseUser | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  
  const { theme, toggleTheme } = useTheme()
  const authManager = AuthManager.getInstance()
  const pathname = usePathname()
  const router = useRouter()

  // --- Scroll Detection Effect ---
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // --- Auth & Responsive Manager Effect ---
  useEffect(() => {
    // ... (Your existing useEffect for auth and responsive managers remains the same)
    authManager.initializeFromStorage()
    setCurrentUser(authManager.getCurrentUser())
    const handleAuthChange = (user: BaseUser | null) => setCurrentUser(user)
    authManager.subscribe(handleAuthChange)
    return () => authManager.unsubscribe(handleAuthChange)
  }, [authManager])

  const handleSignOut = () => {
    authManager.signOut()
    setIsOpen(false)
  }

  const navItemClasses = clsx(
    "text-sm font-medium transition-colors duration-300",
    isScrolled ? "text-gray-700 dark:text-gray-300" : "text-white",
    "hover:text-primary-500 dark:hover:text-primary-400"
  );

  return (
    <nav
      className={clsx(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-md border-b border-gray-200/50 dark:border-gray-800/50"
          : "bg-transparent border-b border-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {pathname === "/" ? (
            <>
              <Link href="/" className="flex items-center space-x-2 flex-shrink-0">
                <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                  <ShoppingCart className="w-5 h-5 text-black" />
                </div>
                <span
                  className={clsx(
                    "text-xl font-bold transition-colors duration-300",
                    isScrolled ? "text-gray-900 dark:text-gray-100" : "text-black"
                  )}
                >
                  CliQue
                </span>
              </Link>
              {/* Desktop Navigation with Animation */}
              <div className="hidden md:flex items-center space-x-2 bg-black/10 dark:bg-white/10 p-1 rounded-full">
                {navLinks.map((link) => {
                  const canAccess = link.auth === 'any' || currentUser?.canAccess(link.auth);
                  if (!canAccess) return null;
                  const isActive = pathname === link.href;
                  return (
                    <Link key={link.href} href={link.href}
                      className={clsx(
                        "relative px-4 py-1.5 text-sm font-medium transition-colors",
                        isActive 
                          ? "text-gray-900 dark:text-white" 
                          : isScrolled ? "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white" : "text-gray-200 hover:text-white"
                      )}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="active-pill"
                          className="absolute inset-0 bg-white dark:bg-gray-700 rounded-full z-0"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                      <span className="relative z-10">{link.label}</span>
                    </Link>
                  );
                })}
              </div>
              {/* Desktop Actions */}
              <div className="hidden md:flex items-center space-x-1">
                <Button variant="ghost" size="icon" onClick={toggleTheme} className={navItemClasses}>
                  {theme === "light"
                    ? <Moon className="w-5 h-5 text-black" />
                    : <Sun className="w-5 h-5 text-white" />}
                </Button>
                {currentUser && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className={navItemClasses}>
                        <User className={`w-5 h-5 ${theme === 'light' ? 'text-black' : 'text-white'}`} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href="/settings" className="flex items-center gap-2">
                          <Settings className="w-4 h-4" /> Settings
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/settings/change-email" className="flex items-center gap-2">
                          <Mail className="w-4 h-4" /> Change Email
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/settings/change-password" className="flex items-center gap-2">
                          <LogOut className="w-4 h-4 rotate-180" /> Change Password
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleSignOut} className="flex items-center gap-2 text-red-600">
                        <LogOut className="w-4 h-4" /> Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
                <CartIcon />
                {!currentUser && (
                  <>
                    <Link href="/auth">
                      <Button className={`text-sm ml-2 ${theme === 'light' ? 'text-primary' : 'text-white'}`}>Sign In</Button>
                    </Link>
                  </>
                )}
              </div>
              {/* Mobile Menu Button */}
              <div className="md:hidden flex items-center">
                <CartIcon />
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)} className={navItemClasses}>
                  {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </Button>
              </div>
            </>
          ) : (
            // All other pages: show Back to Deals (on deal details) or Home, Cart, and Dark Mode toggle only
            <div className="flex items-center gap-4 w-full justify-between">
              {/* Left: Back to Deals or Home */}
              {pathname.startsWith("/deals/") && pathname.split("/").length === 3 ? (
                <Link href="/deals" className="flex items-center gap-2 text-sm font-medium px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors mt-2">
                  <ArrowLeft className={`w-5 h-5 ${theme === 'light' ? 'text-black' : 'text-white'}`} />
                  <span className={theme === 'light' ? 'text-black' : 'text-white'}>Back to Deals</span>
                </Link>
              ) : (
                <span />
              )}
              <div className="flex items-center gap-2">
                <CartIcon />
                <Button variant="ghost" size="icon" onClick={toggleTheme} className={navItemClasses}>
                  {theme === "light"
                    ? <Moon className="w-5 h-5 text-black" />
                    : <Sun className="w-5 h-5 text-white" />}
                </Button>
                {/* Home button next to theme toggle, except on home page */}
                {pathname !== "/" && (
                  <Link href="/" className="flex items-center gap-2 text-sm font-medium px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                    <HomeIcon className={`w-5 h-5 ${theme === 'light' ? 'text-black' : 'text-white'}`} />
                    <span className={theme === 'light' ? 'text-black' : 'text-white'}>Home</span>
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-md absolute top-full left-0 right-0 pb-4"
        >
            {/* Your mobile navigation links here */}
        </motion.div>
      )}
    </nav>
  )
}

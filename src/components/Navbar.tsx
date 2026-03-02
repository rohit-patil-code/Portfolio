"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export function Navbar() {

    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Prevent scrolling when mobile menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [mobileMenuOpen]);

    const navItems = [
        { name: "About", href: "#about" },
        { name: "Experience", href: "#experience" },
        { name: "Skills", href: "#skills" },
        { name: "Projects", href: "#projects" },
        { name: "Contact", href: "#contact" },
    ];

    return (
        <header className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
            <div
                className={`w-full max-w-4xl transition-all duration-300 ${scrolled
                    ? "bg-background/80 backdrop-blur-xl shadow-lg border border-border"
                    : "bg-background/60 backdrop-blur-md"
                    } rounded-full`}
            >
                <Container className="flex h-14 items-center justify-between md:justify-center px-4 md:px-6">

                    {/* Mobile Logo / Label */}
                    <div className="md:hidden flex font-serif font-semibold text-lg tracking-tight text-foreground">
                        <Link href="/" onClick={() => setMobileMenuOpen(false)}>RP</Link>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden p-2 -mr-2 text-foreground focus:outline-none transition-transform active:scale-95"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle Menu"
                    >
                        {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>

                    {/* Desktop nav Items */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="relative text-sm font-medium text-muted-foreground transition-colors hover:text-foreground group"
                            >
                                {item.name}
                                <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-foreground transition-all duration-300 group-hover:w-full" />
                            </Link>
                        ))}
                    </nav>

                    {/* Desktop Resume Button */}
                    <Link
                        href="/Resume.pdf"
                        className="hidden md:flex items-center ml-8 rounded-full border border-border px-4 py-1.5 text-sm font-medium text-foreground hover:bg-foreground hover:text-background transition-all duration-300"
                    >
                        Resume ↗
                    </Link>

                </Container>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-20 left-4 right-4 bg-background/95 backdrop-blur-3xl border border-border rounded-3xl p-6 shadow-2xl flex flex-col items-center gap-6 md:hidden z-50"
                    >
                        {navItems.map((item, i) => (
                            <motion.div
                                key={item.href}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                            >
                                <Link
                                    href={item.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="text-lg font-medium text-foreground hover:text-muted-foreground transition-colors"
                                >
                                    {item.name}
                                </Link>
                            </motion.div>
                        ))}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: navItems.length * 0.05 }}
                        >
                            <Link
                                href="/Resume.pdf"
                                onClick={() => setMobileMenuOpen(false)}
                                className="mt-2 inline-flex rounded-full border border-border px-6 py-2 text-base font-medium text-foreground hover:bg-foreground hover:text-background transition-all duration-300"
                            >
                                Resume ↗
                            </Link>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}

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
                    ? "bg-[#030014]/70 backdrop-blur-xl shadow-[0_0_20px_rgba(56,189,248,0.1)] border border-white/10"
                    : "bg-transparent backdrop-blur-md border border-transparent"
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
                                className="relative text-sm font-medium text-muted-foreground transition-all duration-300 hover:text-white hover:text-glow-blue group"
                            >
                                {item.name}
                                <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-[#38bdf8] transition-all duration-300 group-hover:w-full shadow-[0_0_10px_#38bdf8]" />
                            </Link>
                        ))}
                    </nav>

                    {/* Desktop Resume Button */}
                    <Link
                        href="/Resume.pdf"
                        className="hidden md:flex items-center ml-8 rounded-full border border-white/20 px-4 py-1.5 text-sm font-medium text-foreground hover:bg-[#38bdf8]/10 hover:border-[#38bdf8] hover:text-[#38bdf8] hover:shadow-[0_0_15px_rgba(56,189,248,0.4)] transition-all duration-300"
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
                                    className="text-lg font-medium text-muted-foreground hover:text-white hover:text-glow-blue transition-all"
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
                                className="mt-2 inline-flex rounded-full border border-white/20 px-6 py-2 text-base font-medium text-foreground hover:bg-[#38bdf8]/10 hover:border-[#38bdf8] hover:text-[#38bdf8] hover:shadow-[0_0_15px_rgba(56,189,248,0.4)] transition-all duration-300"
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

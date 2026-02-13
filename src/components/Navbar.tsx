"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

export function Navbar() {

    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navItems = [
        { name: "About", href: "#about" },
        { name: "Experience", href: "#experience" },
        { name: "Skills", href: "#skills" },
        { name: "Projects", href: "#projects" },
        { name: "Contact", href: "#contact" },
    ];

    return (
        <header className="hidden md:flex fixed top-4 left-0 right-0 z-50 justify-center px-4">
            <div
                className={`w-full max-w-4xl transition-all duration-300 ${scrolled
                    ? "bg-background/80 backdrop-blur-xl shadow-lg border border-border"
                    : "bg-background/60 backdrop-blur-md"
                    } rounded-full`}
            >
                <Container className="flex h-14 items-center justify-center px-6">

                    {/* Logo
                    <Link
                        href="/"
                        className="text-lg font-serif font-semibold tracking-tight text-foreground hover:opacity-80 transition-opacity"
                    >
                        RP
                    </Link> */}

                    {/* Nav Items */}
                    <nav className="flex items-center gap-8">
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

                    {/* Resume Button */}
                    <Link
                        href="/Resume.pdf"
                        className="items-center ml-8 rounded-full border border-border px-4 py-1.5 text-sm font-medium text-foreground hover:bg-foreground hover:text-background transition-all duration-300"
                    >
                        Resume ↗
                    </Link>

                </Container>
            </div>
        </header>
    );
}

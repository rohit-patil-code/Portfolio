"use client";
import { Container } from "@/components/ui/Container";

import { motion } from "framer-motion";
import { Github, Mail, Linkedin } from "lucide-react";
import Link from "next/link";

export function Contact() {
    return (
        <section id="contact" className="py-10 sm:py-20 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.1),transparent_50%)]" />
            <Container className="relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col items-start gap-8 max-w-3xl"
                >
                    <h2 className="text-4xl font-serif font-bold tracking-tight sm:text-7xl text-foreground text-glow-blue inline-block">
                        Let&apos;s work together.
                    </h2>
                    <p className="text-xl text-zinc-300 max-w-2xl leading-relaxed font-light">
                        I&apos;m currently open for new opportunities. Whether you have a question, a project idea, or just want to say hi, I&apos;d love to hear from you.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-4">
                        <Link
                            href="mailto:rohitpatilwork7797@gmail.com"
                            className="inline-flex items-center justify-center gap-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 px-8 py-4 text-base font-semibold text-zinc-200 hover:bg-[#38bdf8]/20 hover:border-[#38bdf8] hover:text-[#38bdf8] hover:shadow-[0_0_20px_rgba(56,189,248,0.5)] transition-all duration-300 hover:scale-105 active:scale-95"
                        >
                            <Mail className="w-5 h-5" /> Say Hello
                        </Link>
                    </div>
                </motion.div>
            </Container>
        </section>
    );
}

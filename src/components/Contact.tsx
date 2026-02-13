"use client";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";
import { motion } from "framer-motion";
import { Github, Mail, Linkedin } from "lucide-react";
import Link from "next/link";

export function Contact() {
    return (
        <section id="contact" className="py-10 sm:py-20 bg-zinc-950 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-zinc-800/30 via-zinc-950 to-zinc-950" />
            <Container className="relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col items-start gap-8 max-w-3xl"
                >
                    <h2 className="text-4xl font-serif font-bold tracking-tight sm:text-7xl text-white">
                        Let&apos;s work together.
                    </h2>
                    <p className="text-xl text-zinc-400 max-w-2xl leading-relaxed">
                        I&apos;m currently open for new opportunities. Whether you have a question, a project idea, or just want to say hi, I&apos;d love to hear from you.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-4">
                        <Link
                            href="mailto:rohitpatilwork7797@gmail.com"
                            className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-base font-semibold text-zinc-950 hover:bg-zinc-200 transition-all hover:scale-105 active:scale-95"
                        >
                            <Mail className="w-5 h-5" /> Say Hello
                        </Link>
                    </div>
                </motion.div>
            </Container>
        </section>
    );
}

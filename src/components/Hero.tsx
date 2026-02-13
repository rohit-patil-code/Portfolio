"use client";
import { Container } from "@/components/ui/Container";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { HeroSocials } from "./HeroSocials";

export function Hero() {
    return (
        <section className="relative flex min-h-[calc(100vh-4rem)] flex-col justify-center overflow-hidden py-10 sm:py-0">
            <Container className="flex flex-col items-center justify-center gap-6 mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="text-4xl font-serif font-bold tracking-tight sm:text-6xl lg:text-7xl">
                        Hi, I&apos;m <span className="text-zinc-500">Rohit Patil</span>.
                        <br />
                        Engineering scalable digital systems.
                    </h1>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="max-w-4xl text-lg text-muted-foreground sm:text-xl"
                >
                    Final-year Computer Science student specializing in full-stack development and AWS cloud. I design and deploy production-ready systems from AI-integrated platforms to real-time detection systems focused on performance, scalability, and real-world impact.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="flex gap-4"
                >
                    {/* Add CTA buttons if needed */}
                    <HeroSocials />
                </motion.div>
            </Container>

            {/* <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce"
            >
                <ArrowDown className="text-muted-foreground" size={24} />
            </motion.div> */}
        </section>
    );
}

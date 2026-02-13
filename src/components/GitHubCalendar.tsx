"use client";
import { Container } from "@/components/ui/Container";
import { motion } from "framer-motion";
import Link from "next/link";

export function GitHubCalendar() {
    return (
        <section className="py-10">
            <Container>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="space-y-8"
                >
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold tracking-tight text-zinc-900">GitHub Contributions</h2>
                        <Link href="https://github.com/rohit-patil-code" className="text-sm font-medium text-zinc-500 hover:text-zinc-900">
                            @rohit-patil-code
                        </Link>
                    </div>

                    <div className="w-full overflow-hidden rounded-xl border border-zinc-200 bg-white p-4">
                        {/* Using ghchart.rshah.org for dynamic image generation avoiding extra deps */}
                        {/* Replace 'rohit' with actual username later */}
                        <img
                            src="https://ghchart.rshah.org/000000/rohit-patil-code"
                            alt="GitHub Contribution Graph"
                            className="w-full h-auto"
                        />
                        {/* Use a default username or instructions if 'rohit-1029' is not the real one. 
                Ideally, user should update this. */}
                    </div>
                </motion.div>
            </Container>
        </section>
    );
}

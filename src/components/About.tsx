"use client";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";
import { motion } from "framer-motion";

export function About() {
    return (
        <section id="about" className="py-10 sm:py-20 bg-zinc-50/50">
            <Container>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="max-w-4xl space-y-10"
                >
                    <h2 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight text-zinc-900">
                        About Me
                    </h2>

                    <div className="space-y-6 text-lg sm:text-xl leading-relaxed text-zinc-600">
                        <p>
                            I’m a final-year Computer Science student with a strong foundation
                            in Full Stack Development and AWS Cloud, driven by a deep interest
                            in building scalable, production-ready systems that solve real-world problems.
                        </p>

                        <p>
                            Over the past few years, I’ve worked extensively with modern web
                            technologies like React, Node.js, and TypeScript to design and
                            develop high-performance applications with clean architecture and
                            optimized backend workflows. I focus not just on functionality,
                            but on scalability, performance, and long-term maintainability.
                        </p>

                        <p>
                            My work blends software engineering with applied AI. I’ve built
                            AI-integrated platforms such as an intelligent blog editor with
                            content assistance features and a real-time emergency vehicle
                            detection system powered by computer vision. Through these
                            projects, I’ve gained hands-on experience in REST API design,
                            caching strategies, asynchronous processing, and cloud deployment
                            using AWS services like EC2 and RDS.
                        </p>

                        <p>
                            I’m particularly interested in backend systems, distributed
                            architecture, and intelligent automation. Solving complex
                            problems, whether optimizing database queries or improving
                            inference workflows, is something I genuinely enjoy. Alongside
                            development, I actively practice Data Structures and Algorithms to
                            strengthen my problem-solving skills and write efficient,
                            clean code.
                        </p>

                        <p>
                            Currently, I’m focused on deepening my expertise in scalable
                            system design and AI-driven applications while seeking
                            opportunities to contribute to impactful, real-world products
                            and grow as a software engineer.
                        </p>
                    </div>
                </motion.div>
            </Container>
        </section>
    );
}

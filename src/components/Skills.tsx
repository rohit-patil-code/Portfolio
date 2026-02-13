"use client";
import { Container } from "@/components/ui/Container";
import { motion } from "framer-motion";
import { FadeIn } from "@/components/ui/FadeIn";

export function Skills() {
    const skills = [
        { name: "Java", icon: "java" },
        { name: "Python", icon: "python" },
        { name: "JavaScript", icon: "javascript" },
        { name: "TypeScript", icon: "typescript" },
        { name: "React", icon: "react" },
        { name: "Next.js", icon: "nextjs" },
        { name: "Tailwind", icon: "tailwindcss" },
        { name: "Node.js", icon: "nodejs" },
        { name: "AWS", icon: "amazonwebservices", variant: "original-wordmark" },
        { name: "GitHub", icon: "github" },
        { name: "MongoDB", icon: "mongodb" },
    ];


    return (
        <section id="skills" className="py-10 sm:py-20 bg-zinc-50/50 overflow-hidden">
            <Container>
                <div className="space-y-12">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-3xl font-serif font-bold tracking-tight sm:text-5xl text-zinc-900"
                    >
                        Skills
                    </motion.h2>

                    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
                        <div className="flex w-full overflow-hidden mask-linear-gradient" style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
                            <motion.div
                                className="flex shrink-0 items-center gap-6 py-4 pr-6"
                                animate={{ x: "-50%" }}
                                transition={{
                                    repeat: Infinity,
                                    repeatType: "loop",
                                    duration: 30,
                                    ease: "linear",
                                }}
                            >
                                {[...skills, ...skills, ...skills].map((skill, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-3 px-7 py-3 rounded-full border border-zinc-200 bg-white text-zinc-900 text-base font-medium shadow-sm hover:shadow-md hover:border-zinc-300 transition-all whitespace-nowrap"
                                    >
                                        <img
                                            src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${skill.icon}/${skill.icon}-${skill.variant || "original"}.svg`}
                                            alt={skill.name}
                                            className={`${skill.name === "AWS" ? "w-8 h-6" : "w-6 h-6"
                                                }`}
                                        />
                                        {skill.name}
                                    </div>
                                ))}

                            </motion.div>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}

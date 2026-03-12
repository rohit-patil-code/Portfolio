"use client";

import { Container } from "@/components/ui/Container";
import { motion } from "framer-motion";

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
        <section
            id="skills"
            className="py-16 sm:py-24 relative"
            style={{
                backgroundImage:
                    "radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
            }}
        >
            <Container>
                <div className="space-y-12">

                    {/* Title */}
                    <h2 className="text-3xl font-bold font-serif tracking-tight sm:text-4xl text-foreground text-glow-blue inline-block">Skills</h2>

                    {/* Skills Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">

                        {skills.map((skill) => (
                            <motion.div
                                key={skill.name}
                                whileHover={{ scale: 1.08 }}
                                className="flex items-center justify-center gap-3 px-6 py-4 rounded-xl border border-white/15 glass-panel
                text-zinc-300 font-medium shadow-sm
                hover:text-white hover:border-[#38bdf8]
                hover:shadow-[0_0_18px_rgba(56,189,248,0.45)]
                transition-all cursor-default"
                            >
                                <img
                                    src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${skill.icon}/${skill.icon}-${skill.variant || "original"}.svg`}
                                    alt={skill.name}
                                    className={`${skill.name === "AWS" ? "w-8 h-6" : "w-6 h-6"}`}
                                />
                                {skill.name}
                            </motion.div>
                        ))}

                    </div>
                </div>
            </Container>
        </section>
    );
}
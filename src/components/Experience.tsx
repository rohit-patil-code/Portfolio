"use client";
import { Container } from "@/components/ui/Container";
import { motion } from "framer-motion";

export function Experience() {
    const education = [
        {
            role: "B.Tech in Computer Science & Engineering",
            company: "BMS Institute of Technology and Management",
            period: "2022 - 2026",
            description: "Proposed Final Year Project: [Solar Tracking System]. Maintaining a CGPA of [7.90].",
        },
        {
            role: "Higher Secondary Education",
            company: "PDJ PU College",
            period: "2020 - 2022",
            description: "Major in Science (PCM).",
        },
    ];

    return (
        <section id="experience" className="py-10 sm:py-20">
            <Container>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="space-y-12"
                >
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-zinc-900">Education</h2>
                    <div className="relative border-l border-zinc-200 ml-3 md:ml-6 space-y-12">
                        {education.map((item, index) => (
                            <div key={index} className="relative pl-8 md:pl-12">
                                <span className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full bg-zinc-900 ring-4 ring-white" />
                                <h3 className="text-xl font-semibold text-zinc-900">{item.role}</h3>
                                <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2 mt-1 mb-2">
                                    <span className="font-medium text-zinc-700">{item.company}</span>
                                    <span className="hidden sm:inline text-zinc-400">•</span>
                                    <span className="text-zinc-500 text-sm">{item.period}</span>
                                </div>
                                <p className="text-zinc-600 leading-relaxed max-w-2xl">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </Container>
        </section>
    );
}

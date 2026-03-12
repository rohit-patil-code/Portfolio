"use client";
import { Container } from "@/components/ui/Container";
import { motion } from "framer-motion";

export function Experience() {
    const education = [
        {
            role: "B.Tech in Computer Science and Engineering",
            company: "BMS Institute of Technology and Management",
            period: "2022 - 2026",
            description: (
                <>
                    Proposed Final Year Project: <strong>Solar Tracking System. </strong>
                    Maintaining a CGPA of <strong>7.90</strong>.
                </>
            ),
        },
        {
            role: "Higher Secondary Education",
            company: "PDJ PU College",
            period: "2020 - 2022",
            description: "Major in Science (PCMC).",
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
                    <h2 className="text-3xl font-bold font-serif tracking-tight sm:text-4xl text-foreground text-glow-blue inline-block">Education</h2>
                    <div className="relative border-l border-white/20 ml-3 md:ml-6 space-y-12">
                        {education.map((item, index) => (
                            <div key={index} className="relative pl-8 md:pl-12 group">
                                <span className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full bg-[#38bdf8] ring-4 ring-[#030014] shadow-[0_0_10px_#38bdf8] transition-all duration-300 group-hover:shadow-[0_0_20px_#38bdf8] group-hover:bg-white" />
                                <h3 className="text-xl font-semibold text-zinc-200 group-hover:text-[#38bdf8] transition-colors">{item.role}</h3>
                                <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2 mt-1 mb-2">
                                    <span className="font-medium text-zinc-400">{item.company}</span>
                                    <span className="hidden sm:inline text-zinc-600">•</span>
                                    <span className="text-[#a78bfa] text-sm font-mono">{item.period}</span>
                                </div>
                                <p className="text-zinc-400 leading-relaxed max-w-2xl font-light">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </Container>
        </section>
    );
}

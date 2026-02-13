"use client";
import { Container } from "@/components/ui/Container";

import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function Projects() {
    const projects = [
        {
            title: "AI Powered OA-Recall System",
            description: "A platform helping candidates reconstruct and practice past Online Assessment questions using generative AI. Features question recall from memory and actionable learning insights.",
            tech: ["Next.js 16", "Supabase", "Gemini AI", "Tailwind 4"],
            image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1965&auto=format&fit=crop",
            demo: "#",
            github: "#"
        },
        {
            title: "AI-Powered Blog Editor",
            description: "Full-stack blogging platform with AI content assistance, clean UI, and scalable architecture. Features intelligent editing suggestions and automated formatting.",
            tech: ["React.js", "Node.js", "Redis", "AWS EC2"],
            image: "https://images.unsplash.com/photo-1499750310159-54f0f2954aef?q=80&w=2600&auto=format&fit=crop",
            demo: "https://blog.rohitcodes.tech",
            github: "https://github.com/rohit-patil-code/AI-Blog-Editor"
        },
        {
            title: "Ambulance Detection & Routing",
            description: "Computer vision system utilizing YOLOv5 and Google Maps API to detect emergency vehicles and optimize traffic routing dynamically in real-time.",
            tech: ["Python", "YOLOv5", "OpenCV", "Flask"],
            image: "https://images.unsplash.com/photo-1587815377593-9c59573887c2?q=80&w=2600&auto=format&fit=crop",
            demo: "#",
            github: "https://github.com/rohit-patil-code/Ambulance-detection-system"
        }
    ];

    return (
        <section id="projects" className="py-10 sm:py-20">
            <Container>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="space-y-12"
                >
                    <div className="flex flex-col gap-4">
                        <h2 className="text-3xl font-serif font-bold tracking-tight sm:text-5xl text-zinc-900">Featured Projects</h2>
                        <p className="text-xl text-zinc-600 max-w-2xl">
                            Here are some of the projects I&apos;ve worked on recently.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                        {projects.map((project, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="group relative flex flex-col overflow-hidden rounded-3xl border border-zinc-200 bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                            >
                                <div className="aspect-[16/9] w-full bg-zinc-100 relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                </div>

                                <div className="flex flex-col flex-1 p-6 sm:p-8 gap-4">
                                    <div className="flex items-start justify-between gap-4">
                                        <h3 className="text-2xl font-bold text-zinc-900 leading-tight group-hover:text-zinc-700 transition-colors">
                                            {project.title}
                                        </h3>
                                        <div className="flex gap-3">
                                            <Link
                                                href={project.github}
                                                target="_blank"
                                                className="text-zinc-400 hover:text-zinc-900 transition-colors"
                                                aria-label="View Code"
                                            >
                                                <Github className="w-5 h-5" />
                                            </Link>
                                            <Link
                                                href={project.demo}
                                                target="_blank"
                                                className="text-zinc-400 hover:text-zinc-900 transition-colors"
                                                aria-label="View Demo"
                                            >
                                                <ExternalLink className="w-5 h-5" />
                                            </Link>
                                        </div>
                                    </div>

                                    <p className="text-zinc-600 text-base leading-relaxed flex-1">
                                        {project.description}
                                    </p>

                                    <div className="flex flex-wrap gap-2 pt-4">
                                        {project.tech.map((t) => (
                                            <span key={t} className="text-xs font-semibold text-zinc-600 bg-zinc-100 px-3 py-1.5 rounded-full">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </Container>
        </section>
    );
}

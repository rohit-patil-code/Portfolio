"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function RocketEntry() {
    const [showOverlay, setShowOverlay] = useState(true);
    const [phase, setPhase] = useState<"idle" | "ignition" | "hyperspace" | "blast">("idle");
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const hasSeenIntro = sessionStorage.getItem("hasSeenRocketIntro");
        if (hasSeenIntro) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setShowOverlay(false);
            return;
        }

        // --- Cinematic Timeline ---
        // 0.0s: Mounts in idle, almost immediately starts ignition
        const t1 = setTimeout(() => setPhase("ignition"), 100);
        // 1.0s: Enters hyperspace (canvas lines start going crazy, rocket shakes hard)
        const t2 = setTimeout(() => setPhase("hyperspace"), 1000);
        // 4.0s: Warp blast flash triggers
        const t3 = setTimeout(() => setPhase("blast"), 4000);
        // 4.8s: Remove overlay, showing main portfolio
        const t4 = setTimeout(() => {
            // sessionStorage.setItem("hasSeenRocketIntro", "true");
            setShowOverlay(false);
        }, 4800);

        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t3);
            clearTimeout(t4);
        };
    }, []);

    // Hyperspace Canvas Effect
    useEffect(() => {
        if (phase !== "hyperspace" && phase !== "ignition") return;

        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let width = window.innerWidth;
        let height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;

        const stars: { x: number; y: number; length: number; speed: number; thickness: number }[] = [];
        const numStars = width > 768 ? 200 : 100;

        for (let i = 0; i < numStars; i++) {
            stars.push({
                x: Math.random() * width,
                y: Math.random() * height,
                length: Math.random() * 80 + 20,
                speed: Math.random() * 30 + 10,
                thickness: Math.random() * 2 + 0.5,
            });
        }

        const draw = () => {
            // Slight transparency on clear to create motion blur trails
            ctx.fillStyle = phase === "hyperspace" ? "rgba(3, 0, 20, 0.3)" : "rgba(3, 0, 20, 0.8)";
            ctx.fillRect(0, 0, width, height);

            ctx.fillStyle = "#ffffff";
            stars.forEach((star) => {
                // If we are in hyper space, increase speed exponentially
                const currentSpeed = phase === "hyperspace" ? star.speed * 3 : star.speed * 0.2;
                star.y += currentSpeed;

                if (star.y > height) {
                    star.y = -star.length;
                    star.x = Math.random() * width;
                }

                ctx.beginPath();
                ctx.rect(star.x, star.y, star.thickness, star.length);
                ctx.fill();
            });

            animationFrameId = requestAnimationFrame(draw);
        };

        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };

        window.addEventListener("resize", handleResize);
        draw();

        return () => {
            window.removeEventListener("resize", handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, [phase]);

    if (!showOverlay) return null;

    return (
        <AnimatePresence>
            <motion.div
                key="rocket-overlay"
                className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#030014] overflow-hidden"
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
            >
                {/* Global Style to force hide Navbar during cinematic */}
                <style>{`
                    nav, header, .fixed-nav {
                        opacity: 0 !important;
                        pointer-events: none !important;
                    }
                    body {
                        overflow: hidden !important;
                    }
                `}</style>
                {/* Hyperspace Background Canvas */}
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full pointer-events-none"
                    style={{ opacity: phase === "idle" ? 0 : 1 }}
                />

                <div className="relative z-10 flex flex-col items-center">
                    {/* The Rocket */}
                    <AnimatePresence>
                        {phase !== "blast" && (
                            <motion.div
                                initial={{ y: 0 }}
                                animate={
                                    phase === "hyperspace"
                                        ? {
                                            y: 0,
                                            x: [-6, 6, -8, 8, -4, 4], // Aggressive shaking
                                            rotate: [-1, 1, -2, 2, -1, 1],
                                        }
                                        : phase === "ignition"
                                            ? {
                                                y: 0,
                                                x: [-2, 2, -2, 2, 0], // Mild vibration
                                            }
                                            : {
                                                y: [0, -10, 0], // Gentle float
                                            }
                                }
                                transition={
                                    phase === "hyperspace"
                                        ? { duration: 0.1, repeat: Infinity, ease: "linear" }
                                        : phase === "ignition"
                                            ? { duration: 0.2, repeat: Infinity }
                                            : { duration: 4, repeat: Infinity, ease: "easeInOut" }
                                }
                                exit={{ y: "-150vh", opacity: 0, scale: 0.5, transition: { duration: 0.4 } }}
                                className="relative w-32 h-48 drop-shadow-[0_0_30px_rgba(56,189,248,0.6)]"
                            >
                                {/* SVG Rocket */}
                                <svg
                                    viewBox="0 0 100 150"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-full h-full text-foreground"
                                >
                                    <path
                                        d="M50 10C50 10 20 40 20 90C20 110 30 130 30 130H70C70 130 80 110 80 90C80 40 50 10 50 10Z"
                                        fill="currentColor"
                                        className="text-white"
                                    />
                                    <path d="M20 90C10 100 0 120 0 120H20V90Z" fill="currentColor" className="text-zinc-400" />
                                    <path d="M80 90C90 100 100 120 100 120H80V90Z" fill="currentColor" className="text-zinc-400" />
                                    {/* Window */}
                                    <circle cx="50" cy="60" r="10" fill="#030014" stroke="#38bdf8" strokeWidth="3" />
                                    {/* Engine Nozzle */}
                                    <path d="M35 130H65L70 140H30L35 130Z" fill="#3f3f46" />
                                </svg>

                                {/* Engine Exhaust Flame */}
                                <AnimatePresence>
                                    {(phase === "ignition" || phase === "hyperspace") && (
                                        <motion.div
                                            initial={{ opacity: 0, scaleY: 0 }}
                                            animate={
                                                phase === "hyperspace"
                                                    ? { opacity: 1, scaleY: [2, 3, 2.5, 3.5, 2] } // Huge blast
                                                    : { opacity: 1, scaleY: [1, 1.5, 1.2, 1.8, 1.5] } // Building up
                                            }
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.2, repeat: Infinity, repeatType: "mirror" }}
                                            className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-10 h-32 origin-top"
                                        >
                                            <div
                                                className={`w-full h-full bg-gradient-to-b from-[#38bdf8] via-[#a78bfa] to-transparent rounded-full ${phase === "hyperspace" ? "blur-xl" : "blur-md"
                                                    }`}
                                            />
                                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-20 bg-white rounded-full blur-sm" />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Warp Blast Flash */}
                <AnimatePresence>
                    {phase === "blast" && (
                        <motion.div
                            initial={{ scale: 0, opacity: 0.8 }}
                            animate={{ scale: 20, opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className="absolute z-50 w-64 h-64 rounded-full bg-white blur-3xl pointer-events-none"
                            style={{
                                boxShadow: "0 0 150px 100px rgba(56, 189, 248, 0.8), 0 0 300px 200px rgba(167, 139, 250, 0.6)",
                            }}
                        />
                    )}
                </AnimatePresence>
            </motion.div>
        </AnimatePresence>
    );
}

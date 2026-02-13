"use client";

import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

interface ScrollRevealProps {
    children: React.ReactNode;
    width?: "fit-content" | "100%";
    delay?: number;
    className?: string; // Add className prop
}

export const ScrollReveal = ({ children, width = "fit-content", delay = 0, className = "" }: ScrollRevealProps) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" }); // Trigger a bit earlier
    const mainControls = useAnimation();

    useEffect(() => {
        if (isInView) {
            mainControls.start("visible");
        }
    }, [isInView, mainControls]);

    return (
        <div ref={ref} style={{ position: "relative", width, overflow: "hidden" }} className={className}>
            <motion.div
                variants={{
                    hidden: { opacity: 0, y: 75 },
                    visible: { opacity: 1, y: 0 },
                }}
                initial="hidden"
                animate={mainControls}
                transition={{ duration: 0.8, delay: delay, ease: "easeOut" }} // Smoother ease
            >
                {children}
            </motion.div>
        </div>
    );
};

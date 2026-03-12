"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CosmicCursorAura() {
    const [isMounted, setIsMounted] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const [isDesktop, setIsDesktop] = useState(true);

    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);

    // Spring configuration for a smooth trailing aura
    const auraSpringConfig = { damping: 25, stiffness: 120, mass: 0.5 };
    const auraX = useSpring(mouseX, auraSpringConfig);
    const auraY = useSpring(mouseY, auraSpringConfig);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsMounted(true);

        // Ensure this only runs on pointing devices (e.g. not touchscreens)
        if (window.matchMedia("(pointer: coarse)").matches) {
            setIsDesktop(false);
            return;
        }

        const moveCursor = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            // Check if hovering over interactive/clickable elements
            if (
                target.tagName.toLowerCase() === "a" ||
                target.tagName.toLowerCase() === "button" ||
                target.closest("a") ||
                target.closest("button") ||
                window.getComputedStyle(target).cursor === "pointer"
            ) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener("mousemove", moveCursor);
        window.addEventListener("mouseover", handleMouseOver);

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            window.removeEventListener("mouseover", handleMouseOver);
        };
    }, [mouseX, mouseY]);

    if (!isMounted || !isDesktop) return null;

    return (
        <motion.div
            className="fixed top-0 left-0 w-64 h-64 rounded-full pointer-events-none z-[9998]"
            style={{
                x: auraX,
                y: auraY,
                translateX: "-50%",
                translateY: "-50%",
                background: "radial-gradient(circle, rgba(56,189,248,0.15) 0%, rgba(167,139,250,0.05) 40%, transparent 70%)",
            }}
            animate={{
                scale: isHovering ? 1.5 : 1,
                opacity: isHovering ? 1 : 0.6,
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
        />
    );
}

"use client";
import React, { useRef, useEffect, useState } from 'react';

interface Star {
    x: number;
    y: number;
    z: number;
    size: number;
    alpha: number;
    baseAlpha: number;
    pulsing: boolean;
    pulseSpeed: number;
}

interface ShootingStar {
    x: number;
    y: number;
    length: number;
    speed: number;
    angle: number;
    opacity: number;
    active: boolean;
}

export function Starfield() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [reducedMotion, setReducedMotion] = useState(false);

    useEffect(() => {
        // Check for reduced motion preference
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        setReducedMotion(mediaQuery.matches);

        const handleChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
        mediaQuery.addEventListener('change', handleChange);

        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let stars: Star[] = [];
        let shootingStars: ShootingStar[] = [];
        let width = window.innerWidth;
        let height = window.innerHeight;

        // Colors
        const cosmicBlue = 'rgba(56, 189, 248,'; // #38bdf8
        const nebulaPurple = 'rgba(167, 139, 250,'; // #a78bfa
        const white = 'rgba(255, 255, 255,';

        // Mouse interaction for parallax
        let mouseX = 0;
        let mouseY = 0;
        let targetX = 0;
        let targetY = 0;

        const handleMouseMove = (e: MouseEvent) => {
            mouseX = (e.clientX - width / 2) * 0.05;
            mouseY = (e.clientY - height / 2) * 0.05;
        };

        if (!reducedMotion) {
            window.addEventListener('mousemove', handleMouseMove);
        }

        const resizeCanvas = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
            initStars();
        };

        const initStars = () => {
            stars = [];
            // Create layers of stars (z index from 1 to 3, 1 is closest)
            const numStars = Math.floor((width * height) / 2000); // Responsive amount of stars

            for (let i = 0; i < numStars; i++) {
                const z = Math.random() * 2 + 1; // 1 to 3
                stars.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    z: z,
                    size: Math.random() * 1.5 / z,
                    alpha: Math.random(),
                    baseAlpha: Math.random() * 0.5 + 0.3,
                    pulsing: Math.random() > 0.5,
                    pulseSpeed: Math.random() * 0.02 + 0.005
                });
            }

            // Initialize shooting stars
            shootingStars = [];
            if (!reducedMotion) {
                for (let i = 0; i < 2; i++) {
                    createShootingStar();
                }
            }
        };

        const createShootingStar = () => {
            const angle = Math.PI / 4 + (Math.random() * 0.2 - 0.1); // Roughly 45 degrees
            shootingStars.push({
                x: Math.random() * width,
                y: Math.random() * -height, // Start above screen
                length: Math.random() * 100 + 50,
                speed: Math.random() * 15 + 10,
                angle: angle,
                opacity: 0,
                active: false
            });
        };

        const drawStars = () => {
            ctx.clearRect(0, 0, width, height);

            // Smooth mouse interpolation for parallax
            targetX += (mouseX - targetX) * 0.05;
            targetY += (mouseY - targetY) * 0.05;

            // Draw regular stars
            stars.forEach(star => {
                // Parallax shift based on z depth
                let px = star.x - (reducedMotion ? 0 : targetX / star.z);
                let py = star.y - (reducedMotion ? 0 : targetY / star.z);

                // Wrap around screen
                if (px < 0) px += width;
                if (px > width) px -= width;
                if (py < 0) py += height;
                if (py > height) py -= height;

                // Pulsing effect
                if (!reducedMotion && star.pulsing) {
                    star.alpha += star.pulseSpeed;
                    if (star.alpha > 1 || star.alpha < star.baseAlpha) {
                        star.pulseSpeed = -star.pulseSpeed;
                    }
                }

                // Randomly assign slight colors to some stars
                let colorBase = white;
                const randColor = Math.random();
                if (randColor > 0.9) colorBase = cosmicBlue;
                else if (randColor > 0.8) colorBase = nebulaPurple;

                ctx.beginPath();
                ctx.arc(px, py, star.size, 0, Math.PI * 2);
                ctx.fillStyle = `${colorBase} ${star.alpha})`;
                ctx.fill();
            });

            // Draw and update shooting stars
            if (!reducedMotion) {
                shootingStars.forEach((star, index) => {
                    // Random trigger to become active
                    if (!star.active && Math.random() < 0.001) {
                        star.active = true;
                        star.x = Math.random() * width;
                        star.y = Math.random() * -height;
                        star.opacity = 1;
                    }

                    if (star.active) {
                        star.x += Math.cos(star.angle) * star.speed;
                        star.y += Math.sin(star.angle) * star.speed;
                        star.opacity -= 0.01;

                        if (star.opacity <= 0) {
                            star.active = false;
                        } else {
                            // Draw tail
                            const grad = ctx.createLinearGradient(
                                star.x, star.y,
                                star.x - Math.cos(star.angle) * star.length,
                                star.y - Math.sin(star.angle) * star.length
                            );
                            grad.addColorStop(0, `rgba(255, 255, 255, ${star.opacity})`);
                            grad.addColorStop(1, 'rgba(255, 255, 255, 0)');

                            ctx.beginPath();
                            ctx.moveTo(star.x, star.y);
                            ctx.lineTo(
                                star.x - Math.cos(star.angle) * star.length,
                                star.y - Math.sin(star.angle) * star.length
                            );
                            ctx.strokeStyle = grad;
                            ctx.lineWidth = 2;
                            ctx.stroke();

                            // Draw head glow
                            ctx.beginPath();
                            ctx.arc(star.x, star.y, 2, 0, Math.PI * 2);
                            ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
                            ctx.fill();
                        }
                    }
                });
            }

            animationFrameId = requestAnimationFrame(drawStars);
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();
        drawStars();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, [reducedMotion]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-[-1] bg-[#030014]"
            style={{ display: 'block' }}
        />
    );
}

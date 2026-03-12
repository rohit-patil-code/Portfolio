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

interface Meteor {
    x: number;
    y: number;
    size: number;
    speed: number;
    angle: number;
    rotation: number;
    rotationSpeed: number;
    vertices: { x: number, y: number }[];
}

interface Rocket {
    x: number;
    y: number;
    speed: number;
    angle: number;
    active: boolean;
    scale: number;
}

interface BlackHole {
    x: number;
    y: number;
    radius: number;
}

export function Starfield() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [reducedMotion, setReducedMotion] = useState(false);

    useEffect(() => {
        // Check for reduced motion preference
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        // eslint-disable-next-line react-hooks/set-state-in-effect
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
        let meteors: Meteor[] = [];
        let rockets: Rocket[] = [];
        let blackHole: BlackHole = { x: 0, y: 0, radius: 0 };
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

            // Initialize shooting stars and other elements
            shootingStars = [];
            meteors = [];
            rockets = [];

            // Place black hole generally in the top/right quadrant
            blackHole = {
                x: width * 0.75 + (Math.random() * width * 0.1),
                y: height * 0.3 + (Math.random() * height * 0.1),
                radius: width > 768 ? 50 : 25
            };

            if (!reducedMotion) {
                for (let i = 0; i < 2; i++) {
                    createShootingStar();
                }
                for (let i = 0; i < 4; i++) {
                    createMeteor();
                }
                createRocket();
            }
        };

        const createMeteor = () => {
            const numVertices = Math.floor(Math.random() * 4) + 5;
            const vertices = [];
            for (let i = 0; i < numVertices; i++) {
                const a = (i / numVertices) * Math.PI * 2;
                const r = 0.6 + Math.random() * 0.4;
                vertices.push({ x: Math.cos(a) * r, y: Math.sin(a) * r });
            }
            meteors.push({
                x: Math.random() * width,
                y: Math.random() * height,
                size: Math.random() * 10 + 5,
                speed: Math.random() * 0.5 + 0.2,
                angle: Math.random() * Math.PI * 2,
                rotation: 0,
                rotationSpeed: (Math.random() - 0.5) * 0.02,
                vertices
            });
        };

        const createRocket = () => {
            rockets.push({
                x: -100,
                y: height * 0.8,
                speed: 2 + Math.random(),
                angle: -0.2, // Fly slightly upwards
                active: false,
                scale: 0.6 + Math.random() * 0.4
            });
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

        const drawSpaceTimeGrid = (ctx: CanvasRenderingContext2D, dx: number, dy: number) => {
            if (reducedMotion) return;
            ctx.beginPath();
            ctx.strokeStyle = 'rgba(56, 189, 248, 0.05)';
            ctx.lineWidth = 1;

            const gridSize = 100;
            const bhx = blackHole.x - dx * 0.5;
            const bhy = blackHole.y - dy * 0.5;

            for (let x = 0; x <= width; x += gridSize) {
                ctx.moveTo(x, 0);
                for (let y = 0; y <= height; y += 50) {
                    const dist = Math.hypot(x - bhx, y - bhy);
                    const pull = Math.max(0, 150 - dist) * 0.3;
                    const angle = Math.atan2(bhy - y, bhx - x);
                    ctx.lineTo(x + Math.cos(angle) * pull, y + Math.sin(angle) * pull);
                }
            }
            for (let y = 0; y <= height; y += gridSize) {
                ctx.moveTo(0, y);
                for (let x = 0; x <= width; x += 50) {
                    const dist = Math.hypot(x - bhx, y - bhy);
                    const pull = Math.max(0, 150 - dist) * 0.3;
                    const angle = Math.atan2(bhy - y, bhx - x);
                    ctx.lineTo(x + Math.cos(angle) * pull, y + Math.sin(angle) * pull);
                }
            }
            ctx.stroke();
        };

        // const drawBlackHole = (ctx: CanvasRenderingContext2D, dx: number, dy: number) => {
        //    const bx = blackHole.x - dx * 0.5;
        //    const by = blackHole.y - dy * 0.5;

        //    const time = Date.now() * 0.001;
        //    const grad = ctx.createRadialGradient(bx, by, blackHole.radius * 0.5, bx, by, blackHole.radius * 3);
        //    grad.addColorStop(0, 'rgba(0,0,0,1)');
        //    grad.addColorStop(0.3, 'rgba(167, 139, 250, 0.5)'); // purple disk
        //    grad.addColorStop(0.6, 'rgba(56, 189, 248, 0.2)'); // blue edge
        //    grad.addColorStop(1, 'rgba(0,0,0,0)');

        //    ctx.beginPath();
        //    ctx.ellipse(bx, by, blackHole.radius * 2.5, blackHole.radius * 0.8, time * 0.5, 0, Math.PI * 2);
        //    ctx.fillStyle = grad;
        //    ctx.fill();

        //    ctx.beginPath();
        //    ctx.arc(bx, by, blackHole.radius, 0, Math.PI * 2);
        //    ctx.fillStyle = '#000000';
        //    ctx.fill();

        //    ctx.beginPath();
        //    ctx.arc(bx, by, blackHole.radius * 1.05, 0, Math.PI * 2);
        //    ctx.strokeStyle = 'rgba(255,255,255,0.4)';
        //    ctx.lineWidth = 1;
        //    ctx.stroke();
        // };

        const drawMeteors = (ctx: CanvasRenderingContext2D, dx: number, dy: number) => {
            meteors.forEach(m => {
                const px = m.x - (reducedMotion ? 0 : dx * 1.2);
                const py = m.y - (reducedMotion ? 0 : dy * 1.2);

                m.x += Math.cos(m.angle) * m.speed;
                m.y += Math.sin(m.angle) * m.speed;
                m.rotation += m.rotationSpeed;

                if (m.x < -100) m.x = width + 100;
                if (m.x > width + 100) m.x = -100;
                if (m.y < -100) m.y = height + 100;
                if (m.y > height + 100) m.y = -100;

                ctx.save();
                ctx.translate(px, py);
                ctx.rotate(m.rotation);

                ctx.beginPath();
                m.vertices.forEach((v, i) => {
                    if (i === 0) ctx.moveTo(v.x * m.size, v.y * m.size);
                    else ctx.lineTo(v.x * m.size, v.y * m.size);
                });
                ctx.closePath();
                ctx.fillStyle = '#0f172a';
                ctx.fill();
                ctx.strokeStyle = 'rgba(56, 189, 248, 0.3)';
                ctx.lineWidth = 1.5;
                ctx.stroke();
                ctx.restore();
            });
        };

        const drawRockets = (ctx: CanvasRenderingContext2D, dx: number, dy: number) => {
            rockets.forEach(r => {
                if (!r.active && Math.random() < 0.001) {
                    r.active = true;
                    r.x = -100;
                    r.y = height * (0.5 + Math.random() * 0.4);
                }

                if (r.active) {
                    r.x += Math.cos(r.angle) * r.speed;
                    r.y += Math.sin(r.angle) * r.speed;

                    const px = r.x - (reducedMotion ? 0 : dx * 1.5);
                    const py = r.y - (reducedMotion ? 0 : dy * 1.5);

                    if (px > width + 200) {
                        r.active = false;
                    }

                    ctx.save();
                    ctx.translate(px, py);
                    ctx.rotate(r.angle);
                    ctx.scale(r.scale, r.scale);

                    ctx.beginPath();
                    ctx.moveTo(20, 0);
                    ctx.lineTo(-10, -8);
                    ctx.lineTo(-10, 8);
                    ctx.closePath();
                    ctx.fillStyle = '#f8fafc';
                    ctx.fill();

                    ctx.beginPath();
                    ctx.moveTo(-5, -6);
                    ctx.lineTo(-15, -15);
                    ctx.lineTo(-10, -2);
                    ctx.fillStyle = '#a78bfa';
                    ctx.fill();

                    ctx.beginPath();
                    ctx.moveTo(-5, 6);
                    ctx.lineTo(-15, 15);
                    ctx.lineTo(-10, 2);
                    ctx.fillStyle = '#a78bfa';
                    ctx.fill();

                    const flameLen = 10 + Math.random() * 20;
                    ctx.beginPath();
                    ctx.moveTo(-10, -4);
                    ctx.lineTo(-10 - flameLen, 0);
                    ctx.lineTo(-10, 4);
                    ctx.fillStyle = 'rgba(56, 189, 248, 0.8)';
                    ctx.fill();

                    ctx.restore();
                }
            });
        };

        const drawStars = () => {
            ctx.clearRect(0, 0, width, height);

            // Smooth mouse interpolation for parallax
            targetX += (mouseX - targetX) * 0.05;
            targetY += (mouseY - targetY) * 0.05;

            drawSpaceTimeGrid(ctx, targetX, targetY);
            // drawBlackHole(ctx, targetX, targetY);
            if (!reducedMotion) drawMeteors(ctx, targetX, targetY);

            // Draw regular stars
            stars.forEach(star => {
                // Parallax shift based on z depth
                let px = star.x - (reducedMotion ? 0 : targetX / star.z);
                let py = star.y - (reducedMotion ? 0 : targetY / star.z);

                // Gravitational lensing
                const bx = blackHole.x - targetX * 0.5;
                const by = blackHole.y - targetY * 0.5;
                const distToBH = Math.hypot(px - bx, py - by);

                if (distToBH < blackHole.radius) {
                    return; // Consumed by black hole
                } else if (distToBH < blackHole.radius * 4) {
                    const angle = Math.atan2(py - by, px - bx);
                    const bendDist = distToBH + (blackHole.radius * 4 - distToBH) * 0.3;
                    px = bx + Math.cos(angle) * bendDist;
                    py = by + Math.sin(angle) * bendDist;
                }

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
                shootingStars.forEach((star) => {
                    // Random trigger to become active
                    if (!star.active && Math.random() < 0.01) {
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

                drawRockets(ctx, targetX, targetY);
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

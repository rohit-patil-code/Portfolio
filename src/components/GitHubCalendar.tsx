"use client";
import { Container } from "@/components/ui/Container";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { GitHubCalendar as GitHubCalendarLib } from "react-github-calendar";
import { ActivityCalendar } from "react-activity-calendar";
import { Github, Code2, Loader2 } from "lucide-react";
import { clsx } from "clsx";

// The space theme colors (cosmic blue scale)
const explicitTheme = {
    light: ['#1e1b4b', '#0ea5e9', '#0284c7', '#0369a1', '#075985'], // Adjusting for dark bg
    dark: ['#1e1b4b', '#0ea5e9', '#0284c7', '#0369a1', '#075985'],
};

export function GitHubCalendar() {
    const [activeTab, setActiveTab] = useState<'github' | 'leetcode'>('github');
    const [leetcodeData, setLeetcodeData] = useState<Array<{ date: string; count: number; level: 0 | 1 | 2 | 3 | 4 }>>([]);
    const [isLoadingLeetcode, setIsLoadingLeetcode] = useState(false);
    const [leetcodeError, setLeetcodeError] = useState<string | null>(null);

    useEffect(() => {
        if (activeTab === 'leetcode' && leetcodeData.length === 0) {
            fetchLeetcodeData();
        }
    }, [activeTab, leetcodeData.length]);

    const fetchLeetcodeData = async () => {
        setIsLoadingLeetcode(true);
        setLeetcodeError(null);
        try {
            const res = await fetch('/api/leetcode?username=Rohit_patil_');
            if (!res.ok) throw new Error('Failed to fetch data');
            const data = await res.json();

            if (data.contributions) {
                setLeetcodeData(data.contributions);
            } else {
                setLeetcodeError('Could not parse LeetCode data');
            }
        } catch (err) {
            if (err instanceof Error) {
                setLeetcodeError(err.message);
            } else {
                setLeetcodeError('Something went wrong');
            }
            console.error(err);
        } finally {
            setIsLoadingLeetcode(false);
        }
    };

    return (
        <section className="py-10">
            <Container>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="space-y-6"
                >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <h2 className="text-2xl font-bold font-serif tracking-tight text-foreground text-glow-blue inline-block">
                            {activeTab === 'github' ? <Link href="https://github.com/rohit-patil-code">
                                Github
                            </Link> : <Link href="https://leetcode.com/u/Rohit_patil_/">
                                Leetcode
                            </Link>}
                        </h2>

                        {/* Tab Switcher */}
                        <div className="flex p-1 space-x-1 glass-panel rounded-lg w-fit border border-white/20">
                            <button
                                onClick={() => setActiveTab('github')}
                                className={clsx(
                                    "flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200",
                                    activeTab === 'github'
                                        ? "bg-[#38bdf8]/20 text-[#38bdf8] shadow-[0_0_10px_rgba(56,189,248,0.3)] ring-1 ring-[#38bdf8]/50"
                                        : "text-zinc-400 hover:text-zinc-200 hover:bg-white/5"
                                )}
                            >
                                <Github className="w-4 h-4" />
                                <span>GitHub</span>
                            </button>
                            <button
                                onClick={() => setActiveTab('leetcode')}
                                className={clsx(
                                    "flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200",
                                    activeTab === 'leetcode'
                                        ? "bg-[#38bdf8]/20 text-[#38bdf8] shadow-[0_0_10px_rgba(56,189,248,0.3)] ring-1 ring-[#38bdf8]/50"
                                        : "text-zinc-400 hover:text-zinc-200 hover:bg-white/5"
                                )}
                            >
                                <Code2 className="w-4 h-4" />
                                <span>LeetCode</span>
                            </button>
                        </div>
                    </div>

                    {/* <div className="w-full flex justify-end">
                        {activeTab === 'github' ? (
                            <Link href="https://github.com/rohit-patil-code" className="text-sm font-medium text-zinc-500 hover:text-zinc-900">
                                @rohit-patil-code
                            </Link>
                        ) : (
                            <Link href="https://leetcode.com/u/Rohit_patil_/" className="text-sm font-medium text-zinc-500 hover:text-zinc-900">
                                @Rohit_patil_
                            </Link>
                        )}
                    </div> */}

                    <div className="w-full overflow-hidden rounded-xl border border-white/10 glass-panel p-6 md:p-8 flex justify-center items-center min-h-[200px] text-zinc-300">
                        {activeTab === 'github' && (
                            <GitHubCalendarLib
                                username="rohit-patil-code"
                                colorScheme="dark"
                                theme={explicitTheme}
                                blockSize={14}
                                blockMargin={4}
                                fontSize={14}
                            />
                        )}

                        {activeTab === 'leetcode' && (
                            <div className="w-full flex justify-center">
                                {isLoadingLeetcode && (
                                    <div className="flex flex-col items-center justify-center space-y-3 text-zinc-500 min-h-[150px]">
                                        <Loader2 className="w-6 h-6 animate-spin" />
                                        <p className="text-sm font-medium">Loading LeetCode stats...</p>
                                    </div>
                                )}

                                {leetcodeError && !isLoadingLeetcode && (
                                    <div className="text-red-500 text-sm font-medium bg-red-900/20 py-3 px-4 rounded-lg border border-red-500/50">
                                        {leetcodeError}
                                    </div>
                                )}

                                {!isLoadingLeetcode && !leetcodeError && leetcodeData.length > 0 && (
                                    <ActivityCalendar
                                        data={leetcodeData}
                                        theme={explicitTheme}
                                        colorScheme="dark"
                                        blockSize={14}
                                        blockMargin={4}
                                        fontSize={14}
                                        labels={{
                                            totalCount: '{{count}} submissions in the last year',
                                        }}
                                    />
                                )}
                            </div>
                        )}
                    </div>
                </motion.div>
            </Container>
        </section>
    );
}

"use client";

import Link from "next/link";
import { Github, Linkedin } from "lucide-react";

export function HeroSocials() {
    return (
        <div className="mt-8 flex flex-wrap items-center gap-4">

            <SocialButton
                href="https://github.com/rohit-patil-code"
                label="GitHub"
                icon={<Github size={18} />}
            />

            <SocialButton
                href="https://linkedin.com/in/rohitpatil-linkdin"
                label="LinkedIn"
                icon={<Linkedin size={18} />}
            />

            <SocialButton
                href="https://leetcode.com/u/Rohit_patil_/"
                label="LeetCode"
                icon={<LeetCodeIcon />}
            />

        </div>
    );
}

function SocialButton({
    href,
    label,
    icon,
}: {
    href: string;
    label: string;
    icon: React.ReactNode;
}) {
    return (
        <Link
            href={href}
            target="_blank"
            className="group inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium text-muted-foreground transition-all duration-300 hover:bg-foreground hover:text-background hover:scale-105"
        >
            {icon}
            {label}
        </Link>
    );
}

function LeetCodeIcon() {
    return (
        <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="currentColor"
        >
            <path d="M13.483 0a1.1 1.1 0 0 0-.78.323l-9.9 9.9a3.3 3.3 0 0 0 0 4.667l6.03 6.03a3.3 3.3 0 0 0 4.667 0l4.667-4.667a1.1 1.1 0 1 0-1.556-1.556l-4.667 4.667a1.1 1.1 0 0 1-1.556 0l-6.03-6.03a1.1 1.1 0 0 1 0-1.556l9.9-9.9A1.1 1.1 0 0 0 13.483 0z" />
        </svg>
    );
}

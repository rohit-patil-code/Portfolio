import { Hero } from "@/components/Hero";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { About } from "@/components/About";
import { Experience } from "@/components/Experience";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { GitHubCalendar } from "@/components/GitHubCalendar";
import { Contact } from "@/components/Contact";

export default function Home() {
  return (
    <div className="flex flex-col">
      <ScrollReveal width="100%">
        <Hero />
      </ScrollReveal>
      <ScrollReveal width="100%">
        <About />
      </ScrollReveal>
      <ScrollReveal width="100%">
        <Experience />
      </ScrollReveal>
      <ScrollReveal width="100%">
        <Skills />
      </ScrollReveal>
      <ScrollReveal width="100%">
        <Projects />
      </ScrollReveal>
      <ScrollReveal width="100%">
        <GitHubCalendar />
      </ScrollReveal>
      <ScrollReveal width="100%">
        <Contact />
      </ScrollReveal>
      <footer className="py-6 text-center text-sm text-zinc-500">
        <p>&copy; {new Date().getFullYear()} Rohit Patil. All rights reserved. {/* Deploy Trigger 2 */}</p>
      </footer>
    </div>
  );
}

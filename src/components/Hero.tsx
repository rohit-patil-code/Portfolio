import { Button } from "@/components/ui/button";
import { MapPin, Github, Linkedin } from "lucide-react";
import LeetCodeIcon from "@/components/icons/LeetCodeIcon";

const Hero = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16"
    >
      {/* Animated background gradients */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[100px] animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          {/* Main Heading */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
            Hi, I'm{" "}
            <span className="text-gradient">Rohit Patil</span>
          </h1>

          {/* Description */}
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
            Passionate about full-stack web development and machine learning. I enjoy building scalable applications 
            and exploring how AI can create real-world impact.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button
              variant="hero"
              size="lg"
              onClick={() => scrollToSection("projects")}
              className="w-full sm:w-auto"
            >
              View Projects
            </Button>
            <Button
              variant="heroOutline"
              size="lg"
              onClick={() => scrollToSection("contact")}
              className="w-full sm:w-auto"
            >
              Contact Me
            </Button>
          </div>

          {/* Social Links */}
          <div className="flex gap-6 justify-center">
            <a
              href="https://github.com/rohit-patil-code"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110"
              aria-label="GitHub"
            >
              <Github size={24} />
            </a>
            <a
              href="https://linkedin.com/in/rohitpatil-linkdin"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110"
              aria-label="LinkedIn"
            >
              <Linkedin size={24} />
            </a>
            <a
              href="https://leetcode.com/u/Rohit_patil_/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110"
              aria-label="LeetCode"
            >
              <LeetCodeIcon size={24} />
            </a>
          </div>

          {/* Tech Stack Preview */}
          <div className="mt-16">
            <p className="text-sm text-muted-foreground mb-6">Technologies I use</p>
            <div className="flex flex-wrap gap-3 justify-center max-w-2xl mx-auto">
              {[
                "React.js",
                "Python",
                "Node.js",
                "TailwindCSS",
                "PostgreSQL",
                "Machine Learning",
                "Flask",
                "Solidity",
              ].map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 text-sm bg-secondary/30 backdrop-blur-sm border border-border rounded-lg text-foreground hover:bg-secondary/50 hover:border-primary/50 transition-all duration-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

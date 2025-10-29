import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";

const Projects = () => {
  const projects = [
    {
      title: "AI-Powered Blog Editor",
      description:
        "A full-stack blog editor with React & PostgreSQL featuring AI-writing assistance including summarization, rewriting, grammar correction, and text generation. Uses prompt engineering and caching for efficient LLM responses.",
      tech: ["React", "PostgreSQL", "AI/LLM", "Authentication", "Rich Text Editor"],
      features: [
        "AI-powered writing assistance",
        "Secure authentication system",
        "Responsive UI with rich-text editor",
        "Efficient prompt engineering",
      ],
      github: "#",
      gradient: "from-primary to-accent",
    },
    {
      title: "Ambulance Detection System",
      description:
        "Custom YOLOv5 model that detects ambulance text and medical symbols from webcam feed in real-time. Integrates Google Maps API to find the shortest route to nearby hospitals with live traffic updates.",
      tech: ["Python", "YOLOv5", "Flask", "Google Maps API", "Computer Vision"],
      features: [
        "Real-time ambulance detection",
        "Custom trained YOLO model",
        "Shortest route calculation",
        "Live traffic integration",
      ],
      github: "#",
      gradient: "from-accent to-primary",
    },
    {
      title: "Decentralized NFT Marketplace",
      description:
        "A decentralized marketplace built with React and TailwindCSS featuring MetaMask wallet integration, automatic NFT display on user profiles, IPFS image storage via Pinata, and smart contracts for NFT transactions.",
      tech: ["React", "Solidity", "Ethers.js", "IPFS", "Web3", "TailwindCSS"],
      features: [
        "MetaMask wallet integration",
        "IPFS decentralized storage",
        "Smart contract for NFT trading",
        "Auto-display owned NFTs",
      ],
      github: "#",
      gradient: "from-primary via-accent to-primary",
    },
  ];

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Featured <span className="text-gradient">Projects</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full mb-4"></div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A selection of projects showcasing my skills in full-stack development, machine learning, and blockchain technology
            </p>
          </div>

          {/* Projects Grid */}
          <div className="space-y-8">
            {projects.map((project, idx) => (
              <div
                key={project.title}
                className="group p-6 sm:p-8 bg-card border border-border rounded-2xl card-shadow hover:border-primary/50 transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${idx * 150}ms` }}
              >
                <div className="grid md:grid-cols-3 gap-6">
                  {/* Left: Project Info */}
                  <div className="md:col-span-2 space-y-4">
                    <div>
                      <h3 className="text-2xl font-bold mb-2 group-hover:text-gradient transition-all duration-300">
                        {project.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 text-xs font-medium bg-secondary/50 text-foreground rounded-full border border-border"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Features */}
                    <div className="space-y-2">
                      {project.features.map((feature) => (
                        <div key={feature} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2"></div>
                          <p className="text-sm text-muted-foreground">{feature}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right: Actions & Visual */}
                  <div className="flex flex-col justify-between">
                    {/* Gradient Visual */}
                    <div
                      className={`h-32 rounded-xl bg-gradient-to-br ${project.gradient} opacity-20 group-hover:opacity-30 transition-opacity duration-300 mb-4`}
                    ></div>

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-3">
                      <Button
                        variant="default"
                        className="w-full"
                        onClick={() => window.open(project.github, "_blank")}
                      >
                        <Github size={18} className="mr-2" />
                        View Code
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => window.open(project.github, "_blank")}
                      >
                        <ExternalLink size={18} className="mr-2" />
                        Live Demo
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* More Projects Link */}
          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">
              Want to see more? Check out my GitHub for additional projects
            </p>
            <Button
              variant="heroOutline"
              onClick={() => window.open("https://github.com/rohit-patil-code", "_blank")}
            >
              <Github size={18} className="mr-2" />
              Visit GitHub
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;

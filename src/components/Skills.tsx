import { Code2, Database, Brain, Wrench } from "lucide-react";

const Skills = () => {
  const skillCategories = [
    {
      title: "Frontend & Web",
      icon: Code2,
      color: "primary",
      skills: [
        { name: "React.js", level: 90 },
        { name: "HTML & CSS", level: 95 },
        { name: "TailwindCSS", level: 90 },
        { name: "JavaScript", level: 85 },
      ],
    },
    {
      title: "Backend & Databases",
      icon: Database,
      color: "accent",
      skills: [
        { name: "Python", level: 85 },
        { name: "Java", level: 80 },
        { name: "SQL & PostgreSQL", level: 85 },
        { name: "Node.js", level: 75 },
      ],
    },
    {
      title: "Machine Learning",
      icon: Brain,
      color: "primary",
      skills: [
        { name: "ML Fundamentals", level: 80 },
        { name: "Model Integration", level: 85 },
        { name: "LLM API Usage", level: 90 },
        { name: "Custom Models (YOLO)", level: 75 },
      ],
    },
    {
      title: "Other Technologies",
      icon: Wrench,
      color: "accent",
      skills: [
        { name: "Prompt Engineering", level: 90 },
        { name: "Authentication Systems", level: 85 },
        { name: "Solidity & Web3", level: 70 },
        { name: "IPFS & Ethers.js", level: 75 },
      ],
    },
  ];

  return (
    <section id="skills" className="py-20 bg-secondary/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              My <span className="text-gradient">Skills</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full mb-4"></div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A comprehensive overview of the technologies and tools I work with to build modern, scalable applications
            </p>
          </div>

          {/* Skills Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {skillCategories.map((category, idx) => {
              const Icon = category.icon;
              return (
                <div
                  key={category.title}
                  className="p-6 bg-card border border-border rounded-2xl card-shadow hover:border-primary/50 transition-all duration-300 animate-fade-in-up"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`p-3 bg-${category.color}/10 rounded-lg`}>
                      <Icon className={`text-${category.color}`} size={24} />
                    </div>
                    <h3 className="text-xl font-bold">{category.title}</h3>
                  </div>

                  <div className="space-y-4">
                    {category.skills.map((skill) => (
                      <div key={skill.name}>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium text-foreground">{skill.name}</span>
                          <span className="text-sm text-muted-foreground">{skill.level}%</span>
                        </div>
                        <div className="h-2 bg-secondary rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-1000 ease-out"
                            style={{ width: `${skill.level}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Additional Info */}
          <div className="mt-12 text-center">
            <p className="text-muted-foreground">
              Always learning and exploring new technologies to stay at the forefront of web development and AI
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;

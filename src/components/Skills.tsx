import { Code2, Database, Brain, Wrench } from "lucide-react";

const Skills = () => {
  const skillCategories = [
    {
      title: "Frontend & Web",
      icon: Code2,
      color: "primary",
      skills: [
        { name: "React.js" },
        { name: "HTML & CSS" },
        { name: "TailwindCSS" },
        { name: "JavaScript" },
      ],
    },
    {
      title: "Backend & Databases",
      icon: Database,
      color: "accent",
      skills: [
        { name: "Python" },
        { name: "Java" },
        { name: "SQL & PostgreSQL" },
        { name: "Node.js" },
      ],
    },
    {
      title: "Machine Learning",
      icon: Brain,
      color: "primary",
      skills: [
        { name: "ML Fundamentals" },
        { name: "Model Integration" },
        { name: "LLM API Usage" },
        { name: "Custom Models (YOLO)" },
      ],
    },
    {
      title: "Others",
      icon: Wrench,
      color: "accent",
      skills: [
        { name: "OOPs" },
        { name: "System Design" },
        { name: "Operating Systems" },
        { name: "DBMS" },
        { name: "Computer Networks" },
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

                  <div className="flex flex-wrap gap-3">
                    {category.skills.map((skill) => (
                      <div
                        key={skill.name}
                        className="px-4 py-2 bg-secondary/50 border border-border rounded-lg text-sm font-medium hover:border-primary/50 transition-colors"
                      >
                        {skill.name}
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

import { GraduationCap, Code, Brain, Sparkles } from "lucide-react";

const About = () => {
  return (
    <section id="about" className="py-20 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              About <span className="text-gradient">Me</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full"></div>
          </div>

          {/* Content */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left: Bio */}
            <div className="space-y-6 animate-fade-in-up">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <GraduationCap className="text-primary" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Education</h3>
                  <p className="text-muted-foreground">
                    Fourth-year Computer Science Engineering student at BMSIT, graduating in 2026
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Code className="text-primary" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Development Focus</h3>
                  <p className="text-muted-foreground">
                    Specialized in building full-stack web applications with modern technologies like React, Node.js, 
                    and PostgreSQL
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Brain className="text-primary" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">AI & Machine Learning</h3>
                  <p className="text-muted-foreground">
                    Enthusiast in ML and AI applications, with experience in integrating LLMs and building custom 
                    detection models
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Sparkles className="text-primary" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Passion & Approach</h3>
                  <p className="text-muted-foreground">
                    Driven by curiosity and problem-solving. I believe in hands-on learning and building 
                    practical solutions that make a real-world impact
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Summary Card */}
            <div className="animate-fade-in-up delay-200">
              <div className="p-8 bg-card border border-border rounded-2xl card-shadow hover:border-primary/50 transition-all duration-300">
                <h3 className="text-2xl font-bold mb-4">Who I Am</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  I'm a fourth-year Computer Science student with a passion for creating innovative solutions 
                  through code. My journey in tech started with curiosity about how things work, and has evolved 
                  into a deep love for full-stack development and machine learning.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  I thrive on challenges that push me to learn new technologies and methodologies. Whether it's 
                  building a sophisticated web application, training a custom ML model, or exploring blockchain 
                  technology, I'm always eager to expand my skillset.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  My goal is to become a skilled software engineer who can bridge the gap between innovative 
                  ideas and practical, scalable solutions. I'm particularly interested in how AI can be 
                  leveraged to solve real-world problems and improve user experiences.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

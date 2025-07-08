
import { useEffect, useRef, useState } from 'react';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-20 bg-white/50">
      <div className="container mx-auto px-6">
        <div className={`transition-all duration-1000 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            About <span className="gradient-text">Me</span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="space-y-6">
              <div className="text-lg text-gray-700 leading-relaxed">
                <p className="mb-6">
                  Hello! I'm MD Amaan, a dedicated software engineer with a passion for creating innovative digital solutions. My journey in technology started with curiosity and has evolved into a career focused on building exceptional user experiences.
                </p>
                <p className="mb-6">
                  I specialize in full-stack development, with expertise in modern web technologies including React, TypeScript, Node.js, and cloud platforms. I believe in writing clean, maintainable code and staying updated with the latest industry trends.
                </p>
                <p>
                  When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, or sharing knowledge with the developer community. I'm always excited to take on new challenges and collaborate on meaningful projects.
                </p>
              </div>
              
              <div className="flex flex-wrap gap-3 mt-8">
                {['React', 'TypeScript', 'Node.js', 'Python', 'AWS', 'Docker'].map((skill, index) => (
                  <span 
                    key={skill}
                    className="px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 rounded-full text-sm font-medium transform hover:scale-105 transition-all duration-300"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="w-80 h-80 mx-auto relative">
                <div className="w-full h-full bg-gradient-to-br from-purple-400 via-pink-400 to-purple-600 rounded-3xl transform rotate-6 absolute"></div>
                <div className="w-full h-full bg-gradient-to-br from-purple-500 via-pink-500 to-purple-700 rounded-3xl transform -rotate-6 absolute shadow-2xl flex items-center justify-center">
                  <div className="text-6xl text-white">👨‍💻</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

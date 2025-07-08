
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
                  Hello! I'm MD Amaan, a backend-focused software engineer passionate about building scalable, high-performance digital systems. My journey in tech began with curiosity and evolved into a strong dedication to backend development, open-source contribution, and technical education.  </p>
                <p className="mb-6">
                  I specialize in building robust backend services and RESTful APIs using Golang, Node.js, and Java, with a strong command over both SQL and NoSQL databases. I’ve contributed to meaningful projects like implementing EIP-7732 at Prysmatic Labs, and have experience optimizing performance, writing comprehensive unit/integration tests, and modernizing Go applications.   </p>
                <p>
                  Alongside backend engineering, I’ve also developed full-stack projects using Next.js and Solidity, and actively share knowledge through technical writing and campus blockchain sessions with The Graph India Foundation  </p>
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

            <div className="relative flex justify-center">
              <style>
                {`
                  @keyframes floatGlow {
                    0%, 100% {
                      transform: scale(1.1);
                      opacity: 0.6;
                    }
                    50% {
                      transform: scale(1.25);
                      opacity: 1;
                    }
                  }
               `}
              </style>
              <div className="relative flex justify-center">
                <div className="relative w-80 h-80">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500/60 via-pink-500/60 to-purple-700/60 blur-[100px] scale-125 z-0 animate-[floatGlow_4s_ease-in-out_infinite]"></div>
                  <div className="relative z-10 w-full h-full rounded-full overflow-hidden shadow-2xl border-4 border-white">
                    <img
                      src="/lovable-uploads/4c6afaa3-4ec2-4730-a31d-0bc901baf70b.png"
                      alt="MD Amaan - Software Engineer"
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
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

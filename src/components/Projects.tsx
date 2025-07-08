
import { useEffect, useRef, useState } from 'react';

const Projects = () => {
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

  const projects = [
    {
      title: 'Tonelli Shanks Algorithm - Rust',
      description: 'Rust implementation of the Tonelli-Shanks Algorithm for computing square roots in finite fields. A mathematical computational project demonstrating advanced algorithmic implementations.',
      tech: ['Rust', 'Algorithm', 'Mathematics', 'Cryptography'],
      image: '🦀',
      link: 'https://github.com/Redidacove/Tonelli_shanks_Algo_Rust'
    },
    {
      title: 'Prysm - Ethereum Client',
      description: 'Forked Go implementation of Ethereum proof of stake. Contributing to Ethereum consensus layer development and blockchain infrastructure.',
      tech: ['Go', 'Ethereum', 'Blockchain', 'Consensus'],
      image: '⛓️',
      link: 'https://github.com/Redidacove/prysm'
    },
    {
      title: 'Ethereum Consensus Specs',
      description: 'Fork of Ethereum Proof-of-Stake Consensus Specifications. Working on understanding and contributing to Ethereum\'s core consensus mechanisms.',
      tech: ['Python', 'Ethereum', 'Specifications', 'Research'],
      image: '📋',
      link: 'https://github.com/Redidacove/consensus-specs'
    },
    {
      title: 'File Transfer Tool',
      description: 'Go-based file transfer application for efficient and secure file sharing. Demonstrates systems programming and network communication skills.',
      tech: ['Go', 'Networking', 'File Systems', 'CLI'],
      image: '📁',
      link: 'https://github.com/Redidacove/file_transfer'
    },
    {
      title: 'JSON API Server',
      description: 'RESTful API server built in Go for handling JSON data operations. Clean architecture with proper HTTP handling and data management.',
      tech: ['Go', 'REST API', 'JSON', 'HTTP'],
      image: '🔗',
      link: 'https://github.com/Redidacove/json-api'
    },
    {
      title: 'Quiz CLI Application',
      description: 'Command-line quiz application built in Go. Interactive terminal-based game with scoring system and user-friendly interface.',
      tech: ['Go', 'CLI', 'Terminal UI', 'Games'],
      image: '🎯',
      link: 'https://github.com/Redidacove/Quiz_Cli_Go'
    }
  ];

  return (
    <section id="projects" ref={sectionRef} className="py-20 bg-white/50">
      <div className="container mx-auto px-6">
        <div className={`transition-all duration-1000 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          
          <div className="space-y-8 max-w-6xl mx-auto">
            {projects.map((project, index) => (
              <div 
                key={project.title}
                className={`group flex flex-col lg:flex-row items-center gap-8 p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-500 border border-purple-100 ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="lg:w-1/3">
                  <div className="w-48 h-48 mx-auto bg-gradient-to-br from-purple-400 via-pink-400 to-purple-600 rounded-2xl flex items-center justify-center text-6xl transform group-hover:scale-105 transition-transform duration-300 shadow-xl">
                    {project.image}
                  </div>
                </div>
                
                <div className="lg:w-2/3 space-y-4">
                  <h3 className="text-2xl font-bold text-gray-800 group-hover:text-primary transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span 
                        key={tech}
                        className="px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 rounded-full text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4 pt-4">
                    <a 
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transform hover:scale-105 transition-all duration-300 inline-block"
                    >
                      View Project
                    </a>
                    <a 
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-primary hover:text-primary transform hover:scale-105 transition-all duration-300 inline-block"
                    >
                      Source Code
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;

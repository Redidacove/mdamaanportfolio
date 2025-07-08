
import { useEffect, useRef, useState } from 'react';

const Hobbies = () => {
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

  const hobbies = [
    {
      icon: '🎮',
      title: 'Gaming',
      description: 'Love exploring virtual worlds and competitive gaming'
    },
    {
      icon: '📚',
      title: 'Reading',
      description: 'Tech blogs, sci-fi novels, and continuous learning'
    },
    {
      icon: '🏃‍♂️',
      title: 'Fitness',
      description: 'Running, cycling, and maintaining a healthy lifestyle'
    },
    {
      icon: '📷',
      title: 'Photography',
      description: 'Capturing moments and exploring creative perspectives'
    },
    {
      icon: '🎵',
      title: 'Music',
      description: 'Listening to various genres and discovering new artists'
    },
    {
      icon: '✈️',
      title: 'Travel',
      description: 'Exploring new places and experiencing different cultures'
    }
  ];

  return (
    <section id="hobbies" ref={sectionRef} className="py-20">
      <div className="container mx-auto px-6">
        <div className={`transition-all duration-1000 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            Hobbies & <span className="gradient-text">Interests</span>
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {hobbies.map((hobby, index) => (
              <div 
                key={hobby.title}
                className="group bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-purple-100"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {hobby.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">
                  {hobby.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {hobby.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hobbies;

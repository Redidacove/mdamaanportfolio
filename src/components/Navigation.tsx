
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = ['hero', 'about', 'hobbies', 'projects', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'hobbies', label: 'Hobbies' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      isScrolled 
        ? "glass-effect shadow-lg py-4" 
        : "bg-transparent py-6"
    )}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        <div className="text-2xl font-bold gradient-text">
          MD Amaan
        </div>
        
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={cn(
                "text-sm font-medium transition-all duration-300 hover:text-primary",
                activeSection === item.id 
                  ? "text-primary border-b-2 border-primary pb-1" 
                  : "text-gray-600 hover:text-primary"
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
        
        <button className="md:hidden p-2">
          <div className="w-6 h-6 flex flex-col justify-between">
            <span className="w-full h-0.5 bg-gray-600"></span>
            <span className="w-full h-0.5 bg-gray-600"></span>
            <span className="w-full h-0.5 bg-gray-600"></span>
          </div>
        </button>
      </div>
    </nav>
  );
};

export default Navigation;

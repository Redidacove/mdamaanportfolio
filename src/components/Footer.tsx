import githubIcon from '../assets/github.jpg';
import twitterIcon from '../assets/x.png';
import linkedIcon from '../assets/linkedin.png';
import mediumIcon from '../assets/medium.png';
import gmailIcon from '../assets/gmail.png';

const Footer = () => {
  const socialLinks = [
    { name: 'GitHub', icon: githubIcon, url: 'https://github.com/Redidacove' },
    { name: 'LinkedIn', icon: linkedIcon, url: 'https://www.linkedin.com/in/md-amaan-305010229' },
    { name: 'Twitter', icon: twitterIcon, url: 'https://twitter.com/0xmdamaan' },
    { name: 'Medium', icon: mediumIcon, url: 'https://medium.com/@md.amaan.cse25' },
    { name: 'Email', icon: gmailIcon, url: 'mailto:mdamaan2xx1@gmail.com' }
  ];

  return (
    <footer className="bg-gradient-to-r from-gray-900 via-purple-900 to-pink-900 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="text-center">
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-4">Thanks for visiting!</h3>
            <p className="text-gray-300 max-w-2xl mx-auto">
              If you made it this far, you're pretty awesome! 🎉
              I'd love to connect and hear about what you're working on.
              Hit me up on any of these platforms:
            </p>
          </div>

          <div className="flex justify-center space-x-6 mb-8">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                className="group flex flex-col items-center space-y-2 p-4 rounded-lg hover:bg-white/10 transition-all duration-300 transform hover:scale-110"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="text-2xl group-hover:scale-125 transition-transform duration-300">
                  {typeof link.icon === 'string' && link.icon.startsWith('http') || link.icon.startsWith('/') ? (
                    <img src={link.icon} alt={link.name} className="w-8 h-8 rounded-full" />
                  ) : typeof link.icon === 'string' && link.icon.length === 1 ? (
                    <span>{link.icon}</span>
                  ) : (
                    <img src={link.icon} alt={link.name} className="w-8 h-8 rounded-full" />
                  )}
                </div>
                <span className="text-sm text-gray-300 group-hover:text-white">
                  {link.name}
                </span>
              </a>
            ))}
          </div>

          <div className="border-t border-gray-700 pt-6">
            <p className="text-gray-400 text-sm">
              © 2024 MD Amaan
            </p>
            <p className="text-gray-500 text-xs mt-2">
              Built with React, TypeScript & Tailwind CSS
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

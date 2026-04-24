import { useState, useEffect, useRef, FormEvent } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { 
  Cpu, 
  Plane, 
  Code, 
  Mail, 
  MessageCircle, 
  Instagram, 
  Github, 
  Linkedin, 
  ExternalLink, 
  ChevronRight, 
  Menu, 
  X, 
  Zap, 
  Layers, 
  Terminal,
  Award,
  Briefcase
} from 'lucide-react';
import Typewriter from 'typewriter-effect';
import { useInView } from 'react-intersection-observer';

// --- Content Configuration (Edit these values to change the website content) ---

const PROFILE_NAME = "TAMIL SELVAN M";
const TAGLINE_STRINGS = ['ECE Student', 'NCC Air Force Cadet', 'Embedded Systems Builder', 'IoT Innovator', 'Aerospace Enthusiast'];
const EMAIL = "tamilaviate@gmail.com";
const WHATSAPP = "+91 6383503875";
const INSTAGRAM_URL = "https://www.instagram.com/myself.albatross?igsh=MTVlYzg0bmpua3g2bA==";
const WHATSAPP_URL = "https://wa.me/message/JWI53JFQM4BJH1";
const GITHUB_URL = "https://github.com/tamil-selvan-eng";
const LINKEDIN_URL = "https://www.linkedin.com/in/tamil-selvan-m-742b0b2a1";

const NAV_LINKS = [
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Certifications', href: '#certifications' },
  { name: 'Contact', href: '#contact' },
];

const SKILL_BARS = [
  { label: 'Discipline', value: 95, color: 'bg-neon-blue' },
  { label: 'Leadership', value: 90, color: 'bg-neon-purple' },
  { label: 'Innovation', value: 88, color: 'bg-neon-blue' },
  { label: 'Teamwork', value: 92, color: 'bg-neon-purple' },
];

const SKILL_GROUPS = [
  {
    title: "Embedded Systems",
    icon: <Cpu className="w-6 h-6 text-neon-blue" />,
    skills: ["ESP32", "Arduino", "MAX30102", "DHT11", "GPS Module", "LoRa / LoRaWAN"]
  },
  {
    title: "Programming",
    icon: <Terminal className="w-6 h-6 text-neon-purple" />,
    skills: ["Python (Basic)", "JavaScript (Node.js)", "Arduino C", "Verilog", "MATLAB"]
  },
  {
    title: "Web & Cloud",
    icon: <Code className="w-6 h-6 text-neon-blue" />,
    skills: ["HTML", "CSS", "Tailwind CSS", "Firebase (Firestore, Auth)", "Web Deployment"]
  },
  {
    title: "Design & CAD",
    icon: <Layers className="w-6 h-6 text-neon-purple" />,
    skills: ["Fusion 360", "Parametric Modelling", "Exploded View", "Sectional Analysis"]
  },
  {
    title: "Aerospace",
    icon: <Plane className="w-6 h-6 text-neon-blue" />,
    skills: ["Aircraft Propulsion", "Ramjet / Turbofan Thermodynamics", "Fluid Mechanics"]
  },
  {
    title: "Soft Skills",
    icon: <Zap className="w-6 h-6 text-neon-purple" />,
    skills: ["Leadership", "Critical Thinking", "Problem-Solving", "Technical Writing", "Cross-functional Teamwork"]
  }
];

const PROJECTS = [
  {
    title: "Soldier Health Monitoring & Position Tracking",
    category: "IoT / Embedded · LoRaWAN",
    desc: "End-to-end IoT system using LoRaWAN to remotely monitor soldiers' vitals (heart rate, SpO₂, body temperature) and real-time GPS location.",
    fullDesc: "Built an end-to-end IoT system to remotely monitor soldiers' vitals (heart rate, SpO₂, body temperature) and real-time GPS location using LoRaWAN long-range wireless communication. Programmed ESP32 microcontrollers for multi-sensor fusion (MAX30102, DHT11, GPS) with LoRa transmission; developed a Node.js gateway and a military-style real-time web dashboard. Achieved stable long-range data transmission and documented the complete system in a self-published technical article.",
    features: [
      "Real-time heart rate, SpO₂ & body temperature monitoring via MAX30102 & DHT11",
      "GPS position tracking with LoRa SX1278 long-range transmission",
      "ESP32 multi-sensor fusion with Arduino C firmware",
      "Node.js gateway & military-style real-time web dashboard",
      "Self-published technical article documenting the full system"
    ],
    tags: ["ESP32", "LoRaWAN", "Node.js", "Arduino C", "IoT", "GPS"],
    liveLink: "https://tamil-selvan-eng.github.io/jounal-article"
  },
  {
    title: "Ramjet Engine Design & Simulation",
    category: "Aerospace / CAD · Propulsion",
    desc: "Fully parametric 3D model of a Ramjet Engine in Fusion 360, covering intake, combustion chamber, and nozzle components with performance analysis.",
    fullDesc: "Designed a fully parametric 3D model of a Ramjet Engine in Fusion 360, covering intake, combustion chamber, and nozzle components. Created exploded and sectional view diagrams to visualise internal airflow paths and propulsion system architecture. Conducted a performance study analysing key propulsion parameters including thrust, specific impulse, and overall efficiency.",
    features: [
      "Fully parametric 3D model covering intake, combustion chamber & nozzle",
      "Exploded and sectional view diagrams for airflow visualisation",
      "Performance study: thrust, specific impulse & overall efficiency analysis",
      "Domains: Aerospace Propulsion, Thermodynamics, Fluid Mechanics",
      "Tool: Autodesk Fusion 360"
    ],
    tags: ["Fusion 360", "Propulsion", "Thermodynamics", "Fluid Mechanics", "CAD"]
  },
  {
    title: "GrowthTrack – Habit Tracker Web App",
    category: "Web / Firebase · Full-Stack",
    desc: "Full-stack Firebase web application with multi-provider authentication (Google, Email, Phone OTP) and secure per-user data isolation for habit tracking.",
    fullDesc: "Developed a full-stack Firebase web application with multi-provider authentication (Google, Email, Phone OTP) and secure per-user data isolation. Implemented a real-time habit and skill tracking system using Firestore, featuring a fully responsive, mobile-friendly UI built with Tailwind CSS. Deployed on Firebase Hosting with live data sync.",
    features: [
      "Multi-provider auth: Google, Email & Phone OTP via Firebase Auth",
      "Secure per-user data isolation with Firestore",
      "Real-time habit & skill tracking with live data sync",
      "Fully responsive, mobile-friendly UI with Tailwind CSS",
      "Deployed on Firebase Hosting"
    ],
    tags: ["Firebase", "Firestore", "Tailwind CSS", "JavaScript", "Web App"],
    liveLink: "https://growth-track-4fc9f.web.app"
  }
];

const TIMELINE = [
  {
    title: "Aircraft Propulsion Intern",
    org: "Dwello Aerospace Company",
    date: "July 2025",
    desc: "Contributed to research and analysis of propulsion systems for aerospace applications, focusing on ramjet and turbofan engine architectures. Studied thermodynamics and fluid mechanics concepts relevant to high-speed propulsion and assisted the design team with preliminary performance calculations.",
    icon: <Plane className="w-5 h-5" />
  },
  {
    title: "Digital Electronics & VLSI Intern",
    org: "Codec Technologies",
    date: "June 2025",
    desc: "Gained hands-on exposure to digital circuit design and VLSI fundamentals in a professional lab environment. Supported engineering workflows through documentation, data verification, and active learning of VLSI design methodologies.",
    icon: <Cpu className="w-5 h-5" />
  },
  {
    title: "NCC Cadet – 5 TN AIR SQN TECH",
    org: "National Cadet Corps (NCC)",
    date: "2022 – 2026",
    desc: "Completed Air Force cadet training with a focus on leadership, discipline, navigation, and decision-making under pressure. Participated in community service initiatives and inter-squadron activities that strengthened teamwork and situational awareness.",
    icon: <Award className="w-5 h-5" />
  },
  {
    title: "B.E. Electronics & Communication Engineering",
    org: "PGP College of Engineering & Technology, Namakkal · Anna University",
    date: "2022 – 2026",
    desc: "Pursuing a Bachelor of Engineering in ECE with focus on embedded systems, IoT, VLSI, and aerospace propulsion. Maintaining strong academic performance while leading technical and extracurricular projects.",
    icon: <Briefcase className="w-5 h-5" />
  }
];

const CERTIFICATIONS = [
  {
    title: "GE Aerospace Explore Engineering Programme",
    desc: "Aerospace systems, propulsion, and engineering mindset"
  },
  {
    title: "Ford Motor Company – EV Engineering Virtual Experience",
    desc: "Powertrain & battery systems"
  },
  {
    title: "Accenture – Data Analytics & Visualisation",
    desc: "Python, data storytelling, dashboard design"
  },
  {
    title: "Tata Consultancy Services – Cybersecurity Virtual Experience",
    desc: "Threat modelling, IAM, SOC basics"
  }
];

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'glass py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-bold bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent"
        >
          {PROFILE_NAME}
        </motion.div>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-8">
          {NAV_LINKS.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="text-sm font-medium hover:text-neon-blue transition-colors"
            >
              {link.name}
            </motion.a>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass overflow-hidden"
          >
            <div className="flex flex-col p-6 space-y-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-lg hover:text-neon-blue transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-animate opacity-30 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-neon-blue font-mono mb-4 tracking-widest uppercase text-sm">Welcome to my universe</h2>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Hi, I'm <br />
            <span className="text-neon-purple neon-text-purple">{PROFILE_NAME}</span>
          </h1>
          
          <div className="text-xl md:text-2xl text-gray-400 mb-8 h-12">
            <Typewriter
              options={{
                strings: TAGLINE_STRINGS,
                autoStart: true,
                loop: true,
                wrapperClassName: "text-neon-blue font-mono",
                cursorClassName: "typing-cursor"
              }}
            />
          </div>

          <div className="flex flex-wrap gap-4">
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-neon-blue text-black font-bold rounded-full neon-border-blue hover:bg-white transition-all"
            >
              View Projects
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 border border-neon-purple text-neon-purple font-bold rounded-full hover:bg-neon-purple/10 transition-all"
            >
              Contact Me
            </motion.a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative flex justify-center"
        >
          <div className="relative w-64 h-64 md:w-80 md:h-80">
            <div className="absolute inset-0 rounded-full border-2 border-neon-blue animate-pulse neon-border-blue" />
            <div className="absolute inset-4 rounded-full border-2 border-neon-purple animate-ping opacity-20" />
            <img 
              src="https://picsum.photos/seed/engineer/400/400" 
              alt="Profile" 
              className="w-full h-full object-cover rounded-full border-4 border-dark-bg p-2 grayscale hover:grayscale-0 transition-all duration-500"
              referrerPolicy="no-referrer"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const About = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section id="about" className="py-24 bg-black/50">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="grid md:grid-cols-2 gap-16 items-center"
        >
          <div>
            <h2 className="text-4xl font-bold mb-8 flex items-center">
              <span className="text-neon-blue mr-4">01.</span> About Me
            </h2>
            <div className="space-y-6 text-gray-400 text-lg leading-relaxed">
              <p>
                I am an <span className="text-white font-semibold">Electronics and Communication Engineering</span> student with hands-on experience in <span className="text-neon-blue">embedded systems</span>, <span className="text-neon-purple">IoT</span>, and <span className="text-white">aerospace propulsion</span>. Skilled in designing end-to-end engineering solutions — from LoRaWAN-based real-time health monitoring hardware to cloud-connected web applications.
              </p>
              <p>
                As an <span className="text-white font-semibold">NCC Air Force cadet</span>, I bring demonstrated leadership, discipline, and mission-focused thinking. Eager to contribute technical depth and a fast-learning mindset to a forward-thinking engineering team.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="flex items-center space-x-3">
                  <Plane className="text-neon-blue w-5 h-5" />
                  <span>Aerospace & IoT</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Cpu className="text-neon-purple w-5 h-5" />
                  <span>Embedded Systems</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Code className="text-neon-blue w-5 h-5" />
                  <span>Web & Cloud</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Zap className="text-neon-purple w-5 h-5" />
                  <span>NCC Air Wing</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            {SKILL_BARS.map((skill) => (
              <div key={skill.label} className="glass p-6 rounded-2xl">
                <h4 className="text-sm font-mono mb-2">{skill.label}</h4>
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${skill.value}%` } : {}}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className={`h-full ${skill.color}`}
                  />
                </div>
                <span className="text-xs mt-2 block text-right opacity-50">{skill.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Skills = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="skills" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Technical Arsenal</h2>
          <div className="h-1 w-20 bg-neon-blue mx-auto rounded-full" />
        </div>

        <div ref={ref} className="grid md:grid-cols-3 gap-8">
          {SKILL_GROUPS.map((group, i) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              className="glass p-8 rounded-3xl hover:border-neon-blue/50 transition-all group"
            >
              <div className="mb-6 p-3 bg-white/5 w-fit rounded-xl group-hover:neon-border-blue transition-all">
                {group.icon}
              </div>
              <h3 className="text-xl font-bold mb-6">{group.title}</h3>
              <div className="flex flex-wrap gap-3">
                {group.skills.map((skill) => (
                  <span key={skill} className="px-4 py-2 bg-white/5 rounded-lg text-sm hover:bg-neon-blue/20 hover:text-neon-blue transition-all cursor-default">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ProjectModal = ({ project, onClose }: { project: any, onClose: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6"
    >
      {/* Backdrop with blur */}
      <motion.div 
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative w-full max-w-2xl glass rounded-3xl overflow-hidden neon-border-blue"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 glass rounded-xl hover:text-neon-blue transition-all z-10"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-8 md:p-12 overflow-y-auto max-h-[90vh]">
          <span className="text-xs font-mono text-neon-purple mb-2 block uppercase tracking-widest">{project.category}</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-neon-blue">{project.title}</h2>
          
          <div className="space-y-8">
            <div>
              <h4 className="text-sm font-mono text-gray-500 uppercase mb-3">Description</h4>
              <p className="text-gray-300 leading-relaxed text-lg">
                {project.fullDesc}
              </p>
            </div>

            <div>
              <h4 className="text-sm font-mono text-gray-500 uppercase mb-3">Key Features</h4>
              <ul className="grid md:grid-cols-2 gap-3">
                {project.features.map((feature: string, i: number) => (
                  <li key={i} className="flex items-start space-x-3 text-gray-400 text-sm">
                    <Zap className="w-4 h-4 text-neon-purple shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-mono text-gray-500 uppercase mb-3">Technologies</h4>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag: string) => (
                  <span key={tag} className="px-3 py-1 bg-neon-blue/10 text-neon-blue rounded-lg text-xs font-mono border border-neon-blue/20">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

              {project.liveLink && (
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex items-center space-x-2 px-6 py-3 bg-neon-blue/10 border border-neon-blue/30 text-neon-blue rounded-xl hover:bg-neon-blue hover:text-black font-bold transition-all"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>View Live</span>
                </a>
              )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<any>(null);

  return (
    <section id="projects" className="py-24 bg-black/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-end mb-16">
          <div>
            <h2 className="text-4xl font-bold mb-4">Featured Projects</h2>
            <p className="text-gray-400">A glimpse into my engineering endeavors</p>
          </div>
          <motion.button 
            whileHover={{ x: 5 }}
            className="text-neon-blue flex items-center space-x-2 font-mono text-sm"
          >
            <span>View All</span>
            <ChevronRight className="w-4 h-4" />
          </motion.button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {PROJECTS.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              onClick={() => setSelectedProject(project)}
              className="group relative glass rounded-3xl overflow-hidden cursor-pointer hover:neon-border-blue transition-all duration-300"
            >
              <div className="p-8">
                <span className="text-xs font-mono text-neon-purple mb-2 block">{project.category}</span>
                <h3 className="text-xl font-bold mb-4 group-hover:text-neon-blue transition-colors">{project.title}</h3>
                <p className="text-gray-400 text-sm mb-6 line-clamp-3">{project.desc}</p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-[10px] uppercase tracking-wider px-2 py-1 bg-white/5 rounded border border-white/10">{tag}</span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <div className="flex-1 py-3 border border-white/10 rounded-xl group-hover:bg-white group-hover:text-black font-bold transition-all flex items-center justify-center space-x-2">
                    <span>View Details</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                  {project.liveLink && (
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-3 border border-neon-blue/30 text-neon-blue rounded-xl hover:bg-neon-blue hover:text-black transition-all flex items-center justify-center"
                      title="View Live"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
          />
        )}
      </AnimatePresence>
    </section>
  );
};

const Certifications = () => {
  return (
    <section id="certifications" className="py-24 bg-black/30">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Certifications</h2>
          <div className="h-1 w-20 bg-neon-purple mx-auto rounded-full" />
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {CERTIFICATIONS.map((cert, i) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass p-6 rounded-2xl flex items-start space-x-4 hover:neon-border-purple transition-all group"
            >
              <div className="p-3 bg-neon-purple/10 rounded-xl shrink-0 group-hover:bg-neon-purple/20 transition-all">
                <Award className="w-5 h-5 text-neon-purple" />
              </div>
              <div>
                <h3 className="font-bold text-white mb-1">{cert.title}</h3>
                <p className="text-sm text-gray-400">{cert.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Experience = () => {
  return (
    <section id="experience" className="py-24">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-4xl font-bold mb-16 text-center">My Journey</h2>
        
        <div className="relative space-y-12">
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-neon-blue via-neon-purple to-transparent opacity-30" />
          
          {TIMELINE.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="relative pl-20"
            >
              <div className="absolute left-0 top-0 w-16 h-16 glass rounded-2xl flex items-center justify-center text-neon-blue neon-border-blue z-10">
                {item.icon}
              </div>
              <div className="glass p-8 rounded-3xl">
                <span className="text-xs font-mono text-neon-purple mb-1 block">{item.date}</span>
                <h3 className="text-xl font-bold mb-1">{item.title}</h3>
                <h4 className="text-sm text-gray-400 mb-4">{item.org}</h4>
                <p className="text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormState({ name: '', email: '', message: '' });
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 bg-black/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-4xl font-bold mb-8">Get In Touch</h2>
            <p className="text-gray-400 text-lg mb-12">
              Have a project in mind or just want to talk about aviation and electronics? Feel free to reach out!
            </p>
            
            <div className="space-y-8">
              <a href={`mailto:${EMAIL}`} className="flex items-center space-x-6 group">
                <div className="w-14 h-14 glass rounded-2xl flex items-center justify-center group-hover:neon-border-blue transition-all">
                  <Mail className="text-neon-blue w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-mono text-gray-500 uppercase">Email</h4>
                  <p className="text-lg font-bold">{EMAIL}</p>
                </div>
              </a>
              
              <a href={`https://wa.me/${WHATSAPP.replace(/\D/g, '')}`} target="_blank" rel="noreferrer" className="flex items-center space-x-6 group">
                <div className="w-14 h-14 glass rounded-2xl flex items-center justify-center group-hover:neon-border-purple transition-all">
                  <MessageCircle className="text-neon-purple w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-mono text-gray-500 uppercase">WhatsApp</h4>
                  <p className="text-lg font-bold">{WHATSAPP}</p>
                </div>
              </a>
            </div>
          </div>

          <motion.form 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass p-10 rounded-3xl space-y-6"
            onSubmit={handleSubmit}
          >
            <div>
              <label className="block text-sm font-mono mb-2 opacity-50">Name</label>
              <input 
                type="text" 
                required
                value={formState.name}
                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-neon-blue transition-all"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-mono mb-2 opacity-50">Email</label>
              <input 
                type="email" 
                required
                value={formState.email}
                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-neon-blue transition-all"
                placeholder="john@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-mono mb-2 opacity-50">Message</label>
              <textarea 
                rows={4}
                required
                value={formState.message}
                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-neon-blue transition-all resize-none"
                placeholder="Your message here..."
              />
            </div>
            <button 
              disabled={isSubmitting}
              className={`w-full py-4 bg-gradient-to-r from-neon-blue to-neon-purple text-black font-bold rounded-xl hover:opacity-90 transition-all flex items-center justify-center space-x-2 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? (
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-black border-t-transparent rounded-full"
                />
              ) : isSubmitted ? (
                <span>Message Sent!</span>
              ) : (
                <span>Send Message</span>
              )}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  const socialLinks = [
    { icon: <Instagram className="w-5 h-5" />, href: INSTAGRAM_URL, color: 'hover:text-neon-purple hover:neon-border-purple' },
    { icon: <Linkedin className="w-5 h-5" />, href: LINKEDIN_URL, color: 'hover:text-neon-blue hover:neon-border-blue' },
    { icon: <Github className="w-5 h-5" />, href: GITHUB_URL, color: 'hover:text-neon-purple hover:neon-border-purple' },
    { icon: <MessageCircle className="w-5 h-5" />, href: WHATSAPP_URL, color: 'hover:text-neon-blue hover:neon-border-blue' },
  ];

  return (
    <footer className="py-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-xl font-bold bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
          {PROFILE_NAME}
        </div>
        
        <div className="flex space-x-6">
          {socialLinks.map((social, i) => (
            <motion.a 
              key={i} 
              href={social.href} 
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, y: -5 }}
              whileTap={{ scale: 0.9 }}
              className={`p-3 glass rounded-xl transition-all duration-300 ${social.color}`}
            >
              {social.icon}
            </motion.a>
          ))}
        </div>
        
        <p className="text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} {PROFILE_NAME}. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      const target = e.target as HTMLElement;
      if (target) {
        const cursor = window.getComputedStyle(target).cursor;
        setIsPointer(cursor === 'pointer');
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9999] mix-blend-screen hidden md:block"
      animate={{
        x: position.x - 16,
        y: position.y - 16,
        scale: isPointer ? 2.5 : 1,
        backgroundColor: isPointer ? 'rgba(188, 19, 254, 0.3)' : 'rgba(0, 242, 255, 0.3)',
      }}
      transition={{ type: 'spring', damping: 20, stiffness: 250, mass: 0.5 }}
    >
      <div className="absolute inset-0 rounded-full blur-xl bg-inherit" />
    </motion.div>
  );
};

const LoadingScreen = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 z-[100] bg-dark-bg flex items-center justify-center"
    >
      <div className="relative">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-24 h-24 border-t-2 border-neon-blue rounded-full"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className="absolute inset-2 border-b-2 border-neon-purple rounded-full"
        />
        <div className="absolute inset-0 flex items-center justify-center font-mono text-[10px] text-neon-blue animate-pulse">
          INIT...
        </div>
      </div>
    </motion.div>
  );
};

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative">
      <AnimatePresence>
        {isLoading && <LoadingScreen />}
      </AnimatePresence>

      <CustomCursor />
      
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-neon-blue to-neon-purple z-[60] origin-left"
        style={{ scaleX }}
      />

      <Navbar />
      
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Certifications />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}

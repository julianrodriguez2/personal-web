"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Terminal,
  Code,
  Server,
  Database,
} from "lucide-react";

export default function TerminalPortfolio() {
  const [activeSection, setActiveSection] = useState("home");
  const [typedText, setTypedText] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [terminalCommand, setTerminalCommand] = useState("");
  const [terminalOutput, setTerminalOutput] = useState<string[]>([]);
  const sectionsRef = useRef<{ [key: string]: HTMLElement | null }>({});
  const terminalInputRef = useRef<HTMLInputElement>(null);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  const sections = [
    { id: "home", label: "Home", command: "cd ~" },
    { id: "about", label: "About", command: "cat about.md" },
    { id: "projects", label: "Projects", command: "ls -la projects/" },
    { id: "skills", label: "Skills", command: "mkdir skills" },
    { id: "extra", label: "Extra", command: "git log extra-activities/" },
    { id: "contact", label: "Contact", command: "ssh julian@contact" },
  ];

  const projects = [
    {
      title: "Mealmaster - A Meal Planning App",
      description:
        "A full-stack meal planner platform allowing users to plan meals, manage grocery lists, track nutrition, and monitor progress over time.",
      github: "https://github.com/julianrodriguez2/fitness-tracker",
      demo: "https://fitness-tracker-puce-eta.vercel.app/",
      features: [
        "User authentication and authorization",
        "Personalized meal plans based on user surveys",
        "Dynamic grocery list and pantry management",
        "Progress tracking dashboard with calorie goals",
        "Admin panel for recipe and ingredient management",
        "Collection of recipes using the Spoonacular API",
      ],
      tech: {
        frontend: ["React", "JavaScript", "Tailwind CSS", "Vite"],
        backend: ["Node.js", "Express", "MongoDB", "JWT", "Jest"],
        deployment: ["Render", "Vercel", "Github"],
      },
    },
    {
      title: "AI Resume Builder",
      description:
        "An AI-powered web app for generating professional resumes and cover letters, complete with real-time previews and PDF export functionality.",
      github: "https://github.com/julianrodriguez2/ai-resume-builder",
      demo: "https://ai-resume-builder-git-main-julianrodriguez2s-projects.vercel.app/",
      features: [
        "Create resume in real-time using forms",
        "AI-driven resume improvements using Groq API",
        "Dynamic template switching and live preview",
        "PDF export via @react-pdf/renderer",
      ],
      tech: {
        frontend: ["Next.js", "TypeScript", "Tailwind CSS"],
        backend: ["FastAPI", "Groq API", "Python"],
        deployment: ["Vercel", "Render", "GitHub Actions"],
      },
    },
    {
      title: "Worlds | 2D RPG",
      description:
        "A turn-based role-playing game featuring 124 maps and over 600 battle actions. Developed key gameplay mechanics including battle systems and overworld interactions.",
      github: "N/A",
      demo: "https://diegonavarro12703.wixsite.com/worlds",
      features: [
        "Top-down, turn-based RPG gameplay",
        "3-hour experience featuring 124 maps and over 600 battle actions",
        "Key gameplay mechanics include battle systems and overworld interactions",
      ],
      tech: {
        frontend: ["JavaScript"],
        backend: ["Unreal Engine", "C++", "RPG Maker"],
        deployment: ["N/A"],
      },
      inProgress: true,
    },
    {
      title: "League Discord Bot",
      description:
        "A League of Legends-focused Discord bot that fetches real-time game data using the Riot Games API. Includes player rank tracking, in-house match organization, and a champion/item database.",
      github: "N/A",
      demo: "N/A",
      features: [
        "Real-time game data fetching using Riot Games API",
        "Custom game functionality including matchmaking and player analytics",
        "Champion/item database with search functionality",
        "Leaderboard and rank tracking",
      ],
      tech: {
        frontend: ["JavaScript"],
        backend: ["Node.js", "Discord.js", "PostgreSQL", "Riot Games API"],
        deployment: ["Vercel", "GitHub Actions"],
      },
      inProgress: true,
    },
    {
      title: "VS Code Complexity Estimator",
      description:
        "A VS Code extension and C++ analyzer that estimates the time complexity of C++ functions by detecting loop depth, recursion, and logarithmic patterns using regex parsing. Integrated full testing framework and real-time code analysis in the editor.",
      github: "N/A",
      demo: "N/A",
      features: [
        "Estimates Big-O complexities like O(1), O(log n), O(n), O(n log n), O(n^2), and O(n^2 log n)",
        "Supports detection of recursion, nested loops, and multiplicative growth patterns",
        "VS Code extension to analyze and display complexity from the editor",
        "Integrated test runner for validating complexity estimation across multiple C++ files",
        "Future extensibility planned for full AST parsing via Tree-sitter",
      ],
      tech: {
        frontend: ["VS Code Extension API", "TypeScript"],
        backend: ["C++", "Regex Parsing"],
        deployment: ["Local VSIX Package"],
      },
      inProgress: true,
    },
    {
      title: "Job Application Dashboard",
      description:
        "  A web application for tracking job applications, including features for adding, editing, and deleting applications. Makes use of the AI Resume Builder project functionality from before.",
      github: "N/A",
      demo: "N/A",
      features: [
        "Create, edit, and live-preview professional resumes",
        "AI-powered resume enhancement for grammar, tone, and keyword optimization",
        "Export resumes to PDF with custom templates",
        "Scrape live job listings from external job boards",
        "Match resume skills with job requirements for personalized recommendations",
      ],
      tech: {
        frontend: ["Next.js", "Tailwind CSS"],
        backend: ["FastAPI", "Python", "Scrapy", "PostgreSQL (planned)"],
        deployment: ["Vercel", "Render or Railway (planned)"],
      },
      inProgress: true,
    },
  ];

  const previousJobs = [
    {
      title: "Food Prep",
      company: "Shogun Teppanyaki",
      period: "2021-2023",
      description: [
        "Prepared fresh ingredients and assisted chefs in a fast-paced kitchen.",
        "Maintained high standards of food safety and cleanliness.",
        "Developed strong organization, teamwork, and time management skills.",
      ],
    },
  ];

  const skills = {
    frontend: [
      { name: "JavaScript (ES6+)", level: 90 },
      { name: "TypeScript", level: 85 },
      { name: "React", level: 90 },
      { name: "Next.js", level: 75 },
      { name: "HTML5/CSS3", level: 95 },
      { name: "Tailwind CSS", level: 80 },
      { name: "Redux/Context API", level: 75 },
    ],
    backend: [
      { name: "Node.js", level: 95 },
      { name: "FastAPI", level: 80 },
      { name: "Express.js", level: 90 },
      { name: "Python", level: 80 },
      { name: "C++", level: 85 },
      { name: "Django", level: 50 },
      { name: "RESTful APIs", level: 90 },
      { name: "Scrapy (Web Scraping)", level: 60 },
      { name: "Authentication/JWT", level: 85 },
    ],
    database: [
      { name: "MongoDB", level: 90 },
      { name: "PostgreSQL", level: 90 },
      { name: "MySQL", level: 75 },
      { name: "Firebase/Firestore", level: 80 },
    ],
    devops: [
      { name: "Git/GitHub", level: 100 },
      { name: "CI/CD", level: 75 },
      { name: "Google Cloud Computing", level: 70 },
      { name: "Vercel/Render Deployment", level: 90 },
      { name: "Linux/WSL", level: 80 },
    ],
  };

  const education = [
    {
      degree: "Bachelor of Science in Computer Science",
      institution: "University of California - Riverside",
      period: "2021 - 2025",
      description:
        "Focused on software engineering, full-stack development, database systems, and cybersecurity practices.",
      courses: [
        "Data Structures and Algorithms",
        "Database Management Systems",
        "Web Application Development",
        "Computer Security",
        "Software Engineering Principles",
        "Operating Systems and Networks",
        "Introduction to Artificial Intelligence",
        "UNIX System Administration",
        "Computer Graphics",
        "Software Testing and Quality Assurance",
      ],
    },
    // {
    //   degree: "Full Stack Web Development Bootcamp",
    //   institution: "Tech Academy",
    //   period: "Summer 2022",
    //   description:
    //     "Intensive 12-week program focused on modern web development technologies and practices.",
    //   courses: [
    //     "Modern JavaScript",
    //     "React & Redux",
    //     "Node.js & Express",
    //     "MongoDB",
    //     "RESTful API Design",
    //     "Authentication & Security",
    //   ],
    //   achievements: ["Top Student Award", "Built 5 full-stack applications"],
    // },
  ];

  const extraItems = [
    // {
    //   title: "Coding Clubs",
    //   description:
    //     "Joined various clubs such as the UCR Coding Club and the coding club in high school.",
    //   date: "2022-present",
    //   commit: "a1b2c3d",
    // },
    {
      title: "Certifications",
      description:
        "Earned several certifications from various relevant courses.",
      date: "2023-present",
      commit: "e4f5g6h",
      subItems: [
        "Google Cloud Computing Foundations",
        "The Odin Project - Full Stack JavaScript",
      ],
    },
    {
      title: "Hackathons",
      description:
        "Participated in multiple hackathons such as Citrushack and Cutiehack",
      date: "April 2025, April 2024, November 2023",
      commit: "i7j8k9l",
    },
    {
      title: "Awards",
      description: "Recognized for academic and language achievements.",
      date: "June 2021-present",
      commit: "m1n2o3p",
      subItems: [
        "Seal of Biliteracy awarded for Spanish on high school diploma by the state of California",
        "AP Scholar with Distinction awarded for scoring a 3 or more on at least 5 AP tests",
      ],
    },
  ];

  useEffect(() => {
    const phrases = [
      "I build full-stack web applications.",
      "I integrate AI into real-world projects.",
      "I develop scalable backend systems and APIs.",
      "I design intuitive user experiences with React and Next.js.",
      "I engineer developer tools to optimize workflows.",
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const typingSpeed = 60;
    const deletingSpeed = 40;
    const delayBetweenPhrases = 2000;

    const type = () => {
      const currentPhrase = phrases[phraseIndex];

      if (!isDeleting) {
        if (charIndex < currentPhrase.length) {
          setTypedText(currentPhrase.substring(0, charIndex + 1));
          charIndex++;
        } else {
          isDeleting = true;
          setTimeout(type, delayBetweenPhrases);
          return;
        }
      } else {
        if (charIndex > 0) {
          setTypedText(currentPhrase.substring(0, charIndex - 1));
          charIndex--;
        } else {
          isDeleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
        }
      }

      setTimeout(type, isDeleting ? deletingSpeed : typingSpeed);
    };

    const timeoutId = setTimeout(type, typingSpeed);

    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [terminalOutput]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      Object.entries(sectionsRef.current).forEach(([id, element]) => {
        if (!element) return;

        const sectionTop = element.offsetTop;
        const sectionHeight = element.offsetHeight;

        if (
          scrollPosition >= sectionTop &&
          scrollPosition < sectionTop + sectionHeight
        ) {
          setActiveSection(id);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);

  const handleTerminalCommand = (e: React.FormEvent) => {
    e.preventDefault();

    const command = terminalCommand.trim().toLowerCase();
    let output: string[] = [];

    if (command === "help") {
      output = [
        "Available commands:",
        "help - Show this help message",
        "clear - Clear the terminal",
        "cd [section] - Navigate to a section",
        "ls - List all sections",
        "cat about.md - View about information",
        "ls -la projects/ - View projects",
        "mkdir skills - View skills",
        "git log extra-activities/ - View extra activities",
        "ssh julian@contact - View contacwhat abt information",
        "exit - Close the terminal",
        "--- Hidden Command ---",
        "sudo hire [MY NAME (all lowercase)]",
      ];
    } else if (command === "clear") {
      setTerminalOutput([]);
      setTerminalCommand("");
      return;
    } else if (command === "ls") {
      output = sections.map((section) => section.id);
    } else if (command === "exit") {
      setTerminalOpen(false);
      return;
    } else if (command.startsWith("cd ")) {
      const sectionName = command.split(" ")[1];
      const section = sections.find(
        (s) => s.id === sectionName || s.id === sectionName.replace("~", "home")
      );

      if (section) {
        scrollToSection(section.id);
        output = [`Navigated to ${section.label}`];
      } else {
        output = [`cd: no such section: ${sectionName}`];
      }
    } else if (sections.some((section) => section.command === command)) {
      const section = sections.find((s) => s.command === command);
      if (section) {
        scrollToSection(section.id);
        output = [`Executing: ${command}`];
      }
    } else if (command === "sudo hire julian") {
      output = [
        "Password accepted.",
        "Julian Rodriguez has been hired. Congratulations!",
      ];
    } else {
      output = [
        `Command not found: ${command}. Type 'help' for available commands.`,
      ];
    }
    setCommandHistory((prev) => [...prev, terminalCommand]);
    setHistoryIndex(null);

    setTerminalOutput([...terminalOutput, `$ ${command}`, ...output]);
    setTerminalCommand("");
  };

  const scrollToSection = (id: string) => {
    sectionsRef.current[id]?.scrollIntoView({ behavior: "smooth" });
  };

  const availableCommands = [
    "help",
    "clear",
    "ls",
    "exit",
    "cd ~",
    "cd about",
    "cd projects",
    "cd skills",
    "cd extra",
    "cd contact",
    "cat about.md",
    "ls -la projects/",
    "mkdir skills",
    "git log extra-activities/",
    "ssh julian@contact",
    "sudo hire julian",
  ];

  const handleTerminalKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();

      const matching = availableCommands.filter((cmd) =>
        cmd.startsWith(terminalCommand)
      );

      if (matching.length === 1) {
        setTerminalCommand(matching[0]);
      } else if (matching.length > 1) {
        setTerminalOutput((prev) => [
          ...prev,
          `$ ${terminalCommand}`,
          "Suggestions:",
          ...matching.map((cmd) => `  ${cmd}`),
        ]);
      }
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length === 0) return;

      const newIndex =
        historyIndex === null
          ? commandHistory.length - 1
          : Math.max(0, historyIndex - 1);

      setHistoryIndex(newIndex);
      setTerminalCommand(commandHistory[newIndex]);
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (commandHistory.length === 0) return;

      if (historyIndex === null) return;

      const newIndex = Math.min(commandHistory.length - 1, historyIndex + 1);
      setHistoryIndex(newIndex);
      setTerminalCommand(commandHistory[newIndex]);
    }
  };

  return (
    <div className="min-h-screen bg-[#0C0C16] text-[#5CFF5C] font-mono">
      <header className="fixed top-0 left-0 right-0 bg-[#0C0C16]/90 backdrop-blur-sm z-30 border-b border-[#5CFF5C]/30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-xl font-bold">
              <span className="text-[#5CFF5C]">julian@dev</span>:
              <span className="text-[#36A3FF]">~</span>$
            </Link>
            <nav className="hidden md:block">
              <ul className="flex space-x-6">
                {sections.map((section) => (
                  <li key={section.id}>
                    <button
                      onClick={() => scrollToSection(section.id)}
                      className={`text-sm relative cursor-pointer ${
                        activeSection === section.id
                          ? "text-[#5CFF5C]"
                          : "text-[#36A3FF] hover:text-[#5CFF5C]"
                      }`}
                    >
                      {section.label}
                      {activeSection === section.id && (
                        <motion.div
                          layoutId="activeTerminalNavIndicator"
                          className="cursor-pointer absolute -bottom-1 left-0 right-0 h-0.5 bg-[#5CFF5C]"
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
            <button
              onClick={() => setTerminalOpen(true)}
              className="px-3 py-1 border border-[#5CFF5C] text-[#5CFF5C] rounded flex items-center text-sm hover:bg-[#5CFF5C]/10"
            >
              <Terminal size={16} className="mr-2" />
              Terminal
            </button>
          </div>
        </div>
      </header>

      {/* Terminal Modal */}
      <AnimatePresence>
        {terminalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
            onClick={() => setTerminalOpen(false)}
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              className="bg-[#0C0C16] border border-[#5CFF5C]/30 rounded-lg w-full max-w-3xl shadow-xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between bg-[#0C0C16] border-b border-[#5CFF5C]/30 p-2">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="text-xs text-[#36A3FF]">julian@portfolio:~</div>
                <button
                  onClick={() => setTerminalOpen(false)}
                  className="text-[#36A3FF] hover:text-[#5CFF5C]"
                >
                  ×
                </button>
              </div>
              <div className="p-4 h-96 overflow-y-auto font-mono text-sm">
                <div className="mb-4">
                  <p className="text-[#36A3FF]">
                    Welcome to Julian's Portfolio Terminal.
                  </p>
                  <p className="text-[#36A3FF]">
                    Type 'help' for available commands.
                  </p>
                </div>
                {terminalOutput.map((line, index) => (
                  <div
                    key={index}
                    className={
                      line.startsWith("$") ? "text-[#5CFF5C]" : "text-white"
                    }
                  >
                    {line}
                  </div>
                ))}

                <div ref={terminalEndRef}></div>

                <form
                  onSubmit={handleTerminalCommand}
                  className="flex items-center mt-2"
                >
                  <span className="text-[#5CFF5C] mr-2">$</span>
                  <input
                    ref={terminalInputRef}
                    type="text"
                    value={terminalCommand}
                    onChange={(e) => setTerminalCommand(e.target.value)}
                    onKeyDown={handleTerminalKeyDown}
                    className="flex-1 bg-transparent outline-none text-white"
                    autoFocus
                  />
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="pt-16">
        {/* Home Section */}
        <section
          ref={(el) => {
            sectionsRef.current["home"] = el;
          }}
          id="home"
          className="min-h-screen flex items-center py-20"
        >
          <div className="container mx-auto px-4 2xl:px-8">
            <div className="w-full max-w-7xl mx-auto">
              <div className="mb-8 inline-block">
                <div className="bg-[#1A1A2E] text-[#5CFF5C] px-3 py-1 text-sm rounded-t-md inline-block">
                  welcome.sh
                </div>
                <div className="border border-[#5CFF5C]/30 rounded-md rounded-tl-none p-6 bg-[#1A1A2E]/50">
                  <div className="mb-4">
                    <span className="text-[#36A3FF]">#!/bin/bash</span>
                  </div>
                  <div className="mb-4">
                    <span className="text-[#36A3FF]">
                      # Initialize developer profile
                    </span>
                  </div>
                  <div className="mb-4">
                    <span className="text-[#36A3FF]">echo -e "</span>
                    <span className="text-[#FF4B8B]">"Hello, I'm </span>
                    <span className="text-[#5CFF5C] font-bold">
                      Julian Rodriguez
                    </span>
                    <span className="text-[#FF4B8B]">"</span>
                    <span className="text-[#36A3FF]">;</span>
                  </div>
                  <div className="mb-4">
                    <span className="text-[#36A3FF]">echo -e "</span>
                    <span className="text-[#FF4B8B]">
                      "Full Stack Developer"
                    </span>
                    <span className="text-[#36A3FF]">;</span>
                  </div>
                  <div className="mb-4">
                    <span className="text-[#36A3FF]">echo -e "</span>
                    <span className="text-[#FF4B8B]">"</span>
                    <span>{typedText}</span>
                    <span
                      className={`inline-block w-2 h-4 bg-[#5CFF5C] ml-1 ${
                        cursorVisible ? "opacity-100" : "opacity-0"
                      }`}
                    ></span>
                    <span className="text-[#FF4B8B]">"</span>
                    <span className="text-[#36A3FF]">;</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="border border-[#5CFF5C]/30 rounded-md p-4 bg-[#1A1A2E]/50">
                  <div className="flex items-center mb-2">
                    <Terminal size={16} className="mr-2 text-[#36A3FF]" />
                    <span className="text-[#36A3FF] text-sm">
                      experience.log
                    </span>
                  </div>
                  <div className="text-[#5CFF5C]">
                    <p className="mb-2">
                      Bachelor's Degree in Computer Science w/ Business
                      Applications
                    </p>
                    <p className="mb-2">4+ Projects In Progress</p>
                    <p>Full Stack Development Expertise</p>
                  </div>
                </div>
                <div className="border border-[#5CFF5C]/30 rounded-md p-4 bg-[#1A1A2E]/50">
                  <div className="flex items-center mb-2">
                    <Code size={16} className="mr-2 text-[#36A3FF]" />
                    <span className="text-[#36A3FF] text-sm">
                      tech-stack.json
                    </span>
                  </div>
                  <div className="text-[#5CFF5C]">
                    <p className="mb-2">Frontend: React, Next.js, TypeScript</p>
                    <p className="mb-2">
                      Backend: Node.js, Express, Python, C++
                    </p>
                    <p>Database: MongoDB, PostgreSQL</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => scrollToSection("projects")}
                  className="cursor-pointer px-6 py-3 bg-[#5CFF5C] text-[#0C0C16] rounded-md inline-flex items-center font-bold hover:bg-[#5CFF5C]/90 transition-colors"
                >
                  View Projects
                  <ArrowRight size={16} className="ml-2" />
                </button>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="cursor-pointer px-6 py-3 border border-[#5CFF5C] text-[#5CFF5C] rounded-md inline-flex items-center hover:bg-[#5CFF5C]/10 transition-colors"
                >
                  Contact Me
                </button>
                <button
                  onClick={() => setTerminalOpen(true)}
                  className="cursor-pointer px-6 py-3 border border-[#36A3FF] text-[#36A3FF] rounded-md inline-flex items-center hover:bg-[#36A3FF]/10 transition-colors"
                >
                  <Terminal size={16} className="mr-2" />
                  Open Terminal
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section
          ref={(el) => {
            sectionsRef.current["about"] = el;
          }}
          id="about"
          className="py-20 bg-[#1A1A2E]/30"
        >
          <div className="container mx-auto px-4 2xl:px-8">
            <div className="w-full max-w-7xl mx-auto">
              <div className="mb-8">
                <div className="inline-block bg-[#1A1A2E] text-[#5CFF5C] px-3 py-1 text-sm rounded-t-md">
                  about.md
                </div>
                <div className="border border-[#5CFF5C]/30 rounded-md rounded-tl-none p-6 bg-[#1A1A2E]/50">
                  <h2 className="text-3xl font-bold mb-6 text-[#5CFF5C]">
                    # About Me
                  </h2>
                  <div className="space-y-4 text-[#E0E0E0]">
                    <p>
                      Hi, my name is Julian, and I'm pursuing a degree in
                      Computer Science with a concentration in Business
                      Applications at the University of California - Riverside.
                      I'm passionate about web development, with a strong focus
                      on both frontend and backend technologies.
                    </p>
                    <p>
                      I discovered my passion for software development through
                      platforms like Codecademy and The Odin Project. Since
                      then, I've built a variety of projects each created to
                      solve real-world problems and streamline everyday tasks.
                      My business coursework has strengthened my ability to
                      design software that is not only technically sound but
                      also user-focused and practical in real-world settings.
                    </p>
                    <p>
                      Outside of coding, I enjoy movies, TV shows, gaming, and
                      spending time with family and friends. I also have a
                      passion for cooking, drawing from my previous experience
                      working in restaurant kitchens.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <div className="inline-block bg-[#1A1A2E] text-[#5CFF5C] px-3 py-1 text-sm rounded-t-md">
                  education.json
                </div>
                <div className="border border-[#5CFF5C]/30 rounded-md rounded-tl-none p-6 bg-[#1A1A2E]/50">
                  <div className="space-y-8">
                    {education.map((edu, index) => (
                      <div
                        key={index}
                        className="border-l-2 border-[#5CFF5C] pl-4"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="text-xl font-medium text-[#5CFF5C]">
                            {edu.degree}
                          </h4>
                          <span className="text-sm text-[#36A3FF]">
                            {edu.period}
                          </span>
                        </div>
                        <p className="mb-2 text-[#E0E0E0]">{edu.institution}</p>
                        <p className="mb-4 text-[#E0E0E0]/70">
                          {edu.description}
                        </p>

                        <div className="mb-4">
                          <h5 className="text-sm font-medium text-[#36A3FF] mb-2">
                            KEY COURSES:
                          </h5>
                          <div className="grid grid-cols-2 gap-2">
                            {edu.courses.map((course, i) => (
                              <div key={i} className="flex items-center">
                                <span className="w-1 h-1 bg-[#5CFF5C] rounded-full mr-2"></span>
                                <span className="text-sm text-[#E0E0E0]">
                                  {course}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* <div>
                          <h5 className="text-sm font-medium text-[#36A3FF] mb-2">
                            ACHIEVEMENTS:
                          </h5>
                          <ul className="list-disc list-inside text-[#E0E0E0] text-sm">
                            {edu.achievements.map((achievement, i) => (
                              <li key={i}>{achievement}</li>
                            ))}
                          </ul>
                        </div> */}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section
          ref={(el) => {
            sectionsRef.current["projects"] = el;
          }}
          id="projects"
          className="py-20"
        >
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="mb-8 text-center">
                <h2 className="text-3xl font-bold mb-4 text-[#5CFF5C]">
                  <span className="text-[#36A3FF]">$</span> ls -la ./projects
                </h2>
                <p className="text-[#E0E0E0]">
                  A selection of my recent full stack projects showcasing my
                  technical skills and problem-solving abilities.
                </p>
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {projects.map((project, index) => (
                  <div
                    key={index}
                    className="border border-[#5CFF5C]/30 rounded-md bg-[#1A1A2E]/50 overflow-hidden"
                  >
                    <div className="border-b border-[#5CFF5C]/30 p-3 bg-[#1A1A2E] flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="text-[#36A3FF] mr-2">
                          project-{index + 1}
                        </span>
                        <span className="text-[#5CFF5C] font-bold">
                          {project.title}
                        </span>
                      </div>
                      <div className="flex space-x-2">
                        {project.github !== "N/A" && (
                          <Link
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#E0E0E0] hover:text-[#5CFF5C]"
                          >
                            <Github size={16} />
                          </Link>
                        )}
                        {project.demo !== "N/A" && (
                          <Link
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#E0E0E0] hover:text-[#5CFF5C]"
                          >
                            <ExternalLink size={16} />
                          </Link>
                        )}
                      </div>
                    </div>
                    <div className="p-6">
                      <p className="text-[#E0E0E0] mb-6">
                        {project.description}
                      </p>

                      <div className="mb-6">
                        <h4 className="text-sm font-medium text-[#36A3FF] mb-2">
                          FEATURES:
                        </h4>
                        <ul className="space-y-1">
                          {project.features.map((feature, i) => (
                            <li key={i} className="flex items-start">
                              <span className="text-[#5CFF5C] mr-2">→</span>
                              <span className="text-[#E0E0E0]">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mb-6">
                        <h4 className="text-sm font-medium text-[#36A3FF] mb-2">
                          TECH STACK:
                        </h4>
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <Code size={16} className="mr-2 text-[#5CFF5C]" />
                            <span className="text-sm text-[#36A3FF] mr-2">
                              Frontend:
                            </span>
                            <div className="flex flex-wrap gap-2">
                              {project.tech.frontend.map((tech, i) => (
                                <span
                                  key={i}
                                  className="px-2 py-1 bg-[#0C0C16] text-[#5CFF5C] text-xs rounded"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="flex items-center">
                            <Server size={16} className="mr-2 text-[#5CFF5C]" />
                            <span className="text-sm text-[#36A3FF] mr-2">
                              Backend:
                            </span>
                            <div className="flex flex-wrap gap-2">
                              {project.tech.backend.map((tech, i) => (
                                <span
                                  key={i}
                                  className="px-2 py-1 bg-[#0C0C16] text-[#5CFF5C] text-xs rounded"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="flex items-center">
                            <Database
                              size={16}
                              className="mr-2 text-[#5CFF5C]"
                            />
                            <span className="text-sm text-[#36A3FF] mr-2">
                              Deployment:
                            </span>
                            <div className="flex flex-wrap gap-2">
                              {project.tech.deployment.map((tech, i) => (
                                <span
                                  key={i}
                                  className="px-2 py-1 bg-[#0C0C16] text-[#5CFF5C] text-xs rounded"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-4">
                        {project.github !== "N/A" && (
                          <Link
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-[#5CFF5C] hover:underline"
                          >
                            <Github size={18} className="mr-2" />
                            View Code
                          </Link>
                        )}
                        {project.demo !== "N/A" && (
                          <Link
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-[#5CFF5C] hover:underline"
                          >
                            <ExternalLink size={18} className="mr-2" />
                            Live Demo
                          </Link>
                        )}
                        {project.inProgress && (
                          <div className="inline-flex items-center px-3 py-1 bg-yellow-500 text-[#0C0C16] rounded-full text-xs font-bold">
                            🚧 In Progress
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12 text-center">
                <Link
                  href="https://github.com/julianrodriguez2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 border border-[#5CFF5C] text-[#5CFF5C] rounded-md inline-flex items-center hover:bg-[#5CFF5C]/10 transition-colors"
                >
                  View All Projects on GitHub
                  <Github size={16} className="ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section
          ref={(el) => {
            sectionsRef.current["skills"] = el;
          }}
          id="skills"
          className="py-20 bg-[#1A1A2E]/30"
        >
          <div className="container mx-auto px-4 2xl:px-8">
            <div className="w-full max-w-7xl mx-auto">
              <div className="mb-8 text-center">
                <h2 className="text-3xl font-bold mb-4 text-[#5CFF5C]">
                  <span className="text-[#36A3FF]">$</span> mkdir skills
                </h2>
                <p className="text-[#E0E0E0]">
                  My expertise spans the entire development stack, from frontend
                  interfaces to backend systems and databases.
                </p>
              </div>

              <div className="space-y-12">
                {Object.entries(skills).map(
                  ([category, skillList], categoryIndex) => (
                    <div
                      key={category}
                      className="border border-[#5CFF5C]/30 rounded-md bg-[#1A1A2E]/50 overflow-hidden"
                    >
                      <div className="border-b border-[#5CFF5C]/30 p-3 bg-[#1A1A2E]">
                        <h3 className="text-xl font-bold capitalize text-[#5CFF5C]">
                          <span className="text-[#36A3FF]">package:</span>{" "}
                          {category}-development
                        </h3>
                      </div>
                      <div className="p-6">
                        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4 2xl:gap-6">
                          {skillList.map((skill, index) => (
                            <div
                              key={index}
                              className="border-l-2 border-[#5CFF5C] pl-3"
                            >
                              <div className="flex justify-between items-center mb-2">
                                <h4 className="font-medium text-[#E0E0E0]">
                                  {skill.name}
                                </h4>
                                <span className="text-sm text-[#36A3FF]">
                                  {skill.level}%
                                </span>
                              </div>
                              <div className="w-full bg-[#0C0C16] rounded-full h-2">
                                <div
                                  className="bg-[#5CFF5C] h-2 rounded-full"
                                  style={{ width: `${skill.level}%` }}
                                ></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Extra Section */}
        <section
          ref={(el) => {
            sectionsRef.current["extra"] = el;
          }}
          id="extra"
          className="py-20"
        >
          <div className="container mx-auto px-4 2xl:px-8">
            <div className="w-full max-w-7xl mx-auto">
              <div className="mb-8 text-center">
                <h2 className="text-3xl font-bold mb-4 text-[#5CFF5C]">
                  <span className="text-[#36A3FF]">$</span> git log
                  extra-activities/
                </h2>
                <p className="text-[#E0E0E0]">
                  Beyond coding, I'm involved in various tech-related activities
                  and contributions.
                </p>
              </div>

              <div className="border border-[#5CFF5C]/30 rounded-md bg-[#1A1A2E]/50 overflow-hidden mb-8">
                <div className="border-b border-[#5CFF5C]/30 p-3 bg-[#1A1A2E]">
                  <h3 className="text-xl font-bold text-[#5CFF5C]">
                    <span className="text-[#36A3FF]">branch:</span>{" "}
                    extra-activities
                  </h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {extraItems.map((item, index) => (
                      <div
                        key={index}
                        className="border-b border-[#5CFF5C]/10 pb-6 last:border-0 last:pb-0"
                      >
                        <div className="flex items-start">
                          <div className="text-[#36A3FF] mr-3 font-mono">
                            {item.commit}
                          </div>
                          <div className="flex-1">
                            <div className="flex flex-wrap items-center mb-2">
                              <h4 className="text-[#5CFF5C] font-medium mr-2">
                                {item.title}
                              </h4>
                              <span className="text-xs text-[#E0E0E0]/50 bg-[#0C0C16] px-2 py-0.5 rounded">
                                {item.date}
                              </span>
                            </div>
                            <p className="text-[#E0E0E0] text-sm mb-3">
                              {item.description}
                            </p>
                            {item.subItems && (
                              <ul className="list-disc list-inside text-[#E0E0E0] text-sm ml-4 mt-2 space-y-1">
                                {item.subItems.map((subItem, idx) => (
                                  <li key={idx}>{subItem}</li>
                                ))}
                              </ul>
                            )}
                            {/* {item.link && (
                              <Link
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center text-[#5CFF5C] text-sm hover:underline"
                              >
                                View Details
                                <ArrowRight size={12} className="ml-1" />
                              </Link>
                            )} */}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="border border-[#5CFF5C]/30 rounded-md bg-[#1A1A2E]/50 overflow-hidden">
                <div className="border-b border-[#5CFF5C]/30 p-3 bg-[#1A1A2E]">
                  <h3 className="text-xl font-bold text-[#5CFF5C]">
                    <span className="text-[#36A3FF]">branch</span> previous-jobs
                  </h3>
                </div>
                <div className="p-6">
                  <div className="space-y-6">
                    {previousJobs.map((job, index) => (
                      <div
                        key={index}
                        className="border-l-2 border-[#5CFF5C] pl-4 pb-6 last:pb-0"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="text-xl font-medium text-[#5CFF5C]">
                              {job.title}
                            </h4>
                            <p className="text-[#36A3FF]">{job.company}</p>
                          </div>
                          <span className="text-sm text-[#E0E0E0]/70 bg-[#0C0C16] px-2 py-0.5 rounded">
                            {job.period}
                          </span>
                        </div>
                        <ul className="list-disc list-inside text-[#E0E0E0] text-sm space-y-1 mt-2">
                          {job.description.map((point, idx) => (
                            <li key={idx}>{point}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section
          ref={(el) => {
            sectionsRef.current["contact"] = el;
          }}
          id="contact"
          className="py-20 bg-[#1A1A2E]/30"
        >
          <div className="container mx-auto px-4 2xl:px-8">
            <div className="w-full max-w-7xl mx-auto">
              <div className="mb-8 text-center">
                <h2 className="text-3xl font-bold mb-4 text-[#5CFF5C]">
                  <span className="text-[#36A3FF]">$</span> ssh julian@contact
                </h2>
                <p className="text-[#E0E0E0]">
                  Interested in working together or have a question? Feel free
                  to reach out!
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="border border-[#5CFF5C]/30 rounded-md bg-[#1A1A2E]/50 p-6">
                  <h3 className="text-xl font-bold mb-6 text-[#5CFF5C]">
                    Contact Information
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <Mail className="w-5 h-5 text-[#36A3FF] mt-1 mr-3" />
                      <div>
                        <h4 className="text-sm font-medium text-[#36A3FF]">
                          Email
                        </h4>
                        <a
                          href="mailto:jrodriguezlee2@gmail.com"
                          className="text-[#E0E0E0] hover:text-[#5CFF5C]"
                        >
                          jrodriguezlee2@gmail.com
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Linkedin className="w-5 h-5 text-[#36A3FF] mt-1 mr-3" />
                      <div>
                        <h4 className="text-sm font-medium text-[#36A3FF]">
                          LinkedIn
                        </h4>
                        <a
                          href="https://www.linkedin.com/in/julian-rodriguez-653a06216/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#E0E0E0] hover:text-[#5CFF5C]"
                        >
                          linkedin.com/in/julianrodriguez
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Github className="w-5 h-5 text-[#36A3FF] mt-1 mr-3" />
                      <div>
                        <h4 className="text-sm font-medium text-[#36A3FF]">
                          GitHub
                        </h4>
                        <a
                          href="https://github.com/julianrodriguez2"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#E0E0E0] hover:text-[#5CFF5C]"
                        >
                          github.com/julianrodriguez2
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8">
                    <h3 className="text-xl font-bold mb-4 text-[#5CFF5C]">
                      Let's Connect
                    </h3>
                    <p className="text-[#E0E0E0] mb-6">
                      I'm currently open to freelance opportunities, full-time
                      positions, and interesting projects. Don't hesitate to
                      reach out!
                    </p>
                  </div>
                </div>

                <div className="border border-[#5CFF5C]/30 rounded-md bg-[#1A1A2E]/50 p-6">
                  <h3 className="text-xl font-bold mb-6 text-[#5CFF5C]">
                    Send a Message
                  </h3>
                  <form
                    className="space-y-4"
                    action="https://formspree.io/f/xkgrgjve"
                    method="POST"
                  >
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-[#36A3FF] mb-1"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="w-full px-4 py-2 bg-[#0C0C16] border border-[#5CFF5C]/30 rounded text-[#E0E0E0] focus:outline-none focus:border-[#5CFF5C]"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-[#36A3FF] mb-1"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="w-full px-4 py-2 bg-[#0C0C16] border border-[#5CFF5C]/30 rounded text-[#E0E0E0] focus:outline-none focus:border-[#5CFF5C]"
                        placeholder="your.email@example.com"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="subject"
                        className="block text-sm font-medium text-[#36A3FF] mb-1"
                      >
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        className="w-full px-4 py-2 bg-[#0C0C16] border border-[#5CFF5C]/30 rounded text-[#E0E0E0] focus:outline-none focus:border-[#5CFF5C]"
                        placeholder="What is your topic?"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-[#36A3FF] mb-1"
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        rows={5}
                        name="message"
                        className="w-full px-4 py-2 bg-[#0C0C16] border border-[#5CFF5C]/30 rounded text-[#E0E0E0] focus:outline-none focus:border-[#5CFF5C] resize-none"
                        placeholder="Your message here..."
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      className="w-full px-6 py-3 bg-[#5CFF5C] text-[#0C0C16] rounded-md font-bold hover:bg-[#5CFF5C]/90 transition-colors"
                    >
                      Send Message
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-8 border-t border-[#5CFF5C]/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-[#36A3FF]">
              © {new Date().getFullYear()} Julian Rodriguez. All rights
              reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link
                href="https://github.com/julianrodriguez2/personal-web"
                className="text-[#36A3FF] hover:text-[#5CFF5C]"
              >
                <Github size={20} />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link
                href="https://www.linkedin.com/in/julian-rodriguez-653a06216/"
                className="text-[#36A3FF] hover:text-[#5CFF5C]"
              >
                <Linkedin size={20} />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link
                href="mailto:jrodriguezlee2@gmail.com"
                className="text-[#36A3FF] hover:text-[#5CFF5C]"
              >
                <Mail size={20} />
                <span className="sr-only">Email</span>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

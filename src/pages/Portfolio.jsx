import React from 'react';
import Navbar from "@/components/Navbar";
import { Github, Mail, Phone, MapPin } from 'lucide-react';

const Portfolio = () => {
  const projects = [
    {
      title: "ScribbleSync",
      description: "A real-time collaborative note-taking application with features like live editing, note sharing, and rich text formatting.",
      image: "/scribblesync.png",
      tech: ["React", "Node.js", "Socket.IO", "MongoDB", "TailwindCSS"],
      link: "https://github.com/akshayghatiki311/notes-frontend"
    },
    {
      title: "Employee Engagement Platform",
      description: "A comprehensive platform for organizations to manage employee engagement, feedback, and performance tracking.",
      image: "/employee-platform.png",
      tech: ["Python", "Flask", "MySQL", "React", "Docker"],
      link: "#"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar showTabs={false} userEmail={null} />
      <div className="pt-20 px-6 max-w-[1280px] mx-auto">
        {/* Hero Section */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h1 className="text-4xl font-bold mb-4">Akshay Ghatiki</h1>
          <p className="text-xl text-gray-600 mb-6">Lead Applications Developer</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600">
            <div className="flex items-center gap-2">
              <Mail className="w-5 h-5" />
              <a href="mailto:akshayghatiki311@gmail.com" className="hover:text-blue-600">
                akshayghatiki311@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-5 h-5" />
              <span>+91 8309570368</span>
            </div>
            <div className="flex items-center gap-2">
              <Github className="w-5 h-5" />
              <a href="https://github.com/akshayghatiki311" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
                github.com/akshayghatiki311
              </a>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              <span>Bengaluru, Karnataka</span>
            </div>
          </div>
        </div>

        {/* Profile Summary */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4 text-blue-600">Profile Summary</h2>
          <p className="text-gray-700 leading-relaxed">
            Dedicated, result-oriented software engineer with 4+ years of experience in understanding and anticipating 
            the agile needs and creating an environment where development, quality assurance, staging and production 
            work can proceed efficiently.
          </p>
        </div>

        {/* Projects Section */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-blue-600">Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <div key={index} className="bg-gray-50 rounded-lg overflow-hidden">
                {/* <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-48 object-cover"
                /> */}
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, i) => (
                      <span 
                        key={i} 
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <a 
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 flex items-center gap-2"
                  >
                    <Github className="w-4 h-4" />
                    View Project
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Skills */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-blue-600">Technical Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-3">Frontend</h3>
              <div className="flex flex-wrap gap-2">
                {['JavaScript', 'TypeScript', 'HTML', 'CSS', 'React'].map(skill => (
                  <span key={skill} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-3">Backend</h3>
              <div className="flex flex-wrap gap-2">
                {['Python', 'Express', 'Nestjs', 'Node.js', 'Flask', 'MongoDB', 'Redis', 'WebSockets', 'MySQL', 'gRPC', 'LangChain'].map(skill => (
                  <span key={skill} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-3">DevOps & Cloud</h3>
              <div className="flex flex-wrap gap-2">
                {['Docker', 'Kubernetes', 'AWS', 'Azure DevOps', 'Firebase', 'CI/CD'].map(skill => (
                  <span key={skill} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Work Experience */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-blue-600">Work Experience</h2>
          
          <div className="space-y-8">
            {/* Current Role */}
            <div className="border-l-4 border-blue-500 pl-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-semibold">Lead - Applications</h3>
                <span className="text-gray-500 text-sm">July 2023 - Present</span>
              </div>
              <h4 className="text-gray-600 mb-2">Microland Limited</h4>
              <p className="text-gray-700 mb-4">
                Currently overseeing the entire process of feature development, from collecting requirements 
                to delivering the features, in collaboration with a team of 9 individuals. Building a 
                multi-tenant application by modularizing the existing application into microservices.
              </p>
            </div>

            {/* Previous Roles */}
            <div className="border-l-4 border-gray-300 pl-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-semibold">Associate Lead - Applications</h3>
                <span className="text-gray-500 text-sm">July 2021 - June 2023</span>
              </div>
              <h4 className="text-gray-600 mb-2">Microland Limited</h4>
              <p className="text-gray-700 mb-4">
                Collaborated with various teams, primarily concentrating on seamlessly integrating external 
                systems with our ongoing platform development. Engaged in numerous Proof of Concepts (POCs) 
                and transformed them into features successfully incorporated into the platform, subsequently 
                released. Additionally, I played a role in deploying the deliverables as part of my 
                responsibilities throughout this period.
              </p>
            </div>

            <div className="border-l-4 border-gray-300 pl-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-semibold">Graduate Trainee - Applications</h3>
                <span className="text-gray-500 text-sm">October 2020 - June 2021</span>
              </div>
              <h4 className="text-gray-600 mb-2">Microland Limited</h4>
              <p className="text-gray-700 mb-4">
                Was part of a development team building an employee engagement platform for organizations.
              </p>
            </div>
          </div>
        </div>

        {/* Key Responsibilities */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-blue-600">Key Responsibilities</h2>
          <ul className="list-disc list-inside space-y-3 text-gray-700">
            <li>Designed and developed scalable RESTful API's using Node, Express and Nestjs.</li>
            <li>Developed an AI assistant (Retrieval Augmented Generation RAG model) using Azure OpenAI GPT models (LLM's), Lang Chain, Python with Flask and deployed as a docker container.</li>
            <li>Implemented authentication and authorization using OAuth 2.0 and JWT.</li>
            <li>Developed a script for automated API testing using newman in JavaScript.</li>
            <li>Optimized API performance by implementing caching and pagination.</li>
            <li>Collaborated closely with cross-functional teams including front-end developers, UX designers, and product managers.</li>
            <li>Developed multiple scripts in Python for data importing and used Big Query for analytics metrics.</li>
            <li>Implemented cron jobs for data integrations, providing real-time data synchronization.</li>
            <li>Performed multiple POC's on Encryption techniques, Docker, Kubernetes, AI assistants etc.</li>
          </ul>
        </div>

        {/* Additional Projects */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-blue-600">Additional Projects</h2>
          <ul className="list-disc list-inside space-y-3 text-gray-700">
            <li>Team Aveon Racing: Designed auxiliary circuits for electrical ATV, secured overall 5th rank in 2019 e-BAJA at Indore.</li>
            <li>Voice based PC automation using Python.</li>
            <li>Text Alter, News app and Notes app using MERN stack.</li>
            <li>Intern at Microland Limited.</li>
          </ul>
        </div>

        {/* Hackathons */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-blue-600">Hackathons</h2>
          <ul className="list-disc list-inside space-y-3 text-gray-700">
            <li>Built an LLM based application for hiring process as part of Axis Bank Hackathon challenge.</li>
            <li>Built a realtime collaborative editing Notes application as part of Hackerearth challenge.</li>
          </ul>
        </div>

        {/* Education */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-blue-600">Education</h2>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">Birla Institute of Technology, Mesra</h3>
            <div className="flex justify-between items-center text-gray-700">
              <span>B.E (ECE) - 7.5 CGPA</span>
              <span>May 2020</span>
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-blue-600">Certifications</h2>
          <div className="space-y-3">
            <div className="flex items-start gap-2 text-gray-700">
              <span>•</span>
              <div>
                <span>Machine Learning with Python: A Practical Introduction (IBM)</span>
                <a 
                  href="https://courses.edx.org/certificates/33194b74fb064e11932ad8ed3f46ba0c" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block text-blue-600 hover:text-blue-700"
                >
                  View Certificate
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
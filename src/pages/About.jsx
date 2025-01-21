import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";


const About = () => {
  return (
    <div>
      <Navbar showTabs={true} />
      <div className="pt-20 px-6 max-w-[1280px] mx-auto">
        <h1 className="text-3xl font-bold mb-8">About ScribbleSync</h1>
        
        <div className="space-y-8">
          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-blue-600">Overview</h2>
            <p className="text-gray-700 leading-relaxed">
              ScribbleSync is a collaborative note-taking application that enables real-time collaboration 
              between users. It provides a seamless experience for creating, editing, and sharing notes 
              with team members.
            </p>
          </section>

          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-blue-600">Key Features</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Real-time collaborative editing</li>
              <li>Secure note sharing</li>
              <li>Rich text formatting</li>
              <li>Instant updates across devices</li>
              <li>User-friendly interface</li>
            </ul>
          </section>

          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-blue-600">Technology Stack</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="p-4 bg-gray-50 rounded-md">
                <h3 className="font-semibold mb-2">Frontend</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>React.js</li>
                  <li>TailwindCSS</li>
                  <li>Socket.IO Client</li>
                </ul>
              </div>
              <div className="p-4 bg-gray-50 rounded-md">
                <h3 className="font-semibold mb-2">Backend</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>Node.js</li>
                  <li>Nest.js</li>
                  <li>MongoDB</li>
                </ul>
              </div>
              <div className="p-4 bg-gray-50 rounded-md">
                <h3 className="font-semibold mb-2">Real-time</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>Socket.IO</li>
                  <li>WebSocket</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-blue-600">Contact</h2>
            <p className="text-gray-700 mb-4">
              For any queries or support, please reach out to us at:
            </p>
            <a 
              href="mailto:support@scribblesync.com" 
              className="text-blue-600 hover:text-blue-700"
            >
              akshayghatiki311@gmail.com
            </a>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About; 


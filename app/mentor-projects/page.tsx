'use client';

import { Navbar } from '@/components/navbar';
import { ProjectCard } from '@/components/project-card';
import { motion } from 'framer-motion';

const mentorProjects = [
  {
    id: 'm1',
    title: 'Quantum Computing Research',
    category: 'Computer Science', // bg-purple-500
    mentor: 'Dr. Sarah Johnson',
    skillLevel: 'Advanced' as const,
    description: 'Research on quantum algorithms and their applications in cryptography.',
  },
  {
    id: 'm2',
    title: 'Sustainable Energy Systems',
    category: 'Environmental Engineering', // bg-green-600
    mentor: 'Prof. Michael Chen',
    skillLevel: 'Intermediate' as const,
    description: 'Research project on innovative renewable energy storage solutions.',
  },
  {
    id: 'm3',
    title: 'Healthcare AI Diagnostics',
    category: 'Medical Technology', // bg-violet-600
    mentor: 'Dr. Emily Rodriguez',
    skillLevel: 'Advanced' as const,
    description: 'Research on AI-powered diagnostic tools for early disease detection.',
  },
  {
    id: 'm4',
    title: 'Brain-Computer Interfaces',
    category: 'Neural Engineering', // bg-red-500
    mentor: 'Dr. A. Mehta',
    skillLevel: 'Advanced' as const,
    description: 'Research on neural signal processing and hands-free tech interfaces.',
  },
  {
    id: 'm5',
    title: 'Climate Modeling with AI',
    category: 'Climate Science + ML', // bg-sky-500
    mentor: 'Prof. Rina Das',
    skillLevel: 'Intermediate' as const,
    description: 'Use ML to simulate and analyze climate change patterns.',
  },
  {
    id: 'm6',
    title: 'Smart Prosthetics Research',
    category: 'Smart Prosthetics', // bg-rose-600
    mentor: 'Dr. Mohan Iyer',
    skillLevel: 'Advanced' as const,
    description: 'Research project on intelligent prosthetic limb movement prediction.',
  },
];

export default function MentorProjectsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 py-12 bg-gray-50 mt-8">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold mb-4">Mentor-Based Research Projects</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Engage in cutting-edge research projects under the guidance of experienced mentors.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {mentorProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              >
                <ProjectCard {...project} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </main>
    </div>
  );
}

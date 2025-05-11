'use client';

import { useState } from 'react';
import { Navbar } from '@/components/navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import Link from 'next/link';

// Mock trending project ideas
const trendingProjects = [
  {
    id: 1,
    title: 'AI-Powered Music Recommendation System',
    description:
      'Create a smart music recommendation system using machine learning to suggest songs based on mood and preferences.',
    tags: ['AI', 'Music', 'Machine Learning'],
    gradient: 'from-pink-600 to-purple-600',
  },
  {
    id: 2,
    title: 'Eco-Friendly Transportation Tracker',
    description:
      'Develop a mobile app to track and reward sustainable transportation choices on campus.',
    tags: ['Mobile', 'Sustainability', 'GPS'],
    gradient: 'from-green-500 to-emerald-600',
  },
  {
    id: 3,
    title: 'Virtual Lab Simulator',
    description:
      'Build a VR-based science lab simulator for conducting virtual experiments safely.',
    tags: ['VR', 'Education', '3D'],
    gradient: 'from-blue-600 to-cyan-500',
  },
  {
    id: 4,
    title: 'Smart Study Group Matcher',
    description:
      'Create an AI-powered platform that matches students with study groups based on learning styles and schedules.',
    tags: ['Web', 'AI', 'Social'],
    gradient: 'from-orange-500 to-red-500',
  },
  {
    id: 5,
    title: 'Campus Food Waste Reducer',
    description: 'Design an IoT solution to track and minimize food waste in campus cafeterias.',
    tags: ['IoT', 'Sustainability', 'Data'],
    gradient: 'from-yellow-500 to-orange-600',
  },
  {
    id: 6,
    title: 'Accessible Learning Tools',
    description:
      'Develop assistive technology tools to make online learning more accessible for students with disabilities.',
    tags: ['Accessibility', 'Education', 'UI/UX'],
    gradient: 'from-indigo-600 to-blue-700',
  },
];

export default function DiscoverProjectsPage() {
  const [prompt, setPrompt] = useState('');
  const [generatedIdeas, setGeneratedIdeas] = useState<
    Array<{
      title: string;
      description: string;
      tags: string[];
    }>
  >([]);

  const handleGenerateIdea = () => {
    // Mock AI generation - in reality, this would call an API
    const mockIdeas = [
      {
        title: 'Health Data Analytics Dashboard',
        description:
          'Create a beginner-friendly dashboard that visualizes health trends using machine learning.',
        tags: ['AI', 'Healthcare', 'Data Visualization'],
      },
      {
        title: 'Medical Appointment Scheduler',
        description: 'Build an AI-powered system to optimize hospital appointment scheduling.',
        tags: ['Healthcare', 'AI', 'Scheduling'],
      },
    ];
    setGeneratedIdeas(mockIdeas);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-1 pt-20">
        <div className="container mx-auto px-4 py-8">
          {/* Trending Projects Section */}
          <section className="mb-16">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-[#1e3a3a] mb-4">Discover Project Ideas</h1>
              <p className="text-xl text-gray-600">
                Explore innovative project ideas or generate custom ones tailored to your interests
              </p>
            </div>

            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-[#1e3a3a]">Trending Project Ideas</h2>
              <Button asChild className="bg-[#6b3e7c] hover:bg-[#5a2e6b] text-white">
                <Link href="/submit-idea">Submit Your Own Idea</Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {trendingProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card
                    className={`h-full p-5 bg-gradient-to-br ${project.gradient} text-white rounded-lg shadow-md hover:shadow-lg transition-shadow`}
                  >
                    <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                    <p className="mb-4 text-white/90">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <Badge key={tag} className="bg-white/20 hover:bg-white/30 text-white">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </section>

          {/* AI Idea Generator Section */}
          <section className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-[#1e3a3a] mb-3">
                Need a Custom Project Idea?
              </h2>
              <p className="text-gray-600">
                Use our AI assistant to generate fresh ideas tailored to your prompt.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="space-y-4">
                <Input
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g. beginner-level AI project in health"
                  className="w-full"
                />
                <Button
                  onClick={handleGenerateIdea}
                  className="w-full bg-[#6b3e7c] hover:bg-[#5a2e6b] text-white"
                >
                  Generate Idea
                </Button>
              </div>

              {generatedIdeas.length > 0 && (
                <div className="mt-8 space-y-4">
                  <h3 className="text-lg font-semibold text-[#1e3a3a] mb-4">Generated Ideas:</h3>
                  {generatedIdeas.map((idea, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <Card className="p-5 bg-gradient-to-br from-[#6b3e7c] to-[#5a2e6b] text-white rounded-lg">
                        <h4 className="text-lg font-semibold mb-2">{idea.title}</h4>
                        <p className="mb-3 text-white/90">{idea.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {idea.tags.map((tag) => (
                            <Badge key={tag} className="bg-white/20 hover:bg-white/30 text-white">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

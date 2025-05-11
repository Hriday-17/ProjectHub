// Project detail page showing project information and application status
'use client';

import { Navbar } from '@/components/navbar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MentorPanel } from '@/components/mentor-panel';
import { TeamFormation } from '@/components/team-formation';
import { ProjectSubmissionForm } from '@/components/project-submission-form';
import { ChatBox } from '@/components/chat-box';
import Link from 'next/link';
import { ArrowLeft, Calendar, Users, BookOpen } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ProjectDetailPage() {
  const params = useParams();
  const [projectId, setProjectId] = useState<string>('');
  const [isMounted, setIsMounted] = useState(false);
  const [project, setProject] = useState<any>(null);

  useEffect(() => {
    setIsMounted(true);
    // Only set projectId after client-side hydration
    if (params && params.id) {
      const id = Array.isArray(params.id) ? params.id[0] : (params.id as string);
      setProjectId(id);

      // Initialize project data after client-side hydration
      setProject({
        id: id,
        title: 'AI-Powered Healthcare Assistant',
        category: 'Engineering & Computer Science',
        mentor: {
          name: 'Dr. Sarah Johnson',
          department: 'Computer Science',
          avatar: '/placeholder.svg?height=80&width=80',
          status: 'approved' as const,
        },
        description:
          'Develop an AI-powered healthcare assistant that can help patients manage their medications, schedule appointments, and provide basic health information. The assistant should be able to understand natural language queries and provide accurate responses.',
        skillLevel: 'Intermediate',
        timeline: '12 weeks',
        teamSize: '3-5 students',
        status: 'Approved',
      });
    }
  }, [params]);

  // Return a loading state during server-side rendering or initial client render
  if (!isMounted || !project) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <main className="flex-1 py-8">
          <div className="container">
            <div className="bg-white rounded-xl p-6 shadow-sm mb-8 animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
              <div className="h-24 bg-gray-200 rounded mb-6"></div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-1 py-8">
        <div className="container">
          <Link href="/dashboard" className="flex items-center text-[#6b3e7c] mb-6 hover:underline">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Dashboard
          </Link>

          <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-3xl font-bold">{project.title}</h1>
                <p className="text-gray-500">{project.category}</p>
              </div>
              <Badge
                className={
                  project.status === 'Approved'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }
              >
                {project.status}
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Timeline</p>
                  <p className="font-medium">{project.timeline}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Team Size</p>
                  <p className="font-medium">{project.teamSize}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Skill Level</p>
                  <p className="font-medium">{project.skillLevel}</p>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-bold mb-2">Project Description</h2>
              <p className="text-gray-700">{project.description}</p>
            </div>

            <div className="flex gap-4">
              <Button className="bg-[#6b3e7c] hover:bg-[#5a2e6b]">Apply Now</Button>
              <Button variant="outline">Save Project</Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <TeamFormation />
              <ProjectSubmissionForm />
            </div>

            <div className="space-y-8">
              <MentorPanel mentor={project.mentor} />
              <ChatBox />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

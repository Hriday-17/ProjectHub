// Dashboard page showing AI-recommended projects and task tracking
import { Navbar } from '@/components/navbar';
import { Dashboard } from '@/components/dashboard';
import { KanbanBoard } from '@/components/kanban-board';
import { ChatBox } from '@/components/chat-box';

export default function DashboardPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-1 py-8">
        <div className="container">
          <h1 className="text-4xl font-bold mb-8">Your Dashboard</h1>

          <Dashboard />

          <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <KanbanBoard />
            </div>
            <div>
              <ChatBox />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

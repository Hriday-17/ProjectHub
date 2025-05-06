// Component: Replicates team formation & group assignment
"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Avatar } from "./ui/avatar"
import { Badge } from "./ui/badge"
import { UserPlus, Users, Plus } from "lucide-react"

interface TeamMember {
  id: string
  name: string
  role: string
  avatar: string
}

// Mock data for team members
const initialTeamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Michael Chen",
    role: "Team Lead",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "2",
    name: "Emily Rodriguez",
    role: "UI/UX Designer",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "3",
    name: "James Wilson",
    role: "Backend Developer",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export function TeamFormation() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(initialTeamMembers)
  const [showCreateTeam, setShowCreateTeam] = useState(false)
  const [teamName, setTeamName] = useState("")

  return (
    <div className="border rounded-xl p-6 bg-white shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Team Formation</h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => setShowCreateTeam(!showCreateTeam)}
          >
            <Plus className="h-4 w-4" />
            Create New Team
          </Button>
          <Button className="bg-[#6b3e7c] hover:bg-[#5a2e6b] flex items-center gap-2">
            <UserPlus className="h-4 w-4" />
            Invite Members
          </Button>
        </div>
      </div>

      {showCreateTeam && (
        <div className="mb-6 p-4 border rounded-lg bg-gray-50">
          <h3 className="text-lg font-medium mb-3">Create a New Team</h3>
          <div className="flex gap-3">
            <Input
              placeholder="Enter team name"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              className="flex-1"
            />
            <Button className="bg-[#6b3e7c] hover:bg-[#5a2e6b]">Create Team</Button>
          </div>
        </div>
      )}

      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Users className="h-5 w-5 text-gray-500" />
          <h3 className="text-lg font-medium">Current Team</h3>
          <Badge className="ml-2 bg-[#6b3e7c]">{teamMembers.length} Members</Badge>
        </div>

        <div className="space-y-4">
          {teamMembers.map((member) => (
            <div key={member.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <img src={member.avatar || "/placeholder.svg"} alt={member.name} />
                </Avatar>
                <div>
                  <h4 className="font-medium">{member.name}</h4>
                  <p className="text-sm text-gray-500">{member.role}</p>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                View Profile
              </Button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Suggested Team Members</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <img src={`/placeholder.svg?height=40&width=40&text=${i}`} alt={`Suggested Member ${i}`} />
                </Avatar>
                <div>
                  <h4 className="font-medium">Suggested Member {i}</h4>
                  <p className="text-sm text-gray-500">Matching Skills</p>
                </div>
              </div>
              <Button size="sm" variant="outline" className="flex items-center gap-1">
                <UserPlus className="h-3 w-3" />
                Invite
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

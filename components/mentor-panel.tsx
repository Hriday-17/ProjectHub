// Component: Replicates mentor assignment & approval panel
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { Avatar } from "./ui/avatar"
import { CheckCircle, XCircle, Clock } from "lucide-react"

interface MentorPanelProps {
  mentor: {
    name: string
    department: string
    avatar: string
    status: "pending" | "approved" | "rejected"
  }
}

export function MentorPanel({ mentor }: MentorPanelProps) {
  const statusConfig = {
    pending: {
      icon: Clock,
      text: "Pending Approval",
      color: "bg-yellow-100 text-yellow-800",
    },
    approved: {
      icon: CheckCircle,
      text: "Approved",
      color: "bg-green-100 text-green-800",
    },
    rejected: {
      icon: XCircle,
      text: "Rejected",
      color: "bg-red-100 text-red-800",
    },
  }

  const StatusIcon = statusConfig[mentor.status].icon

  return (
    <div className="border rounded-xl p-6 bg-white shadow-sm">
      <h2 className="text-xl font-bold mb-4">Mentor Assignment</h2>

      <div className="flex items-center gap-4 mb-6">
        <Avatar className="h-16 w-16">
          <img src={mentor.avatar || "/placeholder.svg"} alt={mentor.name} />
        </Avatar>
        <div>
          <h3 className="text-lg font-bold">{mentor.name}</h3>
          <p className="text-gray-500">{mentor.department}</p>
          <Badge className={statusConfig[mentor.status].color + " mt-2 flex items-center gap-1 w-fit"}>
            <StatusIcon className="h-3 w-3" />
            {statusConfig[mentor.status].text}
          </Badge>
        </div>
      </div>

      {mentor.status === "pending" && (
        <p className="text-sm text-gray-600 mb-4">
          Your mentor assignment is pending approval. You will be notified once the mentor responds.
        </p>
      )}

      {mentor.status === "approved" && (
        <p className="text-sm text-gray-600 mb-4">
          Your mentor has approved your project! You can now proceed with the project submission.
        </p>
      )}

      {mentor.status === "rejected" && (
        <p className="text-sm text-gray-600 mb-4">
          Your mentor has rejected your project. Please review the feedback and request reassignment.
        </p>
      )}

      <div className="flex gap-3">
        <Button variant="outline" className="flex-1">
          Contact Mentor
        </Button>
        {mentor.status === "rejected" && (
          <Button className="flex-1 bg-[#6b3e7c] hover:bg-[#5a2e6b]">Request Reassignment</Button>
        )}
      </div>
    </div>
  )
}

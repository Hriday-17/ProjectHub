"use client"

import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import Link from "next/link"
import { motion } from "framer-motion"

interface ProjectCardProps {
  id: string
  title: string
  category: string
  mentor: string
  skillLevel: "Beginner" | "Intermediate" | "Advanced"
  status?: "Pending" | "Under Review" | "Approved" | null
}

export function ProjectCard({ id, title, category, mentor, skillLevel, status }: ProjectCardProps) {
  const skillColors = {
    Beginner: "bg-green-100 text-green-800",
    Intermediate: "bg-blue-100 text-blue-800",
    Advanced: "bg-purple-100 text-purple-800",
  }

  const statusColors = {
    Pending: "bg-yellow-100 text-yellow-800",
    "Under Review": "bg-blue-100 text-blue-800",
    Approved: "bg-green-100 text-green-800",
  }

  return (
    <motion.div
      className="rounded-xl border bg-white p-6 shadow-sm transition-all hover:shadow-md"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold">{title}</h3>
          <p className="text-[#6b3e7c]">{category}</p>
        </div>
        <Badge className={skillColors[skillLevel]}>{skillLevel}</Badge>
      </div>

      <div className="mb-6">
        <p className="text-sm text-gray-600">
          Mentor: <span className="font-medium">{mentor}</span>
        </p>
        {status && (
          <div className="mt-2">
            <Badge className={statusColors[status]}>{status}</Badge>
          </div>
        )}
      </div>

      <div className="flex justify-between items-center">
        <Button asChild variant="outline" size="sm">
          <Link href={`/project/${id}`}>View Details</Link>
        </Button>
        <Button
          className="bg-[#6b3e7c] hover:bg-[#5a2e6b]"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          as={motion.button}
        >
          Apply Now
        </Button>
      </div>
    </motion.div>
  )
}

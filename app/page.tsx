"use client"

import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, BookOpen, Users, Code, Brain, Database, Shield, Cloud } from "lucide-react"
import { useEffect, useState } from "react"

export default function Home() {
  // Use state to handle client-side image loading
  const [imgSrc, setImgSrc] = useState("/placeholder.jpg")
  const [imgLoaded, setImgLoaded] = useState(false)

  // Handle image errors
  const handleImageError = () => {
    setImgSrc("https://placehold.co/600x400?text=AI+Healthcare+Assistant")
  }

  // Set image as loaded
  const handleImageLoad = () => {
    setImgLoaded(true)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-[#1e3a3a] py-20 text-white mt-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <motion.h1
              className="text-5xl md:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              ProjectHub
            </motion.h1>
            <motion.div
              className="text-3xl md:text-4xl font-light mb-8 border-l-4 border-yellow-400 pl-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <p>
                "A student-powered ecosystem to connect, collaborate, and launch real projects in technology and innovation — bridging education with global opportunity."
              </p>
            </motion.div>
            <motion.p
              className="text-xl mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              Empowering students through transformative education and research in cutting-edge technology fields
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <Button asChild className="bg-[#6b3e7c] hover:bg-[#5a2e6b] text-white px-8 py-6 text-lg rounded-lg">
                <Link href="/projects">Explore Projects</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Programs & Fields Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <motion.h2
              className="text-3xl font-bold text-[#1e3a3a]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Programs & Fields
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Button variant="outline" className="flex items-center gap-2">
                View All
                <ArrowRight className="h-4 w-4" />
              </Button>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              className="bg-[#f39c12] text-white p-8 rounded-xl shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.05 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex justify-between items-start mb-6">
                <Brain className="h-10 w-10" />
                <span className="text-sm font-medium bg-white/20 px-3 py-1 rounded-full">Popular</span>
              </div>
              <h3 className="text-2xl font-bold mb-2">Artificial Intelligence</h3>
              <p className="mb-6">
                Explore cutting-edge AI technologies including machine learning, neural networks, and natural language
                processing.
              </p>
              <Button asChild variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-none">
                <Link href="/projects?category=artificial-intelligence">Explore Projects</Link>
              </Button>
            </motion.div>

            <motion.div
              className="bg-[#3498db] text-white p-8 rounded-xl shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex justify-between items-start mb-6">
                <Code className="h-10 w-10" />
                <span className="text-sm font-medium bg-white/20 px-3 py-1 rounded-full">In Demand</span>
              </div>
              <h3 className="text-2xl font-bold mb-2">Software Development</h3>
              <p className="mb-6">
                Build practical skills in web, mobile, and desktop application development with modern frameworks and
                tools.
              </p>
              <Button asChild variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-none">
                <Link href="/projects?category=software-development">Explore Projects</Link>
              </Button>
            </motion.div>

            <motion.div
              className="bg-[#2ecc71] text-white p-8 rounded-xl shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex justify-between items-start mb-6">
                <Database className="h-10 w-10" />
                <span className="text-sm font-medium bg-white/20 px-3 py-1 rounded-full">Growing</span>
              </div>
              <h3 className="text-2xl font-bold mb-2">Data Science</h3>
              <p className="mb-6">
                Learn to extract insights from complex datasets using statistical analysis, visualization, and machine
                learning.
              </p>
              <Button asChild variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-none">
                <Link href="/projects?category=data-science">Explore Projects</Link>
              </Button>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <motion.div
              className="bg-[#e74c3c] text-white p-8 rounded-xl shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex justify-between items-start mb-6">
                <Shield className="h-10 w-10" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Cybersecurity</h3>
              <p className="mb-6">
                Develop skills to protect systems, networks, and data from digital attacks and security breaches.
              </p>
              <Button asChild variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-none">
                <Link href="/projects?category=cybersecurity">Explore Projects</Link>
              </Button>
            </motion.div>

            <motion.div
              className="bg-[#9b59b6] text-white p-8 rounded-xl shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex justify-between items-start mb-6">
                <Cloud className="h-10 w-10" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Cloud Computing</h3>
              <p className="mb-6">
                Master cloud platforms, serverless architecture, and distributed systems for scalable applications.
              </p>
              <Button asChild variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-none">
                <Link href="/projects?category=cloud-computing">Explore Projects</Link>
              </Button>
            </motion.div>

            <motion.div
              className="bg-[#1abc9c] text-white p-8 rounded-xl shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex justify-between items-start mb-6">
                <BookOpen className="h-10 w-10" />
              </div>
              <h3 className="text-2xl font-bold mb-2">View All Programs</h3>
              <p className="mb-6">
                Discover our full range of computer science and AI programs designed to prepare you for the tech
                industry.
              </p>
              <Button asChild variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-none">
                <Link href="/projects">Browse All</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Project Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl font-bold mb-10 text-[#1e3a3a]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Featured Project
          </motion.h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <motion.div
              className="rounded-xl overflow-hidden shadow-lg"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img
                src={imgSrc}
                alt="AI Healthcare Assistant Project"
                className="w-full h-auto"
                onError={handleImageError}
                onLoad={handleImageLoad}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block bg-[#6b3e7c] text-white px-3 py-1 rounded-full text-sm font-medium mb-4">
                Artificial Intelligence
              </span>
              <h3 className="text-2xl font-bold mb-4 text-[#1e3a3a]">AI-Powered Healthcare Assistant</h3>
              <p className="text-gray-600 mb-6">
                This innovative project combines natural language processing and machine learning to create an AI
                assistant that helps patients manage medications, schedule appointments, and access health information.
                Students will work with healthcare professionals to ensure the solution meets real-world needs.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="bg-gray-200 px-3 py-1 rounded-full text-sm">Machine Learning</span>
                <span className="bg-gray-200 px-3 py-1 rounded-full text-sm">NLP</span>
                <span className="bg-gray-200 px-3 py-1 rounded-full text-sm">Healthcare</span>
                <span className="bg-gray-200 px-3 py-1 rounded-full text-sm">Python</span>
              </div>
              <div className="flex gap-4">
                <Button asChild className="bg-[#6b3e7c] hover:bg-[#5a2e6b]">
                  <Link href="/project/1">View Project Details</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/mentors">Find a Mentor</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Program Details Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl font-bold mb-10 text-[#1e3a3a]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            Computer Science & AI Programs
          </motion.h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 bg-[#1e3a3a] text-white p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-6">Computer Science & AI</h3>
              <p className="mb-6">
                Computer Science and AI are fields that solve some of the most impactful problems the world faces today.
                At ProjectHub, we connect students with real-world projects that require logical thinking and creative
                problem-solving.
              </p>
              <p>
                We partner with industry leaders to provide our students world-class learning and experiential
                facilities to develop practical skills and knowledge sought-after in global tech markets.
              </p>
            </div>

            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                  className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-[#f0e5ff] p-3 rounded-full">
                      <Code className="h-6 w-6 text-[#6b3e7c]" />
                    </div>
                    <h4 className="text-xl font-bold">BSc Computer Science</h4>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Learn fundamental programming concepts, algorithms, data structures, and software engineering
                    principles to build robust applications.
                  </p>
                  <Button asChild variant="link" className="p-0 text-[#6b3e7c]">
                    <Link href="/projects?program=bsc-computer-science">
                      View Projects <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </motion.div>

                <motion.div
                  className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-[#f0e5ff] p-3 rounded-full">
                      <Brain className="h-6 w-6 text-[#6b3e7c]" />
                    </div>
                    <h4 className="text-xl font-bold">BSc Artificial Intelligence</h4>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Specialize in machine learning, neural networks, computer vision, and natural language processing to
                    build intelligent systems.
                  </p>
                  <Button asChild variant="link" className="p-0 text-[#6b3e7c]">
                    <Link href="/projects?program=bsc-artificial-intelligence">
                      View Projects <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </motion.div>

                <motion.div
                  className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-[#f0e5ff] p-3 rounded-full">
                      <Database className="h-6 w-6 text-[#6b3e7c]" />
                    </div>
                    <h4 className="text-xl font-bold">BSc Data Science</h4>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Master data analysis, statistical modeling, and visualization techniques to extract insights from
                    complex datasets.
                  </p>
                  <Button asChild variant="link" className="p-0 text-[#6b3e7c]">
                    <Link href="/projects?program=bsc-data-science">
                      View Projects <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </motion.div>

                <motion.div
                  className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-[#f0e5ff] p-3 rounded-full">
                      <Shield className="h-6 w-6 text-[#6b3e7c]" />
                    </div>
                    <h4 className="text-xl font-bold">BSc Cybersecurity</h4>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Develop expertise in network security, ethical hacking, cryptography, and security risk management.
                  </p>
                  <Button asChild variant="link" className="p-0 text-[#6b3e7c]">
                    <Link href="/projects?program=bsc-cybersecurity">
                      View Projects <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose ProjectHub Section */}
      <section className="py-16 bg-[#6b3e7c] text-white">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl font-bold mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            Why Choose ProjectHub
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <BookOpen className="h-10 w-10" />,
                title: "Project-Based Learning",
                description:
                  "Learn by doing with real-world projects that build your portfolio and prepare you for industry challenges.",
              },
              {
                icon: <Users className="h-10 w-10" />,
                title: "Expert Mentorship",
                description:
                  "Get guidance from industry professionals and academic experts who are leaders in their fields.",
              },
              {
                icon: <Code className="h-10 w-10" />,
                title: "Cutting-Edge Technology",
                description:
                  "Work with the latest tools and technologies used in the industry to stay ahead of the curve.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white/10 p-6 rounded-xl text-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 + index * 0.1 }}
              >
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-white/80">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <Button asChild size="lg" className="bg-white text-[#6b3e7c] hover:bg-gray-100 px-8">
              <Link href="/about">Learn More About Us</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <footer className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">ProjectHub</h3>
              <p className="text-gray-600">Empowering students through transformational education and research.</p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-gray-600 hover:text-[#6b3e7c]">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/projects" className="text-gray-600 hover:text-[#6b3e7c]">
                    Projects
                  </Link>
                </li>
                <li>
                  <Link href="/mentors" className="text-gray-600 hover:text-[#6b3e7c]">
                    Mentors
                  </Link>
                </li>
                <li>
                  <Link href="/tasks" className="text-gray-600 hover:text-[#6b3e7c]">
                    Tasks
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/faq" className="text-gray-600 hover:text-[#6b3e7c]">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/support" className="text-gray-600 hover:text-[#6b3e7c]">
                    Support
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-gray-600 hover:text-[#6b3e7c]">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-gray-600 hover:text-[#6b3e7c]">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Connect</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-600 hover:text-[#6b3e7c]">
                    Twitter
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-[#6b3e7c]">
                    LinkedIn
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-[#6b3e7c]">
                    GitHub
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-[#6b3e7c]">
                    Discord
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-500">
            <p>&copy; {new Date().getFullYear()} ProjectHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

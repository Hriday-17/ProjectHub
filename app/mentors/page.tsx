'use client';

import { useState } from 'react';
import { Navbar } from '@/components/navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal, Mail } from 'lucide-react';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

// Mock data for mentors
const allMentors = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    department: 'Artificial Intelligence',
    expertise: ['Neural Networks', 'Computer Vision', 'NLP'],
    avatar: '/placeholder.svg?height=150&width=150&text=SJ',
    availability: 'Available',
  },
  {
    id: '2',
    name: 'Prof. Michael Chen',
    department: 'Data Science',
    expertise: ['Big Data', 'Statistical Analysis', 'Data Visualization'],
    avatar: '/placeholder.svg?height=150&width=150&text=MC',
    availability: 'Limited',
  },
  {
    id: '3',
    name: 'Dr. Emily Rodriguez',
    department: 'Mobile App Development',
    expertise: ['iOS Development', 'Android Development', 'AR/VR'],
    avatar: '/placeholder.svg?height=150&width=150&text=ER',
    availability: 'Available',
  },
  {
    id: '4',
    name: 'Dr. James Wilson',
    department: 'Machine Learning',
    expertise: ['Deep Learning', 'Reinforcement Learning', 'Computer Vision'],
    avatar: '/placeholder.svg?height=150&width=150&text=JW',
    availability: 'Unavailable',
  },
  {
    id: '5',
    name: 'Prof. Lisa Thompson',
    department: 'Blockchain',
    expertise: ['Smart Contracts', 'Cryptocurrency', 'Distributed Systems'],
    avatar: '/placeholder.svg?height=150&width=150&text=LT',
    availability: 'Available',
  },
  {
    id: '6',
    name: 'Dr. Robert Brown',
    department: 'Internet of Things',
    expertise: ['Embedded Systems', 'Sensor Networks', 'Smart Devices'],
    avatar: '/placeholder.svg?height=150&width=150&text=RB',
    availability: 'Limited',
  },
  {
    id: '7',
    name: 'Dr. Michael Lee',
    department: 'Cybersecurity',
    expertise: ['Network Security', 'Ethical Hacking', 'Cryptography'],
    avatar: '/placeholder.svg?height=150&width=150&text=ML',
    availability: 'Available',
  },
  {
    id: '8',
    name: 'Prof. Jennifer Adams',
    department: 'Cloud Computing',
    expertise: ['AWS', 'Azure', 'Serverless Architecture'],
    avatar: '/placeholder.svg?height=150&width=150&text=JA',
    availability: 'Limited',
  },
];

export default function MentorsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [availabilityFilter, setAvailabilityFilter] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const filteredMentors = allMentors.filter((mentor) => {
    const matchesSearch =
      mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.expertise.some((exp) => exp.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesDepartment = departmentFilter === '' || mentor.department === departmentFilter;

    const matchesAvailability =
      availabilityFilter === '' || mentor.availability === availabilityFilter;

    return matchesSearch && matchesDepartment && matchesAvailability;
  });

  const availabilityColors = {
    Available: 'bg-green-100 text-green-800',
    Limited: 'bg-yellow-100 text-yellow-800',
    Unavailable: 'bg-red-100 text-red-800',
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 py-12 bg-gray-50 mt-8">
        <div className="container mx-auto px-4">
          <motion.div
            className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold text-[#1e3a3a]">Find a Mentor</h1>

            <div className="flex gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search mentors..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" className="flex items-center gap-2" onClick={toggleFilters}>
                <SlidersHorizontal className="h-4 w-4" />
                Filters
              </Button>
            </div>
          </motion.div>

          {showFilters && (
            <motion.div
              className="bg-white p-6 rounded-xl shadow-sm mb-8 grid grid-cols-1 md:grid-cols-2 gap-4"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                <Select
                  value={departmentFilter}
                  onChange={(e) => setDepartmentFilter(e.target.value)}
                  className="w-full"
                >
                  <option value="">All Departments</option>
                  <option value="Artificial Intelligence">Artificial Intelligence</option>
                  <option value="Machine Learning">Machine Learning</option>
                  <option value="Data Science">Data Science</option>
                  <option value="Web Development">Web Development</option>
                  <option value="Mobile App Development">Mobile App Development</option>
                  <option value="Cybersecurity">Cybersecurity</option>
                  <option value="Cloud Computing">Cloud Computing</option>
                  <option value="Blockchain">Blockchain</option>
                  <option value="Internet of Things">Internet of Things</option>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Availability</label>
                <Select
                  value={availabilityFilter}
                  onChange={(e) => setAvailabilityFilter(e.target.value)}
                  className="w-full"
                >
                  <option value="">All Availability</option>
                  <option value="Available">Available</option>
                  <option value="Limited">Limited</option>
                  <option value="Unavailable">Unavailable</option>
                </Select>
              </div>
            </motion.div>
          )}

          <p className="text-gray-600 mb-8">
            Connect with expert mentors in computer science and AI who can guide you through your
            project journey. Our mentors are experienced professionals and academics who are
            passionate about helping students succeed.
          </p>

          {filteredMentors.length > 0 ? (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {filteredMentors.map((mentor, index) => (
                <motion.div
                  key={mentor.id}
                  className="bg-white rounded-xl shadow-sm overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-16 w-16">
                          <img src={mentor.avatar || '/placeholder.svg'} alt={mentor.name} />
                        </Avatar>
                        <div>
                          <h3 className="text-xl font-bold text-[#1e3a3a]">{mentor.name}</h3>
                          <p className="text-[#6b3e7c]">{mentor.department}</p>
                        </div>
                      </div>
                      <Badge
                        className={
                          availabilityColors[mentor.availability as keyof typeof availabilityColors]
                        }
                      >
                        {mentor.availability}
                      </Badge>
                    </div>

                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Expertise</h4>
                      <div className="flex flex-wrap gap-2">
                        {mentor.expertise.map((skill) => (
                          <Badge key={skill} className="bg-gray-100 text-gray-800">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button className="flex-1 bg-[#6b3e7c] hover:bg-[#5a2e6b]">
                        View Profile
                      </Button>
                      <Button variant="outline" className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        Contact
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-xl font-medium text-gray-600 mb-2">No mentors found</h3>
              <p className="text-gray-500">Try adjusting your search or filters</p>
            </motion.div>
          )}
        </div>
      </main>

      <footer className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-500">
            <p>&copy; {new Date().getFullYear()} ProjectHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

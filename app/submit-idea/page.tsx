'use client';

import { useState } from 'react';
import { Navbar } from '@/components/navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface FormData {
  title: string;
  description: string;
  category: string;
  skillLevel: string;
  tags: string[];
}

export default function SubmitIdeaPage() {
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    category: '',
    skillLevel: '',
    tags: [],
  });
  const [tagInput, setTagInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock submission - would normally go to a backend API
    console.log('Submitted idea:', formData);
    toast({
      title: 'Success!',
      description: 'Your idea has been sent to our team for review.',
      duration: 5000,
    });
    // Reset form
    setFormData({
      title: '',
      description: '',
      category: '',
      skillLevel: '',
      tags: [],
    });
  };

  const handleTagInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const newTag = tagInput.trim();
      if (newTag && !formData.tags.includes(newTag)) {
        setFormData((prev) => ({
          ...prev,
          tags: [...prev.tags, newTag],
        }));
      }
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-1 pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-[#1e3a3a] mb-4">Submit Your Project Idea</h1>
              <p className="text-gray-600">
                Share your innovative project ideas with the community
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-sm">
              <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-medium text-gray-700">
                  Project Title
                </label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter a descriptive title for your project idea"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium text-gray-700">
                  Description
                </label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, description: e.target.value }))
                  }
                  placeholder="Describe your project idea in detail"
                  className="min-h-[120px]"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="category" className="text-sm font-medium text-gray-700">
                  Category
                </label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
                  placeholder="e.g. AI, Web Development, Mobile Apps"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="skillLevel" className="text-sm font-medium text-gray-700">
                  Skill Level Required
                </label>
                <Select
                  value={formData.skillLevel}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, skillLevel: value }))}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select skill level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label htmlFor="tags" className="text-sm font-medium text-gray-700">
                  Tags (optional)
                </label>
                <Input
                  id="tags"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleTagInput}
                  placeholder="Add tags (press Enter or comma to add)"
                />
                {formData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.tags.map((tag) => (
                      <Badge
                        key={tag}
                        className="bg-[#6b3e7c] text-white pl-2 pr-1 py-1 flex items-center gap-1"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="hover:bg-[#5a2e6b] rounded-full p-1"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-4">
                <p className="text-sm text-gray-500 mb-4">
                  All submitted ideas will be reviewed by our team before going live on the Projects
                  page.
                </p>
                <Button type="submit" className="w-full bg-[#6b3e7c] hover:bg-[#5a2e6b] text-white">
                  Submit Idea for Review
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

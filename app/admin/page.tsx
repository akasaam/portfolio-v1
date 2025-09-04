"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Plus, Edit, Trash2, Eye, EyeOff, LogOut, Save, X } from "lucide-react"
import Image from "next/image"

interface Project {
  id: string
  title: string
  description: string
  image: string
  tech: string[]
  liveUrl: string
  githubUrl: string
  category: string
  featured: boolean
  createdAt: string
  updatedAt: string
}

interface ProjectFormData {
  title: string
  description: string
  image: string
  tech: string
  liveUrl: string
  githubUrl: string
  category: string
  featured: boolean
}

export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [projects, setProjects] = useState<Project[]>([])
  const [isAddingProject, setIsAddingProject] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [formData, setFormData] = useState<ProjectFormData>({
    title: "",
    description: "",
    image: "",
    tech: "",
    liveUrl: "",
    githubUrl: "",
    category: "",
    featured: false,
  })

  // Load projects from localStorage
  useEffect(() => {
    const savedProjects = localStorage.getItem("portfolio_projects")
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects))
    }
  }, [])

  // Save projects to localStorage
  const saveProjects = (updatedProjects: Project[]) => {
    localStorage.setItem("portfolio_projects", JSON.stringify(updatedProjects))
    setProjects(updatedProjects)
  }

  // Authentication
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Simple password check - in production, use proper authentication
    if (password === "admin123") {
      setIsAuthenticated(true)
      setPassword("")
    } else {
      alert("Invalid password")
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setPassword("")
  }

  // Form handling
  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      image: "",
      tech: "",
      liveUrl: "",
      githubUrl: "",
      category: "",
      featured: false,
    })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  // Add new project
  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault()
    const newProject: Project = {
      id: Date.now().toString(),
      ...formData,
      tech: formData.tech.split(",").map((t) => t.trim()),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    const updatedProjects = [newProject, ...projects]
    saveProjects(updatedProjects)
    setIsAddingProject(false)
    resetForm()
  }

  // Edit project
  const handleEditProject = (project: Project) => {
    setEditingProject(project)
    setFormData({
      title: project.title,
      description: project.description,
      image: project.image,
      tech: project.tech.join(", "),
      liveUrl: project.liveUrl,
      githubUrl: project.githubUrl,
      category: project.category,
      featured: project.featured,
    })
  }

  const handleUpdateProject = (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingProject) return

    const updatedProject: Project = {
      ...editingProject,
      ...formData,
      tech: formData.tech.split(",").map((t) => t.trim()),
      updatedAt: new Date().toISOString(),
    }

    const updatedProjects = projects.map((p) => (p.id === editingProject.id ? updatedProject : p))
    saveProjects(updatedProjects)
    setEditingProject(null)
    resetForm()
  }

  // Delete project
  const handleDeleteProject = (id: string) => {
    if (confirm("Are you sure you want to delete this project?")) {
      const updatedProjects = projects.filter((p) => p.id !== id)
      saveProjects(updatedProjects)
    }
  }

  // Toggle featured status
  const toggleFeatured = (id: string) => {
    const updatedProjects = projects.map((p) => (p.id === id ? { ...p, featured: !p.featured } : p))
    saveProjects(updatedProjects)
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">Project Admin Panel</h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">{projects.length} projects</span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Add Project Button */}
        <div className="mb-6">
          <button
            onClick={() => setIsAddingProject(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-4 w-4" />
            Add New Project
          </button>
        </div>

        {/* Add/Edit Project Form */}
        {(isAddingProject || editingProject) && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">{editingProject ? "Edit Project" : "Add New Project"}</h2>
              <button
                onClick={() => {
                  setIsAddingProject(false)
                  setEditingProject(null)
                  resetForm()
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={editingProject ? handleUpdateProject : handleAddProject} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                    Category *
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="Healthcare Platform">Healthcare Platform</option>
                    <option value="Pet Care Platform">Pet Care Platform</option>
                    <option value="Healthcare Website">Healthcare Website</option>
                    <option value="Salon Website">Salon Website</option>
                    <option value="Mental Health Platform">Mental Health Platform</option>
                    <option value="Marketing Agency">Marketing Agency</option>
                    <option value="Education Platform">Education Platform</option>
                    <option value="Mobile App">Mobile App</option>
                    <option value="Web Application">Web Application</option>
                    <option value="E-Learning Platform">E-Learning Platform</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
                  Thumbnail Image URL *
                </label>
                <input
                  type="url"
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://example.com/image.jpg"
                  required
                />
              </div>

              <div>
                <label htmlFor="tech" className="block text-sm font-medium text-gray-700 mb-1">
                  Technologies (comma-separated) *
                </label>
                <input
                  type="text"
                  id="tech"
                  name="tech"
                  value={formData.tech}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="React, Next.js, Tailwind CSS"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="liveUrl" className="block text-sm font-medium text-gray-700 mb-1">
                    Live URL *
                  </label>
                  <input
                    type="url"
                    id="liveUrl"
                    name="liveUrl"
                    value={formData.liveUrl}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://example.com"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="githubUrl" className="block text-sm font-medium text-gray-700 mb-1">
                    GitHub URL *
                  </label>
                  <input
                    type="url"
                    id="githubUrl"
                    name="githubUrl"
                    value={formData.githubUrl}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://github.com/username/repo"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="featured"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="featured" className="ml-2 block text-sm text-gray-700">
                  Featured Project (appears on homepage)
                </label>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  <Save className="h-4 w-4" />
                  {editingProject ? "Update Project" : "Add Project"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsAddingProject(false)
                    setEditingProject(null)
                    resetForm()
                  }}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Projects List */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">All Projects</h2>
          </div>

          {projects.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              No projects found. Add your first project to get started.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Project
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Technologies
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {projects.map((project) => (
                    <tr key={project.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-12 w-12">
                            <Image
                              src={project.image || "/placeholder.svg"}
                              alt={project.title}
                              width={48}
                              height={48}
                              className="h-12 w-12 rounded-lg object-cover"
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{project.title}</div>
                            <div className="text-sm text-gray-500 max-w-xs truncate">{project.description}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                          {project.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-wrap gap-1">
                          {project.tech.slice(0, 3).map((tech, index) => (
                            <span
                              key={index}
                              className="inline-flex px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.tech.length > 3 && (
                            <span className="inline-flex px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">
                              +{project.tech.length - 3}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => toggleFeatured(project.id)}
                          className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full ${
                            project.featured ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {project.featured ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                          {project.featured ? "Featured" : "Hidden"}
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleEditProject(project)}
                            className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteProject(project.id)}
                            className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

"use client"
import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { ExternalLink, Github } from "lucide-react"
import ProjectModal from "./project-modal"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface Project {
  id: string
  title: string
  description: string
  image: string
  tech: string[]
  liveUrl: string
  githubUrl: string
  category: string
  featured?: boolean
  createdAt?: string
  updatedAt?: string
}

interface ProjectGridProps {
  isHomePage?: boolean
}

export default function ProjectGrid({ isHomePage = false }: ProjectGridProps) {
  const [projects, setProjects] = useState<Project[]>([])
  const [visibleProjects, setVisibleProjects] = useState(6)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [hoveredProject, setHoveredProject] = useState<string | null>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Load projects from localStorage
    const loadProjects = () => {
      const cachedProjects = localStorage.getItem("portfolio_projects")
      if (cachedProjects) {
        const parsedProjects = JSON.parse(cachedProjects)
        setProjects(parsedProjects)
      } else {
        // Initialize with default projects if none exist
        const defaultProjects: Project[] = [
          {
            id: "1",
            title: "Sutra | Superspeciality",
            description: "Empowering families on their journey to holistic well-being.",
            image:
              "https://scontent.fccu13-1.fna.fbcdn.net/v/t39.30808-6/271765922_141059751690840_491231335670619429_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=Let43W3GRvQQ7kNvwEg5ubQ&_nc_oc=AdmhfANfsYsg-ZJQRTR5oeemk2Imhv6sXm6e6-hNzWFsb99COjB9rITN-wVxEp0DR9c&_nc_zt=23&_nc_ht=scontent.fccu13-1.fna&_nc_gid=FpnO-kcJdvXKMc44n6n2nQ&oh=00_AfJvZMewTKFBC4p_9GbuNQYUIg6qw7vqhu6Y71vT_s5S5w&oe=683D104D",
            tech: ["Under Development"],
            liveUrl: "https://v0-sutra-care.vercel.app/",
            githubUrl: "https://github.com/akasaam/Sutra-Superspeciality-Therapy",
            category: "Healthcare Platform",
            featured: true,
            createdAt: "2024-01-01T00:00:00.000Z",
            updatedAt: "2024-01-01T00:00:00.000Z",
          },
          {
            id: "2",
            title: "People and Pets",
            description: "Your one-stop destination for pet grooming, veterinary services, and premium pet food.",
            image: "https://i.pinimg.com/736x/c8/e5/dc/c8e5dc07633bcb8408247a9b78998b24.jpg",
            tech: ["Under Development"],
            liveUrl: "https://v0-people-and-pets-website.vercel.app/",
            githubUrl: "https://github.com/akasaam/people-and-pets",
            category: "Pet Care Platform",
            featured: true,
            createdAt: "2024-01-02T00:00:00.000Z",
            updatedAt: "2024-01-02T00:00:00.000Z",
          },
          {
            id: "3",
            title: "A-Smiles Dental Clinic",
            description: "A-Smiles Dental Clinic offers premium dental care with a self-care lounge experience.",
            image: "https://i.pinimg.com/736x/df/5f/a7/df5fa76c46d2d77ee390df51d0266f81.jpg",
            tech: ["React", "Next.js", "Tailwind CSS", "V.0"],
            liveUrl: "https://v0.dev/chat/a-smiles-dental-website-Uu2BJXYvKW0",
            githubUrl: "https://github.com/akasaam/A-smile-",
            category: "Healthcare Website",
            featured: true,
            createdAt: "2024-01-03T00:00:00.000Z",
            updatedAt: "2024-01-03T00:00:00.000Z",
          },
          {
            id: "4",
            title: "King Queen Salon",
            description: "Premium unisex salon in a luxurious setting where every client is treated like royalty.",
            image:
              "https://cdn.dribbble.com/userupload/26123812/file/original-c34a69dc079e0dcad53963957bca37c2.jpg?resize=1024x768&vertical=center",
            tech: ["React", "Next.js", "Tailwind CSS", "V.0"],
            liveUrl: "https://kingqueensalon.vercel.app",
            githubUrl: "https://github.com/akasaam/King-Queen-Salon",
            category: "Salon Website",
            featured: true,
            createdAt: "2024-01-04T00:00:00.000Z",
            updatedAt: "2024-01-04T00:00:00.000Z",
          },
          {
            id: "5",
            title: "Perself Mindcare",
            description: "Holistic approaches to mental wellness. Healing begins with acceptance.",
            image:
              "https://cdn.dribbble.com/userupload/17753158/file/original-6a2f902bfcc668c047f6b0d5ed9c498d.jpg?resize=1024x652&vertical=center",
            tech: ["React", "Next.js", "Tailwind CSS", "Loveable"],
            liveUrl: "https://perselfmindcarebysam.lovable.app",
            githubUrl: "https://github.com/akasaam/perself-wellness-journey",
            category: "Mental Health Platform",
            featured: false,
            createdAt: "2024-01-05T00:00:00.000Z",
            updatedAt: "2024-01-05T00:00:00.000Z",
          },
          {
            id: "6",
            title: "Twelve 7 Salon Website",
            description: "Professional salon website with booking system and service catalog",
            image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=1600&h=900&fit=crop",
            tech: ["Under Maintenance"],
            liveUrl: "https://twelve7salon.com",
            githubUrl: "https://github.com/akasaam/twelve7-salon",
            category: "Salon Website",
            featured: false,
            createdAt: "2024-01-06T00:00:00.000Z",
            updatedAt: "2024-01-06T00:00:00.000Z",
          },
        ]
        localStorage.setItem("portfolio_projects", JSON.stringify(defaultProjects))
        setProjects(defaultProjects)
      }
    }

    loadProjects()

    // Listen for storage changes (when admin panel updates projects)
    const handleStorageChange = () => {
      loadProjects()
    }

    window.addEventListener("storage", handleStorageChange)

    // Also listen for custom events from the same tab
    const handleProjectsUpdate = () => {
      loadProjects()
    }

    window.addEventListener("projectsUpdated", handleProjectsUpdate)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
      window.removeEventListener("projectsUpdated", handleProjectsUpdate)
    }
  }, [])

  useEffect(() => {
    if (projects.length > 0 && gridRef.current) {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          gridRef.current?.children || [],
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
            },
          },
        )
      }, gridRef)

      return () => ctx.revert()
    }
  }, [projects])

  // Filter projects based on page type
  const filteredProjects = isHomePage ? projects.filter((project) => project.featured !== false).slice(0, 4) : projects

  const displayedProjects = isHomePage ? filteredProjects : filteredProjects.slice(0, visibleProjects)

  const loadMore = () => {
    setVisibleProjects((prev) => prev + 6)
  }

  const handleProjectHover = (projectId: string, isHovering: boolean) => {
    setHoveredProject(isHovering ? projectId : null)
  }

  return (
    <div>
      <section className="py-16 md:py-24 px-4 sm:px-6 md:px-12">
        {!isHomePage && (
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-8 md:mb-12">
            portfolio
          </h2>
        )}

        {displayedProjects.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No projects found.</p>
          </div>
        ) : (
          <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {displayedProjects.map((project) => (
              <div
                key={project.id}
                className="aspect-video bg-gray-100 rounded-2xl md:rounded-3xl overflow-hidden relative group cursor-pointer"
                onMouseEnter={() => handleProjectHover(project.id, true)}
                onMouseLeave={() => handleProjectHover(project.id, false)}
                onClick={() => setSelectedProject(project)}
              >
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  width={600}
                  height={400}
                  className="object-cover w-full h-full transition-all duration-500 grayscale group-hover:grayscale-0 group-hover:scale-110"
                />

                {/* Hover Overlay */}
                {hoveredProject === project.id && (
                  <div className="absolute inset-0 bg-black bg-opacity-80 flex items-center justify-center transition-all duration-300 animate-fadeIn">
                    <div className="text-center text-white p-4 md:p-6">
                      <h3 className="text-xl md:text-2xl font-bold mb-2">{project.title}</h3>
                      <p className="text-gray-300 mb-4 font-outfit text-sm md:text-base">{project.description}</p>
                      <div className="flex flex-wrap gap-2 justify-center mb-4">
                        {project.tech.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 md:px-3 py-1 bg-white text-black text-xs md:text-sm rounded-full font-outfit hover:bg-gray-200 transition-colors"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-3 md:gap-4 justify-center">
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 bg-white text-black px-3 md:px-4 py-2 rounded-lg hover:bg-gray-200 transition-all duration-300 font-outfit text-sm hover:scale-105"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink className="h-3 w-3 md:h-4 md:w-4" />
                          Live Demo
                        </a>
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 bg-gray-800 text-white px-3 md:px-4 py-2 rounded-lg hover:bg-gray-700 transition-all duration-300 font-outfit text-sm hover:scale-105"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Github className="h-3 w-3 md:h-4 md:w-4" />
                          GitHub
                        </a>
                      </div>
                    </div>
                  </div>
                )}

                {/* Default Project Info */}
                <div className="absolute bottom-4 md:bottom-6 left-4 md:left-6 bg-white p-3 md:p-4 rounded-xl hover:scale-105 transition-transform duration-300">
                  <h3 className="font-bold text-sm md:text-base">{project.title}</h3>
                  <p className="text-xs md:text-sm text-gray-500 font-outfit">{project.category}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {!isHomePage && visibleProjects < filteredProjects.length && (
          <div className="text-center mt-8 md:mt-12">
            <button
              onClick={loadMore}
              className="bg-black text-white px-6 md:px-8 py-2.5 md:py-3 rounded-full hover:bg-gray-800 transition-all duration-300 font-outfit hover:scale-105 active:scale-95"
            >
              Load More Projects
            </button>
          </div>
        )}
      </section>

      {/* Project Modal */}
      {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
    </div>
  )
}

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
    // Load projects (override any stale cache to ensure latest data is visible)
    const loadProjects = () => {
      const mockProjects: Project[] = [
          {
            id: "1",
            title: "Karnika Events",
            description: "Event Planner In Kalkata.",
            image: "https://www.karnikaeventplanners.in/img/logoo.png",
            tech: ["Production"],
            liveUrl: "https://www.karnikaeventplanners.in/",
            githubUrl: "https://github.com/akasaam/",
            category: "Weadding Planner",
          },
          {
            id: "2",
            title: "The Lush Label",
            description: "A-Z all luxery gifts in under a roof.",
            image:
              "https://res.cloudinary.com/dit8rxknw/image/upload/v1756991943/download_awhmzn.jpg",
            tech: ["Production"],
            liveUrl: "https://lush-label.vercel.app/",
            githubUrl: "https://github.com/akasaam",
            category: "Luxery Gifting Brand",
          },
          {
            id: "3",
            title: "Rang Raze Studio",
            description:
              "Minimalist luxury meets your love story. Discover bespoke gowns, gold-kissed details, and effortless elegance—crafted for your moment",
            image:
              "https://cdn.prod.website-files.com/68791316f8c22867dfd50601/6879fe10d46fe9d1ffed28ff_327d705d-8afd-41ab-96ea-ad2586b80eb0.avif",
            tech: ["Under Development"],
            liveUrl: "https://lush-label.vercel.app/",
            githubUrl: "https://github.com/akasaam/lushlabel",
            category: "Boutique",
          },
          {
            id: "4",
            title: "Darjeeling soap",
            description:
              "Award-winning natural skincare crafted from the finest ingredients of Darjeeling",
            image: "https://i.pinimg.com/736x/cf/31/d5/cf31d5991be8eeff8d764a6a960b527b.jpg",
            tech: ["Under Development"],
            liveUrl: "https://darjeelingsoap.vercel.app/",
            githubUrl: "https://github.com/akasaam/",
            category: "Soap Brand",
          },
          {
            id: "5",
            title: "Sutra | Superspeciality",
            description: "Empowering families on their journey to holistic well-being.",
            image: "https://i.pinimg.com/736x/de/e5/fa/dee5faa86add336b8c291b75cc0a7e01.jpg",
            tech: ["Under Development"],
            liveUrl: "https://v0-sutra-care.vercel.app/",
            githubUrl: "https://github.com/akasaam/Sutra-Superspeciality-Therapy",
            category: "Healthcare Platform",
          },
          {
            id: "6",
            title: "People and Pets",
            description:
              "Your one-stop destination for pet grooming, veterinary services, and premium pet food.",
            image: "https://i.pinimg.com/736x/c8/e5/dc/c8e5dc07633bcb8408247a9b78998b24.jpg",
            tech: ["Production"],
            liveUrl: "https://peoplenpets.in",
            githubUrl: "https://github.com/akasaam/people-and-pets",
            category: "Pet Care Platform",
          },
          {
            id: "7",
            title: "A-Smiles Dental Clinic",
            description:
              "A-Smiles Dental Clinic offers premium dental care with a self-care lounge experience.",
            image: "https://i.pinimg.com/736x/df/5f/a7/df5fa76c46d2d77ee390df51d0266f81.jpg",
            tech: ["React", "Next.js", "Tailwind CSS", "V.0"],
            liveUrl: "https://v0.dev/chat/a-smiles-dental-website-Uu2BJXYvKW0",
            githubUrl: "https://github.com/akasaam/A-smile-",
            category: "Healthcare Website",
          },
          {
            id: "8",
            title: "King Queen Salon",
            description:
              "Premium unisex salon in a luxurious setting where every client is treated like royalty.",
            image:
              "https://cdn.dribbble.com/userupload/26123812/file/original-c34a69dc079e0dcad53963957bca37c2.jpg?resize=1024x768&vertical=center",
            tech: ["React", "Next.js", "Tailwind CSS", "V.0"],
            liveUrl: "https://kingqueensalon.vercel.app",
            githubUrl: "https://github.com/akasaam/King-Queen-Salon",
            category: "Salon Website",
          },
          {
            id: "9",
            title: "Perself Mindcare",
            description:
              "Holistic approaches to mental wellness. Healing begins with acceptance.",
            image:
              "https://cdn.dribbble.com/userupload/17753158/file/original-6a2f902bfcc668c047f6b0d5ed9c498d.jpg?resize=1024x652&vertical=center",
            tech: ["React", "Next.js", "Tailwind CSS", "Loveable"],
            liveUrl: "https://perselfmindcarebysam.lovable.app",
            githubUrl: "https://github.com/akasaam/perself-wellness-journey",
            category: "Mental Health Platform",
          },
          {
            id: "10",
            title: "Twelve 7 Salon Website",
            description:
              "Professional salon website with booking system and service catalog",
            image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=1600&h=900&fit=crop",
            tech: ["Under Maintenance"],
            liveUrl: "https://twelve7salon.com",
            githubUrl: "https://github.com/akasaam/twelve7-salon",
            category: "Salon Website",
          },
          {
            id: "11",
            title: "Viral Alchemy 2.0",
            description:
              "Digital marketing agency specializing in viral content creation and social media strategy",
            image: "https://i.pinimg.com/736x/cc/bb/63/ccbb63d060fb1d34aca3a7f19e90ea19.jpg",
            tech: ["React", "Next.js", "Tailwind CSS", "V.0"],
            liveUrl: "https://viral-alchemy-2-0.vercel.app",
            githubUrl: "https://github.com/akasaam/viral-alchemy-2.0",
            category: "Marketing Agency",
          },
          {
            id: "12",
            title: "GeeksHub",
            description:
              "Transform your future with our comprehensive computer training programs.",
            image: "https://i.pinimg.com/736x/6a/50/3f/6a503fc28d991c249b3cf8e88a023343.jpg",
            tech: ["React", "Next.js", "Tailwind CSS"],
            liveUrl: "https://v0-geeks-hub.vercel.app",
            githubUrl: "https://github.com/akasaam/geekshub",
            category: "Education Platform",
          },
          {
            id: "13",
            title: "Viral Alchemy",
            description:
              "Digital marketing agency specializing in viral content creation and social media strategy",
            image: "https://i.pinimg.com/736x/34/53/8d/34538d9f40246bba3e5faa2c5d943f17.jpg",
            tech: ["React", "Next.js", "Tailwind CSS", "Shadcn UI"],
            liveUrl: "https://viral-alchemy.vercel.app/",
            githubUrl: "https://github.com/akasaam/viral-alchemy",
            category: "Marketing Agency",
          },
          {
            id: "14",
            title: "Password Manager",
            description:
              "Keep your digital life secure, it's saves all data on your phone only",
            image: "https://i.pinimg.com/736x/fd/29/2f/fd292f15e1bb578f5ed0c1381bb76cb8.jpg",
            tech: ["React Native", "TypeScript", "Rork AI"],
            liveUrl: "https://password-keeper.rork.app",
            githubUrl: "https://github.com/akasaam/passwardmanager",
            category: "Mobile App",
          },
          {
            id: "15",
            title: "Todo List Application",
            description:
              "Feature-rich task management app with local storage and categories",
            image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=1600&h=900&fit=crop",
            tech: ["Tailwind CSS", "JavaScript"],
            liveUrl: "https://todo.raju.dev",
            githubUrl: "https://github.com/akasaam/ToDo-List",
            category: "Web Application",
          },
          {
            id: "16",
            title: "Woods Club",
            description:
              "A e learning platform for students where they can learn coding and business",
            image: "https://i.pinimg.com/736x/9e/0e/2a/9e0e2a8be395cbebe80fe4296dcb4a0e.jpg",
            tech: ["Tailwind CSS"],
            liveUrl: "https://woodsclub.netlify.app/",
            githubUrl: "https://github.com/akasaam/woods-club",
            category: "E-Learning Platform",
          },
      ]
      setProjects(mockProjects)
      localStorage.setItem("portfolio_projects", JSON.stringify(mockProjects))
    }

    loadProjects()
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

  const displayedProjects = isHomePage ? projects.slice(0, 4) : projects.slice(0, visibleProjects)

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

        {!isHomePage && visibleProjects < projects.length && (
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

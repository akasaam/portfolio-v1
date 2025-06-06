import Image from "next/image"

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      {/* About Section */}
      <section className="bg-black text-white py-24 px-6 md:px-12 relative">
        <h2 className="text-6xl md:text-8xl font-black">
          about<span className="text-gray-700">.</span>about<span className="text-gray-700">.</span>about
        </h2>
        <div className="mt-12 md:mt-24 flex flex-col md:flex-row gap-12">
          <div className="flex-1 relative">
            <div className="aspect-square bg-gray-900 rounded-3xl overflow-hidden relative">
              <Image
                src="https://avatars.githubusercontent.com/u/133478692?v=4"
                alt="Raju Halder working"
                width={600}
                height={600}
                className="object-cover mix-blend-luminosity"
              />
            </div>
            <div className="absolute -left-4 -top-4 h-8 w-8 border border-gray-500 rounded-full flex items-center justify-center">
              <div className="h-1 w-1 bg-gray-500 rounded-full"></div>
            </div>
            <div className="absolute -right-4 -top-4 h-8 w-8 border border-gray-500 rounded-full flex items-center justify-center">
              <div className="h-1 w-1 bg-gray-500 rounded-full"></div>
            </div>
            <div className="absolute -left-4 -bottom-4 h-8 w-8 border border-gray-500 rounded-full flex items-center justify-center">
              <div className="h-1 w-1 bg-gray-500 rounded-full"></div>
            </div>
            <div className="absolute -right-4 -bottom-4 h-8 w-8 border border-gray-500 rounded-full flex items-center justify-center">
              <div className="h-1 w-1 bg-gray-500 rounded-full"></div>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold mb-6">Raju Halder</h3>
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="px-3 py-1 bg-gray-800 text-white rounded-full text-sm font-outfit">
                Full-Stack Developer
              </span>
              <span className="px-3 py-1 bg-gray-800 text-white rounded-full text-sm font-outfit">Entrepreneur</span>
              <span className="px-3 py-1 bg-gray-800 text-white rounded-full text-sm font-outfit">
                Digital Brand Strategist
              </span>
            </div>
            <p className="text-gray-400 mb-6 font-outfit">
              I'm not just building websites; I'm architecting digital experiences that transform businesses and lives.
              With a unique background in sociology and technology, I bring a human-centered approach to every project.
            </p>
            <p className="text-gray-400 mb-6 font-outfit">
              As the founder of The Brand Counter, I lead a team of 10+ specialists who have elevated 30+ brands over 5
              years of consistent innovation. My sociology background isn't just an academic footnote—it's my secret
              weapon that allows me to create digital experiences that don't just function—they connect, engage, and
              inspire.
            </p>
            <div className="grid grid-cols-2 gap-6 mt-12">
              <div>
                <h4 className="text-lg font-bold mb-2">Frontend</h4>
                <p className="text-gray-400 font-outfit">React, Next.js, Vue, Tailwind CSS, GSAP</p>
              </div>
              <div>
                <h4 className="text-lg font-bold mb-2">Backend</h4>
                <p className="text-gray-400 font-outfit">Node.js, Express, MongoDB, PostgreSQL</p>
              </div>
              <div>
                <h4 className="text-lg font-bold mb-2">Design</h4>
                <p className="text-gray-400 font-outfit">Figma, Adobe XD, Photoshop</p>
              </div>
              <div>
                <h4 className="text-lg font-bold mb-2">Other</h4>
                <p className="text-gray-400 font-outfit">Kotlin, C++, Git</p>
              </div>
            </div>
            <div className="mt-12 p-6 bg-gray-900 rounded-2xl">
              <h4 className="text-lg font-bold mb-4">Contact Information</h4>
              <div className="space-y-2 font-outfit">
                <p className="text-gray-400">📱 +91 7501411769</p>
                <p className="text-gray-400">✉️ akarajuhalder@gmail.com</p>
                <p className="text-gray-400">📸 @aka_director</p>
                <p className="text-gray-400">🐙 github.com/akasaam</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Technical Visionary Section */}
      <section className="py-16 md:py-24 px-6 md:px-12 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black mb-8">The Technical Visionary</h2>
          <div className="space-y-6">
            <p className="text-gray-700 font-outfit">
              In a world saturated with developers, I stand apart as a rare fusion of technical mastery and
              entrepreneurial fire. My journey from code to company leadership reveals an uncommon versatility that few
              can match.
            </p>
            <p className="text-gray-700 font-outfit">
              The numbers speak volumes: 30+ brands elevated, 5 years of consistent innovation, a team of 10+
              specialists following my vision. But what truly sets me apart is my ability to see beyond the screen—to
              understand that every line of code serves a human purpose.
            </p>
            <p className="text-gray-700 font-outfit">
              My sociology background isn't just an academic footnote; it's my secret weapon. While others see problems
              in pure logic, I perceive the human elements that make solutions resonate. This unique lens allows me to
              create digital experiences that don't just function—they connect, engage, and inspire.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className="bg-gray-50 p-6 rounded-2xl hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold mb-4">Technical Arsenal</h3>
                <ul className="space-y-2 text-gray-700 font-outfit">
                  <li>• Frontend mastery across React, Next.js, and Vue</li>
                  <li>• Backend command of Node.js, Express, MongoDB, and PostgreSQL</li>
                  <li>• Design fluency in Figma, Adobe XD, and Photoshop</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-6 rounded-2xl hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold mb-4">Professional Identity</h3>
                <ul className="space-y-2 text-gray-700 font-outfit">
                  <li>🚀 Founder & Entrepreneur</li>
                  <li>💻 Full-Stack Developer</li>
                  <li>🎨 Digital Creative</li>
                  <li>📈 Brand Strategist</li>
                  <li>⚡ Tech Innovator</li>
                  <li>🌟 Problem Solver</li>
                </ul>
              </div>
            </div>

            <p className="text-gray-700 font-outfit mt-8">
              At The Brand Counter, I'm not just implementing technologies—I'm orchestrating them into symphonies of
              user experience that transform ordinary businesses into extraordinary brands. My work ethic is relentless,
              my creativity bold, and my vision clear. I don't just build for today; I architect for tomorrow, creating
              digital foundations strong enough to support expansive growth and flexible enough to evolve with changing
              needs.
            </p>
          </div>
        </div>
      </section>

      {/* The Bridge Builder Section */}
      <section className="py-16 md:py-24 px-6 md:px-12 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black mb-8">The Bridge Builder</h2>
          <div className="space-y-6">
            <p className="text-gray-700 font-outfit">
              I exist in the beautiful intersection between technology and humanity, creating bridges where others see
              divides. My journey from sociology student to tech entrepreneur wasn't a career pivot—it was a natural
              evolution of my desire to connect people with possibilities.
            </p>
            <p className="text-gray-700 font-outfit">
              When I sit down to code, there's something different in my approach. While my fingers move through
              familiar patterns of React components and Node.js functions, my mind is never just processing syntax. I'm
              constantly translating human needs into digital solutions, channeling that unique sociological perspective
              into every project I touch.
            </p>
            <p className="text-gray-700 font-outfit">
              The path hasn't always been straightforward. Building Geeks Hub and co-founding The Brand Counter required
              courage—stepping away from the safety of being just a developer to embrace the vulnerability of
              leadership. Yet in that space of uncertainty, I found my truest expression, creating opportunities not
              just for myself but for my team of specialists who now bring 30+ brands to life.
            </p>

            <div className="bg-white p-6 rounded-2xl shadow-sm mt-8">
              <h3 className="text-xl font-bold mb-4">What Makes My Work Special</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-black rounded-full mt-2 shrink-0"></span>
                  <p className="text-gray-700 font-outfit">The way I listen before I build</p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-black rounded-full mt-2 shrink-0"></span>
                  <p className="text-gray-700 font-outfit">How I blend technical excellence with accessible design</p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-black rounded-full mt-2 shrink-0"></span>
                  <p className="text-gray-700 font-outfit">
                    My refusal to sacrifice human connection for technical efficiency
                  </p>
                </li>
              </ul>
            </div>

            <p className="text-gray-700 font-outfit mt-8">
              Each project in my portfolio—from healthcare platforms to pet care solutions—reveals my commitment to
              serving real human needs. These aren't just websites; they're digital ecosystems where people find help,
              connection, and solutions to their most pressing concerns.
            </p>
            <p className="text-gray-700 font-outfit">
              My journey matters because I'm proving that technical brilliance and human empathy aren't opposing forces;
              they're complementary strengths. In a world that increasingly questions the impact of technology on our
              connections, I'm demonstrating how digital experiences, crafted with care, can actually deepen those
              connections and create lasting value.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

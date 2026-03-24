import { useState } from "react";
import { useNavigate } from "react-router";
import { Search as SearchIcon, Star, Users, Filter, ArrowLeft } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

// Mock data de mentores
const mentors = [
  {
    id: 1,
    name: "Ana García",
    title: "Senior Frontend Developer",
    rating: 4.9,
    reviews: 127,
    sessionsCompleted: 234,
    skills: ["React", "TypeScript", "CSS", "JavaScript"],
    hourlyRate: "Gratis",
    availability: "Disponible hoy",
    image: "https://images.unsplash.com/photo-1573495611823-5397efa4fac7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjBlbmdpbmVlciUyMHByb2dyYW1taW5nfGVufDF8fHx8MTc3MzkxNzc4Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: 2,
    name: "Carlos Ruiz",
    title: "Backend Engineer",
    rating: 4.8,
    reviews: 98,
    sessionsCompleted: 176,
    skills: ["Node.js", "Python", "SQL", "MongoDB"],
    hourlyRate: "Gratis",
    availability: "Disponible mañana",
    image: "https://images.unsplash.com/photo-1581913229425-9c6b993fc107?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxlJTIwZGV2ZWxvcGVyJTIwbGFwdG9wfGVufDF8fHx8MTc3MzkxNzc4Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: 3,
    name: "María López",
    title: "Full Stack Developer",
    rating: 5.0,
    reviews: 89,
    sessionsCompleted: 145,
    skills: ["React", "Node.js", "PostgreSQL", "AWS"],
    hourlyRate: "Gratis",
    availability: "Disponible hoy",
    image: "https://images.unsplash.com/photo-1617042375876-a13e36732a04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2Z0d2FyZSUyMGRldmVsb3BlciUyMGNvZGluZ3xlbnwxfHx8fDE3NzM4MzExMjZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: 4,
    name: "David Chen",
    title: "Mobile Developer",
    rating: 4.7,
    reviews: 112,
    sessionsCompleted: 198,
    skills: ["React Native", "Flutter", "iOS", "Android"],
    hourlyRate: "Gratis",
    availability: "Disponible esta semana",
    image: "https://images.unsplash.com/photo-1558949623-35b2e2649754?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMHByb2dyYW1tZXIlMjB3b3JraW5nfGVufDF8fHx8MTc3MzkxNzc4Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: 5,
    name: "Laura Martínez",
    title: "Data Scientist",
    rating: 4.9,
    reviews: 76,
    sessionsCompleted: 132,
    skills: ["Python", "Machine Learning", "TensorFlow", "Pandas"],
    hourlyRate: "Gratis",
    availability: "Disponible hoy",
    image: "https://images.unsplash.com/photo-1573495611823-5397efa4fac7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjBlbmdpbmVlciUyMHByb2dyYW1taW5nfGVufDF8fHx8MTc3MzkxNzc4Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: 6,
    name: "Miguel Santos",
    title: "DevOps Engineer",
    rating: 4.8,
    reviews: 95,
    sessionsCompleted: 167,
    skills: ["Docker", "Kubernetes", "AWS", "CI/CD"],
    hourlyRate: "Gratis",
    availability: "Disponible mañana",
    image: "https://images.unsplash.com/photo-1581913229425-9c6b993fc107?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxlJTIwZGV2ZWxvcGVyJTIwbGFwdG9wfGVufDF8fHx8MTc3MzkxNzc4Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
];

const allSkills = [
  "React",
  "TypeScript",
  "JavaScript",
  "Node.js",
  "Python",
  "SQL",
  "MongoDB",
  "PostgreSQL",
  "AWS",
  "Docker",
  "Kubernetes",
  "Machine Learning",
  "Flutter",
  "iOS",
  "Android",
];

export default function Search() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill)
        ? prev.filter((s) => s !== skill)
        : [...prev, skill]
    );
  };

  const filteredMentors = mentors.filter((mentor) => {
    const matchesSearch =
      searchQuery === "" ||
      mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mentor.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mentor.skills.some((skill) =>
        skill.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesSkills =
      selectedSkills.length === 0 ||
      selectedSkills.some((skill) => mentor.skills.includes(skill));

    return matchesSearch && matchesSkills;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate("/")}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-semibold text-gray-900">
                  MicroMentorías
                </span>
              </div>
            </div>
            <button
              onClick={() => navigate("/login")}
              className="px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors"
            >
              Mi cuenta
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Encuentra tu mentor ideal
          </h1>
          <p className="text-gray-600">
            Explora {mentors.length} mentores disponibles para ayudarte
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex gap-4 mb-4">
            <div className="flex-1 relative">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por nombre, habilidad o área..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`px-6 py-3 border rounded-lg transition-colors flex items-center gap-2 ${
                showFilters
                  ? "bg-indigo-600 text-white border-indigo-600"
                  : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
              }`}
            >
              <Filter className="w-5 h-5" />
              Filtros
            </button>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">
                    Habilidades
                  </h3>
                  {selectedSkills.length > 0 && (
                    <button
                      onClick={() => setSelectedSkills([])}
                      className="text-sm text-indigo-600 hover:text-indigo-700"
                    >
                      Limpiar
                    </button>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {allSkills.map((skill) => (
                    <button
                      key={skill}
                      onClick={() => toggleSkill(skill)}
                      className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                        selectedSkills.includes(skill)
                          ? "bg-indigo-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            {filteredMentors.length}{" "}
            {filteredMentors.length === 1 ? "mentor encontrado" : "mentores encontrados"}
          </p>
        </div>

        {/* Mentors Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMentors.map((mentor) => (
            <div
              key={mentor.id}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => navigate(`/mentor/${mentor.id}`)}
            >
              <div className="relative h-48 bg-gray-200">
                <ImageWithFallback
                  src={mentor.image}
                  alt={mentor.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded-full text-xs font-medium text-gray-700 shadow-sm">
                  {mentor.availability}
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900 mb-1">
                      {mentor.name}
                    </h3>
                    <p className="text-sm text-gray-600">{mentor.title}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold text-gray-900">
                      {mentor.rating}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">
                    ({mentor.reviews} reseñas)
                  </span>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {mentor.skills.slice(0, 4).map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-1 bg-indigo-50 text-indigo-700 text-xs rounded-md"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="text-sm text-gray-600">
                    {mentor.sessionsCompleted} sesiones
                  </div>
                  <div className="font-semibold text-indigo-600">
                    {mentor.hourlyRate}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredMentors.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <SearchIcon className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No se encontraron mentores
            </h3>
            <p className="text-gray-600 mb-4">
              Intenta ajustar tu búsqueda o filtros
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedSkills([]);
              }}
              className="px-4 py-2 text-indigo-600 hover:text-indigo-700 font-medium"
            >
              Limpiar búsqueda
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
  ArrowLeft,
  Star,
  Calendar,
  Clock,
  CheckCircle2,
  MessageCircle,
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

// Mock data del mentor
const mentorData = {
  id: 1,
  name: "Ana García",
  title: "Senior Frontend Developer",
  rating: 4.9,
  reviews: 127,
  sessionsCompleted: 234,
  skills: ["React", "TypeScript", "CSS", "JavaScript", "Next.js", "Tailwind CSS"],
  bio: "Desarrolladora Frontend con más de 8 años de experiencia en la industria. Me especializo en React y TypeScript, y me apasiona ayudar a otros desarrolladores a resolver problemas complejos de forma simple y efectiva.",
  image: "https://images.unsplash.com/photo-1573495611823-5397efa4fac7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjBlbmdpbmVlciUyMHByb2dyYW1taW5nfGVufDF8fHx8MTc3MzkxNzc4Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  availability: [
    { day: "Lunes", slots: ["10:00", "14:00", "16:00"] },
    { day: "Martes", slots: ["10:00", "15:00"] },
    { day: "Miércoles", slots: ["11:00", "14:00", "17:00"] },
    { day: "Jueves", slots: ["10:00", "16:00"] },
    { day: "Viernes", slots: ["14:00", "15:00", "16:00"] },
  ],
  reviewsList: [
    {
      id: 1,
      userName: "Carlos M.",
      rating: 5,
      date: "Hace 2 días",
      comment: "Excelente sesión. Ana me ayudó a resolver un problema con React Hooks que llevaba días sin poder solucionar. Súper clara en sus explicaciones.",
    },
    {
      id: 2,
      userName: "Laura P.",
      rating: 5,
      date: "Hace 1 semana",
      comment: "Muy profesional y paciente. Me explicó conceptos de TypeScript de forma muy didáctica. Definitivamente volveré a agendar con ella.",
    },
    {
      id: 3,
      userName: "Miguel R.",
      rating: 4,
      date: "Hace 2 semanas",
      comment: "Buena sesión, aprendí mucho sobre optimización de componentes React. Recomendada.",
    },
    {
      id: 4,
      userName: "Sofia L.",
      rating: 5,
      date: "Hace 3 semanas",
      comment: "Ana es increíble. Me ayudó con mi proyecto de universidad y ahora entiendo mucho mejor cómo funciona el estado en React.",
    },
  ],
};

export default function MentorProfile() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);

  const handleBooking = () => {
    if (!selectedDay || !selectedSlot) {
      alert("Por favor selecciona un día y horario");
      return;
    }
    setShowBookingModal(true);
  };

  const confirmBooking = () => {
    alert(`¡Sesión agendada! ${selectedDay} a las ${selectedSlot}`);
    setShowBookingModal(false);
    navigate("/buscar");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => navigate("/buscar")}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Volver a búsqueda
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Card */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="p-8">
                <div className="flex gap-6">
                  <div className="relative w-32 h-32 rounded-full overflow-hidden flex-shrink-0 border-4 border-gray-100">
                    <ImageWithFallback
                      src={mentorData.image}
                      alt={mentorData.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                      {mentorData.name}
                    </h1>
                    <p className="text-lg text-gray-600 mb-4">{mentorData.title}</p>

                    <div className="flex flex-wrap gap-4 mb-4">
                      <div className="flex items-center gap-1">
                        <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold text-gray-900">
                          {mentorData.rating}
                        </span>
                        <span className="text-gray-600">
                          ({mentorData.reviews} reseñas)
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                        {mentorData.sessionsCompleted} sesiones completadas
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {mentorData.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 bg-indigo-50 text-indigo-700 text-sm rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* About */}
            <div className="bg-white rounded-lg border border-gray-200 p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Acerca de mí
              </h2>
              <p className="text-gray-700 leading-relaxed">{mentorData.bio}</p>
            </div>

            {/* Reviews */}
            <div className="bg-white rounded-lg border border-gray-200 p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Reseñas ({mentorData.reviews})
                </h2>
                <div className="flex items-center gap-2">
                  <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                  <span className="text-2xl font-bold text-gray-900">
                    {mentorData.rating}
                  </span>
                </div>
              </div>

              <div className="space-y-6">
                {mentorData.reviewsList.map((review) => (
                  <div key={review.id} className="border-b border-gray-100 last:border-0 pb-6 last:pb-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                          <span className="font-semibold text-indigo-600">
                            {review.userName.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">
                            {review.userName}
                          </div>
                          <div className="text-sm text-gray-500">{review.date}</div>
                        </div>
                      </div>
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar - Booking */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Agendar sesión
              </h3>

              {/* Session Duration */}
              <div className="flex items-center gap-3 mb-6 p-3 bg-gray-50 rounded-lg">
                <Clock className="w-5 h-5 text-indigo-600" />
                <div>
                  <div className="text-sm font-medium text-gray-900">
                    Duración: 15-30 min
                  </div>
                  <div className="text-xs text-gray-600">Sesión gratuita</div>
                </div>
              </div>

              {/* Day Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Selecciona un día
                </label>
                <div className="space-y-2">
                  {mentorData.availability.map((avail) => (
                    <button
                      key={avail.day}
                      onClick={() => {
                        setSelectedDay(avail.day);
                        setSelectedSlot(null);
                      }}
                      className={`w-full flex items-center justify-between p-3 rounded-lg border-2 transition-all ${
                        selectedDay === avail.day
                          ? "border-indigo-600 bg-indigo-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-600" />
                        <span className="font-medium text-gray-900">
                          {avail.day}
                        </span>
                      </div>
                      <span className="text-sm text-gray-600">
                        {avail.slots.length} slots
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Slots */}
              {selectedDay && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Horarios disponibles
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {mentorData.availability
                      .find((a) => a.day === selectedDay)
                      ?.slots.map((slot) => (
                        <button
                          key={slot}
                          onClick={() => setSelectedSlot(slot)}
                          className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                            selectedSlot === slot
                              ? "bg-indigo-600 text-white"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                  </div>
                </div>
              )}

              {/* Book Button */}
              <button
                onClick={handleBooking}
                disabled={!selectedDay || !selectedSlot}
                className={`w-full py-3 rounded-lg font-medium transition-colors ${
                  selectedDay && selectedSlot
                    ? "bg-indigo-600 text-white hover:bg-indigo-700"
                    : "bg-gray-200 text-gray-500 cursor-not-allowed"
                }`}
              >
                Reservar sesión
              </button>

              {/* Contact */}
              <button className="w-full mt-3 py-3 border-2 border-gray-300 rounded-lg font-medium text-gray-700 hover:border-gray-400 transition-colors flex items-center justify-center gap-2">
                <MessageCircle className="w-5 h-5" />
                Enviar mensaje
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Confirmation Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                ¡Confirmar reserva!
              </h3>
              <p className="text-gray-600 mb-6">
                Estás a punto de agendar una sesión con {mentorData.name}
              </p>

              <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Mentor:</span>
                    <span className="font-medium text-gray-900">
                      {mentorData.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Día:</span>
                    <span className="font-medium text-gray-900">{selectedDay}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Hora:</span>
                    <span className="font-medium text-gray-900">{selectedSlot}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duración:</span>
                    <span className="font-medium text-gray-900">15-30 min</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowBookingModal(false)}
                  className="flex-1 py-3 border-2 border-gray-300 rounded-lg font-medium text-gray-700 hover:border-gray-400 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={confirmBooking}
                  className="flex-1 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                >
                  Confirmar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

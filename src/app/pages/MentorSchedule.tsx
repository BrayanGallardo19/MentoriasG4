import { useState, useMemo } from "react";
import { useNavigate } from "react-router";
import {
  ArrowLeft,
  Calendar,
  Clock,
  DollarSign,
  CheckCircle2,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Eye,
  X,
} from "lucide-react";
import { mockScheduledMentorships, ScheduledMentorship } from "../data/mockData";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useAuth } from "../context/AuthContext";

export default function MentorSchedule() {
  const navigate = useNavigate();
  const { user, isLoggedIn } = useAuth();

  // Proteger acceso solo para mentores
  if (!isLoggedIn || user?.role !== "mentor") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Acceso Denegado</h1>
          <p className="text-gray-600 mb-6">
            Solo los mentores pueden acceder a esta página.
          </p>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Volver al Inicio
          </button>
        </div>
      </div>
    );
  }
  const [activeTab, setActiveTab] = useState<"upcoming" | "completed">(
    "upcoming"
  );
  const [selectedDate, setSelectedDate] = useState(new Date(2026, 3, 14)); // 14 de abril
  const [showDetailModal, setShowDetailModal] = useState<number | null>(null);
  const [platformLinkInput, setPlatformLinkInput] = useState("");

  // Simular mentor actual (en una app real, vendría del contexto de autenticación)
  const currentMentorId = 1;

  const mentorships = mockScheduledMentorships.filter(
    (m) => m.mentorId === currentMentorId
  );

  const upcomingMentorships = mentorships.filter(
    (m) => m.status === "pendiente" && new Date(m.date) >= selectedDate
  );

  const completedMentorships = mentorships.filter((m) => m.status === "completada");

  const todayMentorships = mentorships.filter(
    (m) =>
      m.status === "pendiente" &&
      m.date === selectedDate.toISOString().split("T")[0]
  );

  const totalEarnings = useMemo(() => {
    return completedMentorships.reduce((sum, m) => sum + m.price, 0);
  }, [completedMentorships]);

  const handlePrevDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() - 1);
    setSelectedDate(newDate);
  };

  const handleNextDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + 1);
    setSelectedDate(newDate);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("es-ES", {
      weekday: "long",
      day: "numeric",
      month: "long",
    }).format(date);
  };

  const mentorshipDetail = showDetailModal
    ? mentorships.find((m) => m.id === showDetailModal)
    : null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate("/")}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  Mi Calendario de Mentorías
                </h1>
                <p className="text-sm text-gray-600">
                  Gestiona tus sesiones programadas
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab("upcoming")}
            className={`px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 ${
              activeTab === "upcoming"
                ? "bg-indigo-600 text-white"
                : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
            }`}
          >
            <Calendar className="w-5 h-5" />
            Próximas Mentorías ({upcomingMentorships.length})
          </button>
          <button
            onClick={() => setActiveTab("completed")}
            className={`px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 ${
              activeTab === "completed"
                ? "bg-indigo-600 text-white"
                : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
            }`}
          >
            <CheckCircle2 className="w-5 h-5" />
            Completadas ({completedMentorships.length})
          </button>
        </div>

        {/* Próximas Mentorías Tab */}
        {activeTab === "upcoming" && (
          <div>
            {/* Selector de Fecha */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  Selecciona una fecha
                </h2>
                <button
                  onClick={() => setSelectedDate(new Date(2026, 3, 14))}
                  className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
                >
                  Hoy
                </button>
              </div>

              <div className="flex items-center justify-between">
                <button
                  onClick={handlePrevDay}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <div className="text-center flex-1 mx-4">
                  <div className="text-2xl font-bold text-gray-900 capitalize">
                    {formatDate(selectedDate)}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    {todayMentorships.length} sesión
                    {todayMentorships.length !== 1 ? "es" : ""} hoy
                  </div>
                </div>

                <button
                  onClick={handleNextDay}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Mentorías de Hoy */}
            {todayMentorships.length > 0 && (
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1 h-6 bg-indigo-600 rounded-full"></div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Hoy - {todayMentorships.length} sesión
                    {todayMentorships.length !== 1 ? "es" : ""}
                  </h3>
                </div>

                <div className="space-y-4">
                  {todayMentorships.map((mentorship) => (
                    <div
                      key={mentorship.id}
                      className="bg-white border-2 border-indigo-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex gap-4 flex-1">
                          <div className="w-16 h-16 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden">
                            <ImageWithFallback
                              src={mentorship.studentImage || ""}
                              alt={mentorship.studentName}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-lg text-gray-900">
                              {mentorship.topic}
                            </h4>
                            <p className="text-gray-600 mb-2">
                              {mentorship.studentName}
                            </p>
                            <div className="flex gap-4 flex-wrap">
                              <div className="flex items-center gap-1 text-gray-600">
                                <Clock className="w-4 h-4" />
                                <span className="text-sm">
                                  {mentorship.time} (GMT-5)
                                </span>
                              </div>
                              <div className="flex items-center gap-1 text-gray-600">
                                <AlertCircle className="w-4 h-4" />
                                <span className="text-sm">
                                  {mentorship.duration} minutos
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <div className="text-2xl font-bold text-indigo-600 mb-2">
                            ${mentorship.price}
                          </div>
                          <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                            Pendiente
                          </span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setShowDetailModal(mentorship.id);
                            setPlatformLinkInput(mentorship.platformLink || "");
                          }}
                          className="w-full px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors font-medium text-sm flex items-center justify-center gap-2"
                        >
                          <Eye className="w-4 h-4" />
                          Ver Detalles
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Próximas Mentorías */}
            {upcomingMentorships.length > todayMentorships.length && (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1 h-6 bg-blue-600 rounded-full"></div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Próximas
                  </h3>
                </div>

                <div className="space-y-4">
                  {upcomingMentorships
                    .filter(
                      (m) =>
                        m.date !== selectedDate.toISOString().split("T")[0]
                    )
                    .map((mentorship) => (
                      <div
                        key={mentorship.id}
                        className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex gap-4 flex-1">
                            <div className="w-14 h-14 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden">
                              <ImageWithFallback
                                src={mentorship.studentImage || ""}
                                alt={mentorship.studentName}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900">
                                {mentorship.topic}
                              </h4>
                              <p className="text-gray-600 text-sm mb-2">
                                {mentorship.studentName}
                              </p>
                              <div className="flex gap-4 flex-wrap text-sm">
                                <div className="flex items-center gap-1 text-gray-600">
                                  <Calendar className="w-4 h-4" />
                                  {new Intl.DateTimeFormat("es-ES", {
                                    day: "numeric",
                                    month: "short",
                                  }).format(new Date(mentorship.date))}
                                </div>
                                <div className="flex items-center gap-1 text-gray-600">
                                  <Clock className="w-4 h-4" />
                                  {mentorship.time}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <div className="text-xl font-bold text-indigo-600">
                              ${mentorship.price}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {upcomingMentorships.length === 0 && (
              <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No hay mentorías próximas
                </h3>
                <p className="text-gray-600">
                  Aún no tienes mentorías programadas para esta fecha
                </p>
              </div>
            )}
          </div>
        )}

        {/* Completadas Tab */}
        {activeTab === "completed" && (
          <div>
            {/* Stats */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="text-gray-600 text-sm font-medium mb-2">
                  Sesiones Completadas
                </div>
                <div className="text-3xl font-bold text-gray-900">
                  {completedMentorships.length}
                </div>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="text-gray-600 text-sm font-medium mb-2">
                  Ganancia Total
                </div>
                <div className="text-3xl font-bold text-green-600 flex items-center gap-2">
                  <DollarSign className="w-7 h-7" />
                  {totalEarnings.toFixed(2)}
                </div>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="text-gray-600 text-sm font-medium mb-2">
                  Promedio por Sesión
                </div>
                <div className="text-3xl font-bold text-indigo-600">
                  $
                  {completedMentorships.length > 0
                    ? (totalEarnings / completedMentorships.length).toFixed(2)
                    : "0.00"}
                </div>
              </div>
            </div>

            {/* Lista de completadas */}
            {completedMentorships.length > 0 ? (
              <div className="bg-white rounded-lg border border-gray-200 overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-gray-200 bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                        Estudiante
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                        Tema
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                        Fecha
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                        Hora
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                        Duración
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                        Ganancia
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {completedMentorships.map((mentorship) => (
                      <tr
                        key={mentorship.id}
                        className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4 text-sm text-gray-900">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                              <ImageWithFallback
                                src={mentorship.studentImage || ""}
                                alt={mentorship.studentName}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            {mentorship.studentName}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {mentorship.topic}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {new Intl.DateTimeFormat("es-ES", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          }).format(new Date(mentorship.date))}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {mentorship.time}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {mentorship.duration} min
                        </td>
                        <td className="px-6 py-4 text-sm font-semibold text-green-600">
                          ${mentorship.price.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                <CheckCircle2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No hay mentorías completadas
                </h3>
                <p className="text-gray-600">
                  Las sesiones completadas aparecerán aquí
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modal de Detalles */}
      {showDetailModal && mentorshipDetail && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full mx-4">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                Detalles de la Mentoría
              </h2>
              <button
                onClick={() => setShowDetailModal(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              {/* Estudiante */}
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-200">
                <div className="w-20 h-20 rounded-full bg-gray-200 overflow-hidden">
                  <ImageWithFallback
                    src={mentorshipDetail.studentImage || ""}
                    alt={mentorshipDetail.studentName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {mentorshipDetail.studentName}
                  </h3>
                  <p className="text-gray-600">Estudiante</p>
                </div>
              </div>

              {/* Información */}
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tema
                  </label>
                  <p className="text-gray-900 font-semibold">
                    {mentorshipDetail.topic}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fecha
                  </label>
                  <p className="text-gray-900 font-semibold">
                    {new Intl.DateTimeFormat("es-ES", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    }).format(new Date(mentorshipDetail.date))}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Hora
                  </label>
                  <p className="text-gray-900 font-semibold">
                    {mentorshipDetail.time} (GMT-5)
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duración
                  </label>
                  <p className="text-gray-900 font-semibold">
                    {mentorshipDetail.duration} minutos
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Precio
                  </label>
                  <p className="text-gray-900 font-semibold">
                    ${mentorshipDetail.price.toFixed(2)}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Estado
                  </label>
                  <p className="text-gray-900 font-semibold capitalize">
                    {mentorshipDetail.status === "pendiente"
                      ? "Pendiente"
                      : "Completada"}
                  </p>
                </div>
              </div>

              {/* Enlace de Plataforma */}
              {mentorshipDetail.status === "pendiente" && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Link de Acceso a la Plataforma
                  </label>
                  {mentorshipDetail.platformLink ? (
                    <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-sm text-gray-600 mb-2">Link actual:</p>
                      <a
                        href={mentorshipDetail.platformLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 hover:text-indigo-700 break-all text-sm font-medium"
                      >
                        {mentorshipDetail.platformLink}
                      </a>
                    </div>
                  ) : null}
                  <input
                    type="url"
                    placeholder="https://zoom.us/j/123456789 o https://meet.google.com/..."
                    value={platformLinkInput}
                    onChange={(e) => setPlatformLinkInput(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Proporciona el enlace de acceso a Zoom, Google Meet u otra plataforma
                  </p>
                </div>
              )}

              {mentorshipDetail.status === "completada" && mentorshipDetail.platformLink && (
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    Plataforma utilizada:
                  </p>
                  <a
                    href={mentorshipDetail.platformLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:text-indigo-700 break-all text-sm"
                  >
                    {mentorshipDetail.platformLink}
                  </a>
                </div>
              )}
            </div>

            <div className="flex gap-3 p-6 border-t border-gray-200">
              <button
                onClick={() => {
                  setShowDetailModal(null);
                  setPlatformLinkInput("");
                }}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
              >
                Cerrar
              </button>
              {mentorshipDetail.status === "pendiente" && (
                <button
                  onClick={() => {
                    // Aquí iría la lógica para guardar el link de plataforma
                    // Por ahora, solo actualizamos el estado
                    if (platformLinkInput) {
                      mentorshipDetail.platformLink = platformLinkInput;
                      setPlatformLinkInput("");
                      setShowDetailModal(null);
                    }
                  }}
                  className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium flex items-center justify-center gap-2"
                >
                  Guardar Link
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

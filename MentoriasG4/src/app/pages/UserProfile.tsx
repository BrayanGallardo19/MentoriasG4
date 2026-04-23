import { useNavigate } from "react-router";
import { ArrowLeft, User, Mail, Shield, BookOpen, Star, Clock, Edit3, Settings } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function UserProfile() {
  const navigate = useNavigate();
  const { user, isLoggedIn } = useAuth();

  // Si el usuario no está logueado o es admin, lo redirigimos al inicio
  if (!isLoggedIn || user?.role === "admin") {
    navigate("/");
    return null;
  }

  // Por ahora usamos datos simulados para ilustrar lo que el usuario vería.
  const mentorStats = {
    sessionsGiven: 42,
    rating: 4.8,
    hoursMentored: 21,
  };

  const studentStats = {
    sessionsTaken: 5,
    mentorsContacted: 3,
    hoursLearned: 2.5,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Encabezado simple para volver atrás */}
      <header className="bg-white border-b sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)} // Vuelve a la página anterior
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-semibold text-gray-900">Mi Perfil</h1>
          </div>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* TARJETA PRINCIPAL: Información Personal */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-6">
          <div className="p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              {/* Avatar placeholder */}
              <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-3xl font-bold text-indigo-600">
                  {user?.name?.charAt(0).toUpperCase() || "U"}
                </span>
              </div>
              
              {/* Datos del usuario */}
              <div className="flex-1 text-center sm:text-left">
                <h2 className="text-2xl font-bold text-gray-900 mb-1">{user?.name}</h2>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-gray-600 mb-4 justify-center sm:justify-start">
                  <span className="flex items-center gap-1 justify-center">
                    <Mail className="w-4 h-4" />
                    {user?.email}
                  </span>
                  <span className="flex items-center gap-1 justify-center capitalize">
                    <Shield className="w-4 h-4" />
                    {user?.role}
                  </span>
                </div>
                
                <button className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors font-medium text-sm">
                  <Edit3 className="w-4 h-4" />
                  Editar Información
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* TARJETA DE ESTADÍSTICAS: Cambia según el rol */}
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Resumen de tu actividad
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {user?.role === "mentor" ? (
            // ESTADÍSTICAS PARA MENTORES
            <>
              <div className="bg-white p-6 rounded-lg border border-gray-200 text-center">
                <BookOpen className="w-6 h-6 text-indigo-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">{mentorStats.sessionsGiven}</div>
                <div className="text-sm text-gray-600">Sesiones Impartidas</div>
              </div>
              <div className="bg-white p-6 rounded-lg border border-gray-200 text-center">
                <Star className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">{mentorStats.rating}</div>
                <div className="text-sm text-gray-600">Calificación Promedio</div>
              </div>
              <div className="bg-white p-6 rounded-lg border border-gray-200 text-center">
                <Clock className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">{mentorStats.hoursMentored}h</div>
                <div className="text-sm text-gray-600">Horas de Mentoría</div>
              </div>
            </>
          ) : (
            // ESTADÍSTICAS PARA ESTUDIANTES
            <>
              <div className="bg-white p-6 rounded-lg border border-gray-200 text-center">
                <BookOpen className="w-6 h-6 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">{studentStats.sessionsTaken}</div>
                <div className="text-sm text-gray-600">Sesiones Tomadas</div>
              </div>
              <div className="bg-white p-6 rounded-lg border border-gray-200 text-center">
                <User className="w-6 h-6 text-indigo-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">{studentStats.mentorsContacted}</div>
                <div className="text-sm text-gray-600">Mentores Diferentes</div>
              </div>
              <div className="bg-white p-6 rounded-lg border border-gray-200 text-center">
                <Clock className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">{studentStats.hoursLearned}h</div>
                <div className="text-sm text-gray-600">Horas de Aprendizaje</div>
              </div>
            </>
          )}
        </div>

        {/* TARJETA DE CONFIGURACIÓN DE CUENTA */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Settings className="w-5 h-5 text-gray-500" />
              Configuración de la Cuenta
            </h3>
          </div>
          <div className="p-6 space-y-4">
            {/* Cambiar Contraseña */}
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <div>
                <p className="font-medium text-gray-900">Contraseña</p>
                <p className="text-sm text-gray-500">Último cambio hace 3 meses</p>
              </div>
              <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                Cambiar
              </button>
            </div>
            
            {/* Notificaciones */}
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <div>
                <p className="font-medium text-gray-900">Notificaciones por Email</p>
                <p className="text-sm text-gray-500">Recibir alertas de sesiones y mensajes</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>

            {/* Zona de peligro */}
            <div className="pt-4">
              <button className="text-red-600 hover:text-red-800 text-sm font-medium">
                Desactivar mi cuenta
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
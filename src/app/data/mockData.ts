// Mock data para usuarios
export interface User {
  id: number;
  name: string;
  email: string;
  role: "estudiante" | "mentor";
  createdAt: string;
  status: "activo" | "inactivo";
  sessionsCompleted?: number;
  rating?: number;
  title?: string;
}

// Mock data para avisos de mentoría
export interface MentorshipOffer {
  id: number;
  mentorId: number;
  mentorName: string;
  title: string;
  image: string;
  skills: string[];
  price: string;
  sessionsCompleted: number;
  rating: number;
  reviews: number;
  timeStart?: string; // HH:MM
  timeEnd?: string; // HH:MM
  availableDates: string[]; // Array de fechas en formato YYYY-MM-DD
}

// Mock data para mentorías
export interface Mentoría {
  id: number;
  mentorId: number;
  mentorName: string;
  studentId: number;
  studentName: string;
  topic: string;
  status: "activa" | "completada" | "deshabilitada";
  createdAt: string;
  sessionsCompleted: number;
}

// Interfaz para mentorías programadas
export interface ScheduledMentorship {
  id: number;
  mentorId: number;
  mentorName: string;
  studentId: number;
  studentName: string;
  topic: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  duration: number; // minutos
  price: number; // en dólares
  status: "pendiente" | "completada" | "cancelada";
  studentImage?: string;
  platformLink?: string; // Link a la plataforma de videollamada (Zoom, Google Meet, etc.)
}

export const mockUsers: User[] = [
  {
    id: 1,
    name: "Ana García",
    email: "ana.garcia@email.com",
    role: "mentor",
    createdAt: "2024-01-15",
    status: "activo",
    sessionsCompleted: 234,
    rating: 4.9,
  },
  {
    id: 2,
    name: "Carlos Ruiz",
    email: "carlos.ruiz@email.com",
    role: "mentor",
    createdAt: "2024-01-20",
    status: "activo",
    sessionsCompleted: 176,
    rating: 4.8,
  },
  {
    id: 3,
    name: "María López",
    email: "maria.lopez@email.com",
    role: "mentor",
    createdAt: "2024-02-10",
    status: "activo",
    sessionsCompleted: 145,
    rating: 5.0,
  },
  {
    id: 4,
    name: "Juan Pérez",
    email: "juan.perez@email.com",
    role: "estudiante",
    createdAt: "2024-02-15",
    status: "activo",
  },
  {
    id: 5,
    name: "Laura Martínez",
    email: "laura.martinez@email.com",
    role: "estudiante",
    createdAt: "2024-03-01",
    status: "activo",
  },
  {
    id: 6,
    name: "David Chen",
    email: "david.chen@email.com",
    role: "mentor",
    createdAt: "2024-03-10",
    status: "inactivo",
    sessionsCompleted: 198,
    rating: 4.7,
  },
  {
    id: 7,
    name: "Sofia Rossi",
    email: "sofia.rossi@email.com",
    role: "estudiante",
    createdAt: "2024-03-20",
    status: "activo",
  },
  {
    id: 8,
    name: "Miguel Santos",
    email: "miguel.santos@email.com",
    role: "mentor",
    createdAt: "2024-04-01",
    status: "activo",
    sessionsCompleted: 167,
    rating: 4.8,
  },
];

export const mockMentorías: Mentoría[] = [
  {
    id: 1,
    mentorId: 1,
    mentorName: "Ana García",
    studentId: 4,
    studentName: "Juan Pérez",
    topic: "React Avanzado",
    status: "activa",
    createdAt: "2024-04-01",
    sessionsCompleted: 5,
  },
  {
    id: 2,
    mentorId: 2,
    mentorName: "Carlos Ruiz",
    studentId: 5,
    studentName: "Laura Martínez",
    topic: "Node.js y MongoDB",
    status: "activa",
    createdAt: "2024-04-05",
    sessionsCompleted: 3,
  },
  {
    id: 3,
    mentorId: 3,
    mentorName: "María López",
    studentId: 7,
    studentName: "Sofia Rossi",
    topic: "Full Stack Development",
    status: "completada",
    createdAt: "2024-03-15",
    sessionsCompleted: 12,
  },
  {
    id: 4,
    mentorId: 8,
    mentorName: "Miguel Santos",
    studentId: 4,
    studentName: "Juan Pérez",
    topic: "DevOps y Docker",
    status: "activa",
    createdAt: "2024-04-10",
    sessionsCompleted: 2,
  },
  {
    id: 5,
    mentorId: 1,
    mentorName: "Ana García",
    studentId: 7,
    studentName: "Sofia Rossi",
    topic: "TypeScript Avanzado",
    status: "activa",
    createdAt: "2024-04-12",
    sessionsCompleted: 1,
  },
  {
    id: 6,
    mentorId: 2,
    mentorName: "Carlos Ruiz",
    studentId: 4,
    studentName: "Juan Pérez",
    topic: "Bases de Datos SQL",
    status: "deshabilitada",
    createdAt: "2024-04-01",
    sessionsCompleted: 0,
  },
];

// Avisos de mentoría creados por mentores
export const mockMentorshipOffers: MentorshipOffer[] = [
  {
    id: 1,
    mentorId: 1,
    mentorName: "Ana García",
    title: "Senior Frontend Developer",
    image: "https://images.unsplash.com/photo-1573495611823-5397efa4fac7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjBlbmdpbmVlciUyMHByb2dyYW1taW5nfGVufDF8fHx8MTc3MzkxNzc4Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    skills: ["React", "TypeScript", "CSS", "JavaScript"],
    price: "Gratis",
    sessionsCompleted: 234,
    rating: 4.9,
    reviews: 127,
    timeStart: "13:00",
    timeEnd: "22:00",
    availableDates: ["2026-04-14", "2026-04-15", "2026-04-16", "2026-04-18", "2026-04-20"],
  },
  {
    id: 2,
    mentorId: 2,
    mentorName: "Carlos Ruiz",
    title: "Backend Engineer",
    image: "https://images.unsplash.com/photo-1581913229425-9c6b993fc107?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxlJTIwZGV2ZWxvcGVyJTIwbGFwdG9wfGVufDF8fHx8MTc3MzkxNzc4Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    skills: ["Node.js", "Python", "SQL", "MongoDB"],
    price: "Gratis",
    sessionsCompleted: 176,
    rating: 4.8,
    reviews: 98,
    timeStart: "09:00",
    timeEnd: "18:00",
    availableDates: ["2026-04-15", "2026-04-17", "2026-04-19", "2026-04-21", "2026-04-22"],
  },
  {
    id: 3,
    mentorId: 3,
    mentorName: "María López",
    title: "Full Stack Developer",
    image: "https://images.unsplash.com/photo-1617042375876-a13e36732a04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2Z0d2FyZSUyMGRldmVsb3BlciUyMGNvZGluZ3xlbnwxfHx8fDE3NzM4MzExMjZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    skills: ["React", "Node.js", "PostgreSQL", "AWS"],
    price: "Gratis",
    sessionsCompleted: 145,
    rating: 5.0,
    reviews: 89,
    timeStart: "10:00",
    timeEnd: "20:00",
    availableDates: ["2026-04-14", "2026-04-16", "2026-04-18", "2026-04-20", "2026-04-21"],
  },
  {
    id: 4,
    mentorId: 8,
    mentorName: "Miguel Santos",
    title: "DevOps Engineer",
    image: "https://images.unsplash.com/photo-1581913229425-9c6b993fc107?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhtYWxlJTIwZGV2ZWxvcGVyJTIwbGFwdG9wfGVufDF8fHx8MTc3MzkxNzc4Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    skills: ["Docker", "Kubernetes", "AWS", "CI/CD"],
    price: "Gratis",
    sessionsCompleted: 167,
    rating: 4.8,
    reviews: 95,
    timeStart: "08:00",
    timeEnd: "17:00",
    availableDates: ["2026-04-14", "2026-04-15", "2026-04-17", "2026-04-19", "2026-04-22"],
  },
];

// Mentorías programadas
export const mockScheduledMentorships: ScheduledMentorship[] = [
  // Hoy
  {
    id: 1,
    mentorId: 1,
    mentorName: "Ana García",
    studentId: 4,
    studentName: "Juan Pérez",
    topic: "React Hooks Avanzado",
    date: "2026-04-14",
    time: "14:00",
    duration: 30,
    price: 25,
    status: "pendiente",
    studentImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MjAwNzV8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MTcwMDAwMDB8&ixlib=rb-4.0&q=80&w=100",
  },
  {
    id: 2,
    mentorId: 1,
    mentorName: "Ana García",
    studentId: 7,
    studentName: "Sofia Rossi",
    topic: "TypeScript Tipos Genéricos",
    date: "2026-04-14",
    time: "16:30",
    duration: 30,
    price: 25,
    status: "pendiente",
    studentImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MjAwNzV8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MTcwMDAwMDB8&ixlib=rb-4.0&q=80&w=100",
  },
  // Mañana
  {
    id: 3,
    mentorId: 1,
    mentorName: "Ana García",
    studentId: 5,
    studentName: "Laura Martínez",
    topic: "CSS Grid y Flexbox",
    date: "2026-04-15",
    time: "10:00",
    duration: 30,
    price: 25,
    status: "pendiente",
    studentImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MjAwNzV8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MTcwMDAwMDB8&ixlib=rb-4.0&q=80&w=100",
  },
  {
    id: 4,
    mentorId: 1,
    mentorName: "Ana García",
    studentId: 4,
    studentName: "Juan Pérez",
    topic: "Optimización de Componentes",
    date: "2026-04-15",
    time: "15:00",
    duration: 30,
    price: 25,
    status: "pendiente",
    studentImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MjAwNzV8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MTcwMDAwMDB8&ixlib=rb-4.0&q=80&w=100",
  },
  // Próximos días
  {
    id: 5,
    mentorId: 1,
    mentorName: "Ana García",
    studentId: 5,
    studentName: "Laura Martínez",
    topic: "Testing con Jest",
    date: "2026-04-18",
    time: "11:00",
    duration: 30,
    price: 25,
    status: "pendiente",
    studentImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MjAwNzV8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MTcwMDAwMDB8&ixlib=rb-4.0&q=80&w=100",
  },
  // Completadas
  {
    id: 6,
    mentorId: 1,
    mentorName: "Ana García",
    studentId: 4,
    studentName: "Juan Pérez",
    topic: "Introducción a React",
    date: "2026-04-10",
    time: "14:00",
    duration: 30,
    price: 25,
    status: "completada",
    studentImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MjAwNzV8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MTcwMDAwMDB8&ixlib=rb-4.0&q=80&w=100",
  },
  {
    id: 7,
    mentorId: 1,
    mentorName: "Ana García",
    studentId: 7,
    studentName: "Sofia Rossi",
    topic: "Estado y Props",
    date: "2026-04-08",
    time: "16:00",
    duration: 30,
    price: 25,
    status: "completada",
    studentImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MjAwNzV8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MTcwMDAwMDB8&ixlib=rb-4.0&q=80&w=100",
  },
  {
    id: 8,
    mentorId: 1,
    mentorName: "Ana García",
    studentId: 5,
    studentName: "Laura Martínez",
    topic: "Ciclo de vida de componentes",
    date: "2026-04-05",
    time: "10:00",
    duration: 30,
    price: 25,
    status: "completada",
    studentImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0MjAwNzV8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MTcwMDAwMDB8&ixlib=rb-4.0&q=80&w=100",
  },
];

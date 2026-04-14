# 🔐 Sistema de Autenticación - MicroMentorías

## Usuarios de Prueba

Existen 3 usuarios de prueba para verificar todas las funcionalidades según cada rol:

### 👨‍🏫 **Mentor**
```
Email: mentor@mentorias.com
Contraseña: 123456
```

**Acceso a:**
- 📊 Dashboard de Mentorías (`/mentor-dashboard`)
- 📅 Calendario de Sesiones (`/mentor-schedule`)

---

### 🎓 **Estudiante**
```
Email: estudiante@mentorias.com
Contraseña: 123456
```

**Acceso a:**
- 🔍 Búsqueda de Mentores (`/buscar`)
- 👁️ Perfil de Mentores

---

### 🔒 **Administrador**
```
Email: admin@mentorias.com
Contraseña: 123456
```

**Acceso a:**
- 👥 Panel de Administración (`/admin`)
- Gestión de Usuarios
- Gestión de Mentorías

---

## 🎯 Flujo de Autenticación

1. **Usuario no autenticado**: Solo puede ver la landing page
2. **Iniciar sesión**: Acceso a `/login`
3. **Menú dinámico**: El header cambia según el rol del usuario
4. **Protección de rutas**: Cada página solo es accesible por su rol

---

## 📋 Rutas Protegidas

| Ruta | Rol Requerido | Vista |
|------|--------------|-------|
| `/buscar` | Estudiante | Búsqueda de mentores |
| `/mentor-dashboard` | Mentor | Crear avisos de mentoría |
| `/mentor-schedule` | Mentor | Calendario de sesiones |
| `/admin` | Admin | Panel de control |

---

## 💾 Persistencia

- La sesión se guarda en `localStorage`
- Al refrescar la página, se mantiene el usuario autenticado
- El logout limpia la sesión

---

## 🚀 Características Implementadas

✅ Contexto de autenticación (AuthContext)  
✅ 3 usuarios de prueba  
✅ Login con email y contraseña  
✅ Botones de acceso rápido a cuentas de prueba  
✅ Protección de rutas por rol  
✅ Menú dinámico según usuario  
✅ Botón de logout  
✅ Persistencia en localStorage  

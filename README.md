# 🏥 Prescripciones Médicas - Frontend

Interfaz de usuario moderna y responsiva para la gestión de órdenes médicas, construida con **React** y **Tailwind CSS**.

## 🚀 Características
- **Dashboard de Admin:** Visualización de métricas con gráficos dinámicos (Recharts).
- **Portal del Médico:** Emisión de recetas con validación de campos e ítems dinámicos.
- **Portal del Paciente:** Consulta de historial, descarga de PDF y gestión de estado (Pendiente/Consumida).
- **Protección de Rutas:** Middleware para manejo de sesiones y permisos por rol.

## 🛠️ Tecnologías
- **Framework:** React + Vite / Next.js (App Router)
- **Estilos:** Tailwind CSS
- **Iconografía:** Lucide React
- **Comunicación:** Axios para consumo de API REST
- **Notificaciones:** Toasts para feedback de acciones

## ⚙️ Configuración e Instalación

1.  **Instalar dependencias:**
    ```bash
    npm install
    ```

2.  **Variables de Entorno:**
    Crea un archivo `.env.local` en la raíz y configura la URL de tu backend:
    ```env
    VITE_API_URL=http://localhost:3000
    ```
    *(Nota: Si usas Next.js, la variable debe ser `NEXT_PUBLIC_API_URL`)*

3.  **Ejecutar el proyecto:**
    ```bash
    npm run dev
    ```

El proyecto estará disponible en: `http://localhost:5173` (Vite) o `http://localhost:3000` (Next.js).

## 🔐 Acceso de Prueba
Para probar los diferentes módulos, utiliza las credenciales configuradas en el Seed del Backend:
- **Admin:** `admin@test.com` / `admin123`
- **Médico:** `dr@test.com` / `dr123`
- **Paciente:** `patient@test.com` / `patient123`

---
Desarrollado por **Steven García** - Cali, Colombia.

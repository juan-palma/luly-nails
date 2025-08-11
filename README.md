## Reservas y Administracion de Turnos

Es una aplicacion que permite tanto reservar turnos para diferentes servicios, con diferentes empledados de un mismo negocio (peluqueri, salon de uñas, spa, etc).
Como asi tambien llevar la administracion, pudiendo crear servicios, empleados relacionados a los servicios creados, verificacion de las reservas etc.

### Tecnologías Utilizadas

* **Frontend:**
    * React version 18.2.0
    * React Router (para la navegación)
    * React Bootstrap version 2.10.9 (para los componentes de la interfaz de usuario)
    * Bootstrap version 5.3.5
    * React Icons version 5.5.0 (para el uso de iconos)
    * Vite version 6.2.0 (como herramienta de construcción)
    * React-Calendar y date-fsn (para trababajar con el calendario)
* **Backend:**
    * cors: version 2.8.5
    * dotenv version 16.4.7
    * express version 4.21.2
    * mongoose 8.10.0
* **Otras Herramientas:**
    * npm (como gestor de paquetes)
    * Git (para el control de versiones)

## Estado del Desarrollo

### Backend

Aquí se detalla los avances del backend:

* **Estructura de Carpetas:** Se ha establecido una estructura de carpetas para organizar la lógica del backend para modelos, controladores, rutas, etc. (`/controllers/colaboradoresController`, `/controllers/serviciosController`, `/models/servicios.model`, `/models/colaboradores.model`, etc).
* **Conexión a la Base de Datos:** Se ha implementado la conexión a la base de datos MongoDB utilizando Mongoose. Se configuró la conexión y se definieron los esquemas iniciales para los modelos de datos (`Servicio`, `Colaborador`).
* **APIs para la Administración:**
    * Se han desarrollado las rutas y los controladores para la creación de servicios (`/api/servicios` - método POST).
    * Se han desarrollado las rutas y los controladores para la creación de colaboradores (`/api/colaboradores` - método POST).
    * Se han desarrollado las rutas y los controladores para la obtención de listas de servicios (`/api/servicios` - método GET).
    * Se han desarrollado las rutas y los controladores para la obtención de listas de colaboradores (`/api/colaboradores` - método GET).
    * Se han desarrollado las rutas y los controladores para la edición de servicios (`/api/servicios/:id` - método PUT).
    * Se han desarrollado las rutas y los controladores para la edición de colaboradores (`/api/colaboradores/:id` - método PUT).
    * Se han desarrollado las rutas y los controladores para la eliminación de servicios (`/api/servicios/:id` - método DELETE).
    * Se han desarrollado las rutas y los controladores para la eliminación de colaboradores (`/api/colaboradores/:id` - método DELETE).
* **Middleware:** Se ha implementado middleware para habilitar CORS (`cors`) y para cargar las variables de entorno (`dotenv`), y middleware para manejo de errores.


### Frontend
Aqui se detalla los avances del fronend:

### Panel de Administración

Aquí se detalla el avance en la sección de administración:

* **Estructura de Carpetas:** Se ha establecido una estructura de carpetas clara y organizada para separar la lógica y los componentes de la administración
  (`src/components/adminReservas/componentsAdmin/`, `src/hooks/hooksAdmin/`, `src/services/serviceAdmin.js`).
* **Creación de Elementos (Servicios y Colaboradores):**
    * Se ha creado un formulario (`CrearElementoForm`) para permitir la creación de nuevos servicios y colaboradores.
    * Se implementó un hook (`useCrearElemento`) para manejar la lógica del formulario, la validación (letras, espacios y más de 3 caracteres), y la comunicación con la API.
    * Se implementó la UX de los mensajes de validación de errores y mensaje de exito al crear elementos.
* **Listado de Elementos (Servicios y Colaboradores):**
    * Se creó un componente (`ListarElementos`) para mostrar las listas de servicios y colaboradores.
    * Se implementaron funcionalidades para editar y eliminar elementos de estas listas.
    * Se añadió un modal (`EditarElementoModal`) para la edición de elementos, haciéndolo responsive para diferentes tamaños de pantalla.
* **Menú de Administración:**
    * Se implementó un menú lateral para la navegación dentro del panel de administración, con diferentes secciones (Crear Servicio, Crear Colaborador, Lista de Servicios, Lista de Colaboradores).
    * Se creó un componente reutilizable (`AdminMenu`) para la estructura del menú, adaptable para pantallas grandes y móviles (Offcanvas).

### Sección de Reservas (En Inicio)

Aquí se describe el inicio del desarrollo de la sección de reservas para clientes:

* **Estructura de Carpetas:** Se ha creado la estructura de carpetas inicial para la sección de reservas (`src/components/reservas/componentsReservas/`, `src/hooks/hooksReservas/`, `src/services/serviceReservas.js`).
* **Próximos Pasos:**
    * Diseñar la interfaz de usuario para la creación de reservas (calendario, selección de horario, formulario de datos).
    * Definir la lógica para la disponibilidad de horarios.
    * Implementar las llamadas a la API para crear reservas.

### Próximos Pasos Generales
* Integrar completamente la sección de reservas con el panel de administración.
* Implementar la autenticación y autorización para el panel de administración.

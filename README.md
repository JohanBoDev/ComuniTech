# ComuniTech
ComuniTech es una plataforma de comercio electrónico diseñada para que los usuarios puedan explorar, seleccionar y comprar componentes tecnológicos de manera fácil, segura y confiable desde la comodidad de su hogar. La aplicación incluye funcionalidades completas para la gestión de productos, pedidos, usuarios y pagos, proporcionando una experiencia fluida tanto para clientes como para administradores.

Características Principales
Para Usuarios
Explorar Productos:
Visualización de todos los productos disponibles con información detallada, categorías, y opciones de búsqueda/filtrado.
Carrito de Compras:
Añadir, eliminar o modificar la cantidad de productos en el carrito.
Ver subtotales y totales antes de proceder al pago.
Gestión de Pedidos:
Crear pedidos y realizar pagos simulados con información clara sobre el estado del pedido.
Consultar detalles y estados de los pedidos anteriores.
Direcciones de Envío:
Añadir, actualizar, eliminar y seleccionar direcciones de envío personalizadas para los pedidos.
Para Administradores
Gestión de Productos:
Crear, actualizar y eliminar productos del catálogo.
Gestión de Pedidos:
Ver todos los pedidos realizados por los usuarios.
Filtrar pedidos por estado, usuario o rango de fechas.
Cambiar el estado de los pedidos (ej. Enviado, Entregado).
Visualización Detallada:
Ver detalles completos de los pedidos, incluyendo usuario, dirección y productos.
Tecnologías Utilizadas
Frontend
Framework: React (con diseño responsivo).
Estilo: TailwindCSS para estilos modernos y personalizables.
Hosting: Vercel para un despliegue rápido y confiable.
Backend
Framework: Node.js con Express.js.
Base de Datos: MySQL para una gestión estructurada de datos.
Autenticación: JWT (JSON Web Tokens) para autenticación y autorización segura.
Hosting: Render o Railway para un backend robusto y escalable.
Extras
Pasarela de Pago Simulada:
Flujo de pago controlado internamente con tokens para validar transacciones.
Variables de Entorno:
Configuraciones seguras con dotenv.
Flujo del Usuario
Inicio:
El usuario puede navegar por los productos sin necesidad de registrarse.
Explorar Productos:
Filtrar productos por nombre, categoría o precio.
Añadir al Carrito:
Gestionar productos en el carrito antes de continuar.
Registro/Iniciar Sesión:
El usuario se autentica para proceder al pago.
Pago:
Simulación de pago con generación de tokens para mayor seguridad.
Confirmación del Pedido:
Asignación de dirección de envío y creación del pedido.
Gestión del Pedido:
Visualizar el estado del pedido y detalles.
Despliegue
Frontend
Hosting en Vercel para optimizar el rendimiento en dispositivos móviles y desktop.
Backend
Hosting en Render o Railway para manejar la lógica del servidor y las conexiones a la base de datos.
Base de Datos
MySQL desplegado en servicios como PlanetScale o Railway.

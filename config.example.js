/**
 * ============================================
 * ARCHIVO DE CONFIGURACIÓN PERSONAL
 * ============================================
 * 
 * Copia este contenido y personalízalo con tu información.
 * Luego puedes usarlo para actualizar rápidamente tu portfolio.
 * 
 * Nota: Este archivo es solo una guía. Los cambios reales
 * se deben hacer en index.html
 */

const PORTFOLIO_CONFIG = {
    // ============================================
    // INFORMACIÓN PERSONAL
    // ============================================
    personal: {
        nombre: "Tu Nombre Completo",
        nombreCorto: "TN", // Para el logo del navbar
        titulo: "Desarrollador Full Stack & Diseñador de Experiencias Web",
        descripcion: "Creando experiencias digitales que combinan código limpio, diseño intuitivo y atención al detalle.",
        ubicacion: "Tu Ciudad, País",
        email: "tu@email.com",
        telefono: "+1 (234) 567-890",
    },

    // ============================================
    // REDES SOCIALES
    // ============================================
    social: {
        github: "https://github.com/tuusuario",
        linkedin: "https://linkedin.com/in/tuusuario",
        twitter: "https://twitter.com/tuusuario",
        // Opcionales:
        instagram: "",
        dribbble: "",
        behance: "",
        medium: "",
    },

    // ============================================
    // ABOUT / QUIEN SOY
    // ============================================
    about: {
        titulo: "Who I Am",
        parrafos: [
            "Soy un desarrollador apasionado por crear experiencias web que no solo funcionan perfectamente, sino que también inspiran y deleitan a los usuarios.",
            
            "Con experiencia en desarrollo full-stack, me especializo en construir aplicaciones web modernas que son escalables, accesibles y hermosas.",
            
            "Cuando no estoy programando, puedes encontrarme explorando nuevas tecnologías, contribuyendo a proyectos open source, o disfrutando de un buen café."
        ],
        imagenPerfil: "assets/profile.jpg",
        cvLink: "assets/cv.pdf" // Opcional
    },

    // ============================================
    // SKILLS / HABILIDADES
    // ============================================
    skills: [
        { nombre: "JavaScript", icono: "javascript.svg" },
        { nombre: "React", icono: "react.svg" },
        { nombre: "Node.js", icono: "nodejs.svg" },
        { nombre: "TypeScript", icono: "typescript.svg" },
        { nombre: "Python", icono: "python.svg" },
        { nombre: "HTML5", icono: "html5.svg" },
        { nombre: "CSS3", icono: "css3.svg" },
        { nombre: "Git", icono: "git.svg" },
        // Añade más según necesites
    ],

    // ============================================
    // PROYECTOS WEB
    // ============================================
    proyectos: [
        {
            titulo: "E-commerce Moderno",
            descripcion: "Plataforma de comercio electrónico con carrito de compras, pagos integrados y panel de administración completo.",
            imagen: "assets/project-1.jpg",
            tags: ["React", "Node.js", "MongoDB", "Stripe"],
            demoUrl: "https://proyecto-demo.com",
            githubUrl: "https://github.com/tuusuario/proyecto",
        },
        {
            titulo: "Dashboard Analytics",
            descripcion: "Dashboard interactivo para visualización de datos con gráficos en tiempo real y exportación de reportes.",
            imagen: "assets/project-2.jpg",
            tags: ["Vue.js", "D3.js", "Firebase"],
            demoUrl: "https://proyecto-demo2.com",
            githubUrl: "https://github.com/tuusuario/proyecto2",
        },
        // Añade más proyectos...
    ],

    // ============================================
    // OTROS TRABAJOS (Beyond Web)
    // ============================================
    otrosTrabajos: [
        {
            titulo: "Proyecto de Diseño UI/UX",
            descripcion: "Sistema de diseño completo para una startup fintech, incluyendo componentes reutilizables y guías de estilo.",
            imagen: "assets/work-1.jpg",
        },
        {
            titulo: "Contribución Open Source",
            descripcion: "Mantenedor activo de una librería de componentes React utilizada por más de 10,000 desarrolladores.",
            imagen: "assets/work-2.jpg",
        },
        {
            titulo: "Tutorial Series",
            descripcion: "Serie de tutoriales en YouTube sobre desarrollo web moderno con más de 50,000 visualizaciones.",
            imagen: "assets/work-3.jpg",
        },
        // Añade más trabajos...
    ],

    // ============================================
    // CONFIGURACIÓN DE COLORES (OPCIONAL)
    // ============================================
    colores: {
        // Estos valores se usan en css/style.css
        acento1: "#8b5cf6",  // Violeta
        acento2: "#6366f1",  // Indigo
        acento3: "#3b82f6",  // Azul
        
        // Para cambiar estos colores:
        // 1. Edita estos valores aquí
        // 2. Copia los valores
        // 3. Pégalos en las variables CSS en css/style.css (líneas 12-15)
    },

    // ============================================
    // CONFIGURACIÓN SEO (OPCIONAL)
    // ============================================
    seo: {
        titulo: "Tu Nombre - Portfolio",
        descripcion: "Portfolio personal de desarrollo web y diseño",
        keywords: "desarrollador web, full stack, react, node.js, portfolio",
        autor: "Tu Nombre",
        
        // Open Graph (para redes sociales)
        ogImage: "assets/og-image.jpg", // 1200x630px recomendado
        ogUrl: "https://tudominio.com",
        
        // Twitter Card
        twitterUsername: "@tuusuario",
    },

    // ============================================
    // ANALYTICS (OPCIONAL)
    // ============================================
    analytics: {
        // Google Analytics
        googleAnalyticsId: "G-XXXXXXXXXX",
        
        // Plausible (alternativa privacy-friendly)
        plausibleDomain: "tudominio.com",
        
        // Simple Analytics
        simpleAnalytics: false,
    },

    // ============================================
    // FORMULARIO DE CONTACTO
    // ============================================
    formulario: {
        // Opción 1: Formspree
        formspreeId: "tu_formspree_id",
        formspreeUrl: "https://formspree.io/f/tu_id",
        
        // Opción 2: EmailJS
        emailjs: {
            serviceId: "tu_service_id",
            templateId: "tu_template_id",
            publicKey: "tu_public_key",
        },
        
        // Opción 3: Tu propio backend
        customEndpoint: "https://tu-api.com/contact",
    },
};

/**
 * ============================================
 * CÓMO USAR ESTA CONFIGURACIÓN
 * ============================================
 * 
 * 1. Rellena todos los campos con tu información
 * 
 * 2. Para actualizar el HTML:
 *    - Abre index.html
 *    - Busca los comentarios <!-- 📝 REEMPLAZAR: ... -->
 *    - Reemplaza con la información de este archivo
 * 
 * 3. Para las imágenes:
 *    - Coloca tus imágenes en la carpeta assets/
 *    - Usa los nombres especificados aquí o actualiza las rutas
 * 
 * 4. Para los colores:
 *    - Copia los valores de 'colores' arriba
 *    - Pégalos en css/style.css en las variables CSS
 * 
 * 5. Para analytics:
 *    - Si usas Google Analytics, añade el script en <head> de index.html
 *    - Para Plausible, añade su script
 * 
 * 6. Para el formulario:
 *    - Elige una opción (Formspree, EmailJS, o custom)
 *    - Sigue las instrucciones en js/main.js (línea 227)
 */

/**
 * ============================================
 * EXPORTAR (SI USAS MÓDULOS)
 * ============================================
 */
// export default PORTFOLIO_CONFIG;

/**
 * ============================================
 * NOTAS ADICIONALES
 * ============================================
 * 
 * - Este archivo NO se carga automáticamente
 * - Es solo una guía para organizar tu información
 * - Los cambios reales se hacen en index.html, css/style.css y js/main.js
 * - Mantén este archivo actualizado cuando hagas cambios
 */


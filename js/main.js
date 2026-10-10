class GradientCanvas {
    constructor() {
        this.canvas = document.getElementById('gradient-canvas');
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.animationId = null;
        this.time = 0;
        this.getColors();
        this.resizeCanvas();
        this.animate();
        
        window.addEventListener('resize', () => this.resizeCanvas());
    }
    
    getColors() {
        const root = getComputedStyle(document.documentElement);
        this.colors = [
            root.getPropertyValue('--gradient-color-1').trim(),
            root.getPropertyValue('--gradient-color-2').trim(),
            root.getPropertyValue('--gradient-color-3').trim(),
            root.getPropertyValue('--gradient-color-4').trim(),
        ];
    }
    
    resizeCanvas() {
        const container = this.canvas.parentElement;
        this.canvas.width = container.offsetWidth;
        this.canvas.height = container.offsetHeight;
    }
    
    animate() {
        this.time += 0.005;
        this.drawGradient();
        this.animationId = requestAnimationFrame(() => this.animate());
    }
    
    drawGradient() {
        const { width, height } = this.canvas;
        const time = this.time;
        const grd = this.ctx.createLinearGradient(
            width * (0.5 + 0.3 * Math.sin(time)),
            height * (0.5 + 0.3 * Math.cos(time)),
            width * (0.5 - 0.3 * Math.sin(time + 1)),
            height * (0.5 - 0.3 * Math.cos(time + 1))
        );
        
        grd.addColorStop(0, this.colors[0]);
        grd.addColorStop(0.33, this.colors[1]);
        grd.addColorStop(0.66, this.colors[2]);
        grd.addColorStop(1, this.colors[3]);
        
        this.ctx.fillStyle = grd;
        this.ctx.fillRect(0, 0, width, height);
    }
    
    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    }
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new GradientCanvas();
    });
} else {
    new GradientCanvas();
}

const CONFIG = {
    scrollOffset: 80,
    scrollRevealThreshold: 0.1,
};

const Utils = {
    throttle(func, wait = 100) {
        let waiting = false;
        return function executedFunction(...args) {
            if (!waiting) {
                func.apply(this, args);
                waiting = true;
                setTimeout(() => {
                    waiting = false;
                }, wait);
            }
        };
    },

    smoothScrollTo(target, offset = 0) {
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
};

class HeroNavbar {
    constructor() {
        this.navbar = document.getElementById('navbarHero');
        this.toggle = document.getElementById('navbarHeroToggle');
        this.menu = document.getElementById('navbarHeroLinks');
        this.navLinks = this.navbar ? this.navbar.querySelectorAll('a[href^="#"]') : [];
        this.sections = document.querySelectorAll('section[id]');

        this.init();
    }

    init() {
        if (!this.navbar) return;
        this.setupSmoothScroll();
        this.setupMobileToggle();
    }

    setupSmoothScroll() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                if (targetId === '#contact') {
                    window.scrollTo({
                        top: document.body.scrollHeight,
                        behavior: 'smooth'
                    });
                    return;
                }
                const targetSection = document.querySelector(targetId);

                if (targetSection) {
                    Utils.smoothScrollTo(targetSection, CONFIG.scrollOffset);
                }
            });
        });
    }

    setupMobileToggle() {
        if (!this.toggle || !this.menu) return;

        this.toggle.addEventListener('click', () => {
            const isOpen = this.menu.classList.toggle('open');
            this.toggle.setAttribute('aria-expanded', String(isOpen));
        });

        this.menu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => this.closeMobileMenu());
        });

        document.addEventListener('click', (e) => {
            if (!this.navbar.contains(e.target)) {
                this.closeMobileMenu();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.closeMobileMenu();
        });

        window.addEventListener('resize', Utils.throttle(() => {
            if (window.innerWidth > 900) this.closeMobileMenu();
        }, 150));
    }

    closeMobileMenu() {
        if (!this.menu || !this.toggle) return;
        this.menu.classList.remove('open');
        this.toggle.setAttribute('aria-expanded', 'false');
    }
}

class ScrollReveal {
    constructor() {
        this.elements = document.querySelectorAll('.scroll-reveal');
        this.init();
    }

    init() {
        if (this.elements.length === 0) return;

        const observerOptions = {
            threshold: CONFIG.scrollRevealThreshold,
            rootMargin: '0px 0px -50px 0px'
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, observerOptions);

        this.elements.forEach(el => this.observer.observe(el));
    }
}

class LazyLoader {
    constructor() {
        this.init();
    }

    init() {
        const images = document.querySelectorAll('img[data-src]');
        
        if (images.length === 0) return;

        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }
}

class LanguageSwitcher {
    constructor() {
        this.button = document.getElementById('languageToggle');
        this.defaultLanguage = 'en';
        this.translations = {
            es: {
                'nav.home': 'Inicio', 'nav.about': '¿Quién soy?', 'nav.skills': '¿Qué hago?', 'nav.projects': 'Proyectos', 'nav.talk': 'Contáctame',
                'hero.available': 'Disponible para trabajar', 'hero.greeting': 'Hola, soy', 'hero.role': 'Y soy un ingeniero de software',
                'section.about': '¿Quién soy?', 'section.skills': '¿Qué hago?', 'section.projects': 'Proyectos', 'projects.subtitle': 'Demos de aplicaciones desplegadas',
                'projects.focushub.title': 'FocusHub : Plataforma de gestión de productividad',
                'projects.focushub.desc': 'Monorepo con frontend en Angular 19 y backend en NestJS 11 para flujos de productividad: tareas, calendario, sesiones de enfoque, técnicas, estadísticas y autenticación JWT.',
                'projects.fluxlab.title': 'FluxLab : Plataforma web LIMS',
                'projects.fluxlab.desc': 'LIMS web para laboratorios de biotecnología ambiental que centraliza muestras, resultados y reportes automatizados.',
                'projects.ergonominador.title': 'Ergonominador : Sistema de monitoreo IoT',
                'projects.ergonominador.desc': 'Sistema IoT basado en Django que integra sensores MQTT para monitorear en tiempo real las condiciones ergonómicas del puesto de trabajo.',
                'footer.made': 'Made with', 'footer.by': 'by Leo'
            },
            en: {
                'nav.home': 'Home', 'nav.about': 'About', 'nav.skills': 'Skills', 'nav.projects': 'Projects', 'nav.talk': "Contact",
                'hero.available': 'Available for work', 'hero.greeting': 'Hi there, I\'m', 'hero.role': 'And I\'m a software engineer',
                'section.about': 'About', 'section.skills': 'Skills', 'section.projects': 'Projects', 'projects.subtitle': 'Deployed Application Demos',
                'projects.focushub.title': 'FocusHub : Productivity Management Platform',
                'projects.focushub.desc': 'Monorepo with Angular 19 frontend and NestJS 11 backend for productivity workflows: tasks, calendar, focus sessions, techniques, stats, and JWT authentication.',
                'projects.fluxlab.title': 'FluxLab : LIMS Web Platform',
                'projects.fluxlab.desc': 'Web-based LIMS for environmental biotechnology labs, centralizing samples, results, and automated reporting.',
                'projects.ergonominador.title': 'Ergonominador : IoT Monitoring System',
                'projects.ergonominador.desc': 'Django-based IoT system integrating MQTT sensors to monitor ergonomic workspace conditions in real-time.',
                'footer.made': 'Made with', 'footer.by': 'by Leo'
            }
        };
        this.modalTranslations = {
            'Ergonominador : IoT Ergonomic Monitoring System': 'Ergonominador :Sistema de Monitoreo Ergonómico IoT',
            'Full documentation:': 'Documentación completa:',
            'View Live Demo →': 'Ver demo en vivo →',
            'Overview': 'Descripción general',
            'Django system integrating IoT sensors via MQTT to monitor ergonomic workspace conditions. Architecture follows:': 'Sistema Django que integra sensores IoT mediante MQTT para monitorear las condiciones ergonómicas del espacio de trabajo. La arquitectura sigue:',
            'Hardware → MQTT Broker → Django Backend → Frontend Dashboard': 'Hardware → Broker MQTT → Backend Django → Dashboard web',
            'Authors': 'Autores',
            'Tech Stack': 'Tecnologías',
            'Backend:': 'Backend:',
            'Django 5.1.2 + SQLite': 'Django 5.1.2 + SQLite',
            'MQTT (Paho-MQTT + HiveMQ Cloud)': 'MQTT (Paho-MQTT + HiveMQ Cloud)',
            'jQuery + Chart.js + Bootstrap 4': 'jQuery + Chart.js + Bootstrap 4',
            'ESP32 + MicroPython': 'ESP32 + MicroPython',
            'LM35DZ (temperature), HC-SR04 (ultrasound), LDR (light)': 'LM35DZ (temperatura), HC-SR04 (ultrasonido), LDR (luz)',
            'MQTT over TLS (port 8883)': 'MQTT sobre TLS (puerto 8883)',
            'SensorTemp/SensorSonido/SensorLuz:': 'SensorTemp/SensorSonido/SensorLuz:',
            'Alert:': 'Alerta:',
            'Postura:': 'Postura:',
            'IoT Communication:': 'Comunicación IoT:',
            'Frontend:': 'Frontend:',
            'Hardware:': 'Hardware:',
            'Sensors:': 'Sensores:',
            'Protocol:': 'Protocolo:',
            'Key Components': 'Componentes principales',
            'MQTT Client': 'Cliente MQTT',
            'Permanent subscription to topics, sensor data reception, and database persistence. Auto-starts in Django deployment via daemon thread.': 'Suscripción permanente a tópicos, recepción de datos de sensores y persistencia en la base de datos. Se inicia automáticamente en el despliegue de Django mediante un hilo daemon.',
            'Subscribed Topics:': 'Tópicos suscritos:',
            '- Sensor readings': '- Lecturas de sensores',
            '- Hardware-generated alerts': '- Alertas generadas por el hardware',
            '- Posture traffic light states': '- Estados del semáforo de postura',
            'Data Models': 'Modelos de datos',
            'Store historical readings (value + timestamp)': 'Almacenan lecturas históricas (valor + marca de tiempo)',
            'Notifications classified by type with seen flag': 'Notificaciones clasificadas por tipo con indicador de lectura',
            'Records time in each traffic light state': 'Registra el tiempo en cada estado del semáforo',
            'REST API': 'API REST',
            '- Returns latest unseen alert by type + current traffic light state': '- Devuelve la última alerta no vista por tipo + el estado actual del semáforo',
            '- Last 5 minutes data + time aggregates by traffic light color': '- Datos de los últimos 5 minutos + agregados de tiempo por color del semáforo',
            '- Real-time dashboard with Chart.js graphs (5s polling)': '- Dashboard en tiempo real con gráficas de Chart.js (consulta cada 5 s)',
            'IoT Flow': 'Flujo IoT',
            'Hardware → Backend:': 'Hardware → Backend:',
            'Physical sensors (temperature, ultrasound, photoresistor) connected to microcontroller': 'Sensores físicos (temperatura, ultrasonido y fotoresistor) conectados al microcontrolador',
            'Microcontroller publishes data via WiFi to public MQTT broker (HiveMQ)': 'El microcontrolador publica datos por WiFi a un broker MQTT público (HiveMQ)',
            'Django backend receives messages in real-time and stores in SQLite': 'El backend Django recibe los mensajes en tiempo real y los almacena en SQLite',
            'Frontend queries API via polling and visualizes historical data': 'El frontend consulta la API mediante polling y visualiza los datos históricos',
            'Traffic Light System (2 LEDs):': 'Sistema de semáforo (2 LED):',
            'Hardware measures screen distance with ultrasonic sensor. Based on time in adequate/inadequate posture, activates indicator LEDs:': 'El hardware mide la distancia a la pantalla con un sensor ultrasónico. Según el tiempo en una postura adecuada o inadecuada, activa los LED indicadores:',
            'Green LED:': 'LED verde:',
            'Correct posture (>50cm distance)': 'Postura correcta (distancia >50 cm)',
            'Yellow LED:': 'LED amarillo:',
            'Preventive warning (40-50cm or approaching time limit)': 'Advertencia preventiva (40-50 cm o acercándose al límite de tiempo)',
            'Red LED:': 'LED rojo:',
            'Incorrect posture (<40cm)': 'Postura incorrecta (<40 cm)',
            'Dashboard shows time proportion in each state via donut chart for posture habit analysis.': 'El dashboard muestra la proporción de tiempo en cada estado mediante un gráfico de dona para analizar los hábitos posturales.',
            'Main Endpoints': 'Endpoints principales',
            '- Main page': '- Página principal',
            '- Dashboard with graphs': '- Dashboard con gráficas',
            '- Technical documentation': '- Documentación técnica',
            '- Alerts API': '- API de alertas',
            '- Sensor data API': '- API de datos de sensores',

            'FocusHub : Productivity Management Platform': 'FocusHub :Plataforma de Gestión de Productividad',
            'Link to the Repository:': 'Enlace al repositorio:',
            'FocusHub is a productivity monorepo combining an Angular 19 frontend and a NestJS 11 backend. It covers task management, calendar planning, concentration techniques, focus sessions, productivity analytics, and JWT authentication in a single integrated platform.': 'FocusHub es un monorepo de productividad que combina un frontend en Angular 19 y un backend en NestJS 11. Incluye gestión de tareas, planificación de calendario, técnicas de concentración, sesiones de enfoque, analítica de productividad y autenticación JWT en una sola plataforma integrada.',
            'Frontend Modules (Angular)': 'Módulos del frontend (Angular)',
            'Angular 19 (standalone components + signals)': 'Angular 19 (componentes standalone + signals)',
            'NestJS 11 + TypeORM': 'NestJS 11 + TypeORM',
            'SQLite local database (': 'Base de datos SQLite local (',
            'JWT with guard-protected routes and endpoints': 'JWT con rutas y endpoints protegidos por guards',
            'Docker Compose with frontend, backend, MySQL, and ELK': 'Docker Compose con frontend, backend, MySQL y ELK',
            'ELK stack configuration (Elasticsearch, Logstash, Kibana)': 'Configuración del stack ELK (Elasticsearch, Logstash, Kibana)',
            'AuthService + TokenService:': 'AuthService + TokenService:',
            'TaskService + EventService:': 'TaskService + EventService:',
            'TechniqueService:': 'TechniqueService:',
            'StatsService:': 'StatsService:',
            'Swagger Docs:': 'Documentación Swagger:',
            '- Angular frontend': '- Frontend Angular',
            '- NestJS backend': '- Backend NestJS',
            '- Logstash/ELK configuration': '- Configuración de Logstash/ELK',
            '- Multi-service orchestration': '- Orquestación de múltiples servicios',
            'POST /auth/register': 'POST /auth/register',
            'POST /auth/login': 'POST /auth/login',
            'GET /users/me': 'GET /users/me',
            'POST/GET/PATCH/DELETE /tasks': 'POST/GET/PATCH/DELETE /tasks',
            'POST/GET/PUT/DELETE /events': 'POST/GET/PUT/DELETE /events',
            'GET /events/by-date': 'GET /events/by-date',
            'GET /productivity/stats': 'GET /productivity/stats',
            'GET /api': 'GET /api',
            'Backend Modules (NestJS)': 'Módulos del backend (NestJS)',
            'Repository Structure': 'Estructura del repositorio',
            'Architecture Flow': 'Flujo de arquitectura',
            'User Workflow:': 'Flujo del usuario:',
            'Users register or log in and receive JWT credentials': 'Los usuarios se registran o inician sesión y reciben credenciales JWT',
            'Frontend sends authenticated requests to protected API modules': 'El frontend envía solicitudes autenticadas a módulos protegidos de la API',
            'Backend modules process tasks, events, categories, and productivity entities': 'Los módulos del backend procesan tareas, eventos, categorías y entidades de productividad',
            'TypeORM persists data in SQLite (main setup) and serves analytics endpoints': 'TypeORM persiste los datos en SQLite (configuración principal) y expone endpoints de analítica',
            'Statistics and active focus session state feed the productivity dashboards': 'Las estadísticas y el estado de las sesiones de enfoque alimentan los dashboards de productividad',
            'Execution Modes:': 'Modos de ejecución:',
            'Local:': 'Local:',
            'Containerized:': 'Contenerizado:',
            'Docker Compose can run frontend, backend, MySQL, and ELK services together': 'Docker Compose puede ejecutar juntos los servicios de frontend, backend, MySQL y ELK',
            '- Authentication': '- Autenticación',
            '- Current authenticated user': '- Usuario autenticado actual',
            '- Task management': '- Gestión de tareas',
            '- Calendar events': '- Eventos del calendario',
            '- Productivity analytics': '- Analítica de productividad',
            '- Swagger API docs': '- Documentación Swagger de la API',

            'FluxLab : LIMS for Environmental Biotech Labs': 'FluxLab :LIMS para Laboratorios de Biotecnología Ambiental',
            'Live demo:': 'Demo en vivo:',
            'Admin access:': 'Acceso de administrador:',
            'Use': 'Usa',
            'with password': 'con la contraseña',
            'to explore admin features.': 'para explorar las funciones de administrador.',
            'FluxLab is a web-based LIMS designed for environmental biotechnology laboratories. It centralizes samples, results, and reports to replace manual, spreadsheet-based workflows and improve traceability.': 'FluxLab es un LIMS web diseñado para laboratorios de biotecnología ambiental. Centraliza muestras, resultados e informes para reemplazar procesos manuales basados en hojas de cálculo y mejorar la trazabilidad.',
            'Focus:': 'Enfoque:',
            'Modular LIMS workflows and scalable server-side architecture': 'Flujos modulares de LIMS y arquitectura del servidor escalable',
            'Key Components': 'Componentes principales',
            'Authentication:': 'Autenticación:',
            'Secure access for lab technicians, researchers, students, and clients': 'Acceso seguro para técnicos de laboratorio, investigadores, estudiantes y clientes',
            'Clients & Projects:': 'Clientes y proyectos:',
            'Registration and management of lab customers and work orders': 'Registro y gestión de clientes del laboratorio y órdenes de trabajo',
            'Sample Intake:': 'Recepción de muestras:',
            'Import samples from Excel files and organize them by project': 'Importación de muestras desde archivos de Excel y organización por proyecto',
            'Test Assignment:': 'Asignación de pruebas:',
            'Schedule and track evaluations for each sample': 'Programación y seguimiento de evaluaciones para cada muestra',
            'Results & Reporting:': 'Resultados e informes:',
            'Capture outcomes and generate reports automatically': 'Registro de resultados y generación automática de informes',
            'Traceability:': 'Trazabilidad:',
            'End-to-end tracking from reception to final delivery': 'Seguimiento de extremo a extremo, desde la recepción hasta la entrega final',
            'Workflow': 'Flujo de trabajo',
            'Authenticate users and define roles': 'Autenticar usuarios y definir roles',
            'Register clients and projects': 'Registrar clientes y proyectos',
            'Import sample batches from Excel': 'Importar lotes de muestras desde Excel',
            'Assign tests and record results': 'Asignar pruebas y registrar resultados',
            'Generate final reports with full traceability': 'Generar informes finales con trazabilidad completa',
            'Database (main branch):': 'Base de datos (rama principal):',
            'Authentication:': 'Autenticación:',
            'Optional Orchestration:': 'Orquestación opcional:',
            'Observability:': 'Observabilidad:',
            'Key Components': 'Componentes principales',
            'Routes:': 'Rutas:',
            'Registration/login/logout and JWT lifecycle in localStorage': 'Registro/inicio de sesión/cierre de sesión y ciclo de vida de JWT en localStorage',
            'CRUD operations with reactive UI state': 'Operaciones CRUD con estado reactivo de la interfaz',
            'Focus timer, active session recovery, and task association per focus session': 'Temporizador de enfoque, recuperación de sesiones activas y asociación de tareas por sesión',
            'Productivity statistics consumption for the analytics views': 'Consumo de estadísticas de productividad para las vistas de analítica',
            'API documentation exposed at': 'Documentación de la API disponible en',
            'Persistence:': 'Persistencia:',
            'TypeORM configured for SQLite in the main branch': 'TypeORM configurado para SQLite en la rama principal',
            'Angular frontend': 'Frontend Angular',
            'NestJS backend': 'Backend NestJS',
            'Logstash/ELK configuration': 'Configuración de Logstash/ELK',
            'Multi-service orchestration': 'Orquestación de múltiples servicios',
            'Backend on': 'Backend en',
            'and frontend on': 'y frontend en',
            'Statistics and active focus session state feed the productivity dashboards': 'Las estadísticas y el estado de las sesiones de enfoque alimentan los dashboards de productividad'
        };
        this.modalTextNodes = [];
        document.querySelectorAll('.project-modal').forEach(modal => {
            const walker = document.createTreeWalker(modal, NodeFilter.SHOW_TEXT);
            let node;
            while ((node = walker.nextNode())) {
                if (node.nodeValue.trim()) this.modalTextNodes.push({ node, original: node.nodeValue });
            }
        });

        this.about = {
            en: document.querySelector('[data-i18n-html="about.content"]')?.innerHTML || '',
            es: `Hola, soy <span class="name-highlight">Leonardo</span>. Estudiante de quinto año de Ingeniería de Sistemas, con un fuerte enfoque en <strong>backend engineering</strong>, desarrollo de sistemas intensivos en datos y <strong>software escalable</strong> listo para producción.<br><br>Durante mi formación universitaria me he especializado en Programación Orientada a Objetos, arquitectura limpia y desarrollo consciente de la infraestructura. Sigo principios de <strong>Clean Code</strong>, aplico patrones de diseño y tomo decisiones de arquitectura basadas en compromisos técnicos. Trabajo con herramientas de ML y mantengo un perfil activo en <a href="https://github.com/LeonardoG2005" target="_blank" rel="noopener noreferrer">GitHub</a>, incluyendo despliegues en producción.<br><br>Mis bases abarcan <strong>Ciencias de la Computación e Ingeniería de Software</strong> (algoritmos avanzados, estructuras de datos dinámicas, programación de sistemas, desarrollo web y móvil, pruebas y seguridad), <strong>Matemáticas y Resolución de Problemas</strong> (matemática discreta, álgebra lineal y cálculo), y <strong>Arquitectura e Infraestructura</strong> (arquitectura de computadores, redes IP y entrega alineada con DevOps). También he desarrollado habilidades prácticas de <strong>Proyecto y Producto</strong> para evaluación técnica, diseño de software y ciclos de entrega estructurados.<br><br>Además, completé la <a href="https://www.linkedin.com/in/leotuvstarr/details/certifications/" target="_blank" rel="noopener noreferrer">Machine Learning Specialization de DeepLearning.AI</a> en <a href="https://www.coursera.org/specializations/machine-learning-introduction" target="_blank" rel="noopener noreferrer">Coursera</a> y cuento con una certificación <a href="https://www.linkedin.com/in/leotuvstarr/details/certifications/1764033906764/single-media-viewer/" target="_blank" rel="noopener noreferrer">IELTS Academic</a> que valida un nivel C1 de inglés.<br><br>Actualmente trabajo con un equipo en un <a href="https://github.com/LeonardoG2005/Juego-De-Idiomas" target="_blank" rel="noopener noreferrer">proyecto multijugador 2D de mundo abierto en Unity y C#</a>. La idea es crear un entorno divertido donde los jugadores aprendan idiomas mientras adquirimos experiencia construyendo, desplegando y manteniendo un proyecto de software real a largo plazo desde cero.`
        };
        this.init();
    }
    init() {
        if (!this.button) return;
        const saved = localStorage.getItem('portfolio-language');
        this.setLanguage(saved === 'es' ? 'es' : this.defaultLanguage, false);
        this.button.addEventListener('click', () => this.setLanguage(document.documentElement.lang === 'es' ? 'en' : 'es', true));
    }
    setLanguage(lang, persist = true) {
        const dict = this.translations[lang];
        if (!dict) return;
        document.documentElement.lang = lang;
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const value = dict[el.dataset.i18n];
            if (value !== undefined) el.textContent = value;
        });
        const about = document.querySelector('[data-i18n-html="about.content"]');
        if (about) about.innerHTML = lang === 'es' ? this.about.es : this.about.en;

        this.modalTextNodes.forEach(({ node, original }) => {
            const trimmed = original.trim();
            const translated = lang === 'es' ? this.modalTranslations[trimmed] : undefined;
            if (translated !== undefined) {
                node.nodeValue = original.replace(trimmed, translated);
            } else if (lang === 'en') {
                node.nodeValue = original;
            }
        });

        this.button.classList.toggle('is-spanish', lang === 'es');
        this.button.setAttribute('aria-label', lang === 'es' ? 'Cambiar a inglés' : 'Cambiar a español');
        this.button.title = lang === 'es' ? 'Cambiar a inglés' : 'Cambiar a español';
        if (persist) localStorage.setItem('portfolio-language', lang);
    }
}

class UserPreferences {
    constructor() {
        this.init();
    }

    init() {
        this.detectReducedMotion();
    }

    detectReducedMotion() {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        
        if (prefersReducedMotion.matches) {
            document.body.classList.add('reduce-motion');
        }

        prefersReducedMotion.addEventListener('change', (e) => {
            if (e.matches) {
                document.body.classList.add('reduce-motion');
            } else {
                document.body.classList.remove('reduce-motion');
            }
        });
    }
}

class ProjectImages {
    constructor() {
        this.init();
    }

    init() {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            const img = card.querySelector('.project-image');
            const placeholder = card.querySelector('.project-image-placeholder');
            
            if (img && placeholder) {
                if (img.complete && img.naturalWidth > 0) {
                    placeholder.style.display = 'none';
                } else {
                    img.addEventListener('load', () => {
                        placeholder.style.display = 'none';
                    });
                    
                    img.addEventListener('error', () => {
                        img.style.display = 'none';
                    });
                }
            }
        });
    }
}

class ProfileImageHandler {
    constructor() {
        this.profileImg = document.querySelector('.navbar-hero-profile-img');
        this.init();
    }

    init() {
        if (!this.profileImg) return;

        this.profileImg.addEventListener('error', () => {
            const placeholder = document.querySelector('.navbar-hero-profile-placeholder');
            if (placeholder) {
                placeholder.style.display = 'flex';
                this.profileImg.style.display = 'none';
            }
        });
    }
}

class HeroInlineButton {
    constructor() {
        this.button = document.querySelector('.hero-inline-btn');
        this.init();
    }

    init() {
        if (!this.button) return;

        this.button.addEventListener('click', () => {
            // Scroll al final o abre modal de contacto
            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: 'smooth'
            });
        });
    }
}

class Analytics {
    constructor() {
        this.init();
    }

    init() {
        this.trackPageViews();
        this.trackClicks();
    }

    trackPageViews() {
        console.log('Página vista:', window.location.pathname);
    }

    trackClicks() {
        const importantLinks = document.querySelectorAll('.social-circle-btn, .project-card, .navbar-hero-link');
        
        importantLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const label = e.currentTarget.getAttribute('aria-label') || 
                             e.currentTarget.textContent.trim();
                console.log('Click en:', label);
            });
        });
    }
}

class App {
    constructor() {
        this.init();
    }

    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.start());
        } else {
            this.start();
        }
    }

    start() {
        console.log('🚀 Portfolio inicializado');

        new UserPreferences();
        new HeroNavbar();
        new ScrollReveal();
        new LazyLoader();
        new ProjectImages();
        new ProfileImageHandler();
        new HeroInlineButton();
        this.setupEasterEgg();
    }

    setupEasterEgg() {
        const styles = [
            'font-size: 16px',
            'font-weight: bold',
            'background: linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%)',
            'color: white',
            'padding: 10px 20px',
            'border-radius: 8px'
        ].join(';');

        console.log('%c🎨 Portfolio con diseño premium ', styles);
        console.log('%c¿Te gusta? ¡Hablemos! 💼', 'font-size: 14px; color: #8B5CF6;');
    }
}

new App();
new LanguageSwitcher();

function openErgonominadorModal(event) {
    event.preventDefault();
    const modal = document.getElementById('ergonominadorModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeErgonominadorModal() {
    const modal = document.getElementById('ergonominadorModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function openFocusHubModal(event) {
    event.preventDefault();
    const modal = document.getElementById('focusHubModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeFocusHubModal() {
    const modal = document.getElementById('focusHubModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function openFluxLabModal(event) {
    event.preventDefault();
    const modal = document.getElementById('fluxLabModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeFluxLabModal() {
    const modal = document.getElementById('fluxLabModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

window.onclick = function(event) {
    const ergonominadorModal = document.getElementById('ergonominadorModal');
    const focusHubModal = document.getElementById('focusHubModal');
    const fluxLabModal = document.getElementById('fluxLabModal');

    if (event.target === ergonominadorModal) {
        closeErgonominadorModal();
    }

    if (event.target === focusHubModal) {
        closeFocusHubModal();
    }

    if (event.target === fluxLabModal) {
        closeFluxLabModal();
    }
}

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const ergonominadorModal = document.getElementById('ergonominadorModal');
        const focusHubModal = document.getElementById('focusHubModal');
        const fluxLabModal = document.getElementById('fluxLabModal');

        if (ergonominadorModal.classList.contains('active')) {
            closeErgonominadorModal();
        }

        if (focusHubModal.classList.contains('active')) {
            closeFocusHubModal();
        }

        if (fluxLabModal.classList.contains('active')) {
            closeFluxLabModal();
        }
    }
});

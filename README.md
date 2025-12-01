# 🎨 Portfolio Personal - Diseño Moderno

Portfolio personal minimalista con diseño moderno, efectos de glassmorphism y UI pulida. Este proyecto combina una estructura de navegación fluida con una identidad visual elegante y sofisticada.

## ✨ Características

- **Diseño Responsive**: Optimizado para todos los dispositivos (móvil, tablet, desktop)
- **Smooth Scroll**: Navegación suave entre secciones
- **Efectos Glassmorphism**: UI moderna con efectos de vidrio y blur
- **Animaciones Suaves**: Transiciones elegantes con curvas de easing personalizadas
- **Performance Optimizada**: Carga rápida y renderizado eficiente
- **Accesibilidad**: HTML semántico y navegación por teclado
- **Preferencias de Usuario**: Respeta `prefers-reduced-motion`

## 🚀 Inicio Rápido

### Opción 1: Abrir Directamente (Más Simple)

Simplemente abre el archivo `index.html` en tu navegador. ¡Así de fácil!

### Opción 2: Servidor Local (Recomendado)

Para una experiencia más profesional con recarga automática:

**Con Python:**
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

**Con Node.js:**
```bash
# Si tienes npm instalado
npx serve

# O con http-server
npx http-server -p 8000
```

**Con VS Code:**
- Instala la extensión "Live Server"
- Click derecho en `index.html` > "Open with Live Server"

Luego visita: `http://localhost:8000`

## 📁 Estructura del Proyecto

```
portfolio/
├── index.html          # Estructura HTML principal
├── css/
│   └── style.css      # Estilos completos con sistema de diseño
├── js/
│   └── main.js        # JavaScript para interactividad
├── assets/            # Recursos (imágenes, logos, etc.)
│   ├── profile.jpg    # 📝 Tu foto de perfil
│   ├── project-1.jpg  # 📝 Screenshots de proyectos
│   ├── favicon.svg    # 📝 Tu favicon
│   └── logos/         # 📝 Logos de tecnologías
└── README.md          # Este archivo
```

## 🎨 Personalización

### 1. Información Personal

Busca todos los comentarios `<!-- 📝 REEMPLAZAR: ... -->` en `index.html` y actualiza:

- **Hero Section**: Nombre, título, descripción
- **About Section**: Tu historia, foto de perfil
- **Skills**: Tus tecnologías y herramientas
- **Projects**: Tus proyectos con enlaces y descripciones
- **Contact**: Email, teléfono, ubicación, redes sociales

### 2. Colores y Estilos

Edita las variables CSS en `css/style.css` (líneas 10-80):

```css
:root {
    /* Cambia estos valores para personalizar los colores */
    --color-accent-1: #8b5cf6;  /* Color principal */
    --color-accent-2: #6366f1;  /* Color secundario */
    --color-accent-3: #3b82f6;  /* Color terciario */
    /* ... más variables ... */
}
```

### 3. Fuentes

El portfolio usa:
- **Space Grotesk**: Para títulos y headings
- **Inter**: Para texto general

Para cambiar las fuentes, edita el `<link>` en el `<head>` de `index.html` y actualiza:
```css
--font-primary: 'TuFuentePrincipal', sans-serif;
--font-heading: 'TuFuenteTitulos', sans-serif;
```

### 4. Imágenes y Assets

Coloca tus archivos en la carpeta `assets/`:

```bash
assets/
├── profile.jpg          # Tu foto (recomendado: 800x800px)
├── project-1.jpg        # Screenshots (recomendado: 1920x1200px)
├── project-2.jpg
├── favicon.svg          # Icono del sitio
└── logos/              # Logos de tecnologías (SVG preferido)
    ├── react.svg
    ├── node.svg
    └── ...
```

Luego actualiza las rutas en HTML:
```html
<img src="assets/profile.jpg" alt="Tu Nombre">
```

### 5. Formulario de Contacto

El formulario está configurado pero necesita un backend. Opciones:

**Opción A: EmailJS (Gratis y fácil)**
```javascript
// En js/main.js, método handleSubmit()
emailjs.send('tu_service_id', 'tu_template_id', data)
    .then(() => this.showSuccess())
    .catch(() => this.showError());
```

**Opción B: Formspree**
```html
<form action="https://formspree.io/f/tu_id" method="POST">
```

**Opción C: Tu propio backend**
Edita el método `handleSubmit()` en `js/main.js` línea 227.

## 🎯 Secciones del Portfolio

1. **Hero/Main**: Presentación con botones sociales circulares
2. **Who I Am**: Historia personal con foto
3. **Skills**: Grid de tecnologías con iconos
4. **Proyectos Web**: Cards grandes para demos desplegados
5. **Beyond Web**: Otros trabajos y proyectos creativos
6. **Contacto**: Información de contacto y formulario

## 🔧 Tecnologías Utilizadas

- **HTML5**: Estructura semántica
- **CSS3**: Variables CSS, Grid, Flexbox, Animaciones
- **JavaScript (Vanilla)**: Sin dependencias externas
- **Intersection Observer API**: Para animaciones de scroll
- **Google Fonts**: Inter y Space Grotesk

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px
- **Large Desktop**: > 1280px

## ⚡ Performance Tips

1. **Optimiza imágenes**:
   - Usa WebP para mejor compresión
   - Comprime con TinyPNG o Squoosh
   - Dimensiones máximas: 1920px ancho

2. **Lazy Loading**:
   ```html
   <img src="placeholder.jpg" data-src="imagen-real.jpg" loading="lazy">
   ```

3. **Minifica archivos**:
   - CSS: usa cssnano o clean-css
   - JS: usa terser o uglify-js

## 🚀 Despliegue

### Vercel (Recomendado - Gratis)
```bash
npm i -g vercel
vercel
```

### Netlify (Gratis)
1. Arrastra la carpeta a netlify.com/drop
2. ¡Listo!

### GitHub Pages (Gratis)
1. Crea un repo: `tu-usuario.github.io`
2. Push del código
3. Visita: `https://tu-usuario.github.io`

## 🎨 Sistema de Diseño

### Colores
- **Background**: Tonos oscuros (#0a0a0a - #1a1a1a)
- **Accent**: Gradiente violeta/azul (#8b5cf6 → #3b82f6)
- **Text**: Blanco con opacidades variables

### Espaciado
Sistema de 8px con variables CSS:
- `--space-1`: 8px
- `--space-2`: 16px
- `--space-4`: 32px
- etc.

### Radios de Borde
- Cards: 24-32px
- Project cards: 44px (específico por diseño)
- Botones: 24px
- Inputs: 16px

### Transiciones
- **Fast**: 150ms (hover states)
- **Normal**: 250ms (animaciones generales)
- **Slow**: 350ms (transiciones complejas)

## 🐛 Troubleshooting

**Las fuentes no cargan:**
- Verifica tu conexión a internet
- Revisa la consola del navegador

**Las animaciones no funcionan:**
- Verifica que `js/main.js` esté cargado
- Revisa la consola por errores

**El formulario no envía:**
- Configura un backend (ver sección Formulario de Contacto)

## 📝 Checklist de Personalización

- [ ] Cambiar nombre y título en Hero
- [ ] Actualizar descripción personal
- [ ] Añadir foto de perfil
- [ ] Listar tus skills reales
- [ ] Añadir proyectos con enlaces
- [ ] Configurar enlaces de redes sociales
- [ ] Actualizar información de contacto
- [ ] Configurar formulario de contacto
- [ ] Añadir favicon personalizado
- [ ] Optimizar imágenes
- [ ] Probar en móvil
- [ ] Verificar todos los enlaces
- [ ] Configurar analytics (opcional)
- [ ] Desplegar en producción

## 🤝 Contribuciones

Este es un portfolio personal, pero siéntete libre de:
- Hacer un fork para tu propio uso
- Sugerir mejoras
- Reportar bugs

## 📄 Licencia

Este código es libre de usar para tu portfolio personal. Si lo usas, un crédito sería apreciado pero no es obligatorio.

## 💬 Soporte

Si tienes preguntas o encuentras problemas:
1. Revisa este README completo
2. Verifica la consola del navegador por errores
3. Asegúrate de que todos los archivos estén en su lugar

---

**Hecho con ❤️ y mucho ☕**

¡Éxito con tu portfolio!


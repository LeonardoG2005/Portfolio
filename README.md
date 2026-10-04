# Portfolio Personal - Diseño Moderno

Portfolio personal minimalista con diseño moderno, efectos de glassmorphism y UI pulida. Este proyecto combina una estructura de navegación fluida con una identidad visual elegante y sofisticada.

## Características

- **Diseño Responsive**: Optimizado para todos los dispositivos (móvil, tablet, desktop)
- **Smooth Scroll**: Navegación suave entre secciones
- **Efectos Glassmorphism**: UI moderna con efectos de vidrio y blur
- **Animaciones Suaves**: Transiciones elegantes con curvas de easing personalizadas
- **Performance Optimizada**: Carga rápida y renderizado eficiente
- **Accesibilidad**: HTML semántico y navegación por teclado
- **Preferencias de Usuario**: Respeta `prefers-reduced-motion`

## Inicio Rápido

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

## Estructura del Proyecto

```
portfolio/
├── index.html          # Estructura HTML principal
├── css/
│   └── style.css      # Estilos completos
├── js/
│   └── main.js        # JavaScript para interactividad
├── assets/            # Recursos (imágenes, logos, etc.)
│   ├── profile.jpg    
│   ├── project-1.jpg  
│   ├── favicon.svg    
│   └── logos/         
└── README.md          # Este archivo
```

### 2. Colores y Estilos

Edita las variables CSS en `css/style.css` (líneas 10-80):

```css
:root {
    --color-accent-1: #8b5cf6;  /* Color principal */
    --color-accent-2: #6366f1;  /* Color secundario */
    --color-accent-3: #3b82f6;  /* Color terciario */
}
```

### 3. Fuentes

El portfolio usa:
- **Space Grotesk**: Para títulos y headings
- **Inter**: Para texto general


## Secciones del Portfolio

1. **Hero/Main**: Presentación con botones sociales circulares
2. **Who I Am**: Historia personal con foto
3. **Skills**: Grid de tecnologías con iconos
4. **Proyectos Web**: Cards grandes para demos desplegados
5. **Beyond Web**: Otros trabajos y proyectos creativos
6. **Contacto**: Información de contacto y formulario

## Tecnologías Utilizadas

- **HTML5**: Estructura semántica
- **CSS3**: Variables CSS, Grid, Flexbox, Animaciones
- **JavaScript (Vanilla)**: Sin dependencias externas
- **Intersection Observer API**: Para animaciones de scroll
- **Google Fonts**: Inter y Space Grotesk

## Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px
- **Large Desktop**: > 1280px

## Performance Tips

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

## Despliegue

### Vercel
```bash
npm i -g vercel
vercel
```

## Sistema de Diseño

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


**Hecho con ❤️ y mucho ☕**



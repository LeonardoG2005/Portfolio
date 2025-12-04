# Deployment Guide - Portfolio

## Project Overview
This is a **static HTML/CSS/JavaScript portfolio** with no build process required.

## Tech Stack
- Pure HTML5, CSS3, JavaScript (ES6+)
- Canvas API for animated gradients
- No frameworks or dependencies
- No server-side rendering
- No environment variables

## Deployment Requirements

### Platform: Vercel (Recommended)
- **Type:** Static Site
- **Build Command:** None required (or use `echo 'Static site - no build needed'`)
- **Output Directory:** `.` (root directory)
- **Install Command:** None required

### Files Structure
```
/
├── index.html          (entry point)
├── css/
│   └── style.css       (all styles)
├── js/
│   └── main.js         (canvas animation, modal handlers)
├── assets/
│   ├── senku.jpg       (profile image)
│   ├── proyectoErgonominador.png
│   └── senku.ico       (favicon)
├── vercel.json         (deployment config)
└── .vercelignore       (files to exclude)
```

## Deployment Steps

### Option 1: Vercel CLI
```bash
# Install Vercel CLI (if not installed)
npm install -g vercel

# Deploy
vercel --prod
```

### Option 2: Vercel Dashboard
1. Go to https://vercel.com/new
2. Import your Git repository
3. Framework Preset: **Other** (or leave blank)
4. Build Command: Leave empty or use `echo 'No build needed'`
5. Output Directory: `.` (root)
6. Deploy

### Option 3: GitHub Integration
1. Push this branch to GitHub
2. Connect repository to Vercel
3. Vercel will auto-deploy on push

## Configuration Files

### vercel.json
- Configures static file serving
- Sets security headers (X-Frame-Options, CSP, etc.)
- Enables long-term caching for assets (31536000s = 1 year)
- Routes all requests through static handler

### .vercelignore
Excludes documentation and development files from deployment:
- README files
- Configuration examples
- Documentation guides
- Lock files

## Environment Variables
**None required.** This portfolio has:
- No API integrations
- No backend services
- No secrets or tokens
- All assets are public

## Performance Optimizations
- **Caching:** Assets cached for 1 year via Cache-Control headers
- **Security:** Security headers configured in vercel.json
- **Size:** Minimal dependencies (vanilla JS only)
- **Canvas:** Hardware-accelerated gradient animation

## Custom Domain (Optional)
After deployment:
1. Go to Project Settings → Domains
2. Add your custom domain
3. Configure DNS:
   - Type: `A` Record → `76.76.21.21`
   - Type: `CNAME` → `cname.vercel-dns.com`

## Monitoring
- Vercel automatically provides:
  - Analytics dashboard
  - Performance metrics
  - Deployment logs
  - Error tracking

## Troubleshooting

### Issue: 404 on page refresh
**Solution:** Already handled in vercel.json routes configuration.

### Issue: Images not loading
**Solution:** Verify all image paths are relative (e.g., `./assets/image.jpg`).

### Issue: Canvas not animating
**Solution:** Check browser console for JavaScript errors. Canvas requires modern browser support.

## Rollback
```bash
# List deployments
vercel ls

# Rollback to specific deployment
vercel rollback [deployment-url]
```

## Branch Strategy
- **main:** Development branch with all source code
- **vercel-deploy:** Production-ready branch (current)
  - Removed demo content
  - Removed "Beyond Web" section
  - Only Ergonominador project card
  - Ready for deployment

## Support
- Vercel Docs: https://vercel.com/docs
- Project Type: Static Site
- Framework: None (Vanilla JS)

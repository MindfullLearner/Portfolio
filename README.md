# Nayab Maryam — Portfolio Website

A fully animated, dark & moody personal portfolio website.

---

## 📁 Project Structure

```
portfolio/
├── index.html              ← Main HTML file (all sections)
├── css/
│   ├── style.css           ← All layout & component styles
│   └── animations.css      ← Keyframes, scroll-reveal, transitions
├── js/
│   └── main.js             ← Typed text, particles, scroll reveal, form
├── assets/                 ← (optional) Images, icons, resume PDF
│   └── resume.pdf          ← Add your CV here
└── README.md               ← This file
```

---

## 🚀 How to Run

Just open `index.html` in any modern browser — no build tools needed.

For live reload during editing, use VS Code's **Live Server** extension:
1. Install "Live Server" in VS Code
2. Right-click `index.html` → "Open with Live Server"

---

## 🎨 Customizing

### Colors (in `css/style.css` `:root`)
| Variable | Value | Purpose |
|----------|-------|---------|
| `--accent` | `#6C63FF` | Primary purple |
| `--accent-cyan` | `#00d4ff` | Cyan highlights |
| `--accent-purple` | `#a78bfa` | Soft purple |
| `--bg-primary` | `#050816` | Main background |

### To update your info:
- **Name, bio, links** → `index.html`
- **Skill percentages** → `index.html` (data-width attributes)
- **Project details** → `index.html` (`.project-card` sections)
- **Social links** → Search for `href="#"` in hero & contact sections

### To add your photo:
Replace the SVG `hijabi-avatar` block in `index.html` with:
```html
<img src="assets/girl.jpg" alt="Nayab Maryam" class="hijabi-avatar" />
```

---

## 📦 Dependencies (CDN — no install needed)
- Google Fonts: Space Grotesk + Fira Code
- Font Awesome 6.5 (icons)

---

## 📱 Responsive
- ✅ Desktop (1200px+)
- ✅ Tablet (768–1024px)
- ✅ Mobile (< 768px)
- ✅ Respects `prefers-reduced-motion`

/* ============================================
   ANAM MARYAM PORTFOLIO — MAIN JS
   ============================================ */

// ===== TYPED TEXT =====
const roles = [
  "Web Developer",
  "QA Engineer",
  "Software Engineer",
  "Problem Solver",
  "Tech Enthusiast"
];
let roleIndex = 0, charIndex = 0, isDeleting = false;
const typedEl = document.getElementById("typedText");

function type() {
  const current = roles[roleIndex];
  if (!isDeleting) {
    typedEl.textContent = current.slice(0, ++charIndex);
    if (charIndex === current.length) {
      isDeleting = true;
      setTimeout(type, 1800);
      return;
    }
  } else {
    typedEl.textContent = current.slice(0, --charIndex);
    if (charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }
  setTimeout(type, isDeleting ? 60 : 90);
}
setTimeout(type, 1400);

// ===== NAVBAR SCROLL =====
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 30);
});

// ===== HAMBURGER =====
const hamburger = document.getElementById("hamburger");
const navLinks  = document.getElementById("navLinks");
hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("open");
  const spans = hamburger.querySelectorAll("span");
  const open = navLinks.classList.contains("open");
  spans[0].style.transform = open ? "rotate(45deg) translate(5px, 5px)" : "";
  spans[1].style.opacity   = open ? "0" : "1";
  spans[2].style.transform = open ? "rotate(-45deg) translate(5px, -5px)" : "";
});
document.querySelectorAll(".nav-links a").forEach(a => {
  a.addEventListener("click", () => {
    navLinks.classList.remove("open");
    const spans = hamburger.querySelectorAll("span");
    spans[0].style.transform = spans[2].style.transform = "";
    spans[1].style.opacity = "1";
  });
});

// ===== ACTIVE NAV LINK =====
const sections = document.querySelectorAll("section[id]");
const navItems  = document.querySelectorAll(".nav-links a");
window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.id;
  });
  navItems.forEach(a => {
    a.style.color = a.getAttribute("href") === `#${current}` ? "var(--accent)" : "";
  });
});

// ===== SCROLL REVEAL =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add("visible");
      // Trigger skill bars
      e.target.querySelectorAll(".skill-fill").forEach(bar => {
        bar.style.width = bar.dataset.width + "%";
      });
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll(
  ".reveal, .reveal-left, .reveal-right, .stagger-children, .glass, .timeline-item"
).forEach(el => observer.observe(el));

// Also observe skill groups specifically
document.querySelectorAll(".skill-group").forEach(el => observer.observe(el));

// Manually trigger skill bars if already in view
document.querySelectorAll(".skill-fill").forEach(bar => {
  const rect = bar.closest(".skill-group")?.getBoundingClientRect();
  if (rect && rect.top < window.innerHeight) {
    bar.style.width = bar.dataset.width + "%";
  }
});

// ===== ADD REVEAL CLASSES DYNAMICALLY =====
document.querySelectorAll(".about-card").forEach((el, i) => {
  el.classList.add("reveal");
  el.style.transitionDelay = `${i * 0.12}s`;
});
document.querySelectorAll(".project-card").forEach((el, i) => {
  el.classList.add("reveal");
  el.style.transitionDelay = `${i * 0.1}s`;
});
document.querySelector(".about-bio")?.classList.add("reveal");
document.querySelectorAll(".skill-group").forEach(el => el.classList.add("reveal"));
document.querySelectorAll(".timeline-item.left").forEach(el => el.classList.add("reveal-left"));
document.querySelectorAll(".timeline-item.right").forEach(el => el.classList.add("reveal-right"));
document.querySelector(".contact-info")?.classList.add("reveal-left");
document.querySelector(".contact-form")?.classList.add("reveal-right");

// Re-observe after adding classes
document.querySelectorAll(
  ".reveal, .reveal-left, .reveal-right"
).forEach(el => observer.observe(el));

// ===== PARTICLE CANVAS (HERO) =====
function initParticles() {
  const canvas = document.createElement("canvas");
  canvas.id = "particles";
  canvas.style.cssText = "position:absolute;inset:0;pointer-events:none;z-index:1;opacity:0.4";
  document.querySelector(".hero").prepend(canvas);

  const ctx = canvas.getContext("2d");
  let W, H, particles = [];

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  const colors = ["#6C63FF", "#00d4ff", "#a78bfa"];
  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x  = Math.random() * W;
      this.y  = Math.random() * H;
      this.r  = Math.random() * 2 + 0.5;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
      this.alpha = Math.random() * 0.6 + 0.2;
      this.color = colors[Math.floor(Math.random() * colors.length)];
    }
    update() {
      this.x += this.vx; this.y += this.vy;
      if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.globalAlpha = this.alpha;
      ctx.fill();
      ctx.globalAlpha = 1;
    }
  }

  for (let i = 0; i < 80; i++) particles.push(new Particle());

  function animate() {
    ctx.clearRect(0, 0, W, H);
    // Draw connecting lines
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = "#6C63FF";
          ctx.globalAlpha = (1 - dist/120) * 0.15;
          ctx.lineWidth = 0.8;
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
      }
    }
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
  }
  animate();
}

// Only init particles if not reduced motion
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  initParticles();
}

// ===== CONTACT FORM =====
document.getElementById("contactForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const btn = e.target.querySelector("button[type=submit]");
  btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
  btn.style.background = "var(--accent-cyan)";
  btn.style.color = "#050816";
  setTimeout(() => {
    btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
    btn.style.background = ""; btn.style.color = "";
    e.target.reset();
  }, 3000);
});

// ===== SMOOTH CURSOR GLOW ON HERO =====
const hero = document.querySelector(".hero");
hero.addEventListener("mousemove", (e) => {
  const rect = hero.getBoundingClientRect();
  const x = ((e.clientX - rect.left) / rect.width  * 100).toFixed(1);
  const y = ((e.clientY - rect.top)  / rect.height * 100).toFixed(1);
  hero.style.setProperty("--mx", x + "%");
  hero.style.setProperty("--my", y + "%");
});

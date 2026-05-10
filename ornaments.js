/* ================================================================
   ORNAMENTS.JS — ANIMASI & EFEK INTERAKTIF TAMBAHAN
   Earth Tone Masculine E-Portofolio
   File ini TERPISAH dari script.js — jangan edit script.js
   ================================================================

   ╔══════════════════════════════════════════════════════════════╗
   ║  CARA PAKAI — LANGKAH PERTAMA                               ║
   ║  Tambahkan 1 baris ini di index.html,                       ║
   ║  letakkan SETELAH baris <script src="script.js"></script>   ║
   ║  dan SEBELUM tag penutup </body> :                          ║
   ║                                                             ║
   ║  <script src="ornaments.js"></script>                       ║
   ╚══════════════════════════════════════════════════════════════╝

   ================================================================
   DAFTAR EFEK DALAM FILE INI:
   1.  Particle Field     — partikel debu emas melayang di #profil
   2.  Parallax Kompas    — kompas merespons posisi mouse
   3.  Mouse Glow         — aura emas mengikuti kursor
   4.  Misi Bg Icons      — ikon melayang di background #misi
   5.  Section Enter FX   — reset animasi ornamen saat ganti section
   6.  Ruler Tick         — penggaris sidebar muncul bertahap
   7.  Hover Tilt Card    — card sedikit miring saat hover
   8.  Cursor Trail       — jejak titik emas mengikuti kursor
   ================================================================ */

"use strict";

/* ================================================================
   INISIALISASI — Tunggu DOM siap
   ================================================================ */
document.addEventListener("DOMContentLoaded", () => {
  initParticleField();
  initCompassParallax();
  initMouseGlow();
  initMisiBgIcons();
  initSectionEnterFX();
  initHoverTiltCard();
  initCursorTrail();
  console.log(
    "%c Ornaments.js ✓",
    "color:#C49A3C;font-style:italic;font-size:12px;",
  );
});

/* ================================================================
   [EFEK 1] — PARTICLE FIELD
   Membuat partikel debu emas melayang di section #profil
   Partikel diisi ke dalam .particle-field yang ada di HTML

   ╔══════════════════════════════════════════════════════════════╗
   ║ SYARAT: Elemen <div class="particle-field"></div> harus     ║
   ║ sudah ada di dalam <section id="profil">                    ║
   ║ (lihat instruksi di ornaments.css [ORNAMEN 12])             ║
   ╚══════════════════════════════════════════════════════════════╝
   ================================================================ */
function initParticleField() {
  const field = document.querySelector("#profil .particle-field");
  if (!field) return;

  // Kosongkan dulu agar tidak duplikat saat re-init
  field.innerHTML = "";

  const COUNT = 20;

  for (let i = 0; i < COUNT; i++) {
    const p = document.createElement("div");
    p.className = "particle";

    // Ukuran acak 2–5px
    const size = (Math.random() * 3 + 2).toFixed(1);

    // Posisi acak dalam area field
    const left = (Math.random() * 88 + 4).toFixed(1);
    const top = (Math.random() * 60 + 25).toFixed(1);

    // Durasi & delay acak agar bergerak tidak serentak
    const dur = (Math.random() * 5 + 5).toFixed(1);
    const delay = (Math.random() * 7).toFixed(1);

    // Drift horizontal acak (kiri atau kanan)
    const drift = ((Math.random() - 0.5) * 48).toFixed(0);

    p.style.cssText = `
      width:  ${size}px;
      height: ${size}px;
      left:   ${left}%;
      top:    ${top}%;
      --dur:   ${dur}s;
      --delay: ${delay}s;
      --drift: ${drift}px;
    `;

    field.appendChild(p);
  }
}

/* ================================================================
   [EFEK 2] — PARALLAX KOMPAS
   Kompas bergerak mengikuti posisi mouse secara halus

   ╔══════════════════════════════════════════════════════════════╗
   ║ SYARAT: Elemen .compass-ornament harus sudah ada            ║
   ║ di dalam <section id="profil">                              ║
   ║ (lihat instruksi di ornaments.css [ORNAMEN 10])             ║
   ╚══════════════════════════════════════════════════════════════╝
   ================================================================ */
function initCompassParallax() {
  const compass = document.querySelector(".compass-ornament");
  if (!compass) return;

  // Simpan posisi awal
  let currentX = 0;
  let currentY = 0;
  let targetX = 0;
  let targetY = 0;
  let rafId = null;

  // Hanya aktif saat #profil yang terbuka
  document.addEventListener("mousemove", (e) => {
    const profilSection = document.getElementById("profil");
    if (!profilSection || !profilSection.classList.contains("active")) return;

    // Hitung offset dari tengah layar (nilai -1 s/d 1)
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    targetX = ((e.clientX - cx) / cx) * 10; // max 10px drift
    targetY = ((e.clientY - cy) / cy) * 10;
  });

  // Lerp (linear interpolation) agar gerak lebih halus
  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  function animateCompass() {
    currentX = lerp(currentX, targetX, 0.06);
    currentY = lerp(currentY, targetY, 0.06);

    // Gabungkan dengan rotasi CSS yang sudah berjalan
    // Gunakan translate saja, rotasi tetap dari CSS animation
    compass.style.translate = `${currentX}px ${currentY}px`;

    rafId = requestAnimationFrame(animateCompass);
  }

  animateCompass();

  // Hentikan saat tab tidak aktif (hemat resource)
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      cancelAnimationFrame(rafId);
    } else {
      animateCompass();
    }
  });
}

/* ================================================================
   [EFEK 3] — MOUSE GLOW
   Aura cahaya emas mengikuti kursor di area main-content

   ╔══════════════════════════════════════════════════════════════╗
   ║ TIDAK PERLU EDIT HTML — Elemen dibuat otomatis oleh JS ini  ║
   ╚══════════════════════════════════════════════════════════════╝
   ================================================================ */
function initMouseGlow() {
  const main = document.querySelector(".main-content");
  if (!main) return;

  const glow = document.createElement("div");
  glow.id = "mouse-glow-orb";

  /* Pakai style yang lebih kuat dan visible untuk test */
  glow.style.cssText = `
    position: fixed;
    width: 380px;
    height: 380px;
    border-radius: 50%;
    background: radial-gradient(circle,
      rgba(196,154,60,0.22) 0%,
      rgba(196,154,60,0.10) 35%,
      transparent 70%);
    pointer-events: none;
    z-index: 999;
    top: 0;
    left: 0;
    opacity: 0;
    transition: opacity 0.4s ease;
    will-change: transform;
  `;

  document.body.appendChild(glow);

  let mouseX = 0,
    mouseY = 0;
  let glowX = 0,
    glowY = 0;
  let isOver = false;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    /* Cek apakah kursor di atas main-content */
    const rect = main.getBoundingClientRect();
    if (
      e.clientX >= rect.left &&
      e.clientX <= rect.right &&
      e.clientY >= rect.top &&
      e.clientY <= rect.bottom
    ) {
      if (!isOver) {
        glow.style.opacity = "1";
        isOver = true;
      }
    } else {
      if (isOver) {
        glow.style.opacity = "0";
        isOver = false;
      }
    }
  });

  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  function animateGlow() {
    glowX = lerp(glowX, mouseX, 0.1);
    glowY = lerp(glowY, mouseY, 0.1);
    glow.style.transform = `translate(${glowX - 190}px, ${glowY - 190}px)`;
    requestAnimationFrame(animateGlow);
  }

  animateGlow();
}

/* ================================================================
   [EFEK 4] — MISI BG ICONS
   Membuat ikon-ikon melayang di background section #misi

   ╔══════════════════════════════════════════════════════════════╗
   ║ TIDAK PERLU EDIT HTML — Elemen .misi-bg-icons dan ikon-     ║
   ║ ikonnya dibuat otomatis oleh JS ini di dalam #misi          ║
   ╚══════════════════════════════════════════════════════════════╝
   ================================================================ */
function initMisiBgIcons() {
  const misiSection = document.getElementById("misi");
  if (!misiSection) return;

  // Hindari duplikat jika dipanggil ulang
  if (misiSection.querySelector(".misi-bg-icons")) return;

  const container = document.createElement("div");
  container.className = "misi-bg-icons";
  container.setAttribute("aria-hidden", "true");

  // Daftar ikon beserta properti animasinya
  const icons = [
    { cls: "fa-compass", x: "8%", y: "12%", s: "3rem", d: "0s", dur: "7s" },
    {
      cls: "fa-shield-alt",
      x: "88%",
      y: "8%",
      s: "2.2rem",
      d: "1.5s",
      dur: "9s",
    },
    { cls: "fa-mountain", x: "5%", y: "72%", s: "2.6rem", d: "3s", dur: "8s" },
    { cls: "fa-anchor", x: "92%", y: "78%", s: "2rem", d: "0.5s", dur: "6s" },
    {
      cls: "fa-map-marked-alt",
      x: "50%",
      y: "4%",
      s: "1.9rem",
      d: "2s",
      dur: "10s",
    },
    {
      cls: "fa-drafting-compass",
      x: "78%",
      y: "50%",
      s: "1.7rem",
      d: "4s",
      dur: "11s",
    },
    { cls: "fa-leaf", x: "22%", y: "88%", s: "1.6rem", d: "1s", dur: "7.5s" },
  ];

  icons.forEach((cfg) => {
    const el = document.createElement("i");
    el.className = `fas ${cfg.cls}`;
    el.style.cssText = `
      position:  absolute;
      left:      ${cfg.x};
      top:       ${cfg.y};
      font-size: ${cfg.s};
      color:     rgba(92,61,30,0.055);
      animation: float-y ${cfg.dur} ease-in-out ${cfg.d} infinite;
      pointer-events: none;
    `;
    container.appendChild(el);
  });

  // Tambahkan CSS float-y inline jika belum ada dari ornaments.css
  // (sebagai fallback)
  if (!document.querySelector("#ornaKeyframes")) {
    const style = document.createElement("style");
    style.id = "ornaKeyframes";
    style.textContent = `
      @keyframes float-y {
        0%, 100% { transform: translateY(0px);   }
        50%       { transform: translateY(-10px); }
      }
    `;
    document.head.appendChild(style);
  }

  // Sisipkan sebagai child pertama section misi
  misiSection.insertBefore(container, misiSection.firstChild);
}

/* ================================================================
   [EFEK 5] — SECTION ENTER FX
   Saat user berpindah section, ornamen direset agar
   animasinya terasa segar kembali

   ╔══════════════════════════════════════════════════════════════╗
   ║ TIDAK PERLU EDIT HTML — Bekerja otomatis via nav-item click  ║
   ╚══════════════════════════════════════════════════════════════╝
   ================================================================ */
function initSectionEnterFX() {
  const navItems = document.querySelectorAll(".nav-item");

  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      const id = item.getAttribute("data-section");

      // Profil: restart partikel
      if (id === "profil") {
        setTimeout(() => {
          initParticleField();
        }, 200);
      }

      // Misi: fade-in ikon bertahap
      if (id === "misi") {
        setTimeout(() => {
          const icons = document.querySelectorAll(".misi-bg-icons i");
          icons.forEach((icon, idx) => {
            icon.style.opacity = "0";
            icon.style.transition = `opacity 0.6s ease ${idx * 0.12}s`;
            // Trigger reflow
            void icon.offsetWidth;
            icon.style.opacity = "1";
          });
        }, 150);
      }
    });
  });
}

/* ================================================================
   [EFEK 6] — HOVER TILT CARD
   Card sedikit miring mengikuti posisi mouse saat hover
   Efek 3D perspective ringan

   ╔══════════════════════════════════════════════════════════════╗
   ║ TIDAK PERLU EDIT HTML — Bekerja otomatis pada semua card    ║
   ╚══════════════════════════════════════════════════════════════╝
   ================================================================ */
function initHoverTiltCard() {
  const cards = document.querySelectorAll(
    ".profil-card, .pend-card, .analisis-card, .misi-card, .teach-item, .komp-item",
  );

  const MAX_TILT = 4; // derajat maksimal tilt

  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      const rotX = -dy * MAX_TILT;
      const rotY = dx * MAX_TILT;

      card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-2px)`;
      card.style.transition = "transform 0.1s ease, box-shadow 0.3s ease";
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform =
        "perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0)";
      card.style.transition = "transform 0.5s ease, box-shadow 0.3s ease";
    });
  });
}

/* ================================================================
   [EFEK 7] — CURSOR TRAIL
   Jejak titik-titik kecil emas mengikuti gerakan kursor
   di area main-content

   ╔══════════════════════════════════════════════════════════════╗
   ║ TIDAK PERLU EDIT HTML — Elemen trail dibuat otomatis        ║
   ╚══════════════════════════════════════════════════════════════╝
   ================================================================ */
function initCursorTrail() {
  const main = document.querySelector(".main-content");
  if (!main) return;

  const TRAIL_COUNT = 8;
  const dots = [];

  // Buat dot-dot trail
  for (let i = 0; i < TRAIL_COUNT; i++) {
    const dot = document.createElement("div");

    // Makin jauh dari kursor makin kecil & transparan
    const scale = 1 - (i / TRAIL_COUNT) * 0.75;
    const opacity = 1 - (i / TRAIL_COUNT) * 0.85;
    const size = Math.max(2, Math.round(6 * scale));

    Object.assign(dot.style, {
      position: "fixed",
      width: size + "px",
      height: size + "px",
      borderRadius: "50%",
      background: `rgba(196,154,60,${opacity * 0.55})`,
      pointerEvents: "none",
      zIndex: "9998",
      display: "none",
      transform: "translate(-50%,-50%)",
      transition: "none",
      willChange: "transform",
    });

    document.body.appendChild(dot);
    dots.push({ el: dot, x: 0, y: 0 });
  }

  let mouseX = 0;
  let mouseY = 0;
  let visible = false;

  main.addEventListener("mouseenter", () => {
    visible = true;
    dots.forEach((d) => {
      d.el.style.display = "block";
    });
  });

  main.addEventListener("mouseleave", () => {
    visible = false;
    dots.forEach((d) => {
      d.el.style.display = "none";
    });
  });

  main.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  function animateTrail() {
    if (visible) {
      // Dot pertama mengikuti mouse langsung
      dots[0].x = lerp(dots[0].x, mouseX, 0.35);
      dots[0].y = lerp(dots[0].y, mouseY, 0.35);

      // Setiap dot berikut mengikuti dot sebelumnya
      for (let i = 1; i < TRAIL_COUNT; i++) {
        const speed = 0.3 - i * 0.025;
        dots[i].x = lerp(dots[i].x, dots[i - 1].x, Math.max(0.05, speed));
        dots[i].y = lerp(dots[i].y, dots[i - 1].y, Math.max(0.05, speed));
      }

      dots.forEach((d) => {
        d.el.style.transform = `translate(${d.x - parseInt(d.el.style.width) / 2}px, ${d.y - parseInt(d.el.style.height) / 2}px)`;
      });
    }

    requestAnimationFrame(animateTrail);
  }

  animateTrail();
}

/* ================================================================
   WINDOW LOAD — Jalankan efek tambahan setelah semua aset siap
   ================================================================ */
window.addEventListener("load", () => {
  // Pastikan section aktif pertama juga mendapat ornamen
  const activeSection = document.querySelector(".section.active");
  if (activeSection) {
    if (activeSection.id === "profil") {
      setTimeout(initParticleField, 300);
    }
    if (activeSection.id === "misi") {
      // Tampilkan misi icons jika langsung dibuka lewat hash
      setTimeout(() => {
        const icons = document.querySelectorAll(".misi-bg-icons i");
        icons.forEach((icon, idx) => {
          icon.style.opacity = "0";
          icon.style.transition = `opacity 0.6s ease ${idx * 0.12}s`;
          void icon.offsetWidth;
          icon.style.opacity = "1";
        });
      }, 400);
    }
  }

  console.log(
    "%c Ornaments.js — All effects initialized ✓",
    "color:#A0522D;font-size:11px;",
  );
});

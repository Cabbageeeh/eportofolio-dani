/* ornaments-fix.js — Fix titik berdenyut nav aktif */
"use strict";

document.addEventListener("DOMContentLoaded", () => {
  // Sisipkan .nav-dot ke setiap .nav-item
  document.querySelectorAll(".nav-item").forEach((item) => {
    if (!item.querySelector(".nav-dot")) {
      const dot = document.createElement("span");
      dot.className = "nav-dot";
      item.appendChild(dot);
    }
  });
});

("use strict");
document.addEventListener("DOMContentLoaded", () => {
  /* ── NAV DOT (sudah ada) ── */
  document.querySelectorAll(".nav-item").forEach((item) => {
    if (!item.querySelector(".nav-dot")) {
      const dot = document.createElement("span");
      dot.className = "nav-dot";
      item.appendChild(dot);
    }
  });

  /* ── CUSTOM CURSOR ── */
  initCustomCursor();
  initLandingPage();
  initLoadingScreen(false);
  initSmoothTransition();
  initScrollProgress();
  initCardFlip();
  initSoundEffect();
  initDarkMode();
  initTypewriter();
  initStatsCounter();
  initEducationAnim();
  initProfilModal();
  initMarqueeText();
  initSiklusTab();

  console.log("%c ornaments-fix.js ✓", "color:#C49A3C;");
});

function initSiklusTab() {
  const tabs = document.querySelectorAll(".siklus-tab");
  const contents = document.querySelectorAll(".siklus-content");
  if (!tabs.length) return;

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const target = tab.getAttribute("data-siklus");

      /* Update tab aktif */
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");

      /* Update konten aktif */
      contents.forEach((c) => c.classList.remove("active"));
      const targetContent = document.querySelector(
        `.siklus-content[data-siklus="${target}"]`,
      );
      if (targetContent) targetContent.classList.add("active");

      /* Sound effect */
      if (window.playNavHover) playNavHover?.();

      /* Scroll ke atas konten */
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });

  console.log("%c Siklus Tab ✓", "color:#C49A3C;font-style:italic;");
}

function initLandingPage() {
  /* ── Inject CSS ── */
  if (!document.querySelector("#landingPageStyles")) {
    const style = document.createElement("style");
    style.id = "landingPageStyles";
    style.textContent = `

      /* ================================================================
         LANDING PAGE — Full screen cover
         ================================================================ */

      #landing-page {
        position: fixed;
        inset: 0;
        z-index: 9999999;
        background: linear-gradient(
          135deg,
          #0d0804 0%,
          #1e1208 30%,
          #2a1a08 60%,
          #1a0f06 100%
        );
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        overflow: hidden;
      }

      /* ── Grain texture ── */
      #landing-page::before {
        content: '';
        position: absolute;
        inset: 0;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
        pointer-events: none;
        z-index: 0;
      }

      /* ── Ornamen kompas besar di belakang ── */
      #landing-compass-bg {
        position: absolute;
        width: 700px;
        height: 700px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: rgba(196,154,60,0.04);
        pointer-events: none;
        z-index: 0;
        animation: rotate-slow 60s linear infinite;
      }

      /* ── Ornamen sudut ── */
      .landing-corner {
        position: absolute;
        width: 80px;
        height: 80px;
        pointer-events: none;
        z-index: 1;
      }

      .landing-corner.tl {
        top: 24px; left: 24px;
        border-top: 1px solid rgba(196,154,60,0.3);
        border-left: 1px solid rgba(196,154,60,0.3);
      }

      .landing-corner.tr {
        top: 24px; right: 24px;
        border-top: 1px solid rgba(196,154,60,0.3);
        border-right: 1px solid rgba(196,154,60,0.3);
      }

      .landing-corner.bl {
        bottom: 24px; left: 24px;
        border-bottom: 1px solid rgba(196,154,60,0.3);
        border-left: 1px solid rgba(196,154,60,0.3);
      }

      .landing-corner.br {
        bottom: 24px; right: 24px;
        border-bottom: 1px solid rgba(196,154,60,0.3);
        border-right: 1px solid rgba(196,154,60,0.3);
      }

      /* ── Konten utama ── */
      #landing-content {
        position: relative;
        z-index: 2;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        gap: 0;
        padding: 0 24px;
      }

      /* Label atas */
      #landing-label {
        font-family: 'DM Mono', monospace;
        font-size: 0.62rem;
        letter-spacing: 0.28em;
        text-transform: uppercase;
        color: rgba(196,154,60,0.6);
        margin-bottom: 20px;
        opacity: 0;
        transform: translateY(10px);
        transition: opacity 0.7s ease, transform 0.7s ease;
        display: flex;
        align-items: center;
        gap: 14px;
      }

      #landing-label::before,
      #landing-label::after {
        content: '';
        width: 32px;
        height: 1px;
        background: linear-gradient(90deg, transparent, rgba(196,154,60,0.5));
      }

      #landing-label::after {
        background: linear-gradient(90deg, rgba(196,154,60,0.5), transparent);
      }

      /* Nama besar */
      #landing-name {
        font-family: 'Playfair Display', serif;
        font-size: clamp(2.5rem, 7vw, 5rem);
        font-weight: 900;
        color: #EDD9B4;
        line-height: 1.05;
        letter-spacing: -0.02em;
        margin-bottom: 8px;
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s;
      }

      /* Garis bawah nama */
      #landing-name-line {
        width: 0px;
        height: 2px;
        background: linear-gradient(90deg, #C49A3C, #A0522D);
        margin: 0 auto 20px;
        border-radius: 1px;
        transition: width 0.8s cubic-bezier(0.4,0,0.2,1) 0.6s;
        box-shadow: 0 0 10px rgba(196,154,60,0.4);
      }

      /* Prodi / program */
      #landing-program {
        font-family: 'Crimson Pro', serif;
        font-size: clamp(0.9rem, 2.5vw, 1.15rem);
        color: rgba(196,149,106,0.7);
        font-style: italic;
        margin-bottom: 48px;
        opacity: 0;
        transform: translateY(12px);
        transition: opacity 0.7s ease 0.5s, transform 0.7s ease 0.5s;
        letter-spacing: 0.02em;
      }

      /* Tombol masuk */
      #landing-btn {
        position: relative;
        padding: 14px 44px;
        background: transparent;
        border: 1px solid rgba(196,154,60,0.5);
        border-radius: 3px;
        color: #EDD9B4;
        font-family: 'DM Mono', monospace;
        font-size: 0.7rem;
        letter-spacing: 0.2em;
        text-transform: uppercase;
        cursor: pointer;
        opacity: 0;
        transform: translateY(14px);
        transition:
          opacity 0.7s ease 0.8s,
          transform 0.7s ease 0.8s,
          background 0.3s ease,
          border-color 0.3s ease,
          box-shadow 0.3s ease;
        overflow: hidden;
      }

      #landing-btn::before {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(
          135deg,
          rgba(196,154,60,0),
          rgba(196,154,60,0.08)
        );
        opacity: 0;
        transition: opacity 0.3s ease;
      }

      #landing-btn:hover::before { opacity: 1; }

      #landing-btn:hover {
        border-color: rgba(196,154,60,0.9);
        box-shadow:
          0 0 20px rgba(196,154,60,0.2),
          inset 0 0 20px rgba(196,154,60,0.05);
        color: #C49A3C;
      }

      #landing-btn:active {
        transform: scale(0.97) translateY(14px) !important;
      }

      /* Ikon panah di dalam tombol */
      #landing-btn i {
        margin-left: 10px;
        font-size: 0.65rem;
        transition: transform 0.3s ease;
      }

      #landing-btn:hover i {
        transform: translateX(4px);
      }

      /* ── Scan line di tombol ── */
      #landing-btn::after {
        content: '';
        position: absolute;
        top: 0;
        left: -80%;
        width: 55%;
        height: 100%;
        background: linear-gradient(
          90deg,
          transparent,
          rgba(255,255,255,0.06),
          transparent
        );
        animation: scan-line 3.5s ease-in-out infinite;
      }

      /* ── NIM / info kecil bawah ── */
      #landing-nim {
        margin-top: 24px;
        font-family: 'DM Mono', monospace;
        font-size: 0.58rem;
        letter-spacing: 0.18em;
        color: rgba(196,149,106,0.35);
        opacity: 0;
        transition: opacity 0.7s ease 1.1s;
      }

      /* ── Marquee bawah landing ── */
      #landing-marquee {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        overflow: hidden;
        padding: 10px 0;
        border-top: 1px solid rgba(196,149,106,0.08);
        z-index: 2;
      }

      #landing-marquee-track {
        display: flex;
        gap: 40px;
        white-space: nowrap;
        animation: marquee-scroll 16s linear infinite;
        width: max-content;
      }

      #landing-marquee-track span {
        font-family: 'DM Mono', monospace;
        font-size: 0.55rem;
        letter-spacing: 0.2em;
        text-transform: uppercase;
        color: rgba(196,149,106,0.2);
        flex-shrink: 0;
      }

      /* ── Foto profil kecil di landing (opsional) ── */
      #landing-avatar {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        border: 1px solid rgba(196,154,60,0.3);
        object-fit: cover;
        object-position: center top;
        margin-bottom: 20px;
        opacity: 0;
        transform: scale(0.8);
        transition: opacity 0.7s ease 0.1s, transform 0.7s cubic-bezier(0.34,1.2,0.64,1) 0.1s;
        box-shadow:
          0 0 0 4px rgba(196,154,60,0.08),
          0 0 20px rgba(196,154,60,0.15);
      }

      /* ── Visible states ── */
      #landing-page.ready #landing-label,
      #landing-page.ready #landing-name,
      #landing-page.ready #landing-program,
      #landing-page.ready #landing-btn,
      #landing-page.ready #landing-nim,
      #landing-page.ready #landing-avatar {
        opacity: 1;
        transform: translateY(0);
      }

      #landing-page.ready #landing-avatar {
        transform: scale(1);
      }

      #landing-page.ready #landing-name-line {
        width: 120px;
      }

      /* ── Exit animation ── */
      #landing-page.exit {
        animation: landing-exit 0.8s cubic-bezier(0.4,0,0.2,1) forwards;
      }

      @keyframes landing-exit {
        0%   { opacity: 1; transform: scale(1);    }
        30%  { opacity: 1; transform: scale(1.02); }
        100% { opacity: 0; transform: scale(1.06); visibility: hidden; }
      }

      /* ── Particles di landing ── */
      .landing-particle {
        position: absolute;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(196,154,60,0.7), transparent);
        pointer-events: none;
        animation: particle-rise var(--dur,6s) ease-in var(--delay,0s) infinite;
      }

      /* ── Responsive ── */
      @media (max-width: 640px) {
        #landing-compass-bg { width: 400px; height: 400px; }
        .landing-corner { width: 50px; height: 50px; }
        #landing-btn { padding: 12px 32px; }
      }

    `;
    document.head.appendChild(style);
  }

  /* ================================================================
     BUAT ELEMEN LANDING PAGE
     ================================================================ */
  const landing = document.createElement("div");
  landing.id = "landing-page";

  /* Teks marquee */
  const marqueeTexts = [
    "✦ E-PORTOFOLIO",
    "✦ GURU PROFESIONAL",
    "✦ KNOWLEDGE",
    "✦ INTEGRITY",
    "✦ DEDICATION",
    "✦ MENDIDIK ADALAH MEWARISKAN CAHAYA",
    "✦ E-PORTOFOLIO",
    "✦ GURU PROFESIONAL",
    "✦ KNOWLEDGE",
    "✦ INTEGRITY",
    "✦ DEDICATION",
    "✦ MENDIDIK ADALAH MEWARISKAN CAHAYA",
  ];

  landing.innerHTML = `

    <!-- Kompas besar di belakang -->
    <div id="landing-compass-bg">
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"
           style="width:100%;height:100%;">
        <circle cx="100" cy="100" r="95" stroke="currentColor" stroke-width="0.5" fill="none"/>
        <circle cx="100" cy="100" r="80" stroke="currentColor" stroke-width="0.3" fill="none" stroke-dasharray="4 6"/>
        <circle cx="100" cy="100" r="65" stroke="currentColor" stroke-width="0.5" fill="none"/>
        <circle cx="100" cy="100" r="48" stroke="currentColor" stroke-width="0.3" fill="none" stroke-dasharray="2 5"/>
        <circle cx="100" cy="100" r="30" stroke="currentColor" stroke-width="0.4" fill="none"/>
        <line x1="100" y1="5"   x2="100" y2="195" stroke="currentColor" stroke-width="0.4"/>
        <line x1="5"   y1="100" x2="195" y2="100" stroke="currentColor" stroke-width="0.4"/>
        <line x1="29"  y1="29"  x2="171" y2="171" stroke="currentColor" stroke-width="0.2"/>
        <line x1="171" y1="29"  x2="29"  y2="171" stroke="currentColor" stroke-width="0.2"/>
        <polygon points="100,8 103,92 100,82 97,92" fill="currentColor"/>
        <polygon points="100,192 103,108 100,118 97,108" fill="currentColor" opacity="0.3"/>
        <circle cx="100" cy="100" r="4" fill="currentColor"/>
        <text x="100" y="20" text-anchor="middle" font-size="8"
          fill="currentColor" font-family="serif" font-weight="bold">N</text>
        <text x="100" y="188" text-anchor="middle" font-size="7"
          fill="currentColor" font-family="serif">S</text>
        <text x="182" y="104" text-anchor="middle" font-size="7"
          fill="currentColor" font-family="serif">E</text>
        <text x="18" y="104" text-anchor="middle" font-size="7"
          fill="currentColor" font-family="serif">W</text>
      </svg>
    </div>

    <!-- Ornamen sudut -->
    <div class="landing-corner tl"></div>
    <div class="landing-corner tr"></div>
    <div class="landing-corner bl"></div>
    <div class="landing-corner br"></div>

    <!-- Konten utama -->
    <div id="landing-content">

      <!-- Foto profil kecil -->
      <img
        src="foto-profil.png"
        alt="Foto Profil"
        id="landing-avatar"
        onerror="this.style.display='none'"
      />

      <!-- Label atas -->
      <div id="landing-label">E-Portofolio</div>

      <!-- Nama besar -->
      <h1 id="landing-name">Muhammad<br>Abduramadani</h1>

      <!-- Garis bawah nama -->
      <div id="landing-name-line"></div>

      <!-- Program studi -->
      <p id="landing-program">
        PPG Prajabatan 2025 &nbsp;·&nbsp; Informatika
      </p>

      <!-- Tombol masuk -->
      <button id="landing-btn">
        Masuk ke Portofolio
        <i class="fas fa-arrow-right"></i>
      </button>

      <!-- NIM -->
      <p id="landing-nim">NIM: 2500103916225027</p>

    </div>

    <!-- Marquee bawah -->
    <div id="landing-marquee">
      <div id="landing-marquee-track">
        ${marqueeTexts.map((t) => `<span>${t}</span>`).join("")}
      </div>
    </div>

  `;

  document.body.appendChild(landing);

  /* ================================================================
     BUAT PARTIKEL DI LANDING
     ================================================================ */
  for (let i = 0; i < 18; i++) {
    const p = document.createElement("div");
    p.className = "landing-particle";

    const size = (Math.random() * 3 + 1.5).toFixed(1);
    const left = (Math.random() * 92 + 3).toFixed(1);
    const top = (Math.random() * 70 + 20).toFixed(1);
    const dur = (Math.random() * 5 + 5).toFixed(1);
    const delay = (Math.random() * 7).toFixed(1);
    const drift = ((Math.random() - 0.5) * 45).toFixed(0);

    p.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${left}%;
      top: ${top}%;
      --dur: ${dur}s;
      --delay: ${delay}s;
      --drift: ${drift}px;
    `;
    landing.appendChild(p);
  }

  /* ================================================================
     ANIMASI MASUK — Elemen muncul bertahap
     ================================================================ */
  setTimeout(() => {
    landing.classList.add("ready");
  }, 200);

  /* ================================================================
     TOMBOL MASUK — Trigger loading screen lalu hilang
     ================================================================ */
  const btn = document.getElementById("landing-btn");
  if (btn) {
    btn.addEventListener("click", () => {
      /* Efek ripple di tombol */
      const ripple = document.createElement("span");
      Object.assign(ripple.style, {
        position: "absolute",
        width: "200px",
        height: "200px",
        borderRadius: "50%",
        background: "rgba(196,154,60,0.15)",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%) scale(0)",
        animation: "ripple-expand 0.6s ease forwards",
        pointerEvents: "none",
      });
      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 700);

      /* Tunggu sebentar lalu exit */
      setTimeout(() => {
        landing.classList.add("exit");

        /* Hapus dari DOM setelah animasi */
        setTimeout(() => {
          landing.remove();
        }, 850);
      }, 200);
    });
  }

  /* ================================================================
     KEYBOARD — Enter / Space untuk masuk
     ================================================================ */
  document.addEventListener("keydown", (e) => {
    if (
      (e.key === "Enter" || e.key === " ") &&
      document.getElementById("landing-page")
    ) {
      e.preventDefault();
      btn?.click();
    }
  });

  console.log("%c Landing Page ✓", "color:#C49A3C;font-style:italic;");
  /* ── Paksa cursor muncul di landing page ── */
  const forceCursorOnLanding = (e) => {
    const crosshair = document.getElementById("cursor-crosshair");
    const ring = document.getElementById("cursor-ring");
    const dot = document.getElementById("cursor-dot");
    const landing = document.getElementById("landing-page");

    /* Hanya aktif saat landing page masih ada */
    if (!landing) {
      document.removeEventListener("mousemove", forceCursorOnLanding);
      return;
    }

    if (crosshair) {
      crosshair.style.opacity = "1";
      crosshair.style.left = e.clientX + "px";
      crosshair.style.top = e.clientY + "px";
    }
    if (ring) {
      ring.style.opacity = "1";
    }
    if (dot) {
      dot.style.opacity = "1";
      dot.style.left = e.clientX + "px";
      dot.style.top = e.clientY + "px";
    }
  };

  document.addEventListener("mousemove", forceCursorOnLanding);
}

function initProfilModal() {
  /* ── Inject CSS ── */
  if (!document.querySelector("#profilModalStyles")) {
    const style = document.createElement("style");
    style.id = "profilModalStyles";
    style.textContent = `

      /* ================================================================
         CARD PROFIL — Cursor pointer & hint klik
         ================================================================ */

      .card-asal,
      .card-inspirasi,
      .card-quote,
      .card-identity {
        cursor: pointer;
      }

      /* Hint "klik untuk detail" */
      .card-asal::before,
      .card-inspirasi::before,
      .card-quote::before,
      .card-identity::before {
        content: 'Klik untuk detail';
        position: absolute;
        bottom: 12px;
        right: 14px;
        font-family: 'DM Mono', monospace;
        font-size: 0.55rem;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        color: rgba(196,154,60,0.6);
        opacity: 0;
        transition: opacity 0.3s ease;
        z-index: 3;
        pointer-events: none;
      }

      .card-asal:hover::before,
      .card-inspirasi:hover::before,
      .card-quote:hover::before,
      .card-identity:hover::before {
        opacity: 1;
      }

      /* ================================================================
         MODAL OVERLAY
         ================================================================ */

      #profil-modal-overlay {
        position: fixed;
        inset: 0;
        background: rgba(15,8,2,0.82);
        z-index: 99990;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 24px;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.35s ease, visibility 0.35s ease;
        backdrop-filter: blur(4px);
        -webkit-backdrop-filter: blur(4px);
      }

      #profil-modal-overlay.open {
        opacity: 1;
        visibility: visible;
      }

      /* ================================================================
         MODAL BOX
         ================================================================ */

      #profil-modal-box {
        background: #FAF6EE;
        border-radius: 12px;
        width: 100%;
        max-width: 780px;
        max-height: 88vh;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        position: relative;
        box-shadow:
          0 24px 80px rgba(0,0,0,0.4),
          0 0 0 1px rgba(196,149,106,0.2);
        transform: scale(0.92) translateY(20px);
        transition: transform 0.35s cubic-bezier(0.34,1.1,0.64,1);
      }

      #profil-modal-overlay.open #profil-modal-box {
        transform: scale(1) translateY(0);
      }

      body.dark-mode #profil-modal-box {
        background: #1a0f06;
        box-shadow:
          0 24px 80px rgba(0,0,0,0.6),
          0 0 0 1px rgba(196,149,106,0.15);
      }

      /* ================================================================
         MODAL HEADER
         ================================================================ */

      #profil-modal-header {
        padding: 28px 32px 20px;
        border-bottom: 1px solid rgba(196,149,106,0.18);
        display: flex;
        align-items: flex-start;
        gap: 16px;
        flex-shrink: 0;
        position: relative;
        background: linear-gradient(
          135deg,
          rgba(245,237,220,0.8),
          rgba(237,217,180,0.4)
        );
      }

      body.dark-mode #profil-modal-header {
        background: linear-gradient(
          135deg,
          rgba(30,18,8,0.9),
          rgba(42,26,8,0.6)
        );
      }

      /* Garis emas atas */
      #profil-modal-header::before {
        content: '';
        position: absolute;
        top: 0; left: 0; right: 0;
        height: 3px;
        background: linear-gradient(90deg, #C49A3C, #A0522D, #C49A3C);
      }

      .modal-header-icon {
        width: 48px;
        height: 48px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.1rem;
        color: #EDD9B4;
        flex-shrink: 0;
      }

      .modal-header-text { flex: 1; }

      .modal-header-text h2 {
        font-family: 'Playfair Display', serif;
        font-size: 1.4rem;
        font-weight: 700;
        color: #3B2A1A;
        margin-bottom: 4px;
      }

      body.dark-mode .modal-header-text h2 {
        color: #EDD9B4;
      }

      .modal-header-text p {
        font-family: 'DM Mono', monospace;
        font-size: 0.62rem;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        color: #8B5E3C;
      }

      body.dark-mode .modal-header-text p {
        color: #C4956A;
      }

      /* Tombol tutup */
      #profil-modal-close {
        position: absolute;
        top: 16px;
        right: 16px;
        width: 32px;
        height: 32px;
        background: rgba(139,94,60,0.1);
        border: 1px solid rgba(139,94,60,0.2);
        border-radius: 6px;
        color: #8B5E3C;
        font-size: 0.8rem;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s ease;
        flex-shrink: 0;
      }

      #profil-modal-close:hover {
        background: rgba(139,94,60,0.2);
        color: #3B2A1A;
        transform: rotate(90deg);
      }

      body.dark-mode #profil-modal-close {
        background: rgba(196,149,106,0.08);
        border-color: rgba(196,149,106,0.15);
        color: #C4956A;
      }

      /* ================================================================
         MODAL BODY — Scrollable
         ================================================================ */

      #profil-modal-body {
        overflow-y: auto;
        flex: 1;
        padding: 28px 32px;
        scroll-behavior: smooth;
      }

      #profil-modal-body::-webkit-scrollbar {
        width: 4px;
      }

      #profil-modal-body::-webkit-scrollbar-track {
        background: rgba(196,149,106,0.08);
      }

      #profil-modal-body::-webkit-scrollbar-thumb {
        background: rgba(196,149,106,0.4);
        border-radius: 2px;
      }

      /* ================================================================
         MODAL FOTO GALLERY
         ================================================================ */

      .modal-gallery {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 10px;
        margin-bottom: 24px;
      }

      .modal-gallery-item {
        aspect-ratio: 4/3;
        border-radius: 6px;
        overflow: hidden;
        background: linear-gradient(135deg, #EDD9B4, #D4B483);
        position: relative;
        cursor: zoom-in;
        border: 1px solid rgba(196,149,106,0.2);
      }

      .modal-gallery-item img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.4s ease;
        display: block;
      }

      .modal-gallery-item:hover img {
        transform: scale(1.06);
      }

      /* Placeholder jika foto belum ada */
      .modal-gallery-item .gallery-placeholder {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: #8B5E3C;
        gap: 6px;
        font-family: 'DM Mono', monospace;
        font-size: 0.6rem;
        letter-spacing: 0.1em;
      }

      .modal-gallery-item .gallery-placeholder i {
        font-size: 1.4rem;
        opacity: 0.5;
      }

      body.dark-mode .modal-gallery-item {
        background: linear-gradient(135deg, #2a1a08, #1a0f06);
        border-color: rgba(196,149,106,0.12);
      }

      /* ================================================================
         MODAL KONTEN TEKS
         ================================================================ */

      .modal-section {
        margin-bottom: 24px;
      }

      .modal-section-title {
        font-family: 'Playfair Display', serif;
        font-size: 1rem;
        font-weight: 700;
        color: #3B2A1A;
        margin-bottom: 10px;
        display: flex;
        align-items: center;
        gap: 8px;
        padding-bottom: 8px;
        border-bottom: 1px solid rgba(196,149,106,0.15);
      }

      body.dark-mode .modal-section-title {
        color: #EDD9B4;
        border-bottom-color: rgba(196,149,106,0.12);
      }

      .modal-section-title i {
        color: #C49A3C;
        font-size: 0.85rem;
      }

      .modal-section p {
        font-family: 'Crimson Pro', serif;
        font-size: 1rem;
        color: #5C3D1E;
        line-height: 1.85;
        margin-bottom: 12px;
      }

      body.dark-mode .modal-section p {
        color: #C4956A;
      }

      /* Highlight teks penting */
      .modal-section strong {
        color: #3B2A1A;
        font-weight: 600;
      }

      body.dark-mode .modal-section strong {
        color: #EDD9B4;
      }

      /* ================================================================
         MODAL HIGHLIGHT PILLS
         ================================================================ */

      .modal-highlights {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin-top: 16px;
      }

      .modal-highlight-pill {
        display: inline-flex;
        align-items: center;
        gap: 7px;
        padding: 7px 14px;
        background: rgba(139,94,60,0.07);
        border: 1px solid rgba(139,94,60,0.15);
        border-left: 3px solid #C49A3C;
        border-radius: 0 4px 4px 0;
        font-family: 'Crimson Pro', serif;
        font-size: 0.9rem;
        color: #5C3D1E;
        transition: background 0.2s ease;
      }

      .modal-highlight-pill:hover {
        background: rgba(139,94,60,0.13);
      }

      body.dark-mode .modal-highlight-pill {
        background: rgba(196,149,106,0.06);
        border-color: rgba(196,149,106,0.12);
        color: #C4956A;
      }

      .modal-highlight-pill i {
        color: #C49A3C;
        font-size: 0.75rem;
      }

      /* ================================================================
         MODAL TIMELINE — Untuk card inspirasi
         ================================================================ */

      .modal-timeline {
        display: flex;
        flex-direction: column;
        gap: 0;
        margin-top: 12px;
      }

      .modal-timeline-item {
        display: flex;
        gap: 16px;
        padding: 12px 0;
        position: relative;
      }

      .modal-timeline-item:not(:last-child)::before {
        content: '';
        position: absolute;
        left: 17px;
        top: 32px;
        bottom: -12px;
        width: 2px;
        background: linear-gradient(
          180deg,
          rgba(196,154,60,0.5),
          rgba(196,154,60,0.1)
        );
      }

      .modal-tl-dot {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        background: linear-gradient(135deg, #C49A3C, #A0522D);
        color: #EDD9B4;
        font-size: 0.75rem;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        box-shadow: 0 0 0 4px rgba(196,154,60,0.15);
        position: relative;
        z-index: 1;
      }

      .modal-tl-content h4 {
        font-family: 'Playfair Display', serif;
        font-size: 0.95rem;
        font-weight: 700;
        color: #3B2A1A;
        margin-bottom: 4px;
      }

      body.dark-mode .modal-tl-content h4 {
        color: #EDD9B4;
      }

      .modal-tl-content p {
        font-size: 0.88rem !important;
        line-height: 1.65 !important;
        margin-bottom: 0 !important;
      }

      /* ================================================================
         MODAL QUOTE BESAR — Untuk card quote
         ================================================================ */

      .modal-big-quote {
        position: relative;
        padding: 24px 28px;
        background: linear-gradient(135deg, #3B2A1A, #1e1208);
        border-radius: 8px;
        margin-bottom: 20px;
        overflow: hidden;
      }

      .modal-big-quote::before {
        content: '\\201C';
        position: absolute;
        top: -10px;
        left: 16px;
        font-family: 'Playfair Display', serif;
        font-size: 7rem;
        color: rgba(196,154,60,0.15);
        line-height: 1;
        pointer-events: none;
      }

      .modal-big-quote p {
        font-family: 'Playfair Display', serif;
        font-size: 1.15rem !important;
        font-style: italic;
        color: rgba(237,217,180,0.95) !important;
        line-height: 1.8 !important;
        position: relative;
        z-index: 1;
      }

      .modal-big-quote cite {
        display: block;
        margin-top: 14px;
        font-family: 'DM Mono', monospace;
        font-size: 0.65rem;
        color: rgba(196,149,106,0.7);
        letter-spacing: 0.1em;
        position: relative;
        z-index: 1;
      }

      /* ================================================================
         MODAL FOOTER
         ================================================================ */

      #profil-modal-footer {
        padding: 16px 32px;
        border-top: 1px solid rgba(196,149,106,0.15);
        display: flex;
        justify-content: flex-end;
        gap: 10px;
        flex-shrink: 0;
        background: rgba(245,237,220,0.5);
      }

      body.dark-mode #profil-modal-footer {
        background: rgba(15,8,2,0.5);
        border-top-color: rgba(196,149,106,0.1);
      }

      .modal-btn-close {
        padding: 8px 20px;
        background: linear-gradient(135deg, #5C3D1E, #3B2A1A);
        border: none;
        border-radius: 4px;
        color: #EDD9B4;
        font-family: 'DM Mono', monospace;
        font-size: 0.65rem;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        cursor: pointer;
        transition: all 0.2s ease;
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .modal-btn-close:hover {
        background: linear-gradient(135deg, #8B5E3C, #5C3D1E);
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(59,42,26,0.3);
      }

      /* ================================================================
         LIGHTBOX — Saat foto di klik
         ================================================================ */

      #photo-lightbox {
        position: fixed;
        inset: 0;
        background: rgba(0,0,0,0.92);
        z-index: 999999;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.3s ease, visibility 0.3s ease;
        cursor: zoom-out;
      }

      #photo-lightbox.open {
        opacity: 1;
        visibility: visible;
      }

      #photo-lightbox img {
        max-width: 90vw;
        max-height: 85vh;
        object-fit: contain;
        border-radius: 4px;
        transform: scale(0.9);
        transition: transform 0.3s cubic-bezier(0.34,1.1,0.64,1);
        box-shadow: 0 8px 40px rgba(0,0,0,0.6);
      }

      #photo-lightbox.open img {
        transform: scale(1);
      }

      /* ================================================================
         RESPONSIVE
         ================================================================ */

      @media (max-width: 640px) {
        #profil-modal-box { max-height: 92vh; }
        #profil-modal-header { padding: 20px 20px 16px; }
        #profil-modal-body  { padding: 20px; }
        #profil-modal-footer{ padding: 12px 20px; }
        .modal-gallery { grid-template-columns: repeat(2, 1fr); }
        .modal-header-text h2 { font-size: 1.15rem; }
      }

    `;
    document.head.appendChild(style);
  }

  /* ================================================================
     DATA MODAL — Isi sesuai data asli Anda
     ================================================================ */
  const modalData = {
    /* ── CARD IDENTITY ── */
    identity: {
      icon: "fa-user-circle",
      color: "linear-gradient(135deg, #5C3D1E, #3B2A1A)",
      title: "Profil Lengkap",
      sub: "Muhammad Abduramadani",
      photos: [
        { src: "eportfolio/foto-profil.png", caption: "Foto Formal" },
        { src: "eportfolio/foto-wisuda.JPG", caption: "Wisuda" },
        { src: "foto-kegiatan.jpg", caption: "Kegiatan Kampus" },
      ],
      sections: [
        {
          icon: "fa-id-card",
          title: "Identitas Diri",
          body: `
            <p>Nama lengkap saya adalah <strong>Muhammad Abduramadani</strong>,
            lahir di <strong>Malang, 29 November 2001</strong>. Saya merupakan
            mahasiswa Program Studi <strong>Informatika</strong> angkatan 2026
            di Universitas <strong>Universitas Negeri Surabaya</strong>.</p>
            <p>Saya memiliki minat besar di bidang teknologi, khususnya pengembangan sistem berbasis web dan desain digital. Saya dikenal sebagai pribadi yang disiplin, mudah beradaptasi, serta senang mempelajari hal-hal baru yang dapat meningkatkan kemampuan diri maupun pengalaman profesional.</p>
          `,
        },
        {
          icon: "fa-heart",
          title: "Minat & Hobi",
          body: `
            <p>Saya memiliki minat pada bidang pendidikan, teknologi pembelajaran, dan pengembangan media digital. Saya senang mempelajari cara memanfaatkan teknologi untuk menciptakan proses belajar yang lebih menarik dan efektif bagi peserta didik. Selain itu, saya juga memiliki hobi membaca informasi seputar teknologi dan pendidikan, mendesain konten digital, serta mengikuti perkembangan media pembelajaran modern. Di waktu luang, saya menikmati kegiatan mendengarkan musik, olahraga ringan, dan mengeksplorasi hal-hal baru yang dapat meningkatkan kreativitas serta kemampuan diri sebagai calon pendidik.</p>
          `,
        },
      ],
      highlights: [
        { icon: "fa-map-marker-alt", text: "Malang, Jawa Timur" },
        { icon: "fa-university", text: "Informatika" },
        { icon: "fa-calendar", text: "Angkatan 2026" },
        { icon: "fa-star", text: "IPK [ X.XX ]" },
      ],
    },

    /* ── CARD ASAL DAERAH ── */
    asal: {
      icon: "fa-mountain",
      color: "linear-gradient(135deg, #4A5240, #2d3328)",
      title: "Asal & Keunikan Daerah",
      sub: "Kabupaten Malang, Jawa Timur",
      photos: [
        { src: "eportfolio/foto-bromo.jpg", caption: "Gunung Bromo & Semeru" },
        {
          src: "eportfolio/foto-balekambang.webp",
          caption: "Pantai Balekambang",
        },
        { src: "eportfolio/foto-topeng.jpg", caption: "Tari Topeng Malangan" },
      ],
      sections: [
        {
          icon: "fa-map",
          title: "Tentang Kabupaten Malang",
          body: `
            <p>Saya berasal dari <strong>Kabupaten Malang</strong>, sebuah
            daerah yang terletak di bagian selatan Jawa Timur. Kabupaten Malang
            merupakan salah satu kabupaten terluas di Jawa Timur dengan luas
            wilayah sekitar 3.534 km².</p>
            <p>Daerah ini dikelilingi oleh pegunungan dan perbukitan yang
            subur, menjadikannya salah satu destinasi wisata alam terpopuler
            di Indonesia. Dari <strong>Gunung Bromo</strong> yang ikonik hingga
            <strong>Pantai Balekambang</strong> yang eksotis.</p>
          `,
        },
        {
          icon: "fa-theater-masks",
          title: "Budaya & Tradisi",
          body: `
            <p><strong>Tari Topeng Malangan</strong> adalah salah satu warisan
            budaya paling khas dari daerah ini. Tarian ini memiliki ratusan
            jenis topeng dengan karakter yang berbeda-beda, mencerminkan
            kekayaan budaya Jawa yang mendalam.</p>

            <p>Selain itu ada juga <strong>Sound Horeg</strong> istilah yang populer di wilayah Malang dan Jawa Timur untuk menyebut sistem audio berukuran besar dengan suara bass yang sangat kuat dan menggelegar. Kata “horeg” sendiri berasal dari bahasa Jawa yang menggambarkan sesuatu yang bergetar atau berguncang karena dentuman suara.

Biasanya sound horeg digunakan pada acara hiburan masyarakat seperti karnaval, hajatan, pesta rakyat, hingga arak-arakan. Ciri khasnya adalah susunan speaker besar yang ditumpuk tinggi di atas mobil pickup atau truk, lengkap dengan lampu warna-warni dan musik remix atau DJ dengan volume sangat keras sehingga suara dan getarannya bisa terasa dari jarak jauh.

Bagi masyarakat Malang dan sekitarnya, sound horeg sudah menjadi bagian dari budaya hiburan modern anak muda dan acara kampung. Namun, karena volumenya sangat keras, sound horeg juga sering menimbulkan pro dan kontra di masyarakat, terutama terkait kebisingan dan kenyamanan lingkungan sekitar..</p>
            
            <p>Selain itu, <strong>Bahasa Walikan</strong> atau bahasa
            Malangan yang unik — di mana kata-kata dibalik — menjadi
            identitas kultural yang membedakan masyarakat Malang dari
            daerah lain di Jawa Timur.</p>
          `,
        },
        {
          icon: "fa-leaf",
          title: "Alam & Wisata",
          body: `
            <p>Malang Raya memiliki banyak destinasi alam yang indah dan terkenal di Indonesia. Keunikan geografisnya yang dikelilingi pegunungan membuat daerah ini memiliki udara yang sejuk serta panorama alam yang memukau. Beberapa tempat wisata populer di Malang Raya antara lain Gunung Bromo, Gunung Semeru, Pantai Balekambang.
            Malang Selatan memiliki deretan pantai yang sangat indah dan membentang luas dari wilayah timur hingga barat Kabupaten Malang. Setiap pantai memiliki karakteristik yang berbeda, mulai dari pantai berpasir putih, tebing karang eksotis, hingga ombak besar khas Samudra Hindia.</p>
          `,
        },
      ],
      highlights: [
        { icon: "fa-mountain", text: "Gunung Bromo & Semeru" },
        { icon: "fa-water", text: "Pantai Balekambang" },
        { icon: "fa-mask", text: "Tari Topeng Malangan" },
        { icon: "fa-comments", text: "Bahasa Walikan & Arema" },
      ],
    },

    /* ── CARD INSPIRASI ── */
    inspirasi: {
      icon: "fa-fire",
      color: "linear-gradient(135deg, #8B3A2A, #5C2A1A)",
      title: "Inspirasi & Tujuan Guru",
      sub: "Perjalanan Menuju Guru Profesional",
      photos: [
        { src: "foto-kbm.jpg", caption: "Kegiatan Belajar Mengajar" },
        { src: "foto-ppl.jpg", caption: "PPL / Praktik Lapangan" },
        { src: "foto-seminar.jpg", caption: "Seminar Pendidikan" },
      ],
      sections: [
        {
          icon: "fa-star",
          title: "Awal Inspirasi",
          body: `
            <p>Ketertarikan saya terhadap dunia pendidikan muncul dari keinginan untuk dapat berbagi ilmu dan memberikan manfaat bagi orang lain. Saya terinspirasi oleh sosok guru yang tidak hanya mengajarkan materi pelajaran, tetapi juga mampu memberikan motivasi, arahan, dan teladan dalam kehidupan. Seiring perkembangan teknologi, saya juga melihat bahwa peran guru sangat penting dalam membantu peserta didik memahami pembelajaran secara kreatif dan inovatif. Dari situlah muncul keinginan saya untuk menjadi seorang guru profesional yang mampu memanfaatkan teknologi sebagai media pembelajaran yang menarik dan efektif.</p>
          `,
        },
        {
          icon: "fa-bullseye",
          title: "Tujuan Menjadi Guru Profesional",
          body: `
            <p>Tujuan saya menjadi guru profesional adalah untuk membantu menciptakan generasi yang cerdas, berkarakter, dan mampu beradaptasi dengan perkembangan zaman. Saya ingin menjadi pendidik yang tidak hanya fokus pada nilai akademik, tetapi juga membimbing peserta didik dalam membangun sikap disiplin, tanggung jawab, dan rasa percaya diri. Selain itu, saya ingin menghadirkan pembelajaran yang menyenangkan dengan memanfaatkan teknologi digital agar peserta didik lebih aktif dan mudah memahami materi. Saya berharap dapat memberikan dampak positif bagi dunia pendidikan serta menjadi guru yang inspiratif bagi siswa di masa depan.</p>
          `,
        },
      ],
      timeline: [
        {
          icon: "fa-seedling",
          title: "Terinspirasi",
          desc: "Saya mulai terinspirasi menjadi guru ketika melihat bagaimana seorang pendidik mampu memberikan semangat dan pengaruh positif kepada peserta didik. Dari pengalaman tersebut, saya menyadari bahwa guru memiliki peran besar dalam membentuk masa depan generasi muda.",
        },
        {
          icon: "fa-book-open",
          title: "Belajar",
          desc: "Perjalanan saya dalam dunia pendidikan dimulai dengan mempelajari berbagai ilmu pengetahuan, metode pembelajaran, serta pemanfaatan teknologi dalam pendidikan. Saya terus berusaha meningkatkan kemampuan diri agar dapat menjadi pendidik yang profesional dan adaptif terhadap perkembangan zaman.",
        },
        {
          icon: "fa-chalkboard-teacher",
          title: "Praktik",
          desc: "Pengalaman pertama dalam mengajar memberikan banyak pelajaran berharga bagi saya, terutama dalam membangun komunikasi dengan peserta didik dan menciptakan suasana belajar yang nyaman. Dari pengalaman tersebut, saya semakin memahami pentingnya kesabaran, kreativitas, dan tanggung jawab seorang guru.",
        },
        {
          icon: "fa-graduation-cap",
          title: "Profesional",
          desc: "Saya memiliki harapan untuk menjadi guru profesional yang mampu memberikan pembelajaran berkualitas, menjadi teladan yang baik, serta terus mengembangkan kompetensi diri. Saya ingin berkontribusi dalam menciptakan pendidikan yang lebih inovatif, inspiratif, dan bermanfaat bagi generasi masa depan.",
        },
      ],
    },

    /* ── CARD QUOTE ── */
    quote: {
      icon: "fa-quote-right",
      color: "linear-gradient(135deg, #C49A3C, #8B5E3C)",
      title: "Kutipan & Filosofi",
      sub: "Landasan Pikir Seorang Pendidik",
      photos: [
        { src: "foto-kihajar.jpg", caption: "Ki Hajar Dewantara" },
        { src: "foto-filosofi.jpg", caption: "Filosofi Pendidikan" },
        { src: "foto-buku.jpg", caption: "Referensi Bacaan" },
      ],
      sections: [
        {
          icon: "fa-info-circle",
          title: "Makna Kutipan",
          body: `
            <p>Kutipan tersebut memiliki makna yang sangat mendalam bagi saya karena pendidikan bukan sekadar proses menyampaikan materi pelajaran, tetapi juga membentuk karakter, sikap, dan pola pikir peserta didik. Seorang guru memiliki peran penting dalam membantu siswa berkembang menjadi pribadi yang percaya diri, disiplin, dan memiliki semangat belajar. Kutipan ini juga mengingatkan saya bahwa guru bukan hanya sumber ilmu, tetapi juga sosok yang dapat memberikan motivasi dan inspirasi bagi masa depan peserta didik. Oleh karena itu, saya ingin menjadi pendidik yang mampu menciptakan suasana belajar yang positif, menyenangkan, dan bermakna.</p>
          `,
        },
        {
          icon: "fa-book",
          title: "Filosofi Pendidikan Saya",
          body: `
            <p>Bagi saya, pendidikan adalah proses membimbing dan membantu peserta didik untuk berkembang sesuai potensi yang dimiliki. Seorang guru seharusnya tidak hanya mengajar, tetapi juga menjadi teladan, pendengar, dan motivator bagi siswa. Saya percaya bahwa setiap peserta didik memiliki kemampuan dan cara belajar yang berbeda, sehingga guru perlu menciptakan pembelajaran yang kreatif, inklusif, dan mudah dipahami. Selain itu, pendidikan juga harus mampu menanamkan nilai-nilai karakter seperti tanggung jawab, kerja sama, kejujuran, dan rasa percaya diri agar peserta didik siap menghadapi tantangan di masa depan.</p>
          `,
        },
      ],
      extraQuotes: [
        {
          text: "Ing ngarsa sung tulada, ing madya mangun karsa, tut wuri handayani.",
          author: "— Ki Hajar Dewantara",
        },
        {
          text: "Pendidikan bukan hanya tentang memperoleh ilmu, tetapi juga membentuk karakter dan masa depan.",
          author: "— Ki Hajar Dewantara",
        },
      ],
    },
  };

  /* ================================================================
     BUAT ELEMEN MODAL & LIGHTBOX
     ================================================================ */

  /* Overlay */
  const overlay = document.createElement("div");
  overlay.id = "profil-modal-overlay";
  overlay.innerHTML = `
    <div id="profil-modal-box">
      <div id="profil-modal-header">
        <div class="modal-header-icon" id="modal-header-icon"></div>
        <div class="modal-header-text">
          <h2 id="modal-title"></h2>
          <p  id="modal-sub"></p>
        </div>
        <button id="profil-modal-close" aria-label="Tutup">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <div id="profil-modal-body"></div>
      <div id="profil-modal-footer">
        <button class="modal-btn-close" id="modal-btn-close-bottom">
          <i class="fas fa-times"></i> Tutup
        </button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);

  /* Lightbox foto */
  const lightbox = document.createElement("div");
  lightbox.id = "photo-lightbox";
  lightbox.innerHTML = `<img src="" alt="Foto detail" id="lightbox-img"/>`;
  document.body.appendChild(lightbox);

  /* ================================================================
     FUNGSI RENDER MODAL
     ================================================================ */
  function renderModal(type) {
    const data = modalData[type];
    if (!data) return;

    /* Header */
    const iconEl = document.getElementById("modal-header-icon");
    const titleEl = document.getElementById("modal-title");
    const subEl = document.getElementById("modal-sub");
    const bodyEl = document.getElementById("profil-modal-body");

    iconEl.style.background = data.color;
    iconEl.innerHTML = `<i class="fas ${data.icon}"></i>`;
    titleEl.textContent = data.title;
    subEl.textContent = data.sub;

    /* Body */
    let html = "";

    /* Gallery foto */
    if (data.photos && data.photos.length) {
      html += `<div class="modal-gallery">`;
      data.photos.forEach((photo) => {
        html += `
          <div class="modal-gallery-item" data-src="${photo.src}">
            <img src="${photo.src}"
                 alt="${photo.caption}"
                 onerror="this.parentElement.innerHTML='
                   <div class=\\'gallery-placeholder\\'>
                     <i class=\\'fas fa-image\\'></i>
                     <span>${photo.caption}</span>
                   </div>'"/>
          </div>
        `;
      });
      html += `</div>`;
    }

    /* Quote besar — khusus card quote */
    if (data.extraQuotes) {
      data.extraQuotes.forEach((q) => {
        html += `
          <div class="modal-big-quote">
            <p>${q.text}</p>
            <cite>${q.author}</cite>
          </div>
        `;
      });
    }

    /* Sections teks */
    if (data.sections) {
      data.sections.forEach((sec) => {
        html += `
          <div class="modal-section">
            <div class="modal-section-title">
              <i class="fas ${sec.icon}"></i>
              ${sec.title}
            </div>
            ${sec.body}
          </div>
        `;
      });
    }

    /* Timeline — khusus card inspirasi */
    if (data.timeline) {
      html += `
        <div class="modal-section">
          <div class="modal-section-title">
            <i class="fas fa-route"></i>
            Perjalanan Menuju Guru Profesional
          </div>
          <div class="modal-timeline">
      `;
      data.timeline.forEach((item) => {
        html += `
          <div class="modal-timeline-item">
            <div class="modal-tl-dot">
              <i class="fas ${item.icon}"></i>
            </div>
            <div class="modal-tl-content">
              <h4>${item.title}</h4>
              <p>${item.desc}</p>
            </div>
          </div>
        `;
      });
      html += `</div></div>`;
    }

    /* Highlights pills */
    if (data.highlights) {
      html += `<div class="modal-highlights">`;
      data.highlights.forEach((h) => {
        html += `
          <div class="modal-highlight-pill">
            <i class="fas ${h.icon}"></i>
            ${h.text}
          </div>
        `;
      });
      html += `</div>`;
    }

    bodyEl.innerHTML = html;

    /* Pasang event klik foto → lightbox */
    bodyEl.querySelectorAll(".modal-gallery-item").forEach((item) => {
      item.addEventListener("click", () => {
        const src = item.getAttribute("data-src");
        const img = item.querySelector("img");
        if (!img) return;
        openLightbox(src);
      });
    });
  }

  /* ================================================================
     BUKA & TUTUP MODAL
     ================================================================ */
  function openModal(type) {
    renderModal(type);
    overlay.classList.add("open");
    document.body.style.overflow = "hidden";

    /* Reset scroll body modal */
    const body = document.getElementById("profil-modal-body");
    if (body) body.scrollTop = 0;
  }

  function closeModal() {
    overlay.classList.remove("open");
    document.body.style.overflow = "";
  }

  /* ================================================================
     BUKA & TUTUP LIGHTBOX
     ================================================================ */
  function openLightbox(src) {
    const img = document.getElementById("lightbox-img");
    if (img) img.src = src;
    lightbox.classList.add("open");
  }

  function closeLightbox() {
    lightbox.classList.remove("open");
  }

  /* ================================================================
     EVENT LISTENERS
     ================================================================ */

  /* Tombol tutup */
  document
    .getElementById("profil-modal-close")
    ?.addEventListener("click", closeModal);
  document
    .getElementById("modal-btn-close-bottom")
    ?.addEventListener("click", closeModal);

  /* Klik overlay untuk tutup */
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeModal();
  });

  /* Lightbox — klik untuk tutup */
  lightbox.addEventListener("click", closeLightbox);

  /* ESC untuk tutup */
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (lightbox.classList.contains("open")) {
        closeLightbox();
      } else {
        closeModal();
      }
    }
  });

  /* ── Pasang klik ke 4 card ── */
  const cardMap = {
    ".card-identity": "identity",
    ".card-asal": "asal",
    ".card-inspirasi": "inspirasi",
    ".card-quote": "quote",
  };

  Object.entries(cardMap).forEach(([selector, type]) => {
    const card = document.querySelector(selector);
    if (!card) return;

    card.addEventListener("click", (e) => {
      /* Jangan trigger jika klik tombol di dalam card */
      if (e.target.closest("button")) return;
      openModal(type);
    });
  });

  console.log("%c Profil Modal ✓", "color:#C49A3C;font-style:italic;");
}

function initEducationAnim() {
  /* ── Inject CSS ── */
  if (!document.querySelector("#educationAnimStyles")) {
    const style = document.createElement("style");
    style.id = "educationAnimStyles";
    style.textContent = `

      /* ================================================================
         EDUCATION TIMELINE — Animasi masuk bertahap
         ================================================================ */

      .edu-item {
        opacity: 0;
        transform: translateX(-30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
      }

      .edu-item.anim-in {
        opacity: 1;
        transform: translateX(0);
      }

      /* Garis timeline tumbuh dari atas ke bawah */
      .edu-item:not(:last-child)::before {
        transform-origin: top;
        transform: scaleY(0);
        transition: transform 0.6s ease;
      }

      .edu-item.anim-in:not(:last-child)::before {
        transform: scaleY(1);
      }

      /* Titik tahun berdenyut saat muncul */
      .edu-year::after {
        transition: transform 0.4s cubic-bezier(0.34,1.56,0.64,1),
                    box-shadow 0.4s ease;
        transform: scale(0);
      }

      .edu-item.anim-in .edu-year::after {
        transform: scale(1);
      }

      /* ================================================================
         ORGANISASI — Slide dari kanan
         ================================================================ */

      .org-item {
        opacity: 0;
        transform: translateX(30px);
        transition: opacity 0.5s ease, transform 0.5s ease;
      }

      .org-item.anim-in {
        opacity: 1;
        transform: translateX(0);
      }

      /* ================================================================
         TEACH ITEM — Muncul dari bawah dengan bounce
         ================================================================ */

      .teach-item {
        opacity: 0;
        transform: translateY(30px) scale(0.96);
        transition: opacity 0.5s ease,
                    transform 0.5s cubic-bezier(0.34,1.2,0.64,1);
      }

      .teach-item.anim-in {
        opacity: 1;
        transform: translateY(0) scale(1);
      }

      /* ================================================================
         ACHIEVEMENT — Slide dari kiri + icon bounce
         ================================================================ */

      .achieve-item {
        opacity: 0;
        transform: translateX(-20px);
        transition: opacity 0.5s ease, transform 0.5s ease;
      }

      .achieve-item.anim-in {
        opacity: 1;
        transform: translateX(0);
      }

      .achieve-item.anim-in > i {
        animation: achieve-icon-bounce 0.6s cubic-bezier(0.34,1.56,0.64,1) forwards;
      }

      @keyframes achieve-icon-bounce {
        0%   { transform: scale(0) rotate(-20deg); }
        60%  { transform: scale(1.3) rotate(5deg);  }
        100% { transform: scale(1) rotate(0deg);   }
      }

      /* ================================================================
         PEND CARD — Garis atas berwarna tumbuh dari kiri
         ================================================================ */

      .pend-card::before {
        transform-origin: left;
        transform: scaleX(0);
        transition: transform 0.8s cubic-bezier(0.4,0,0.2,1);
      }

      .pend-card.anim-in::before {
        transform: scaleX(1);
      }

      /* ================================================================
         SKILL BARS — Di dalam card pengalaman mengajar
         ================================================================ */

      .teach-num {
        opacity: 0;
        transform: scale(0.5);
        transition: opacity 0.4s ease, transform 0.4s cubic-bezier(0.34,1.4,0.64,1);
      }

      .teach-item.anim-in .teach-num {
        opacity: 1;
        transform: scale(1);
      }

      /* ================================================================
         COUNTER — Angka di edu-year
         ================================================================ */

      .edu-year {
        transition: color 0.3s ease;
      }

      .edu-year.highlight {
        color: #C49A3C;
      }

      /* ================================================================
         SECTION PENDIDIKAN — Header ornamen khusus
         ================================================================ */

      #pendidikan .section-header {
        position: relative;
      }

      /* Ornamen garis diagonal di header */
      #pendidikan .section-header::before {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        width: 120px;
        height: 120px;
        background-image:
          repeating-linear-gradient(
            45deg,
            rgba(196,149,106,0.06) 0px,
            rgba(196,149,106,0.06) 1px,
            transparent 1px,
            transparent 12px
          );
        border-radius: 4px;
        pointer-events: none;
      }

      /* ================================================================
         PROGRESS SKILL — Bar kemampuan di card pengalaman
         ================================================================ */

      .skill-bar-wrap {
        height: 3px;
        background: rgba(196,149,106,0.15);
        border-radius: 2px;
        overflow: hidden;
        margin-top: 8px;
      }

      .skill-bar-fill {
        height: 100%;
        width: 0%;
        background: linear-gradient(90deg, #C49A3C, #A0522D);
        border-radius: 2px;
        transition: width 1s cubic-bezier(0.4,0,0.2,1);
        box-shadow: 0 0 6px rgba(196,154,60,0.4);
      }

      /* ================================================================
         DARK MODE
         ================================================================ */

      body.dark-mode .pend-card::before {
        background: linear-gradient(90deg, #C49A3C, #8B5E3C, transparent);
      }

      body.dark-mode #pendidikan .section-header::before {
        background-image: repeating-linear-gradient(
          45deg,
          rgba(196,149,106,0.08) 0px,
          rgba(196,149,106,0.08) 1px,
          transparent 1px,
          transparent 12px
        );
      }

    `;
    document.head.appendChild(style);
  }

  /* ================================================================
     FUNGSI ANIMASI UTAMA
     ================================================================ */

  /* Observer helper */
  function observeElements(selector, callback, delayMultiplier = 100) {
    const elements = document.querySelectorAll(selector);
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Array.from(elements).indexOf(entry.target);
            setTimeout(() => {
              callback(entry.target, idx);
            }, idx * delayMultiplier);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -20px 0px" },
    );

    elements.forEach((el) => observer.observe(el));
  }

  /* ================================================================
     ANIMASI EDUCATION TIMELINE
     ================================================================ */
  function animateEducation() {
    const section = document.getElementById("pendidikan");
    if (!section) return;

    /* Card masuk */
    const cards = section.querySelectorAll(".pend-card");
    cards.forEach((card, idx) => {
      card.style.opacity = "0";
      card.style.transform = "translateY(24px)";
      card.style.transition = `opacity 0.6s ease ${idx * 0.12}s,
                               transform 0.6s ease ${idx * 0.12}s`;
      setTimeout(
        () => {
          card.classList.add("anim-in");
          card.style.opacity = "1";
          card.style.transform = "translateY(0)";
        },
        100 + idx * 120,
      );
    });

    /* Edu items — timeline */
    setTimeout(() => {
      const eduItems = section.querySelectorAll(".edu-item");
      eduItems.forEach((item, idx) => {
        setTimeout(() => {
          item.classList.add("anim-in");

          /* Highlight tahun sebentar */
          const yearEl = item.querySelector(".edu-year");
          if (yearEl) {
            yearEl.classList.add("highlight");
            setTimeout(() => yearEl.classList.remove("highlight"), 600);
          }
        }, idx * 180);
      });
    }, 300);

    /* Org items */
    setTimeout(() => {
      const orgItems = section.querySelectorAll(".org-item");
      orgItems.forEach((item, idx) => {
        setTimeout(() => item.classList.add("anim-in"), idx * 150);
      });
    }, 200);

    /* Teach items */
    setTimeout(() => {
      const teachItems = section.querySelectorAll(".teach-item");
      teachItems.forEach((item, idx) => {
        setTimeout(() => {
          item.classList.add("anim-in");

          /* Tambah skill bar jika belum ada */
          if (!item.querySelector(".skill-bar-wrap")) {
            const bar = document.createElement("div");
            bar.className = "skill-bar-wrap";
            const pct = [85, 78, 80][idx] || 75;
            bar.innerHTML = `
              <div class="skill-bar-fill" data-pct="${pct}"></div>
            `;
            item.appendChild(bar);

            setTimeout(() => {
              const fill = bar.querySelector(".skill-bar-fill");
              if (fill) fill.style.width = pct + "%";
            }, 400);
          }
        }, idx * 160);
      });
    }, 500);

    /* Achieve items */
    setTimeout(() => {
      const achieveItems = section.querySelectorAll(".achieve-item");
      achieveItems.forEach((item, idx) => {
        setTimeout(() => item.classList.add("anim-in"), idx * 130);
      });
    }, 400);
  }

  /* ================================================================
     RESET — Sebelum animasi ulang saat nav diklik
     ================================================================ */
  function resetEducationAnim() {
    const section = document.getElementById("pendidikan");
    if (!section) return;

    section
      .querySelectorAll(".edu-item, .org-item, .teach-item, .achieve-item")
      .forEach((el) => {
        el.classList.remove("anim-in");
      });

    section.querySelectorAll(".pend-card").forEach((card) => {
      card.classList.remove("anim-in");
      card.style.opacity = "0";
      card.style.transform = "translateY(24px)";
    });
  }

  /* ================================================================
     TRIGGER — Saat nav pendidikan diklik
     ================================================================ */
  document.querySelectorAll(".nav-item").forEach((item) => {
    item.addEventListener("click", () => {
      const id = item.getAttribute("data-section");

      if (id === "pendidikan") {
        resetEducationAnim();
        setTimeout(animateEducation, 400);
      }
    });
  });

  /* ================================================================
     JALANKAN JIKA PENDIDIKAN SUDAH AKTIF SAAT LOAD
     ================================================================ */
  const pendidikanActive = document.querySelector("#pendidikan.active");
  if (pendidikanActive) {
    setTimeout(animateEducation, 600);
  }

  console.log("%c Education Anim ✓", "color:#C49A3C;font-style:italic;");
}

function initStatsCounter() {
  /* ── Inject CSS ── */
  if (!document.querySelector("#statsCounterStyles")) {
    const style = document.createElement("style");
    style.id = "statsCounterStyles";
    style.textContent = `

      /* ================================================================
         STATS BANNER — Banner statistik di section profil
         ================================================================ */
      #stats-banner {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 1px;
        margin-top: 32px;
        background: rgba(196,149,106,0.15);
        border: 1px solid rgba(196,149,106,0.2);
        border-radius: 10px;
        overflow: hidden;
        position: relative;
      }

      .stat-item {
        background: rgba(255,255,255,0.65);
        padding: 24px 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        position: relative;
        overflow: hidden;
        transition: background 0.3s ease;
        backdrop-filter: blur(6px);
      }

      body.dark-mode .stat-item {
        background: rgba(26,15,6,0.8);
      }

      .stat-item:hover {
        background: rgba(255,255,255,0.85);
      }

      body.dark-mode .stat-item:hover {
        background: rgba(40,25,10,0.9);
      }

      /* Garis pemisah vertikal */
      .stat-item:not(:last-child)::after {
        content: '';
        position: absolute;
        right: 0;
        top: 20%;
        height: 60%;
        width: 1px;
        background: linear-gradient(
          180deg,
          transparent,
          rgba(196,149,106,0.3),
          transparent
        );
      }

      /* Angka utama */
      .stat-num {
        font-family: 'Playfair Display', serif;
        font-size: 2.4rem;
        font-weight: 900;
        color: #3B2A1A;
        line-height: 1;
        margin-bottom: 6px;
        position: relative;
        z-index: 1;
        transition: color 0.3s ease;
      }

      body.dark-mode .stat-num {
        color: #EDD9B4;
      }

      /* Angka saat animasi — warna emas */
      .stat-num.counting {
        color: #C49A3C;
        text-shadow: 0 0 20px rgba(196,154,60,0.3);
      }

      /* Satuan di samping angka */
      .stat-suffix {
        font-family: 'DM Mono', monospace;
        font-size: 1rem;
        color: #C49A3C;
        font-weight: 500;
      }

      /* Label bawah */
      .stat-label {
        font-family: 'DM Mono', monospace;
        font-size: 0.6rem;
        letter-spacing: 0.15em;
        text-transform: uppercase;
        color: #8B5E3C;
        position: relative;
        z-index: 1;
        margin-top: 2px;
      }

      body.dark-mode .stat-label {
        color: #C4956A;
      }

      /* Ikon kecil */
      .stat-icon {
        font-size: 0.9rem;
        color: rgba(196,154,60,0.5);
        margin-bottom: 8px;
        position: relative;
        z-index: 1;
        transition: transform 0.3s ease, color 0.3s ease;
      }

      .stat-item:hover .stat-icon {
        color: rgba(196,154,60,0.9);
        transform: scale(1.2);
      }

      /* Background number besar redup */
      .stat-bg-num {
        position: absolute;
        font-family: 'Playfair Display', serif;
        font-size: 5rem;
        font-weight: 900;
        color: rgba(196,154,60,0.04);
        bottom: -10px;
        right: 8px;
        line-height: 1;
        pointer-events: none;
        user-select: none;
        z-index: 0;
      }

      /* Bar mini di bawah angka */
      .stat-bar-wrap {
        width: 40px;
        height: 2px;
        background: rgba(196,149,106,0.15);
        border-radius: 1px;
        margin-top: 8px;
        overflow: hidden;
        position: relative;
        z-index: 1;
      }

      .stat-bar-fill {
        height: 100%;
        width: 0%;
        background: linear-gradient(90deg, #C49A3C, #A0522D);
        border-radius: 1px;
        transition: width 1.5s cubic-bezier(0.4,0,0.2,1);
      }

      /* ================================================================
         NILAI COUNTER — Angka nilai praktik mengajar
         ================================================================ */
      .nilai-score {
        transition: color 0.3s ease;
      }

      .nilai-score.counting {
        color: #C49A3C !important;
        text-shadow: 0 0 10px rgba(196,154,60,0.4);
      }

      .total-score {
        transition: color 0.3s ease, text-shadow 0.3s ease;
      }

      .total-score.counting {
        text-shadow: 0 0 30px rgba(196,154,60,0.5) !important;
      }

      /* ================================================================
         KOMPETENSI COUNTER — Progress bar label
         ================================================================ */
      .komp-counter-badge {
        font-family: 'DM Mono', monospace;
        font-size: 0.65rem;
        color: #C49A3C;
        font-weight: 500;
        letter-spacing: 0.05em;
      }

      /* ================================================================
         RESPONSIVE
         ================================================================ */
      @media (max-width: 900px) {
        #stats-banner {
          grid-template-columns: repeat(2, 1fr);
        }
      }

      @media (max-width: 640px) {
        #stats-banner {
          grid-template-columns: repeat(2, 1fr);
        }

        .stat-num { font-size: 1.8rem; }
      }

    `;
    document.head.appendChild(style);
  }

  /* ================================================================
     STATS DATA — Sesuaikan dengan data asli Anda
     ================================================================ */
  const statsData = [
    {
      icon: "fa-graduation-cap",
      num: 4,
      suffix: " Thn",
      label: "Masa Studi",
      bgNum: "4",
      pct: 100,
    },
    {
      icon: "fa-chalkboard-teacher",
      num: 12,
      suffix: "x",
      label: "Praktik Mengajar",
      bgNum: "12",
      pct: 80,
    },
    {
      icon: "fa-trophy",
      num: 8,
      suffix: "+",
      label: "Prestasi",
      bgNum: "8",
      pct: 70,
    },
    {
      icon: "fa-users",
      num: 3,
      suffix: "+",
      label: "Organisasi",
      bgNum: "3",
      pct: 60,
    },
  ];

  /* ================================================================
     BUAT STATS BANNER DI SECTION PROFIL
     ================================================================ */
  function buildStatsBanner() {
    const profilSection = document.getElementById("profil");
    if (!profilSection) return;

    /* Cegah duplikat */
    if (document.getElementById("stats-banner")) return;

    /* Cari .profil-grid untuk sisipkan setelah */
    const profilGrid = profilSection.querySelector(".profil-grid");
    if (!profilGrid) return;

    const banner = document.createElement("div");
    banner.id = "stats-banner";

    statsData.forEach((data) => {
      const item = document.createElement("div");
      item.className = "stat-item";
      item.innerHTML = `
        <span class="stat-bg-num">${data.bgNum}</span>
        <i class="fas ${data.icon} stat-icon"></i>
        <div class="stat-num" data-target="${data.num}" data-suffix="${data.suffix}">
          0<span class="stat-suffix">${data.suffix}</span>
        </div>
        <div class="stat-label">${data.label}</div>
        <div class="stat-bar-wrap">
          <div class="stat-bar-fill" data-pct="${data.pct}"></div>
        </div>
      `;
      banner.appendChild(item);
    });

    profilGrid.insertAdjacentElement("afterend", banner);
  }

  /* ================================================================
     FUNGSI COUNTER ANIMASI
     ================================================================ */
  function animateCounter(el, target, duration, suffix) {
    let start = null;
    let current = 0;
    const numEl = el;

    numEl.classList.add("counting");

    function step(timestamp) {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);

      /* Easing — ease out cubic */
      const ease = 1 - Math.pow(1 - progress, 3);
      current = Math.round(ease * target);

      /* Update teks */
      numEl.innerHTML = `${current}<span class="stat-suffix">${suffix}</span>`;

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        /* Selesai */
        numEl.innerHTML = `${target}<span class="stat-suffix">${suffix}</span>`;
        numEl.classList.remove("counting");

        /* Animasi pulse kecil */
        numEl.style.transform = "scale(1.08)";
        setTimeout(() => {
          numEl.style.transform = "scale(1)";
          numEl.style.transition = "transform 0.3s ease";
        }, 50);
      }
    }

    requestAnimationFrame(step);
  }

  /* ================================================================
     JALANKAN SEMUA COUNTER DI STATS BANNER
     ================================================================ */
  function runStatsBanner() {
    const banner = document.getElementById("stats-banner");
    if (!banner) return;

    /* Counter angka */
    banner.querySelectorAll(".stat-num").forEach((el, idx) => {
      const target = parseInt(el.getAttribute("data-target")) || 0;
      const suffix = el.getAttribute("data-suffix") || "";
      const delay = idx * 150;

      setTimeout(() => {
        animateCounter(el, target, 1800, suffix);
      }, delay);
    });

    /* Bar fill */
    banner.querySelectorAll(".stat-bar-fill").forEach((bar, idx) => {
      const pct = bar.getAttribute("data-pct") || "0";
      setTimeout(
        () => {
          bar.style.width = pct + "%";
        },
        idx * 150 + 300,
      );
    });
  }

  /* ================================================================
     JALANKAN COUNTER NILAI PRAKTIK DI SECTION LAMPIRAN
     ================================================================ */
  function runNilaiCounter() {
    /* Counter pada .nilai-score */
    document.querySelectorAll(".nilai-score").forEach((el, idx) => {
      const text = el.textContent.trim();
      const match = text.match(/(\d+)/);
      if (!match) return;

      const target = parseInt(match[1]);
      const suffix = text.replace(match[0], "").trim();
      let current = 0;

      el.classList.add("counting");

      const delay = idx * 120;
      setTimeout(() => {
        const interval = setInterval(() => {
          current += Math.ceil(target / 40);
          if (current >= target) {
            current = target;
            clearInterval(interval);
            el.classList.remove("counting");
          }
          el.textContent = current + " " + suffix;
        }, 30);
      }, delay);
    });

    /* Counter pada .total-score */
    const totalEl = document.querySelector(".total-score");
    if (totalEl) {
      const text = totalEl.textContent.trim();
      const match = text.match(/(\d+)/);
      if (!match) return;

      const target = parseInt(match[1]);
      const suffix = totalEl.querySelector("span")?.outerHTML || "";
      let current = 0;

      totalEl.classList.add("counting");

      setTimeout(() => {
        const interval = setInterval(() => {
          current += Math.ceil(target / 50);
          if (current >= target) {
            current = target;
            clearInterval(interval);
            totalEl.classList.remove("counting");
          }
          totalEl.innerHTML = current + " " + suffix;
        }, 25);
      }, 600);
    }
  }

  /* ================================================================
     OBSERVER — Jalankan counter saat elemen masuk viewport
     ================================================================ */
  function observeAndRun(selector, callback) {
    const el = document.querySelector(selector);
    if (!el) return;

    if (!("IntersectionObserver" in window)) {
      callback();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            callback();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 },
    );

    observer.observe(el);
  }

  /* ================================================================
     INIT — Build dan setup semua counter
     ================================================================ */

  /* Build stats banner */
  buildStatsBanner();

  /* Jalankan counter saat section profil aktif */
  const profilActive = document.querySelector("#profil.active");
  if (profilActive) {
    setTimeout(runStatsBanner, 1800);
  }

  /* Jalankan ulang saat nav diklik */
  document.querySelectorAll(".nav-item").forEach((item) => {
    item.addEventListener("click", () => {
      const id = item.getAttribute("data-section");

      if (id === "profil") {
        setTimeout(runStatsBanner, 600);
      }

      if (id === "lampiran") {
        setTimeout(runNilaiCounter, 600);
      }
    });
  });

  /* Observer untuk nilai counter — aktif saat scroll ke elemen */
  observeAndRun(".nilai-total", () => {
    const lampiranActive = document.querySelector("#lampiran.active");
    if (lampiranActive) runNilaiCounter();
  });

  console.log("%c Stats Counter ✓", "color:#C49A3C;font-style:italic;");
}

function initTypewriter() {
  /* ── Inject CSS ── */
  if (!document.querySelector("#typewriterStyles")) {
    const style = document.createElement("style");
    style.id = "typewriterStyles";
    style.textContent = `

      /* Kursor berkedip di akhir teks */
      .typewriter-cursor {
        display: inline-block;
        width: 2px;
        height: 1.1em;
        background: rgba(196,154,60,0.85);
        margin-left: 3px;
        vertical-align: middle;
        border-radius: 1px;
        animation: cursor-blink 0.85s ease-in-out infinite;
        box-shadow: 0 0 6px rgba(196,154,60,0.6);
      }

      @keyframes cursor-blink {
        0%, 45%  { opacity: 1; }
        55%, 100%{ opacity: 0; }
      }

      /* Quote tersembunyi sebelum typewriter mulai */
      .quote-hidden {
        opacity: 0;
      }

      /* Quote muncul saat typewriter aktif */
      .quote-typing {
        opacity: 1;
        transition: opacity 0.3s ease;
      }

      /* Efek fade-in pada author setelah quote selesai */
      .quote-author-hidden {
        opacity: 0;
        transform: translateY(8px);
        transition: opacity 0.6s ease, transform 0.6s ease;
      }

      .quote-author-visible {
        opacity: 1 !important;
        transform: translateY(0) !important;
      }

      /* Highlight kata kunci saat diketik */
      .tw-highlight {
        color: rgba(196,154,60,0.95);
        font-weight: 600;
        text-shadow: 0 0 12px rgba(196,154,60,0.3);
      }

      /* Ornamen tanda kutip animasi */
      .quote-ornament {
        transition: opacity 0.5s ease, transform 0.5s ease;
      }

      .quote-ornament.hidden-orn {
        opacity: 0 !important;
        transform: scale(0.8);
      }

      .quote-ornament.visible-orn {
        opacity: 1;
        transform: scale(1);
      }

      /* Glow effect pada card-quote saat typewriter aktif */
      .card-quote.tw-active {
        box-shadow:
          0 0 0 1px rgba(196,154,60,0.2),
          0 12px 40px rgba(59,42,26,0.35),
          0 0 60px rgba(196,154,60,0.06) !important;
        transition: box-shadow 0.5s ease !important;
      }

    `;
    document.head.appendChild(style);
  }

  /* ── Fungsi utama typewriter ── */
  function runTypewriter(el, text, speed, onDone) {
    el.textContent = "";
    el.classList.add("quote-typing");

    /* Buat kursor */
    const cursor = document.createElement("span");
    cursor.className = "typewriter-cursor";
    el.appendChild(cursor);

    let i = 0;

    /* Kata kunci yang akan dihighlight */
    const keywords = [
      "mendidik",
      "guru",
      "ilmu",
      "pendidikan",
      "murid",
      "belajar",
      "mengajar",
      "cahaya",
      "knowledge",
      "wisdom",
      "karakter",
      "bangsa",
      "generasi",
      "masa depan",
    ];

    function typeChar() {
      if (i >= text.length) {
        /* Selesai — hapus kursor setelah jeda */
        setTimeout(() => {
          cursor.style.animation = "none";
          cursor.style.opacity = "0";
          setTimeout(() => {
            cursor.remove();
            if (onDone) onDone();
          }, 400);
        }, 800);
        return;
      }

      /* Sisipkan karakter sebelum kursor */
      const char = document.createTextNode(text[i]);
      el.insertBefore(char, cursor);
      i++;

      /* Kecepatan bervariasi — tanda baca lebih lambat */
      let delay = speed;
      const ch = text[i - 1];
      if (ch === "." || ch === "!" || ch === "?") delay = speed * 8;
      else if (ch === "," || ch === ";") delay = speed * 4;
      else if (ch === " ") delay = speed * 1.5;
      else delay = speed + Math.random() * (speed * 0.5);

      setTimeout(typeChar, delay);
    }

    typeChar();
  }

  /* ── Fungsi highlight kata kunci setelah selesai ── */
  function highlightKeywords(el) {
    const keywords = [
      "mendidik",
      "guru",
      "ilmu",
      "pendidikan",
      "murid",
      "belajar",
      "mengajar",
      "cahaya",
      "knowledge",
      "wisdom",
      "karakter",
      "bangsa",
      "generasi",
      "masa depan",
      "mewariskan",
      "profesional",
      "dedikasi",
      "amanah",
    ];

    let html = el.innerHTML;

    keywords.forEach((kw) => {
      const regex = new RegExp(`(${kw})`, "gi");
      html = html.replace(regex, '<span class="tw-highlight">$1</span>');
    });

    el.innerHTML = html;
  }

  /* ── Setup pada card-quote ── */
  function setupQuoteCard() {
    const quoteCard = document.querySelector(".card-quote");
    const quoteEl = document.querySelector(".main-quote");
    const authorEl = document.querySelector(".quote-author");
    const ornEl = document.querySelector(".quote-ornament");

    if (!quoteCard || !quoteEl) return;

    /* Simpan teks asli */
    const originalText = quoteEl.textContent.trim();
    if (!originalText || originalText.includes("[")) return;

    /* Sembunyikan elemen awal */
    quoteEl.classList.add("quote-hidden");
    if (authorEl) authorEl.classList.add("quote-author-hidden");
    if (ornEl) ornEl.classList.add("hidden-orn");

    /* Tandai card aktif */
    quoteCard.classList.add("tw-active");

    /* Delay sebelum mulai — beri waktu section muncul */
    setTimeout(() => {
      /* Tampilkan ornamen kutip dulu */
      if (ornEl) {
        ornEl.classList.remove("hidden-orn");
        ornEl.classList.add("visible-orn");
      }

      /* Mulai typewriter setelah ornamen muncul */
      setTimeout(() => {
        runTypewriter(quoteEl, originalText, 38, () => {
          /* Highlight kata kunci setelah selesai */
          setTimeout(() => {
            highlightKeywords(quoteEl);
          }, 200);

          /* Tampilkan author */
          if (authorEl) {
            setTimeout(() => {
              authorEl.classList.remove("quote-author-hidden");
              authorEl.classList.add("quote-author-visible");
            }, 400);
          }

          /* Hilangkan glow card */
          setTimeout(() => {
            quoteCard.classList.remove("tw-active");
          }, 1000);
        });
      }, 500);
    }, 800);
  }

  /* ── Setup pada section badge ── */
  function setupBadgeTypewriter(sectionId) {
    const section = document.getElementById(sectionId);
    if (!section) return;

    const badge = section.querySelector(".section-badge");
    if (!badge) return;

    const original = badge.textContent.trim();
    if (!original) return;

    badge.textContent = "";

    const cursor = document.createElement("span");
    cursor.className = "typewriter-cursor";
    cursor.style.cssText = `
      width: 1px;
      height: 0.8em;
      background: rgba(196,154,60,0.7);
    `;
    badge.appendChild(cursor);

    let i = 0;
    function type() {
      if (i >= original.length) {
        setTimeout(() => cursor.remove(), 600);
        return;
      }
      const char = document.createTextNode(original[i]);
      badge.insertBefore(char, cursor);
      i++;
      setTimeout(type, 60);
    }

    setTimeout(type, 300);
  }

  /* ── Jalankan saat section profil aktif pertama kali ── */
  const profilSection = document.getElementById("profil");
  if (profilSection && profilSection.classList.contains("active")) {
    setTimeout(setupQuoteCard, 1500);
  }

  /* ── Jalankan ulang saat nav diklik ── */
  document.querySelectorAll(".nav-item").forEach((item) => {
    item.addEventListener("click", () => {
      const id = item.getAttribute("data-section");

      /* Badge typewriter di setiap section */
      setTimeout(() => setupBadgeTypewriter(id), 400);

      /* Quote typewriter hanya di section profil */
      if (id === "profil") {
        setTimeout(setupQuoteCard, 600);
      }
    });
  });

  /* ── Badge typewriter untuk section pertama ── */
  setTimeout(() => setupBadgeTypewriter("profil"), 2000);

  console.log("%c Typewriter ✓", "color:#C49A3C;font-style:italic;");
}

function initDarkMode() {
  /* ── Inject CSS variabel dark mode ── */
  if (!document.querySelector("#darkModeStyles")) {
    const style = document.createElement("style");
    style.id = "darkModeStyles";
    style.textContent = `

      /* ================================================================
         DARK MODE — Override semua variabel CSS
         ================================================================ */
      body.dark-mode {
        --soil:      #EDD9B4;
        --bark:      #D4B483;
        --clay:      #C4956A;
        --sand:      #8B5E3C;
        --wheat:     #5C3D1E;
        --linen:     #2a1a08;
        --parchment: #1e1208;
        --off-white: #150d04;
        --stone:     #C4956A;
        --gold:      #C49A3C;
        --copper:    #A0522D;
      }

      /* Background body dark */
      body.dark-mode {
        background-color: #150d04;
      }

      /* Sidebar dark */
      body.dark-mode .sidebar {
        background-image: linear-gradient(
          160deg, #0d0804 0%, #1a0f06 60%, #080402 100%
        );
      }

      /* Main content dark */
      body.dark-mode .main-content {
        background-image:
          radial-gradient(circle, rgba(196,154,60,0.08) 1.2px, transparent 1.2px);
        background-size: 28px 28px;
      }

      /* Section dark */
      body.dark-mode .section {
        background-image: none;
      }

      body.dark-mode .section::before {
        background: linear-gradient(
          180deg,
          rgba(21,13,4,0.7)  0%,
          rgba(21,13,4,0.15) 25%,
          rgba(21,13,4,0.15) 75%,
          rgba(21,13,4,0.7)  100%
        );
      }

      /* Card dark */
      body.dark-mode .profil-card,
      body.dark-mode .pend-card,
      body.dark-mode .analisis-card,
      body.dark-mode .misi-card,
      body.dark-mode .doc-card,
      body.dark-mode .teach-item,
      body.dark-mode .komp-item,
      body.dark-mode .org-item,
      body.dark-mode .teori-pill,
      body.dark-mode .faktor-item {
        background: rgba(26,15,6,0.85) !important;
        border-color: rgba(196,149,106,0.15) !important;
        color: #D4B483;
      }

      body.dark-mode .komp-flip-front {
        background: rgba(26,15,6,0.9) !important;
        border-color: rgba(196,149,106,0.15) !important;
      }

      /* Teks dark */
      body.dark-mode .student-name,
      body.dark-mode .pend-card-title,
      body.dark-mode .analisis-card > h3,
      body.dark-mode .misi-card > h3,
      body.dark-mode .card-icon-header h3,
      body.dark-mode .lamp-section-title,
      body.dark-mode .section-title,
      body.dark-mode h4,
      body.dark-mode h3 {
        color: #EDD9B4 !important;
      }

      body.dark-mode .card-body,
      body.dark-mode p,
      body.dark-mode li {
        color: #C4956A;
      }

      body.dark-mode .tag {
        background: rgba(196,149,106,0.1);
        border-color: rgba(196,149,106,0.2);
        color: #D4B483;
      }

      /* Edu timeline dark */
      body.dark-mode .edu-content h4 { color: #EDD9B4 !important; }
      body.dark-mode .edu-content p  { color: #8B5E3C; }
      body.dark-mode .edu-badge {
        background: rgba(196,149,106,0.1);
        border-color: rgba(196,149,106,0.2);
        color: #C4956A;
      }

      /* Perubahan table dark */
      body.dark-mode .perubahan-header {
        background: linear-gradient(90deg, #0d0804, #1a0f06);
      }

      body.dark-mode .perubahan-row:nth-child(even) {
        background: rgba(196,149,106,0.05);
      }

      body.dark-mode .perubahan-row:hover {
        background: rgba(196,149,106,0.1);
      }

      body.dark-mode .comp-name  { color: #EDD9B4; }
      body.dark-mode .comp-before{ color: #8B3A2A; }
      body.dark-mode .comp-after { color: #4A5240; }

      /* Nilai total dark */
      body.dark-mode .nilai-total {
        background: linear-gradient(135deg, #0d0804, #1a0f06);
      }

      /* Foto placeholder dark */
      body.dark-mode .foto-placeholder {
        background: linear-gradient(135deg, #1a0f06, #2a1a08);
        border-color: rgba(196,149,106,0.2);
      }

      /* Avatar dark */
      body.dark-mode .avatar-placeholder {
        background: linear-gradient(135deg, #2a1a08, #3B2A1A);
      }

      /* Highlight item dark */
      body.dark-mode .highlight-item {
        background: rgba(196,149,106,0.06);
        border-color: #8B5E3C;
        color: #C4956A;
      }

      /* Org item dark */
      body.dark-mode .org-item {
        background: rgba(196,149,106,0.04) !important;
      }

      /* Nilai bar wrap dark */
      body.dark-mode .nilai-bar-wrap {
        background: rgba(196,149,106,0.08) !important;
      }

      /* Section marquee dark */
      body.dark-mode .section-marquee {
        border-color: rgba(196,149,106,0.1);
      }

      body.dark-mode .section-marquee::after {
        background: linear-gradient(90deg, transparent, rgba(21,13,4,0.9));
      }

      body.dark-mode .section-marquee::before {
        background: linear-gradient(90deg, rgba(21,13,4,0.9), transparent);
      }

      /* Scroll progress dark */
      body.dark-mode #scroll-progress-wrap {
        background: rgba(196,149,106,0.1);
      }

      /* Loading screen sudah gelap — tidak perlu override */

      /* ── TRANSISI SMOOTH saat toggle ── */
      body,
      body * {
        transition:
          background-color 0.4s ease,
          background-image 0.4s ease,
          color            0.4s ease,
          border-color     0.4s ease,
          box-shadow       0.4s ease !important;
      }

      /* ── TOGGLE BUTTON STYLING ── */
#dark-mode-toggle {
  position: fixed;
  bottom: 24px;
  left: 68px;
  width: 36px;
  height: 36px;
  border-radius: 4px;
  border: 1px solid rgba(196,149,106,0.25);
  background: linear-gradient(135deg, #3B2A1A, #1e1208);
  color: rgba(196,149,106,0.7);
  font-size: 0.8rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9000;
  box-shadow: 0 2px 8px rgba(0,0,0,0.3);
  transition: border-color 0.2s ease, color 0.2s ease !important;
}

#dark-mode-toggle:hover {
  border-color: rgba(196,149,106,0.5);
  color: rgba(196,149,96,1);
}

/* Tooltip ke atas */
#dark-mode-toggle::after {
  content: attr(data-tooltip);
  position: absolute;
  bottom: 44px;
  left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(135deg, #3B2A1A, #1e1208);
  color: rgba(237,217,180,0.9);
  font-family: 'DM Mono', monospace;
  font-size: 0.55rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 4px 10px;
  border-radius: 3px;
  white-space: nowrap;
  border: 1px solid rgba(196,149,106,0.2);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s ease !important;
}

#dark-mode-toggle:hover::after {
  opacity: 1;
}

      /* ── RIPPLE EFFECT saat toggle ── */
      .dark-ripple {
        position: fixed;
        border-radius: 50%;
        pointer-events: none;
        z-index: 99985;
        transform: scale(0);
        opacity: 0.15;
      }

      .dark-ripple.expand {
        animation: ripple-expand 0.8s cubic-bezier(0.4,0,0.2,1) forwards;
      }

      @keyframes ripple-expand {
        from {
          transform: scale(0);
          opacity: 0.2;
        }
        to {
          transform: scale(1);
          opacity: 0;
        }
      }

      /* ── FIX QUOTE CARD — Dark Mode ── */
body.dark-mode .card-quote .main-quote {
  color: rgba(237,217,180,0.95) !important;
}

body.dark-mode .card-quote .quote-author span {
  color: rgba(196,149,106,0.8) !important;
}

body.dark-mode .card-quote .quote-ornament {
  color: rgba(196,154,60,0.2) !important;
}

body.dark-mode .card-quote {
  background: linear-gradient(
    135deg,
    #0d0804 0%,
    #1a0f06 60%,
    #080402 100%
  ) !important;
}

/* ── FIX CARD KOMITMEN — Dark Mode ── */
body.dark-mode .card-komitmen {
  background: linear-gradient(
    135deg,
    #080402 0%,
    #0d0804 60%,
    #050200 100%
  ) !important;
}

body.dark-mode .card-komitmen h3,
body.dark-mode .card-komitmen p {
  color: rgba(237,217,180,0.9) !important;
}

body.dark-mode .card-komitmen .komitmen-shield {
  color: #C49A3C !important;
}

body.dark-mode .card-komitmen .sign-date {
  color: rgba(196,149,106,0.6) !important;
}

/* ── FIX AUTHOR LINE — Dark Mode ── */
body.dark-mode .author-line {
  background: rgba(196,154,60,0.5) !important;
}

/* ── FIX HIGHLIGHT TYPEWRITER — Dark Mode ── */
body.dark-mode .tw-highlight {
  color: rgba(196,154,60,0.95) !important;
  text-shadow: 0 0 12px rgba(196,154,60,0.4) !important;
}

    `;
    document.head.appendChild(style);
  }

  /* ── Buat tombol toggle ── */
  const toggle = document.createElement("button");
  toggle.id = "dark-mode-toggle";
  toggle.innerHTML = '<i class="fas fa-moon"></i>';
  toggle.setAttribute("data-tooltip", "Dark Mode");
  toggle.title = "Toggle Dark / Light Mode";
  document.body.appendChild(toggle);

  /* ── Cek preferensi tersimpan ── */
  let isDark = localStorage.getItem("eportfolio-dark") === "true";
  if (isDark) applyDark(false); /* Apply tanpa animasi saat pertama load */

  /* ── Fungsi apply dark mode ── */
  function applyDark(animate = true) {
    isDark = true;
    document.body.classList.add("dark-mode");
    toggle.innerHTML = '<i class="fas fa-sun"></i>';
    toggle.setAttribute("data-tooltip", "Light Mode");
    localStorage.setItem("eportfolio-dark", "true");

    if (animate) playRipple("#150d04");
  }

  /* ── Fungsi apply light mode ── */
  function applyLight(animate = true) {
    isDark = false;
    document.body.classList.remove("dark-mode");
    toggle.innerHTML = '<i class="fas fa-moon"></i>';
    toggle.setAttribute("data-tooltip", "Dark Mode");
    localStorage.setItem("eportfolio-dark", "false");

    if (animate) playRipple("#F5EDDC");
  }

  /* ── Ripple animation saat toggle ── */
  function playRipple(color) {
    const ripple = document.createElement("div");
    ripple.className = "dark-ripple";

    /* Mulai dari posisi tombol */
    const rect = toggle.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    /* Ukuran ripple cukup untuk menutupi seluruh layar */
    const maxDim = Math.max(window.innerWidth, window.innerHeight) * 2.5;

    Object.assign(ripple.style, {
      width: maxDim + "px",
      height: maxDim + "px",
      left: cx - maxDim / 2 + "px",
      top: cy - maxDim / 2 + "px",
      background: color,
    });

    document.body.appendChild(ripple);

    /* Trigger animasi */
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        ripple.classList.add("expand");
      });
    });

    /* Hapus setelah animasi */
    setTimeout(() => ripple.remove(), 900);
  }

  /* ── Event klik toggle ── */
  toggle.addEventListener("click", () => {
    if (isDark) {
      applyLight();
    } else {
      applyDark();
    }
  });

  /* ── Keyboard shortcut — Alt + D ── */
  document.addEventListener("keydown", (e) => {
    if (e.altKey && e.key === "d") {
      toggle.click();
    }
  });

  console.log("%c Dark Mode ✓", "color:#C49A3C;font-style:italic;");
}

function initSoundEffect() {
  /* ── Buat AudioContext ── */
  let audioCtx = null;

  function getAudioCtx() {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioCtx;
  }

  /* ================================================================
     SOUND 1 — KLIK NAVIGASI
     Suara klik mekanik seperti jam vintage / tombol militer
     ================================================================ */
  function playNavClick() {
    const ctx = getAudioCtx();
    const now = ctx.currentTime;

    /* Oscillator utama — klik pendek */
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    filter.type = "bandpass";
    filter.frequency.value = 800;
    filter.Q.value = 0.8;

    osc.type = "square";
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(80, now + 0.06);

    gainNode.gain.setValueAtTime(0.18, now);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    osc.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.09);

    /* Suara kedua — resonansi */
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();

    osc2.type = "sine";
    osc2.frequency.setValueAtTime(160, now + 0.01);
    osc2.frequency.exponentialRampToValueAtTime(60, now + 0.1);

    gain2.gain.setValueAtTime(0.08, now + 0.01);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

    osc2.connect(gain2);
    gain2.connect(ctx.destination);

    osc2.start(now + 0.01);
    osc2.stop(now + 0.13);
  }

  /* ================================================================
     SOUND 2 — HOVER NAVIGASI
     Suara tick halus saat hover nav item
     ================================================================ */
  function playNavHover() {
    const ctx = getAudioCtx();
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    filter.type = "highpass";
    filter.frequency.value = 2000;

    osc.type = "sine";
    osc.frequency.setValueAtTime(1200, now);
    osc.frequency.exponentialRampToValueAtTime(800, now + 0.03);

    gainNode.gain.setValueAtTime(0.06, now);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

    osc.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.05);
  }

  /* ================================================================
     SOUND 3 — FLIP KARTU
     Suara whoosh saat kartu dibalik
     ================================================================ */
  function playCardFlip() {
    const ctx = getAudioCtx();
    const now = ctx.currentTime;

    /* Noise buffer untuk whoosh */
    const bufSize = ctx.sampleRate * 0.15;
    const buffer = ctx.createBuffer(1, bufSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.3;
    }

    const source = ctx.createBufferSource();
    source.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.value = 1400;
    filter.Q.value = 0.5;

    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(0.0, now);
    gainNode.gain.linearRampToValueAtTime(0.25, now + 0.04);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

    source.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    source.start(now);
    source.stop(now + 0.16);
  }

  /* ================================================================
     SOUND 4 — LOADING SELESAI
     Suara ding elegan saat loading screen hilang
     ================================================================ */
  function playLoadingDone() {
    const ctx = getAudioCtx();
    const now = ctx.currentTime;

    /* Nada 1 */
    const playTone = (freq, startTime, duration, vol) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(vol, startTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(startTime);
      osc.stop(startTime + duration + 0.05);
    };

    /* Chord arpeggio naik — C E G */
    playTone(523.25, now, 0.5, 0.12); /* C5 */
    playTone(659.25, now + 0.1, 0.5, 0.1); /* E5 */
    playTone(783.99, now + 0.2, 0.6, 0.08); /* G5 */
    playTone(1046.5, now + 0.32, 0.7, 0.06); /* C6 — nada tinggi penutup */
  }

  /* ================================================================
     SOUND 5 — SCROLL
     Tick sangat halus saat scroll melewati section baru
     ================================================================ */
  function playScrollTick() {
    const ctx = getAudioCtx();
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.exponentialRampToValueAtTime(220, now + 0.05);

    gainNode.gain.setValueAtTime(0.04, now);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.07);
  }

  /* ================================================================
     PASANG EVENT LISTENER
     ================================================================ */

  /* Nav item — hover & klik */
  document.querySelectorAll(".nav-item").forEach((item) => {
    item.addEventListener("mouseenter", () => playNavHover());
    item.addEventListener("click", () => playNavClick());
  });

  /* Dot navigasi kanan (scroll progress) */
  document.querySelectorAll(".section-nav-dot").forEach((dot) => {
    dot.addEventListener("mouseenter", () => playNavHover());
    dot.addEventListener("click", () => playNavClick());
  });

  /* Kartu kompetensi — flip */
  document.querySelectorAll(".komp-item").forEach((item) => {
    item.addEventListener("click", () => playCardFlip());
  });

  /* Tombol dokumen */
  document.querySelectorAll(".btn-doc").forEach((btn) => {
    btn.addEventListener("click", () => playNavHover());
  });

  /* ================================================================
     SOUND LOADING DONE
     Deteksi saat loading screen hilang lalu bunyikan ding
     ================================================================ */
  /* Hanya jalankan loaderCheck jika loading screen sudah visible */
  const loaderCheck = setInterval(() => {
    const loader = document.getElementById("loading-screen");

    /* Skip jika loader belum visible — artinya belum distart */
    if (!loader) {
      clearInterval(loaderCheck);
      return;
    }

    /* Cek visibility dan opacity */
    if (loader.style.visibility === "hidden" || loader.style.opacity === "0") {
      clearInterval(loaderCheck);
      setTimeout(() => playLoadingDone(), 200);
    }
  }, 100);

  /* ================================================================
     SOUND SCROLL TICK
     Bunyikan tick saat progress bar melewati kelipatan 25%
     ================================================================ */
  let lastQuarter = 0;

  window.addEventListener(
    "scroll",
    () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      const quarter = Math.floor(pct / 25);

      if (quarter !== lastQuarter) {
        lastQuarter = quarter;
        playScrollTick();
      }
    },
    { passive: true },
  );

  /* ================================================================
     TOMBOL MUTE — pojok kiri bawah
     ================================================================ */
  const muteBtn = document.createElement("button");
  muteBtn.id = "sound-toggle";
  let muted = false;

  muteBtn.style.cssText = `
    position: fixed;
    bottom: 24px;
    left: 24px;
    width: 36px;
    height: 36px;
    background: linear-gradient(135deg, #3B2A1A, #1e1208);
    border: 1px solid rgba(196,149,106,0.25);
    border-radius: 4px;
    color: rgba(196,149,106,0.7);
    font-size: 0.75rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9000;
    transition: all 0.2s ease;
    box-shadow: 0 2px 8px rgba(0,0,0,0.3);
  `;

  muteBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
  muteBtn.title = "Mute / Unmute sound";

  muteBtn.addEventListener("mouseenter", () => {
    muteBtn.style.borderColor = "rgba(196,149,106,0.5)";
    muteBtn.style.color = "rgba(196,149,106,1)";
  });

  muteBtn.addEventListener("mouseleave", () => {
    muteBtn.style.borderColor = "rgba(196,149,106,0.25)";
    muteBtn.style.color = "rgba(196,149,106,0.7)";
  });

  muteBtn.addEventListener("click", () => {
    muted = !muted;

    if (muted) {
      /* Suspend AudioContext saat mute */
      if (audioCtx) audioCtx.suspend();
      muteBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
      muteBtn.style.opacity = "0.5";
    } else {
      /* Resume saat unmute */
      if (audioCtx) audioCtx.resume();
      muteBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
      muteBtn.style.opacity = "1";
      playNavHover();
    }
  });

  document.body.appendChild(muteBtn);

  console.log("%c Sound Effects ✓", "color:#C49A3C;font-style:italic;");
}

function initCardFlip() {
  /* ── Inject CSS ── */
  if (!document.querySelector("#cardFlipStyles")) {
    const style = document.createElement("style");
    style.id = "cardFlipStyles";
    style.textContent = `

      /* ── Wrapper perspektif ── */
      .komp-item {
        perspective: 1000px;
        cursor: pointer;
        background: transparent !important;
        border: none !important;
        box-shadow: none !important;
        padding: 0 !important;
      }

      /* ── Inner card — yang berputar ── */
      .komp-flip-inner {
        position: relative;
        width: 100%;
        height: 100%;
        min-height: 220px;
        transform-style: preserve-3d;
        transition: transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);
      }

      /* Saat di-flip */
      .komp-item.flipped .komp-flip-inner {
        transform: rotateY(180deg);
      }

      /* ── Sisi depan & belakang ── */
      .komp-flip-front,
      .komp-flip-back {
        position: absolute;
        inset: 0;
        backface-visibility: hidden;
        -webkit-backface-visibility: hidden;
        border-radius: 10px;
        padding: 20px;
        display: flex;
        flex-direction: column;
      }

      /* ── SISI DEPAN ── */
      .komp-flip-front {
        background: rgba(255,255,255,0.72);
        border: 1px solid rgba(196,149,106,0.18);
        box-shadow: 0 2px 8px rgba(59,42,26,0.15);
      }

      .komp-flip-front::before {
        content: '';
        position: absolute;
        bottom: 0; left: 0; right: 0;
        height: 3px;
        background: linear-gradient(90deg, #C49A3C, #A0522D);
        border-radius: 0 0 10px 10px;
      }

      /* Hint flip di pojok kanan atas */
      .komp-flip-front::after {
        content: '↺';
        position: absolute;
        top: 10px;
        right: 12px;
        font-size: 0.75rem;
        color: rgba(196,154,60,0.4);
        transition: color 0.2s ease, transform 0.3s ease;
      }

      .komp-item:hover .komp-flip-front::after {
        color: rgba(196,154,60,0.8);
        transform: rotate(180deg);
      }

      /* ── SISI BELAKANG ── */
      .komp-flip-back {
        background: linear-gradient(
          135deg,
          #3B2A1A 0%,
          #5C3D1E 60%,
          #2a1a08 100%
        );
        border: 1px solid rgba(196,149,106,0.2);
        box-shadow: 0 2px 8px rgba(59,42,26,0.3);
        transform: rotateY(180deg);
        justify-content: space-between;
        overflow: hidden;
      }

      /* Ornamen sudut belakang */
      .komp-flip-back::before {
        content: '';
        position: absolute;
        top: 0; left: 0;
        width: 50px; height: 50px;
        border-top: 2px solid rgba(196,154,60,0.3);
        border-left: 2px solid rgba(196,154,60,0.3);
        border-radius: 10px 0 0 0;
        pointer-events: none;
      }

      .komp-flip-back::after {
        content: '';
        position: absolute;
        bottom: 0; right: 0;
        width: 35px; height: 35px;
        border-bottom: 1px solid rgba(196,154,60,0.2);
        border-right: 1px solid rgba(196,154,60,0.2);
        pointer-events: none;
      }

      /* ── Konten belakang ── */
      .flip-back-num {
        font-family: 'DM Mono', monospace;
        font-size: 3.5rem;
        font-weight: 500;
        color: rgba(196,154,60,0.1);
        line-height: 1;
        position: absolute;
        top: 10px;
        right: 14px;
        letter-spacing: 0.05em;
      }

      .flip-back-title {
        font-family: 'Playfair Display', serif;
        font-size: 0.95rem;
        font-weight: 700;
        color: rgba(237,217,180,0.95);
        margin-bottom: 12px;
        position: relative;
        z-index: 1;
        padding-bottom: 10px;
        border-bottom: 1px solid rgba(196,149,106,0.2);
      }

      .flip-back-desc {
        font-family: 'Crimson Pro', serif;
        font-size: 0.9rem;
        color: rgba(196,149,106,0.85);
        line-height: 1.7;
        flex: 1;
        position: relative;
        z-index: 1;
      }

      .flip-back-targets {
        margin-top: 14px;
        display: flex;
        flex-direction: column;
        gap: 6px;
        position: relative;
        z-index: 1;
      }

      .flip-back-target-item {
        display: flex;
        align-items: center;
        gap: 8px;
        font-family: 'DM Mono', monospace;
        font-size: 0.62rem;
        color: rgba(196,149,106,0.7);
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }

      .flip-back-target-item::before {
        content: '';
        width: 16px;
        height: 1px;
        background: linear-gradient(90deg, #C49A3C, transparent);
        flex-shrink: 0;
      }

      .flip-back-btn {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        margin-top: 14px;
        padding: 6px 14px;
        border: 1px solid rgba(196,149,106,0.3);
        border-radius: 3px;
        background: transparent;
        color: rgba(196,149,106,0.7);
        font-family: 'DM Mono', monospace;
        font-size: 0.6rem;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        cursor: pointer;
        align-self: flex-start;
        transition: all 0.2s ease;
        position: relative;
        z-index: 1;
      }

      .flip-back-btn:hover {
        background: rgba(196,149,106,0.1);
        color: rgba(237,217,180,0.9);
        border-color: rgba(196,149,106,0.5);
      }

      /* ── Scan line di belakang ── */
      .komp-flip-back .flip-scan {
        position: absolute;
        top: 0;
        left: -80%;
        width: 55%;
        height: 100%;
        background: linear-gradient(
          90deg,
          transparent,
          rgba(255,255,255,0.03),
          transparent
        );
        animation: scan-line 6s ease-in-out infinite;
        pointer-events: none;
      }

      /* ── Hint teks di bawah grid ── */
      #komp-flip-hint {
        text-align: center;
        margin-top: 20px;
        font-family: 'DM Mono', monospace;
        font-size: 0.6rem;
        color: rgba(139,94,60,0.45);
        letter-spacing: 0.15em;
        text-transform: uppercase;
        animation: pulse-glow 3s ease-in-out infinite;
      }

    `;
    document.head.appendChild(style);
  }

  /* ── Data tiap kompetensi ── */
  const kompetensiData = [
    {
      num: "01",
      icon: "fa-brain",
      title: "Kompetensi Pedagogik",
      color: "linear-gradient(135deg, #5C3D1E, #3B2A1A)",
      desc: "Kemampuan memahami peserta didik secara mendalam, merancang pembelajaran yang efektif, melaksanakan pembelajaran bermakna, dan mengevaluasi hasil belajar secara komprehensif.",
      targets: [
        "Memahami karakteristik siswa",
        "Merancang RPP yang inovatif",
        "Mengevaluasi hasil belajar",
        "Mengembangkan kurikulum",
      ],
    },
    {
      num: "02",
      icon: "fa-user-tie",
      title: "Kompetensi Kepribadian",
      color: "linear-gradient(135deg, #8B3A2A, #5C2A1A)",
      desc: "Memiliki kepribadian yang mantap, stabil, dewasa, arif, dan berwibawa. Menjadi teladan bagi peserta didik dan berakhlak mulia dalam setiap tindakan.",
      targets: [
        "Berintegritas & jujur",
        "Menjadi teladan siswa",
        "Bersikap dewasa & arif",
        "Berakhlak mulia",
      ],
    },
    {
      num: "03",
      icon: "fa-network-wired",
      title: "Kompetensi Sosial",
      color: "linear-gradient(135deg, #4A5240, #2d3328)",
      desc: "Kemampuan berkomunikasi dan bergaul secara efektif dengan peserta didik, sesama pendidik, tenaga kependidikan, orang tua, dan masyarakat sekitar.",
      targets: [
        "Komunikasi efektif",
        "Kolaborasi dengan rekan",
        "Hubungan dengan orang tua",
        "Berkontribusi ke komunitas",
      ],
    },
    {
      num: "04",
      icon: "fa-book-reader",
      title: "Kompetensi Profesional",
      color: "linear-gradient(135deg, #A0522D, #6B3A1E)",
      desc: "Penguasaan materi pelajaran secara luas dan mendalam, mengikuti perkembangan ilmu pengetahuan, melakukan penelitian, dan mengembangkan inovasi pembelajaran.",
      targets: [
        "Menguasai materi ajar",
        "Riset & publikasi ilmiah",
        "Inovasi pembelajaran",
        "Pengembangan profesional",
      ],
    },
  ];

  /* ── Cari semua .komp-item dan transform ── */
  const kompItems = document.querySelectorAll(".komp-item");
  if (kompItems.length === 0) return;

  kompItems.forEach((item, idx) => {
    const data = kompetensiData[idx] || kompetensiData[0];

    /* Ambil konten asli */
    const origIcon = item.querySelector(".komp-icon")?.outerHTML || "";
    const origTitle = item.querySelector("h4")?.textContent || data.title;
    const origDesc = item.querySelector("p")?.textContent || data.desc;
    const origProg = item.querySelector(".komp-progress")?.outerHTML || "";

    /* Buat flip inner */
    const inner = document.createElement("div");
    inner.className = "komp-flip-inner";

    /* ── SISI DEPAN ── */
    const front = document.createElement("div");
    front.className = "komp-flip-front";
    front.innerHTML = `
      ${origIcon}
      <h4 style="
        font-family:'Playfair Display',serif;
        font-size:0.9rem;
        font-weight:700;
        color:#3B2A1A;
        margin-bottom:8px;
      ">${origTitle}</h4>
      <p style="
        font-size:0.82rem;
        color:#7A7060;
        line-height:1.6;
        margin-bottom:14px;
        flex:1;
      ">${origDesc}</p>
      ${origProg}
    `;

    /* ── SISI BELAKANG ── */
    const back = document.createElement("div");
    back.className = "komp-flip-back";
    back.innerHTML = `
      <div class="flip-scan"></div>
      <span class="flip-back-num">${data.num}</span>
      <div class="flip-back-title">${data.title}</div>
      <div class="flip-back-desc">${data.desc}</div>
      <div class="flip-back-targets">
        ${data.targets
          .map(
            (t) => `
          <div class="flip-back-target-item">${t}</div>
        `,
          )
          .join("")}
      </div>
      <button class="flip-back-btn">
        <i class="fas fa-undo" style="font-size:0.6rem;"></i>
        Kembali
      </button>
    `;

    /* Tombol kembali di belakang */
    back.querySelector(".flip-back-btn").addEventListener("click", (e) => {
      e.stopPropagation();
      item.classList.remove("flipped");
    });

    /* Rakit */
    inner.appendChild(front);
    inner.appendChild(back);

    /* Kosongkan item lama dan isi ulang */
    item.innerHTML = "";
    item.appendChild(inner);

    /* Klik untuk flip */
    item.addEventListener("click", () => {
      item.classList.toggle("flipped");
    });
  });

  /* ── Tambahkan hint di bawah grid kompetensi ── */
  const kompGrid = document.querySelector(".kompetensi-grid");
  if (kompGrid) {
    const hint = document.createElement("p");
    hint.id = "komp-flip-hint";
    hint.innerHTML = `<i class="fas fa-hand-pointer"></i> &nbsp; Klik kartu untuk melihat detail kompetensi`;
    kompGrid.insertAdjacentElement("afterend", hint);
  }
}

function initScrollProgress() {
  /* ── Inject CSS ── */
  if (!document.querySelector("#scrollProgressStyles")) {
    const style = document.createElement("style");
    style.id = "scrollProgressStyles";
    style.textContent = `

      /* ── Container bar utama ── */
      #scroll-progress-wrap {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        height: 3px;
        z-index: 99980;
        pointer-events: none;
        background: rgba(92,61,30,0.15);
      }

      /* ── Bar progress emas ── */
      #scroll-progress-bar {
        height: 100%;
        width: 0%;
        background: linear-gradient(
          90deg,
          #8B5E3C,
          #C49A3C,
          #A0522D,
          #C49A3C
        );
        background-size: 200% 100%;
        animation: progress-shimmer 2s linear infinite;
        border-radius: 0 2px 2px 0;
        transition: width 0.1s linear;
        position: relative;
      }

      /* Ujung bar — titik bercahaya */
      #scroll-progress-bar::after {
        content: '';
        position: absolute;
        right: -1px;
        top: 50%;
        transform: translateY(-50%);
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: #C49A3C;
        box-shadow:
          0 0 6px 2px rgba(196,154,60,0.8),
          0 0 14px 4px rgba(196,154,60,0.4);
        opacity: 0;
        transition: opacity 0.3s ease;
      }

      #scroll-progress-bar.active::after {
        opacity: 1;
      }

      @keyframes progress-shimmer {
        0%   { background-position: 200% center; }
        100% { background-position: -200% center; }
      }

      /* ── Indikator section kecil di bawah bar ── */
      #scroll-section-indicators {
        position: fixed;
        top: 3px;
        left: 0;
        right: 0;
        height: 2px;
        z-index: 99979;
        pointer-events: none;
        display: flex;
      }

      .scroll-indicator-segment {
        flex: 1;
        border-right: 1px solid rgba(92,61,30,0.2);
        position: relative;
        transition: background 0.3s ease;
      }

      .scroll-indicator-segment:last-child {
        border-right: none;
      }

      .scroll-indicator-segment.passed {
        background: rgba(196,154,60,0.12);
      }

      /* Tooltip nama section saat hover bar */
      .scroll-indicator-segment::after {
        content: attr(data-label);
        position: absolute;
        top: 8px;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(135deg, #3B2A1A, #1e1208);
        color: rgba(237,217,180,0.9);
        font-family: 'DM Mono', monospace;
        font-size: 0.55rem;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        padding: 4px 10px;
        border-radius: 3px;
        white-space: nowrap;
        border: 1px solid rgba(196,149,106,0.2);
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.2s ease;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      }

      /* ── Persentase teks di pojok kanan ── */
      #scroll-progress-pct {
        position: fixed;
        top: 10px;
        right: 20px;
        font-family: 'DM Mono', monospace;
        font-size: 0.6rem;
        color: rgba(196,154,60,0);
        letter-spacing: 0.15em;
        z-index: 99981;
        pointer-events: none;
        transition: color 0.3s ease, opacity 0.3s ease;
        opacity: 0;
      }

      #scroll-progress-pct.visible {
        color: rgba(196,154,60,0.6);
        opacity: 1;
      }

      /* ── Section label besar di kanan ── */
      #scroll-section-label {
        position: fixed;
        right: 20px;
        top: 50%;
        transform: translateY(-50%);
        z-index: 99970;
        pointer-events: none;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: 10px;
      }

      .section-nav-dot {
        display: flex;
        align-items: center;
        gap: 8px;
        opacity: 0.35;
        transition: opacity 0.3s ease, transform 0.3s ease;
        cursor: pointer;
        pointer-events: all;
      }

      .section-nav-dot:hover {
        opacity: 0.8;
        transform: translateX(-4px);
      }

      .section-nav-dot.active {
        opacity: 1;
        transform: translateX(-4px);
      }

      .section-nav-dot .dot-label {
        font-family: 'DM Mono', monospace;
        font-size: 0.55rem;
        color: rgba(196,149,106,0.8);
        letter-spacing: 0.12em;
        text-transform: uppercase;
        opacity: 0;
        transform: translateX(10px);
        transition: opacity 0.2s ease, transform 0.2s ease;
        white-space: nowrap;
      }

      .section-nav-dot:hover .dot-label,
      .section-nav-dot.active .dot-label {
        opacity: 1;
        transform: translateX(0);
      }

      .section-nav-dot .dot-circle {
        width: 7px;
        height: 7px;
        border-radius: 50%;
        border: 1px solid rgba(196,149,106,0.5);
        background: transparent;
        transition: all 0.3s ease;
        flex-shrink: 0;
      }

      .section-nav-dot.active .dot-circle {
        background: #C49A3C;
        border-color: #C49A3C;
        box-shadow: 0 0 8px rgba(196,154,60,0.6);
        width: 9px;
        height: 9px;
      }

      .section-nav-dot:hover .dot-circle {
        border-color: rgba(196,154,60,0.8);
        background: rgba(196,154,60,0.3);
      }

    `;
    document.head.appendChild(style);
  }

  /* ── Buat elemen progress bar ── */
  const wrap = document.createElement("div");
  wrap.id = "scroll-progress-wrap";

  const bar = document.createElement("div");
  bar.id = "scroll-progress-bar";
  wrap.appendChild(bar);
  document.body.appendChild(wrap);

  /* ── Buat persentase teks ── */
  const pct = document.createElement("div");
  pct.id = "scroll-progress-pct";
  pct.textContent = "0%";
  document.body.appendChild(pct);

  /* ── Data section ── */
  const sections = [
    { id: "profil", label: "Profil" },
    { id: "pendidikan", label: "Pendidikan" },
    { id: "analisis", label: "Analisis" },
    { id: "lampiran", label: "Lampiran" },
    { id: "misi", label: "Misi" },
  ];

  /* ── Buat segment indikator section ── */
  const indicators = document.createElement("div");
  indicators.id = "scroll-section-indicators";

  sections.forEach((sec) => {
    const seg = document.createElement("div");
    seg.className = "scroll-indicator-segment";
    seg.setAttribute("data-label", sec.label);
    seg.setAttribute("data-section", sec.id);
    indicators.appendChild(seg);
  });

  document.body.appendChild(indicators);

  /* ── Buat dot navigasi kanan ── */
  const sideNav = document.createElement("div");
  sideNav.id = "scroll-section-label";

  sections.forEach((sec) => {
    const dotWrap = document.createElement("div");
    dotWrap.className = "section-nav-dot";
    dotWrap.setAttribute("data-section", sec.id);
    dotWrap.innerHTML = `
      <span class="dot-label">${sec.label}</span>
      <span class="dot-circle"></span>
    `;

    /* Klik dot → pindah section */
    dotWrap.addEventListener("click", () => {
      const navItem = document.querySelector(
        `.nav-item[data-section="${sec.id}"]`,
      );
      if (navItem) navItem.click();
    });

    sideNav.appendChild(dotWrap);
  });

  document.body.appendChild(sideNav);

  /* ── Update progress saat scroll ── */
  let currentSectionId = "profil";
  let hideTimer = null;

  function updateProgress() {
    const scrollTop = window.scrollY;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrollPct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    /* Update bar width */
    bar.style.width = scrollPct + "%";
    bar.classList.toggle("active", scrollPct > 0 && scrollPct < 100);

    /* Update teks persentase */
    pct.textContent = Math.round(scrollPct) + "%";

    /* Tampilkan persentase saat scroll */
    pct.classList.add("visible");
    clearTimeout(hideTimer);
    hideTimer = setTimeout(() => {
      pct.classList.remove("visible");
    }, 1500);
  }

  /* ── Update dot aktif saat section berubah ── */
  function updateActiveDot(sectionId) {
    if (sectionId === currentSectionId) return;
    currentSectionId = sectionId;

    /* Update dot navigasi kanan */
    document.querySelectorAll(".section-nav-dot").forEach((d) => {
      d.classList.toggle(
        "active",
        d.getAttribute("data-section") === sectionId,
      );
    });

    /* Update segment indikator */
    const order = sections.map((s) => s.id);
    const idx = order.indexOf(sectionId);
    document.querySelectorAll(".scroll-indicator-segment").forEach((seg, i) => {
      seg.classList.toggle("passed", i <= idx);
    });
  }

  /* ── Dengarkan perubahan section dari nav ── */
  document.querySelectorAll(".nav-item").forEach((item) => {
    item.addEventListener("click", () => {
      const id = item.getAttribute("data-section");
      updateActiveDot(id);

      /* Reset scroll progress saat ganti section */
      setTimeout(() => {
        bar.style.width = "0%";
        updateProgress();
      }, 600);
    });
  });

  /* ── Init dot aktif pertama ── */
  updateActiveDot("profil");
  document
    .querySelector('.section-nav-dot[data-section="profil"]')
    ?.classList.add("active");

  /* ── Event scroll ── */
  window.addEventListener("scroll", updateProgress, { passive: true });

  /* ── Jalankan sekali saat load ── */
  updateProgress();
}

function initSmoothTransition() {
  /* ── Inject CSS transition ── */
  if (!document.querySelector("#transitionStyles")) {
    const style = document.createElement("style");
    style.id = "transitionStyles";
    style.textContent = `

      /* Overlay hitam yang melintas saat ganti section */
      #section-transition-overlay {
        position: fixed;
        inset: 0;
        z-index: 99990;
        pointer-events: none;
        display: flex;
        flex-direction: column;
      }

      /* Terbagi 5 strip horizontal */
      .trans-strip {
        flex: 1;
        background: linear-gradient(
          90deg,
          #1e1208,
          #3B2A1A,
          #2a1a08
        );
        transform: scaleX(0);
        transform-origin: left;
      }

      /* Animasi masuk — strip melebar dari kiri */
      .trans-strip.enter {
        animation: strip-enter 0.5s cubic-bezier(0.4,0,0.2,1) forwards;
      }

      /* Animasi keluar — strip mengecil ke kanan */
      .trans-strip.exit {
        animation: strip-exit 0.5s cubic-bezier(0.4,0,0.2,1) forwards;
        transform: scaleX(1);
        transform-origin: right;
      }

      @keyframes strip-enter {
        from { transform: scaleX(0); }
        to   { transform: scaleX(1); }
      }

      @keyframes strip-exit {
        from { transform: scaleX(1); }
        to   { transform: scaleX(0); }
      }

      /* Label section yang muncul di tengah saat transisi */
      #transition-label {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 99991;
        text-align: center;
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.3s ease;
      }

      #transition-label .label-num {
        font-family: 'DM Mono', monospace;
        font-size: 4rem;
        font-weight: 500;
        color: rgba(196,154,60,0.15);
        display: block;
        line-height: 1;
        letter-spacing: 0.1em;
      }

      #transition-label .label-title {
        font-family: 'Playfair Display', serif;
        font-size: 1.4rem;
        font-weight: 700;
        color: rgba(237,217,180,0.9);
        display: block;
        letter-spacing: 0.06em;
        margin-top: 4px;
      }

      #transition-label .label-line {
        width: 0px;
        height: 1px;
        background: linear-gradient(90deg, transparent, #C49A3C, transparent);
        margin: 12px auto 0;
        transition: width 0.4s ease 0.1s;
        display: block;
      }

      #transition-label.visible {
        opacity: 1;
      }

      #transition-label.visible .label-line {
        width: 160px;
      }

      /* Section — siapkan untuk animasi masuk */
      .section {
        transition: none;
      }

      .section.slide-in-right {
        animation: section-slide-right 0.5s cubic-bezier(0.4,0,0.2,1) forwards;
      }

      .section.slide-in-left {
        animation: section-slide-left 0.5s cubic-bezier(0.4,0,0.2,1) forwards;
      }

      @keyframes section-slide-right {
        from { opacity: 0; transform: translateX(40px);  }
        to   { opacity: 1; transform: translateX(0);     }
      }

      @keyframes section-slide-left {
        from { opacity: 0; transform: translateX(-40px); }
        to   { opacity: 1; transform: translateX(0);     }
      }

    `;
    document.head.appendChild(style);
  }

  /* ── Buat overlay strips ── */
  const overlay = document.createElement("div");
  overlay.id = "section-transition-overlay";

  const STRIP_COUNT = 5;
  for (let i = 0; i < STRIP_COUNT; i++) {
    const strip = document.createElement("div");
    strip.className = "trans-strip";
    /* Delay bertahap tiap strip agar efek gelombang */
    strip.style.animationDelay = i * 0.04 + "s";
    overlay.appendChild(strip);
  }
  document.body.appendChild(overlay);

  /* ── Buat label section ── */
  const label = document.createElement("div");
  label.id = "transition-label";
  label.innerHTML = `
    <span class="label-num">01</span>
    <span class="label-title">Profil Mahasiswa</span>
    <span class="label-line"></span>
  `;
  document.body.appendChild(label);

  /* ── Data tiap section ── */
  const sectionData = {
    profil: { num: "01", title: "Profil Mahasiswa" },
    pendidikan: { num: "02", title: "Pendidikan & Pengalaman" },
    analisis: { num: "03", title: "Analisis Artefak" },
    lampiran: { num: "04", title: "Lampiran & Penilaian" },
    misi: { num: "05", title: "Misi & Kompetensi" },
  };

  const sectionOrder = ["profil", "pendidikan", "analisis", "lampiran", "misi"];

  /* ── Intersep klik nav ── */
  let isTransitioning = false;
  let currentSection = "profil";

  document.querySelectorAll(".nav-item").forEach((item) => {
    item.addEventListener("click", (e) => {
      const targetId = item.getAttribute("data-section");
      if (targetId === currentSection) return;
      if (isTransitioning) return;

      /* Tentukan arah slide */
      const currentIdx = sectionOrder.indexOf(currentSection);
      const targetIdx = sectionOrder.indexOf(targetId);
      const direction = targetIdx > currentIdx ? "right" : "left";

      isTransitioning = true;
      runTransition(targetId, direction);
    });
  });

  /* ── Fungsi utama transisi ── */
  function runTransition(targetId, direction) {
    const strips = overlay.querySelectorAll(".trans-strip");
    const data = sectionData[targetId] || { num: "??", title: "" };

    /* Update label */
    label.querySelector(".label-num").textContent = data.num;
    label.querySelector(".label-title").textContent = data.title;
    label.querySelector(".label-line").style.width = "0px";

    /* FASE 1 — Strip masuk (tutup layar) */
    strips.forEach((s) => {
      s.style.transformOrigin = "left";
      s.classList.remove("exit");
      s.classList.remove("enter");
      void s.offsetWidth; /* reflow */
      s.classList.add("enter");
    });

    /* Tampilkan label saat strip hampir penuh */
    setTimeout(() => {
      label.classList.add("visible");
    }, 280);

    /* FASE 2 — Ganti section di tengah transisi */
    const enterDuration = 500 + (STRIP_COUNT - 1) * 40;

    setTimeout(() => {
      /* Sembunyikan semua section */
      document.querySelectorAll(".section").forEach((s) => {
        s.classList.remove("active", "slide-in-right", "slide-in-left");
      });

      /* Tampilkan target section */
      const target = document.getElementById(targetId);
      if (target) {
        target.classList.add("active");
        /* Tambahkan class slide sesuai arah */
        const slideClass =
          direction === "right" ? "slide-in-right" : "slide-in-left";
        target.classList.add(slideClass);
      }

      /* Update nav aktif */
      document
        .querySelectorAll(".nav-item")
        .forEach((n) => n.classList.remove("active"));
      document
        .querySelector(`.nav-item[data-section="${targetId}"]`)
        ?.classList.add("active");

      /* Update current */
      currentSection = targetId;

      /* Scroll ke atas */
      window.scrollTo({ top: 0, behavior: "instant" });

      /* FASE 3 — Sembunyikan label */
      setTimeout(() => {
        label.classList.remove("visible");
      }, 200);

      /* FASE 4 — Strip keluar (buka layar) */
      setTimeout(() => {
        strips.forEach((s) => {
          s.style.transformOrigin = "right";
          s.classList.remove("enter");
          void s.offsetWidth;
          s.classList.add("exit");
        });

        /* Selesai transisi */
        setTimeout(
          () => {
            isTransitioning = false;
            strips.forEach((s) => s.classList.remove("exit"));
          },
          500 + (STRIP_COUNT - 1) * 40,
        );
      }, 300);
    }, enterDuration);
  }
}

function initLoadingScreen(autoStart = true) {
  /* ── Buat elemen loading screen ── */
  const loader = document.createElement("div");
  loader.id = "loading-screen";
  loader.style.cssText = `
    position: fixed;
    inset: 0;
    background: linear-gradient(135deg, #1e1208 0%, #3B2A1A 50%, #2a1a08 100%);
    z-index: 999999;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 32px;
    transition: opacity 0.8s ease, visibility 0.8s ease;
  `;

  loader.innerHTML = `

    <!-- Kompas SVG animasi -->
    <div id="loader-compass" style="
      position: relative;
      width: 160px;
      height: 160px;
    ">
      <!-- Ring luar berputar -->
      <svg id="loader-ring-outer"
        style="position:absolute;inset:0;animation:loader-rotate 3s linear infinite;"
        viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">
        <circle cx="80" cy="80" r="74"
          stroke="rgba(196,154,60,0.3)" stroke-width="1"
          fill="none" stroke-dasharray="6 5"/>
        <circle cx="80" cy="80" r="62"
          stroke="rgba(196,154,60,0.15)" stroke-width="0.6"
          fill="none"/>
      </svg>

      <!-- Ring tengah berputar berlawanan -->
      <svg id="loader-ring-mid"
        style="position:absolute;inset:0;animation:loader-rotate-ccw 5s linear infinite;"
        viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">
        <circle cx="80" cy="80" r="50"
          stroke="rgba(196,154,60,0.25)" stroke-width="1"
          fill="none" stroke-dasharray="4 6"/>
      </svg>

      <!-- Kompas inti — diam -->
      <svg style="position:absolute;inset:0;"
        viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">
        <!-- Garis silang -->
        <line x1="80" y1="10" x2="80" y2="150"
          stroke="rgba(196,154,60,0.2)" stroke-width="0.8"/>
        <line x1="10" y1="80" x2="150" y2="80"
          stroke="rgba(196,154,60,0.2)" stroke-width="0.8"/>
        <!-- Jarum utara — emas -->
        <polygon points="80,18 84,76 80,68 76,76"
          fill="rgba(196,154,60,1)"/>
        <!-- Jarum selatan — redup -->
        <polygon points="80,142 84,84 80,92 76,84"
          fill="rgba(196,154,60,0.35)"/>
        <!-- Titik tengah -->
        <circle cx="80" cy="80" r="5"
          fill="rgba(196,154,60,1)"
          style="filter:drop-shadow(0 0 6px rgba(196,154,60,0.9))"/>
        <circle cx="80" cy="80" r="9"
          stroke="rgba(196,154,60,0.5)" stroke-width="1"
          fill="none"/>
        <!-- Label N -->
        <text x="80" y="14" text-anchor="middle"
          font-size="10" fill="rgba(196,154,60,0.9)"
          font-family="serif" font-weight="bold"
          style="letter-spacing:0.1em">N</text>
      </svg>
    </div>

    <!-- Teks judul -->
    <div style="text-align:center;">
      <p id="loader-title" style="
        font-family: 'Playfair Display', serif;
        font-size: 1.5rem;
        font-weight: 700;
        color: rgba(237,217,180,0.95);
        letter-spacing: 0.08em;
        margin: 0 0 8px;
        opacity: 0;
        transform: translateY(10px);
        transition: opacity 0.6s ease 0.3s, transform 0.6s ease 0.3s;
      ">E-Portofolio</p>
      <p id="loader-sub" style="
        font-family: 'DM Mono', monospace;
        font-size: 0.65rem;
        color: rgba(196,149,106,0.6);
        letter-spacing: 0.25em;
        text-transform: uppercase;
        margin: 0;
        opacity: 0;
        transform: translateY(10px);
        transition: opacity 0.6s ease 0.5s, transform 0.6s ease 0.5s;
      ">Calon Guru Profesional</p>
    </div>

    <!-- Progress bar -->
    <div style="
      width: 200px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
    ">
      <div style="
        width: 100%;
        height: 1px;
        background: rgba(196,149,106,0.15);
        border-radius: 1px;
        overflow: hidden;
        position: relative;
      ">
        <div id="loader-bar" style="
          height: 100%;
          width: 0%;
          background: linear-gradient(90deg, #C49A3C, #A0522D);
          border-radius: 1px;
          transition: width 0.1s linear;
          box-shadow: 0 0 8px rgba(196,154,60,0.6);
        "></div>
      </div>
      <p id="loader-pct" style="
        font-family: 'DM Mono', monospace;
        font-size: 0.6rem;
        color: rgba(196,149,106,0.5);
        letter-spacing: 0.15em;
        margin: 0;
      ">0%</p>
    </div>

    <!-- Marquee teks bawah -->
    <div style="
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      overflow: hidden;
      padding: 10px 0;
      border-top: 1px solid rgba(196,149,106,0.1);
    ">
      <div style="
        display: flex;
        gap: 32px;
        white-space: nowrap;
        animation: marquee-scroll 12s linear infinite;
        width: max-content;
      ">
        ${[
          "✦ MENDIDIK ADALAH MEWARISKAN CAHAYA",
          "✦ GURU PROFESIONAL",
          "✦ KNOWLEDGE",
          "✦ INTEGRITY",
          "✦ DEDICATION",
          "✦ SEMANGAT BELAJAR TANPA BATAS",
          "✦ MENDIDIK ADALAH MEWARISKAN CAHAYA",
          "✦ GURU PROFESIONAL",
          "✦ KNOWLEDGE",
          "✦ INTEGRITY",
          "✦ DEDICATION",
          "✦ SEMANGAT BELAJAR TANPA BATAS",
        ]
          .map(
            (t) => `
          <span style="
            font-family:'DM Mono',monospace;
            font-size:0.55rem;
            letter-spacing:0.18em;
            text-transform:uppercase;
            color:rgba(196,149,106,0.35);
          ">${t}</span>
        `,
          )
          .join("")}
      </div>
    </div>
  `;

  document.body.appendChild(loader);
  if (!autoStart) {
    loader.style.opacity = "0";
    loader.style.visibility = "hidden";
  }

  /* ── Inject keyframe loader ── */
  if (!document.querySelector("#loaderKeyframes")) {
    const style = document.createElement("style");
    style.id = "loaderKeyframes";
    style.textContent = `
      @keyframes loader-rotate {
        from { transform: rotate(0deg);   }
        to   { transform: rotate(360deg); }
      }
      @keyframes loader-rotate-ccw {
        from { transform: rotate(0deg);    }
        to   { transform: rotate(-360deg); }
      }
    `;
    document.head.appendChild(style);
  }

  /* ── Tampilkan teks dengan delay ── */
  requestAnimationFrame(() => {
    setTimeout(() => {
      const title = document.getElementById("loader-title");
      const sub = document.getElementById("loader-sub");
      if (title) {
        title.style.opacity = "1";
        title.style.transform = "translateY(0)";
      }
      if (sub) {
        sub.style.opacity = "1";
        sub.style.transform = "translateY(0)";
      }
    }, 200);
  });

  /* ── Animasi progress bar ── */
  /* ── Animasi progress bar ── */
  const bar = document.getElementById("loader-bar");
  const pct = document.getElementById("loader-pct");
  let progress = 0;

  /* Saat landing mulai hilang — tampilkan loading screen */
  setTimeout(() => {
    const loader = document.getElementById("loading-screen");
    if (loader) {
      /* Reset progress bar dulu */
      const bar = loader.querySelector("#loader-bar");
      const pct = loader.querySelector("#loader-pct");
      if (bar) bar.style.width = "0%";
      if (pct) pct.textContent = "0%";

      /* Tampilkan */
      loader.style.visibility = "visible";
      loader.style.opacity = "1";
    }

    /* Tunggu sebentar lalu start progress */
    setTimeout(() => {
      if (window._startLoadingScreen) {
        window._startLoadingScreen();
      }
    }, 300);
  }, 400);

  /* Expose fungsi start agar bisa dipanggil dari luar */
  window._startLoadingScreen = function () {
    /* Reset progress */
    let progress = 0;
    const bar = document.getElementById("loader-bar");
    const pct = document.getElementById("loader-pct");

    /* Tampilkan teks */
    const title = document.getElementById("loader-title");
    const sub = document.getElementById("loader-sub");
    if (title) {
      title.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      title.style.opacity = "1";
      title.style.transform = "translateY(0)";
    }
    if (sub) {
      sub.style.transition = "opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s";
      sub.style.opacity = "1";
      sub.style.transform = "translateY(0)";
    }

    /* Fungsi update bar */
    function updateBar(value) {
      progress = value;
      if (bar) bar.style.width = progress + "%";
      if (pct) pct.textContent = progress + "%";
    }

    /* Animasi progress bertahap */
    function runSegment(from, to, duration, onDone) {
      const startTime = performance.now();
      const diff = to - from;

      function step(now) {
        const elapsed = now - startTime;
        const fraction = Math.min(elapsed / duration, 1);
        /* Easing ease-out */
        const eased = 1 - Math.pow(1 - fraction, 2);
        const current = Math.round(from + diff * eased);

        updateBar(current);

        if (fraction < 1) {
          requestAnimationFrame(step);
        } else {
          updateBar(to);
          if (onDone) onDone();
        }
      }

      requestAnimationFrame(step);
    }

    /* Jalankan segmen berurutan */
    /* 0 → 30 dalam 600ms */
    runSegment(0, 30, 600, () => {
      /* Jeda 300ms lalu 30 → 65 dalam 800ms */
      setTimeout(() => {
        runSegment(30, 65, 800, () => {
          /* Jeda 400ms lalu 65 → 85 dalam 600ms */
          setTimeout(() => {
            runSegment(65, 85, 600, () => {
              /* Jeda 300ms lalu 85 → 100 dalam 400ms */
              setTimeout(() => {
                runSegment(85, 100, 400, () => {
                  /* Selesai — hide loader */
                  setTimeout(hideLoader, 500);
                });
              }, 300);
            });
          }, 400);
        });
      }, 300);
    });
  };

  /* Autostart jika dipanggil langsung */
  if (autoStart) {
    setTimeout(() => {
      const title = document.getElementById("loader-title");
      const sub = document.getElementById("loader-sub");
      if (title) {
        title.style.opacity = "1";
        title.style.transform = "translateY(0)";
      }
      if (sub) {
        sub.style.opacity = "1";
        sub.style.transform = "translateY(0)";
      }
      window._startLoadingScreen();
    }, 200);
  }

  /* ── Fungsi sembunyikan loader ── */
  function hideLoader() {
    loader.style.opacity = "0";
    loader.style.visibility = "hidden";

    /* Hapus dari DOM setelah animasi selesai */
    setTimeout(() => {
      loader.remove();
    }, 900);
  }

  /* ── Fallback: paksa hide setelah 5 detik ── */
  setTimeout(() => {
    if (document.getElementById("loading-screen")) {
      hideLoader();
    }
  }, 5000);
}

function initMarqueeText() {
  /* ── MARQUEE 1 — Di bawah sidebar ── */
  const sidebar = document.querySelector(".sidebar");
  if (!sidebar) return;

  const marqueeWrap = document.createElement("div");
  marqueeWrap.id = "sidebar-marquee";
  marqueeWrap.style.cssText = `
    width: 100%;
    overflow: hidden;
    padding: 10px 0;
    border-top: 1px solid rgba(196,149,106,0.2);
    border-bottom: 1px solid rgba(196,149,106,0.2);
    background: rgba(0,0,0,0.15);
    position: relative;
    flex-shrink: 0;
  `;

  /* Teks yang berjalan */
  const texts = [
    "✦ MENDIDIK ADALAH MEWARISKAN CAHAYA",
    "✦ GURU PROFESIONAL",
    "✦ KNOWLEDGE",
    "✦ INTEGRITY",
    "✦ DEDICATION",
    "✦ PENDIDIKAN ADALAH INVESTASI TERBAIK",
    "✦ SEMANGAT BELAJAR TANPA BATAS",
  ];

  const track = document.createElement("div");
  track.style.cssText = `
    display: flex;
    gap: 32px;
    white-space: nowrap;
    animation: marquee-scroll 18s linear infinite;
    width: max-content;
  `;

  /* Duplikat teks agar loop mulus */
  [...texts, ...texts].forEach((text) => {
    const span = document.createElement("span");
    span.textContent = text;
    span.style.cssText = `
      font-family: 'DM Mono', monospace;
      font-size: 0.6rem;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      color: rgba(196,149,106,0.6);
      flex-shrink: 0;
    `;
    track.appendChild(span);
  });

  marqueeWrap.appendChild(track);

  /* Sisipkan sebelum sidebar-footer */
  const footer = sidebar.querySelector(".sidebar-footer");
  if (footer) {
    sidebar.insertBefore(marqueeWrap, footer);
  } else {
    sidebar.appendChild(marqueeWrap);
  }

  /* ── MARQUEE 2 — Di bawah section header tiap section ── */
  const sections = document.querySelectorAll(".section");

  const sectionTexts = {
    profil: [
      "✦ PROFIL MAHASISWA",
      "✦ ASAL & IDENTITAS",
      "✦ INSPIRASI GURU",
      "✦ TUJUAN PROFESIONAL",
      "✦ KARAKTER UNGGUL",
    ],
    pendidikan: [
      "✦ RIWAYAT PENDIDIKAN",
      "✦ PENGALAMAN ORGANISASI",
      "✦ PRAKTIK MENGAJAR",
      "✦ PRESTASI & PENGHARGAAN",
    ],
    analisis: [
      "✦ ANALISIS ARTEFAK",
      "✦ TEORI PEMBELAJARAN",
      "✦ FAKTOR KEBERHASILAN",
      "✦ EVALUASI & REFLEKSI",
    ],
    lampiran: [
      "✦ LAMPIRAN PERANGKAT",
      "✦ RPP & LKPD",
      "✦ PENILAIAN PRAKTIK",
      "✦ DOKUMENTASI MENGAJAR",
    ],
    misi: [
      "✦ MISI & KOMPETENSI",
      "✦ GURU PROFESIONAL",
      "✦ KOMPETENSI PEDAGOGIK",
      "✦ KOMITMEN PENDIDIKAN",
    ],
  };

  sections.forEach((section) => {
    const id = section.id;
    const texts = sectionTexts[id] || ["✦ E-PORTOFOLIO", "✦ GURU PROFESIONAL"];
    const header = section.querySelector(".section-header");
    if (!header) return;

    const wrap = document.createElement("div");
    wrap.className = "section-marquee";
    wrap.style.cssText = `
      width: 100%;
      overflow: hidden;
      padding: 8px 0;
      margin-bottom: 32px;
      border-top: 1px solid rgba(196,149,106,0.15);
      border-bottom: 1px solid rgba(196,149,106,0.15);
      position: relative;
    `;

    const inner = document.createElement("div");
    inner.style.cssText = `
      display: flex;
      gap: 40px;
      white-space: nowrap;
      animation: marquee-scroll 22s linear infinite;
      width: max-content;
    `;

    /* Triplikat untuk loop lebih mulus */
    [...texts, ...texts, ...texts].forEach((text) => {
      const span = document.createElement("span");
      span.textContent = text;
      span.style.cssText = `
        font-family: 'DM Mono', monospace;
        font-size: 0.65rem;
        letter-spacing: 0.18em;
        text-transform: uppercase;
        color: rgba(139,94,60,0.5);
        flex-shrink: 0;
      `;
      inner.appendChild(span);
    });

    wrap.appendChild(inner);

    /* Sisipkan setelah .section-header */
    header.insertAdjacentElement("afterend", wrap);
  });

  /* ── Inject keyframe animasi ── */
  if (!document.querySelector("#marqueeKeyframe")) {
    const style = document.createElement("style");
    style.id = "marqueeKeyframe";
    style.textContent = `
      @keyframes marquee-scroll {
        from { transform: translateX(0); }
        to   { transform: translateX(-50%); }
      }

      /* Pause saat hover */
      #sidebar-marquee:hover div,
      .section-marquee:hover div {
        animation-play-state: paused;
      }

      /* Fade kiri-kanan agar tidak terpotong kasar */
      #sidebar-marquee::before,
      #sidebar-marquee::after,
      .section-marquee::before,
      .section-marquee::after {
        content: '';
        position: absolute;
        top: 0;
        width: 28px;
        height: 100%;
        z-index: 2;
        pointer-events: none;
      }

      #sidebar-marquee::before,
      .section-marquee::before {
        left: 0;
        background: linear-gradient(90deg, rgba(59,42,26,0.9), transparent);
      }

      #sidebar-marquee::after {
        right: 0;
        background: linear-gradient(90deg, transparent, rgba(59,42,26,0.9));
      }

      .section-marquee::after {
        right: 0;
        background: linear-gradient(90deg, transparent, rgba(250,246,238,0.9));
      }
        /* ── SECTION MARQUEE — Sticky di atas ── */

.section-marquee {
  position: sticky;
  top: 0;
  z-index: 50;
  background: rgba(250,246,238,0.92);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-top: 1px solid rgba(196,149,106,0.15);
  border-bottom: 1px solid rgba(196,149,106,0.15);
  margin-bottom: 32px;
  margin-left: -56px;
  margin-right: -56px;
  padding: 8px 56px;
  width: calc(100% + 112px);
  box-shadow: 0 2px 12px rgba(59,42,26,0.08);
  transition: background 0.3s ease, box-shadow 0.3s ease;
}

/* Saat scroll — lebih solid */
.section-marquee.scrolled {
  background: rgba(250,246,238,0.97);
  box-shadow: 0 4px 20px rgba(59,42,26,0.12);
}

/* Dark mode */
body.dark-mode .section-marquee {
  background: rgba(21,13,4,0.92) !important;
}

body.dark-mode .section-marquee.scrolled {
  background: rgba(21,13,4,0.97) !important;
  box-shadow: 0 4px 20px rgba(0,0,0,0.3) !important;
}
    `;
    document.head.appendChild(style);
  }
  /* ── Tambahkan class scrolled saat di-scroll ── */
  window.addEventListener(
    "scroll",
    () => {
      const marquees = document.querySelectorAll(".section-marquee");
      marquees.forEach((m) => {
        m.classList.toggle("scrolled", window.scrollY > 10);
      });
    },
    { passive: true },
  );
}

function initCustomCursor() {
  /* Sembunyikan cursor default di area main-content */
  const style = document.createElement("style");
  style.textContent = `
  body, body * {
    cursor: none !important;
  }
`;
  document.head.appendChild(style);

  /* ── ELEMEN 1: Crosshair utama ── */
  const crosshair = document.createElement("div");
  crosshair.id = "cursor-crosshair";
  crosshair.innerHTML = `
    <svg width="32" height="32" viewBox="0 0 32 32"
         xmlns="http://www.w3.org/2000/svg">
      <!-- Lingkaran luar -->
      <circle cx="16" cy="16" r="13"
        stroke="rgba(196,154,60,0.85)" stroke-width="1"
        fill="none" stroke-dasharray="3 4"/>
      <!-- Garis horizontal -->
      <line x1="2"  y1="16" x2="10" y2="16"
        stroke="rgba(196,154,60,0.9)" stroke-width="1.2"/>
      <line x1="22" y1="16" x2="30" y2="16"
        stroke="rgba(196,154,60,0.9)" stroke-width="1.2"/>
      <!-- Garis vertikal -->
      <line x1="16" y1="2"  x2="16" y2="10"
        stroke="rgba(196,154,60,0.9)" stroke-width="1.2"/>
      <line x1="16" y1="22" x2="16" y2="30"
        stroke="rgba(196,154,60,0.9)" stroke-width="1.2"/>
      <!-- Titik tengah -->
      <circle cx="16" cy="16" r="2"
        fill="rgba(196,154,60,1)"/>
      <!-- Lingkaran dalam -->
      <circle cx="16" cy="16" r="5"
        stroke="rgba(196,154,60,0.5)" stroke-width="0.8"
        fill="none"/>
    </svg>
  `;
  crosshair.style.cssText = `
  position: fixed;
  width: 32px;
  height: 32px;
  pointer-events: none;
  z-index: 99999999;
  transform: translate(-50%, -50%);
  transition: transform 0.08s ease, opacity 0.3s ease;
  opacity: 1;
  will-change: transform;
  mix-blend-mode: normal;
`;
  document.body.appendChild(crosshair);

  /* ── ELEMEN 2: Ring luar yang mengikuti dengan delay ── */
  const ring = document.createElement("div");
  ring.id = "cursor-ring";
  ring.style.cssText = `
    position: fixed;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    border: 1px solid rgba(196,154,60,0.4);
    pointer-events: none;
    z-index: 99998;
    transform: translate(-50%, -50%);
    opacity: 0;
    transition: opacity 0.3s ease, width 0.2s ease, height 0.2s ease;
    will-change: transform;
  `;
  document.body.appendChild(ring);

  /* ── ELEMEN 3: Titik kecil solid di tengah ── */
  const dot = document.createElement("div");
  dot.id = "cursor-dot";
  dot.style.cssText = `
    position: fixed;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: rgba(196,154,60,1);
    pointer-events: none;
    z-index: 100000;
    transform: translate(-50%, -50%);
    opacity: 0;
    box-shadow: 0 0 6px rgba(196,154,60,0.8);
    will-change: transform;
  `;
  document.body.appendChild(dot);

  /* ── POSISI & ANIMASI ── */
  let mouseX = 0,
    mouseY = 0;
  let ringX = 0,
    ringY = 0;
  let isOverMain = false;

  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    /* Aktif di seluruh halaman */
    if (!isOverMain) {
      isOverMain = true;
      crosshair.style.opacity = "1";
      ring.style.opacity = "1";
      dot.style.opacity = "1";
    }

    /* Update posisi crosshair & dot langsung */
    crosshair.style.left = mouseX + "px";
    crosshair.style.top = mouseY + "px";
    dot.style.left = mouseX + "px";
    dot.style.top = mouseY + "px";
  });

  /* Ring mengikuti dengan lerp (smooth delay) */
  function animateRing() {
    ringX = lerp(ringX, mouseX, 0.12);
    ringY = lerp(ringY, mouseY, 0.12);
    ring.style.left = ringX + "px";
    ring.style.top = ringY + "px";
    requestAnimationFrame(animateRing);
  }
  animateRing();

  /* ── EFEK KLIK — crosshair mengecil sebentar ── */
  document.addEventListener("mousedown", () => {
    if (!isOverMain) return;
    crosshair.style.transform = "translate(-50%, -50%) scale(0.7)";
    ring.style.width = "28px";
    ring.style.height = "28px";
    ring.style.borderColor = "rgba(196,154,60,0.9)";
  });

  document.addEventListener("mouseup", () => {
    crosshair.style.transform = "translate(-50%, -50%) scale(1)";
    ring.style.width = "48px";
    ring.style.height = "48px";
    ring.style.borderColor = "rgba(196,154,60,0.4)";
  });

  /* ── EFEK HOVER LINK & BUTTON — ring membesar ── */
  document
    .querySelectorAll(
      "a, button, .nav-item, .profil-card, .pend-card, .analisis-card, .misi-card",
    )
    .forEach((el) => {
      el.addEventListener("mouseenter", () => {
        if (!isOverMain) return;
        ring.style.width = "64px";
        ring.style.height = "64px";
        ring.style.borderColor = "rgba(196,154,60,0.7)";
        crosshair.style.opacity = "0.5";
      });
      el.addEventListener("mouseleave", () => {
        ring.style.width = "48px";
        ring.style.height = "48px";
        ring.style.borderColor = "rgba(196,154,60,0.4)";
        crosshair.style.opacity = "1";
      });
    });
}

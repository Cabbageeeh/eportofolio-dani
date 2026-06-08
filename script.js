/* ============================================
   E-PORTOFOLIO — SCRIPT.JS
   Navigasi, Interaksi & Animasi
   ============================================ */

"use strict";

/* ============================================
   INISIALISASI SAAT DOM SIAP
   ============================================ */
document.addEventListener("DOMContentLoaded", () => {
  initNavigation();
  initHamburger();
  initScrollTop();
  initBarAnimations();
  initCardAnimations();
  initActiveNavOnLoad();
  initTypingEffect();
  initTooltips();
  console.log(
    "%c E-Portofolio Loaded ✓",
    "color:#C49A3C;font-weight:bold;font-size:14px;",
  );
});

/* ============================================
   1. NAVIGASI ANTAR SECTION
   ============================================ */
function initNavigation() {
  const navItems = document.querySelectorAll(".nav-item");
  const sections = document.querySelectorAll(".section");

  navItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();

      const targetId = item.getAttribute("data-section");
      const target = document.getElementById(targetId);
      if (!target) return;

      /* Cek apakah sudah di section analisis */
      const isAlreadyAnalisis = targetId === "analisis" &&
        document.getElementById("analisis")?.classList.contains("active");

      /* Tutup sidebar di mobile, tapi jaga state dropdown */
      const hadDropdown = document.querySelector(".nav-has-dropdown.open");
      closeSidebarMobile();
      if (hadDropdown && targetId === "analisis") {
        hadDropdown.classList.add("open");
      }

      /* Pertahankan dropdown analisis jika section analisis (hanya saat baru masuk) */
      if (targetId === "analisis" && !isAlreadyAnalisis) {
        setTimeout(() => {
          document.querySelector(".nav-has-dropdown")?.classList.add("open");
        }, 100);
      }

      // Update active nav
      /* Simpan state dropdown sebelum diubah */
      const dropdownOpen = document.querySelector(".nav-has-dropdown.open");

      navItems.forEach((n) => n.classList.remove("active"));
      item.classList.add("active");

      /* Kembalikan state dropdown jika ada */
      if (dropdownOpen) {
        dropdownOpen.classList.add("open");
      }

      // Animasi: sembunyikan section lama, tampilkan baru
      const currentActive = document.querySelector(".section.active");
      if (currentActive && currentActive !== target) {
        currentActive.style.animation = "none";
        currentActive.classList.remove("active");
      }

      target.style.animation = "none";
      // Trigger reflow agar animasi bisa diulang
      void target.offsetWidth;
      target.style.animation = "";
      target.classList.add("active");

      // Scroll ke atas content
      window.scrollTo({ top: 0, behavior: "smooth" });

      // Trigger animasi bar saat masuk section lampiran / misi
      if (targetId === "lampiran" || targetId === "misi") {
        setTimeout(() => animateBars(target), 300);
      }

      // Update URL hash tanpa scroll paksa
      history.replaceState(null, "", "#" + targetId);
    });
  });
}

/* ============================================
   2. ACTIVE NAV BERDASARKAN URL HASH
   ============================================ */
function initActiveNavOnLoad() {
  const hash = window.location.hash.replace("#", "");
  if (!hash) return;

  const targetNav = document.querySelector(`.nav-item[data-section="${hash}"]`);
  if (targetNav) {
    // Simulasikan klik untuk konsistensi
    targetNav.click();
  }
}

/* ============================================
   3. HAMBURGER MENU (MOBILE)
   ============================================ */
function initHamburger() {
  const hamburger = document.getElementById("hamburger");
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("overlay");

  if (!hamburger || !sidebar || !overlay) return;

  hamburger.addEventListener("click", () => {
    const isOpen = sidebar.classList.contains("open");
    if (isOpen) {
      closeSidebarMobile();
    } else {
      openSidebarMobile();
    }
  });

  overlay.addEventListener("click", () => {
    closeSidebarMobile();
  });

  // Tutup sidebar dengan tombol ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeSidebarMobile();
  });
}

function openSidebarMobile() {
  const hamburger = document.getElementById("hamburger");
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("overlay");

  sidebar.classList.add("open");
  overlay.classList.add("show");
  hamburger.classList.add("open");
  hamburger.setAttribute("aria-expanded", "true");
  document.body.style.overflow = "hidden";
}

function closeSidebarMobile() {
  const hamburger = document.getElementById("hamburger");
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("overlay");

  if (!hamburger || !sidebar || !overlay) return;

  sidebar.classList.remove("open");
  overlay.classList.remove("show");
  hamburger.classList.remove("open");
  hamburger.setAttribute("aria-expanded", "false");
  document.body.style.overflow = "";
}

/* ============================================
   4. SCROLL TO TOP BUTTON
   ============================================ */
function initScrollTop() {
  const btn = document.getElementById("scrollTop");
  if (!btn) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 200) {
      btn.classList.add("visible");
    } else {
      btn.classList.remove("visible");
    }
  });

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* ============================================
   5. ANIMASI BAR PROGRESS (NILAI & KOMPETENSI)
   ============================================ */
function initBarAnimations() {
  // Animasikan bar di section yang aktif saat load
  const activeSection = document.querySelector(".section.active");
  if (activeSection) {
    animateBars(activeSection);
  }
}

function animateBars(container) {
  const bars = container.querySelectorAll(".nilai-bar, .komp-bar");
  bars.forEach((bar, i) => {
    // Reset dulu
    bar.style.width = "0";
    bar.style.transition = "none";

    // Delay bertahap
    setTimeout(() => {
      const target =
        getComputedStyle(bar).getPropertyValue("--pct").trim() || "0%";
      bar.style.transition = `width 1s cubic-bezier(0.4,0,0.2,1) ${i * 0.1}s`;
      bar.style.width = target;
    }, 100);
  });
}

/* ============================================
   6. CARD ENTRANCE ANIMATIONS (INTERSECTION OBSERVER)
   ============================================ */
function initCardAnimations() {
  const cards = document.querySelectorAll(
    ".profil-card, .pend-card, .analisis-card, .doc-card, .misi-card, .komp-item, .teach-item, .org-item, .edu-item",
  );

  // Berikan initial state
  cards.forEach((card, i) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(24px)";
    card.style.transition = `opacity 0.5s ease ${(i % 6) * 0.08}s, transform 0.5s ease ${(i % 6) * 0.08}s`;
  });

  if (!("IntersectionObserver" in window)) {
    // Fallback: tampilkan semua
    cards.forEach((card) => {
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -30px 0px",
    },
  );

  cards.forEach((card) => observer.observe(card));
}

/* ============================================
   7. TYPING EFFECT PADA NAMA MAHASISWA
   ============================================ */
function initTypingEffect() {
  const nameEl = document.querySelector(".student-name");
  if (!nameEl) return;

  const originalText = nameEl.textContent.trim();

  // Hanya aktifkan typing effect jika bukan placeholder
  if (originalText.includes("[")) return;

  nameEl.textContent = "";
  nameEl.style.borderRight = "2px solid var(--gold)";
  nameEl.style.paddingRight = "4px";

  let i = 0;
  const speed = 60;

  function type() {
    if (i < originalText.length) {
      nameEl.textContent += originalText.charAt(i);
      i++;
      setTimeout(type, speed);
    } else {
      // Hentikan cursor setelah selesai
      setTimeout(() => {
        nameEl.style.borderRight = "none";
        nameEl.style.paddingRight = "0";
      }, 1000);
    }
  }

  // Delay sedikit sebelum mulai
  setTimeout(type, 600);
}

/* ============================================
   8. TOOLTIP PADA TOMBOL DOKUMEN
   ============================================ */
function initTooltips() {
  const btnDocs = document.querySelectorAll(".btn-doc");

  btnDocs.forEach((btn) => {
    btn.addEventListener("click", function () {
      const isDownload = this.classList.contains("btn-primary");
      const msg = isDownload
        ? "File siap diunduh! Hubungkan dengan path file Anda."
        : "Pratinjau dokumen. Hubungkan dengan viewer Anda.";

      showToast(msg, isDownload ? "success" : "info");
    });
  });
}

/* ============================================
   9. TOAST NOTIFICATION
   ============================================ */
function showToast(message, type = "info") {
  // Hapus toast lama jika ada
  const existing = document.querySelector(".toast-notif");
  if (existing) existing.remove();

  const toast = document.createElement("div");
  toast.className = "toast-notif";

  const icon =
    type === "success"
      ? '<i class="fas fa-check-circle"></i>'
      : '<i class="fas fa-info-circle"></i>';

  toast.innerHTML = `${icon} <span>${message}</span>`;

  // Style inline agar tidak bergantung CSS tambahan
  Object.assign(toast.style, {
    position: "fixed",
    bottom: "90px",
    right: "32px",
    background:
      type === "success"
        ? "linear-gradient(135deg, #4A5240, #2d3328)"
        : "linear-gradient(135deg, #5C3D1E, #3B2A1A)",
    color: "#EDD9B4",
    padding: "12px 20px",
    borderRadius: "4px",
    fontSize: "0.85rem",
    fontFamily: "'Crimson Pro', serif",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    boxShadow: "0 6px 24px rgba(59,42,26,0.3)",
    zIndex: "9999",
    opacity: "0",
    transform: "translateY(10px)",
    transition: "all 0.3s ease",
    border: "1px solid rgba(196,149,106,0.25)",
    maxWidth: "300px",
    lineHeight: "1.4",
  });

  document.body.appendChild(toast);

  // Animasi masuk
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      toast.style.opacity = "1";
      toast.style.transform = "translateY(0)";
    });
  });

  // Auto hilang setelah 3 detik
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(10px)";
    setTimeout(() => toast.remove(), 400);
  }, 3000);
}

/* ============================================
   10. HIGHLIGHT ACTIVE NAV SAAT SCROLL
       (untuk halaman single-page scroll)
   ============================================ */
window.addEventListener(
  "scroll",
  debounce(() => {
    const scrollY = window.scrollY;

    // Tampilkan / sembunyikan scroll-top
    const scrollTopBtn = document.getElementById("scrollTop");
    if (scrollTopBtn) {
      if (scrollY > 200) {
        scrollTopBtn.classList.add("visible");
      } else {
        scrollTopBtn.classList.remove("visible");
      }
    }
  }, 50),
);

/* ============================================
   11. UTILITY: DEBOUNCE
   ============================================ */
function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

/* ============================================
   12. UTILITY: ANIMASI ULANG SAAT GANTI SECTION
   ============================================ */
// Re-observe cards saat section baru aktif
const navItems = document.querySelectorAll(".nav-item");
navItems.forEach((item) => {
  item.addEventListener("click", () => {
    const targetId = item.getAttribute("data-section");
    const target = document.getElementById(targetId);
    if (!target) return;

    // Jalankan ulang animasi card pada section baru
    setTimeout(() => {
      const cards = target.querySelectorAll(
        ".profil-card, .pend-card, .analisis-card, .doc-card, .misi-card, .komp-item, .teach-item, .org-item, .edu-item",
      );

      cards.forEach((card, i) => {
        card.style.opacity = "0";
        card.style.transform = "translateY(24px)";
        card.style.transition = `opacity 0.5s ease ${i * 0.07}s, transform 0.5s ease ${i * 0.07}s`;

        // Trigger reflow
        void card.offsetWidth;

        setTimeout(() => {
          card.style.opacity = "1";
          card.style.transform = "translateY(0)";
        }, 50);
      });

      // Animasikan bar jika ada
      animateBars(target);
    }, 80);
  });
});

/* ============================================
   13. ACTIVE STATE SIDEBAR — HIGHLIGHT CURRENT
   ============================================ */
function setActiveSidebar(sectionId) {
  const navItems = document.querySelectorAll(".nav-item");
  navItems.forEach((n) => {
    n.classList.remove("active");
    if (n.getAttribute("data-section") === sectionId) {
      n.classList.add("active");
    }
  });
}

/* ============================================
   14. KEYBOARD NAVIGATION SUPPORT
   ============================================ */
document.addEventListener("keydown", (e) => {
  // Alt + 1-5 untuk pindah section
  if (e.altKey && e.key >= "1" && e.key <= "5") {
    e.preventDefault();
    const index = parseInt(e.key) - 1;
    const navItems = document.querySelectorAll(".nav-item");
    if (navItems[index]) {
      navItems[index].click();
      navItems[index].focus();
    }
  }
});

/* ============================================
   15. SMOOTH REVEAL UNTUK SECTION HEADER
   ============================================ */
function revealSectionHeader(sectionId) {
  const section = document.getElementById(sectionId);
  if (!section) return;

  const header = section.querySelector(".section-header");
  const badge = section.querySelector(".section-badge");
  const title = section.querySelector(".section-title");
  const line = section.querySelector(".title-line");

  const elements = [badge, title, line].filter(Boolean);
  elements.forEach((el, i) => {
    el.style.opacity = "0";
    el.style.transform = "translateX(-20px)";
    el.style.transition = `opacity 0.5s ease ${i * 0.12}s, transform 0.5s ease ${i * 0.12}s`;

    setTimeout(() => {
      el.style.opacity = "1";
      el.style.transform = "translateX(0)";
    }, 50);
  });
}

// Jalankan reveal header saat nav diklik
document.querySelectorAll(".nav-item").forEach((item) => {
  item.addEventListener("click", () => {
    const sectionId = item.getAttribute("data-section");
    setTimeout(() => revealSectionHeader(sectionId), 50);
  });
});

// Reveal section aktif pertama kali
window.addEventListener("load", () => {
  const activeSection = document.querySelector(".section.active");
  if (activeSection) {
    revealSectionHeader(activeSection.id);

    // Trigger bar animation untuk section awal
    setTimeout(() => animateBars(activeSection), 400);
  }
});

/* ============================================
   16. PROGRESS NILAI — ANIMASI COUNTER ANGKA
   ============================================ */
function animateCounters(container) {
  const scores = container.querySelectorAll(".nilai-score");

  scores.forEach((el) => {
    const text = el.textContent.trim();
    const match = text.match(/(\d+)/);
    if (!match) return;

    const target = parseInt(match[1]);
    const suffix = text.replace(match[1], "");
    let current = 0;
    const duration = 1000;
    const step = Math.ceil(duration / target);

    const timer = setInterval(() => {
      current += 2;
      el.textContent = current + suffix;
      if (current >= target) {
        el.textContent = target + suffix;
        clearInterval(timer);
      }
    }, step);
  });
}

// Jalankan counter saat section lampiran aktif
document.querySelectorAll(".nav-item").forEach((item) => {
  item.addEventListener("click", () => {
    if (item.getAttribute("data-section") === "lampiran") {
      setTimeout(() => {
        const lampiranSection = document.getElementById("lampiran");
        if (lampiranSection) animateCounters(lampiranSection);
      }, 400);
    }
  });
});

/* ============================================
   17. PERUBAHAN ROW — HOVER DETAIL EXPAND
   ============================================ */
document.querySelectorAll(".perubahan-row").forEach((row) => {
  row.style.cursor = "pointer";
  row.addEventListener("click", () => {
    row.classList.toggle("expanded");
    const isExpanded = row.classList.contains("expanded");
    row.style.background = isExpanded ? "rgba(196,149,106,0.15)" : "";
  });
});

/* ============================================
   18. FOTO PLACEHOLDER — KLIK UNTUK UPLOAD
   ============================================ */
document.querySelectorAll(".foto-placeholder").forEach((placeholder) => {
  placeholder.style.cursor = "pointer";

  placeholder.addEventListener("click", () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (ev) => {
        placeholder.style.backgroundImage = `url(${ev.target.result})`;
        placeholder.style.backgroundSize = "cover";
        placeholder.style.backgroundPosition = "center";
        placeholder.style.border = "none";

        // Sembunyikan ikon dan teks
        placeholder.querySelectorAll("i, span").forEach((el) => {
          el.style.display = "none";
        });

        showToast("Foto berhasil diunggah!", "success");
      };
      reader.readAsDataURL(file);
    });

    input.click();
  });

  // Tooltip hint
  placeholder.title = "Klik untuk mengunggah foto";
});

/* ============================================
   19. AVATAR — KLIK UNTUK GANTI FOTO
   ============================================ */
const avatarPlaceholder = document.querySelector(".avatar-placeholder");
if (avatarPlaceholder) {
  avatarPlaceholder.style.cursor = "pointer";
  avatarPlaceholder.title = "Klik untuk mengunggah foto profil";

  avatarPlaceholder.addEventListener("click", () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (ev) => {
        // Buat image element
        const img = document.createElement("img");
        img.src = ev.target.result;
        img.style.cssText = `
          width: 100%; height: 100%;
          object-fit: cover;
          border-radius: 50%;
          position: absolute;
          inset: 0;
        `;

        avatarPlaceholder.style.position = "relative";
        avatarPlaceholder.style.overflow = "hidden";
        avatarPlaceholder.style.padding = "0";

        // Sembunyikan konten lama
        avatarPlaceholder.querySelectorAll("i, p").forEach((el) => {
          el.style.display = "none";
        });

        avatarPlaceholder.appendChild(img);
        showToast("Foto profil berhasil diunggah!", "success");
      };
      reader.readAsDataURL(file);
    });

    input.click();
  });
}

/* ============================================
   20. PRINT / EXPORT HINT
   ============================================ */
// Ctrl+P: tampilkan pesan
document.addEventListener("keydown", (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key === "p") {
    showToast(
      'Tip: Gunakan "Save as PDF" di dialog print browser untuk menyimpan portofolio.',
      "info",
    );
  }
});

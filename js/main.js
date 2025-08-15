// PONTO DE ENTRADA
import { initMenu } from "./modules/menu.js";
import { initTestimonials } from "./modules/testimonials.js";
import { initMap } from "./modules/map.js";
import { initLazyload } from "./modules/lazyload.js";

// ---- utilidades locais
function setFooterYear() {
  const el = document.getElementById("year");
  if (el) el.textContent = new Date().getFullYear();
}

function initSmoothAnchors() {
  document.addEventListener("click", (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute("href");
    if (id && id.length > 1) {
      e.preventDefault();
      const el = document.querySelector(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });

      // fecha menu mobile, se aberto
      const header = document.querySelector(".site-header");
      const toggle = document.getElementById("navToggle");
      if (header?.classList.contains("is-open") && toggle) {
        header.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    }
  });
}

function initWhatsappLinks() {
  const WHATSAPP_NUMBER = "5511975231626";
  const WHATSAPP_MSG = "Olá, gostaria de agendar um horário no Gaucho’s Hair.";
  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    WHATSAPP_MSG
  )}`;

  ["ctaWhatsapp", "waInline", "waFloat"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) {
      el.href = waLink;
      el.target = "_blank";
      el.rel = "noopener";
    }
  });
}

// ---- inicia tudo
function run() {
  setFooterYear();
  initSmoothAnchors();
  initMenu(); // <— ESSENCIAL para o hambúrguer
  initWhatsappLinks();

  // opcionais (se existirem)
  if (typeof initLazyload === "function") initLazyload();
  if (typeof initMap === "function") initMap();
  if (typeof initTestimonials === "function") initTestimonials();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", run);
} else {
  run();
}

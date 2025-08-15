export function initWhatsapp({ phone, message, ctaSelectors = [] }) {
  const link = (msg) =>
    `https://wa.me/${phone.replace(/\D/g, "")}?text=${encodeURIComponent(
      msg || ""
    )}`;

  ctaSelectors.forEach((sel) => {
    const el = document.querySelector(sel);
    if (!el) return;
    el.setAttribute("href", link(message));
  });
}

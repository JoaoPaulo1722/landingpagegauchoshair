export function initLazyload() {
  // Navegadores modernos já suportam loading="lazy".
  // Usamos IntersectionObserver apenas como reforço caso queira animar entrada, etc.
  if (!("IntersectionObserver" in window)) return;

  const lazyImgs = document.querySelectorAll(
    'img[loading="lazy"], iframe[loading="lazy"]'
  );
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          // Poderíamos trocar data-src -> src aqui se usássemos essa técnica.
          el.classList.add("in-view");
          io.unobserve(el);
        }
      });
    },
    { rootMargin: "200px" }
  );

  lazyImgs.forEach((img) => io.observe(img));
}

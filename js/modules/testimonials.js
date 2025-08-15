// js/modules/testimonials.js
export function initTestimonials(opts = {}) {
  const root = document.querySelector("#depoimentos .testimonials");
  if (!root) return;

  const list = root.querySelector("#tsList");
  const prev = root.querySelector(".ts-prev");
  const next = root.querySelector(".ts-next");
  if (!list || !prev || !next) return;

  const src = opts.src || "./data/testimonials.json";
  let items = [];
  let index = 0;
  let timer = null;
  let paused = false;

  const esc = (s = "") =>
    s.replace(
      /[&<>"']/g,
      (m) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        }[m])
    );

  const render = (i) => {
    if (!items.length) return;
    const t = items[i];
    list.innerHTML = `
      <li class="ts-item">
        <blockquote>
          <p>“${esc(t.text)}”</p>
          <footer>— ${esc(t.author)}</footer>
        </blockquote>
      </li>`;
  };

  const go = (dir) => {
    if (!items.length) return;
    index = (index + dir + items.length) % items.length;
    render(index);
  };

  // Controles
  prev.addEventListener("click", () => go(-1));
  next.addEventListener("click", () => go(1));

  // Teclado
  root.tabIndex = 0;
  root.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(-1);
    }
    if (e.key === "ArrowRight") {
      e.preventDefault();
      go(1);
    }
  });

  // Swipe
  let startX = 0;
  root.addEventListener("pointerdown", (e) => {
    startX = e.clientX;
  });
  root.addEventListener("pointerup", (e) => {
    if (!startX) return;
    const dx = e.clientX - startX;
    if (Math.abs(dx) > 30) go(dx < 0 ? 1 : -1);
    startX = 0;
  });

  // Auto-rotate (pausa no hover/foco)
  const start = () => {
    if (timer) clearInterval(timer);
    timer = setInterval(() => {
      if (!paused) go(1);
    }, opts.interval || 6000);
  };
  ["mouseenter", "focusin"].forEach((ev) =>
    root.addEventListener(ev, () => (paused = true))
  );
  ["mouseleave", "focusout"].forEach((ev) =>
    root.addEventListener(ev, () => (paused = false))
  );

  // Carrega dados
  fetch(src)
    .then((r) => (r.ok ? r.json() : Promise.reject()))
    .then((data) => {
      items =
        Array.isArray(data) && data.length
          ? data
          : [
              {
                text: "Atendimento excelente e corte impecável.",
                author: "Cliente Satisfeito",
              },
              {
                text: "Pontualidade e atenção aos detalhes.",
                author: "Cliente",
              },
              {
                text: "Ambiente top e profissionais muito atenciosos.",
                author: "Thiago R.",
              },
            ];
      render(index);
      start();
    })
    .catch(() => {
      items = [
        {
          text: "Atendimento excelente e corte impecável.",
          author: "Cliente Satisfeito",
        },
      ];
      render(index);
    });
}

// Render dinâmico dos serviços (opcional via /data/services.json)
export async function initGallery({ jsonUrl, containerSelector }) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  try {
    const res = await fetch(jsonUrl);
    if (!res.ok) return; // Mantém o fallback estático se não existir JSON
    const items = await res.json();
    if (!Array.isArray(items) || items.length === 0) return;

    container.innerHTML = ""; // limpa fallback
    for (const item of items) {
      const card = document.createElement("article");
      card.className = "card";

      const img = document.createElement("img");
      img.loading = "lazy";
      img.src = item.image || "./assets/img/services/placeholder.jpg";
      img.alt = item.alt || item.name || "Serviço";
      img.width = 640;
      img.height = 400;

      const body = document.createElement("div");
      body.className = "card-body";

      const h3 = document.createElement("h3");
      h3.textContent = item.name || "Serviço";

      const p = document.createElement("p");
      p.textContent = item.description || "";

      body.append(h3, p);
      card.append(img, body);
      container.append(card);
    }
  } catch (err) {
    // Silencioso: mantém fallback
    console.warn("Falha ao carregar serviços:", err);
  }
}

document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("portfolio");
    if (!container || typeof works === "undefined") return;

    works.forEach((work, index) => {
        const card = document.createElement("div");
        card.className = "card";

        // ===== 画像部分 =====
        let imageHtml = "";

        if (work.images && work.images.length > 1) {
            imageHtml = `
                <div class="slider">
                    <img src="${work.images[0]}" alt="${work.title}">
                    <button class="nav prev">‹</button>
                    <button class="nav next">›</button>
                </div>
            `;
        } else {
            imageHtml = `<img src="${work.images?.[0] || ""}" alt="${work.title}">`;
        }

        card.innerHTML = `
            ${imageHtml}
            <div class="card-body">
                <div class="card-title">${work.title}</div>

                <div class="card-actions">
                    <button class="btn toggle">Details</button>
                    ${work.url ? `<a class="visit" href="${work.url}" target="_blank">Visit →</a>` : ""}
                </div>

                <div class="details">
                    <p>${work.description}</p>
                    <div class="tech">
                        ${work.technology.map(t => `<span>${t}</span>`).join("")}
                    </div>
                </div>
            </div>
        `;

        // ===== 詳細トグル =====
        card.querySelector(".toggle").addEventListener("click", () => {
            card.querySelector(".details").classList.toggle("open");
        });

        // ===== スライダー制御 =====
        if (work.images && work.images.length > 1) {
            let current = 0;
            const img = card.querySelector(".slider img");
            const prev = card.querySelector(".prev");
            const next = card.querySelector(".next");

            prev.addEventListener("click", () => {
                current = (current - 1 + work.images.length) % work.images.length;
                img.src = work.images[current];
            });

            next.addEventListener("click", () => {
                current = (current + 1) % work.images.length;
                img.src = work.images[current];
            });
        }

        container.appendChild(card);

        // フェードイン
        setTimeout(() => card.classList.add("show"), index * 120);
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("portfolio");
    if (!container || typeof works === "undefined") return;

    works.forEach((work, index) => {
        const card = document.createElement("div");
        card.className = "card";

        const img = work.images?.[0] || "";

        card.innerHTML = `
            <img src="${img}" alt="${work.title}">
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

        // 詳細トグル
        card.querySelector(".toggle").addEventListener("click", () => {
            card.querySelector(".details").classList.toggle("open");
        });

        container.appendChild(card);

        // フェードイン（遅延）
        setTimeout(() => card.classList.add("show"), index * 120);
    });
});

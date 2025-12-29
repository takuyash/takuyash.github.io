document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("portfolio");
    if (!container || typeof works === "undefined") return;

    // ===== 画像拡大モーダル作成 =====
    const imageModal = (() => {
        const modal = document.createElement("div");
        modal.className = "image-modal";
        modal.innerHTML = `
            <span class="close">×</span>
            <img src="">
        `;
        document.body.appendChild(modal);

        const img = modal.querySelector("img");
        const close = modal.querySelector(".close");

        function hide() {
            modal.classList.remove("show");
        }

        close.addEventListener("click", hide);
        modal.addEventListener("click", (e) => {
            if (e.target === modal) hide();
        });

        return {
            show(src) {
                img.src = src;
                modal.classList.add("show");
            }
        };
    })();

    // ===== カード生成 =====
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

        // ===== スライダー制御 + 拡大 =====
        if (work.images && work.images.length > 1) {
            let current = 0;
            const img = card.querySelector(".slider img");
            const prev = card.querySelector(".prev");
            const next = card.querySelector(".next");

            // 画像クリックで拡大
            img.addEventListener("click", () => {
                imageModal.show(img.src);
            });

            prev.addEventListener("click", (e) => {
                e.stopPropagation();
                current = (current - 1 + work.images.length) % work.images.length;
                img.src = work.images[current];
            });

            next.addEventListener("click", (e) => {
                e.stopPropagation();
                current = (current + 1) % work.images.length;
                img.src = work.images[current];
            });
        } 
        // ===== 単一画像の拡大 =====
        else {
            const img = card.querySelector("img");
            if (img) {
                img.addEventListener("click", () => {
                    imageModal.show(img.src);
                });
            }
        }

        container.appendChild(card);

        // フェードイン
        setTimeout(() => card.classList.add("show"), index * 120);
    });
});

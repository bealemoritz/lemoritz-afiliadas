/* =========================================================
   LE MORITZ AFILIADAS | app.js
   ========================================================= */

/* ---------------------------------------------------------
   CONFIG | edite tudo por aqui, sem mexer no resto do código
   --------------------------------------------------------- */
const CONFIG = {
  // Link do grupo oficial de WhatsApp
  whatsapp: "https://chat.whatsapp.com/FyZgzhBV5OEHzeU23LbeDE",

  // Banco de Refs (sua versão no GitHub, sempre sincronizada)
  banco: "https://bealemoritz.github.io/banco-de-refs/",

  // "O que já ensinamos" | mais recente primeiro
  trainings: [
    { dia: "29", mes: "Mai", titulo: "Ganchos que convertem" },
    { dia: "15", mes: "Mai", titulo: "Qualidade no TikTok Shop" },
  ],

  // Página Produtos | ordem = ordem de exibição
  // videos: link do Google Drive, cole só o ID do arquivo (a parte depois de /d/ e antes de /view)
  // narrativa: sugestão de copy, revise e ajuste como preferir antes de publicar
  products: [
    {
      nome: "Sérum Redutor Instantâneo de Linhas",
      imagem: "assets/produtos/serum.jpg",
      tag: "🔥 Produto estrela no TikTok, +1.400 unidades vendidas/mês",
      narrativa: "Efeito imediato: aplica, espera alguns segundos e já vê a pele mais lisa e uniforme na hora. Ótimo pra um antes e depois rápido em vídeo.",
      videos: [
        { drive: "11-OGzpbikC8l9i1QccNS6uEhY1G_mL2C", titulo: "Ref 1" },
        { drive: "1dnW14WEUZAvEygyohAeGElZrdNsjExaV", titulo: "Ref 2" },
        { drive: "1mlEE1Stvhfyqb4MgR5W2xpvWPPyM1mIt", titulo: "Ref 3" },
      ],
    },
    {
      nome: "Máscara de Cílios",
      imagem: "assets/produtos/mascara-cilios.jpg",
      tag: "🔥 Muito vendido no TikTok",
      narrativa: "Volume e alongamento visível já na primeira aplicação, com uma fórmula que não borra nem escama ao longo do dia. Perfeita pra um close de aplicação e resultado.",
      videos: [
        { drive: "1TMB8BgdjUV6YQ17zcnBv5qHhPIiM2UX-", titulo: "Ref 1" },
        { drive: "15g1YsvjrrKiuw5Dfs2a9J4RweQq4XxPy", titulo: "Ref 2" },
        { drive: "1kzRtSKoMuUMqF3fWOo1xYs5ha9nxmjsi", titulo: "Ref 3" },
      ],
    },
    {
      nome: "Sticks",
      imagem: "assets/produtos/sticks.jpg",
      tag: "",
      narrativa: "Sticks multiuso de blush e iluminador em textura cremosa, aplicação com os dedos, cor na medida certa e efeito de pele iluminada e natural. Ótimo pra conteúdo rápido de make.",
      videos: [
        { drive: "18GlzIHmsFgOLK_5G_YTS4r17T7Oa6AD9", titulo: "Ref 1" },
      ],
    },
    {
      nome: "Pincel 4 em 1",
      imagem: "assets/produtos/pincel-4em1.jpg",
      tag: "",
      narrativa: "Um pincel só que vira quatro: base ampla pra pó e blush, ponta média pra esfumar e ponta fina pra corretivo e detalhes. Menos pincel na nécessaire, mais praticidade pra mostrar no vídeo.",
      videos: [
        { drive: "1qLrnSe9JLjXNuI1ht9ULQE1Aq_2qIQu_", titulo: "Ref 1" },
      ],
    },
  ],
};

/* ---------------------------------------------------------
   Roteamento (mostrar / esconder views)
   --------------------------------------------------------- */
const views = document.querySelectorAll(".view");
const navBtns = document.querySelectorAll(".nav-btn");

function go(id) {
  views.forEach(v => v.classList.toggle("active", v.id === id));
  const inNav = [...navBtns].some(b => b.dataset.go === id);
  navBtns.forEach(b => b.classList.toggle("active", inNav ? b.dataset.go === id : b.dataset.go === "home"));
  document.querySelector(".app").scrollTo({ top: 0 });
  window.scrollTo({ top: 0 });
  history.replaceState(null, "", "#" + id);
}

document.addEventListener("click", e => {
  const el = e.target.closest("[data-go]");
  if (el) { e.preventDefault(); go(el.dataset.go); }
});

/* ---------------------------------------------------------
   Boas-vindas personalizadas via URL  (?nome=Bia)
   --------------------------------------------------------- */
(function personalize() {
  const nome = (new URLSearchParams(location.search).get("nome") || "").trim();
  const g = document.getElementById("greeting");
  if (nome) {
    const p = nome.split(" ")[0];
    const cap = p.charAt(0).toUpperCase() + p.slice(1).toLowerCase();
    g.innerHTML = `Oi, <b>${cap}</b> :)`;
    const title = document.querySelector("#home .page-title");
    if (title) title.textContent = `${cap}, seja bem-vinda ao nosso espaço`;
  }
})();

/* ---------------------------------------------------------
   Links de WhatsApp + Banco de Refs
   --------------------------------------------------------- */
document.querySelectorAll("[data-wpp]").forEach(el => { el.href = CONFIG.whatsapp; });
const wh = document.getElementById("wppHome");
if (wh) wh.href = CONFIG.whatsapp;
const bf = document.getElementById("bancoFrame");
if (bf) bf.src = CONFIG.banco;
const bo = document.getElementById("bancoOpen");
if (bo) bo.href = CONFIG.banco;

/* ---------------------------------------------------------
   Treinamentos | histórico "O que já ensinamos"
   --------------------------------------------------------- */
const hist = document.getElementById("trainingHistory");
if (hist) {
  hist.innerHTML = CONFIG.trainings.map(t => `
    <div class="training-row">
      <div class="tr-date"><b>${t.dia}</b><span>${t.mes}</span></div>
      <div class="tr-info"><h4>${t.titulo}</h4></div>
    </div>`).join("");
}

/* ---------------------------------------------------------
   Produtos | cards com narrativa + vídeos de ref (Google Drive)
   --------------------------------------------------------- */
const productsList = document.getElementById("productsList");
if (productsList) {
  productsList.innerHTML = CONFIG.products.map(p => `
    <div class="product-card">
      <div class="product-head">
        <div class="product-thumb"><img src="${p.imagem}" alt="${p.nome}" onerror="this.parentElement.classList.add('empty')"></div>
        <div class="product-info">
          <h3>${p.nome}</h3>
          ${p.tag ? `<span class="product-tag">${p.tag}</span>` : ""}
          <p class="product-narrativa">${p.narrativa}</p>
        </div>
      </div>
      ${p.comoUsar ? `
      <div class="how-to">
        <button class="how-to-q">${p.comoUsar.titulo}<span class="arrow">⌄</span></button>
        <div class="how-to-a"><ul>${p.comoUsar.passos.map(s => `<li>${s}</li>`).join("")}</ul></div>
      </div>` : ""}
      <div class="product-videos">
        ${p.videos.length ? p.videos.map(v => `
          <div class="video-card">
            <div class="video-frame"><iframe src="https://drive.google.com/file/d/${v.drive}/preview" allow="autoplay" loading="lazy" title="${v.titulo || p.nome}"></iframe></div>
            ${v.titulo ? `<div class="video-label">${v.titulo}</div>` : ""}
          </div>`).join("") : `
          <div class="video-card">
            <div class="video-frame placeholder"><span>Vídeos de ref em breve</span></div>
          </div>`}
      </div>
    </div>`).join("");

  productsList.querySelectorAll(".how-to-q").forEach(q => {
    q.addEventListener("click", () => q.parentElement.classList.toggle("open"));
  });
}

/* ---------------------------------------------------------
   FAQ accordion
   --------------------------------------------------------- */
document.querySelectorAll(".faq-q").forEach(q => {
  q.addEventListener("click", () => q.parentElement.classList.toggle("open"));
});

/* ---------------------------------------------------------
   Abrir na view certa se vier com hash (#refs etc.)
   --------------------------------------------------------- */
if (location.hash) {
  const id = location.hash.slice(1);
  if (document.getElementById(id)) go(id);
}

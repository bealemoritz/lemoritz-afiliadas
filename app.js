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

document.documentElement.classList.add("js");

const menuButton = document.querySelector(".menu-button");
const navigation = document.querySelector("#navegacion");

function setMenuOpen(open) {
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.querySelector("span").textContent = open ? "−" : "+";
  navigation.classList.toggle("menu-open", open);
}

menuButton.hidden = false;
menuButton.addEventListener("click", () => {
  setMenuOpen(menuButton.getAttribute("aria-expanded") !== "true");
});

navigation.addEventListener("click", (event) => {
  if (event.target.closest("a")) setMenuOpen(false);
});

document.querySelector(".site-header").addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
    setMenuOpen(false);
    menuButton.focus();
  }
});

const form = document.querySelector("#mensaje-form");
const service = document.querySelector("#servicio");
const objective = document.querySelector("#objetivo");
const messageBox = document.querySelector("#mensaje-preview");
const draft = document.querySelector("#borrador");
const status = document.querySelector("#mensaje-estado");

const inquiries = {
  gimnasio: "Quisiera información sobre una rutina personalizada para entrenar en gimnasio.",
  casa: "Quisiera información sobre una rutina personalizada para entrenar en casa.",
  alimentacion: "Quisiera información sobre la orientación alimentaria.",
  general: "Quisiera conocer qué asesoría me recomiendas para empezar."
};

function updateDraft() {
  const inquiry = inquiries[service.value];
  if (!inquiry) return;

  const goal = objective.value.trim();
  draft.value = `Hola, Alirio. ${inquiry}${goal ? `\n\nMi objetivo: ${goal}` : ""}\n\n¿Podrías contarme cómo funciona y cuáles son las opciones disponibles?`;
  status.textContent = "";
}

form.hidden = false;
form.addEventListener("input", () => {
  if (!messageBox.hidden) updateDraft();
});

for (const link of document.querySelectorAll("[data-service]")) {
  link.addEventListener("click", () => {
    service.value = link.dataset.service;
    if (!messageBox.hidden) updateDraft();
  });
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  updateDraft();
  messageBox.hidden = false;
  draft.focus();
});

document.querySelector("#copiar-mensaje").addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(draft.value);
    status.textContent = "Mensaje copiado. Abre Instagram y pégalo en el chat.";
  } catch {
    draft.focus();
    draft.select();
    status.textContent = "Seleccionamos el mensaje para que puedas copiarlo.";
  }
});

const videoDialog = document.querySelector("#video-dialog");
const video = videoDialog.querySelector("video");
const videoButton = document.querySelector("#ver-video");

if (typeof videoDialog.showModal === "function") {
  videoButton.hidden = false;
  videoButton.addEventListener("click", () => {
    videoDialog.showModal();
    video.play().catch(() => {});
  });
  videoDialog.addEventListener("close", () => {
    video.pause();
    videoButton.focus();
  });
}

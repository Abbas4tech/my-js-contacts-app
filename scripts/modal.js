import { PWAConsentModalConfig } from "./utils.js";
import { removeErrorMessages } from "./validators.js";

export const closeModalBtnClass = "close-modal";

export function closeModal() {
  const modal = this.closest("dialog");
  removeErrorMessages();
  modal.close();
}

export const openModal = (id) => {
  const dialog = document.getElementById(id);
  dialog.showModal();
};

export function generateModal(modalConfig) {
  const dialog = document.createElement("dialog");
  dialog.id = modalConfig.id;
  dialog.classList.add(`modal-${modalConfig.type}`, "modal");
  dialog.innerHTML = `
  <header class="modal-header ${modalConfig.type}-header">
      <h3 class="modal-heading">${modalConfig.heading}</h3>
  </header>
  <section class="modal-container">
    <p class="modal-description">${modalConfig.description}</p>
  </section>
  <footer class="modal-footer">
    <button id="${modalConfig.submitBtn.id}" class="close-modal btn btn-${modalConfig.submitBtn.type}">${modalConfig.submitBtn.label}</button>
  </footer>
  `;
  const footer = dialog.querySelector("footer");
  if (modalConfig.canCancel) {
    const cancelBtn = document.createElement("button");
    cancelBtn.classList.add("cancel-btn", "btn", "btn-secondary");
    cancelBtn.textContent = "Cancel";
    cancelBtn.addEventListener("click", closeModal);
    footer.prepend(cancelBtn);
  }

  document.body.append(dialog);
}

generateModal(PWAConsentModalConfig);

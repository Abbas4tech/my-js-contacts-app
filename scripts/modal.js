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

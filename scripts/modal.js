export const closeModalBtnClass = "close-modal";

export function closeModal() {
  const modal = this.closest("dialog");
  modal.close();
}

export const openModal = (id) => {
  const dialog = document.getElementById(id);
  dialog.showModal();
};

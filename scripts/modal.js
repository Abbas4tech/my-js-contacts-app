const closeModalBtnClass = "close-modal";

export function closeModal() {
  const modal = this.closest("dialog");
  modal.close();
}

export const openModal = (className) => {
  const dialog = document.getElementsByClassName(className)[0];
  dialog.showModal();
  const closeBtn = dialog.getElementsByClassName(closeModalBtnClass)[0];
  closeBtn.addEventListener("click", closeModal);
};

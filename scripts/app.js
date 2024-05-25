import { openModal } from "./modal.js";

/* -- Global Variables -- */
const addContactFormClass = "add-contact-form";

const addBtn = document.getElementById("add-contact-btn");

const addContactBtnHandler = () => {
  openModal(addContactFormClass);
};

addBtn.addEventListener("click", addContactBtnHandler);

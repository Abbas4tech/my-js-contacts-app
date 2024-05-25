import { addContact } from "./contacts.js";
import { addContactFormId, clearInputs, extractFormValues } from "./form.js";
import { closeModal, openModal } from "./modal.js";

const addBtn = document.getElementById("add-contact-btn");
const addSubmitBtn = document.getElementById("submit-add-btn");
const closeAddContactBtn = document.getElementById("cancel-add-btn");

const addContactBtnHandler = () => {
  openModal(addContactFormId);
};

function addContactSubmitHandler() {
  const formData = extractFormValues.call(this);
  addContact(formData);
  closeModal.call(this);
  clearInputs.call(this);
}

function closeAddContactModalHandler() {
  clearInputs.call(this);
  closeModal.call(this);
}

addBtn.addEventListener("click", addContactBtnHandler);
addSubmitBtn.addEventListener("click", addContactSubmitHandler);
closeAddContactBtn.addEventListener("click", closeAddContactModalHandler);

import { addContact } from "./contacts.js";
import { clearInputs, extractFormValues } from "./form.js";
import { addContactFormConfig } from "./utils.js";
import { closeModal, openModal } from "./modal.js";

const addBtn = document.getElementById("add-contact-btn");
const addSubmitBtn = document.getElementById("submit-add-btn");
const closeAddContactBtn = document.getElementById("cancel-add-btn");

const addContactBtnHandler = () => {
  openModal(addContactFormConfig.id);
};

function addContactSubmitHandler() {
  const formData = extractFormValues.call(this);
  console.log(formData);
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

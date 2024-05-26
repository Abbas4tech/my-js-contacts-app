import { addContact } from "./contacts.js";
import { clearInputs, extractFormValues } from "./form.js";
import { addContactFormConfig, editContactFormConfig } from "./utils.js";
import { closeModal, openModal } from "./modal.js";

const addBtn = document.getElementById("add-contact-btn");
const addSubmitBtn = document.getElementById(addContactFormConfig.submitBtn.id);
const closeAddContactBtn = document.getElementById(
  addContactFormConfig.cancelBtn.id
);
const closeEditContactBtn = document.getElementById(
  editContactFormConfig.cancelBtn.id
);

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

function closeModalHandler() {
  clearInputs.call(this);
  closeModal.call(this);
}

addBtn.addEventListener("click", addContactBtnHandler);
addSubmitBtn.addEventListener("click", addContactSubmitHandler);
closeAddContactBtn.addEventListener("click", closeModalHandler);
closeEditContactBtn.addEventListener("click", closeModalHandler);

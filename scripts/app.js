import { addContact, updateContact } from "./contacts.js";
import { clearInputs, extractFormValues } from "./form.js";
import { addContactFormConfig, editContactFormConfig } from "./utils.js";
import { closeModal, openModal } from "./modal.js";
import { registerServiceWorker } from "./service-worker.js";
import { validateForm } from "./validators.js";

const addBtn = document.getElementById("add-contact-btn");
const addSubmitBtn = document.getElementById(addContactFormConfig.submitBtn.id);
const closeAddContactBtn = document.getElementById(
  addContactFormConfig.cancelBtn.id
);
const closeEditContactBtn = document.getElementById(
  editContactFormConfig.cancelBtn.id
);
const submitEditContactBtn = document.getElementById(
  editContactFormConfig.submitBtn.id
);

const addContactBtnHandler = () => {
  openModal(addContactFormConfig.id);
};

function handleSubmitContact(mode = "add") {
  const formData = extractFormValues.call(this);
  const config = mode === "add" ? addContactFormConfig : editContactFormConfig;
  const isValidForm = validateForm.call(this, config);
  if (isValidForm) {
    formData.id =
      mode === "add"
        ? Math.random()
        : +this.closest("dialog").getAttribute("data-contact-id");
    console.log(formData);
    mode === "add" ? addContact(formData) : updateContact(formData);
    closeModal.call(this);
    clearInputs.call(this);
  }
}

function closeModalHandler() {
  clearInputs.call(this);
  closeModal.call(this);
}

addBtn.addEventListener("click", addContactBtnHandler);
addSubmitBtn.addEventListener(
  "click",
  handleSubmitContact.bind(addSubmitBtn, "add")
);
closeAddContactBtn.addEventListener("click", closeModalHandler);
closeEditContactBtn.addEventListener("click", closeModalHandler);
submitEditContactBtn.addEventListener(
  "click",
  handleSubmitContact.bind(submitEditContactBtn, "edit")
);
registerServiceWorker();

import { setFormDataInFields } from "./form.js";
import { openModal } from "./modal.js";
import { editContactFormConfig } from "./utils.js";

const contactListId = "contact-list";

let contacts = [];

export const addContact = (formdata) => {
  if (!formdata) return;
  contacts.push(formdata);
  const contactList = document.getElementById(contactListId);
  const contactCard = createContactCard(formdata);
  contactList.append(contactCard);
  contactCard
    .querySelector(".edit-contact-btn")
    .addEventListener("click", editContactBtnClickHandler);
  contactCard
    .querySelector(".delete-contact-btn")
    .addEventListener("click", deleteContactClickHandler);
  localStorage.setItem("contacts", JSON.stringify(contacts));
};

export const deleteContact = (id) => {
  const contact = contacts.find((contact) => contact.id === id);
  const contactCard = document.getElementById(`id-${id}`);
  contactCard.remove();
  contacts.splice(contacts.indexOf(contact), 1);
};

export const updateContact = (formData) => {
  const previousContactInfo = contacts.find(
    (contact) => contact.id === formData.id
  );
  const contactPresentAt = contacts.indexOf(previousContactInfo);
  const contactCard = document.getElementById(`id-${previousContactInfo.id}`);
  for (const key in formData) {
    const tag = contactCard.querySelector(
      `p.user-info-item-${key}[data-info=${key}]`
    );
    if (tag) tag.textContent = `${key}: ${formData[key]}`;
  }
  contacts.splice(contactPresentAt, 1, formData);
  localStorage.setItem("contacts", JSON.stringify(contacts));
};

export const createContactCard = (contact) => {
  const contactCard = document.createElement("li");
  contactCard.classList.add("contact-item");
  contactCard.id = `id-${contact.id}`;
  contactCard.innerHTML = `
    <section class="user-image">
      <img
        src="https://api.dicebear.com/8.x/avataaars-neutral/svg"
        alt="${contact.firstname}"
      />
    </section>
    <div class="user-data">
      <div class="user-info">
      </div>
      <footer>
        <button id="edit-btn" data-contact-id="${contact.id}" class="btn btn-secondary edit-contact-btn">Edit</button>
        <button data-contact-id="${contact.id}" class="btn btn-secondary delete-contact-btn">Delete</button>
      </footer>
    </div>
  `;

  const userInfo = contactCard.querySelector(".user-info");
  for (const key in contact) {
    if (key !== "id") {
      const tag = document.createElement("p");
      tag.className = `user-info-item-${key}`;
      tag.setAttribute("data-info", key);
      tag.textContent = `${key}: ${contact[key]}`;
      userInfo.append(tag);
    }
  }
  return contactCard;
};

function editContactBtnClickHandler() {
  const id = +this.getAttribute("data-contact-id");
  const editContactData = contacts.find((contact) => contact.id === id);
  setFormDataInFields(editContactData);
  openModal(editContactFormConfig.id);
  document
    .querySelector(`dialog#${editContactFormConfig.id}`)
    .setAttribute("data-contact-id", id);
}

function deleteContactClickHandler() {
  const id = +this.getAttribute("data-contact-id");
  deleteContact(id);
  localStorage.setItem("contacts", JSON.stringify(contacts));
}

export const refreshContacts = () => {
  const contactList = document.getElementById(contactListId);
  contactList.innerHTML = "";
  contacts.map((contact) => {
    const contactCard = createContactCard(contact);
    contactList.append(contactCard);
  });
  Array.from(document.getElementsByClassName("edit-contact-btn")).forEach(
    (btn) => btn.addEventListener("click", editContactBtnClickHandler)
  );
  Array.from(document.getElementsByClassName("delete-contact-btn")).forEach(
    (contact) => contact.addEventListener("click", deleteContactClickHandler)
  );
};

if (JSON.parse(localStorage.getItem("contacts"))) {
  contacts = JSON.parse(localStorage.getItem("contacts"));
  refreshContacts();
}

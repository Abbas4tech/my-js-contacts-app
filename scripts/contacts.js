import { setFormDataInFields } from "./form.js";
import { openModal } from "./modal.js";
import { editContactFormConfig } from "./utils.js";

const contactListId = "contact-list";

let contacts = [];

export function addContact(formdata) {
  if (!formdata) return;
  contacts.push(formdata);
  localStorage.setItem("contacts", JSON.stringify(contacts));
  refreshContacts();
}

export function updateContact(formData) {
  const previousContactInfo = contacts.find(
    (contact) => contact.id === formData.id
  );
  console.log(previousContactInfo, formData);
}

export const createContactCard = (contact) => {
  const contactCard = document.createElement("li");
  contactCard.classList.add("contact-item");
  contactCard.id = contact.id;
  contactCard.innerHTML = `
    <section class="user-image">
      <img
        src="https://api.dicebear.com/8.x/avataaars-neutral/svg"
        alt="${contact.firstname}"
      />
    </section>
    <div class="user-data">
      <p>Name: ${contact.firstname} ${contact.lastname}</p>
      <p>Email: ${contact.email}</p>
      <p>Phone: ${contact.phone}</p>
      <p class="status ${contact.status}">Status: ${contact.status}</p>
      <footer>
        <button id="edit-btn" data-contact-id="${contact.id}" class="btn btn-secondary edit-contact-btn">Edit</button>
        <button class="btn btn-secondary">Delete</button>
      </footer>
    </div>
  `;

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

export function refreshContacts() {
  const contactList = document.getElementById(contactListId);
  contactList.innerHTML = "";
  contacts.map((contact) => {
    const contactCard = createContactCard(contact);
    contactList.append(contactCard);
  });
  Array.from(document.getElementsByClassName("edit-contact-btn")).forEach(
    (btn) => btn.addEventListener("click", editContactBtnClickHandler)
  );
}

if (JSON.parse(localStorage.getItem("contacts"))) {
  contacts = JSON.parse(localStorage.getItem("contacts"));
  refreshContacts();
}

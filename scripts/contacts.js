const contactListId = "contact-list";

const contacts = [];

export function addContact(formdata) {
  if (!formdata) return;
  contacts.push(formdata);
  refreshContacts();
}




export function refreshContacts() {
  const contactList = document.getElementById(contactListId);
  contactList.innerHTML = "";
  contacts.map((contact) => {
    const contactCard = document.createElement("li");
    contactCard.innerHTML = `
      <h4>${contact.firstname}</h4>
      <h4>${contact.lastname}</h4>
      <h4>${contact.email}</h4>
      <h4>${contact.phone}</h4>
      `;

    contactList.append(contactCard);
  });
}

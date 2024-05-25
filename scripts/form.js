import { addContactFormConfig } from "./utils";

export const addContactFormId = "add-contact-form";

export function extractFormValues() {
  if (!this) return {};
  const addContactForm = this.closest("dialog");
  const inputs = addContactForm.getElementsByTagName("input");
  const data = Array.from(inputs).reduce((pre, cur) => {
    if (cur.type === "radio") {
      if (cur.checked) pre[cur.name] = cur.getAttribute("aria-labelledby");
      else return pre;
    } else {
      pre[cur.getAttribute("aria-labelledby")] = cur.value;
    }
    return pre;
  }, {});
  return data;
}

const generateForm = (config) => {
  const dialog = document.createElement("dialog");
  dialog.id = config.id;
  const formParentContainer = document.createElement("section");
  formParentContainer.classList.add("form");
  const fields = [...config.fields];
  if (!fields) {
    return;
  }
  fields.map((field) => {
    if (field.fieldType === "single") {
      const formBlock = document.createElement("div");
      formBlock.classList.add("form-block");
      if (field.label) {
        const label = document.createElement("label");
        label.for = field.name;
        label.textContent = field.label;
        formBlock.append(label);
      }
      if (field.type) {
        const input = document.createElement("input");
        input.type = field.type;
        input.ariaLabelledBy = field.name;
        input.placeholder = field.placeholder || "";
        formBlock.append(input);
      }
      formParentContainer.append(formBlock);
    }
  });
};

export function clearInputs() {
  const modal = this.closest("dialog");
  Array.from(modal.getElementsByTagName("input")).forEach((input) => {
    if (input.type === "radio") {
      input.checked = false;
    } else {
      input.value = "";
    }
  });
}

generateForm(addContactFormConfig);

import { addContactFormConfig } from "./utils.js";

export const addContactFormId = "add-contact-form";

export function extractFormValues() {
  if (!this) return {};
  const addContactForm = this.closest("dialog");
  const inputs = addContactForm.getElementsByTagName("input");
  const data = Array.from(inputs).reduce((pre, cur) => {
    if (cur.type === "radio") {
      if (cur.checked) pre[cur.name] = cur.getAttribute("aria-label");
      else return pre;
    } else {
      pre[cur.getAttribute("aria-label")] = cur.value;
    }
    return pre;
  }, {});
  data.id = Math.random();
  return data;
}

const createLabel = (text, htmlFor) => {
  const label = document.createElement("label");
  label.htmlFor = htmlFor;
  label.textContent = text;
  return label;
};

const createInput = (type, name, placeholder = "", fieldSetname) => {
  const input = document.createElement("input");
  input.type = type;
  input.name = name;
  input.setAttribute("aria-label", type === "radio" ? fieldSetname : name);
  input.placeholder = placeholder;
  return input;
};

const createFormBlock = (labelText, inputType, inputName, placeholder) => {
  const formBlock = document.createElement("div");
  formBlock.classList.add("form-block");
  if (labelText) formBlock.append(createLabel(labelText, inputName));
  formBlock.append(
    createInput(inputType, inputName, placeholder, labelText.toLowerCase())
  );
  return formBlock;
};

const generateForm = (config) => {
  const dialog = document.createElement("dialog");
  dialog.id = config.id;

  const formParentContainer = document.createElement("section");
  formParentContainer.classList.add("form");

  config.fields?.forEach((field) => {
    if (field.fieldType === "single") {
      formParentContainer.append(
        createFormBlock(field.label, field.type, field.name, field.placeholder)
      );
    } else if (field.fieldType === "group") {
      const formGroup = document.createElement("div");
      formGroup.classList.add("form-group");
      if (field.label) formGroup.append(createLabel(field.label, field.name));

      field.fieldSets?.forEach((fieldSet) => {
        formGroup.append(
          createFormBlock(fieldSet.label, field.type, field.name)
        );
      });
      formParentContainer.append(formGroup);
    }
  });

  const footer = document.createElement("footer");
  footer.innerHTML = `
    <button id="${config.cancelBtn.id}" class="close-modal btn btn-secondary">${config.cancelBtn.label}</button>
    <button id="${config.submitBtn.id}" class="btn">${config.submitBtn.label}</button>
  `;
  formParentContainer.append(footer);

  dialog.append(formParentContainer);
  document.body.append(dialog);
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

import { addContactFormConfig, editContactFormConfig } from "./utils.js";
import { removeErrorMessages, showValidationError } from "./validators.js";

export const addContactFormId = "add-contact-form";

export function extractFormValues() {
  if (!this) return {};
  const form = this.closest("dialog");
  const inputs = form.getElementsByTagName("input");
  const data = Array.from(inputs).reduce((pre, cur) => {
    if (cur.type === "radio") {
      if (cur.checked) pre[cur.name] = cur.getAttribute("aria-label");
      else return pre;
    } else {
      pre[cur.getAttribute("aria-label")] = cur.value;
    }
    return pre;
  }, {});
  return data;
}

const createLabel = (text, htmlFor) => {
  const label = document.createElement("label");
  label.htmlFor = htmlFor;
  label.classList.add("form-label");
  label.textContent = `${text} :`;
  return label;
};

export function setFormDataInFields(formData) {
  const editForm = document.getElementById(editContactFormConfig.id);
  Array.from(editForm.getElementsByTagName("input")).forEach((input) => {
    if (formData.hasOwnProperty(input.name) && input.type !== "radio") {
      input.value = formData[input.name];
    } else {
      formData[input.name] === input.ariaLabel ? (input.checked = true) : null;
    }
  });
}

const createErrorLabel = (name) => {
  const errorLabel = document.createElement("label");
  errorLabel.htmlFor = name;
  errorLabel.classList.add("d-none", "error");
  return errorLabel;
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
      const formBlock = createFormBlock(
        field.label,
        field.type,
        field.name,
        field.placeholder
      );
      formParentContainer.append(formBlock);
      if (field.required) {
        const errorSpan = createErrorLabel(field.name);
        formBlock.append(errorSpan);
      }
    } else if (field.fieldType === "group") {
      const formGroup = document.createElement("div");
      formGroup.classList.add("form-group");
      if (field.label) formGroup.append(createLabel(field.label, field.name));

      field.fieldSets?.forEach((fieldSet) => {
        formGroup.append(
          createFormBlock(fieldSet.label, field.type, field.name)
        );
      });
      if (field.required) {
        const errorSpan = createErrorLabel(field.name);
        formGroup.append(errorSpan);
      }
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

export function validateForm(config) {
  let formIsValid = false;
  const form = this.closest("dialog");

  if (!config) {
    return formIsValid;
  }
  removeErrorMessages();
  const inputs = Array.from(form.getElementsByTagName("input"));
  const formValidatorsArray = [];
  inputs.forEach((input) => {
    const fieldConfig = config.fields.find(
      (field) => field.name === input.name
    );
    const validationListForAField = [];
    const fieldValidators = fieldConfig.validator;
    if (
      fieldValidators &&
      fieldConfig.required &&
      fieldConfig.fieldType === "single"
    ) {
      let result = false;
      fieldValidators.forEach(({ func, message }) => {
        result = func.call(input);
        if (!result) showValidationError(input, message);
        validationListForAField.push(result);
      });
      formValidatorsArray.push(validationListForAField);
    } else {
      let result = false;
      fieldValidators.forEach(({ func, message }) => {
        result = func.call(input);
        if (result) {
          validationListForAField.push(result);
        } else {
          showValidationError(input, message);
          validationListForAField.push(result);
        }
      });
      formValidatorsArray.push(validationListForAField);
    }
  });
  formIsValid = formValidatorsArray.flat(Infinity).every((e) => e === true);
  return formIsValid;
}

generateForm(addContactFormConfig);
generateForm(editContactFormConfig);

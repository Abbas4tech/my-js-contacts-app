export const VALIDATORS = {
  required: function () {
    const isValid = this.value.trim().length > 0;
    return isValid;
  },
  maxNumberAllowed: function () {
    const isNumbersOnly = !isNaN(Number(this.value));
    if (!isNumbersOnly) return false;
    const isValid = this.value.trim().length === 10;
    return isValid;
  },
  requiredWithRadio: function () {
    const radios = Array.from(
      this.closest(".form-group").querySelectorAll("input[type='radio']")
    );
    return radios.some((radio) => radio.checked);
  },
};

const showValidationError = (inputElement, message) => {
  const errorSpan = inputElement.nextElementSibling;
  if (errorSpan && inputElement.type !== "radio") {
    errorSpan.textContent = message;
    errorSpan.classList.remove("d-none");
  } else {
    const group = inputElement.closest(".form-group");
    const span = group.querySelector("label.error");
    span.textContent = message;
    span.classList.remove("d-none");
  }
};

const removeErrorMessages = () =>
  document
    .querySelectorAll("label.error")
    .forEach((node) => node.classList.add("d-none"));

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

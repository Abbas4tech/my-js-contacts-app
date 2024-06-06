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
};

const showValidationError = (inputElement, message) => {
  const errorSpan = inputElement.nextElementSibling;
  errorSpan.textContent = message;
  errorSpan.classList.remove("d-none");
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
      fieldConfig.type !== "radio"
    ) {
      let result = false;
      fieldValidators.forEach(({ func, message }) => {
        result = func.call(input);
        console.log(result, message);
        if (!result) showValidationError(input, message);
        validationListForAField.push(result);
      });
      formValidatorsArray.push(validationListForAField);
    }
  });
  formIsValid = formValidatorsArray.flat(Infinity).every((e) => e === true);
  console.log(formIsValid, formValidatorsArray.flat(Infinity));
  return formIsValid;
}

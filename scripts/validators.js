export const VALIDATORS = {
  required: function () {
    const isValid = this.value.trim().length > 0;
    return isValid;
  },
};

const createErrorNode = (fieldConfig) => {
  const span = document.createElement("span");
  span.style.display = "block";
  span.classList.add("error");
  span.for = fieldConfig.name;
  return span;
};

const removeErrorMessages = () =>
  document
    .querySelectorAll("span.error")
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
      fieldValidators.forEach((validator) => {
        result = validator.call(input);
        validationListForAField.push(result);
      });
      formValidatorsArray.push(validationListForAField);
    }
  });
  formIsValid = formValidatorsArray.flat(Infinity).every((e) => e === true);
  console.log(formIsValid, formValidatorsArray.flat(Infinity));
  return formIsValid;
}

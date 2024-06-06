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

export const showValidationError = (inputElement, message) => {
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

export const removeErrorMessages = () =>
  document
    .querySelectorAll("label.error")
    .forEach((node) => node.classList.add("d-none"));

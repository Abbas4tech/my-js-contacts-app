export const addContactFormId = "add-contact-form";

export function extractFormValues() {
  if (!this) return {};
  const addContactForm = this.closest("dialog");
  const inputs = addContactForm.getElementsByTagName("input");
  const data = Array.from(inputs).reduce((pre, cur) => {
    pre[cur.getAttribute("aria-labelledby")] = cur.value;
    return pre;
  }, {});
  return data;
}

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

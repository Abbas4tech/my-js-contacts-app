import { VALIDATORS } from "./validators.js";

export const convertLastWordToSmall = (str) => {
  const words = str.split(" ");
  if (words.length === 1) {
    return str;
  }
  const lastWord = words[words.length - 1];
  words[words.length - 1] =
    lastWord.charAt(0).toLowerCase() + lastWord.slice(1);
  return words.join(" ");
};

export const addContactFormConfig = {
  name: "add-contact",
  id: "add-contact-form",
  cancelBtn: {
    id: "cancel-add-btn",
    label: "Cancel",
  },
  submitBtn: {
    id: "submit-add-btn",
    label: "Submit",
  },
  fields: [
    {
      name: "firstname",
      label: "First Name",
      required: true,
      validator: [],
      type: "text",
      placeholder: "Enter your first name",
      fieldType: "single",
    },
    {
      name: "lastname",
      label: "Last Name",
      required: true,
      validator: [],
      type: "text",
      placeholder: "Enter your last name",
      fieldType: "single",
    },
    {
      name: "phone",
      label: "Phone Number",
      required: true,
      validator: [
        {
          func: VALIDATORS.maxNumberAllowed,
          message: "Phone Should be of 10 Digits only",
        },
      ],
      type: "number",
      placeholder: "Enter your phone number",
      fieldType: "single",
    },
    {
      name: "email",
      label: "Email",
      required: true,
      validator: [],
      type: "email",
      placeholder: "Enter your last name",
      fieldType: "single",
    },
    {
      name: "status",
      label: "",
      required: true,
      validator: [],
      type: "radio",
      fieldType: "group",
      fieldSets: [
        {
          name: "active",
          label: "Active",
        },
        {
          name: "inactive",
          label: "Inactive",
        },
      ],
    },
  ],
};

export const editContactFormConfig = {
  name: "edit-contact",
  id: "edit-contact-form",
  cancelBtn: {
    id: "cancel-edit-btn",
    label: "Cancel",
  },
  submitBtn: {
    id: "submit-edit-btn",
    label: "Edit",
  },
  fields: [...addContactFormConfig.fields],
};

export const PWAConsentModalConfig = {
  id: "pwa-modal-config-modal",
  type: "info",
  heading: "Install Our App!",
  description: "Install this app on your device for a better experience.",
  submitBtn: {
    label: "Install",
    id: "pwa-install-btn",
    type: "primary",
  },
  canCancel: false,
};

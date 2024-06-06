import { VALIDATORS } from "./validators.js";
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
      validator: [
        {
          func: VALIDATORS.required,
          message: "First name is required",
        },
      ],
      type: "text",
      placeholder: "Enter your first name",
      fieldType: "single",
    },
    {
      name: "lastname",
      label: "Last Name",
      required: true,
      validator: [
        {
          func: VALIDATORS.required,
          message: "Last name is required",
        },
      ],
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
        {
          func: VALIDATORS.required,
          message: "Phone Number is required",
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
      validator: [
        {
          func: VALIDATORS.required,
          message: "Email is required",
        },
      ],
      type: "email",
      placeholder: "Enter your last name",
      fieldType: "single",
    },
    {
      name: "status",
      label: "",
      required: true,
      validator: [
        {
          func: VALIDATORS.requiredWithRadio,
          message: "Please select status of contact",
        },
      ],
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

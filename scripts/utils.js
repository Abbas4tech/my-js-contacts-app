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
      validator: [VALIDATORS.required],
      errorMessage: "First name is required",
      type: "text",
      placeholder: "Enter your first name",
      fieldType: "single",
    },
    {
      name: "lastname",
      label: "Last Name",
      required: true,
      validator: [VALIDATORS.required],
      errorMessage: "Last name is required",
      type: "text",
      placeholder: "Enter your last name",
      fieldType: "single",
    },
    {
      name: "phone",
      label: "Phone Number",
      required: true,
      validator: [VALIDATORS.required],
      errorMessage: "Phone number is required",
      type: "number",
      placeholder: "Enter your phone number",
      fieldType: "single",
    },
    {
      name: "email",
      label: "Email",
      required: true,
      validator: [VALIDATORS.required],
      errorMessage: "Last name is required",
      type: "email",
      placeholder: "Enter your last name",
      fieldType: "single",
    },
    {
      name: "status",
      label: "",
      required: true,
      validator: [VALIDATORS.required],
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

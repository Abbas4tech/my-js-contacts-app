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
      errorMessage: "First name is required",
      type: "text",
      placeholder: "Enter your first name",
      fieldType: "single",
    },
    {
      name: "lastname",
      label: "Last Name",
      required: true,
      errorMessage: "Last name is required",
      type: "text",
      placeholder: "Enter your last name",
      fieldType: "single",
    },
    {
      name: "phone",
      label: "Phone Number",
      required: true,
      errorMessage: "Phone number is required",
      type: "number",
      placeholder: "Enter your phone number",
      fieldType: "single",
    },
    {
      name: "email",
      label: "Email",
      required: true,
      errorMessage: "Last name is required",
      type: "text",
      placeholder: "Enter your last name",
      fieldType: "single",
    },
    {
      name: "status",
      label: "",
      required: true,
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

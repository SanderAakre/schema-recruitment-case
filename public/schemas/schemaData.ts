import type { SchemaData } from "../../src/types";

const schemaData: SchemaData = {
  title: "Example Schema",
  subText: "This is an example schema to demonstrate the form generation.",
  page: [
    {
      fieldGroup: [
        {
          name: "personalInfo",
          label: "Personal Information",
          collapsable: true,
          startCollapsed: false,
        },
        {
          name: "preferences",
          label: "Preferences",
        },
      ],
      fields: [
        {
          name: "username",
          type: "text",
          label: "Username",
          groupName: "personalInfo",
          placeholder: "Enter your username",
          defaultValue: "",
          validationConditions: {
            required: true,
            requiredErrorText: "Username is required",
            minValue: 3,
            minValueErrorText: "Username must be at least 3 characters long",
            forbiddenCharacters: [" ", "@", "#"],
            forbiddenCharactersErrorText: "Username cannot contain spaces or special characters",
          },
        },
        {
          name: "age",
          type: "number",
          label: "Age",
          groupName: "personalInfo",
          placeholder: "Enter your age",
          defaultValue: 18,
          validationConditions: {
            required: true,
            minValue: 0,
            maxValue: 120,
            minValueErrorText: "Age must be a positive number",
            maxValueErrorText: "Age cannot exceed 120",
          },
        },
        {
          name: "email",
          type: "text",
          label: "Email Address",
          groupName: "personalInfo",
          placeholder: "Enter your email address",
          validationConditions: {
            regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            regexErrorText: "Please enter a valid email address",
          },
        },
        {
          name: "subscribe",
          type: "boolean",
          label: "Subscribe to newsletter",
          groupName: "preferences",
          defaultValue: false,
        },
        {
          name: "country",
          type: "select",
          label: "Country",
          groupName: "personalInfo",
          optionsUrl: "/data/countries.json",
          defaultValue: "USA",
        },
      ],
    },
  ],
  submitSettings: {
    submitText: "Fullfør skjemainnsending",
    successMessage: "Ditt svar er registrert!",
    confirmation: {
      title: "Bekreft innsending",
      subText: "Er du sikker på at du vil sende inn skjemaet?",
      confirmButton: "Ja, send inn",
      cancelButton: "Avbryt",
    },
  },
};

export default schemaData;

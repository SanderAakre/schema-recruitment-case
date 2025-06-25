import type { SchemaData } from "../../src/types";

const schemaData: SchemaData = {
  title: "Example Schema",
  subText: "This is an example schema to demonstrate the form generation.",
  globalPageButtonSettings: {
    nextPageButton: {
      text: "Neste side",
    },
    previousPageButton: {
      text: "Forrige side",
    },
  },
  pages: [
    {
      name: "examplePage 1",
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
        },
      ],
    },
    {
      name: "examplePage 2",
      fieldGroup: [
        {
          name: "feedback",
          label: "Feedback",
          collapsable: true,
          startCollapsed: true,
        },
      ],
      fields: [
        {
          name: "satisfaction",
          type: "select",
          label: "Satisfaction Level",
          groupName: "feedback",
          options: ["Very Satisfied", "Satisfied", "Neutral", "Dissatisfied", "Very Dissatisfied"],
          defaultValue: "Neutral",
        },
        {
          name: "comments",
          type: "text",
          label: "Additional Comments",
          groupName: "feedback",
          placeholder: "Enter your comments here...",
          validationConditions: {
            maxValue: 500,
            maxValueErrorText: "Comments cannot exceed 500 characters",
          },
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

import type { SchemaData } from "@/types";

const schemaData: SchemaData = {
  title: "Eksempelskjema",
  subText: "Dette er et eksempelskjema som viser de ulike felttypene og funksjonene som kan konfigureres gjennom JSON data.",
  nextPageButton: {
    text: "Neste side",
  },
  previousPageButton: {
    text: "Forrige side",
  },
  submitButton: {
    text: "Send inn skjema",
    confirmation: {
      title: "Bekreft innsending",
      subText: "Er du sikker på at du vil sende inn skjemaet?",
      confirmButton: "Ja, send inn",
      cancelButton: "Avbryt",
    },
  },
  successMessage: "Ditt svar er registrert!",
  errorMessage: "En feil oppstod under innsending av skjemaet.",
  pages: [
    {
      name: "Side 1",
      title: "Sidetittel",
      subText: "Denne siden inneholder eksempler på enkle felttyper, grupperte felter og deres diverse hjelpetekster.",
      fieldGroups: [
        {
          name: "Gruppe 1-1",
          title: "Grupperte Felter",
          subText: {
            text: "Felter som er gruppert sammen har mindre plass mellom seg.",
            helpText: "Dette kan overstyres med gapSize på gruppen.",
          },
        },
        {
          name: "Gruppe 1-2",
          title: "Sammenleggbar Gruppe",
          subText: "Denne gruppen kan foldes sammen for å spare plass.",
          collapsable: true,
        },
      ],
      fields: [
        {
          name: "tekstFelt1",
          label: "Tekstfelt",
          placeholder: "Skriv noe her...",
        },
        {
          name: "tekstFelt2",
          type: "text",
          noLabel: true,
          title: {
            text: "Tittel for tekstfelt",
            helpText: "Hjelpetekst for tittelen",
          },
          subText: {
            text: "Dette er en undertekst for tekstfeltet.",
            helpText: "Hjelpetekst for undertekst",
          },
          placeholder: "Skriv noe annet her...",
          description: "Beskrivelse for tekstfeltet.",
        },
        {
          name: "gruppe1Felt1",
          type: "text",
          label: "Tekstfelt 1 i en gruppe",
          groupName: "Gruppe 1-1",
        },
        {
          name: "gruppe1Felt2",
          type: "text",
          label: "Tekstfelt 2 i en gruppe",
          groupName: "Gruppe 1-1",
        },
        {
          name: "gruppe1Felt3",
          type: "text",
          label: "Tekstfelt 3 i en gruppe",
          groupName: "Gruppe 1-1",
        },
        {
          name: "gruppe2Felt1",
          type: "text",
          label: "Tekstfelt 1 i sammenleggbar gruppe",
          groupName: "Gruppe 1-2",
        },
        {
          name: "gruppe2Felt2",
          type: "text",
          label: "Tekstfelt 2 i sammenleggbar gruppe",
          groupName: "Gruppe 1-2",
        },
        {
          name: "kommentarFelt1",
          type: "comment",
          title: "Kommentar",
          noLabel: true,
          placeholder: "Skriv en kommentar...",
        },
        {
          name: "tallFelt1",
          type: "number",
          label: "Tallfelt",
          placeholder: "Skriv et tall...",
        },
        {
          name: "sjekkBoks1",
          type: "checkbox",
          label: "Sjekkboks",
        },
      ],
    },
    {
      name: "Side 2",
      title: "Side 2",
      subText: "Denne siden inneholder eksempler på felttyper med valgmuligheter.",
      fieldGroups: [
        {
          name: "Gruppe 2-1",
          title: "Select varianter",
          subText: "Denne gruppen inneholder ulike varianter av select-felter.",
          gapSize: "half",
        },
      ],
      fields: [
        {
          name: "radioValg1",
          type: "radio",
          title: "Radioknapper",
          description: "Velg et alternativ",
          options: [
            { value: "valg1", label: "Valg 1" },
            { value: "valg2", label: "Valg 2" },
            { value: "valg3", label: "Valg 3" },
          ],
          groupName: "Gruppe 2-1",
        },
        {
          name: "multiSjekkBoks1",
          type: "multiCheckbox",
          title: "Flervalgssjekkbokser",
          description: "Velg en eller flere alternativer",
          options: [
            { value: "valg1", label: "Valg 1" },
            { value: "valg2", label: "Valg 2" },
            { value: "valg3", label: "Valg 3" },
          ],
          groupName: "Gruppe 2-1",
        },
        {
          name: "nedtrekksFelt1",
          type: "select",
          title: "Nedtrekksmeny",
          placeholder: "- Velg et alternativ -",
          options: [
            { value: "valg1", label: "Valg 1" },
            { value: "valg2", label: "Valg 2" },
            { value: "valg3", label: "Valg 3" },
          ],
          groupName: "Gruppe 2-1",
        },
        {
          name: "autofillFelt1",
          type: "autofill",
          title: "Autofill",
          description: "Dette feltet vil autofylle med alternativer basert på det du skriver.",
          placeholder: "Begynn å skrive...",
          options: [
            { value: "alpha", label: "Alpha" },
            { value: "beta", label: "Beta" },
            { value: "gamma", label: "Gamma" },
            { value: "delta", label: "Delta" },
            { value: "epsilon", label: "Epsilon" },
            { value: "zeta", label: "Zeta" },
            { value: "eta", label: "Eta" },
            { value: "theta", label: "Theta" },
            { value: "iota", label: "Iota" },
            { value: "kappa", label: "Kappa" },
            { value: "lambda", label: "Lambda" },
            { value: "mu", label: "Mu" },
            { value: "nu", label: "Nu" },
            { value: "xi", label: "Xi" },
            { value: "omicron", label: "Omicron" },
            { value: "pi", label: "Pi" },
            { value: "rho", label: "Rho" },
            { value: "sigma", label: "Sigma" },
            { value: "tau", label: "Tau" },
            { value: "upsilon", label: "Upsilon" },
            { value: "phi", label: "Phi" },
            { value: "chi", label: "Chi" },
            { value: "psi", label: "Psi" },
            { value: "omega", label: "Omega" },
          ],
          groupName: "Gruppe 2-1",
        },
      ],
    },
    {
      name: "Side 3",
      title: "Side 3",
      subText: "Denne siden inneholder eksempler på felttyper med validering og avhengigheter.",
      fieldGroups: [
        {
          name: "Gruppe 3-1",
          title: "Validering og Avhengigheter",
          subText: "Denne gruppen inneholder felter som er avhengige av andre felter.",
        },
      ],
      fields: [
        {
          name: "ObligatoriskTekstFelt1",
          type: "text",
          label: "Obligatorisk Tekstfelt",
          placeholder: "Fyll inn noe her...",
          required: true,
          requiredErrorText: "Dette feltet er obligatorisk.",
        },
        {
          name: "visAvhengig1",
          type: "checkbox",
          label: "Felt som kreves for å vise et avhengig felt",
          description: "Merk av for å vise det avhengige feltet.",
          required: true,
          requiredErrorText: "Dette feltet er obligatorisk.",
        },
        {
          name: "avhengigTekstFelt1",
          type: "text",
          label: "Avhengig Tekstfelt",
          placeholder: "Skriv noe her...",
          dependencies: [
            {
              name: "visAvhengig1",
              condition: "equals",
              value: true,
            },
          ],
        },
      ],
    },
  ],
};

export default schemaData;

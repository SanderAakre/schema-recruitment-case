import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#4F8A8B",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#FBD46D",
      contrastText: "#222831",
    },
    text: {
      primary: "#222831",
      secondary: "#393E46",
      disabled: "#AAAAAA",
    },
    error: {
      main: "#FF6F61",
    },
    background: {
      default: "#F6F5F5",
      paper: "#ffffff",
    },
    success: {
      main: "#6BCB77",
      contrastText: "#ffffff",
    },
    warning: {
      main: "#FFD166",
      contrastText: "#222831",
    },
    info: {
      main: "#3AB0FF",
      contrastText: "#ffffff",
    },
  },

  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica Neue", Arial, sans-serif',
    h1: {
      fontSize: "2.5rem",
      fontWeight: 600,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 500,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: "1.75rem",
      fontWeight: 500,
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 500,
    },
    h5: {
      fontSize: "1.25rem",
      fontWeight: 400,
    },
    h6: {
      fontSize: "1rem",
      fontWeight: 400,
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.6,
    },
    body2: {
      fontSize: "0.875rem",
    },
    button: {
      fontWeight: 500,
      fontSize: "1.25rem",
    },
    caption: {
      fontSize: "0.75rem",
    },
    overline: {
      fontSize: "0.75rem",
      textTransform: "uppercase",
    },
  },

  // ** Breakpoints **

  breakpoints: {
    values: {
      xs: 0, // mobile
      sm: 600, // tablet
      md: 840, // desktop
      lg: 1200, // large desktop
      xl: 1600, // extra large desktop
    },
  },

  // ** Component overrides **

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
        },
      },
    },
  },
});

export default theme;

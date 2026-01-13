import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#6C63FF", // Electric Violet
    },
    secondary: {
      main: "#FF6584", // Soft Red/Pink for accents
    },
    background: {
      default: "#0f0c29", // Deep dark gradient base
      paper: "#24243e",
    },
    text: {
      primary: "#ffffff",
      secondary: "#b3b3b3",
    },
  },
  typography: {
    fontFamily: '"Interact", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: "3rem",
    },
    h2: {
      fontWeight: 600,
      fontSize: "2.5rem",
    },
    button: {
      textTransform: "none", // Modern feel
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          padding: "10px 24px",
        },
        containedPrimary: {
          background: "linear-gradient(45deg, #6C63FF 30%, #5A52E0 90%)",
          boxShadow: "0 3px 5px 2px rgba(108, 99, 255, .3)",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          backgroundColor: "rgba(30, 30, 46, 0.7)", // Glassmorphism base
          backdropFilter: "blur(10px)",
        },
      },
    },
    MuiTextField: {
        styleOverrides: {
            root: {
                '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                        borderColor: 'rgba(255, 255, 255, 0.23)',
                    },
                    '&:hover fieldset': {
                        borderColor: '#6C63FF',
                    },
                },
            }
        }
    }
  },
});

export default theme;

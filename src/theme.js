import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#8b7cff" },
    secondary: { main: "#35c9a5" },
    background: { default: "#10131c", paper: "#191e2b" },
    text: { primary: "#f4f5fb", secondary: "#9ba3b7" },
    success: { main: "#35c9a5" },
    warning: { main: "#f5b84b" },
    error: { main: "#ff7185" }
  },
  shape: { borderRadius: 14 },
  typography: {
    fontFamily: '"Inter", "Segoe UI", Arial, sans-serif',
    h4: { fontWeight: 800, letterSpacing: "-0.04em" },
    h5: { fontWeight: 750, letterSpacing: "-0.03em" },
    h6: { fontWeight: 700 },
    button: { textTransform: "none", fontWeight: 700 }
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: { backgroundImage: "none", border: "1px solid #282e3d" }
      }
    },
    MuiButton: { styleOverrides: { root: { borderRadius: 10, minHeight: 40 } } },
    MuiOutlinedInput: { styleOverrides: { root: { borderRadius: 10 } } }
  }
});

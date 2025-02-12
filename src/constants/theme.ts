import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  breakpoints: {
    values: {
      mobile: 0,
      tablet: 640,
      // laptop: 1024,
      // desktop: 1200,
    },
  },
  typography: {
    button: {
      textTransform: "none",
    },
  },
});

export default theme;

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xs: false;
    sm: false;
    md: false;
    lg: false;
    xl: false;
    mobile: true;
    tablet: true;
    // laptop: true;
    // desktop: true;
  }
}

import { transparentize } from "polished";

const lightTheme = {
  colors: {
    bodyBackground: "#F4F7FD",
    elementBackground: "#FFFFFF",
    primaryColor: "#635FC7",
    secondaryColor: "#635FC7",
    textColor: "#000112",
    alternativeTextColor: "#828FA3",
    deleteColor: "#EA5555",
    borderColor: "#E4EBFA",
    white: "#FFFFFF",
    secondaryButtonCollor: transparentize(0.9, "#635FC7"),
  },
  fontSizes: {
    headingX: "24px",
    headingL: "18px",
    headingM: "15px",
    headingS: "12px",
    bodyL: "13px",
    bodyM: "12px",
  },
};

export default lightTheme;

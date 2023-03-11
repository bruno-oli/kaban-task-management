import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      bodyBackground: string;
      elementBackground: string;
      primaryColor: string;
      secondaryColor: string;
      textColor: string;
      alternativeTextColor: string;
      deleteColor: string;
      borderColor: string;
      white: string,
    };
    fontSizes: {
      headingX: string;
      headingL: string;
      headingM: string;
      headingS: string;
      bodyL: string;
      bodyM: string;
    };
  }
}

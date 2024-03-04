import { MD3Theme } from "react-native-paper";

type colors = MD3Theme["colors"] & {
  mainBackground: string;
  mainForeground: string;
  inputBackground: string;
  iconColor: string;
  secondaryText: string;
  inputPlaceholderColor: string;
};

export type Theme = MD3Theme & { colors: colors };

const textBodyColor = "#5a6366";

const primaryColor = "#5843be";

const iconColor = "#81888a";

const secondaryTextColor = "rgb(129 129 129)";

const backgroundColor = "#ffffff";

const foregroundColor = "#f8f9fc";

export const COLOR_SCHEMES = {
  dark: {
    colors: {
      primary: "rgb(175, 198, 255)",
      onPrimary: "rgb(0, 45, 108)",
      primaryContainer: "rgb(21, 68, 143)",
      onPrimaryContainer: "rgb(217, 226, 255)",
      secondary: "rgb(191, 198, 220)",
      onSecondary: "rgb(41, 48, 65)",
      secondaryContainer: "rgb(63, 71, 89)",
      onSecondaryContainer: "rgb(219, 226, 249)",
      tertiary: "rgb(223, 187, 222)",
      onTertiary: "rgb(64, 40, 67)",
      tertiaryContainer: "rgb(88, 62, 90)",
      onTertiaryContainer: "rgb(252, 215, 251)",
      error: "rgb(255, 180, 171)",
      onError: "rgb(105, 0, 5)",
      errorContainer: "rgb(147, 0, 10)",
      onErrorContainer: "rgb(255, 180, 171)",
      background: "rgb(27, 27, 31)",
      onBackground: "rgb(227, 226, 230)",
      surface: "rgb(27, 27, 31)",
      onSurface: "rgb(227, 226, 230)",
      surfaceVariant: "rgb(68, 71, 79)",
      onSurfaceVariant: "rgb(197, 198, 208)",
      outline: "rgb(142, 144, 153)",
      outlineVariant: "rgb(68, 71, 79)",
      shadow: "rgb(0, 0, 0)",
      scrim: "rgb(0, 0, 0)",
      inverseSurface: "rgb(227, 226, 230)",
      inverseOnSurface: "rgb(48, 48, 52)",
      inversePrimary: "rgb(52, 92, 168)",
      elevation: {
        level0: "transparent",
        level1: "rgb(34, 36, 42)",
        level2: "rgb(39, 41, 49)",
        level3: "rgb(43, 46, 56)",
        level4: "rgb(45, 48, 58)",
        level5: "rgb(48, 51, 62)",
      },
      surfaceDisabled: "rgba(227, 226, 230, 0.12)",
      onSurfaceDisabled: "rgba(227, 226, 230, 0.38)",
      backdrop: "rgba(46, 48, 56, 0.4)",
    },
  },
  light: {
    colors: {
      primary: primaryColor,

      onPrimary: "rgb(255, 255, 255)",
      primaryContainer: "rgb(217, 226, 255)",
      onPrimaryContainer: "rgb(0, 26, 67)",
      secondary: "rgb(87, 94, 113)",
      onSecondary: "rgb(255, 255, 255)",
      secondaryContainer: "rgb(219, 226, 249)",
      onSecondaryContainer: "rgb(20, 27, 44)",
      tertiary: "rgb(114, 85, 115)",
      onTertiary: "rgb(255, 255, 255)",
      tertiaryContainer: "rgb(252, 215, 251)",
      onTertiaryContainer: "rgb(42, 19, 45)",
      error: "rgb(186, 26, 26)",
      onError: "rgb(255, 255, 255)",
      errorContainer: "rgb(255, 218, 214)",
      onErrorContainer: "rgb(65, 0, 2)",
      background: "rgb(254, 251, 255)",
      onBackground: "rgb(27, 27, 31)",
      surface: "rgb(254, 251, 255)",
      onSurface: "rgb(27, 27, 31)",
      surfaceVariant: "rgb(225, 226, 236)",
      onSurfaceVariant: "rgb(68, 71, 79)",
      outline: "rgb(117, 119, 128)",
      outlineVariant: "rgb(197, 198, 208)",
      shadow: "rgb(0, 0, 0)",
      scrim: "rgb(0, 0, 0)",
      inverseSurface: "rgb(48, 48, 52)",
      inverseOnSurface: "rgb(242, 240, 244)",
      inversePrimary: "rgb(175, 198, 255)",
      elevation: {
        level0: "transparent",
        level1: "rgb(244, 243, 251)",
        level2: "rgb(238, 238, 248)",
        level3: "rgb(232, 234, 245)",
        level4: "rgb(230, 232, 245)",
        level5: "rgb(226, 229, 243)",
      },
      surfaceDisabled: "rgba(27, 27, 31, 0.12)",
      onSurfaceDisabled: "rgba(27, 27, 31, 0.38)",
      backdrop: "rgba(46, 48, 56, 0.4)",
      mainBackground: backgroundColor,
      mainForeground: "#fff",
      inputBackground: "#f5f5f5",
      foreground: foregroundColor,
      textBody: textBodyColor,
      secondaryText: secondaryTextColor,
      icon: iconColor,
      inputPlaceholderColor: "#d0cfd4",
    },
  },
};

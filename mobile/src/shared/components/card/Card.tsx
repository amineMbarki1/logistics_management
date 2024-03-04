import useCustomTheme from "@/shared/hooks/useCustomTheme";
import { Card as CardComponent, CardProps } from "react-native-paper";

export default function Card({ children, style }: CardProps) {
  const { colors } = useCustomTheme();
  return (
    <CardComponent
      elevation={1}
      style={[{ backgroundColor: colors.mainForeground }, style]}
    >
      {children}
    </CardComponent>
  );
}

Card.Content = CardComponent.Content;

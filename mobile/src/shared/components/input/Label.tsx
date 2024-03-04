import { ReactNode } from "react";
import { Text, TextProps } from "react-native-paper";

import useCustomTheme from "@/shared/hooks/useCustomTheme";

export default function Label({
  label,
  children,
  ...props
}: Omit<TextProps<Text>, "children"> & {
  label: string;
  children?: ReactNode;
}) {
  const { colors } = useCustomTheme();
  const secondary = { color: colors.secondary };
  return (
    <Text style={[secondary, props.style]} variant="labelSmall" {...props}>
      {label}
      {children}
    </Text>
  );
}

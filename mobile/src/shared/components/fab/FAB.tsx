import { FAB as FABButton, FABProps } from "react-native-paper";
import { StyleSheet } from "react-native";

import useCustomTheme from "@/shared/hooks/useCustomTheme";

export default function FAB({ style, ...props }: FABProps) {
  const { colors } = useCustomTheme();

  return (
    <FABButton
      style={[
        !props.disabled && { backgroundColor: colors.primary },
        styles.fab,
        style,
      ]}
      icon="plus"
      color="#fff"
      {...props}
    />
  );
}
const styles = StyleSheet.create({
  fab: { right: 0, bottom: 0, position: "absolute", margin: 12 },
});

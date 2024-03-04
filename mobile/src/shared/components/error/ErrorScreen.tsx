import { View, StyleSheet, ViewStyle } from "react-native";
import { Text } from "react-native-paper";
import { Entypo } from "@expo/vector-icons";
import { Button } from "react-native-paper";

import useCustomTheme from "@/shared/hooks/useCustomTheme";
import { ReactElement } from "react";

interface Props {
  message?: string;
  status?: number | string;
  action?: ReactElement;
  containerStyle?: ViewStyle;
}

export default function ErrorScreen({
  message = "Something went wrong",
  status,
  action,
  containerStyle,
}: Props) {
  const { colors } = useCustomTheme();
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.iconStatusWrapper}>
        <Entypo name="bug" size={40} color={colors.primary} />
        <Text style={styles.status}>{status}</Text>
      </View>
      <Text style={styles.message}>{message}</Text>
      {action}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  iconStatusWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginBottom: 10,
  },
  status: { fontSize: 25, fontWeight: "bold", opacity: 0.6 },
  message: { fontSize: 15 },
});

import { View, Text, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AlertContainer from "./AlertContainer";

interface Props {
  title: string;
  description: string;
}

export default function AlertSuccess({ title, description }: Props) {
  return (
    <AlertContainer style={styles.container}>
      <Text style={[styles.text, { fontWeight: "500" }]}>{title}</Text>
      <Text style={styles.text}>{description}</Text>
    </AlertContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#008f5d",
    alignItems: "center",
  },
  text: { color: "white" },
});

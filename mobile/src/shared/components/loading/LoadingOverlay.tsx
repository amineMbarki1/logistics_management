import useCustomTheme from "@/shared/hooks/useCustomTheme";
import { View, StyleSheet , Modal} from "react-native";
import { ActivityIndicator, Portal} from "react-native-paper";

export default function LoadingOverlay() {
  const { colors } = useCustomTheme();
  return (

    <Portal>
      <View style={styles.container}>
        <ActivityIndicator color={colors.primary} size="large" />
      </View>
    </Portal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    zIndex: 10,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
});

import { ReactNode } from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import useCustomTheme from "@/shared/hooks/useCustomTheme";

const MainContainer = ({
  children,
  style,
}: {
  children: ReactNode;
  style?: ViewStyle;
}) => {
  const { colors } = useCustomTheme();

  

  return (
    <View
      style={[
        { backgroundColor: colors.mainBackground },
        styles.container,
        style,
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
});

export default MainContainer;

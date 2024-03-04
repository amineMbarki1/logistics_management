import { Children, PropsWithChildren } from "react";
import { ViewStyle } from "react-native";
import { View, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Props {
  style: ViewStyle;
}
export default function AlertContainer({
  style,
  children,
}: PropsWithChildren<Props>) {
  const { top } = useSafeAreaInsets();

  return <View style={[{ paddingTop: 20 + top }, style]}>{children}</View>;
}

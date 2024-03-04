import { Image, ImageProps, StyleSheet, ViewStyle } from "react-native";

import Card from "../card/Card";

interface Props extends ImageProps {
  wrapperStyle?: ViewStyle;
}

export default function Avatar({ source, wrapperStyle }: Props) {
  return (
    <Card style={[styles.container, wrapperStyle]}>
      <Image  style={{ height: "100%", width: "100%" }} source={source} />
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 120,
    width: 120,
    borderRadius: 120,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#f5f5f5",
  },
});

import { useRef, useState } from "react";
import {
  StyleSheet,
  ViewStyle,
  Pressable,
  GestureResponderEvent,
} from "react-native";
import {
  Text,
  TextInput as TextInputComponent,
  TextInputProps,
  TouchableRipple,
} from "react-native-paper";
import { useController } from "react-hook-form";

import Label from "./Label";
import useCustomTheme from "@/shared/hooks/useCustomTheme";

export type Props = Omit<TextInputProps, "label"> & {
  label: string;
  wrapperStyle?: ViewStyle;
  name: string;
  onPress?: (e: GestureResponderEvent) => void;
  getFieldValue?: (value: any) => string;
};

export default function TextInput({
  label,
  wrapperStyle,
  name,
  onPress,
  getFieldValue,
  ...props
}: Props) {
  const ref = useRef<any>(null);
  const { colors } = useCustomTheme();
  const { field } = useController({ name });

  const [focused, setFocused] = useState(false);

  const handlePress = (e: GestureResponderEvent) => {
    ref.current?.focus();
    if (onPress) onPress(e);
  };

  const getRenderedValue = (value: unknown) => {
    if (getFieldValue && value) return getFieldValue(value);
    return value ? `${value}` : "";
  };

  const activeStyle: ViewStyle = {
    borderColor: colors.primary,
    borderWidth: 1.5,
  };

  return (
    <Pressable
      onPress={handlePress}
      style={[styles.container, wrapperStyle, focused && activeStyle]}
    >
      {label && <Label label={label} />}

      <TextInputComponent
        dense
        mode="outlined"
        outlineColor="transparent"
        contentStyle={{ paddingLeft: 0, paddingBottom: 0, margin: 0 }}
        activeOutlineColor="transparent"
        placeholderTextColor={colors.inputPlaceholderColor}
        style={{ backgroundColor: "transparent" }}
        onChangeText={field.onChange}
        onFocus={() => {
          setFocused(true);
        }}
        onBlur={() => {
          field.onBlur();
          setFocused(false);
        }}
        value={getRenderedValue(field.value)}
        ref={(instance: any) => {
          field.ref(instance);
          ref.current = instance;
        }}
        onPressIn={onPress && onPress}
        {...props}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 8,
    paddingTop: 8,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: "transparent",
  },
});

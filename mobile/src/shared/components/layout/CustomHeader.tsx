import { Appbar, AppbarProps } from "react-native-paper";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { PropsWithChildren } from "react";

import useCustomTheme from "@/shared/hooks/useCustomTheme";
import { View, StyleSheet, ViewStyle } from "react-native";

type Props = NativeStackHeaderProps & {
  title: string;
  headerStyle?: ViewStyle;
  appBarProps?: Omit<AppbarProps, "children">;
};

export default function CustomHeader({
  title,
  headerStyle,
  appBarProps,
  ...props
}: PropsWithChildren<Props>) {
  const { colors } = useCustomTheme();

  return (
    <Appbar.Header
      elevated
      style={[
        {
          backgroundColor: colors.mainBackground,
          paddingHorizontal: 12,
        },
        headerStyle,
      ]}
      {...appBarProps}
    >
      <View style={styles.titleWrapper}>
        {props.back && (
          <Appbar.Action
            icon={"chevron-left"}
            iconColor={colors.primary}
            onPress={props.navigation.goBack}
          />
        )}

        {title && <Appbar.Content mode="small" title={title} />}
      </View>

      {props.children}
    </Appbar.Header>
  );
}

const styles = StyleSheet.create({
  titleWrapper: { flexDirection: "row", alignItems: "center" },
});

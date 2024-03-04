import { View, Pressable, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Entypo } from "@expo/vector-icons";
import { useEffect } from "react";
import { Text } from "react-native-paper";

import useReduxStore from "@/shared/hooks/useReduxStore";
import CustomHeader from "@/shared/components/layout/CustomHeader";
import Avatar from "@/shared/components/avatar/Avatar";
import useCustomTheme from "@/shared/hooks/useCustomTheme";
import DriverTopTabs from "../DriverTopTabs";
import { RootStackParamsList } from "../DriversStack";

type Props = NativeStackScreenProps<RootStackParamsList, "DriverDetails">;

export default function DriverDetailsScreen({ navigation, route }: Props) {
  const { id } = route.params;
  const { colors } = useCustomTheme();
  const { useSelector } = useReduxStore();

  const driver = useSelector((state) =>
    state.driver.drivers?.find((item) => item.id === id)
  );

  useEffect(() => {
    navigation.setOptions({
      header: (props) => (
        <CustomHeader
          {...props}
          appBarProps={{ elevated: false }}
          title={driver!.name}
          headerStyle={{
            height: 200,
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
          }}
        >
          {driver && (
            <View style={styles.container}>
              <Avatar source={{ uri: driver.photo }} />
              <View>
                <Text style={styles.status} variant="titleMedium">
                  IN TRANSIT
                </Text>
                <Pressable style={styles.linkWrapper}>
                  <Text variant="bodyLarge">
                    On way to
                    <Text style={{ fontWeight: "700" }}>Hamilton</Text>
                  </Text>
                  <Entypo
                    name="chevron-right"
                    size={24}
                    color={colors.primary}
                  />
                </Pressable>
              </View>
            </View>
          )}
        </CustomHeader>
      ),
    });
  }, []);

  return <DriverTopTabs id={id} />;
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
  },
  status: { fontWeight: "700", color: "#6fd51c" },
  linkWrapper: { flexDirection: "row" },
});

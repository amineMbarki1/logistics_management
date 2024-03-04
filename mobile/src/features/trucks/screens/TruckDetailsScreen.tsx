import { View, StyleSheet, Pressable } from "react-native";
import { Text } from "react-native-paper";
import { Entypo } from "@expo/vector-icons";

import { RootStackParamsList } from "../TrucksStack";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { selectors } from "../truckSlice";
import useReduxStore from "@/shared/hooks/useReduxStore";
import Avatar from "@/shared/components/avatar/Avatar";
import useCustomTheme from "@/shared/hooks/useCustomTheme";
import { useEffect } from "react";
import CustomHeader from "@/shared/components/layout/CustomHeader";
import TruckTopTabs from "../TruckTopTabs";

type Props = NativeStackScreenProps<RootStackParamsList, "TruckDetails">;

export default function TruckDetailsScreen({ route, navigation }: Props) {
  const id = route.params.id;
  const { useSelector } = useReduxStore();
  const { colors } = useCustomTheme();
  const truck = useSelector((state) => selectors.selectById(state, id));

  useEffect(() => {
    navigation.setOptions({
      header: (props) => (
        <CustomHeader
          {...props}
          appBarProps={{ elevated: false }}
          title={truck!.number}
          headerStyle={{
            height: 200,
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
          }}
        >
          {truck && (
            <View style={styles.container}>
              <Avatar source={{ uri: truck.photo }} />
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

  return <TruckTopTabs id={id} />;
}

/*


*/

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

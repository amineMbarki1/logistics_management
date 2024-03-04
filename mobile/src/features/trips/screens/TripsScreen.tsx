import { FlatList } from "react-native-gesture-handler";
import { useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";

import FAB from "@/shared/components/fab/FAB";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamsList } from "../TripsStack";
import useReduxStore from "@/shared/hooks/useReduxStore";
import { getTripsAction } from "../tripsSlice";
import { actions as bottomTabsBarActions } from "@/navigation/bottomTabsBarSlice";
import Trip from "../components/Trip";
import { Chip, SegmentedButtons } from "react-native-paper";
import useCustomTheme from "@/shared/hooks/useCustomTheme";
import CustomHeader from "@/shared/components/layout/CustomHeader";

type Props = NativeStackScreenProps<RootStackParamsList, "Trips">;

const TripsScreen = ({ navigation, route }: Props) => {
  const { dispatch, useSelector } = useReduxStore();
  const { trips } = useSelector((state) => state.trip);
  const { colors } = useCustomTheme();

  useEffect(() => {
    dispatch(getTripsAction());
    const unsubscribe = navigation.addListener("focus", () => {
      dispatch(bottomTabsBarActions.showBottomTab());
    });

    navigation.setOptions({
      header: (props) => (
        <>
          <CustomHeader
            {...props}
            title="Trips"
            headerStyle={{ flexDirection: "row" }}
          >
            <Text>hello</Text>
            <SegmentedButtons
              onValueChange={() => {}}
              value={"list"}
              style={{ margin: 12, width: 100 }}
              density="medium"
              buttons={[
                {
                  value: "list",
                  label: "List",
                },
                {
                  value: "map",
                  label: "Map",
                },
              ]}
            />
          </CustomHeader>
        </>
      ),
    });

    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", padding: 12, gap: 4 }}>
        <Chip
          onPress={() => {}}
          selected
          elevated
          mode="outlined"
          rippleColor={colors.primary}
          selectedColor={colors.primary}
        >
          IN TRANSIT
        </Chip>
        <Chip elevated>COMPLETED</Chip>
        <Chip elevated mode="outlined">
          STOPPED
        </Chip>
        <Chip elevated mode="outlined">
          IDLE
        </Chip>
      </View>
      {trips && (
        <FlatList
          contentContainerStyle={styles.tripsWrapper}
          data={trips}
          renderItem={({ item }) => <Trip trip={item} onPress={(item) => {}} />}
          keyExtractor={({ id }) => `${id}`}
        />
      )}
      <FAB label="" onPress={() => navigation.navigate("SelectLocation")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  tripsWrapper: { gap: 8, padding: 12 },
});

export default TripsScreen;

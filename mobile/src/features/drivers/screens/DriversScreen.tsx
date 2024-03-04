import { useEffect, useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import FAB from "@/shared/components/fab/FAB";
import useReduxStore from "@/shared/hooks/useReduxStore";
import { getDriversAction } from "../driversSlice";
import { RootStackParamsList } from "../DriversStack";
import LoadingOverlay from "@/shared/components/loading/LoadingOverlay";
import Driver from "../components/Driver";
import ErrorScreen from "@/shared/components/error/ErrorScreen";
import { Button } from "react-native-paper";
type Props = NativeStackScreenProps<RootStackParamsList, "Drivers">;

export default function DriversScreen({ navigation, route }: Props) {
  const { name } = route;

  const { dispatch, useSelector } = useReduxStore();
  const { drivers, status, error, requestStatus } = useSelector(
    (state) => state.driver
  );
  const [requestId, setRequestId] = useState<string | null>(null);


  useEffect(() => {
    setRequestId(dispatch(getDriversAction()).requestId);
  }, []);
  return (
    <View>
      {status.getAll === "failed" && (
        <ErrorScreen
          status={error!.code}
          message={""}
          action={
            <Button
              onPress={() => dispatch(getDriversAction())}
              mode="contained"
            >
              Try again
            </Button>
          }
        />
      )}
      {requestStatus[requestId!] === "loading" && <LoadingOverlay />}
      {drivers && (
        <FlatList
          contentContainerStyle={styles.driversWrapper}
          data={drivers}
          renderItem={({ item }) => (
            <Driver
              onPress={() =>
                navigation.navigate("DriverDetails", { id: item.id })
              }
              driver={item}
            />
          )}
        />
      )}

      <FAB icon="plus" onPress={() => navigation.navigate("NewDriver")} />
    </View>
  );
}

const styles = StyleSheet.create({
  driversWrapper: { padding: 12, gap: 8 },
  driverContent: { flexDirection: "row", gap: 8, alignItems: "center" },
  avatar: { height: 60, width: 60 },
  status: { marginLeft: "auto" },
});

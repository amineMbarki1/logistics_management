import { useEffect } from "react";
import { StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Button } from "react-native-paper";

import useReduxStore from "@/shared/hooks/useReduxStore";
import { RootStackParamsList } from "../TrucksStack";
import FAB from "@/shared/components/fab/FAB";
import { getTrucksAction } from "../truckSlice";
import Truck from "../components/Truck";
import LoadingOverlay from "@/shared/components/loading/LoadingOverlay";
import { FlatList } from "react-native-gesture-handler";
import ErrorScreen from "@/shared/components/error/ErrorScreen";
import Trucks from "../components/Trucks";

type Props = NativeStackScreenProps<RootStackParamsList, "Trucks">;

export default function TrucksScreen({ navigation }: Props) {
  const { dispatch, useSelector } = useReduxStore();
  const { trucks, status, error } = useSelector((state) => state.truck);

  useEffect(() => {
    dispatch(getTrucksAction());
  }, []);

  return (
    <>
      {status.getAll === "loading" && <LoadingOverlay />}
      {status.getAll === "failed" && (
        <ErrorScreen
          status={error!.code}
          message=""
          action={
            <Button
              onPress={() => dispatch(getTrucksAction())}
              mode="contained"
            >
              Try again
            </Button>
          }
        />
      )}
      {trucks && (
        <Trucks
          trucks={trucks}
          onPress={(truck) =>
            navigation.navigate("TruckDetails", { id: truck.id })
          }
        />
      )}
      <FAB label="" onPress={() => navigation.navigate("NewTruck")} />
    </>
  );
}

import { FlatList } from "react-native-gesture-handler";

import { Truck as TruckType } from "../types";
import Truck from "./Truck";
import { StyleSheet } from "react-native";

interface Props {
  trucks: TruckType[];
  onPress?: (truck: TruckType) => void;
}

export default function Trucks({ trucks, onPress }: Props) {
  return (
    <FlatList
      contentContainerStyle={styles.container}
      keyExtractor={(item) => `${item.id}`}
      data={trucks}
      renderItem={({ item }) => (
        <Truck truck={item} onPress={onPress && (() => onPress(item))} />
      )}
    />
  );
}
const styles = StyleSheet.create({
  container: { padding: 12, gap: 8 },
});

import { FlatList } from "react-native-gesture-handler";
import { Driver as DriverType } from "../types";
import Driver from "./Driver";

export default function Drivers({
  drivers,
  onPress,
}: {
  drivers: DriverType[];
  onPress?: (driver: DriverType) => void;
}) {
  return (
    drivers && (
      <FlatList
        scrollEnabled
        contentContainerStyle={{ padding: 12, gap: 8 }}
        data={drivers}
        keyExtractor={(item) => `${item.id}`}
        renderItem={({ item }) => (
          <Driver onPress={onPress && (() => onPress(item))} driver={item} />
        )}
      />
    )
  );
}

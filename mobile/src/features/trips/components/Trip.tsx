import { Trip as TripType } from "../types";
import { TouchableRipple, Text, Card as CardC } from "react-native-paper";
import Card from "@/shared/components/card/Card";
import { View, StyleSheet } from "react-native";
import Avatar from "@/shared/components/avatar/Avatar";
import useCustomTheme from "@/shared/hooks/useCustomTheme";

interface Props {
  onPress?: (trip: TripType) => void;
  trip: TripType;
}

export default function Trip({ trip, onPress }: Props) {
  const { colors } = useCustomTheme();
  return (
    <Card style={{ overflow: "hidden" }}>
      <TouchableRipple borderless onPress={onPress && (() => onPress(trip))}>
        <>
          <View style={styles.header}>
            <Avatar
              wrapperStyle={styles.avatar}
              source={{ uri: trip.truck.photo }}
            />
            <View style={styles.truckInfo}>
              <Text variant="titleMedium">{trip.truck.number}</Text>
              <Text variant="bodySmall">{trip.truck.modelNumber}</Text>
              <Text variant="bodySmall">{trip.truck.brand}</Text>
            </View>
            <Text
              style={{ color: "green", marginLeft: "auto" }}
              variant="titleSmall"
            >
              IN TRANSIT
            </Text>
          </View>
          <Card.Content style={{ paddingVertical: 12 }}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View>
                <Text
                  style={{ color: colors.secondaryText }}
                  variant="labelSmall"
                >
                  Task
                </Text>
                <Text variant="bodyLarge">{trip.task}</Text>
              </View>
              <View>
                <Text
                  style={{ color: colors.secondaryText }}
                  variant="labelSmall"
                >
                  Departed
                </Text>
                <Text variant="bodyLarge">{"20 june, 02:05"}</Text>
              </View>
            </View>
          </Card.Content>
        </>
      </TouchableRipple>
    </Card>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 12,
    backgroundColor: "#f1f1f1",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  avatar: { height: 40, width: 40 },
  truckInfo: { flexDirection: "row", alignItems: "baseline", gap: 4 },
});

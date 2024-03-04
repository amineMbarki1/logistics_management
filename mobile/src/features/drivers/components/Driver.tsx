import Card from "@/shared/components/card/Card";
import { Text, TouchableRipple } from "react-native-paper";
import { View, GestureResponderEvent, StyleSheet } from "react-native";

import Avatar from "@/shared/components/avatar/Avatar";
import { Driver as DriverType } from "../types";

interface Props {
  driver: DriverType;
  onPress?: (e: GestureResponderEvent) => void;
}

export default function Driver({ driver, onPress = () => {} }: Props) {
  return (
    <Card style={{ overflow: "hidden" }}>
      <TouchableRipple
        onPress={onPress}
        borderless
        style={{ paddingVertical: 12 }}
      >
        <Card.Content style={styles.driverContent}>
          <Avatar wrapperStyle={styles.avatar} source={{ uri: driver.photo }} />
          <View>
            <Text style={styles.driverName} variant="titleMedium">
              {driver.name}
            </Text>
            <Text>{driver.phoneNumber}</Text>
          </View>
          <View style={styles.statusWrapper}>
            <Text style={styles.status}>IN TRANSIT</Text>
            <Text variant="bodySmall">
              In Truck num <Text style={styles.truckNumber}>GTY 1035</Text>
            </Text>
          </View>
        </Card.Content>
      </TouchableRipple>
    </Card>
  );
}

const styles = StyleSheet.create({
  driversWrapper: { padding: 12, gap: 8 },
  driverContent: { flexDirection: "row", gap: 8, alignItems: "center" },
  avatar: { height: 60, width: 60 },
  statusWrapper: { marginLeft: "auto" },
  truckNumber: { fontWeight: "bold", marginLeft: 2 },
  driverName: { fontWeight: "bold" },
  status: {
    color: "#75b82d",
    fontWeight: "bold",
    textAlign: "right",
  },
});

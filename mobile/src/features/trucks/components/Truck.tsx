import { Text, TouchableRipple } from "react-native-paper";
import { View, StyleSheet, GestureResponderEvent } from "react-native";

import Avatar from "@/shared/components/avatar/Avatar";
import Card from "@/shared/components/card/Card";
import { Truck as TruckType } from "../types";

interface Props {
  truck: TruckType;
  onPress?: (event: GestureResponderEvent) => void;
}

export default function Truck({ truck, onPress }: Props) {
  return (
    <Card style={{ overflow: "hidden" }}>
      <TouchableRipple
        onPress={onPress && onPress}
        borderless
        style={{ paddingVertical: 12 }}
      >
        <Card.Content style={styles.truck}>
          <Avatar
            source={{ uri: truck.photo }}
            wrapperStyle={styles.avatar}
          />
          <View>
            <Text variant="titleLarge">{truck.number}</Text>
            <Text variant="bodyLarge">{truck.modelNumber}</Text>
          </View>
          <Text
            style={{
              color: "green",
              fontWeight: "bold",
              marginLeft: "auto",
            }}
          >
            IN TRANSIT
          </Text>
        </Card.Content>
      </TouchableRipple>
    </Card>
  );
}

const styles = StyleSheet.create({
  avatar: { height: 60, width: 60 },
  truck: { flexDirection: "row", gap: 8, padding: 0 },
});

import React, { ComponentProps } from "react";
import MapView, { MapViewProps } from "react-native-maps";
import { StyleSheet, View } from "react-native";

export default function MyMapView({ children, ...props }: MapViewProps) {
  return (
    <View style={styles.container}>
      <MapView {...props} style={styles.map}>
        {children}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  map: {
    width: "100%",
    height: "100%",
    zIndex: -1,
  },
});

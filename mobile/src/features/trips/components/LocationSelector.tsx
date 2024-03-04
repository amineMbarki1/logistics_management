import { View, StyleSheet, ViewStyle, Pressable } from "react-native";
import { useState } from "react";
import { Text, Divider, Icon } from "react-native-paper";

import useCustomTheme from "@/shared/hooks/useCustomTheme";
import { Location } from "../types";

export interface Props {
  style?: ViewStyle;
  onSelect?: (args: "start" | "destination") => void;
  startLocation?: Location;
  destination?: Location;
  disableSelect?: boolean;
}

export default function LocationSelector({
  style,
  onSelect,
  startLocation,
  destination,
  disableSelect = false,
}: Props) {
  const [activeLocation, setActiveLocation] = useState<"start" | "destination">(
    "start"
  );
  const { colors } = useCustomTheme();

  const handleSelect = (activeLocation: "start" | "destination") => () => {
    setActiveLocation(activeLocation);
    if (onSelect) onSelect(activeLocation);
  };

  return (
    <View style={[styles.container, style]}>
      <View style={styles.indicatorWrapper}>
        <View style={styles.fromIndicator}>
          <Icon source="circle-medium" size={25} color={colors.primary} />
        </View>
        <View
          style={[
            styles.toIndicator,
            {
              borderColor: colors.primary,
            },
          ]}
        ></View>
        <View style={styles.fromIndicator}>
          <Icon source="map-marker" size={15} color={colors.primary} />
        </View>
      </View>
      <View style={styles.locationsWrapper}>
        <Pressable
          style={styles.locationWrapper}
          onPress={disableSelect ? null : handleSelect("start")}
        >
          <View>
            <Text variant="labelSmall">Start location</Text>

            <View>
              {startLocation ? (
                <Text variant="bodyLarge">{startLocation.displayName}</Text>
              ) : (
                <Text
                  style={
                    activeLocation !== "start" && {
                      color: colors.secondaryText,
                    }
                  }
                  variant="bodyLarge"
                >
                  Pick from map or search
                </Text>
              )}
            </View>
          </View>

          {activeLocation === "start" && !disableSelect && (
            <Icon
              color={colors.primary}
              size={25}
              source="check-circle-outline"
            />
          )}
        </Pressable>

        <Divider style={{ marginVertical: 16 }} />

        <Pressable
          style={styles.locationWrapper}
          onPress={disableSelect ? null : handleSelect("destination")}
        >
          <View>
            <Text variant="labelSmall">Destination</Text>
            {destination ? (
              <Text variant="bodyLarge">{destination.displayName}</Text>
            ) : (
              <Text
                style={
                  activeLocation !== "destination" && {
                    color: colors.secondaryText,
                  }
                }
                variant="bodyLarge"
              >
                Pick from map or search
              </Text>
            )}
          </View>
          {activeLocation === "destination" && !disableSelect && (
            <Icon
              color={colors.primary}
              size={25}
              source="check-circle-outline"
            />
          )}
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: "row", gap: 12 },
  indicatorWrapper: { alignItems: "center", gap: 2 },
  fromIndicator: {
    backgroundColor: "rgba(88, 67, 190, 0.2)",
    height: 25,
    width: 25,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  toIndicator: { borderWidth: 1, flex: 1, borderStyle: "dashed", width: 0 },
  locationsWrapper: { flex: 1 },
  locationWrapper: { flexDirection: "row", justifyContent: "space-between" },

  suggestions: {
    position: "absolute",
    zIndex: 10,
    top: "100%",
    backgroundColor: "white",
    width: "100%",
    maxHeight: 250,
  },
});

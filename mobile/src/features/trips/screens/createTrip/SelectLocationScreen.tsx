import { AxiosError } from "axios";
import { Alert, StyleSheet, View } from "react-native";
import { useRef, useState, useEffect } from "react";
import { Button } from "react-native-paper";
import { Marker, LatLng } from "react-native-maps";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

import MyMapView from "@/shared/components/map/MyMapView";
import { RootStackParamsList } from "../../TripsStack";
import { LocationResponse, reverseGeoCode } from "@/api/locationClient";
import LoadingOverlay from "@/shared/components/loading/LoadingOverlay";
import LocationSelector from "../../components/LocationSelector";
import SearchLocationSheet from "../../components/SearchLocationSheet";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Card from "@/shared/components/card/Card";
import { Location } from "../../types";
import useCustomTheme from "@/shared/hooks/useCustomTheme";
import FAB from "@/shared/components/fab/FAB";
import useLocationPermission from "@/shared/hooks/useLocationPermission";

type Props = NativeStackScreenProps<RootStackParamsList, "SelectLocation">;

export default function SelectLocationScreen({ navigation }: Props) {
  const ref = useRef<BottomSheetModal>(null);

  const [startLocation, setStartLocation] = useState<null | Location>(null);
  const [destination, setDestination] = useState<null | Location>(null);
  const [loading, setLoading] = useState(false);
  const [activeLocation, setActiveLocation] = useState<"start" | "destination">(
    "start"
  );

  const canContinue = startLocation != null && destination != null;

  const { colors } = useCustomTheme();

  const selectLocation = (location: LocationResponse) => {
    if (activeLocation === "start")
      setStartLocation({
        displayName: location.display_name,
        latitude: +location.lat,
        longitude: +location.lon,
      });
    else
      setDestination({
        displayName: location.display_name,
        latitude: +location.lat,
        longitude: +location.lon,
      });
  };

  const handleLocationSelect = (location: LocationResponse) => {
    selectLocation(location);
    ref.current?.close();
  };

  const handleLocationMapSelect = (coordinate: LatLng) => {
    setLoading(true);
    reverseGeoCode(coordinate)
      .then((location) => {
        selectLocation(location);
        setLoading(false);
      })
      .catch((error: AxiosError) => {
        if (error.status === 404) Alert.alert("No location was founds");
      })
      .finally(() => setLoading(false));
  };

  const { location } = useLocationPermission();

  return (
    <>
      <View style={styles.container}>
        <SearchLocationSheet onSelect={handleLocationSelect} ref={ref} />

        {loading && <LoadingOverlay />}
        <MyMapView
          followsUserLocation
          showsUserLocation
          region={{
            latitude: location?.coords.latitude!,
            longitude: location?.coords.longitude!,
            latitudeDelta: 1,
            longitudeDelta: 1,
          }}
          onPress={(e) => {
            handleLocationMapSelect(e.nativeEvent.coordinate);
          }}
        >
          {startLocation && (
            <Marker
              coordinate={{
                latitude: startLocation.latitude,
                longitude: startLocation.longitude,
              }}
            />
          )}
          {destination && (
            <Marker
              coordinate={{
                latitude: destination.latitude,
                longitude: destination.longitude,
              }}
            />
          )}
        </MyMapView>

        <View style={styles.inputsCard}>
          <Card style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}>
            <Card.Content>
              <LocationSelector
                destination={destination!}
                startLocation={startLocation!}
                onSelect={setActiveLocation}
              />
            </Card.Content>
          </Card>
          <Button
            onPress={() => ref?.current?.present()}
            buttonColor={colors.mainBackground}
            textColor={colors.primary}
            icon="map-search-outline"
            style={styles.searchButton}
            mode="outlined"
          >
            Search
          </Button>
        </View>
      </View>

      <FAB
        disabled={!canContinue}
        onPress={() =>
          navigation.navigate("NewTrip", {
            startLocation: startLocation!,
            destination: destination!,
          })
        }
        label="Continue"
        icon="hand-pointing-right"
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  input: { marginBottom: 8 },
  inputsCard: {
    position: "absolute",
    width: "100%",
    borderTopLeftRadius: 0,
    zIndex: -1,
  },

  searchButton: { alignSelf: "flex-end", marginTop: 8, marginRight: 8 },
});

import { ScrollView } from "react-native-gesture-handler";
import { View, StyleSheet } from "react-native";
import { Text, Button, Divider } from "react-native-paper";
import { useEffect, useRef, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";

import useCustomTheme from "@/shared/hooks/useCustomTheme";
import TextInput from "@/shared/components/input/TextInput";
import useReduxStore from "@/shared/hooks/useReduxStore";
import { actions as bottomTabsBarActions } from "@/navigation/bottomTabsBarSlice";
import DateInput from "@/shared/components/input/DateInput";
import TimeInput from "@/shared/components/input/TimeInput";
import LocationSelector from "../../components/LocationSelector";
import Card from "@/shared/components/card/Card";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamsList } from "../../TripsStack";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import SelectDriverSheet from "../../components/SelectDriverSheet";
import { Driver } from "@/features/drivers/types";
import SelectTruckSheet from "../../components/SelectTruckSheet";
import { Truck } from "@/features/trucks/types";
import { TripFormFields, TripRequest } from "../../types";
import { createTripAction } from "../../tripsSlice";
import showAlert from "@/utils/showAlert";

type Props = NativeStackScreenProps<RootStackParamsList, "NewTrip">;

export default function CreateTripScreen({ route, navigation }: Props) {
  const ref = useRef<BottomSheetModal>(null);
  const selectTruckSheetRef = useRef<BottomSheetModal>(null);

  const { fonts } = useCustomTheme();
  const methods = useForm<TripFormFields>();
  const { dispatch, useSelector } = useReduxStore();
  const { requestStatus } = useSelector((state) => state.trip);
  const [requestId, setRequestId] = useState("");

  const { startLocation, destination } = route.params;

  const handleDriverSelect = (driver: Driver) => {
    methods.setValue("driver", driver);
    ref.current?.close();
  };
  const handleTruckSelect = (truck: Truck) => {
    methods.setValue("truck", truck);
    selectTruckSheetRef.current?.close();
  };

  const onSubmit = (values: TripFormFields) => {
    const tripRequest: TripRequest = {
      truckId: values.truck.id,
      driverId: values.driver.id,
      destination,
      startLocation,
      height: values.height,
      width: values.width,
      length: values.length,
      weight: values.weight,
      task: values.task,
    };

    const dispatchedRes = dispatch(createTripAction(tripRequest));
    const requestId = dispatchedRes.requestId;

    setRequestId(requestId);

    dispatchedRes
      .unwrap()
      .then(() => {
        showAlert({
          type: "success",
          title: "Success",
          description: "Created Successfully",
        });
        navigation.navigate("Trips");
      })
      .catch((error) =>
        showAlert({ type: "error", title: "Error", description: error.message })
      );
  };

  useEffect(() => {
    dispatch(bottomTabsBarActions.hideBottomTab());
  }, []);

  return (
    <>
      <SelectTruckSheet
        onSelect={handleTruckSelect}
        ref={selectTruckSheetRef}
      />
      <SelectDriverSheet onSelect={handleDriverSelect} ref={ref} />
      <ScrollView contentContainerStyle={styles.container}>
        <Text variant="titleSmall">Trip Location</Text>
        <Divider />
        <Card>
          <Card.Content>
            <LocationSelector
              disableSelect
              startLocation={startLocation}
              destination={destination}
            />
          </Card.Content>
        </Card>
        <Text variant="titleSmall">Trip Details</Text>
        <Divider />
        <FormProvider {...methods}>
          <View style={styles.alignInputs}>
            <DateInput
              name="date"
              wrapperStyle={{ flex: 1 }}
              label="Date"
              placeholder="Enter date"
            />
            <TimeInput
              name="time"
              wrapperStyle={{ flex: 1 }}
              label="Time"
              placeholder="Enter Time"
            />
          </View>

          <TextInput name="task" label="Task" placeholder="Enter task" />
          <TextInput
            onPress={() => {
              selectTruckSheetRef.current?.present();
            }}
            inputMode="none"
            caretHidden
            name="truck"
            label="Truck"
            placeholder="Select Truck"
            getFieldValue={(truck: Truck) => truck?.number}
          />
          <TextInput
            onPress={() => ref.current?.present()}
            inputMode="none"
            caretHidden
            name="driver"
            label="Driver"
            getFieldValue={(driver: Driver) => driver?.name}
            placeholder="Select Driver"
          />
          <Text variant="titleSmall">Package parameters</Text>
          <Divider />
          <View style={styles.alignInputs}>
            <TextInput
              name="weight"
              wrapperStyle={{ flex: 1 }}
              label="Weight"
              placeholder="Enter Weight"
              inputMode="decimal"
            />
            <TextInput
              name="length"
              wrapperStyle={{ flex: 1 }}
              label="Length"
              inputMode="decimal"
              placeholder="Enter Length"
            />
          </View>
          <View style={styles.alignInputs}>
            <TextInput
              name="width"
              wrapperStyle={{ flex: 1 }}
              label="Width"
              placeholder="Enter Width"
              inputMode="decimal"
            />
            <TextInput
              name="height"
              wrapperStyle={{ flex: 1 }}
              label="Height"
              placeholder="Enter Height"
              inputMode="decimal"
            />
          </View>
        </FormProvider>
      </ScrollView>

      <Button
        onPress={methods.handleSubmit(onSubmit)}
        uppercase
        style={{ marginHorizontal: 12, marginBottom: 12, padding: 6 }}
        labelStyle={{ fontSize: fonts.bodyLarge.fontSize }}
        mode="contained"
        loading={requestStatus[requestId] === "loading"}
      >
        CREATE TRIP
      </Button>
    </>
  );
}

const styles = StyleSheet.create({
  container: { padding: 12, gap: 8 },
  alignInputs: { flexDirection: "row", gap: 8 },
  dateTimeInput: { flex: 1 },
  content: { flexDirection: "row" },
  mgTop: { marginTop: 12 },
  divider: { marginVertical: 12, width: "100%" },
  left: { alignItems: "center", marginRight: 12 },
  direction: {
    flex: 1,
    width: 0,
    borderWidth: 1,
    borderStyle: "dashed",
    marginVertical: 4,
  },
});

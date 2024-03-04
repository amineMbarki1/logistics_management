import { View, StyleSheet } from "react-native";
import { Button, Text, Divider } from "react-native-paper";
import { FormProvider, useForm } from "react-hook-form";
import { useRef } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import ImagePicker from "@/shared/components/imagePicker/ImagePicker";
import TextInput from "@/shared/components/input/TextInput";
import truckImg from "@/assets/images/truck.png";
import { TruckRequest } from "../types";
import useUploadImage from "@/shared/hooks/useUploadImage";
import useReduxStore from "@/shared/hooks/useReduxStore";
import { createTruckAction } from "../truckSlice";
import showAlert from "@/utils/showAlert";
import { TRUCK_IMAGE_URL } from "@/shared/constants";
import { RootStackParamsList } from "../TrucksStack";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type Props = NativeStackScreenProps<RootStackParamsList, "NewTruck">;

export default function CreateTruckScreen({ navigation }: Props) {
  const methods = useForm<TruckRequest>();
  const pickedImageRef = useRef<string | null>(null);

  const { uploadImage, uploadingImage } = useUploadImage();
  const { dispatch, useSelector } = useReduxStore();
  const { status } = useSelector((state) => state.truck);
  const isLoading = status.create === "loading" || uploadingImage;

  const onSubmit = async (values: TruckRequest) => {
    if (pickedImageRef.current) {
      try {
        const downloadUrl = await uploadImage(pickedImageRef.current);
        values.photo = downloadUrl;
        dispatch(createTruckAction(values))
          .unwrap()
          .then(() =>
            showAlert({
              type: "success",
              title: "SUCCESS",
              description: "Created New Truck",
            })
          );
        navigation.navigate("Trucks");
      } catch (error) {
        showAlert({
          type: "error",
          title: "Failed",
          description: "Failed to create truck",
        });
      }
    } else {
      values.photo = TRUCK_IMAGE_URL;
      dispatch(createTruckAction(values))
        .unwrap()
        .then(() =>
          showAlert({
            type: "success",
            title: "SUCCESS",
            description: "Created New Truck",
          })
        );
      navigation.navigate("Trucks");
    }
  };
  return (
    <View style={styles.container}>
      <FormProvider {...methods}>
        <KeyboardAwareScrollView contentContainerStyle={styles.inputs}>
          <ImagePicker
            onImagePicked={(uri) => (pickedImageRef.current = uri)}
            defaultImage={truckImg}
          />
          <Text variant="titleMedium">Truck Details</Text>
          <Divider />
          <TextInput label="Truck Number" name="number" />
          <TextInput label="Truck Brand" name="brand" />
          <TextInput label="Model Number" name="modelNumber" />
          <TextInput
            label="Max. Load Capacity (Tonnes)"
            name="maxLoadCapacity"
            keyboardType="numeric"
          />
        </KeyboardAwareScrollView>
        <Button
          onPress={methods.handleSubmit(onSubmit)}
          mode="contained"
          style={styles.cta}
          loading={isLoading}
          disabled={isLoading}
        >
          {uploadingImage ? "Uploading Image" : "Create Truck"}
        </Button>
      </FormProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  inputs: { gap: 8 },
  cta: { marginTop: "auto", padding: 8 },
});

import { Button, Divider, Text } from "react-native-paper";
import { View, StyleSheet } from "react-native";
import { FormProvider, useForm } from "react-hook-form";
import { useEffect, useRef } from "react";
import { actions as bottomTabsActions } from "@/navigation/bottomTabsBarSlice";

import TextInput from "@/shared/components/input/TextInput";
import ImagePicker from "@/shared/components/imagePicker/ImagePicker";
import personImg from "@/assets/images/person.png";
import useUploadImage from "@/shared/hooks/useUploadImage";
import { DriverRequest } from "../types";
import useReduxStore from "@/shared/hooks/useReduxStore";
import { createDriverAction } from "../driversSlice";
import { Toast } from "toastify-react-native";

export default function CreateDriverScreen() {
  const pickedImageRef = useRef<string | null>(null);

  const { uploadImage, uploadingImage } = useUploadImage();
  const { dispatch, useSelector } = useReduxStore();
  const { status } = useSelector((state) => state.driver);
  const isLoading = status.create === "loading" || uploadingImage;

  const methods = useForm<DriverRequest>();

  const onSubmit = async (values: DriverRequest) => {
    if (pickedImageRef.current) {
      const downloadUrl = await uploadImage(pickedImageRef.current);
      methods.setValue("photo", downloadUrl);
      dispatch(createDriverAction(values))
        .unwrap()
        .then(() => Toast.success("Driver Created Successfully"));
    }
  };

  useEffect(() => {
    dispatch(bottomTabsActions.hideBottomTab());
    return () => {
      dispatch(bottomTabsActions.showBottomTab());
    };
  }, []);

  return (
    <View style={styles.container}>
      <ImagePicker
        defaultImage={personImg}
        onImagePicked={(uri) => (pickedImageRef.current = uri)}
      />

      <Text variant="titleMedium">Driver Details</Text>
      <Divider />
      <FormProvider {...methods}>
        <TextInput name="name" label="Name" placeholder="Enter full name" />
        <TextInput
          name="phoneNumber"
          label="Phone Number"
          placeholder="Enter phone number"
        />
        <TextInput
          name="licenceNumber"
          label="Licence Number"
          placeholder="Enter licence number"
        />
      </FormProvider>
      <Button
        onPress={methods.handleSubmit(onSubmit)}
        style={styles.cta}
        mode="contained"
        loading={isLoading}
        disabled={isLoading}
      >
        {uploadingImage ? "Uploading image" : "Create Driver"}
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 8,
    backgroundColor: "white",
    flex: 1,
  },
  cta: { marginTop: "auto", padding: 8 },
});

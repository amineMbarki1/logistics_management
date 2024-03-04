import { FormProvider, useForm } from "react-hook-form";
import { Button, Text, useTheme } from "react-native-paper";
import { StyleSheet, View } from "react-native";

import { MaterialTopTabScreenProps } from "@react-navigation/material-top-tabs";

import TextInput from "@/shared/components/input/TextInput";
import { RootParamsList } from "../DriverTopTabs";
import useCustomTheme from "@/shared/hooks/useCustomTheme";
import useReduxStore from "@/shared/hooks/useReduxStore";

type Props = MaterialTopTabScreenProps<RootParamsList, "About">;

export default function AboutDriverScreen({ route }: Props) {
  const id = route.params.id;
  const { colors } = useCustomTheme();
  const { useSelector } = useReduxStore();

  const { drivers } = useSelector((state) => state.driver);
  const driver = drivers?.find((driver) => driver.id === id);
  const methods = useForm({ defaultValues: driver });

  const onSubmit = console.log;

  return (
    driver && (
      <View
        style={[styles.container, { backgroundColor: colors.mainBackground }]}
      >
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
        >
          SAVE
        </Button>
      </View>
    )
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12, gap: 8 },
  cta: { marginTop: "auto", padding: 8 },
});

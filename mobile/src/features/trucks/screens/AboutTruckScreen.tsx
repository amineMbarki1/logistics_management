import { useForm, FormProvider } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";
import { RootParamsList } from "../TruckTopTabs";
import { MaterialTopTabScreenProps } from "@react-navigation/material-top-tabs";

import TextInput from "@/shared/components/input/TextInput";
import useReduxStore from "@/shared/hooks/useReduxStore";
import { selectors } from "../truckSlice";
import useCustomTheme from "@/shared/hooks/useCustomTheme";

type Props = MaterialTopTabScreenProps<RootParamsList, "AboutTruck">;

export default function AboutTruckScreen({ route }: Props) {
  const { useSelector } = useReduxStore();
  const { colors } = useCustomTheme();
  const id = route.params.id;
  const truck = useSelector((state) => selectors.selectById(state, id));

  const methods = useForm({ defaultValues: truck });

  return (
    <View style={{ backgroundColor: colors.mainBackground, flex: 1 }}>
      <FormProvider {...methods}>
        <View style={{ padding: 12, gap: 9 }}>
          <TextInput label="Truck Number" name="number" />
          <TextInput label="Truck Brand" name="brand" />
          <TextInput label="Model Number" name="modelNumber" />
          <TextInput
            label="Max. Load Capacity (Tonnes)"
            name="maxLoadCapacity"
            keyboardType="numeric"
          />
        </View>
        <Button mode="contained" style={{ marginTop: "auto", margin: 12 }}>
          SAVE
        </Button>
      </FormProvider>
    </View>
  );
}

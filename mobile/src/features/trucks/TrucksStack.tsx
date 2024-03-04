import { createNativeStackNavigator } from "@react-navigation/native-stack";

import TrucksScreen from "./screens/TrucksScreen";
import useCustomTheme from "@/shared/hooks/useCustomTheme";
import CreateTruckScreen from "./screens/CreateTruckScreen";
import TruckDetailsScreen from "./screens/TruckDetailsScreen";
import CustomHeader from "@/shared/components/layout/CustomHeader";

export type RootStackParamsList = {
  Trucks: undefined;
  NewTruck: undefined;
  TruckDetails: { id: number };
};

const Stack = createNativeStackNavigator<RootStackParamsList>();

const TrucksStack = () => {
  const { colors } = useCustomTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        header: (props) => <CustomHeader {...props} title="Trucks" />,
        contentStyle: { backgroundColor: colors.mainBackground },
      }}
    >
      <Stack.Screen name="Trucks" component={TrucksScreen} />
      <Stack.Screen name="NewTruck" component={CreateTruckScreen} />
      <Stack.Screen name="TruckDetails" component={TruckDetailsScreen} />
    </Stack.Navigator>
  );
};
export default TrucksStack;

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DriversScreen from "./screens/DriversScreen";
import CreateDriverScreen from "./screens/CreateDriverScreen";
import useCustomTheme from "@/shared/hooks/useCustomTheme";
import DriverDetailsScreen from "./screens/DriverDetailsScreen";
import CustomHeader from "@/shared/components/layout/CustomHeader";

export type RootStackParamsList = {
  Drivers: undefined;
  NewDriver: undefined;
  DriverDetails: { id: number };
};

const Stack = createNativeStackNavigator<RootStackParamsList>();

const DriversStack = () => {
  const { colors } = useCustomTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        header: (props) => <CustomHeader {...props} title="Drivers" />,
        contentStyle: { backgroundColor: colors.mainBackground },
      }}
    >
      <Stack.Screen name="Drivers" component={DriversScreen} />
      <Stack.Screen name="NewDriver" component={CreateDriverScreen} />
      <Stack.Screen name="DriverDetails" component={DriverDetailsScreen} />
    </Stack.Navigator>
  );
};
export default DriversStack;

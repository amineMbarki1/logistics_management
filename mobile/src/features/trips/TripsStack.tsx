import { Appbar } from "react-native-paper";
import {
  NativeStackHeaderProps,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";

import TripsScreen from "./screens/TripsScreen";
import SelectLocationScreen from "./screens/createTrip/SelectLocationScreen";
import CreateTripScreen from "./screens/createTrip/CreateTripScreen";
import useCustomTheme from "@/shared/hooks/useCustomTheme";
import { Location } from "./types";

export type RootStackParamsList = {
  Trips: undefined;
  NewTrip: { startLocation: Location; destination: Location };
  SelectLocation: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamsList>();

const TripsStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: { backgroundColor: "#fff" },
        header: (props) => <CustomHeader title={props.route.name} {...props} />,
      }}
    >
      <Stack.Screen
        options={{ title: "Trips" }}
        name="Trips"
        component={TripsScreen}
      />
      <Stack.Screen
        name="SelectLocation"
        component={SelectLocationScreen}
        options={{ title: "Select locations" }}
      />
      <Stack.Screen
        name="NewTrip"
        component={CreateTripScreen}
        options={{
          header: (props) => (
            <CustomHeader title="Create new trip" {...props} />
          ),
        }}
      />
    </Stack.Navigator>
  );
};
export default TripsStack;

function CustomHeader(props: NativeStackHeaderProps & { title: string }) {
  const { colors } = useCustomTheme();

  return (
    <Appbar.Header
      elevated
      style={{
        backgroundColor: colors.mainBackground,

        flexDirection: "row",
      }}
    >
      {props.back && <Appbar.BackAction onPress={props.navigation.goBack} />}

      <Appbar.Content title={props.options.title} />
    </Appbar.Header>
  );
}

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import AboutDriverScreen from "./screens/AboutDriverScreen";
import { Text } from "react-native-paper";

export type RootParamsList = {
  About: { id: number };
  History: undefined;
};

const Tab = createMaterialTopTabNavigator<RootParamsList>();

export default function DriverTopTabs({ id }: { id: number }) {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarItemStyle: {
          alignSelf: "baseline",
          width: 100,
          alignItems: "flex-start",
        },
      }}
    >
      <Tab.Screen
        initialParams={{ id }}
        name="About"
        component={AboutDriverScreen}
      />
      <Tab.Screen name="History" component={History} />
    </Tab.Navigator>
  );
}

function History() {
  return <Text>No implemented yet</Text>;
}

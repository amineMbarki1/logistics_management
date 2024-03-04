import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Text } from "react-native-paper";
import AboutTruckScreen from "./screens/AboutTruckScreen";
import { useEffect } from "react";

export type RootParamsList = {
  AboutTruck: { id: number };
  History: undefined;
};

const Tab = createMaterialTopTabNavigator<RootParamsList>();

export default function TruckTopTabs({ id }: { id: number }) {
  return (
    <Tab.Navigator
      initialRouteName="AboutTruck"
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
        name="AboutTruck"
        component={AboutTruckScreen}
        options={{ tabBarLabel: "About" }}
      />
      <Tab.Screen
        name="History"
        component={History}
        options={{ tabBarLabel: "History" }}
      />
    </Tab.Navigator>
  );
}

function History() {
  return <Text>Not implemented yet</Text>;
}

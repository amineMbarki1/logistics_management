import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";

import TripsStackNavigator from "../features/trips/TripsStack";
import ProfileScreen from "@/features/profile/screens/ProfileScreen";
import TrucksStack from "@/features/trucks/TrucksStack";
import DriversStack from "@/features/drivers/DriversStack";
import useCustomTheme from "@/shared/hooks/useCustomTheme";
import { SafeAreaProvider } from "react-native-safe-area-context";
import useReduxStore from "@/shared/hooks/useReduxStore";

const Tab = createMaterialBottomTabNavigator();

export default function MainNavigator() {
  const { colors } = useCustomTheme();
  const { useSelector } = useReduxStore();
  const showBar = useSelector((state) => state.bottomTabsBar.showBottomTabsBar);

  return (
    <SafeAreaProvider>
      <Tab.Navigator
        shifting
        sceneAnimationEnabled
        activeColor={colors.primary}
        barStyle={{
          display: showBar ? "flex" : "none",
          backgroundColor: colors.mainForeground,
        }}
        initialRouteName="Home"
      >
        <Tab.Screen
          options={{ tabBarIcon: "home", tabBarLabel: "Trips" }}
          name="Home"
          component={TripsStackNavigator}
        />
        <Tab.Screen
          options={{
            tabBarLabel: "Drivers",
            tabBarIcon: "seat-recline-normal",
          }}
          name="DriversList"
          component={DriversStack}
        />
        <Tab.Screen
          options={{ tabBarIcon: "truck", tabBarLabel: "Trucks" }}
          name="TrucksList"
          component={TrucksStack}
        />
        <Tab.Screen
          options={{ tabBarIcon: "account" }}
          name="Profile"
          component={ProfileScreen}
        />
      </Tab.Navigator>
    </SafeAreaProvider>
  );
}



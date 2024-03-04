import { NavigationContainer } from "@react-navigation/native";
import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
} from "react-native-paper";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider } from "react-redux";
import { View } from "react-native";
import ToastManager from "toastify-react-native";
import { NotifierWrapper } from "react-native-notifier";

import MainNavigator from "./src/navigation/MainNavigator";
import { store } from "@/store";
import { COLOR_SCHEMES } from "./src/theme";

const theme = {
  ...DefaultTheme,
  colors: COLOR_SCHEMES.light.colors,
};

export default function App() {
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          <PaperProvider theme={theme}>
            <View style={{ flex: 1 }}>
              <ToastManager hasBackdrop />
              <NotifierWrapper>
                <MainNavigator />
              </NotifierWrapper>
            </View>
          </PaperProvider>
        </NavigationContainer>
      </GestureHandlerRootView>
    </Provider>
  );
}

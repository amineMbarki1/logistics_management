import { View } from "react-native";
import { Ref, forwardRef, useEffect, useMemo, useState } from "react";
import { ActivityIndicator } from "react-native-paper";
import { FlatList } from "react-native-gesture-handler";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";

import useReduxStore from "@/shared/hooks/useReduxStore";
import { NativeViewGestureHandler } from "react-native-gesture-handler";
import { getDriversAction } from "@/features/drivers/driversSlice";
import ErrorScreen from "@/shared/components/error/ErrorScreen";
import { Driver as DriverType } from "@/features/drivers/types";
import Drivers from "@/features/drivers/components/Drivers";

interface Props {
  onSelect?: (driver: DriverType) => void;
}

export default forwardRef(function SelectDriver(
  { onSelect }: Props,
  ref: Ref<BottomSheetModal>
) {
  const { dispatch, useSelector } = useReduxStore();

  const { drivers, status, error, requestStatus } = useSelector(
    (state) => state.driver
  );
  const [requestId, setRequestId] = useState<string | null>("");

  const snapPoints = useMemo(() => ["80%", "80%"], []);

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        onChange={(snapPoint) => {
          if (snapPoint === 1)
            setRequestId(dispatch(getDriversAction()).requestId);
        }}
        containerStyle={{ zIndex: 1 }}
        ref={ref}
        snapPoints={snapPoints}
      >
        {requestStatus[requestId!] === "loading" && <ActivityIndicator />}
        {status.getAll === "failed" && (
          <ErrorScreen
            status={error?.message}
            containerStyle={{ justifyContent: "flex-start", marginTop: 20 }}
          />
        )}
        <NativeViewGestureHandler disallowInterruption={true}>
          <View style={{ flex: 1 }}>
            {drivers && <Drivers onPress={onSelect} drivers={drivers} />}
          </View>
        </NativeViewGestureHandler>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
});

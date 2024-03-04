import { NativeViewGestureHandler } from "react-native-gesture-handler";
import { Ref, forwardRef, useMemo, useState } from "react";
import { ActivityIndicator } from "react-native-paper";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";

import useReduxStore from "@/shared/hooks/useReduxStore";
import Trucks from "@/features/trucks/components/Trucks";
import { Truck } from "@/features/trucks/types";
import { View } from "react-native";
import { getTrucksAction } from "@/features/trucks/truckSlice";

interface Props {
  onSelect?: (truck: Truck) => void;
}

export default forwardRef(function SelectDriver(
  { onSelect }: Props,
  ref: Ref<BottomSheetModal>
) {
  const [requestId, setRequestId] = useState("");
  const { useSelector, dispatch } = useReduxStore();
  const { trucks, requestStatus } = useSelector((state) => state.truck);

  const snapPoints = useMemo(() => ["80%", "80%"], []);

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        onChange={(snapPoint) => {
          if (snapPoint === 1)
            setRequestId(dispatch(getTrucksAction()).requestId);
        }}
        enablePanDownToClose
        containerStyle={{ zIndex: 1 }}
        ref={ref}
        snapPoints={snapPoints}
      >
        <NativeViewGestureHandler disallowInterruption={true}>
          <View style={{ flex: 1 }}>
            {requestStatus[requestId] === "loading" && <ActivityIndicator />}
            {trucks && <Trucks onPress={onSelect} trucks={trucks} />}
          </View>
        </NativeViewGestureHandler>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
});

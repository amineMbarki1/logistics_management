import BottomSheet, {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { forwardRef, Ref, useMemo, useState } from "react";
import { ActivityIndicator, List, Searchbar } from "react-native-paper";
import { useDebouncedCallback } from "use-debounce";

import {
  fetchLocationSuggestions,
  LocationResponse,
} from "@/api/locationClient";
import { FlatList } from "react-native-gesture-handler";
import { Alert } from "react-native";

interface Props {
  onSelect?: (location: LocationResponse) => void;
}

const SearchLocationSheet = forwardRef(function SearchLocationSheet(
  { onSelect }: Props,

  ref: Ref<BottomSheetModal>
) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchSuggestions, setSuggestions] = useState<LocationResponse[]>([]);
  const [loading, setLoading] = useState(false);

  const debounce = useDebouncedCallback(async (value) => {
    if (!value.trim()) return;
    try {
      setLoading(true);
      const suggestions = await fetchLocationSuggestions(value);
      setSuggestions(suggestions);
    } catch (error) {
      Alert.alert("Error", "There was an error");
    } finally {
      setLoading(false);
    }
  }, 1000);

  const snapPoints = useMemo(() => ["80%", "80%"], []);

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        containerStyle={{ zIndex: 10000 }}
        enablePanDownToClose
        snapPoints={snapPoints}
        ref={ref}
      >
        <Searchbar
          style={{ marginHorizontal: 8, paddingRight: 12 }}
          right={() => loading && <ActivityIndicator />}
          value={searchQuery}
          onChangeText={(value) => {
            setSearchQuery(value);
            debounce(value);
          }}
          placeholder="Search location ..."
        />
        <List.Section>
          <FlatList
            data={searchSuggestions}
            renderItem={({ item }) => (
              <List.Item
                disabled={loading}
                onPress={() => onSelect && onSelect(item)}
                title={item.display_name}
              />
            )}
          />
        </List.Section>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
});

export default SearchLocationSheet;

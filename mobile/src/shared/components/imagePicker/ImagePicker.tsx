import { View, Pressable, StyleSheet, ImageSourcePropType } from "react-native";
import { Icon } from "react-native-paper";
import { useState } from "react";
import Avatar from "@/shared/components/avatar/Avatar";
import * as ExpoImagePicker from "expo-image-picker";

import useCustomTheme from "@/shared/hooks/useCustomTheme";
import uploadImage from "@/utils/uploadImage";

export default function ImagePicker({
  defaultImage,
  onImagePicked,
}: {
  defaultImage: string;
  onImagePicked?: (uri: string) => void;
}) {
  const [image, setImage] = useState<null | string>(null);
  const { colors } = useCustomTheme();
  const pickImage = async () => {
    let result = await ExpoImagePicker.launchImageLibraryAsync({
      mediaTypes: ExpoImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      if (onImagePicked) onImagePicked(result.assets[0].uri);
    }
  };
  return (
    <Pressable onPress={pickImage} style={{ alignSelf: "center" }}>
      <Avatar
        source={
          image
            ? ({ uri: image } as ImageSourcePropType)
            : (defaultImage as ImageSourcePropType)
        }
      />
      <View
        style={[
          styles.imageUploadIndicator,
          { backgroundColor: colors.primary },
        ]}
      >
        <Icon source="camera" size={16} color="#fff" />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  imageUploadIndicator: {
    alignSelf: "baseline",
    justifyContent: "center",
    alignItems: "center",
    height: 30,
    width: 30,
    borderRadius: 26,
    position: "absolute",
    right: -10,
    top: 60,
  },
});

import { useState } from "react";
import uploadImage from "@/utils/uploadImage";

export default function useUploadImage() {
  const [loading, setLoading] = useState(false);

  async function uploadAndUpdateState(uri: string) {
    try {
      setLoading(true);
      return await uploadImage(uri);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  }

  return { uploadImage: uploadAndUpdateState, uploadingImage: loading };
}

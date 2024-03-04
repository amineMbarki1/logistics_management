import { uploadBytes, ref, getStorage, getDownloadURL } from "firebase/storage";
import "@/firebaseConfig";
import "react-native-get-random-values";
import { v4 } from "uuid";

export default async function uploadImage(uri: string) {
  const response = await fetch(uri);
  const blob = await response.blob();
  const storage = getStorage();
  const storageRef = ref(
    storage,
    "images/" + v4() + "." + blob.type.split("/")[1]
  );
  return await uploadBytes(storageRef, blob).then((snapshot) =>
    getDownloadURL(snapshot.ref)
  );
}

import { Notifier } from "react-native-notifier";

import { AlertType } from "../shared/types";
import AlertSuccess from "@/shared/components/notifcation/AlertSuccess";
import AlertError from "../shared/components/notifcation/AlertError";

export default function showAlert({
  type,
  title,
  description,
}: {
  type: AlertType;
  title: string;
  description: string;
}) {
  if (type === "error")
    Notifier.showNotification({
      title,
      description,
      Component: AlertError,
    });
  else
    Notifier.showNotification({
      title,
      description,
      Component: AlertSuccess,
    });
}

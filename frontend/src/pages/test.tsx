import React from "react";
import { useNotification } from "../components/common/NotificationStack";
// import NotificationStack from "../components/common/NotificationStack";

export default function () {
  const { showSuccess } = useNotification();
  const showNoti = () => {
    showSuccess("ok", "tuyet voi");
  };
  return <button onClick={showNoti}>CLICK</button>;
}

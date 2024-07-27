
import { message } from "antd";

export const copyLinkToClipboard = (event: any) => {
  event.preventDefault();
  const url = window.location.href;
  navigator.clipboard
    .writeText(url)
    .then(() => {
      message.success("succes");
      // Optionally, you can show a notification to the user
    })
    .catch((error) => {
      console.error("Failed to copy URL to clipboard:", error);
    });
};

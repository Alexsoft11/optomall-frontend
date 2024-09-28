import { message } from "antd"; // Assuming you are using Ant Design for notifications

export const copyLinkToClipboard = (event: any, type: 'location' | 'url', url?: string) => {
  event.preventDefault();
  const textToCopy = type === 'location' ? window.location.href : url;

  if (!textToCopy) {
    console.error("No URL provided to copy.");
    return;
  }

  navigator.clipboard
    .writeText(textToCopy)
    .then(() => {
      message.success("Successfully copied to clipboard");
    })
    .catch((error) => {
      console.error("Failed to copy text to clipboard:", error);
    });
};
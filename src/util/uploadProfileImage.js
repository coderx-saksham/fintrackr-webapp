import { API_ENDPOINTS } from "./apiEndpoints.js";

const CLOUDINARY_UPLOAD_PRESET = "FinTrackr";

/** Resize/compress image so a data-URL fallback fits in the DB TEXT column */
const fileToCompressedDataUrl = (file, maxWidth = 400, quality = 0.72) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Failed to read image file"));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error("Failed to process image"));
      img.onload = () => {
        const scale = Math.min(1, maxWidth / img.width);
        const canvas = document.createElement("canvas");
        canvas.width = Math.max(1, Math.round(img.width * scale));
        canvas.height = Math.max(1, Math.round(img.height * scale));
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });

const uploadProfileImage = async (image) => {
  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

  try {
    const response = await fetch(API_ENDPOINTS.UPLOAD_IMAGE, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const message =
        errorData?.error?.message || response.statusText || "Upload failed";
      throw new Error(message);
    }

    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    console.warn("Cloudinary upload failed, using local image fallback:", error.message);
    // Fallback so registration still works when the unsigned preset is missing/misconfigured
    return fileToCompressedDataUrl(image);
  }
};

export default uploadProfileImage;

import axios from "axios";
import { ip } from "../utils/ipconfig";

 export const uploadFiles = async (files) => {
  const formData = new FormData();
  files.forEach((file) => formData.append("images", file));

  try {
    const response = await axios.post(`${ip}/api/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    alert("Error uploading files:", error);
    throw error;
  }
};

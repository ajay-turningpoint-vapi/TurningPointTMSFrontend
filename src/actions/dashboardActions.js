import axios from "axios";
import { ip } from "../utils/ipconfig";

export const getAllUsersPerformance = async () => {
  try {
    const response = await axios.get(`${ip}/api/dashboard/admin`);

    return response.data;
  } catch (error) {
    console.error("Error fetching performance data:", error);
    throw error;
  }
};



export const getAllCategoryPerformance = async () => {
  try {
    const response = await axios.get(`${ip}/api/dashboard/allcategoryperformance`);

    return response;
  } catch (error) {
    console.error("Error fetching performance data:", error);
    throw error;
  }
};
import axios from "axios";
import { ip } from "../utils/ipconfig";

export const getAllUsersPerformance = async () => {
  try {
    const response = await axios.get(`${ip}/api/dashboard/allusersperformance`);
    return response.data;
  } catch (error) {
    console.error("Error fetching performance data:", error);
    throw error;
  }
};

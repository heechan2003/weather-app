import axios from "axios";
import { ForecastResponse } from "../types/weather";

const API_KEY = import.meta.env.VITE_OW_ACCESS_TOKEN;

/**
 * Fetches current weather data for a given city using Axios.
 * @param city - The city name (e.g., "New York")
 * @returns ForecastResponse or null if the request fails
 */
export async function getForecast(lat: number, lon: number): Promise<ForecastResponse | null> {
    try {
        const response = await axios.get<ForecastResponse>(`https://api.openweathermap.org/data/2.5/forecast`, {
            params: {
                lat: lat,
                lon: lon,
                appid: API_KEY
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching weather data:", error);
        return null;
    }
}
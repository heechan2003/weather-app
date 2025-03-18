import axios from "axios";
import { ForecastResponse } from "../types/weather";

const API_KEY = import.meta.env.VITE_OW_ACCESS_TOKEN;

/**
 * Fetches current weather data for a given city using Axios.
 * @param city - The city name (e.g., "New York")
 * @returns ForecastResponse or null if the request fails
 */
export async function getForecast(city: string): Promise<ForecastResponse | null> {
    try {
        const response = await axios.get<ForecastResponse>(`https://api.openweathermap.org/data/2.5/forecast`, {
            params: {
                q: city,
                appid: API_KEY
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching weather data:", error);
        return null;
    }
}
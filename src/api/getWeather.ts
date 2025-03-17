import axios from "axios";
import {  CurrentWeatherResponse } from "../types/weather";

const API_KEY = import.meta.env.VITE_WS_ACCESS_TOKEN;
const BASE_URL = "http://api.weatherstack.com";

/**
 * Fetches current weather data for a given city
 * @param city - The city name (e.g., "New York")
 * @returns WeatherData or an error message
 */
export const getWeather = async (city: string): Promise<CurrentWeatherResponse | null> => {
    const options = {
        method: 'GET',
        url: `${BASE_URL}/current?access_key=${API_KEY}`,
        params: {
            query: city
        }
    }
    try {
        const response = await axios.request(options);

        // Check if the API returned an error
        if (response.data.success === false) {
        console.error("API Error:", response.data.error.info);
        return null;
        }

        return response.data as CurrentWeatherResponse;
    } catch (error) {
        console.error("Error fetching weather:", error);
        return null;
    }
};
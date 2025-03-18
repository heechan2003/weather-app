import axios from "axios"
import { AutocompleteResponse } from "../types/weather";

const API_KEY = import.meta.env.VITE_GA_ACCESS_TOKEN;
const BASE_URL = "https://api.geoapify.com/v1/geocode/autocomplete?";

/**
 * Fetches autocomplete locations from given input
 * @param query: string - The given input
 * @returns AutoCompleteResponse or null
 */
export const autocomplete = async (query: string): Promise<AutocompleteResponse | null> => {
    const options = {
        method: 'GET',
        url: `${BASE_URL}text=${query}&type=city&format=json&apiKey=${API_KEY}`,
    }
    try {
        const response = await axios.request(options);
        if (response.data.success === false) {
            console.error("API Error:", response.data.error.info);
            return null;
        }
        if (response.data) {
            return response.data as AutocompleteResponse;
        }
    return null;
    } catch (error) {
        console.error("Error fetching weather:", error);
        return null;
    }
};
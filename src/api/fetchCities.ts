import axios from "axios";
import { AutocompleteLocation } from "../types/weather";

const API_KEY = import.meta.env.VITE_GA_ACCESS_TOKEN;

/**
 * Fetches autocomplete suggestions from given query
 * @param query- query of input
 * @returns autocomplete suggestions or null if the request fails
 */
// with given query, autocomplete city names and return results as array
export const fetchCities = async (query: string) => {
    try {
        const response = await axios.get('https://api.geoapify.com/v1/geocode/autocomplete', {
            params: {
                text: query,
                type: 'city',
                format: 'json',
                apiKey: API_KEY
            }
        });
        if (response.data) {
            return response.data.results.map((s: AutocompleteLocation) => ({
                value: `${s.city}, ${s.country}, ${s.lat}, ${s.lon}`,
                label: `${s.city}, ${s.country}`
            }))
        }
    return null;
    } catch (error) {
        console.error("Error fetching weather:", error);
        return null;
    }
}
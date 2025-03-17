export const autocomplete = async (query: string) => {
    const API_KEY = import.meta.env.VITE_GA_ACCESS_TOKEN;
    const BASE_URL = "https://api.geoapify.com/v1/geocode/autocomplete?";

    try {
        const response = await fetch(`${BASE_URL}text=${query}&type=city&format=json&apiKey=${API_KEY}`);
        const data = await response.json();
        return data;  // Ensure function returns data
    } catch (error) {
        console.error("Error fetching autocomplete:", error);
        return null;
    }
};
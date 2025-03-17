import { useEffect, useState } from "react";
import { getWeather} from "./api/getWeather";
import { autocomplete } from "./api/autocomplete.ts"
import { CurrentWeatherResponse, AutocompleteResponse } from "./types/weather";
import './App.css'
import Weather from './components/Weather.tsx'

function App() {
    const [weatherData, setWeatherData] = useState<CurrentWeatherResponse | null>(null);
    const [input, setInput] = useState("")
    const [city, setCity] = useState("");
    const [suggestions, setSuggestions] = useState<AutocompleteResponse | null>(null);

    function addCity(formData: FormData) {
        const city = formData.get("city") as string | null;
        if (city) setCity(city);
    }

    const suggestionElements = suggestions?.results?.map((suggestion, index) => (
        <li key={index} onClick={() => {
            setCity(suggestion.city);
            setSuggestions(null);
        }}>
            {suggestion.city}, {suggestion.country}
        </li>
    )) || [];

    // fetch autocomplete suggestions when input changes
    useEffect(() => {
        if (input.length < 2) {
            setSuggestions(null);
            return;
        }
        const fetchSuggestions = async () => {
            const data = await autocomplete(input);
            if (data) setSuggestions(data);
        };
        fetchSuggestions();
    }, [input]);

    // fetch weather data when city is selected
    useEffect(() => {
        if(!city) return;
        const fetchData = async () => {
            const data = await getWeather(city);
            if (data) setWeatherData(data);
        };
        fetchData();
    }, [city]);

    return (
        <>
            <form className="type-city-form" action={addCity}>
                <input
                    type="text"
                    aria-label="Type city"
                    name="city"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button>Type city</button>
            </form>
            <ul>
                {suggestionElements}
            </ul>
            <Weather
                weather={weatherData}
            />
        </>
    )
}

export default App

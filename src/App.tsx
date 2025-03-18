import { useEffect, useState } from "react";
import { getWeather } from "./api/getWeather";
import { getForecast } from "./api/getForecast.ts";
import { autocomplete } from "./api/autocomplete.ts"
import { WeatherResponse, AutocompleteResponse, ForecastResponse } from "./types/weather";
import Weather from './components/Weather.tsx'

function App() {
    const [weatherData, setWeatherData] = useState<WeatherResponse | null>(null);
    const [forecastData, setForecastData] = useState<ForecastResponse | null >(null);
    const [suggestions, setSuggestions] = useState<AutocompleteResponse | null>(null);
    const [input, setInput] = useState("")
    const [city, setCity] = useState("");

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
            if (data) {
                setWeatherData(data);
            } else {
                setWeatherData(null);
            }
        };
        fetchData();
    }, [city]);

    // fetch forecast data when city is selected
    useEffect(() => {
        if(!city) return;
        const fetchData = async () => {
            const data = await getForecast(city);
            if (data) {
                setForecastData(data);
            } else {
                setForecastData(null);
            }
        };
        fetchData();
    }, [city]);

    return (
        <main>
            <div className="search-wrap">
                <form className="type-city-form" action={addCity}>
                    <input
                        type="text"
                        aria-label="Type city"
                        name="city"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <button>Enter</button>
                </form>
                <ul>
                    {suggestionElements}
                </ul>
            </div>
            <div className="weather-container">
                <Weather
                    weatherResponse={weatherData}
                    forecastResponse={forecastData}
                />
            </div>
        </main>
    )
}

export default App

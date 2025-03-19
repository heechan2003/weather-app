import { useEffect, useState, useRef } from "react";
import { getWeather } from "./api/getWeather";
import { getForecast } from "./api/getForecast.ts";
import { autocomplete } from "./api/autocomplete.ts"
import { WeatherResponse, AutocompleteResponse, ForecastResponse } from "./types/weather";
import Weather from './components/Weather.tsx'

function App() {
    const [weatherData, setWeatherData] = useState<WeatherResponse | null>(null);
    const [forecastData, setForecastData] = useState<ForecastResponse | null >(null);
    const [suggestions, setSuggestions] = useState<AutocompleteResponse | null>(null);
    const [input, setInput] = useState<string>("")
    const [city, setCity] = useState<string>("");
    const inputRef =  useRef<HTMLDivElement | null>(null);

    // city selected from form
    function addCity(formData: FormData) {
        const city = formData.get("city") as string | null;
        if (city) setCity(city);
    }

    // autocomplete suggestions list returned from repsonse
    const suggestionElements = suggestions?.results?.map((suggestion, index) => (
        <li className="suggestion" key={index} onClick={() => {
            setCity(suggestion.city);
        }}>
            {suggestion.city}, <span>{suggestion.country}</span>
        </li>
    )) || [];

    // hides suggestions on clicking outside
    useEffect(() => {
        function handleClick(event: MouseEvent) {
            if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
                setSuggestions(null);
            }
        }
        document.addEventListener("mousedown", handleClick);
        return () => {
            document.removeEventListener("mousedown", handleClick);
        };
    }, [suggestions]);

    // fetch autocomplete suggestions when input changes
    useEffect(() => {
        if (input.length < 3) {
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
        setSuggestions(null);
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
            
            <div className="search-container">
                <form className="city-form" action={addCity}>
                    <div className="input-wrap" ref={inputRef}>
                        <input
                            type="text"
                            aria-label="Type city"
                            name="city"
                            value={input}
                            placeholder="e.g. Seoul"
                            onChange={(e) => setInput(e.target.value)}
                            onFocus={async () => {
                                if (input.length >= 3) {
                                    const data = await autocomplete(input);
                                    if (data) setSuggestions(data);
                                }
                            }}
                        />
                        {suggestions && suggestions.results.length > 0 && (
                            <ul className="suggestions-list">
                                {suggestionElements}
                            </ul>
                        )}
                    </div>
                    <button>Enter</button>
                </form>
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

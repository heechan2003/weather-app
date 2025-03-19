import Select from "react-select";
import { useEffect, useState } from "react";
import { getWeather } from "./api/getWeather";
import { getForecast } from "./api/getForecast.ts";
import { autocomplete } from "./api/autocomplete.ts"
import { WeatherResponse, AutocompleteResponse, ForecastResponse, AutocompleteLocation } from "./types/weather";
import Weather from './components/Weather.tsx'

function App() {
    const [weatherData, setWeatherData] = useState<WeatherResponse | null>(null);
    const [forecastData, setForecastData] = useState<ForecastResponse | null >(null);
    const [suggestions, setSuggestions] = useState<AutocompleteResponse | null>(null);
    const [input, setInput] = useState("")
    const [city, setCity] = useState<AutocompleteLocation| null>(null);

    const suggestionOptions = suggestions?.results?.map((s) => ({
        ...s,
        label: `${s.city}, ${s.country}`,
    })) || [];

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
            const data = await getWeather(city.lat, city.lon);
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
            const data = await getForecast(city.lat, city.lon);
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
                <Select
                    options={suggestionOptions}
                    onChange={(selectedOption) => {
                        if (selectedOption) {
                            setCity(selectedOption);
                        }
                    }}
                    onInputChange={(newInputValue) => {
                        setInput(newInputValue);
                    }}
                    placeholder="Select a city"
                />
            </div>
            <div className="weather-container">
                <Weather
                    weatherResponse={weatherData}
                    forecastResponse={forecastData}
                    location={city}
                />
            </div>
        </main>
    )
}

export default App

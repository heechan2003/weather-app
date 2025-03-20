import AsyncSelect from "react-select/async";
import { useEffect, useState } from "react";
import { fetchCities } from "./api/fetchCities.ts";
import { getWeather } from "./api/getWeather";
import { getForecast } from "./api/getForecast.ts";
import { WeatherResponse, ForecastResponse, CityLocation, Search } from "./types/weather";
import Weather from './components/Weather.tsx'

function App() {
    const [weatherData, setWeatherData] = useState<WeatherResponse | null>(null);
    const [forecastData, setForecastData] = useState<ForecastResponse | null >(null);
    const [city, setCity] = useState<CityLocation | null>(null);

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
        }
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
        }
        fetchData();
    }, [city]);

    return (
        <main>
            <div className="search-wrap">
                <AsyncSelect
                    loadOptions={fetchCities}
                    onChange={(selectedOption: Search | null) => {
                        if (selectedOption) {
                            const [city, lat, lon] = selectedOption.value.split(',');
                            setCity({ name: city, lat: parseFloat(lat), lon: parseFloat(lon) })
                        }
                    }}
                    placeholder="Select a city"
                    styles={{
                        control: (base) => ({ ...base, backgroundColor: "white" }),
                        option: (base, { isFocused }) => ({
                            ...base,
                            backgroundColor: isFocused ? "gray" : "white",
                            color: "black",
                        }),
                    }}
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

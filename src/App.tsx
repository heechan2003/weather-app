import { useEffect, useState } from "react";
import { getWeather} from "./api/getWeather";
import { CurrentWeatherResponse } from "./types/weather";
import './App.css'
import Weather from './components/Weather.tsx'

function App() {
    const [weatherData, setWeatherData] = useState<CurrentWeatherResponse | null>(null);
    const [city, setCity] = useState("");

    function addCity(formData: FormData) {
        const city = formData.get("city") as string | null;
        if (city) setCity(city);
    }

    useEffect(() => {
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
                />
                <button>Type city</button>
            </form>
            <Weather
                weather={weatherData}
            />
        </>
    )
}

export default App

import { CurrentWeatherResponse } from "../types/weather";

interface WeatherProps {
    weather: CurrentWeatherResponse | null;
}

const Weather: React.FC<WeatherProps> = ({ weather }) => {
    if (!weather) {
    return <p>No weather data available.</p>;
    }

    return (
    <div>
        <h2>Weather in {weather.location.name}</h2>
        <p>Temperature: {weather.current.temperature}°C</p>
        <p>Condition: {weather.current.weather_descriptions[0]}</p>
        <img src={weather.current.weather_icons[0]} alt="Weather Icon" />
    </div>
    );
};

export default Weather
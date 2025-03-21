import Icon from "./Icon";
import { WeatherResponse, ForecastResponse, CityLocation } from "../types/weather";
import { toCelcius, toDay, toDate } from "../utils/util";

interface WeatherProps {
    weatherResponse: WeatherResponse | null
    forecastResponse: ForecastResponse | null
    location: CityLocation | null
}

const Weather: React.FC<WeatherProps> = ({ weatherResponse, forecastResponse, location }) => {
    if (!weatherResponse || !forecastResponse || !location) {
        return <p className="no-weather">Weather data not available</p>
    }

    const forecastElements = forecastResponse.list
        .filter(item => item.dt_txt.includes("12:00:00"))
        .map((response) => (
            <div className="card" key={response.dt}>
                <div className="date-container">
                    <p>{toDay(response.dt_txt)}</p>
                    <p>{toDate(response.dt_txt)}</p>
                </div>
                <div className="forecast-description-container">
                    <p>{toCelcius(response.main.temp)} &deg;C</p>
                </div>
            </div>
        )
    );

    return (
        <>
            <div className="current">
                <div className="current-weather-container">
                    <p>{weatherResponse.dt}</p>
                    <Icon 
                        dt={weatherResponse.dt}
                        timezone={weatherResponse.timezone}
                        weather={weatherResponse.weather[0].main}
                    />
                    <h2>{location.city}</h2>
                    <p>{location.country}</p>
                    <h3>{toCelcius(weatherResponse.main.temp)} &deg;C</h3>
                </div>
            </div>
            <div className="forecast">
                {forecastElements}
            </div>
        </>
    );
}

export default Weather
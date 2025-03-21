import Icon from "./Icon";
import { WeatherResponse, ForecastResponse, CityLocation } from "../types/weather";
import { toCelcius, toDay, toDate, capitalize } from "../utils/util";

interface WeatherProps {
    weatherResponse: WeatherResponse | null
    forecastResponse: ForecastResponse | null
    location: CityLocation | null
}

const Weather: React.FC<WeatherProps> = ({ weatherResponse, forecastResponse, location }) => {
    if (!weatherResponse || !forecastResponse || !location) {
        return (
            <p className="no-weather">Weather data not available</p>
        )
    }

    const forecastElements = forecastResponse.list
        .filter(item => item.dt_txt.includes("12:00:00"))
        .map((response) => (
            <div className="card" key={response.dt}>
                <div className="icon-date-wrap">
                    <div className="forecast-icon-container">
                        <Icon 
                            dt={1661871600} // fixed daytime dt
                            timezone={0}
                            weather={response.weather[0].main}
                        />
                    </div>
                    <div className="date-wrap">
                        <p>{toDay(response.dt_txt)}</p>
                        <p>{toDate(response.dt_txt)}</p>
                    </div>
                </div>
                <div className="temp-wrap">
                    <p>{toCelcius(response.main.temp)} &deg;C</p>
                </div>
            </div>
        )
    );

    return (
        <>
            <div className="current">
                <div className="current-left-wrap">
                    <div className="current-text-wrap">
                        <h2>{location.city}</h2>
                        <p>{location.country}</p>
                    </div>
                    <h3>{toCelcius(weatherResponse.main.temp)} &deg;C</h3>
                </div>
                <div className="current-right-wrap">
                    <div className="current-icon-container">
                        <Icon 
                            dt={weatherResponse.dt}
                            timezone={weatherResponse.timezone}
                            weather={weatherResponse.weather[0].main}
                        />
                    </div>
                    <p>{capitalize(weatherResponse.weather[0].description)}</p>
                </div>
            </div>
            <div className="forecast">
                {forecastElements}
            </div>
        </>
    );
}

export default Weather
import { WeatherResponse, ForecastResponse, CityLocation } from "../types/weather";

interface WeatherProps {
    weatherResponse: WeatherResponse | null;
    forecastResponse: ForecastResponse | null;
    location: CityLocation | null;
}

const Weather: React.FC<WeatherProps> = ({ weatherResponse, forecastResponse, location }) => {
    if (!weatherResponse || !forecastResponse || !location) {
        return <p>No weather data available.</p>
    }

    function capitalize(str: string) {
        return str.replace(/\b\w/g, char => char.toUpperCase());
    }

    function toCelcius(kelvin: number) {
        return Math.round((kelvin - 273.15) * 10) / 10
    }

    function iconUrl(icon: string) {
        return `https://openweathermap.org/img/wn/${icon}@2x.png`
    }

    const forecastElements = forecastResponse.list
        .filter(item => item.dt_txt.includes("12:00:00"))
        .map((response) => {
            const day = new Date(response.dt_txt).toLocaleDateString(
                undefined,{weekday: "short"}
            )
            const date = new Date(response.dt_txt).toLocaleDateString(
                undefined,{month: "short", day: "numeric"}
            )

            return (
                <div className="card" key={response.dt}>
                    <div className="date-container">
                        <p>{day}</p>
                        <p>{date}</p>
                    </div>
                    <div className="forecast-icon-container">
                        <img src={iconUrl(response.weather[0].icon)} alt="Weather Icon" />
                    </div>
                    <div className="forecast-description-container">
                        <p>{capitalize(response.weather[0].description)}</p>
                        <p>{toCelcius(response.main.temp)} &deg;C</p>
                    </div>
                </div>
            )
        }
    )

    return (
        <>
            <div className="current">
                <h2>{location.name}</h2>
                <div className="current-icon-container">
                    <img src={iconUrl(weatherResponse.weather[0].icon)} alt="Weather Icon" />
                </div>
                <div className="current-description-container">
                    <p>{capitalize(weatherResponse.weather[0].description)}</p>
                    <p>{toCelcius(weatherResponse.main.temp)} &deg;C</p>
                </div>
            </div>
            <div className="forecast">
                {forecastElements}
            </div>
        </>
    )
}

export default Weather
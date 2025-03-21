import { isDay } from "../utils/util";
import nightWind from "../assets/images/night_wind.png";
import nightStorm from "../assets/images/night_storm.png";
import nightSnow from "../assets/images/night_snow.png";
import nightRain from "../assets/images/night_rain.png";
import nightCloud from "../assets/images/night_cloud.png";
import nightClear from "../assets/images/night_clear.png";
import dayWind from "../assets/images/day_wind.png";
import dayStorm from "../assets/images/day_storm.png";
import daySnow from "../assets/images/day_snow.png";
import dayRain from "../assets/images/day_rain.png";
import dayClear from "../assets/images/day_clear.png";
import dayCloud from "../assets/images/day_cloud.png";

const images: Record<string, string> = {
    night_wind: nightWind,
    night_storm: nightStorm,
    night_snow: nightSnow,
    night_rain: nightRain,
    night_cloud: nightCloud,
    night_clear: nightClear,
    day_wind: dayWind,
    day_storm: dayStorm,
    day_snow: daySnow,
    day_rain: dayRain,
    day_cloud: dayCloud,
    day_clear: dayClear
};

interface IconProps {
    dt: number
    timezone: number
    weather: string
}

const Icon: React.FC<IconProps> = ({ dt, timezone, weather }) => {
    let iconSrc = "";
    if(isDay(dt, timezone)) {
        switch (weather.toLowerCase()) {
            case "thunderstorm":
            iconSrc = images["day_storm"];
            break;
            case "drizzle":
            case "rain":
            iconSrc = images["day_rain"];
            break;
            case "snow":
            iconSrc = images["day_snow"];
            break;
            case "clear":
            iconSrc = images["day_clear"];
            break;
            case "clouds":
            iconSrc = images["day_cloud"];
            break;
            default:
            iconSrc = images["day_wind"];
            break;
        }
    } else {
        switch (weather.toLowerCase()) {
            case "thunderstorm":
            iconSrc = images["night_storm"];
            break;
            case "drizzle":
            case "rain":
            iconSrc = images["night_rain"];
            break;
            case "snow":
            iconSrc = images["night_snow"];
            break;
            case "clear":
            iconSrc = images["night_clear"];
            break;
            case "clouds":
            iconSrc = images["night_cloud"];
            break;
            default:
            iconSrc = images["night_wind"];
            break;
        }
    }

    return (
        <img src={iconSrc || ""} alt={weather} />
    );
};

export default Icon
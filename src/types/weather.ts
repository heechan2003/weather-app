
// complete interface for current weather call on openWeather API
export interface WeatherResponse {
    coord: Coordinates;
    weather: Weather[];
    base: string;
    main: MainWeather;
    visibility: number;
    wind: Wind;
    rain?: Rain;
    clouds: Clouds;
    dt: number;
    sys: Sys;
    timezone: number;
    id: number;
    name: string;
    cod: number;
}

// complete interface for forecast weather call on openWeather API
export interface ForecastResponse {
    cod: string;
    message: number;
    cnt: number;
    list: ForecastItem[];
    city: City;
}

interface ForecastItem {
    dt: number;
    main: MainWeather;
    weather: Weather[];
    clouds: Clouds;
    wind: Wind;
    visibility: number;
    pop: number;
    rain?: Rain;
    sys: Sys;
    dt_txt: string;
}

interface MainWeather {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
}

interface Weather {
    id: number;
    main: string;
    description: string;
    icon: string;
}

interface Clouds {
    all: number;
}

interface Wind {
    speed: number;
    deg: number;
    gust: number;
}

interface Rain {
    "3h": number;
}

interface Sys {
    pod: string;
}

interface City {
    id: number;
    name: string;
    coord: Coordinates;
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
}

interface Coordinates {
    lat: number;
    lon: number;
}

// Address details
export interface AutocompleteLocation {
    city: string;
    country: string;
    country_code: string;
    state?: string;
    state_code?: string;
    county?: string;
    region?: string;
    formatted: string;
    lat: number;
    lon: number;
    postcode?: string;
    address_line1?: string;
    address_line2?: string;
    timezone?: {
        name: string;
        offset_STD: string;
        offset_STD_seconds: number;
        offset_DST: string;
        offset_DST_seconds: number;
        abbreviation_STD: string;
        abbreviation_DST: string;
    };
    bbox?: {
        lon1: number;
        lat1: number;
        lon2: number;
        lat2: number;
    };
    rank?: {
        importance: number;
        confidence: number;
        confidence_city_level: number;
        match_type: string;
    };
    result_type?: string;
}

// Autocomplete Response
export interface AutocompleteResponse {
    results: AutocompleteLocation[];
}
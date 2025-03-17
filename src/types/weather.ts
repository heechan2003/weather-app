// Request info
export interface WeatherRequest {
    type: string;
    query: string;
    language: string;
    unit: string;
}

// Location details
export interface WeatherLocation {
    name: string;
    country: string;
    region: string;
    lat: string;
    lon: string;
    timezone_id: string;
    localtime: string;
    localtime_epoch: number;
    utc_offset: string;
}

// Current weather conditions
export interface CurrentWeather {
    observation_time: string;
    temperature: number;
    weather_code: number;
    weather_icons: string[];
    weather_descriptions: string[];
    wind_speed: number;
    wind_degree: number;
    wind_dir: string;
    pressure: number;
    precip: number;
    humidity: number;
    cloudcover: number;
    feelslike: number;
    uv_index: number;
    visibility: number;
}

// Complete current weather response
export interface CurrentWeatherResponse {
    request: WeatherRequest;
    location: WeatherLocation;
    current: CurrentWeather;
}

// Autocomplete Response
export interface AutocompleteResponse {
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
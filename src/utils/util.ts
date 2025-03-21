// check if day or night with given dt and timezone
function isDay(dt: number, timezone: number) {
    const localTime = new Date((dt + timezone) * 1000);
    const hours = localTime.getUTCHours();
    return hours >= 6 && hours < 18;
}

// change kelvin to celcius
function toCelcius(kelvin: number) {
    return Math.round((kelvin - 273.15) * 10) / 10;
}

// change given dt-txt to short day of week
function toDay(date: string) {
    return new Date(date).toLocaleDateString(
        undefined,{weekday: "short"}
    );
}

// change given dt-txt to month and day
function toDate(date: string) {
    return new Date(date).toLocaleDateString(
        undefined,{month: "short", day: "numeric"}
    );
}

export { toCelcius, isDay, toDay, toDate }
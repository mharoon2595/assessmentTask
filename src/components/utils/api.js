export async function fetchUsers() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }
  return response.json();
}

export async function fetchWeatherData(loc) {
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${loc}&appid=${API_KEY}&units=metric`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch weather data");
  }
  const data = await response.json();
  return data.list.map((item) => {
    let dateString = new Date(item.dt * 1000).toLocaleDateString();
    let timeString = item.dt_txt.split(" ")[1].split(":");
    let temp = item.main.temp;

    let data = {
      date: dateString + " " + timeString[0] + ":" + timeString[1],
      temp,
    };
    return data;
  });
}

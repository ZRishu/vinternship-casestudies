let city: string = "Delhi";
let temperature: number = 45.5;
let isRaining = true;

function weatherReport(
  city: string,
  temperature: number,
  isRaining: boolean,
): void {
  console.log(
    `In ${city}, it is ${temperature}°C. Is it raining? ${isRaining}`
  );
}

weatherReport(city, temperature, isRaining);

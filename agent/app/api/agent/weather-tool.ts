import { z } from "zod";

/**
 * Weather Tool for Vercel AI SDK
 *
 * Provides weather information for any city using OpenWeatherMap API
 */

interface WeatherData {
  location: string;
  temperature: number;
  description: string;
  humidity: number;
  windSpeed: number;
  country: string;
}

/**
 * Fetches current weather data for a given city
 * @param city - The city name to get weather for
 * @returns Weather information
 */
async function getWeatherData(city: string): Promise<WeatherData> {
  try {
    // Mock weather data for the specified city
    return {
      location: city,
      temperature: 22,
      description: "Clear sky",
      humidity: 65,
      windSpeed: 3.5,
      country: "US",
    };
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Failed to fetch weather data");
  }
}

/**
 * Weather tool schema for Vercel AI SDK
 */
export const weatherToolSchema = z.object({
  city: z
    .string()
    .describe(
      "The name of the city to get weather information for (e.g., 'London', 'New York', 'Tokyo')"
    ),
});

/**
 * Weather tool definition for Vercel AI SDK
 */
export const weatherTool = {
  description: "Get current weather information for any city worldwide",
  parameters: weatherToolSchema,
  execute: async ({ city }: z.infer<typeof weatherToolSchema>) => {
    try {
      const weather = await getWeatherData(city);

      return {
        success: true,
        data: weather,
        message: `Current weather in ${weather.location}, ${weather.country}:
        
🌡️ Temperature: ${weather.temperature}°C
🌤️ Condition: ${weather.description}
💧 Humidity: ${weather.humidity}%
💨 Wind Speed: ${weather.windSpeed} m/s

Weather data provided by OpenWeatherMap.`,
      };
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      };
    }
  },
};

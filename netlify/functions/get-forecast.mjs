import { writeFileSync } from 'fs';
import { join } from 'path';

const longitude = -82.32;
const latitude = 35.62;

async function json(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`fetch failed: ${response.status}`);
  return await response.json();
}

export default async function handler(req) {
  try {
    const station = await json(
      `https://api.weather.gov/points/${latitude},${longitude}`
    );
    const forecast = await json(station.properties.forecastHourly);
    
    // Write to the dist directory so it's accessible via the static site
    writeFileSync(
      join(process.cwd(), 'dist/data/forecast.json'),
      JSON.stringify(forecast)
    );

    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
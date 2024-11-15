---
theme: [ocean-floor, wide]
---

<div class="hero">
  <h1>Black Mountain, NC<br>Weather Report</h1>
  <h2>7-day forecast sourced from the National Weather Service api</h2>
  </div>


```js
const forecast = FileAttachment("./data/forecast.json").json();
```

<div class="grid grid-cols-4">
  <div class="card"><h1>
  
  The **current** time is: <span class="value">${new Date(now).toLocaleTimeString("en-US")}</span>
  
  </h1></div>
  <div class="card"><h1>
  
  The **current** temperature is: <span class="value">${forecast.properties.periods[0].temperature}°F</span>
  
  </h1></div>
  <div class="card"><h1>
  
  The **current** windSpeed is: <span class="value">${forecast.properties.periods[0].windSpeed}</span>
  
  </h1></div>
  <div class="card"><h1>
  
  The **current** conditions are: <span class="value">${forecast.properties.periods[0].shortForecast}</span>
  
  </h1></div>
</div>


```js
display(
  Plot.plot({
    title: "7-day temperature forecast",
    width,
    x: {type: "utc", ticks: "day", label: null},
    y: {grid: true, inset: 10, label: "Degrees (F)"},
    marks: [
      Plot.ruleY([1]),
      Plot.areaY(forecast.properties.periods, {
        x: "startTime",
        y: "temperature",
        z: null,
        tip: true,
        stroke: "temperature",
        curve: "natural"
      }),
    ]
  })
);
```

```js
display(
  Plot.plot({
    title: "7-day precipitation forecast",
    width,
    x: {type: "utc", ticks: "day", label: null},
    y: {grid: true, inset: 10, label: "Percent (%)", domain: [0, 100]},
    marks: [
      Plot.ruleY([0]),
      Plot.areaY(forecast.properties.periods, {
        x: "startTime",
        y: d => d.probabilityOfPrecipitation.value,  // Access the nested value
        z: null,
        fill: "#46ceed",
        tip: true,
        curve: "natural"
      })
    ]
  })
);
```
```js
display(
  Plot.plot({
    title: "7-day relative humidity forecast",
    width,
    x: {type: "utc", ticks: "day", label: null},
    y: {grid: true, inset: 10, label: "Percent (%)", domain: [0, 100]},
    marks: [
      Plot.ruleY([0]),
      Plot.areaY(forecast.properties.periods, {
        x: "startTime",
        y: d => d.relativeHumidity.value,  // Access the nested value
        z: null,
        fill: "#242166",
        tip: true,
        curve: "natural"
      })
    ]
  })
);
```
```js
display(
  Plot.plot({
    title: "7-day dewpoint forecast",
    width,
    x: {type: "utc", ticks: "day", label: null},
    y: {grid: true, inset: 10, label: "Percent (%)", domain: [0, 100]},
    marks: [
      Plot.ruleY([0]),
      Plot.areaY(forecast.properties.periods, {
        x: "startTime",
        y: d => d.dewpoint.value,  // Access the nested value
        z: null,
        fill: "#d8ff52",
        tip: true,
        curve: "natural"
      })
    ]
  })
);
```

<style>

.hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: var(--sans-serif);
  margin: 4rem 0 8rem;
  text-wrap: balance;
  text-align: center;
}

.hero h1 {
  margin: 1rem 0;
  padding: 1rem 0;
  max-width: none;
  font-size: 12vw;
  font-weight: 900;
  line-height: 1;
  background: linear-gradient(30deg, var(--theme-foreground-focus), currentColor);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

@media (min-width: 640px) {
  .hero h1 {
    font-size: 90px;
  }
}

/* Add spacing between cards */
.grid {
  gap: 2rem;
  margin-bottom: 4rem;
}

.card {
  padding: 1.5rem;
}

/* Add spacing between plot sections */
.observablehq {
  margin-bottom: 4rem;
}

.value {
  color: #d8ff52;
}

</style>





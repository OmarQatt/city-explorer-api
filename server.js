"use strict";
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
const port = process.env.PORT || 3001;
const getWeather = require("./data/weather.json");

app.get("/weather", (req, res) => {
  let searchQuery = req.query.searchQuery;
  let lat = req.query.lat;
  let lon = req.query.lon;
  const city = getWeather.find(
    (item) => item.city_name.toLowerCase() === searchQuery.toLowerCase()
  );

  try {
    const weatherArr = city.data.map((item) => new Weatherinfo(item));
    res.status(200).send(weatherArr);
  } catch (error) {
    handleError(error, res);
  }
});

app.get("*", (req, res) => {
  res.status(404).send("page not found");
});

function handleError(error, res) {
  res.status(500).send("Somtheing went wrong");
}


class Weatherinfo {
  constructor(day) {
    this.date = day.valid_date;
    this.description = day.weather.description;
  }
}

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

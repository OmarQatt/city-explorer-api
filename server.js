"use strict";
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require('axios');

const {weatherData} = require('./module/weather')
const {movieData} = require('./module/movies')
const app = express();
app.use(cors());
const port = process.env.PORT || 3001;
const getWeather = require("./data/weather.json");

app.get('/weather', weatherData)
app.get('/movies', movieData)



app.get("*", (req, res) => {
  res.status(404).send("page not found");
});

function handleError(error, res) {
  res.status(500).send("Somtheing went wrong");
}





app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

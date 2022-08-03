"use strict";
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require('axios');
const app = express();
app.use(cors());
const port = process.env.PORT || 3001;
const getWeather = require("./data/weather.json");

app.get('/weather', async (req, res) => {
  let searchQuery = req.query.searchQuery;
  let lat = req.query.lat;
  let lon = req.query.lon;
  // const city = getWeather.find(
  //   (item) => item.city_name.toLowerCase() === searchQuery.toLowerCase()
  // );
  const keyWeather = process.env.WEATHER_API_KEY;
  const cityArr = await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${keyWeather}`)
console.log(cityArr.data); 

  try {
    const weatherArr = cityArr.data.data.map((item) => new Weatherinfo(item));
    res.status(200).send(weatherArr);
  } catch (error) {
    handleError(error, res);
  }
});

app.get('/movies', async (req,res) => {
  let searchQuery = req.query.searchQuery;

const keyMovie = process.env.MOVIE_API_KEY;

const movieArr = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${keyMovie}&query=${searchQuery}`)
console.log(movieArr);
try {
  const movieArray = movieArr.data.results.map(item => new Searchmovie(item));
  res.status(200).send(movieArray);
} catch (error) {
  handleError(error, res);
}

})


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

class Searchmovie {
  constructor(movie) {
    this.title=movie.title;
    this.overview= movie.overview;
    this.vote_average= movie.vote_average;
    this.vote_count= movie.vote_count;
    this.poster_path= movie.poster_path;
    this.popularity= movie.popularity;
    this.release_date= movie.release_date;
  }
}

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

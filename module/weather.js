
const axios = require('axios');

const weatherCache = {};
 async function weatherData(req, res)  {
    let searchQuery = req.query.searchQuery;
    let lat = req.query.lat;
    let lon = req.query.lon;
    
    if(weatherCache[searchQuery] !== undefined) {
        res.status(200).send(weatherCache[searchQuery]);
    }else {
        const keyWeather = process.env.WEATHER_API_KEY;
        const cityArr = await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${keyWeather}`)
    //   console.log(cityArr.data); 
      
        try {
          const weatherArr = cityArr.data.data.map((item) => new Weatherinfo(item));
          weatherCache[searchQuery] = weatherArr;
          res.status(200).send(weatherArr);
        } catch (error) {
          handleError(error, res);
        }
    }
    
  };


  class Weatherinfo {
    constructor(day) {
      this.date = day.valid_date;
      this.description = day.weather.description;
    }
  }

  module.exports = {weatherData}
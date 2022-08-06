
const axios = require('axios');

 async function movieData(req,res){
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
  
  };


  
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

  module.exports = {movieData}
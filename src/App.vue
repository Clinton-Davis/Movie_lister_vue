<template>
  <div id="app">
    <search-form
      @home-page="getMovies"
      @movie-genra="getGenra"
      @movie-date="getDate"
      @movie-search="movieSearch"
    ></search-form>
    <div class="search-prams">Page: {{ page }} | Genra: {{ genraName }}</div>
    <main>
      <movie-card
        v-for="movie in results"
        v-bind:key="movie"
        :title="movie.title"
        :poster_img="movie.poster_img"
        :vote_average="movie.vote_average"
        :release_date="movie.release_date"
        :overview="movie.overview"
        :genres="movie.genres"
        :runtime="movie.runtime"
        :movie_id="movie.movie_id"
        @get-movie-id="getMovieDetails"
      ></movie-card>
    </main>
    <div class="page">
      <button class="left" @click="backPage">&laquo;</button>
      <div class="pageNumber">{{ page }}</div>
      <button class="right" @click="addPage">&raquo;</button>
    </div>
  </div>
</template>

<script>
import MovieCard from "./components/MovieCard.vue";
import SearchForm from "./components/SearchForm.vue";

export default {
  name: "App",
  components: { MovieCard, SearchForm },
  data() {
    return {
      results: [],
      page: 1,
      Id: this.movie_id,
      ApiKey: process.env.VUE_APP_API_KEY,
      has_genra: false,
      movie_genra: 0,
      genraName: "",
    };
  },
  methods: {
    async getMovies() {
      const API_KEY = this.ApiKey;
      const page = this.page;
      const Popularity_API_URL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&page=${page}&api_key=${API_KEY}`;
      const response = await fetch(Popularity_API_URL);
      const data = await response.json();
      const movies = data.results;
      const results = [];
      for (const id in movies) {
        results.push({
          movie_id: movies[id].id,
          title: movies[id].title,
          vote_average: movies[id].vote_average,
          release_date: movies[id].release_date,
          overview: movies[id].overview,
          poster_img: movies[id].poster_path,
        });
        // console.log(results);
        this.results = results;
        this.genraName = "All";
      }
    },
    async getMovieDetails(ID) {
      const API_KEY = this.ApiKey;
      const id = ID;
      const movieDetail_API_URL = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`;
      const response = await fetch(movieDetail_API_URL);
      const data = await response.json();
      console.log(data);
      const results = [];
      results.push({
        title: data.title,
        vote_average: data.vote_average,
        release_date: data.release_date,
        overview: data.overview,
        poster_img: data.poster_path,
        runtime: data.runtime,
        genres: data.genres.name,
      });
      this.results = results;
    },
    async getGenra(genra) {
      this.movie_genra = genra;
      const API_KEY = this.ApiKey;
      const page = this.page;
      // const page = this.page;
      const bestDrama = `https://api.themoviedb.org/3/discover/movie?with_genres=${genra}&sort_by=vote_average.desc&vote_count.gte=10&page=${page}&api_key=${API_KEY}`;
      const response = await fetch(bestDrama);
      const data = await response.json();
      const movies = data.results;
      this.has_genra = true;
      const results = [];
      for (const id in movies) {
        results.push({
          movie_id: movies[id].id,
          title: movies[id].title,
          vote_average: movies[id].vote_average,
          release_date: movies[id].release_date,
          overview: movies[id].overview,
          poster_img: movies[id].poster_path,
        });
        // console.log(results);
        this.results = results;
      }
      this.getGernaName();
    },
    async getDate(date) {
      const API_KEY = this.ApiKey;
      const page = this.page;
      const year = `https://api.themoviedb.org/3/discover/movie?primary_release_year=${date}&sort_by=vote_average.desc&page=${page}&api_key=${API_KEY}`;
      const response = await fetch(year);
      const data = await response.json();
      const movies = data.results;
      const results = [];
      for (const id in movies) {
        results.push({
          movie_id: movies[id].id,
          title: movies[id].title,
          vote_average: movies[id].vote_average,
          release_date: movies[id].release_date,
          overview: movies[id].overview,
          poster_img: movies[id].poster_path,
        });
        // console.log(results);
        this.results = results;
      }
    },
    async movieSearch(searched) {
      const API_KEY = this.ApiKey;
      // const page = this.page;
      const movieSearch = `https://api.themoviedb.org/3/search/movie?&api_key=${API_KEY}&query=${searched}`;
      const response = await fetch(movieSearch);
      const data = await response.json();
      const movies = data.results;
      const results = [];
      for (const id in movies) {
        results.push({
          movie_id: movies[id].id,
          title: movies[id].title,
          vote_average: movies[id].vote_average,
          release_date: movies[id].release_date,
          overview: movies[id].overview,
          poster_img: movies[id].poster_path,
        });
        // console.log(results);
        this.results = results;
      }
    },
    addPage() {
      let newPage = this.page;
      newPage++;
      let genra = this.movie_genra;
      this.page = newPage;
      if (this.has_genra === true) {
        this.getGenra(genra);
        this.scrollToTop();
      } else {
        this.getMovies();
        this.scrollToTop();
      }
    },
    backPage() {
      let newPage = this.page;
      newPage--;
      let genra = this.movie_genra;
      this.page = newPage;
      if (this.has_genra === true) {
        this.getGenra(genra);
        this.scrollToTop();
      } else {
        this.getMovies();
        this.scrollToTop();
      }
    },
    scrollToTop() {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    },
    getGernaName() {
      switch (this.movie_genra) {
        case "18":
          this.genraName = "Drama";
          break;
        case "12":
          this.genraName = "Adventure";
          break;
        case "35":
          this.genraName = "Comedy";
          break;
        case "28":
          this.genraName = "Action";
          break;
        case "16":
          this.genraName = "Animation";
          break;
        case "10751":
          this.genraName = "Family";
          break;
        case "10749":
          this.genraName = "Romance";
          break;

        default:
          this.genraName = "All";
          break;
      }
    },
  },

  mounted() {
    this.getMovies();
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Goldman:wght@400;700&display=swap");
:root {
  --primary-color: #22254b;
  --secondary-color: #373b69;
  --search: #6b13f8;
  --off-white: rgb(202, 199, 199);
  --rating-g: rgb(2, 252, 2);
  --rating-y: rgb(255, 238, 0);
  --rating-r: rgb(253, 5, 5);
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  background-color: var(--secondary-color);
  margin: 0;
  font-family: "Goldman", sans-serif;
}

main {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.page {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  margin: 1rem;
}
.page button {
  font-size: 3rem;
  background-color: var(--search);
  border: none;
  color: var(--off-white);
  cursor: pointer;
  border: 1px var(--off-white) solid;
  height: 3.5rem;
  display: flex;
  align-items: center;
}
.pageNumber {
  background-color: var(--search);
  display: flex;
  padding: 0 1rem;
  align-items: center;

  height: 3.5rem;
  font-size: 1.5rem;
  color: var(--off-white);
  border: 1px var(--off-white) solid;
}
.search-prams {
  font-size: 1.3rem;
  font-family: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--off-white);
}
</style>

<template>
  <div id="app">
    <search-form></search-form>
    <main>
      <movie-card
        v-for="movie in results"
        v-bind:key="movie"
        :title="movie.title"
        :poster_img="movie.poster_img"
        :vote_average="movie.vote_average"
        :release_date="movie.release_date"
        :overview="movie.overview"
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
import MovieCard from "./components/movieCard.vue";
import searchForm from "./components/searchForm.vue";

export default {
  name: "App",
  components: { MovieCard, searchForm },
  data() {
    return {
      results: [],
      page: 1,
    };
  },
  methods: {
    async getMovies() {
      const API_KEY = process.env.VUE_APP_API_KEY;
      const page = this.page;
      const Popularity_API_URL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&page=${page}&api_key=${API_KEY}`;
      const response = await fetch(Popularity_API_URL);
      const data = await response.json();
      const movies = data.results;
      const results = [];
      for (const id in movies) {
        results.push({
          title: movies[id].title,
          vote_average: movies[id].vote_average,
          release_date: movies[id].release_date,
          overview: movies[id].overview,
          poster_img: movies[id].poster_path,
        });
        this.results = results;
      }
    },
    addPage() {
      let newPage = this.page;
      newPage++;
      console.log(newPage);
      this.page = newPage;
      this.getMovies();
      this.scrollToTop();
    },
    backPage() {
      let newPage = this.page;
      if (newPage === 1) {
        this.getMovies();
        this.scrollToTop();
      } else {
        newPage--;
        this.page = newPage;
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
</style>

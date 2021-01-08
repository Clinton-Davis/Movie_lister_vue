<template>
  <header>
    <div @click="popularity" class="logo">
      Movie List
    </div>
    <select @click="searchGenra" name="genra" id="genra" v-model="genra">
      <option disabled value="genra">Genra</option>
      <option value="28">Action</option>
      <option value="12">Adventure</option>
      <option value="16">Animation</option>
      <option value="35">Comedy</option>
      <option value="18">Drama</option>
      <option value="10751">Family</option>
      <option value="14">Fantasy</option>
      <option value="10749">Romance</option>
    </select>

    <form @submit.prevent="inputDate">
      <input
        type="text"
        id="date"
        min="1940"
        max="2021"
        class="search"
        placeholder=" Pick a Year"
        v-model="date"
      />
    </form>
    <form @submit.prevent="searchMovie">
      <input
        type="text"
        id="search"
        class="search"
        placeholder="Search"
        v-model="searched"
      />
    </form>
  </header>
</template>

<script>
export default {
  emits: ["home-page", "movie-genra", "movie-date", "movie-search"],
  data() {
    return {
      searched: "",
      date: "",
      genra: "genra",
      sortBy: "date",
    };
  },
  methods: {
    searchMovie() {
      console.log(this.searched);
      this.$emit("movie-search", this.searched);
      this.searched = "";
    },
    popularity() {
      this.$emit("home-page");
    },
    searchGenra() {
      if (this.genra === "genra") {
        console.log("Did not send anything");
        return;
      } else {
        this.$emit("movie-genra", this.genra);
      }
    },
    inputDate() {
      console.log(this.date);
      this.$emit("movie-date", this.date);
      setTimeout(() => {
        this.date = "";
      }, 3000);
    },
  },
};
</script>

<style scoped>
header {
  padding: 1rem;
  display: flex;
  justify-content: space-around;
}
select {
  margin: 0 1rem;
  font-family: inherit;
  padding: 0.25rem 0.5rem;
}
.search {
  background-color: transparent;
  border: 2px solid var(--primary-color);
  border-radius: 50px;
  font: inherit;
  font-size: 1rem;
  color: #ffffff;
  padding: 0.5rem 1rem;
}
.search::placeholder {
  color: var(--search);
}
.search:focus {
  outline: none;
  background-color: var(--primary-color);
}
/* form {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
} */
.logo {
  color: var(--off-white);
  width: 20%;
  display: flex;
  align-items: center;
  font-size: 2rem;
  cursor: pointer;
}
</style>

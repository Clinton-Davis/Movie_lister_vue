<template>
  <header>
    <form @submit.prevent="searchMovie">
      <!-- <label for="genra">Genra</label>
      <select name="genra" id="genra" v-model="genra">
        <option value="action">Action</option>
        <option value="drama">Drama</option>
        <option value="horror">Horror</option>
        <option value="romance">Romance</option>
      </select> -->
      <label for="sort">Sort by..</label>
      <select name="sort" id="sort" v-model="sortBy">
        <option value="new">New</option>
        <option value="old">Old</option>
        <option value="high_rating">Rating - (High to low)</option>
        <option value="low_rating">Rating - (low to High)</option>
      </select>

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
  data() {
    return {
      searched: "",
      genra: "action",
      sortBy: "new",
    };
  },
  methods: {
    searchMovie() {
      console.log("searched Movies - " + this.searched);
      console.log("Sorted by - " + this.genra);
      console.log("sorted by - " + this.sortBy);
      this.searched = "";
    },
  },
};
</script>

<style scoped>
header {
  padding: 1rem;
  display: flex;
  justify-content: flex-end;
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
</style>

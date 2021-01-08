import { createApp } from "vue";
import App from "./App.vue";
import movieCard from "./components/movieCard.vue";
import searchForm from "./components/searchForm.vue";

const app = createApp(App);
app.component("movie-card", movieCard);
app.component("search-form", searchForm);

app.mount("#app");

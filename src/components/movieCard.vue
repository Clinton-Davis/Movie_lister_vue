<template>
  <div class="movie">
    <img :src="fullimagePath" alt="image" />
    <div class="movie-info">
      <h3>{{ title }}</h3>

      <span :class="getClassByRate">{{ vote_average }}</span>
    </div>
    <h4 class="date">{{ release_date }}</h4>

    <div class="overview">
      <h3>Overview</h3>
      {{ overview }}
    </div>
  </div>
</template>

<script>
export default {
  props: ["title", "vote_average", "release_date", "overview", "poster_img"],
  computed: {
    fullimagePath() {
      const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
      const posterImg = this.poster_img;
      const fullPath = IMG_PATH + posterImg;
      return fullPath;
    },
    getClassByRate() {
      const average = this.vote_average;
      if (average >= 8) {
        return "green";
      } else if (average >= 5) {
        return "yellow";
      } else {
        return "red";
      }
    },
  },
};
</script>

<style scoped>
.movie {
  width: 300px;
  margin: 1rem;
  background-color: var(--secondary-color);
  box-shadow: 0 4px 5px rgba(0, 0, 0, 0.2);
  position: relative;
  overflow: hidden;
  border-radius: 3px;
  min-height: 300px;
}
.movie img {
  width: 100%;
}
.movie-info {
  color: var(--off-white);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 1rem 1rem;
}
.movie-info h3 {
  margin-top: 0;
  letter-spacing: 1.5px;
}
.movie-info span {
  background-color: var(--primary-color);
  padding: 0.25rem 0.5rem;
  border-radius: 50%;
  font-weight: bold;
}
.date {
  color: var(--off-white);
  padding: 0.5rem 1rem 1rem;
  letter-spacing: 1.5px;
}
.movie-info span.green {
  background-color: var(--rating-g);
  color: var(--primary-color);
}
.movie-info span.yellow {
  background-color: var(--rating-y);
  color: var(--primary-color);
}
.movie-info span.red {
  background-color: var(--rating-r);
  color: var(--off-white);
}

.overview {
  background-color: white;
  padding: 2rem;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  max-height: 100%;
  transform: translateY(101%);
  transition: transform 0.3s ease-in-out;
}
.movie:hover .overview {
  transform: translateY(0);
}
</style>

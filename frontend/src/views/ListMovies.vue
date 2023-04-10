<template>
  <div>
    <v-row>
      <v-col
        v-for="({id, title, description, image, release_date}, index) in movies"
        :key="`movie-${index}`"
        cols="12"
        sm="3"
      >
      <v-card
          class="mb-0"
          variant="text"
          density="comfortable"
          elevation="8"
        >
          <v-img 
            :src="movieImage(image)" 
            height="128" 
            cover
          ></v-img>
          <v-card-title class="pb-0">
            {{ title }}
          </v-card-title>
          <v-card-subtitle>
            <small>{{ release_date }}</small>
          </v-card-subtitle>
          <v-card-text>
            {{ maxLength(description) }}
          </v-card-text>
          <template v-slot:actions>
            <v-spacer></v-spacer>
            <v-btn
              :to="`/detail/${id}`"
              variant="tonal"
              >Details</v-btn>
          </template>
        </v-card>
      </v-col>
    </v-row>

    <div class="text-center pt-5" v-show="movies.length > 0">
      <v-pagination
        v-model="page"
        :length="pages"
        rounded="circle"
        @update:model-value="(page) => retrieveMovies(page)"
      ></v-pagination>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import Movie from "@/types/Movie";
import ResponseData from "@/types/ResponseData";
import MovieDataService from "@/services/MovieDataService";
import { maxLength, movieImage } from '@/utils';

/**
 * The MovieList component displays a list of movies.
 * @component
 */
 export default defineComponent({
  name: "MovieList",
  /**
   * The setup function contains the reactive variables and functions.
   * @function
   * @returns {Object} The reactive variables and functions.
   */
  setup() {
    const movies = ref<Movie[]>([]);
    const page = ref<number>(1);
    const pages = ref<number>(0);
    const total = ref<number>(0);

    /**
     * Retrieves movies from the server.
     * @function
     * @param {number} pageNumber - The page number to retrieve.
     * @param {number} [pageSize=10] - The number of movies to retrieve per page.
     * @returns {Promise} A promise that resolves with the movies.
     */
    function retrieveMovies(pageNumber: number, pageSize = 10 as number) {
      return MovieDataService.getMovies(pageNumber, pageSize)
        .then((response: ResponseData) => {
          movies.value = response.data.movies;
          page.value = response.data.page;
          pages.value = response.data.pages;
          total.value = response.data.total;
        })
        .catch((error: Error) => {
          console.error(error);
        });
    }

    onMounted(() => {
      retrieveMovies(page.value);
    });

    /**
     * The reactive variables and functions to be returned.
     */
    return {
      movies,
      page,
      pages,
      total,
      retrieveMovies,
    };
  },

  /**
   * The methods section contains the utility functions used in the component.
   */
  methods: {
    /**
     * Truncates a string to a maximum length and appends ellipsis.
     * @function
     * @param {string} text - The text to truncate.
     * @param {number} maxLength - The maximum length of the string.
     * @returns {string} The truncated string.
     */
    maxLength,

    /**
     * Returns the URL of a movie poster image.
     * @function
     * @param {Movie} movie - The movie object.
     * @returns {string} The URL of the movie poster image.
     */
    movieImage,
  },
});
</script>

import { Module } from 'vuex';
import Movie from "@/types/Movie";

interface State {
  movie: Movie;
}

const movieModule: Module<State, unknown> = {
  namespaced: true,
  state: {
    movie: {} as Movie,
  },
  mutations: {
    /**
     * Sets the movie data in the state.
     * @param state The Vuex state object.
     * @param movie The movie object to be set.
     */
    setMovie(state: State, movie: Movie): void {
      state.movie = movie;
    },

    /**
     * Adds a review to the movie's review array in the state.
     * @param state The Vuex state object.
     * @param review The review object to be added.
     */
    setReviews(state: State, review: object[]): void {
      state.movie.reviews.push(review);
    },
  },
  getters: {
    /**
     * Returns the movie details from the state.
     * @param state The Vuex state object.
     * @returns The movie object.
     */
    details(state: State): Movie {
      return state.movie;
    },

    /**
     * Returns the total number of reviews for the movie.
     * @param state The Vuex state object.
     * @returns The number of reviews.
     */
    totalReviews(state: State): number {
      return state.movie.reviews ? state.movie.reviews.length : 0;
    },

    /**
     * Returns the average rating of the movie based on the reviews.
     * @param state The Vuex state object.
     * @returns The average rating as a number or string.
     */
    averageRating(state: State): number | string {
      const reviews = state.movie.reviews;
      const sum = reviews ? reviews.reduce((acc, cur) => acc + cur.grade, 0) : 0;
      const average = sum > 0 ? (sum / reviews.length) : 0;
      return average.toFixed(1);
    }
  },
};

export default movieModule;

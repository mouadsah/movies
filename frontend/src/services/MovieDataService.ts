import http from "@/http-common";

/* eslint-disable */
class MovieDataService {
  /**
   * Get movies
   * @param {number} page - The page number
   * @param {number} size - The number of items per page
   * @returns {Promise<any>} - A promise that resolves with the response data
   */
  getMovies(page: number, size: number): Promise<any> {
    const params = {
      page,
      size,
    };
    return http.get("/movies/", { params });
  }

  /**
   * Get movie by ID
   * @param {number} id - The ID of the movie
   * @returns {Promise<any>} - A promise that resolves with the response data
   */
  get(id: string | string[]): Promise<any> {
    return http.get(`/movies/${id}/`);
  }

  /**
   * Update movie by ID
   * @param {number} id - The ID of the movie
   * @param {object} data - The updated data for the movie
   * @returns {Promise<unknown>} - A promise that resolves with the response data
   */
  update(id: number, data: object): Promise<unknown> {
    return http.put(`/movies/${id}/`, data);
  }

  /**
   * Get actors
   * @returns {Promise<unknown>} - A promise that resolves with the response data
   */
  getActors(): Promise<unknown> {
    return http.get("/actors/", {});
  }

  /**
   * Add review for a movie
   * @param {number} id - The ID of the movie
   * @param {number | string} rate - The rating for the movie
   * @returns {Promise<unknown>} - A promise that resolves with the response data
   */
  addReview(id: number, rate: number | string): Promise<any> {
    return http.post("/reviews/add/", { id, rate });
  }
}

export default new MovieDataService();

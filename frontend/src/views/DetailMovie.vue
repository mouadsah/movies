<template>

  <v-container
    class="mx-auto w-75"
  >
  <v-card
      outlined
      elevation="10"
    >
      <v-row>
        <v-col
          cols="5"
        >
          <v-img 
            :src="movieImage(details.image)" 
            height="300"
          ></v-img>
        </v-col>

        <v-col
          cols="7"
        >
          <v-card-title class="pb-0 pl-0 mt-5">
            {{ details.title }}
          </v-card-title>
          <v-card-subtitle class="pl-0">
            <small>{{ details.release_date }}</small>
          </v-card-subtitle>
          <v-card-text class="pl-0">
            <v-row
              class="mx-auto"
              no-gutters
            >
              <v-col
                class="mx-auto"
              >
                <v-rating
                  :model-value="averageRating"
                  color="amber"
                  density="compact"
                  half-increments
                  size="small"
                  hover
                  @update:model-value="addReview"
                ></v-rating>
        
                <small 
                  class="text-grey my-auto"
                >
                  ({{ averageRating }}) - ({{ totalReviews }})
                </small>
              </v-col>
            </v-row>
            <p>
              {{ details.description }}
            </p>
            <v-chip  
              v-for="{id, first_name, last_name} in details.actors" 
              :key="`actor-${id}`"
              :closable="false"
              color="primary"
              label
              size="small"
              class="mr-2 mt-2"
            >
              {{ `${first_name} ${last_name}` }}
            </v-chip>
          </v-card-text>

          <v-card-actions class="pl-0">
            <v-spacer></v-spacer>
            <v-btn
              prepend-icon="mdi-pencil" 
              color="info"
              variant="tonal"
              :to="`/edit/${details.id}`"
            >
              Edit Movie 
            </v-btn>
          </v-card-actions>
          
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MovieDataService from "@/services/MovieDataService";
import ResponseData from "@/types/ResponseData";
import { movieImage } from '@/utils';
import { mapGetters, mapMutations } from 'vuex';

/**
 * The DetailsMovie component displays the details of a movie.
 * @component
 */
export default defineComponent({
  name: "DetailsMovie",
  methods: {
    /**
     * Maps the 'setMovie' and 'setReviews' mutations from the 'movieModule' store
     * to the component's methods.
     */
    ...mapMutations('movieModule', ['setMovie', 'setReviews']),

    /**
     * Retrieves the movie data from the API using the 'MovieDataService' service.
     * The retrieved data is stored in the 'movieModule' store using the 'setMovie'
     * mutation.
     *
     * @param id - The ID of the movie to retrieve.
     */
    getMovie(id: string | string[]): void {
      MovieDataService.get(id)
        .then((response: ResponseData) => {
          this.setMovie(response.data)
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },

    /**
     * Calls the 'addReview' method of the 'MovieDataService' service to add a new
     * review for the movie. The ID of the movie is obtained from the 'details' computed
     * property. The added review is stored in the 'movieModule' store using the
     * 'setReviews' mutation.
     *
     * @param rate - The rating of the review.
     */
    addReview(rate: number | string): void {
      MovieDataService.addReview(this.details.id, rate)
        .then((response: ResponseData) => {
          this.setReviews(response.data.review);
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },
    movieImage,
  },
  computed: {
    /**
     * Maps the 'averageRating', 'totalReviews', and 'details' getters from the
     * 'movieModule' store to the component's computed properties.
     */
    ...mapGetters('movieModule', ['averageRating', 'totalReviews', 'details']),
  },
  beforeMount() {
    /**
     * Retrieves the ID of the movie from the route parameters and calls the
     * 'getMovie' method to retrieve the movie data.
     */
    const { id } = this.$route.params
    this.getMovie(id);
  },
});
</script>


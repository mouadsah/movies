<template>

  <v-container
    class="mx-auto w-50"
  >
  <v-card
      :loading="loading"
      outlined
      elevation="10"
      title="Edit Movie"
      divider
    >
    <v-divider></v-divider>
    <v-card-text>
      <form class="m-10">
        <v-row>
          <v-col cols="3" class="mt-3">
            <span>Title</span>
          </v-col>
          <v-col>
            <v-text-field
              label="Title"
              required
              variant="outlined"
              density="compact"
              hide-details
              v-model="movie.title"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="3" class="mt-3">
            <span>Description</span>
          </v-col>
          <v-col>
            <v-textarea 
              label="Description" 
              variant="outlined"
              density="compact"
              hide-details
              v-model="movie.description"
            ></v-textarea>
          </v-col>
        </v-row>
        <v-row fill-height>
          <v-col cols="3" class="mt-3">
            <span>Actor</span>
          </v-col>
          <v-col>
            <v-select
              v-model="actors"
              :items="listActors"
              chips
              label="Actors"
              multiple
              variant="outlined"
              item-value="id"
              item-title="full_name"
              hide-details
            ></v-select>
          </v-col>
        </v-row>
        <div class="text-right mt-2">
          <v-btn
            class="me-4"
            variant="tonal"
            :to="`/detail/${movie.id}`"
          >
            cancel
          </v-btn>
          <v-btn
            color="success"
            @click="updateMovie"
            :disabled="isEmpty(movie.title) || isEmpty(movie.description)"
          >
            submit
          </v-btn>
        </div>
      </form>
    </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import { useStore } from 'vuex';
import MovieDataService from "@/services/MovieDataService";
import Movie from "@/types/Movie";
import ResponseData from "@/types/ResponseData";
import { isEmpty } from '@/utils';

/**
 * The EditMovie component is responsible for editing a movie.
 * @component
 */
/* eslint-disable */
export default defineComponent({
  name: "EditMovie",
  setup() {
    /**
     * The movie object.
     * @type {Movie}
     */
    const store = useStore();
    const movie = store.state.movieModule.movie as Movie;

    /**
     * The actors array.
     * @type {Array<{id: number, full_name: string}>}
     */
    const actors= movie.actors.map(({id, first_name, last_name}) => {
      return {id, full_name: `${first_name} ${last_name}`}
    })

    /**
     * The reactive state object.
     * @type {Object}
     * @property {Movie} movie - The movie object.
     * @property {Array<{id: number, full_name: string}>} actors - The actors array.
     */
    const state = reactive({
      movie,
      actors,
    });

    return toRefs(state);
  },
  data: () => ({
    /**
     * The actors list.
     * @type {Array<any>}
     */
    listActors: [] as Array<any>,
    
    /**
     * The loading state.
     * @type {boolean}
     */
    loading   : false as boolean
  }),
  methods: {
    /**
     * Fetches the list of actors.
     * @function
     * @returns {void}
     */
    getActors(): void {
      const { movie } = this;
      MovieDataService.getActors()
        .then((response: ResponseData | any) => { 
          this.listActors = response.data.map((actor: any) => {
            return {id: actor.id, full_name: `${actor.first_name} ${actor.last_name}`}
          })
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },
    
    /**
     * Updates the movie.
     * @function
     * @returns {void}
     */
    updateMovie(): void {
      const { movie, actors }      = this;
      const { title, description } = movie;
      const params = { 
        title, 
        description, 
        actors: actors.map((actor) => actor.id ? actor.id : actor)
      } as object;
      MovieDataService.update(movie.id, params)
      .then(() => {
          this.$router.push(`/detail/${movie.id}`);
      })
        .catch((e: Error) => {
          console.log(e);
      });
    },

    /**
     * Checks if the input is empty.
     * @function
     * @param {*} value - The value to check.
     * @returns {boolean}
     */
    isEmpty,

  },
  created(): void {
    this.getActors()
    let { id } = this.movie

    /**
     * Redirects to home if id is empty.
     * @type {Object}
     * @property {string} path - The path to redirect.
     */
    if( isEmpty( `${id}` ) ) {
      this.$router.push({ path: '/' });
    }
  }
});
</script>


<template>
    <v-toolbar density="compact" class="elevation-2 mb-10">
      <v-toolbar-title>
        <router-link 
          to="/" 
          class="text-decoration-none text-black"
        >Movirama</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <router-link 
          to="/"
          class="text-decoration-none"
        >
          <v-icon color="black">mdi-home</v-icon>
        </router-link>
      </v-btn>
    </v-toolbar>
</template>

<script lang="ts">
  import { defineComponent } from "vue";

  export default defineComponent({
    name: "nav-bar",
  });
</script>

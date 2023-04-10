<script setup lang="ts">
  import Navbar from "@/components/Navbar.vue";
</script>

<template>
  <v-main>
    <Navbar />
    <v-container>
      <router-view />
    </v-container>
  </v-main>
</template>

<script lang="ts">
  import { defineComponent } from "vue";

  export default defineComponent({
    name: "DefaultLayout",
  });
</script>

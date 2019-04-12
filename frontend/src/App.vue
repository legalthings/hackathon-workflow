<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>LTO</span>
        <span class="font-weight-light"> Scanner</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn flat href="" target="_blank"> </v-btn>
    </v-toolbar>

    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  components: {},
  data() {
    return {}
  }
}
</script>

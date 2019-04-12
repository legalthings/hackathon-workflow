<template>
  <v-app class="body-bg">
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

<style scoped>
.body-bg {
  background-image: linear-gradient(-90deg, #7daef4 0%, #4776e6 100%);
}
</style>

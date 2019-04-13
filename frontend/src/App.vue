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
  background: #ddd;
}
</style>

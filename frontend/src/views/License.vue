<template>
  <v-card class="main mx-auto elevation-15" max-width="60rem" height="100%">
    <v-layout row wrap justify-content-space-between>
    
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Watch } from 'vue-property-decorator'
// @ts-ignore

@Component({
  components: {}
})
export default class Home extends Vue {}
</script>

<style scoped>
.main {
  background-image: linear-gradient(-90deg, #7daef4 0%, #4776e6 100%);
}
</style>

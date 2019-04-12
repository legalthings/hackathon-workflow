<template>
  <v-container bg fill-height grid-list-md text-xs-center>
    <v-layout row wrap align-center>
      <v-flex>
        <p>Id {{chainId}}</p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
    import Vue from 'vue'
    import { Component, Watch, Prop } from 'vue-property-decorator'

    @Component
    export default class Chain extends Vue {
        @Prop(String) readonly chainId: string = 'werwerwer'
    }
</script>

<style>
  .g {
  }
</style>
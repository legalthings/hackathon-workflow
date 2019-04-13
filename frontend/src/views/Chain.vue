<template>
  <v-container fill-height grid-list-md text-xs-center class="main">
    <v-layout row wrap aligncenter>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-img
            src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"
            aspect-ratio="2.75"
          ></v-img>

          <v-card-title primary-title>
            <div>
              <h3
                :data-test="chainId"
                data-cy="chain-title"
                class="headline mb-0"
              >
                {{ chain.title }}
              </h3>
              <div>{{ chain.description }}</div>
            </div>
          </v-card-title>

          <v-card-actions>
            <v-btn flat color="orange">{{ chain.title }}</v-btn>
            <v-btn flat color="orange">Journey</v-btn>
            <v-btn flat color="orange">Farm</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Watch, Prop } from 'vue-property-decorator'

@Component
export default class Chain extends Vue {
  @Prop(String) readonly chainId!: string

  get chain() {
    return {
      title: 'Chicken',
      description: 'This is a chicken!'
    }
  }
}
</script>

<style>
.main {
  max-width: 800px;
}
</style>

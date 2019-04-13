<template>
  <v-card class="mx-auto elevation-16" max-width="60rem">
<<<<<<< HEAD
    <v-card flat>
      <v-card-title class="white">
        <h3 class="title font-weight-bold grow mt-4 mb-4">
          FoodFlow
=======
    <v-card dark flat>
      <v-card-title class="pa-2 primary">
        <h3
          data-cy="chain-title"
          class="title font-weight-light text-xs-center grow mt-4 mb-4"
        >
          Produce Overview
>>>>>>> 2730860101a4c8598af406bbcbc4d0c6bd79c554
        </h3>

        <v-spacer></v-spacer>

        <v-icon>more_vert</v-icon>
      </v-card-title>
      <v-img
        src="https://www.agri-pulse.com/ext/resources/images/Agriculture-photos/Farmscapes/Farm1.jpg?1509734744"
        gradient="to top, rgba(0,0,0,.44), rgba(0,0,0,.44)"
      >
      </v-img>
    </v-card>

    <v-card>
      <v-container>
        <p class="font-weight-bold">#1283SJ2</p>
        <p class="display-1 font-weight-regular">A Farm</p>
      </v-container>
    </v-card>

    <v-toolbar color="white" tabs>
      <template v-slot:extension>
        <v-tabs v-model="tab" color="white" grow>
          <v-tabs-slider color="dark"></v-tabs-slider>
          <v-tab>Overview</v-tab>
          <v-tab>Journey</v-tab>
          <v-tab>Farm</v-tab>
        </v-tabs>
      </template>
    </v-toolbar>

    <v-tabs-items v-model="tab">
      <v-tab-item v-for="n in 3" :key="n">
        <v-card flat>
          <v-card-text>text</v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>

    <v-card-text class="py-0">
      <v-timeline align-top dense>
        <v-timeline-item color="pink" small>
          <v-layout pt-3>
            <v-flex xs3>
              <strong>5pm</strong>
            </v-flex>
            <v-flex>
              <strong>New Icon</strong>
              <div class="caption">Mobile App</div>
            </v-flex>
          </v-layout>
        </v-timeline-item>

        <v-timeline-item color="teal lighten-3" small>
          <v-layout wrap pt-3>
            <v-flex xs3>
              <strong>3-4pm</strong>
            </v-flex>
            <v-flex>
              <strong>Design Stand Up</strong>
              <div class="caption mb-2">Hangouts</div>
              <v-avatar>
                <v-img
                  src="https://avataaars.io/?avatarStyle=Circle&topType=LongHairFrida&accessoriesType=Kurt&hairColor=Red&facialHairType=BeardLight&facialHairColor=BrownDark&clotheType=GraphicShirt&clotheColor=Gray01&graphicType=Skull&eyeType=Wink&eyebrowType=RaisedExcitedNatural&mouthType=Disbelief&skinColor=Brown"
                ></v-img>
              </v-avatar>
              <v-avatar>
                <v-img
                  src="https://avataaars.io/?avatarStyle=Circle&topType=ShortHairFrizzle&accessoriesType=Prescription02&hairColor=Black&facialHairType=MoustacheMagnum&facialHairColor=BrownDark&clotheType=BlazerSweater&clotheColor=Black&eyeType=Default&eyebrowType=FlatNatural&mouthType=Default&skinColor=Tanned"
                ></v-img>
              </v-avatar>
              <v-avatar>
                <v-img
                  src="https://avataaars.io/?avatarStyle=Circle&topType=LongHairMiaWallace&accessoriesType=Sunglasses&hairColor=BlondeGolden&facialHairType=Blank&clotheType=BlazerSweater&eyeType=Surprised&eyebrowType=RaisedExcited&mouthType=Smile&skinColor=Pale"
                ></v-img>
              </v-avatar>
            </v-flex>
          </v-layout>
        </v-timeline-item>

        <v-timeline-item color="pink" small>
          <v-layout pt-3>
            <v-flex xs3>
              <strong>12pm</strong>
            </v-flex>
            <v-flex>
              <strong>Lunch break</strong>
            </v-flex>
          </v-layout>
        </v-timeline-item>

        <v-timeline-item color="teal lighten-3" small>
          <v-layout pt-3>
            <v-flex xs3>
              <strong>9-11am</strong>
            </v-flex>
            <v-flex>
              <strong>Finish Home Screen</strong>
              <div class="caption">Web App</div>
            </v-flex>
          </v-layout>
        </v-timeline-item>
      </v-timeline>
    </v-card-text>

    <v-bottom-nav :value="true" absolute shift>
      <v-spacer></v-spacer>

      <v-btn dark>
        <span>Share</span>
        <v-icon>share</v-icon>
      </v-btn>
    </v-bottom-nav>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Watch, Prop } from 'vue-property-decorator'

@Component
export default class Chain extends Vue {
  @Prop(String) readonly chainId!: string

  get chain() {
    const { chainId } = this
    if (chainId && !this.$store.state.chains[chainId]) {
      this.$store.dispatch('fetchChain', { chainId })
    }

    return this.$store.state.chains[chainId]
  }
}
</script>

<style>
.main {
  max-width: 800px;
}
</style>

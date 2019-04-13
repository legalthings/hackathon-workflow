<template>
  <v-card flat class="mx-auto elevation-16 main" max-width="60rem">
    <v-toolbar flat color="white">
      <v-btn icon to="/">
        <v-icon>camera</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-toolbar-title>FoodFlow</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>share</v-icon>
      </v-btn>
    </v-toolbar>

    <v-card class="mx-3 my-5">
      <v-img
        src="https://www.agri-pulse.com/ext/resources/images/Agriculture-photos/Farmscapes/Farm1.jpg?1509734744"
        aspect-ratio="1.75"
      >
      </v-img>

      <v-card-title primary-title>
        <div>
          <h4 class="font-weight-bold">#1283SJ2</h4>
          <h3 class="headline mb-2">Greyhound Farm</h3>
          <div>
            Greyhound coyote farm specializes coyote meat and coyote meat only.
            The meat is widely recognized and generally considered to be the
            most tender meat in the entire world.
          </div>
        </div>
      </v-card-title>
    </v-card>

    <v-card flat>
      <v-tabs grow class="tabs">
        <v-tab>Product</v-tab>
        <v-tab>Journey</v-tab>
        <v-tab>Farm</v-tab>

        <v-tab-item><h3>Chicken</h3></v-tab-item>
        <v-tab-item>
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
        </v-tab-item>
        <v-tab-item>Farm</v-tab-item>
      </v-tabs>
    </v-card>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Watch, Prop } from 'vue-property-decorator'
// @ts-ignore
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet'

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
  background-image: linear-gradient(-90deg, #7daef4 0%, #4776e6 100%);
}

.tabs .v-window {
  padding: 10px;
}
</style>

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

    <v-tabs-items v-model="selectedTab">
      <v-tab-item>
        <v-card class="mx-5 my-5">
          <v-img
            :src="require('../assets/sample_product.jpg')"
            aspect-ratio="1.75"
          />

          <v-card-title>
            <h3 data-cy="chain-title" class="headline mb-2">Greyduck Meat</h3>

            <v-spacer></v-spacer>
            <v-chip label>#1283SJ2</v-chip>
          </v-card-title>

          <v-card-text>
            <p class="title">
              The meat is tasty, delicious and mystic, and melts in your mouth
              like those gummies Odyssey gave us.
            </p>

            <p></p
          ></v-card-text>
        </v-card>
      </v-tab-item>

      <v-tab-item>
        <v-card class="mx-5 my-5">
          <v-img :src="require('../assets/farm.jpg')" aspect-ratio="1.75" />

          <v-card-title>
            <h3 class="headline mb-2">Greyduck Farm</h3>
            <v-spacer></v-spacer>
            <v-chip label>#1283SJ2</v-chip>
          </v-card-title>

          <v-card-text>
            <p class="title">
              Greyduck coyote farm specializes coyote meat and coyote meat only.
              The meat is widely recognized and generally considered to be the
              most tender meat in the entire world.
            </p>
          </v-card-text>
        </v-card>
      </v-tab-item>

      <v-tab-item>
        <v-card class="mx-5 my-5">
          <v-img :src="require('../assets/farm.jpg')" aspect-ratio="1.75" />

          <v-card-title>
            <h3 class="headline mb-2">Greyduck Farm</h3>
            <v-spacer></v-spacer>
            <v-chip label>#1283SJ2</v-chip>
          </v-card-title>

          <v-card-text>
            <p class="title">
              Greyduck coyote farm specializes coyote meat and coyote meat only.
              The meat is widely recognized and generally considered to be the
              most tender meat in the entire world.
            </p>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>

    <v-card flat>
      <v-tabs grow class="tabs" v-model="selectedTab">
        <v-tab>Product</v-tab>
        <v-tab>Journey</v-tab>
        <v-tab>Farm</v-tab>
      </v-tabs>
      <v-tabs-items v-model="selectedTab">
        <v-tab-item>
          <p class="title mb-4">Description</p>
        </v-tab-item>

        <v-tab-item class="ma-3">
          <p class="title mb-4">Timeline</p>
          <v-timeline align-top dense>
            <v-timeline-item color="pink" small>
              <v-layout pt-3>
                <v-flex>
                  <strong>New Icon</strong>
                  <div class="caption">Mobile App</div>
                </v-flex>
              </v-layout>
            </v-timeline-item>

            <v-timeline-item color="teal lighten-3" small>
              <v-layout wrap pt-3>
                <v-flex>
                  <strong>Design Stand Up</strong>
                  <div class="caption mb-2">Hangouts</div>
                </v-flex>
              </v-layout>
            </v-timeline-item>

            <v-timeline-item color="pink" small>
              <v-layout pt-3>
                <v-flex>
                  <strong>Lunch break</strong>
                </v-flex>
              </v-layout>
            </v-timeline-item>

            <v-timeline-item color="teal lighten-3" small>
              <v-layout pt-3>
                <v-flex>
                  <strong>Finish Home Screen</strong>
                  <div class="caption">Web App</div>
                </v-flex>
              </v-layout>
            </v-timeline-item>
          </v-timeline>
        </v-tab-item>
        <v-tab-item class="ma-3 pb-4">
          <div v-if="farmLocation" class="map">
            <GmapMap
              :center="farmLocation.center"
              :zoom="18"
              map-type-id="hybrid"
              style="width: 100%; height: 100%"
            >
              <GmapMarker
                :position="farmLocation.center"
                :clickable="false"
                :draggable="false"
              />
            </GmapMap>
          </div>
          <p class="headline mt-4">Description</p>
          <p class="heading">
            There were fields all around, interrupted only by a steep mountain
            cliff, which casted its shadow on the fields in the morning. All
            around you sheep and cows frolicked and loitered in the secluded
            pastures, and touring around most fields ran a muddy road. The road
            made its way to a traditional ranch after passing a simple welcome
            sign. The ranch was in need of a coat of paint, but otherwise in
            great condition. A milking facility stood in the corner of the
            courtyard, a couple of dogs rested under the tree in the center of
            the courtyard, and a small plot of land was used for a breathtaking
            flower garden. The farm had a tranquil feel to it, there was just
            something about the farm that felt very intimate and welcoming.
          </p>
          <p class="headline">Licenses &amp; Certificates</p>

          <v-card>
            <v-list>
              <v-list-tile :to="'/license/' + chainId">
                <v-list-tile-content>
                  <v-list-tile-title>Better Life License</v-list-tile-title>
                </v-list-tile-content>

                <v-list-tile-action>
                  <v-icon>info</v-icon>
                </v-list-tile-action>
              </v-list-tile>

              <v-list-tile :to="'/certificate/' + chainId">
                <v-list-tile-content>
                  <v-list-tile-title
                    >Global Animal Parnership Certificate</v-list-tile-title
                  >
                </v-list-tile-content>

                <v-list-tile-action>
                  <v-icon>info</v-icon>
                </v-list-tile-action>
              </v-list-tile>
            </v-list>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Watch, Prop } from 'vue-property-decorator'

@Component({
  components: {}
})
export default class Chain extends Vue {
  @Prop(String) readonly chainId!: string

  selectedTab: number = 0

  get chain() {
    const { chainId } = this
    if (chainId && !this.$store.state.chains[chainId]) {
      this.$store.dispatch('fetchChain', { chainId })
    }

    return this.$store.state.chains[chainId]
  }

  get farmLocation() {
    return {
      center: {
        lat: 53.2103659,
        lng: 6.5374214
      }
    }
  }
}
</script>

<style scoped>
.main {
  background-image: linear-gradient(-90deg, #7daef4 0%, #4776e6 100%);
}

.map {
  height: 400px;
}
</style>

<template>
  <v-card flat class="mx-auto elevation-16 main" max-width="60rem">
    <v-toolbar flat color="white">
      <v-btn icon :to="'/chain/' + chainId">
        <v-icon>keyboard_arrow_left</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-toolbar-title>FoodFlow</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>

    <v-card>
      <v-img
        :src="require('../assets/better-life-card.png')"
        aspect-ratio="1.75"
      >
      </v-img>

      <v-card-text primary-title>
        <div>
          <p class="headline mb-4">License</p>

          <p class="title">Better Life Label</p>
          <p class="subheading">
            The Dutch Society for the Protection of Animals (SPA) is the largest
            animal protection organisation in the Netherlands, with over 160,000
            members. Besides 350 paid employees about 30,000 volunteers are
            active for the society. The Dutch SPA is member of Eurogroup for
            Animals, the umbrella organisation of the leading animal welfare
            groups in the EU member states.
          </p>

          <p class="title">Why the better life label?</p>

          <p class="subheading">
            From the existing farming systems the Dutch SPA values organic and
            free range systems the most. But less than 1% of the 450 million
            animals annually produced in Dutch farming are kept in these
            systems. The Dutch SPA also wants to improve the welfare of the
            other 99% of production animals that often live in very intensive
            not very animal friendly systems. One way to do that is to work with
            the industry in setting up market segments with products derived
            from animals that are kept in a more animal friendly way. This led
            to the development of the Better Life label.
          </p>

          <p class="title">A label with different levels</p>

          <p class="subheading">
            The Better Life label is simple. Research shows that it is the best
            known food label among Dutch consumers. It has three levels to
            resemble the process of ‘raising the bar’ and to offer farmers and
            consumers the possibility to improve animal welfare step by step. If
            a product doesn’t have the Better Life label, i.e. no stars, it is a
            product derived form a regular, intensive farmingsystem with no
            added animal welfare, or a farming system that has not been
            certified by the Dutch SPA.
          </p>
        </div>
      </v-card-text>
    </v-card>

    <v-card>
      <v-card-title>
        <p class="display-1">One Star</p>
        <v-spacer></v-spacer>
        <v-img :src="require('../assets/better-life-1.png')"> </v-img>
      </v-card-title>

      <v-card-text>
        <p class="subheading">
          Regular farming with additional requirements to improve the most
          urgent animal welfare issues.
        </p>
      </v-card-text>
    </v-card>

    <v-card>
      <v-card-title>
        <p class="display-1">Two Stars</p>
        <v-spacer></v-spacer>
        <v-img :src="require('../assets/better-life-2.png')"> </v-img>
      </v-card-title>

      <v-card-text>
        <p class="subheading">
          The animals get access to an outdoor area and many ofthe animal
          welfare issues need to be resolved or need further improvement.
        </p>
      </v-card-text>
    </v-card>

    <v-card>
      <v-card-title>
        <p class="display-1">Three Stars</p>
        <v-spacer></v-spacer>
        <v-img :src="require('../assets/better-life-3.png')"> </v-img>
      </v-card-title>

      <v-card-text>
        <p class="subheading">
          Awarded to organic farming systems, and farming systems with
          acomparable level of animal welfare.
        </p>
      </v-card-text>
    </v-card>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Watch, Prop } from 'vue-property-decorator'

@Component
export default class License extends Vue {
  @Prop(String) readonly chainId!: string
}
</script>

<style>
.main {
  background-image: linear-gradient(-90deg, #7daef4 0%, #4776e6 100%);
}

.main > .v-card {
  margin-bottom: 5px;
}

.tabs .v-window {
  padding: 10px;
}
</style>

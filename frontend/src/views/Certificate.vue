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
      <v-img :src="require('../assets/gap-card.png')" aspect-ratio="1.75">
      </v-img>

      <v-card-text primary-title>
        <div>
          <p class="headline mb-4">Certificate</p>

          <p class="title">Global Animal Partnership</p>
          <p class="subheading">
            In 2008, Whole Foods Market – a US-based natural and organic food
            grocer – successfully piloted a Step-rated Program at the launch of
            their flagship store in London, England. With the success of the
            launch in the UK, WFMʼs co-CEO John Mackey felt that a significantly
            greater impact could be achieved internationally by having an
            independent organization own and develop a farm animal welfare
            certification Program. And so in late 2008, with help from Whole
            Foods Market, the Global Animal Partnership was born.
          </p>
          <p class="subheading">
            Since that time, weʼve grown our team and program to better serve
            all of our partners. We look forward to continuing our strong
            partnerships with farmers, ranchers, producers, manufacturers, food
            service companies, and restaurants as we continue to grow awareness
            and demand for GAP products.
          </p>

          <p class="title mt-4">
            How does the 5-Step Animal Welfare Rating program work?
          </p>

          <p class="subheading">
            The Program has different tiers – or steps – that represent the
            different ways and types of farming systems animals are raised in on
            farms. Every farm involved in raising beef, chicken, turkey, pork,
            lamb, goat, bison, and laying hens has to have an third-party audit
            to verify they meet the GAP standards, every 15 months. Each farm is
            certified to the highest step level they can achieve and is
            encouraged to move up the step tiers whenever possible. The Program
            is a way for consumers to be reassured that the meat and eggs they
            buy in stores and at restaurants has been raised to standards that
            provide for the animal and the environment in which they live.
          </p>
        </div>
      </v-card-text>
    </v-card>

    <v-card>
      <v-card-title>
        <p class="display-1">Step 1</p>
        <v-spacer></v-spacer>
        <v-img :src="require('../assets/gap-step-1.png')"> </v-img>
      </v-card-title>

      <v-card-text>
        <p class="subheading">
          Chickens live in a stationary housing structure and are provided space
          to express natural behavior and given access to added enrichments.
        </p>
      </v-card-text>
    </v-card>

    <v-card>
      <v-card-title>
        <p class="display-1">Step 2</p>
        <v-spacer></v-spacer>
        <v-img :src="require('../assets/gap-step-2.png')"> </v-img>
      </v-card-title>

      <v-card-text>
        <p class="subheading">
          Chickens live in an indoor environment with at least two different
          types of enrichment and natural light (by 2022).
        </p>
      </v-card-text>
    </v-card>

    <v-card>
      <v-card-title>
        <p class="display-1">Step 3</p>
        <v-spacer></v-spacer>
        <v-img :src="require('../assets/gap-step-3.png')"> </v-img>
      </v-card-title>

      <v-card-text>
        <p class="subheading">
          Chickens have seasonal outdoor access.
        </p>
      </v-card-text>
    </v-card>

    <v-card>
      <v-card-title>
        <p class="display-1">Step 4</p>
        <v-spacer></v-spacer>
        <v-img :src="require('../assets/gap-step-4.png')"> </v-img>
      </v-card-title>

      <v-card-text>
        <p class="subheading">
          Chickens live on pasture; during winter chickens may be housed with
          continuous access to the outdoors.
        </p>
      </v-card-text>
    </v-card>

    <v-card>
      <v-card-title>
        <p class="display-1">Step 5</p>
        <v-spacer></v-spacer>
        <v-img :src="require('../assets/gap-step-5.png')"> </v-img>
      </v-card-title>

      <v-card-text>
        <p class="subheading">
          Chickens live continuously on pasture and may only be housed during
          extreme.
        </p>
      </v-card-text>
    </v-card>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Watch, Prop } from 'vue-property-decorator'

@Component
export default class Certificate extends Vue {
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

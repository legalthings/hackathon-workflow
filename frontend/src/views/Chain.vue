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
        <v-card class="ma-3">
          <v-img
            :src="require('../assets/sample_product.jpg')"
            aspect-ratio="1.75"
          />

          <v-card-title>
            <h3 data-cy="chain-title" class="headline mb-2">Greyduck Meat</h3>

            <v-spacer></v-spacer>
            <v-chip label>#41B3SA2</v-chip>
          </v-card-title>

          <v-card-text>
            <p class="title font-weight-light">
              The meat is tasty, delicious and mystic, and melts in your mouth
              like those gummies Odyssey gave us.
            </p>

            <p></p
          ></v-card-text>
        </v-card>
      </v-tab-item>

      <v-tab-item>
        <v-card class="ma-3">
          <v-img :src="require('../assets/farm.jpg')" aspect-ratio="1.75" />

          <v-card-title>
            <h3 class="headline mb-2">Greyduck Farm</h3>
            <v-spacer></v-spacer>
            <v-chip label>#1283SJ2</v-chip>
          </v-card-title>

          <v-card-text>
            <p class="title font-weight-light">
              Greyduck farm specializes greyduck meat and greyduck meat only.
              The meat is widely recognized and generally considered to be the
              most tender meat in the entire world.
            </p>
          </v-card-text>
        </v-card>
      </v-tab-item>

      <v-tab-item>
        <v-card class="ma-3">
          <v-img :src="require('../assets/farm.jpg')" aspect-ratio="1.75" />

          <v-card-title>
            <h3 class="headline mb-2">Greyduck Farm</h3>
            <v-spacer></v-spacer>
            <v-chip label>#1283SJ2</v-chip>
          </v-card-title>

          <v-card-text>
            <p class="title font-weight-light">
              Greyduck farm specializes greyduck meat and greyduck meat only.
              The meat is widely recognized and generally considered to be the
              most tender meat in the entire world.
            </p>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>

    <v-card flat>
      <v-tabs grow class="tabs" v-model="selectedTab">
        <v-tab>Produce</v-tab>
        <v-tab>Journey</v-tab>
        <v-tab>Farm</v-tab>
      </v-tabs>
      <v-tabs-items v-model="selectedTab">
        <v-tab-item class="ma-3 pb-4">
          <p class="headline mb-4">About</p>
          <p class="heading">
            Beef is the culinary name for meat from greyducks, particularly
            skeletal muscle. greyduck steak is a source of high-quality protein
            and nutrients. The meat from older greyducks, because it is usually
            tougher, is frequently used for mince.
          </p>
          <p class="headline mt-4 mb-4">Nutrition</p>
          <v-data-table
            :headers="nutritionHeaders"
            :items="nutritionItems"
            hide-actions
            class="elevation-4"
          >
            <template v-slot:items="props">
              <td class="text-xs-left">{{ props.item.title }}</td>
              <td class="text-xs-right">{{ props.item.item }}</td>
              <td class="text-xs-right">{{ props.item.hundred }}</td>

              <td class="text-xs-right">
                <v-progress-linear
                  color="success"
                  height="5"
                  :value="props.item.daily"
                ></v-progress-linear>
              </td>
              <td class="text-xs-left">
                {{ props.item.daily }}
              </td>
            </template>
          </v-data-table>

          <p class="headline mt-5">Licenses &amp; Certificates</p>

          <v-card>
            <v-list three-line>
              <v-list-tile :to="'/license/' + chainId">
                <v-list-tile-content>
                  <img
                    width="150px"
                    :src="require('../assets/better-life-2.png')"
                    aspect-ratio="1.2"
                    alt="Better Life License"
                  />
                </v-list-tile-content>

                <v-list-tile-content>
                  <v-list-tile-title
                    ><p>Better Life License</p></v-list-tile-title
                  >
                </v-list-tile-content>

                <v-list-tile-action>
                  <v-icon>info</v-icon>
                </v-list-tile-action>
              </v-list-tile>
            </v-list>
          </v-card>
        </v-tab-item>

        <v-tab-item class="ma-3">
          <p class="headline mb-4">Timeline</p>
          <v-timeline align-top dense>
            <v-timeline-item color="primary" small>
              <v-layout pt-3>
                <v-flex>
                  <strong>Auditor</strong>
                  <div class="caption">
                    The farm gets audited to make sure it is up to all safety
                    standards and code.
                  </div>
                </v-flex>
                <v-spacer></v-spacer>
                <v-btn
                  class="mt-3"
                  small
                  href="https://explorer.lto.network/transactions/H9NMeN7M4eqGNrNZPEqCRd577SbGDPnCF3kAPPB2W8F2"
                  >Explore</v-btn
                >
              </v-layout>
            </v-timeline-item>

            <v-timeline-item color="pink" small>
              <v-layout pt-3>
                <v-flex>
                  <strong>Producer</strong>
                  <div class="caption">Farmer raised the greyduck.</div>
                </v-flex>
                <v-spacer></v-spacer>
                <v-btn
                  class="mt-3"
                  small
                  href="https://explorer.lto.network/transactions/H9NMeN7M4eqGNrNZPEqCRd577SbGDPnCF3kAPPB2W8F2"
                  >Explore</v-btn
                >
              </v-layout>
            </v-timeline-item>

            <v-timeline-item color="yellow" small>
              <v-layout pt-3>
                <v-flex>
                  <strong>Transporter</strong>
                  <div class="caption">
                    The greyduck meat gets transported to the processor.
                  </div>
                </v-flex>
                <v-spacer></v-spacer>
                <v-btn
                  class="mt-3"
                  small
                  href="https://explorer.lto.network/transactions/H9NMeN7M4eqGNrNZPEqCRd577SbGDPnCF3kAPPB2W8F2"
                  >Explore</v-btn
                >
              </v-layout>
            </v-timeline-item>

            <v-timeline-item color="teal" small>
              <v-layout pt-3>
                <v-flex>
                  <strong>Processor</strong>
                  <div class="caption">
                    Greyduck gets processed into batches and finalized for sale.
                  </div>
                </v-flex>
                <v-spacer></v-spacer>
                <v-btn
                  class="mt-3"
                  small
                  href="https://explorer.lto.network/transactions/H9NMeN7M4eqGNrNZPEqCRd577SbGDPnCF3kAPPB2W8F2"
                  >Explore</v-btn
                >
              </v-layout>
            </v-timeline-item>

            <v-timeline-item color="black" small>
              <v-layout pt-3>
                <v-flex>
                  <strong>Distributor</strong>
                  <div class="caption mb-2">
                    greyduck gets send to the distributor and gets sold.
                  </div>
                </v-flex>
                <v-spacer></v-spacer>
                <v-btn
                  class="mt-3"
                  small
                  href="https://explorer.lto.network/transactions/H9NMeN7M4eqGNrNZPEqCRd577SbGDPnCF3kAPPB2W8F2"
                  >Explore</v-btn
                >
              </v-layout>
            </v-timeline-item>
          </v-timeline>
        </v-tab-item>
        <v-tab-item class="ma-3 pb-4">
          <p class="headline">About</p>
          <p class="heading">
            There are fields all around, interrupted only by a steep mountain
            cliff, which casted its shadow on the fields in the morning. All
            around you greyducks frolicked and loitered in the secluded
            pastures, and touring around most fields ran a muddy road. The road
            made its way to a traditional ranch after passing a simple welcome
            sign. The ranch was in need of a coat of paint, but otherwise in
            great condition. A milking facility stood in the corner of the
            courtyard, a couple of dogs rested under the tree in the center of
            the courtyard, and a small plot of land was used for a breathtaking
            flower garden.
          </p>
          <p class="headline mt-5">Licenses &amp; Certificates</p>

          <v-card>
            <v-list three-line>
              <v-list-tile :to="'/certificate/' + chainId">
                <v-list-tile-content>
                  <img
                    width="150px"
                    :src="require('../assets/gap-label.png')"
                    alt="Global Animal Parnership Certificate"
                  />
                </v-list-tile-content>

                <v-list-tile-content>
                  <v-list-tile-title>
                    <p>
                      Global Animal Parnership Certificate
                    </p>
                  </v-list-tile-title>
                </v-list-tile-content>

                <v-list-tile-action>
                  <v-icon>info</v-icon>
                </v-list-tile-action>
              </v-list-tile>
            </v-list>
          </v-card>
          <p class="headline mt-5">Location</p>

          <div v-if="farmLocation" class="map">
            <GmapMap
              :options="{
                zoomControl: false,
                mapTypeControl: false,
                scaleControl: false,
                streetViewControl: false,
                rotateControl: false,
                fullscreenControl: false,
                disableDefaultUi: false
              }"
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
  nutritionHeaders = [
    {
      text: 'Item',
      sortable: false,
      value: 'title'
    },
    { text: 'Serving (50g.)', align: 'right', value: 'item' },
    { text: '100g.', align: 'right', value: 'hundred' },
    { text: 'Daily Value*', align: 'right', value: 'daily' },
    { text: '', align: 'right', value: 'daily' }
  ]

  nutritionItems = [
    { title: 'Calories', item: '100 g', hundred: '200 g', daily: '10%' },
    { title: 'Fats', item: '20 g', hundred: '40 g', daily: '30%' },
    { title: 'Cholesterol', item: '80 mg', hundred: '160 mg', daily: '50%' },
    { title: 'Sodium', item: '20 mg', hundred: '40 mg', daily: '5%' },
    { title: 'Potassium', item: '200 mg', hundred: '400 mg', daily: '8%' }
  ]

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

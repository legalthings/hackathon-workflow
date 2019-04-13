<template>
  <v-card class="main mx-auto elevation-15" max-width="60rem" height="100%">
    <v-layout row wrap justify-content-space-between>
      <v-flex xs12>
        <v-img
          data-cy="logo"
          contain
          class="logo"
          width="100%"
          :src="require('../assets/foodflow-huge.png')"
        />
      </v-flex>

      <v-flex
        xs12
        text-xs-center
        class="mx-4 py-5 mb-5"
        style="margin-top: 5vh;"
      >
        <div v-if="!scanning">
          <a @click.prevent="scanning = true">
            <v-img
              class="scan"
              width="30%"
              contain
              :src="require('../assets/qrcode-scan.png')"
            />

            <h1 class="scan display-2 mt-5">Scan your Produce</h1>
          </a>
        </div>
        <div v-if="scanning">
          <p class="error">{{ error }}</p>
          <qrcode-stream
            class="qrcode"
            data-cy="qr-cam-stream"
            @decode="onDecode"
            @init="onInit"
            id="QRcamera"
          />
        </div>
      </v-flex>

      <v-flex class="xs12" text-xs-center> </v-flex>
    </v-layout>

    <v-btn
      data-cy="start-scan-button"
      v-if="!scanning"
      @click="scanning = true"
      class="float-scan"
      dark
      fab
      fixed
      color="green"
    >
      <v-icon>camera</v-icon>
    </v-btn>

    <v-btn
      data-cy="stop-scan-button"
      v-if="scanning"
      @click="scanning = false"
      class="float-scan"
      dark
      fab
      fixed
      color="red"
    >
      <v-icon>camera</v-icon>
    </v-btn>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Watch } from 'vue-property-decorator'
// @ts-ignore
import { QrcodeStream } from 'vue-qrcode-reader'

@Component({
  components: {
    QrcodeStream
  }
})
export default class Home extends Vue {
  result: string = ''
  error: string = ''
  scanning: boolean = false

  async onInit(promise: Promise<any>) {
    try {
      await promise
    } catch (error) {
      if (error.name === 'NotAllowedError') {
        this.error = 'ERROR: you need to grant camera access permisson'
      } else if (error.name === 'NotFoundError') {
        this.error = 'ERROR: no camera on this device'
      } else if (error.name === 'NotSupportedError') {
        this.error = 'ERROR: secure context required (HTTPS, localhost)'
      } else if (error.name === 'NotReadableError') {
        this.error = 'ERROR: is the camera already in use?'
      } else if (error.name === 'OverconstrainedError') {
        this.error = 'ERROR: installed cameras are not suitable'
      } else if (error.name === 'StreamApiNotSupportedError') {
        this.error = 'ERROR: Stream API is not supported in this browser'
      }

      console.log('on init', error)
    }
  }

  onDecode(sc: string) {
    this.result = sc
    this.scanning = false
    console.log('result: ', sc)
  }

  @Watch('result')
  onResultChange(value: string, oldvalue: string) {
    console.log('redirect', value)
    const chainId = '12345'
    this.$router.push({ path: `/chain/${chainId}` })
  }
}
</script>

<style scoped>
.main {
  background-image: linear-gradient(90deg, #7daef4 0%, #4776e6 100%);
}

.scan {
  margin: auto;
}

h1.scan {
  color: white;
}

.float-scan {
  left: 50%;
  margin-left: -28px;
  bottom: 28px;
}

.qrcode >>> .qrcode-stream__camera {
  width: 100%;
  height: 100%;
  border: 4px solid white;
}
</style>

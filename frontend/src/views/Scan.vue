<template>
  <div>
    <v-container v-if="!scanning" fill-height grid-list-md text-xs-center>
      <v-layout row wrap align-center justify-center>
        <v-flex class="xs12">
          <v-img
            contain
            class="logo"
            width="100%"
            style="margin-bottom: 15vh;"
            :src="require('../assets/foodflow-huge.png')"
          />
        </v-flex>
        <v-flex class="xs12">
          <a @click.prevent="scanning = true">
            <v-img
              class="scan"
              width="30%"
              contain
              :src="require('../assets/qrcode-scan.png')"
            />

            <h1 class="scan display-1 mt-3">Scan your Produce</h1>
          </a>
        </v-flex>
      </v-layout>
    </v-container>

    <v-container v-if="scanning" fill-height grid-list-md text-xs-center>
      <v-layout row wrap>
        <v-flex class="xs12">
          <p class="error">{{ error }}</p>
          <qrcode-stream
            class="qrcode"
            data-cy="qr-cam-stream"
            @decode="onDecode"
            @init="onInit"
            id="QRcamera"
          />
        </v-flex>
      </v-layout>
    </v-container>

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

    <v-bottom-nav :value="true" absolute shift>
      <v-btn dark>
        <span>Menu</span>
        <v-icon>menu</v-icon>
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn dark>
        <span>Share</span>
        <v-icon>share</v-icon>
      </v-btn>
    </v-bottom-nav>
  </div>
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
  }
}
</script>

<style scoped>
.scan {
  margin: auto;
}

h1.scan {
  color: white;
  font-size: ;
}

.float-scan {
  left: 50%;
  margin-left: -28px;
  bottom: 28px;
}

.qrcode {
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
  position: fixed;
}

.qrcode >>> .qrcode-stream__inner-wrapper {
  width: 100%;
  height: 100%;
}

.qrcode >>> .qrcode-stream__camera {
  width: 100%;
  height: 100%;
}
</style>

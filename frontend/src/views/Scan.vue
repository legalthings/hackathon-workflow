<template>
  <v-container bg fill-height grid-list-md text-xs-center>
    <v-layout row wrap align-center>
      <v-flex>
        <v-btn
          id="start-scan"
          v-if="!scanning"
          block
          large
          color="info"
          v-on:click.native="scanning = true"
          >Scan QR</v-btn
        >

        <div v-if="scanning">
          <p class="error">{{ error }}</p>
          <qrcode-stream @decode="onDecode" @init="onInit" id="QRcamera" />
        </div>
      </v-flex>
    </v-layout>
  </v-container>
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

<style>
.g {
}
</style>

<script>
import { AppSettings } from "@/components/data/AppSettings"

export default {
  data () {
    return {
      appSettings: AppSettings,
      connection: null,
      transcode_queue_size: 0
    }
  },
  created () {
    this.connection = new WebSocket(this.appSettings.backendWsBase() + "/v1/transcode/status/ws")
    this.connection.onopen = function (event) {
      console.log("websocket connected!")
    }
    this.connection.onmessage = this.onWsMessage
  },
  methods: {
    onWsMessage (event) {
      const status = JSON.parse(event.data)
      this.transcode_queue_size = status.queue_size
    }
  }
}
</script>

<template>
  Transcoder Queue: {{ transcode_queue_size }}
</template>

<style scoped>

</style>

<script>
export default {
  data () {
    return {
      connection: null,
      transcode_queue_size: 0
    }
  },
  created () {
    this.connection = new WebSocket("ws://" + this.$backendHost + "/v1/transcode/status/ws")
    this.connection.onopen = function (event) {
      console.log("websocket connected!")
      console.log(event.target)
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

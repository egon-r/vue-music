<script lang="ts">
import axios, { CanceledError } from "axios"

enum RequestStatus {
  SUCCESS,
  CONNECTED_INVALID_KEY,
  ERROR,
  IDLE,
  CONNECTING,
}

export default {
  props: {
    requestUrl: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      requestStatusEnum: RequestStatus,
      requestStatus: RequestStatus.IDLE,
      abortController: new AbortController(),
      currentRequest: null
    }
  },
  watch: {
    requestUrl: {
      handler () {
        this.checkStatus()
      }
    }
  },
  mounted () {
    this.checkStatus()
  },
  methods: {
    checkStatus () {
      if (this.backendRequest !== null) {
        this.abortController.abort()
        this.abortController = new AbortController()
      }
      this.requestStatus = RequestStatus.CONNECTING
      this.backendRequest = axios.get(this.requestUrl, { signal: this.abortController.signal })
        .then(res => {
          this.requestStatus = RequestStatus.SUCCESS
          this.backendRequest = null
        })
        .catch(err => {
          if (err instanceof CanceledError) {
            this.requestStatus = RequestStatus.IDLE
          } else {
            this.requestStatus = RequestStatus.ERROR
          }
          this.backendRequest = null
        })
    }
  }
}
</script>

<template>
  <div v-if="requestStatus === requestStatusEnum.IDLE"
       class="material-icons">
    &nbsp;
  </div>
  <div v-else-if="requestStatus === requestStatusEnum.CONNECTING"
       class="material-icons opacity-50">
    more_horizontal
  </div>
  <div v-else-if="requestStatus === requestStatusEnum.SUCCESS"
       class="material-icons text-green-600">
    check
  </div>
  <div v-else-if="requestStatus === requestStatusEnum.ERROR"
       class="material-icons text-red-600">
    error
  </div>
  <div v-else-if="requestStatus === requestStatusEnum.CONNECTED_INVALID_KEY"
       class="material-icons text-orange-600">
    signal_wifi_statusbar_connected_no_internet_4
  </div>
  <div v-else>???</div>
</template>

<style scoped>

</style>

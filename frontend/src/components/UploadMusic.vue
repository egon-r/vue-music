<script lang="ts">
import emitter, { MusicLibraryEvents } from "../services/emitter"
import axios from "axios"
import TranscoderStatus from "./TranscoderStatus.vue"
import ThButton from "./themed/ThButton.vue"
import ThProgress from "./themed/ThProgress.vue"
import { AppSettings } from "./data/AppSettings"

export default {
  components: { ThProgress, ThButton, TranscoderStatus },
  data: function () {
    return {
      appSettings: AppSettings,
      uploadProgress: 0.0
    }
  },
  methods: {
    upload (e) {
      this.$refs.uploadButton.disabled = true
      e.preventDefault()
      const formData = new FormData(this.$refs.uploadForm)
      axios
        .post(this.appSettings.backendHttpBase() + "/v1/transcode/upload", formData, {
          onUploadProgress: (event) => {
            this.uploadProgress = event.progress * 100
          },
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then((res) => {
          console.log(res)
          emitter.emit(MusicLibraryEvents.modified)
          this.$refs.uploadButton.disabled = false
        })
        .catch((err) => {
          console.error(err)
          this.$refs.uploadButton.disabled = false
        })
    }
  }
}
</script>

<template>
  <form ref="uploadForm">
    <input type="file" name="file[]" multiple />
    <ThButton ref="uploadButton" @click="upload">
      Upload
    </ThButton>
    <br />
    <ThProgress class="w-full" :progress=uploadProgress />
    <TranscoderStatus/>
  </form>
</template>

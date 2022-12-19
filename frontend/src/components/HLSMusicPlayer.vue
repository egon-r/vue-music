<script>
import Hls from "hls.js";
import emitter, { HLSPlayerEvents } from "@/services/emitter";

let hls = new Hls();
let currentStreamUrl = "";

export default {
  mounted() {
    hls.attachMedia(this.$refs["video"]);
    emitter.on(HLSPlayerEvents.play, this.onPlayEvent);
  },
  unmounted() {
    emitter.off(HLSPlayerEvents.play, this.onPlayEvent);
  },
  methods: {
    onPlayEvent(song) {
      const newStreamUrl = "http://localhost:3000/stream/" + song.sha1 + ".m3u8";
      console.log("hls_play -> " + newStreamUrl);
      if (newStreamUrl !== currentStreamUrl) {
        currentStreamUrl = newStreamUrl;
        hls.loadSource(currentStreamUrl);
        this.$refs["video"]?.play();
      }
    }
  }
};
</script>

<template>
  <video ref="video" controls />
</template>

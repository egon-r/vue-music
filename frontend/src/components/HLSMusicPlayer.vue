<script>
import Hls from "hls.js";
import emitter, { HLSPlayerEvents } from "@/services/emitter";
import { backend_base_url } from "@/main";

let hls = new Hls();
let currentStreamUrl = "";

export default {
  mounted() {
    hls.attachMedia(this.$refs["video"]);
    emitter.on(HLSPlayerEvents.play, this.onPlayEvent);
    emitter.on(HLSPlayerEvents.pause, this.onPauseEvent);
    emitter.on(HLSPlayerEvents.next_song, this.onNextSongEvent);
    emitter.on(HLSPlayerEvents.prev_song, this.onPrevSongEvent);
  },
  unmounted() {
    emitter.off(HLSPlayerEvents.play, this.onPlayEvent);
    emitter.off(HLSPlayerEvents.pause, this.onPauseEvent);
    emitter.off(HLSPlayerEvents.next_song, this.onNextSongEvent);
    emitter.off(HLSPlayerEvents.prev_song, this.onPrevSongEvent);
  },
  methods: {
    onPlayEvent(song) {
      if (song) {
        const newStreamUrl = backend_base_url + "/stream/" + song.sha1 + ".m3u8";
        console.log("hls_play -> " + newStreamUrl);
        if (newStreamUrl !== currentStreamUrl) {
          currentStreamUrl = newStreamUrl;
          hls.loadSource(currentStreamUrl);
        }
      }
      this.$refs["video"]?.play();
    },
    onPauseEvent() {
      this.$refs["video"]?.pause();
    },
    onNextSongEvent() {
      console.log("HLS Player: next song")
    },
    onPrevSongEvent() {
      console.log("HLS Player: prev song")
    },
  },
};
</script>

<template>
  <video ref="video" controls />
</template>

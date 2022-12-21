<script>
import Hls from "hls.js";
import emitter, { HLSPlayerEvents } from "@/services/emitter";
import { backend_base_url } from "@/main";

let hls = new Hls();
let currentStreamUrl = "";

export default {
  mounted() {
    hls.attachMedia(this.$refs.video);
    // setup event bus events
    emitter.on(HLSPlayerEvents.play, this.emitter_onPlayEvent);
    emitter.on(HLSPlayerEvents.pause, this.emitter_onPauseEvent);
    emitter.on(HLSPlayerEvents.next_song, this.emitter_onNextSongEvent);
    emitter.on(HLSPlayerEvents.prev_song, this.emitter_onPrevSongEvent);
    emitter.on(HLSPlayerEvents.set_volume, this.emitter_onSetVolume);
    emitter.on(HLSPlayerEvents.seek_to_s, this.emitter_onSeekToS);
    // setup HTMLMediaElement events
    this.$refs.video.onloadedmetadata = this.metadataLoaded;
    this.$refs.video.ontimeupdate = this.onPlayTimeUpdate;
  },
  unmounted() {
    // unregister event bus events
    emitter.off(HLSPlayerEvents.play, this.emitter_onPlayEvent);
    emitter.off(HLSPlayerEvents.pause, this.emitter_onPauseEvent);
    emitter.off(HLSPlayerEvents.next_song, this.emitter_onNextSongEvent);
    emitter.off(HLSPlayerEvents.prev_song, this.emitter_onPrevSongEvent);
    emitter.off(HLSPlayerEvents.set_volume, this.emitter_onSetVolume);
    emitter.off(HLSPlayerEvents.seek_to_s, this.emitter_onSeekToS);
  },
  methods: {
    // eslint-disable-next-line no-unused-vars
    onPlayTimeUpdate(event) {
      emitter.emit(HLSPlayerEvents.timeupdate, this.$refs.video.currentTime);
    },
    // eslint-disable-next-line no-unused-vars
    metadataLoaded(event) {
      emitter.emit(HLSPlayerEvents.metadata_loaded, {
        durationS: this.$refs.video.duration,
      });
    },
    emitter_onPlayEvent(song) {
      if (song) {
        this.loadSong(song);
      }
      this.$refs.video.play();
    },
    loadSong(song) {
      const newStreamUrl = backend_base_url + "/stream/" + song.sha1 + ".m3u8";
      if (newStreamUrl !== currentStreamUrl) {
        currentStreamUrl = newStreamUrl;
        hls.loadSource(currentStreamUrl);
      }
    },
    emitter_onPauseEvent() {
      this.$refs.video.pause();
    },
    emitter_onNextSongEvent() {
      console.log("HLS Player: next song");
    },
    emitter_onPrevSongEvent() {
      console.log("HLS Player: prev song");
    },
    emitter_onSetVolume(volume) {
      this.$refs.video.volume = volume;
    },
    emitter_onSeekToS(seekS) {
      this.$refs.video.currentTime = seekS;
    },
  },
};
</script>

<template>
  <video ref="video" controls />
</template>

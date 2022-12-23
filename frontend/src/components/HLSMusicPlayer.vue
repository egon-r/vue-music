<script lang="ts">
import Hls from "hls.js"
import { MusicPlayerData } from "./data/MusicPlayerData"
import emitter, { HLSPlayerEvents } from "../services/emitter"
import { backendBaseUrl } from "../main"

const hls = new Hls()

export default {
  data () {
    return {
      playerData: MusicPlayerData
    }
  },
  watch: {
    "playerData.currentVolume": function (newVal, oldVal) {
      this.$refs.video.volume = newVal
    },
    "playerData.isPlaying": function (newVal, oldVal) {
      if (newVal) {
        this.$refs.video.play()
      } else {
        this.$refs.video.pause()
      }
    },
    "playerData.currentSong": function (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.loadSong(newVal, true)
      }
    }
  },
  mounted () {
    hls.attachMedia(this.$refs.video)
    this.$refs.video.volume = this.playerData.currentVolume
    // setup event bus events
    emitter.on(HLSPlayerEvents.next_song, this.emitter_onNextSongEvent)
    emitter.on(HLSPlayerEvents.prev_song, this.emitter_onPrevSongEvent)
    emitter.on(HLSPlayerEvents.seek_to_s, this.emitter_onSeekToS)
    // setup HTMLMediaElement events
    this.$refs.video.onloadedmetadata = this.metadataLoaded
    this.$refs.video.ontimeupdate = this.onPlayTimeUpdate
  },
  unmounted () {
    // unregister event bus events
    emitter.off(HLSPlayerEvents.next_song, this.emitter_onNextSongEvent)
    emitter.off(HLSPlayerEvents.prev_song, this.emitter_onPrevSongEvent)
    emitter.on(HLSPlayerEvents.seek_to_s, this.emitter_onSeekToS)
  },
  methods: {
    loadSong (song, playNow = false) {
      const streamUrl = backendBaseUrl + "/stream/" + song.sha1 + ".m3u8"
      hls.loadSource(streamUrl)
      if (playNow) {
        this.$refs.video.play()
      }
    },
    emitter_onNextSongEvent () {
      console.log("HLS Player: next song")
    },
    emitter_onPrevSongEvent () {
      console.log("HLS Player: prev song")
    },
    emitter_onSeekToS (seekS) {
      this.$refs.video.currentTime = seekS
    },
    onPlayTimeUpdate () {
      this.playerData.currentSongPlaytime = this.$refs.video.currentTime
    }
  }
}
</script>

<template>
  <video ref="video" class="hidden" />
</template>

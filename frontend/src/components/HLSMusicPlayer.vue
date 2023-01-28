<script lang="ts">
import Hls from "hls.js"
import { LoopModes, MusicPlayerData } from "./data/MusicPlayerData"
import emitter, { HLSPlayerEvents } from "../services/emitter"
import { AppSettings } from "./data/AppSettings"

export default {
  data () {
    return {
      appSettings: AppSettings,
      playerData: MusicPlayerData,
      currentStreamUrl: undefined,
      hls: new Hls()
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
    "playerData.seekTo": function (newVal, oldVal) {
      this.$refs.video.currentTime = newVal
      if (this.$refs.video.paused) {
        this.play()
      }
    },
    "playerData.currentSong": function (newVal, oldVal) {
      this.loadAndPlay(newVal)
    },
    "playerData.currentQueueIndex": function (newVal, oldVal) {
      const newSong = this.playerData.queue[newVal]
      if (newSong) {
        this.$refs.video.currentTime = 0
        this.playerData.currentSong = newSong
      } else {
        this.playerData.currentQueueIndex = oldVal
        this.$refs.video.currentTime = 0
        this.pause()
      }
    }
  },
  mounted () {
    this.hls.attachMedia(this.$refs.video)
    this.$refs.video.volume = this.playerData.currentVolume
    // setup HTMLMediaElement events
    this.$refs.video.onloadedmetadata = this.metadataLoaded
    this.$refs.video.ontimeupdate = this.onPlayTimeUpdate
  },
  unmounted () {
    //
  },
  methods: {
    loadAndPlay (song) {
      const streamUrl = this.appSettings.backendHttpBase() + "/stream/" + song.sha1 + ".m3u8"
      if (streamUrl !== this.currentStreamUrl) {
        this.hls.loadSource(streamUrl)
      } else {
        this.$refs.video.currentTime = 0
      }
      this.play()
    },
    play () {
      this.$refs.video.play()
      this.playerData.isPlaying = true
    },
    pause () {
      this.$refs.video.pause()
      this.playerData.isPlaying = false
    },
    onPlayTimeUpdate () {
      console.log("HLS Bandwidth: " + (this.hls.bandwidthEstimate / 1000).toFixed() + "Kbps")
      for (let i = 0; i < this.$refs.video.buffered.length; i++) {
        console.log("Buffered: " + this.$refs.video.buffered.start(i) + " ... " + this.$refs.video.buffered.end(i))
      }

      this.playerData.currentSongPlaytime = this.$refs.video.currentTime
      if (this.playerData.currentSongPlaytime >= this.playerData.currentSong.duration) {
        this.onCurrentSongEnded()
      }
    },
    onCurrentSongEnded () {
      if (this.playerData.loopMode === LoopModes.LoopOne) {
        this.$refs.video.currentTime = 0
        this.play()
      } else if (this.playerData.loopMode === LoopModes.LoopQueue) {
        if (this.playerData.currentQueueIndex + 1 >= this.playerData.queue.length) {
          this.playerData.currentQueueIndex = 0
        } else {
          this.playerData.currentQueueIndex += 1
        }
      } else if (this.playerData.loopMode === LoopModes.None) {
        this.playerData.currentQueueIndex += 1
      }
    }
  }
}
</script>

<template>
  <video ref="video" class="hidden" />
</template>

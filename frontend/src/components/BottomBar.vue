<script lang="ts">
import { LoopModes, MusicPlayerData } from "./data/MusicPlayerData"
import emitter, { HLSPlayerEvents } from "../services/emitter"
import Utils from "../utils/utils"

export default {
  computed: {
    LoopModes () {
      return LoopModes
    },
    Utils () {
      return Utils
    },
    HLSPlayerEvents () {
      return HLSPlayerEvents
    }
  },
  data () {
    return {
      playerData: MusicPlayerData,
      userIsSeeking: false,
      currentSeekValue: 0
    }
  },
  methods: {
    emitter () {
      return emitter
    },
    nextSong () {
      this.playerData.currentQueueIndex += 1
    },
    prevSong () {
      this.playerData.currentQueueIndex -= 1
    },
    volumeChanged (event) {
      this.playerData.currentVolume = event.target.value / 100.0
    },
    seekbar_change (event) {
      this.userIsSeeking = false
      emitter.emit(HLSPlayerEvents.seek_to_s, this.currentSeekValue)
    },
    seekbar_seeking (event) {
      this.userIsSeeking = true
      this.currentSeekValue = event.target.value
    },
    nextLoopMode: function (event) {
      if (this.playerData.loopMode === LoopModes.None) {
        this.playerData.loopMode = LoopModes.LoopQueue
      } else if (this.playerData.loopMode === LoopModes.LoopQueue) {
        this.playerData.loopMode = LoopModes.LoopOne
      } else {
        this.playerData.loopMode = LoopModes.None
      }
    }
  }
}
</script>

<template>
  <div class="block h-16" />
  <div
    class="
      fixed
      inset-x-0
      bottom-0
      mx-auto
      grid
      h-16
      max-w-screen-xl
      select-none
      grid-cols-3
      items-center
      border-t
      border-t-primary-300
      bg-secondary-800
      dark:bg-secondary-200
    "
  >
    <div class="m-1 flex flex-col justify-start">
      <div class="truncate">
        {{ playerData.currentSong?.title ?? "..." }}
      </div>
      <div class="truncate">
        {{ playerData.currentSong?.artist ?? "..." }}
      </div>
    </div>
    <div class="flex justify-center">
      <span @click="prevSong"
        class="material-icons cursor-pointer">
        skip_previous
      </span>
      <span v-if="playerData.isPlaying"
            class="material-icons cursor-pointer"
            @click="playerData.isPlaying = false">
        pause
      </span>
      <span v-else
            class="material-icons cursor-pointer"
            @click="playerData.isPlaying = true">
        play_arrow
      </span>
      <span @click="nextSong"
        class="material-icons cursor-pointer">
        skip_next
      </span>
      <input
        min="0"
        :max="playerData.currentSong?.duration"
        :value="userIsSeeking ? currentSeekValue : playerData.currentSongPlaytime"
        class="grow"
        type="range"
        @input="seekbar_seeking"
        @change="seekbar_change"
      />
      <span class="flex items-center">
        {{Utils.secondsToDurationStr(userIsSeeking ? currentSeekValue : playerData.currentSongPlaytime)}}
        /
        {{ Utils.secondsToDurationStr(playerData.currentSong?.duration) }}
      </span>
    </div>
    <div class="flex justify-end">
      <span class="material-icons">
        {{
          playerData.currentVolume === 0
            ? "volume_off"
            : playerData.currentVolume >= 0.1
              ? playerData.currentVolume >= 0.5
                ? "volume_up"
                : "volume_down"
              : "volume_mute"
        }}
      </span>
      <input
        type="range"
        class="grow"
        min="0"
        max="100"
        :value="playerData.currentVolume * 100"
        @input="volumeChanged"
      />
      <span class="material-icons">
        playlist_play
      </span>
      <span v-if="playerData.loopMode === LoopModes.LoopOne"
            @click="nextLoopMode"
            class="material-icons cursor-pointer text-primary-600">
        repeat_one
      </span>
      <span v-else-if="playerData.loopMode === LoopModes.LoopQueue"
            @click="nextLoopMode"
            class="material-icons cursor-pointer text-primary-600">
        repeat
      </span>
      <span v-else-if="playerData.loopMode === LoopModes.None"
            @click="nextLoopMode"
            class="material-icons cursor-pointer opacity-50">
        repeat
      </span>
    </div>
  </div>
</template>

<style scoped>
.material-icons {
  font-size: 2.5em;
}
</style>

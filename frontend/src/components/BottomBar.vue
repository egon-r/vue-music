<script lang="ts">
import { LoopModes, MusicPlayerData } from "./data/MusicPlayerData"
import emitter, { HLSPlayerEvents } from "../services/emitter"
import Utils from "../utils/utils"
import ThButton from "./themed/ThButton.vue"
import ThSlider from "./themed/ThSlider.vue"

export default {
  components: { ThSlider, ThButton },
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
      z-10
      mx-auto
      h-20
      max-w-screen-xl
      select-none
      bg-secondary-800
      dark:bg-secondary-200
    "
  >
    <ThSlider
      min="0"
      :max="playerData.currentSong?.duration"
      :value="userIsSeeking ? currentSeekValue : playerData.currentSongPlaytime"
      class="absolute w-full"
      @input="seekbar_seeking"
      @change="seekbar_change"
    />
    <div class="flex h-full items-center pt-4">
      <div class="flex flex-1">
        <ThButton @click="prevSong"
                  variant="transparent"
                  class="material-icons w-12 cursor-pointer">
          skip_previous
        </ThButton>
        <ThButton v-if="playerData.isPlaying"
                  variant="transparent"
                  class="material-icons w-12 cursor-pointer"
                  @click="playerData.isPlaying = false">
          pause
        </ThButton>
        <ThButton v-else
                  variant="transparent"
                  class="material-icons"
                  @click="playerData.isPlaying = true">
          play_arrow
        </ThButton>
        <ThButton @click="nextSong"
                  variant="transparent"
                  class="material-icons cursor-pointer">
          skip_next
        </ThButton>
      </div>
      <div class="flex grow flex-col items-center justify-center truncate">
        <div class="truncate">
          {{ playerData.currentSong?.title ?? "..." }}
        </div>
        <div class="truncate opacity-50">
          {{ playerData.currentSong?.artist ?? "..." }}
        </div>
      </div>
      <div class="flex flex-1 justify-end pr-2">
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
        <ThSlider
          class="w-36"
          @input="volumeChanged" :value="playerData.currentVolume * 100"
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
  </div>
</template>

<style scoped>
.material-icons {
  font-size: 2.5em;
}
</style>

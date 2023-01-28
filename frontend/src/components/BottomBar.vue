<script lang="ts">
import { LoopModes, MusicPlayerData } from "./data/MusicPlayerData"
import emitter, { HLSPlayerEvents } from "../services/emitter"
import Utils from "../utils/utils"
import ThButton from "./themed/ThButton.vue"
import ThSlider from "./themed/ThSlider.vue"
import ThModal from "@/components/themed/ThModal.vue"
import PlayerQueueView from "./PlayerQueueView.vue"
import ThCard from "./themed/ThCard.vue"
import { AppSettings as appSettings } from "./data/AppSettings"

export default {
  components: { ThCard, PlayerQueueView, ThModal, ThSlider, ThButton },
  computed: {
    appSettings () {
      return appSettings
    },
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
    showCurrentlyPlayingClicked (e) {
      this.$refs.playerQueueModal.toggle()
    },
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
      this.playerData.seekTo = this.currentSeekValue
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
      z-30
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
                  class="material-icons w-12"
                  @click="playerData.isPlaying = true">
          play_arrow
        </ThButton>
        <ThButton @click="nextSong"
                  variant="transparent"
                  class="material-icons w-12 cursor-pointer">
          skip_next
        </ThButton>
      </div>
      <div class="flex grow items-center justify-center truncate">
        <img class="mx-3 h-12 w-12" :src="appSettings.backendHttpBase() + '/v1/thumb?sha1=' + playerData.currentSong?.thumbnailSha1"/>
        <div class="flex-col items-center justify-center">
          <div class="truncate">
            {{ playerData.currentSong?.title ?? "..." }}
          </div>
          <div class="truncate opacity-50">
            {{ playerData.currentSong?.artist ?? "..." }}
          </div>
        </div>
      </div>
      <div class="flex flex-1 items-center justify-end pr-2">
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
        <ThButton variant="transparent w-12 cursor-pointer" class="material-icons" @click="showCurrentlyPlayingClicked">
            playlist_play
        </ThButton>
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
  <ThModal hideOnFocusLoss="false" ref="playerQueueModal" class="bottom-20">
    <ThCard class="shadow-md shadow-primary-600">
      <PlayerQueueView />
    </ThCard>
  </ThModal>
</template>

<style scoped>
.material-icons {
  font-size: 2.5em;
}
</style>

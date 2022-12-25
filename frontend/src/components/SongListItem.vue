<script lang="ts">
import emitter, {
  MusicLibraryEvents
} from "../services/emitter"
import { MusicPlayerData, SongModel } from "./data/MusicPlayerData"
import axios from "axios"
import Utils from "../utils/utils"

export default {
  computed: {
    Utils () {
      return Utils
    },
    thisIsPlaying () {
      if (!this.interactive) {
        if (this.queueIndex === this.playerData.currentQueueIndex) {
          return true
        }
      } else {
        if (this.song === this.playerData.currentSong) {
          return true
        }
      }
      return false
    }
  },
  props: {
    song: {
      type: Object as () => SongModel,
      required: true
    },
    interactive: {
      type: Boolean,
      required: false,
      default: true
    },
    queueIndex: {
      type: Number,
      required: false,
      default: -1
    }
  },
  data () {
    return {
      playerData: MusicPlayerData
    }
  },
  methods: {
    listItemClicked (event) {
      if (this.queueIndex !== -1) {
        // in a queue, jump to this song
        this.playerData.currentQueueIndex = this.queueIndex
      } else {
        // not in a queue
        if (this.playerData.isPlaying && this.playing) {
          this.playerData.isPlaying = false
        } else {
          this.playerData.queueIndex = 0
          this.playerData.queue = [this.song]
          this.playerData.currentSong = this.song
          this.playerData.isPlaying = true
        }
      }
    },
    addToCurrentQueue (event) {
      this.playerData.queue.push(this.song)
    },
    deleteSong (song) {
      axios
        .get(this.$backendBaseUrl + "/v1/library/delete", {
          params: {
            hash: song.sha1
          }
        })
        .then(() => {
          emitter.emit(MusicLibraryEvents.modified)
        })
    }
  }
}
</script>

<template>
  <div class="flex hover:bg-secondary-200">
    <span v-if="thisIsPlaying"
          class="material-icons self-center text-primary-600">
      {{ this.playerData.isPlaying ? "play_arrow" : "pause"}}
    </span>
    <div class="grid flex-auto cursor-pointer grid-cols-3 py-1"
         @click="listItemClicked($event)">
      <span class="truncate">
        {{ song.title }}
      </span>
      <span class="truncate">
        {{ song.artist }}
      </span>
      <span class="truncate">
        {{ song.album }}
      </span>
    </div>

    <div class="mx-4 flex flex-initial">
      <div v-if="interactive"
           @click="addToCurrentQueue($event)"
           class="material-icons w-6 text-clip text-center hover:bg-red-600">
        playlist_add
      </div>
      <span v-if="interactive"
            class="material-icons w-6 text-clip text-center hover:bg-red-600">
        more_vertical
      </span>
      <div class="self-center opacity-60">
        {{ Utils.secondsToDurationStr(song.duration) }}
      </div>
    </div>
  </div>
</template>

<style scoped></style>

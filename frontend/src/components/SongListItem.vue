<script lang="ts">
import emitter, {
  MusicLibraryEvents
} from "../services/emitter"
import { MusicPlayerData, SongModel } from "./data/MusicPlayerData"
import axios from "axios"
import Utils from "../utils/utils"
import ThButton from "./themed/ThButton.vue"
import { AppSettings } from "./data/AppSettings"

export default {
  components: { ThButton },
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
      appSettings: AppSettings,
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
        .get(this.appSettings.backendHttpBase() + "/v1/songs/delete", {
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
  <div class="flex flex-row items-center hover:bg-secondary-800 dark:hover:bg-secondary-200">
    <div class="flex h-12 w-12 items-center justify-center">
      <span v-if="thisIsPlaying"
            class="material-icons absolute self-center text-primary-600">
        {{ this.playerData.isPlaying ? "play_arrow" : "pause" }}
      </span>
      <img class="h-12 w-12" :src="appSettings.backendHttpBase() + '/v1/thumb?sha1=' + song.thumbnailSha1 " />
    </div>
    <div class="grid grow cursor-pointer py-1 md:grid-cols-2"
         @click="listItemClicked($event)">
      <div class="truncate">
        {{ song.title }}
      </div>
      <div class="flex truncate opacity-50 md:grid md:grid-cols-2">
        <div class="truncate">
          {{ song.artist }}
        </div>
        <div class="md:hidden">&nbsp;-&nbsp;</div>
        <div class="truncate">
          {{ song.album }}
        </div>
      </div>
    </div>
    <div class="flex">
      <ThButton v-if="interactive"
                @click="addToCurrentQueue($event)"
                variant="transparent"
                color="secondary"
                class="material-icons w-10">
        playlist_add
      </ThButton>
      <ThButton v-if="interactive"
                variant="transparent"
                color="secondary"
                class="material-icons w-10">
        menu
      </ThButton>
      <div class="self-center opacity-50">
        {{ Utils.secondsToDurationStr(song.duration) }}
      </div>
    </div>
  </div>
</template>

<style scoped></style>

<script lang="ts">
import { backendBaseUrl } from "../main"
import emitter, { MusicLibraryEvents } from "../services/emitter"
import { MusicPlayerData } from "./data/MusicPlayerData"
import axios from "axios"
import Utils from "../utils/utils"

export default {
  computed: {
    Utils () {
      return Utils
    }
  },
  props: {
    song: {
      required: true
    }
  },
  data () {
    return {
      playerData: MusicPlayerData
    }
  },
  methods: {
    playSong (event, song) {
      this.playerData.currentSong = song
    },
    deleteSong (song) {
      axios
        .get(backendBaseUrl + "/v1/library/delete", {
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
  <div class="flex">
    <div class="grid flex-auto grid-cols-3" @click="playSong($event, song)">
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
      <div class="material-icons w-8 hover:bg-red-600">more_vertical</div>
      <div class="self-center opacity-60">
        {{ Utils.secondsToDurationStr(song.duration) }}
      </div>
    </div>
  </div>
</template>

<style scoped></style>

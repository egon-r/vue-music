<script lang="ts">
import emitter, {
  MusicLibraryEvents
} from "../services/emitter"
import axios from "axios"
import SongListItem from "./SongListItem.vue"

export default {
  components: { SongListItem },
  data () {
    return {
      songs: null
    }
  },
  mounted () {
    this.fetchSongs()
    emitter.on(
      MusicLibraryEvents.modified,
      this.emitter_onLibraryModifiedEvent
    )
  },
  unmounted () {
    emitter.off(
      MusicLibraryEvents.modified,
      this.emitter_onLibraryModifiedEvent
    )
  },
  methods: {
    fetchSongs () {
      axios.get(this.$backendBaseUrl + "/v1/songs").then((response) => {
        this.songs = response.data
      }).catch((e) => {
        console.error(e)
      })
    },
    emitter_onLibraryModifiedEvent () {
      this.fetchSongs()
    }
  }
}
</script>

<template>
  <div class="text-3xl">Music Library</div>
  <div v-for="song in songs">
    <SongListItem :song="song" />
  </div>
</template>

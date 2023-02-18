<script lang="ts">
import { defineComponent } from "vue"
import { MusicPlayerData } from "./data/MusicPlayerData"
import SongListItem from "./SongListItem.vue"

export default defineComponent({
  components: { SongListItem },
  data () {
    return {
      playerData: MusicPlayerData
    }
  }
})
</script>

<template>
  <div class="text-3xl">Current Queue</div>
  <div v-for="(song, index) in playerData.queue">
    <SongListItem :song="song" :interactive="false" :queueIndex="index"/>
  </div>
</template>

<style scoped>

</style>

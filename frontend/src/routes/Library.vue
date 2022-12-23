<script lang="ts">
import MusicLibraryView from "@/components/MusicLibraryView.vue"
import Card from "@/components/Card.vue"
import UploadMusic from "@/components/UploadMusic.vue"
import PlayerQueueView from "../components/PlayerQueueView.vue";

export default {
  components: {
    PlayerQueueView,
    UploadMusic,
    Card,
    MusicLibraryView
  }
}
</script>

<template>
  <Card>
    <UploadMusic />
  </Card>
  <Card>
    <MusicLibraryView />
  </Card>
  <Card>
    <PlayerQueueView />
  </Card>
</template>

<style scoped></style>

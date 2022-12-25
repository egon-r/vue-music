<script lang="ts">
import MusicLibraryView from "@/components/MusicLibraryView.vue"
import UploadMusic from "@/components/UploadMusic.vue"
import PlayerQueueView from "../components/PlayerQueueView.vue"
import ThButton from "../components/themed/ThButton.vue"
import ThCard from "../components/themed/ThCard.vue"

export default {
  components: {
    ThCard,
    ThButton,
    PlayerQueueView,
    UploadMusic,
    MusicLibraryView
  }
}
</script>

<template>
  <ThCard>
    <ThButton color="primary">Primary</ThButton>
    <ThButton color="secondary">Secondary</ThButton>
  </ThCard>
  <ThCard>
    <UploadMusic />
  </ThCard>
  <ThCard>
    <MusicLibraryView />
  </ThCard>
  <ThCard>
    <PlayerQueueView />
  </ThCard>
</template>

<style scoped></style>

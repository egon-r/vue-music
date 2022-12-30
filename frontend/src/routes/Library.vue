<script lang="ts">
import MusicLibraryView from "@/components/MusicLibraryView.vue"
import UploadMusic from "@/components/UploadMusic.vue"
import PlayerQueueView from "../components/PlayerQueueView.vue"
import ThButton from "../components/themed/ThButton.vue"
import ThCard from "../components/themed/ThCard.vue"
import ThProgress from "../components/themed/ThProgress.vue"

export default {
  components: {
    ThProgress,
    ThCard,
    ThButton,
    PlayerQueueView,
    UploadMusic,
    MusicLibraryView
  }
}
</script>

<template>
  <ThCard class="grid grid-cols-2 gap-4">
    <ThButton color="primary">Primary</ThButton>
    <ThButton color="secondary">Secondary</ThButton>
    <ThProgress progress="60"></ThProgress>
    <ThProgress progress="20" color="secondary"></ThProgress>
    <ThProgress progress="-1"></ThProgress>
    <ThProgress progress="-1" color="secondary"></ThProgress>
    <ThButton color="primary" variant="transparent" class="material-icons">play_arrow</ThButton>
    <ThButton color="secondary" variant="transparent" class="material-icons">play_arrow</ThButton>
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

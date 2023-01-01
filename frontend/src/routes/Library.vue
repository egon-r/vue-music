<script lang="ts">
import MusicLibraryView from "@/components/MusicLibraryView.vue"
import UploadMusic from "@/components/UploadMusic.vue"
import PlayerQueueView from "../components/PlayerQueueView.vue"
import ThButton from "../components/themed/ThButton.vue"
import ThCard from "../components/themed/ThCard.vue"
import ThProgress from "../components/themed/ThProgress.vue"
import ThComponentsTest from "../components/themed/ThComponentsTest.vue"

export default {
  components: {
    ThCard,
    PlayerQueueView,
    UploadMusic,
    MusicLibraryView
  }
}
</script>

<template>
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

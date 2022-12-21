<script>
import MusicLibraryView from "@/components/MusicLibraryView.vue";
import Card from "@/components/Card.vue";
import UploadMusic from "@/components/UploadMusic.vue";

export default {
  components: {
    UploadMusic,
    Card,
    MusicLibraryView
  }
}
</script>

<template>
  <Card>
    <UploadMusic/>
  </Card>
  <Card>
    <MusicLibraryView/>
  </Card>
</template>

<style scoped></style>

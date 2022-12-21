<script>
import ThemeToggle from "@/components/ThemeToggle.vue";
import Card from "@/components/Card.vue";
import BottomBar from "@/components/BottomBar.vue";
import MusicLibraryView from "@/components/MusicLibraryView.vue";
import HLSMusicPlayer from "@/components/HLSMusicPlayer.vue";
import UploadMusic from "@/components/UploadMusic.vue";
import TopBar from "@/components/TopBar.vue";

export default {
  components: { TopBar, UploadMusic, HLSMusicPlayer, MusicLibraryView, BottomBar, Card, ThemeToggle },
}
</script>

<template>
  <header></header>

  <main>
    <TopBar/>
    <Card>
      <HLSMusicPlayer/>
    </Card>
    <Card>
      <MusicLibraryView/>
    </Card>
    <Card>
      <UploadMusic/>
    </Card>

    <BottomBar />
  </main>
</template>

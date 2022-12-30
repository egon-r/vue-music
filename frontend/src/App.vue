<script lang="ts">
import { RouterView } from "vue-router"
import TopBar from "@/components/TopBar.vue"
import HLSMusicPlayer from "@/components/HLSMusicPlayer.vue"
import BottomBar from "@/components/BottomBar.vue"

export default {
  components: {
    BottomBar,
    TopBar,
    RouterView,
    HLSMusicPlayer
  }
}
</script>

<template>
  <header></header>

  <main>
    <TopBar />
    <HLSMusicPlayer />
    <div class="mx-auto w-screen max-w-screen-xl">
      <RouterView />
    </div>
    <BottomBar />
  </main>
</template>

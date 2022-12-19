<script>
import emitter, { HLSPlayerEvents } from "@/services/emitter";

export default {
  data() {
    return {
      currentSong: null,
    };
  },
  mounted() {
    emitter.on(HLSPlayerEvents.play, this.onPlayEvent);
  },
  unmounted() {
    emitter.off(HLSPlayerEvents.play, this.onPlayEvent);
  },
  methods: {
    onPlayEvent(song) {
      this.currentSong = song;
    },
  },
};
</script>

<template>
  <div class="h-18 absolute bottom-0 flex w-full bg-red-800">
    <div class="m-1 flex-initial flex-row bg-blue-600">
      <div>{{ currentSong?.title ?? "Title" }}</div>
      <div>{{ currentSong?.artist ?? "Artist" }}</div>
    </div>
    <div class="flex-1"></div>
    <div class="m-1 flex-initial bg-blue-600">
      Previous, Play/Pause, Next --------------o-------
    </div>
    <div class="flex-1"></div>
    <div class="m-1 flex-initial bg-blue-600">Volume, Current Queue</div>
  </div>
</template>

<script>
import emitter, { HLSPlayerEvents } from "@/services/emitter";

export default {
  computed: {
    HLSPlayerEvents() {
      return HLSPlayerEvents;
    },
  },
  data() {
    return {
      currentSong: null,
      isPlaying: false,
    };
  },
  mounted() {
    emitter.on(HLSPlayerEvents.play, this.onPlayEvent);
    emitter.on(HLSPlayerEvents.pause, this.onPauseEvent);
  },
  unmounted() {
    emitter.off(HLSPlayerEvents.play, this.onPlayEvent);
    emitter.off(HLSPlayerEvents.pause, this.onPauseEvent);
  },
  methods: {
    emitter() {
      return emitter;
    },
    onPlayEvent(song) {
      if (song) {
        this.currentSong = song;
      }
      this.isPlaying = true;
    },
    onPauseEvent() {
      this.isPlaying = false;
    },
  },
};
</script>

<template>
  <div class="block h-16" />
  <div class="h-16 fixed bottom-0 flex items-center w-full select-none bg-red-800">
    <div class="m-1 flex-initial flex-row bg-blue-600">
      <div>{{ currentSong?.title ?? "Title" }}</div>
      <div>{{ currentSong?.artist ?? "Artist" }}</div>
    </div>
    <div class="flex-grow"></div>
    <div class="flex-inital bg-blue-600">
      <span class="material-icons">skip_previous</span>
      <span
        v-if="isPlaying"
        class="material-icons cursor-pointer"
        @click="emitter().emit(HLSPlayerEvents.pause, null)"
        >pause</span
      >
      <span
        v-else
        class="material-icons cursor-pointer"
        @click="emitter().emit(HLSPlayerEvents.play, null)"
        >play_arrow</span
      >
      <span class="material-icons">skip_next</span>
    </div>
    <div class="flex-grow"></div>
    <div class="flex-initial bg-blue-600">Volume, Current Queue</div>
  </div>
</template>

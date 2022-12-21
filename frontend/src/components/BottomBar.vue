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
      currentVolume: 20,
      currentSongDuration: 0,
      currentSongPlaytime: 0,
      userIsSeeking: false,
    };
  },
  mounted() {
    emitter.on(HLSPlayerEvents.play, this.emitter_onPlayEvent);
    emitter.on(HLSPlayerEvents.pause, this.emitter_onPauseEvent);
    emitter.on(HLSPlayerEvents.metadata_loaded, this.emitter_onMetadataLoaded);
    emitter.on(HLSPlayerEvents.timeupdate, this.emitter_onTimeupdate);
  },
  unmounted() {
    emitter.off(HLSPlayerEvents.play, this.emitter_onPlayEvent);
    emitter.off(HLSPlayerEvents.pause, this.emitter_onPauseEvent);
    emitter.on(HLSPlayerEvents.metadata_loaded, this.emitter_onMetadataLoaded);
    emitter.on(HLSPlayerEvents.timeupdate, this.emitter_onTimeupdate);
  },
  methods: {
    emitter() {
      return emitter;
    },
    emitter_onPlayEvent(song) {
      if (song) {
        this.currentSong = song;
      }
      this.isPlaying = true;
    },
    emitter_onPauseEvent() {
      this.isPlaying = false;
    },
    volumeChanged() {
      emitter.emit(HLSPlayerEvents.set_volume, this.currentVolume / 100.0);
    },
    seekbar_change(event) {
      this.userIsSeeking = false;
      emitter.emit(HLSPlayerEvents.seek_to_s, event.target.value);
    },
    seekbar_seeking() {
      this.userIsSeeking = true;
    },
    emitter_onMetadataLoaded(metadata) {
      this.currentSongDuration = Math.round(metadata.durationS);
    },
    emitter_onTimeupdate(timeS) {
      if (!this.userIsSeeking) {
        this.currentSongPlaytime = Math.round(timeS);
      }
    },
  },
};
</script>

<template>
  <div class="block h-16" />
  <div
    class="
      fixed
      inset-x-0
      bottom-0
      mx-auto
      grid
      h-16
      max-w-screen-xl
      select-none
      grid-cols-3
      items-center
      bg-gray-800
    "
  >
    <div class="m-1 flex flex-col justify-start">
      <div class="truncate">{{ currentSong?.title ?? "Title" }}</div>
      <div class="truncate">{{ currentSong?.artist ?? "Artist" }}</div>
    </div>
    <div class="flex justify-center">
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
      <input
        min="0"
        :max="currentSongDuration"
        :value="currentSongPlaytime"
        class="flex-grow"
        type="range"
        @input="seekbar_seeking"
        @change="seekbar_change"
      />
      <span class="flex items-center">
        {{ currentSongPlaytime }} / {{ currentSongDuration }}
      </span>
    </div>
    <div class="flex justify-end">
      <span class="material-icons">{{
        currentVolume === 0
          ? "volume_off"
          : currentVolume >= 10
          ? currentVolume >= 50
            ? "volume_up"
            : "volume_down"
          : "volume_mute"
      }}</span>
      <input
        type="range"
        class="flex-grow"
        min="0"
        max="100"
        v-model="currentVolume"
        @input="volumeChanged"
      />
      <span class="material-icons">playlist_play</span>
    </div>
  </div>
</template>

<style scoped>
.material-icons {
  font-size: 2.5em;
}
</style>

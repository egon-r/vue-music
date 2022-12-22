<script>
import emitter, { HLSPlayerEvents } from "@/services/emitter";
import { MusicPlayerData } from "@/components/data/MusicPlayerData";
import { seconds_to_duration_str } from "../utils/utils";

export default {
  computed: {
    HLSPlayerEvents() {
      return HLSPlayerEvents;
    },
  },
  data() {
    return {
      playerData: MusicPlayerData,
      userIsSeeking: false,
      currentSeekValue: 0,
    };
  },
  methods: {
    seconds_to_duration_str,
    emitter() {
      return emitter;
    },
    volumeChanged(event) {
      this.playerData.currentVolume = event.target.value / 100.0;
    },
    seekbar_change(event) {
      this.userIsSeeking = false;
      emitter.emit(HLSPlayerEvents.seek_to_s, this.currentSeekValue);
    },
    seekbar_seeking(event) {
      this.userIsSeeking = true;
      this.currentSeekValue = event.target.value;
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
      <div class="truncate">{{ playerData.currentSong.title ?? "Title" }}</div>
      <div class="truncate">
        {{ playerData.currentSong.artist ?? "Artist" }}
      </div>
    </div>
    <div class="flex justify-center">
      <span class="material-icons">skip_previous</span>
      <span
        v-if="playerData.isPlaying"
        class="material-icons cursor-pointer"
        @click="playerData.isPlaying = false"
        >pause</span
      >
      <span
        v-else
        class="material-icons cursor-pointer"
        @click="playerData.isPlaying = true"
        >play_arrow</span
      >
      <span class="material-icons">skip_next</span>
      <input
        min="0"
        :max="playerData.currentSong.duration"
        :value="userIsSeeking ? currentSeekValue : playerData.currentSongPlaytime"
        class="flex-grow"
        type="range"
        @input="seekbar_seeking"
        @change="seekbar_change"
      />
      <span class="flex items-center">
        {{ seconds_to_duration_str(userIsSeeking ? currentSeekValue : playerData.currentSongPlaytime) }} /
        {{ seconds_to_duration_str(playerData.currentSong.duration) }}
      </span>
    </div>
    <div class="flex justify-end">
      <span class="material-icons">{{
        playerData.currentVolume === 0
          ? "volume_off"
          : playerData.currentVolume >= 0.1
          ? playerData.currentVolume >= 0.5
            ? "volume_up"
            : "volume_down"
          : "volume_mute"
      }}</span>
      <input
        type="range"
        class="flex-grow"
        min="0"
        max="100"
        :value="playerData.currentVolume * 100"
        @input="volumeChanged"
      />
      <span class="material-icons">playlist_play</span>
      <span class="material-icons">repeat</span>
      <span class="material-icons">repeat_one</span>
    </div>
  </div>
</template>

<style scoped>
.material-icons {
  font-size: 2.5em;
}
</style>

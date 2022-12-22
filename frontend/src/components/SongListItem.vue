<script>
import emitter, {
  MusicLibraryEvents,
} from "@/services/emitter";
import axios from "axios";
import { backend_base_url } from "@/main";
import { MusicPlayerData } from "@/components/data/MusicPlayerData";
import { seconds_to_duration_str } from "../utils/utils";

export default {
  props: {
    song: {
      required: true,
    },
  },
  data() {
    return {
      playerData: MusicPlayerData,
    };
  },
  methods: {
    seconds_to_duration_str,
    playSong(event, song) {
      this.playerData.currentSong = song;
    },
    deleteSong(song) {
      axios
        .get(backend_base_url + "/v1/library/delete", {
          params: {
            hash: song.sha1,
          },
        })
        .then(() => {
          emitter.emit(MusicLibraryEvents.modified);
        });
    },
  },
};
</script>

<template>
  <div class="flex">
    <div class="grid flex-auto grid-cols-3" @click="playSong($event, song)">
      <span class="truncate">
        {{ song.title }}
      </span>
      <span class="truncate">
        {{ song.artist }}
      </span>
      <span class="truncate">
        {{ song.album }}
      </span>
    </div>
    <div class="mx-4 flex flex-initial">
      <!--
      <div
        class="p-1 text-red-700 hover:bg-red-600 hover:text-white"
        @click="deleteSong(song)"
      >
        X
      </div>
      -->
      <div class="material-icons hover:bg-red-600 w-8">
        more_vertical
      </div>
      <div class="self-center opacity-60">
        {{ seconds_to_duration_str(song.duration) }}
      </div>
    </div>
  </div>
</template>

<style scoped></style>

<script>
import axios from "axios";
import emitter, {
  HLSPlayerEvents,
  MusicLibraryEvents,
} from "@/services/emitter";
import { backend_base_url } from "@/main";

export default {
  data() {
    return {
      songs: null,
    };
  },
  mounted() {
    this.fetchSongs();
    emitter.on(
      MusicLibraryEvents.modified,
      this.emitter_onLibraryModifiedEvent
    );
  },
  unmounted() {
    emitter.off(
      MusicLibraryEvents.modified,
      this.emitter_onLibraryModifiedEvent
    );
  },
  methods: {
    playSong(event, song) {
      emitter.emit(HLSPlayerEvents.play, song);
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
    fetchSongs() {
      axios.get(backend_base_url + "/v1/library").then((response) => {
        this.songs = response.data;
      });
    },
    emitter_onLibraryModifiedEvent() {
      this.fetchSongs();
    },
  },
};
</script>

<template>
  <div class="text-3xl">Music Library</div>
  <div
    class="m-1 flex cursor-pointer border-2 hover:border-amber-600"
    v-for="song in songs"
  >
    <div class="flex-auto" @click="playSong($event, song)">
      {{ song.title }}
    </div>
    <div
      class="flex-initial p-1 text-red-700 hover:bg-red-600 hover:text-white"
      @click="deleteSong(song)"
    >
      X
    </div>
  </div>
</template>

<script>
import axios from "axios";
import emitter, {
  HLSPlayerEvents,
  MusicLibraryEvents,
} from "@/services/emitter";
import { backend_base_url } from "@/main";
import SongListItem from "@/components/SongListItem.vue";

export default {
  components: { SongListItem },
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
    class="m-1 cursor-pointer border-2 hover:border-amber-600"
    v-for="song in songs"
  >
    <SongListItem :song="song"/>
  </div>
</template>

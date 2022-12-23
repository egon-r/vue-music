import { ref } from "vue"

export const MusicPlayerData = ref({
  currentSong: {},
  currentSongPlaytime: 0,
  isPlaying: false,
  currentVolume: 0.2
})

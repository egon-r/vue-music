import { ref } from "vue"

export enum LoopModes {
  None,
  LoopOne,
  LoopQueue
}

export type SongModel = {
  title: string,
  artist: string,
  album: string,
  year: number,
  duration: number,
  sha1: string,
}

export type MusicPlayerDataType = {
  currentSong: SongModel,
  currentSongPlaytime: number,
  isPlaying: boolean,
  currentVolume: number,
  loopMode: LoopModes,
  queue: Array<SongModel>,
  currentQueueIndex: number,
}

export const MusicPlayerData = ref<MusicPlayerDataType>({
  currentSong: undefined,
  currentSongPlaytime: 0,
  isPlaying: false,
  currentVolume: 0.2,
  loopMode: LoopModes.None,
  queue: [],
  currentQueueIndex: 0
})

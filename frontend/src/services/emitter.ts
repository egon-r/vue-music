import mitt from "mitt"
export default mitt()

export const MusicLibraryEvents = {
  modified: "modified"
}

export const HLSPlayerEvents = {
  next_song: "hls_skip_next",
  prev_song: "hls_skip_prev",
  seek_to_s: "hls_seek_to_s"
}

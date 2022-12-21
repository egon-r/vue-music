import mitt from "mitt";
export default mitt();

export const MusicLibraryEvents = {
  modified: "modified",
};

export const HLSPlayerEvents = {
  play: "hls_play",
  pause: "hls_pause",
  next_song: "hls_skip_next",
  prev_song: "hls_skip_prev",
  set_volume: "hls_set_volume",
  seek_to_s: "hls_seek_to_s",
  timeupdate: "hls_play_timeupdate",
  metadata_loaded: "hls_metadata_loaded",
};

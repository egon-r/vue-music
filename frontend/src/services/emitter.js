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
};

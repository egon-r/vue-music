import mitt from "mitt";
export default mitt();

export const MusicLibraryEvents = {
  modified: "modified",
};

export const HLSPlayerEvents = {
  play: "hls_play",
};

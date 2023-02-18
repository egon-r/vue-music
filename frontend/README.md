# vue-music-frontend

- Play HLS audio streams using `hls.js`
- Manage a music library

## Architecture

- One `<video>` element handles playback using `hls.js`

- Events requiring other components to update are distributed using an EventBus. All events are defined in `./src/services/emitter.js`. 

    Usage:
    ```
      mounted() {
        emitter.on(MusicLibraryEvents.modified, this.onLibraryModifiedEvent);
      },
      unmounted() {
        emitter.off(MusicLibraryEvents.modified, this.onLibraryModifiedEvent);
      },
    ```
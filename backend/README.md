# vue-music-backend

- Provide an API to manage a music library
- Transcode .mp3 to HLS streamable chunks using `ffmpeg`
- Serve .m3u8 playlists
- Keep track of songs using mongodb

## Development
```
docker compose up --build
```
- `src/` is mounted into the container
- `nodemon` watches for changes and restarts the application
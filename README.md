# BeamHarbor

## Project Overview

BeamHarbor is a full-stack demonstration of real-time video streaming built with three independent services:

> _This project was created as a school project while learning react._

- **API** (`api/`) – A JSON-Server instance exposing a fake REST API for stream metadata.
- **Streamer** (`streamer/`) – A Node-Media-Server that accepts RTMP ingest and serves HTTP-FLV playback.
- **Client** (`client/`) – A React/Redux single-page application that lets users publish and watch live streams.

## Run & Build Instructions

All major tasks are automated through the root-level `Makefile`.

### Install Dependencies
```
make install
```
Installs dependencies for API, Streamer, and Client.

### Start the Application
```
make start
```
Starts API, Streamer, and Client development servers concurrently.

### Build for Production
```
make build
```
Builds all services (client production bundle, placeholders for others).

### Run Tests
```
make test
```
Runs tests for each service (place-holders for now).

## How to Use

make sure all of your env files are correct

1. Visit the front-end at `http://localhost:3000`.
2. Sign in with Google using the button in the top-right (or browse anonymously).
3. Click **Create Stream** in the navigation bar and fill in a title and description.
4. Once created, your stream appears in the list – click it to open the stream detail page. As the owner you’ll see an ingest URL:
   ```
   rtmp://<server-url>/live/<stream-id>
   ```
5. Stream your video:
   - **FFmpeg** – From a terminal run:
      ```bash
      ffmpeg -re -i <input-file>.mp4 -c copy -f flv rtmp://<server-url>/live/<stream-id>
      ```
   - **OBS** – In OBS → Settings → **Stream** set:
      - Service: **Custom**
      - Server: `rtmp://<server-url>/live`
      - Stream Key: `<stream-id>`
      Then click *Start Streaming*.
6. Anyone can open the same detail page to watch the live stream in real-time.

## Further Setup

For detailed setup, configuration, and usage instructions for each component, refer to the README.md files in the `api/`, `client`, and `streamer/` directories.

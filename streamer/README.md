# BeamHarbor Streamer

Handles RTMP ingest and HTTP-FLV/HLS playback using [node-media-server](https://github.com/illuspas/node-media-server).

## Environment Setup

The streamer works out-of-the-box, but you can override ports via environment variables (Copy `.env.example` to `.env` and fill in your secrets):

```ini
RTMP_PORT=1935
HTTP_PORT=8000
```
If omitted, it defaults to the values above.

## Configuration

Server options are defined in `index.js`. Tune chunk size, cache, timeouts, or enable HLS as needed. See the [node-media-server config guide](https://github.com/illuspas/node-media-server#options) for details.

## Publish a Stream

Choose one of the following methods to send video to the streamer:

- **FFmpeg** – Quick CLI ingest:
  ```bash
  ffmpeg -re -i <input-file>.mp4 -c copy -f flv rtmp://<server-url>/live/<stream-key>
  ```
  Replace `<input-file>` with your video file and `<stream-key>` with any identifier (must match what the front-end expects).

- **OBS** – Graphical encoder:
  1. Open **OBS** → *Settings* → **Stream**.
  2. Set **Service** to **Custom**.
  3. **Server**: `rtmp://<server-url>/live`
  4. **Stream Key**: `<stream-key>`
  5. Click *Start Streaming*.

## Watch the Stream

There are several ways to view the stream:

- **VLC** – *Media → Open Network Stream* and enter:
  ```
  http://<server-url>:8000/live/<stream-key>.flv
  ```
- **ffplay** (part of FFmpeg) – quick CLI preview:
  ```bash
  ffplay http://<server-url>:8000/live/<stream-key>.flv
  ```

If you open the link directly in a browser, most will start downloading the file.

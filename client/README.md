# BeamHarbor Client

A React app that lets you create and watch live streams using the BeamHarbor stack.

## Environment Setup

Copy `.env.example` to `.env` and customise:

```
VITE_API_BASE_URL=http://localhost:3001
VITE_RTMP_SERVER_URL=rtmp://localhost:1935
VITE_STREAMER_BASE_URL=http://localhost:8000
VITE_GOOGLE_CLIENT_ID=<your-google-client-id>
```

- `VITE_API_BASE_URL` – Base URL of the REST API.
- `VITE_RTMP_SERVER_URL` – Base RTMP ingest URL shown to stream owners.
- `VITE_STREAMER_BASE_URL` – Base URL serving FLV streams.
- `VITE_GOOGLE_CLIENT_ID` – OAuth client ID (see next section).

## Google OAuth Setup

1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Create (or select) a project.
3. Navigate to **APIs & Services → OAuth consent screen**. Configure the screen (External, add app name, support email, etc.) and **add http://localhost:3000** to Authorised domains for local dev.
4. Under **APIs & Services → Credentials** click **Create credentials → OAuth client ID**.
   - Application type: **Web application**.
   - Name: `BeamHarbor Client` (or any).
   - **Authorised JavaScript origins**: `http://localhost:3000`
   - **Authorised redirect URIs**: `http://localhost:3000`
5. Navigate to **APIs & Services → OAuth consent screen → Edit app → Data Access** and ensure you have added **`profile`** and **`email`** to Data Access.
6. After creation copy the **Client ID** and add it to your `.env` file.

## Notes

- Uses [flv.js](https://github.com/bilibili/flv.js) for low-latency playback.
- Streams are listed from the REST API and embedded via the FLV URL pattern: `http://<FLV_SERVER>/live/<stream-key>.flv`.

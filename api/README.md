# BeamHarbor API

A lightweight Node/Express REST API that stores stream metadata in a local JSON file via **lowdb**. Ideal for demos—no external database required.

## Environment Setup

Copy `.env.example` to `.env` and fill in your settings:

```
PORT=3001
CORS_ORIGIN=http://localhost:3000
```

> Make sure `CORS_ORIGIN` matches the URL where your React client runs.

The server watches `db.json`, so editing that file hot-reloads data.

## Endpoints

With the default `db.json`, these endpoints are available:

- `GET /streams` – list all streams
- `GET /streams/:id` – fetch single stream
- `POST /streams` – create stream
- `PUT /streams/:id` – update stream
- `DELETE /streams/:id` – delete stream

See the [lowdb docs](https://github.com/typicode/lowdb) for advanced usage and adapters.

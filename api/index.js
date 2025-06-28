import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import path from 'node:path';

const PORT = process.env.PORT || 3001;
const allowedOrigin = process.env.CORS_ORIGIN;

const dbFile = path.join(process.cwd(), 'db.json');
const adapter = new JSONFile(dbFile);
const db = new Low(adapter, { streams: [] });

await db.read();
if (!db.data) db.data = { streams: [] };
if (!Array.isArray(db.data.streams)) db.data.streams = [];
await db.write();

const app = express();
app.use(cors({ origin: allowedOrigin }));
app.use(express.json());

app.get('/streams', async (_req, res) => {
  await db.read();
  res.json(db.data.streams);
});

app.get('/streams/:id', async (req, res) => {
  await db.read();
  const id = Number(req.params.id);
  const stream = db.data.streams.find(s => s.id === id);
  stream ? res.json(stream) : res.status(404).json({ message: 'Stream not found' });
});

app.post('/streams', async (req, res) => {
  const { title, description, userId } = req.body;
  if (!title || !description || !userId) {
    return res.status(400).json({ message: 'title, description and userId required' });
  }
  await db.read();
  const lastStream = db.data.streams.length ? db.data.streams[db.data.streams.length - 1] : null;
  const lastId = lastStream ? lastStream.id : 0;
  const newStream = { id: lastId + 1, title, description, userId };
  db.data.streams.push(newStream);
  await db.write();
  res.status(201).json(newStream);
});

app.put('/streams/:id', async (req, res) => {
  const id = Number(req.params.id);
  const { title, description } = req.body;
  await db.read();
  const stream = db.data.streams.find(s => s.id === id);
  if (!stream) return res.status(404).json({ message: 'Stream not found' });
  if (title) stream.title = title;
  if (description) stream.description = description;
  await db.write();
  res.json(stream);
});

app.delete('/streams/:id', async (req, res) => {
  const id = Number(req.params.id);
  await db.read();
  const exists = db.data.streams.some(s => s.id === id);
  if (!exists) return res.status(404).json({ message: 'Stream not found' });
  db.data.streams = db.data.streams.filter(s => s.id !== id);
  await db.write();
  res.sendStatus(204);
});

app.listen(PORT, () => {
  console.log(`API listening on port ${PORT}`);
});

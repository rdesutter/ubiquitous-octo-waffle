import express from 'express';
import routes from './routes/index.js';

const app = express();
const port = Number(process.env.PORT) || 8000;

app.use(express.json());
app.use('/api', routes);

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok' });
});

app.listen(port, '0.0.0.0', () => {
  const codespaceName = process.env.CODESPACE_NAME;
  const baseUrl = codespaceName
    ? `https://${codespaceName}-${port}.app.github.dev`
    : `http://localhost:${port}`;

  console.log(`OctoFit Tracker API listening at ${baseUrl}`);
});
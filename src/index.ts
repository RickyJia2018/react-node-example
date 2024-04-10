import express, { Request, Response } from 'express';

const app = express();
const port = 3001;

app.get('/', (_req: Request, res: Response) => {
  res.send('Good luck!');
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening on port ${port}.`);
});

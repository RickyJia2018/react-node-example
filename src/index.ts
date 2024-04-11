import express, { Request , Response, NextFunction} from 'express';
import rootRouter from './routes';

const app = express();
const port = process.env.SERVER_PORT || 3001;

app.all('*', (req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-type");
  res.header("Access-Control-Allow-Methods", "GET");
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});
app.use(express.json());
app.use(rootRouter);


app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening on port ${port}.`);
});





import express from 'express';
import { router } from './routes/index';
import morgan from 'morgan';

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use(router);

app.listen(PORT, () => {
    console.log(`Server is running in http://localhost:${PORT}`);
});

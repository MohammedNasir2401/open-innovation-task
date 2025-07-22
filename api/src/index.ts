import express, { Request, Response } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRoutes from './routes/api.routes';
dotenv.config();

const app = express();
const port = process.env.PORT || 3010;

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use('/api', apiRoutes);


app.listen(port, () => {
    console.log(`Server is running on PORT ${port}`);
});

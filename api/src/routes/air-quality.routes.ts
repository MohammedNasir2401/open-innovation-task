import { Router } from 'express';
import { importAirQualityData } from '../controllers/air-quality.controller';

const airQualityRouter = Router();
airQualityRouter.get('/import', importAirQualityData);
export default airQualityRouter;
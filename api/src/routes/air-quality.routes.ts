import { Router } from 'express';
import { importAirQualityData, index } from '../controllers/air-quality.controller';

const airQualityRouter = Router();
airQualityRouter.get('/', index);
airQualityRouter.get('/import', importAirQualityData);
export default airQualityRouter;
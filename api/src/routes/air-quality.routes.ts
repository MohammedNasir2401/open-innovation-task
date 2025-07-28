import { Router } from 'express';
import { importAirQualityData, getTimeSeriesData, getKPIs, getDailyClimateData } from '../controllers/air-quality.controller';

const airQualityRouter = Router();
airQualityRouter.get('/import', importAirQualityData);
airQualityRouter.get('/time-series', getTimeSeriesData);
airQualityRouter.get('/daily-climate', getDailyClimateData);
airQualityRouter.get('/kpis', getKPIs);
export default airQualityRouter;
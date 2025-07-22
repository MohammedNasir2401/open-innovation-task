import { Router } from 'express';
import { readCSVData } from '../controllers/api.controller';

const router = Router();
router.get('/read-csv-data', readCSVData);
export default router;
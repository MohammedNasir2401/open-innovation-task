import { Request, Response } from 'express';
import { readCSVData, insertDataToDB, fetchRecords, fetchKPIData, fetchAvgTempHumidity } from '../services/air-quality.service';
import { fetchByMetricValidator, } from '../validators/metric.validator';
import { dateValidator } from '../validators/date-range.validator';

export async function getTimeSeriesData(req: Request, res: Response) {
    const parsedRequest = fetchByMetricValidator.safeParse(req.query);
    if (!parsedRequest.success) {
        return res.status(400).json({
            message: "Validation failed",
            errors: parsedRequest.error.issues,
        });
    }
    const data = await fetchRecords(parsedRequest.data.metric, parsedRequest.data.startDate, parsedRequest.data.endDate);
    return res.json(data);
}

export async function getKPIs(req: Request, res: Response) {
    const parsedRequest = dateValidator.safeParse(req.query);
    if (!parsedRequest.success) {
        return res.status(400).json({
            message: "Validation failed",
            errors: parsedRequest.error.issues,
        });
    }
    const data = await fetchKPIData(new Date(parsedRequest.data.startDate), new Date(parsedRequest.data.endDate));
    return res.json(data);
}

export async function getDailyClimateData(req: Request, res: Response) {
    const parsedRequest = dateValidator.safeParse(req.query);
    if (!parsedRequest.success) {
        return res.status(400).json({
            message: "Validation failed",
            errors: parsedRequest.error.issues,
        });
    }
    const data = await fetchAvgTempHumidity(new Date(parsedRequest.data.startDate), new Date(parsedRequest.data.endDate));
    return res.json(data);
}


export async function importAirQualityData(req: Request, res: Response) {
    const data = await readCSVData();
    const prismaData = await insertDataToDB(data);
    return res.json(prismaData);
}
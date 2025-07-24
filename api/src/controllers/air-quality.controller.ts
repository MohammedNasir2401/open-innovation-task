import { Request, Response } from 'express';
import { readCSVData, insertDataToDB } from '../services/air-quality.service';
import * as fs from "fs";
import * as path from "path";
import { parse } from 'csv-parse';

export async function importAirQualityData(req: Request, res: Response) {
    const data = await readCSVData();
    const prismaData = await insertDataToDB(data);
    return res.json(prismaData);
}
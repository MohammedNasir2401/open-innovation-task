import { Request, Response } from 'express';
import * as fs from "fs";
import * as path from "path";
import { parse } from 'csv-parse';

const readCSVData = (req: Request, res: Response) => {
    const filePath = path.resolve(__dirname, '../../data/AirQualityUCI.csv');
    const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' });
    parse(fileContent, {
        delimiter: ';',
        columns: true,
        skip_empty_lines: true,
    }, (error, result) => {
        if (error) {
            return res.status(500).json({ error: error });
        }
        return res.json(result);
    });
};

export { readCSVData };
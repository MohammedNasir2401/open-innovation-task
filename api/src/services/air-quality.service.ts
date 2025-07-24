import * as fs from "fs";
import * as path from "path";
import { parse } from 'csv-parse/sync';
import { AirQualityRecord } from '../interfaces/air-quality-record';
import prisma from '../../prisma/client';

export async function readCSVData() {
    const filePath = path.resolve(process.cwd(), 'src/data/AirQualityUCI.csv');
    const fileContent = await fs.promises.readFile(filePath, { encoding: 'utf-8' });
    const result = parse(fileContent, {
        delimiter: ';',
        columns: true,
        skip_empty_lines: true,
    });
    return filterData(result);

}

export async function insertDataToDB(data: any[]) {
    await prisma.airQualityRecord.deleteMany({});
    const result = await prisma.airQualityRecord.createMany({ data });
    return result;
}


function filterData(data: any[]): AirQualityRecord[] {
    const filteredData = data.filter((row: any) => {
        return row['Date'] != ''
    }).map(record => {
        const time = record['Time'].replace(/\./g, ':');
        const [day, month, year] = record['Date'].split('/');
        record['Time'] = new Date(`${year}-${month}-${day}T${time}`);
        record['Date'] = new Date(`${year}-${month}-${day}`).toISOString().split('T')[0];
        delete record[""];
        return {
            date: new Date(record.Date),
            time: new Date(record.Time),
            co_gt: parseFloat(record["CO(GT)"]),
            pt08_s1_co: parseInt(record["PT08.S1(CO)"]),
            nmhc_gt: parseInt(record["NMHC(GT)"]),
            c6h6_gt: parseFloat(record["C6H6(GT)"]),
            pt08_s2_nmhc: parseInt(record["PT08.S2(NMHC)"]),
            nox_gt: parseInt(record["NOx(GT)"]),
            pt08_s3_nox: parseInt(record["PT08.S3(NOx)"]),
            no2_gt: parseInt(record["NO2(GT)"]),
            pt08_s4_no2: parseInt(record["PT08.S4(NO2)"]),
            pt08_s5_o3: parseInt(record["PT08.S5(O3)"]),
            t: parseFloat(record["T"]),
            rh: parseFloat(record["RH"]),
            ah: parseFloat(record["AH"]),
        };
    });
    return filteredData;
};
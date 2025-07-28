import * as fs from "fs";
import * as path from "path";
import { parse } from 'csv-parse/sync';
import { AirQualityRecord } from '../interfaces/air-quality-record';
import prisma from '../../prisma/client';


export async function fetchRecords(metric: string, startDate?: string, endDate?: string) {
    const whereClause: any = {};
    if (startDate && endDate) {
        const startTime = new Date(startDate);
        const endTime = new Date(endDate);
        endTime.setHours(23, 59, 59);
        whereClause.time = {
            gte: startTime,
            lte: endTime
        };
    }
    let selectClause: any = {
        date: true,
        time: true,
        [metric]: true,
    };
    const records = await prisma.airQualityRecord.findMany({
        where: whereClause,
        select: selectClause,
        orderBy: {
            time: 'asc',
        },
    });
    return records.map((record: any) => ({
        ...record,
        value: record[metric],
    }));

}

export async function fetchKPIData(startDate: Date, endDate: Date) {
    const records = await prisma.airQualityRecord.aggregate({
        _max: {
            temperature: true,
            relative_humidity: true,
            co_gt: true,
            c6h6_gt: true,
        },
        _min: {
            temperature: true,
            relative_humidity: true,
        },
        where: {
            date: {
                gte: new Date(startDate),
                lte: new Date(endDate),
            },
        },
    });
    return {
        minTemp: records._min.temperature,
        maxTemp: records._max.temperature,
        minHumidityPercentage: records._min.relative_humidity,
        maxHumidityPercentage: records._max.relative_humidity,
        maxCO: records._max.co_gt,
        maxBenzene: records._max.c6h6_gt,
    };

}

export async function fetchAvgTempHumidity(startDate: Date, endDate: Date) {
    const rawQuery = `SELECT DATE("time") AS date,AVG("temperature") AS "avgTemperature",AVG("relative_humidity") AS "avgHumidity" FROM "AirQualityRecord" WHERE "time" BETWEEN $1 AND $2 GROUP BY DATE("time") ORDER BY DATE("time") ASC`
    const result = await prisma.$queryRawUnsafe<
        { date: string; avgTemperature: number; avgHumidity: number }[]
    >(rawQuery, startDate, endDate);
    return result.map((record) => ({
        ...record,
        avgTemperature: Number(record.avgTemperature?.toFixed(2)),
        avgHumidity: Number(record.avgHumidity?.toFixed(2)),
    }));
}

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
            co_gt: replaceMissingValue(parseFloat(record["CO(GT)"])),
            pt08_s1_co: replaceMissingValue(parseInt(record["PT08.S1(CO)"])),
            nmhc_gt: replaceMissingValue(parseInt(record["NMHC(GT)"])),
            c6h6_gt: replaceMissingValue(parseFloat(record["C6H6(GT)"])),
            pt08_s2_nmhc: replaceMissingValue(parseInt(record["PT08.S2(NMHC)"])),
            nox_gt: replaceMissingValue(parseInt(record["NOx(GT)"])),
            pt08_s3_nox: replaceMissingValue(parseInt(record["PT08.S3(NOx)"])),
            no2_gt: replaceMissingValue(parseInt(record["NO2(GT)"])),
            pt08_s4_no2: replaceMissingValue(parseInt(record["PT08.S4(NO2)"])),
            pt08_s5_o3: replaceMissingValue(parseInt(record["PT08.S5(O3)"])),
            temperature: replaceMissingValue(parseFloat(record["T"])),
            relative_humidity: replaceMissingValue(parseFloat(record["RH"])),
            absolute_humidity: replaceMissingValue(parseFloat(record["AH"])),
        };
    });
    return filteredData;
};

function replaceMissingValue(value: number): number | undefined {
    return value === -200 ? undefined : value;
}

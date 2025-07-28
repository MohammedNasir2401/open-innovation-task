import { insertDataToDB, readCSVData } from "../services/air-quality.service";

(async function () {
    const data = await readCSVData();
    await insertDataToDB(data);
    console.log("Data Imported & Inserted into DB!");
})();
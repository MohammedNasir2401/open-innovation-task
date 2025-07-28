export interface AirQualityRecord {
    date: Date;
    time: Date;
    co_gt?: number;
    pt08_s1_co?: number;
    nmhc_gt?: number;
    c6h6_gt?: number;
    pt08_s2_nmhc?: number;
    nox_gt?: number;
    pt08_s3_nox?: number;
    no2_gt?: number;
    pt08_s4_no2?: number;
    pt08_s5_o3?: number;
    temperature?: number;
    relative_humidity?: number;
    absolute_humidity?: number;
}

import { z } from 'zod';


export const allowedParams = [
    "co_gt",
    "pt08_s1_co",
    "nmhc_gt",
    "c6h6_gt",
    "pt08_s2_nmhc",
    "nox_gt",
    "pt08_s3_nox",
    "no2_gt",
    "pt08_s4_no2",
    "pt08_s5_o3",
    "t",
    "rh",
    "ah",
];
const dateFormatRegex = /^\d{4}-\d{2}-\d{2}$/;
const dateFormatMessage = "Invalid date format, expected yyyy-mm-dd";

export const fetchByMetricValidator = z.object({
    metric: z.enum(allowedParams),
    startDate: z.string().regex(dateFormatRegex, { message: dateFormatMessage }).optional(),
    endDate: z.string().regex(dateFormatRegex, { message: dateFormatMessage }).optional(),
});
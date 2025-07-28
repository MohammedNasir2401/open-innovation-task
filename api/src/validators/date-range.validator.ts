import { z } from 'zod';

const dateFormatRegex = /^\d{4}-\d{2}-\d{2}$/;
const dateFormatMessage = "Invalid date format, expected yyyy-mm-dd";
export const dateValidator = z.object({
    startDate: z.string().regex(dateFormatRegex, { message: dateFormatMessage }),
    endDate: z.string().regex(dateFormatRegex, { message: dateFormatMessage })
});

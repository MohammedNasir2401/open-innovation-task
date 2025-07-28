
import { DateRangePicker } from '@/components/ui/date-range';
import type { DateRange } from '@/interfaces/date-range';
import { TimeSeriesChart } from '@/components/dashboard/time-series-chart';
import { useState } from "react";
import { KpiSection } from "@/components/dashboard/kpi-section";
import { DailyClimateTable } from "@/components/dashboard/daily-climate-table";

const Dashboard = () => {

    const [dateRange, setDateRange] = useState<DateRange>({
        startDate: new Date(2004, 2, 1),
        endDate: new Date(2005, 1, 28, 23, 59, 59),
    });


    return (
        <div className='container mx-auto px-4 my-6'>
            <div className="flex flex-col md:flex-row items-start justify-between mb-4">
                <div className='text-2xl font-bold mb-2'> Air Quality Dashboard</div>
                <DateRangePicker defaultRange={dateRange} onDateChange={(range) =>
                    setDateRange((prev) => ({ ...prev, ...range }))
                } min={new Date(2004, 2, 1)} max={new Date(2005, 1, 28)} />
            </div>
            <KpiSection dateRange={dateRange} />
            <TimeSeriesChart dateRange={dateRange} />
            <DailyClimateTable dateRange={dateRange} />
        </div>
    )
}

export default Dashboard
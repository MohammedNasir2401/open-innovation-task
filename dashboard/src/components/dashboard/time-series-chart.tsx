import { Card, Spinner } from "flowbite-react";
import CustomSelect from "@/components/ui/select";
import { useEffect, useState } from "react";
import { LineChart } from "@/components/ui/line-chart";
import { airQualityOptions } from "@/lib/consts";
import type { DateRange } from "@/interfaces/date-range";
import { apiRequest } from "@/lib/api";
import { format, parseISO } from "date-fns";
import type { TimeSeriesRecord } from "@/interfaces/time-series";
import { FiBarChart, } from 'react-icons/fi';

interface TimeSeriesProps {
    dateRange: DateRange
}

export function TimeSeriesChart(props: TimeSeriesProps) {
    const [selectedMetric, setSelectedMetric] = useState('co_gt');
    const [timeSeriesData, setTimeSeriesData] = useState<TimeSeriesRecord[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        fetchTimeSeriesData();
    }, [props.dateRange, selectedMetric]);

    const fetchTimeSeriesData = async () => {
        setLoading(true);
        const response = await apiRequest(`air-quality/time-series`, 'GET', {
            metric: selectedMetric,
            startDate: format(props.dateRange.startDate!, 'yyyy-MM-dd').toString(),
            endDate: format(props.dateRange.endDate!, 'yyyy-MM-dd'),
        });
        if (response.success) {
            setLoading(false);
            setTimeSeriesData(response.data as TimeSeriesRecord[]);
        }
    }




    return (

        <Card className="p-0 mb-4"  >
            <div className="flex justify-between items-center p-4 border-b">
                <h5 className="text-md font-medium text-gray-900 dark:text-white">
                    Air Quality Trends
                </h5>
                <div className='w-[150px]  md:w-[200px]'>

                    <CustomSelect
                        options={airQualityOptions}
                        value={selectedMetric}
                        onChange={(value) => { console.log(value); setSelectedMetric(value) }}
                    />
                </div>
            </div>
            {

                loading ?
                    <div className="text-center h-[300px] flex flex-col items-center justify-center">
                        <Spinner aria-label="Center-aligned spinner example" />
                    </div> :
                    timeSeriesData.length === 0 ?
                        <div className="flex flex-col items-center justify-center my-8">
                            <FiBarChart size={36} />
                            <h5 className="text-sm font-medium text-gray-900 dark:text-white flex justify-center items-center">
                                No data available
                            </h5>
                        </div>
                        :
                        <LineChart
                            metric={selectedMetric}
                            seriesData={timeSeriesData.map(record => record.value)}
                            xAxisData={timeSeriesData.map(record => format(parseISO(record.time), 'MMM d yyyy, ha')

                            )}
                        />}
        </Card>
    );

}
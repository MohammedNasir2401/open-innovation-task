import { useEffect, useState } from "react";
import {
    Card,
    Pagination,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeadCell,
    TableRow,
} from "flowbite-react";
import type { DateRange } from "@/interfaces/date-range";
import { apiRequest } from "@/lib/api";
import { format } from "date-fns";
import type { ClimateData } from "@/interfaces/climate-data";

interface DailyClimateTableProps {
    dateRange: DateRange
}

export function DailyClimateTable(props: DailyClimateTableProps) {
    const [loading, setLoading] = useState<boolean>(true);
    const [climateData, setClimateData] = useState<ClimateData[]>([]);
    useEffect(() => {
        fetchDailyClimateData();
    }, [props.dateRange])
    const fetchDailyClimateData = async () => {
        setLoading(true);
        const response = await apiRequest(`air-quality/daily-climate`, 'GET', {
            startDate: format(props.dateRange.startDate!, 'yyyy-MM-dd').toString(),
            endDate: format(props.dateRange.endDate!, 'yyyy-MM-dd'),
        });
        const responseData = response.data as ClimateData[];
        setLoading(false);
        if (response.success) {
            setClimateData(responseData.filter(row => row.avgTemperature != null && row.avgHumidity != null))
        }
    }
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;
    const totalPages = climateData.length > 0 ? Math.ceil(climateData.length / itemsPerPage) : 10;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentData = climateData.slice(startIndex, startIndex + itemsPerPage);

    return (

        <Card className="p-0">
            <div className="flex justify-between items-center p-4 border-b">
                <h5 className="text-md font-medium text-gray-900 dark:text-white">
                    Daily Climate Summary
                </h5>
            </div>
            <div className="min-h-[300px]">
                <Table className="h-full">
                    <TableHead>
                        <TableRow>
                            <TableHeadCell>Date</TableHeadCell>
                            <TableHeadCell>Avg Temp (°C)</TableHeadCell>
                            <TableHeadCell>Avg Humidity (%)</TableHeadCell>
                        </TableRow>
                    </TableHead>
                    <TableBody className="divide-y">
                        {loading
                            ? Array.from({ length: itemsPerPage }).map((_, i) => (
                                <TableRow key={i}>
                                    <TableCell>
                                        <div className="w-24 h-4 bg-gray-200 rounded-md animate-pulse" />
                                    </TableCell>
                                    <TableCell>
                                        <div className="w-20 h-4 bg-gray-200 rounded-md animate-pulse" />
                                    </TableCell>
                                    <TableCell>
                                        <div className="w-20 h-4 bg-gray-200 rounded-md animate-pulse" />
                                    </TableCell>
                                </TableRow>
                            ))
                            : currentData.map((row, idx) => (
                                <TableRow key={idx}>
                                    <TableCell>{format(new Date(row.date), 'MMM d yyyy')}</TableCell>
                                    <TableCell>
                                        {row.avgTemperature != null ? `${row.avgTemperature}°C` : '-'}
                                    </TableCell>
                                    <TableCell>
                                        {row.avgHumidity != null ? `${row.avgHumidity}%` : '-'}
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>

                </Table>
            </div>
            {
                !loading &&
                (
                    <div className="flex justify-end p-4">
                        <div className="sm:hidden">
                            <Pagination

                                layout="navigation"
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={(page) => setCurrentPage(page)}
                            />
                        </div>
                        <div className="hidden sm:block">

                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={(page) => setCurrentPage(page)}
                            />
                        </div>
                    </div>
                )
            }

        </Card>
    );
}

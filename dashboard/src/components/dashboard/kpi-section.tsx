import { FaBoltLightning, FaDroplet, FaTemperatureEmpty, FaTemperatureFull, FaWind } from "react-icons/fa6";
import { KpiCard } from "@/components/ui/kpi-card";
import type { DateRange } from "@/interfaces/date-range";
import { useEffect, useState } from "react";
import { apiRequest } from "@/lib/api";
import { format } from "date-fns";
import type { KPIData } from "@/interfaces/kpi-data";
import { Card } from "flowbite-react";


interface KpiSectionProps {
    dateRange: DateRange
}


export function KpiSection(props: KpiSectionProps) {

    const [loading, setLoading] = useState<boolean>(true);
    const [kpiData, setKpiData] = useState<KPIData>();


    useEffect(() => {
        fetchKpisData();
    }, [props.dateRange]);


    const fetchKpisData = async () => {
        setLoading(true);
        const response = await apiRequest(`air-quality/kpis`, 'GET', {
            startDate: format(props.dateRange.startDate!, 'yyyy-MM-dd').toString(),
            endDate: format(props.dateRange.endDate!, 'yyyy-MM-dd'),
        });
        const responseData = response.data as KPIData;
        setLoading(false);
        if (response.success) {
            setKpiData({ ...responseData })
        }
    }


    return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
            {loading ?
                [...Array.from({ length: 6 })].map((_, i) => (
                    <Card key={i} className="mb-4">
                        <div className="w-full h-4 rounded-md bg-gradient-to-r from-gray-50 via-gray-100 to-gray-50 animate-shimmer mb-2" />
                        <div className="w-full h-12 rounded-md bg-gradient-to-r from-gray-50 via-gray-100 to-gray-50 animate-shimmer" />
                    </Card>
                ))
                :
                <>
                    <KpiCard
                        title='Lowest Temperature'
                        value={`${kpiData!.minTemp}°C`}
                        icon={<FaTemperatureEmpty className="text-blue-500" />}
                    />
                    <KpiCard
                        title='Highest Temperature'
                        value={`${kpiData!.maxTemp}°C`}
                        icon={<FaTemperatureFull className="text-red-500" />}
                    />
                    <KpiCard
                        title='Max Carbon Monoxide Level'
                        value={`${kpiData!.maxCO}mg/m³`}
                        icon={<FaWind className="text-orange-600" />}
                    />
                    <KpiCard
                        title='Lowest Humidity'
                        value={`${kpiData!.minHumidityPercentage}%`}
                        icon={<FaDroplet className="text-yellow-400" />}
                    />
                    <KpiCard
                        title='Highest Humidity'
                        value={`${kpiData!.maxHumidityPercentage}%`}
                        icon={<FaDroplet className="text-blue-500" />}
                    />

                    <KpiCard
                        title='Max Benzene Level'
                        value={`${kpiData!.maxBenzene}μg /m³`}
                        icon={<FaBoltLightning className="text-purple-600" />}
                    /></>
            }
        </div>
    );
}
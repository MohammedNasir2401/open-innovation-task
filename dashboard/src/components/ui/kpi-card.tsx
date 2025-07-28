import { Card } from "flowbite-react";

interface KpiCardProps {
    title: string;
    subtitle?: string;
    value: string | number;
    icon: React.ReactNode;
}


export function KpiCard(props: KpiCardProps) {

    return (
        <Card  >
            <div className="flex items-start justify-between">
                <h5 className="text-sm font-medium text-gray-900 dark:text-white">
                    {props.title}
                </h5>
                <div className="w-5 h-5">
                    {props.icon}
                </div>
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {props.value}
            </div>
        </Card>
    )
}
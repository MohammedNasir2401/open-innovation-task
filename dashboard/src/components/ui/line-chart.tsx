import { unitMap } from '@/lib/consts';
import ReactECharts from 'echarts-for-react';

interface LineChartProps {
    xAxisData: string[];
    seriesData: number[];
    metric: string;
}

export function LineChart(props: LineChartProps) {
    const options = {
        tooltip: {
            trigger: 'item',
            formatter: (params: { name: string; value: number }) =>
                `${params.name}: ${params.value} ${unitMap[props.metric as keyof typeof unitMap] ?? ''}`,
        },
        xAxis: {
            type: 'category',
            data: props.xAxisData
        },
        yAxis: {
            type: 'value'
        }, dataZoom: [
            {
                type: 'slider',
                start: 0,
                end: 100,
            },
            {
                type: 'inside',
                start: 0,
                end: 100,
            },
        ],
        series: [
            {
                data: props.seriesData,
                type: 'line',
                smooth: true
            }
        ]
    };
    return (<ReactECharts option={options} />);
}
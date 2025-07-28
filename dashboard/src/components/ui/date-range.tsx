import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { CalendarIcon } from "lucide-react"
import { useState } from "react"
import type { DateRange } from "@/interfaces/date-range"


interface DateRangePickerProps {
    onDateChange?: (dateRange: DateRange) => void;
    defaultRange?: DateRange;
    min?: Date;
    max?: Date;
}

export function DateRangePicker(props: DateRangePickerProps) {
    const [date, setDate] = useState<DateRange>({
        startDate: props.defaultRange?.startDate ?? undefined,
        endDate: props.defaultRange?.endDate ?? undefined,
    })
    const [open, setOpen] = useState(false)


    const formattedRange = date.startDate && date.endDate
        ? `${format(date.startDate, "LLL dd, y")} - ${format(date.endDate, "LLL dd, y")}`
        : "Pick a date range"

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    id="date-range"
                    variant="outline"
                    className={`w-full md:w-[300px] justify-start text-left font-normal ${!date.startDate ? "text-muted-foreground" : ""}`}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formattedRange}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar
                    hidden={
                        props.min && props.max
                            ? { before: props.min, after: props.max }
                            : undefined
                    }
                    defaultMonth={props.min ?? new Date()}
                    required={false}
                    mode="range"
                    selected={{ from: date.startDate, to: date.endDate }}
                    onSelect={(range) => setDate({
                        startDate: range?.from ?? undefined,
                        endDate: range?.to ?? undefined
                    })}
                    numberOfMonths={2}

                />
                <div className="p-3 border-t flex gap-2 justify-end">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                            setDate({ startDate: undefined, endDate: undefined })
                            if (props.onDateChange) {
                                props.onDateChange({ startDate: undefined, endDate: undefined })
                            }
                            setOpen(false)

                        }}
                    >
                        Clear
                    </Button>
                    <Button
                        size="sm"
                        onClick={() => {
                            if (props.onDateChange) {
                                props.onDateChange(date)
                                setOpen(false)

                            }
                        }}
                    >
                        Apply
                    </Button>
                </div>
            </PopoverContent>
        </Popover >
    )
}
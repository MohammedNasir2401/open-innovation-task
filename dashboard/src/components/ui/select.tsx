
import { Label, Select } from "flowbite-react";
import type { Option } from "../../interfaces/option";

interface SelectProps {
    label?: string;
    options: Option[];
    value: string;
    onChange: (value: string) => void;

}
export default function CustomSelect(props: SelectProps) {
    return (
        <div className="">
            {props.label &&
                <div className="mb-2 block">
                    <Label>{props.label}</Label>
                </div>
            }

            <Select onChange={(e) => props.onChange(e.target.value)} value={props.value} >
                {props.options.map((option) => (
                    <option
                        key={option.value}
                        value={option.value}
                    >   {option.label}</option>
                ))}

            </Select>
        </div>
    );
}

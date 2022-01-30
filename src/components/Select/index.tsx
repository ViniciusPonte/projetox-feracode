import { Picker } from "@react-native-picker/picker";
import { useFilter } from "../../context/filter";
import { PickerRN } from "./styles";

interface Option {
    value: number,
    label: string,
}

interface SelectProps {
    options: Array<Option>;
    onChange: (value: string) => void;
    value: string,
}

export const Select = (props: SelectProps) => {9
    return (
        <PickerRN selectedValue={props.value} onValueChange={(itemValue: string) => props.onChange(itemValue)}>
            {props.options.map((option, index) => (
                <Picker.Item key={index} label={option.label} value={option.value}/>
            ))}
        </PickerRN>
    )
}
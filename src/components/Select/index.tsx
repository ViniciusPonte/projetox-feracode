import { Picker } from "@react-native-picker/picker";
import { useFilter } from "../../context/filter";
import { PickerRN } from "./styles";

interface SelectPropsSeasons {
    options: Array<number>;
    onChange: (value: string) => void;
    value: string,
    ph: string
}

export const SelectSeasons = (props: SelectPropsSeasons) => {9
    return (
        <PickerRN selectedValue={props.value} onValueChange={(itemValue: string) => props.onChange(itemValue)} >
            <Picker.Item label={props.ph} enabled={false}  />
            {props.options.map((option, index) => (
                <Picker.Item key={index} label={String(option)} value={option} />
            ))}
        </PickerRN>
    )
}

interface Leagues {
    id: number,
    logo: string,
    name: string,
    type: string,
}

interface SelectPropsLeagues {
    options: Array<Leagues>;
    onChange: (value: string) => void;
    value: string,
    ph: string
}

export const SelectLeagues = (props: SelectPropsLeagues) => {9
    return (
        <PickerRN selectedValue={props.value} onValueChange={(itemValue: string) => props.onChange(itemValue)} style={{fontFamily: 'Poppins_400Regular'}}>
            <Picker.Item label={props.ph} enabled={false}  style={{fontFamily: 'Poppins_400Regular'}}/>
            {props.options.map((option, index) => (
                <Picker.Item key={index} label={option.name} value={option.id} style={{fontFamily: 'Poppins_400Regular'}}/>
            ))}
        </PickerRN>
    )
}
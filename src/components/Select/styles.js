import styled from 'styled-components/native';
import { Picker } from '@react-native-picker/picker'
import { colors } from '../../assets/styles';

export const PickerRN = styled(Picker)`
    width: 100%;
    color: black;
    background-color: ${colors.background};
    margin-bottom: 10px;
    border-bottom-width: 1px;
    border-color: black;
    border-style: solid;
`;
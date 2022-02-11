import { NavigationContainer } from '@react-navigation/native'
import FilterProvider from './src/context/filter';
import { useFonts, Poppins_400Regular, Poppins_300Light, Poppins_600SemiBold, Poppins_800ExtraBold} from '@expo-google-fonts/poppins';
import { Routes } from './src/routes';
import { View } from 'react-native';

export default function App() {
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_300Light,
    Poppins_600SemiBold,
    Poppins_800ExtraBold
  });

  if(!fontsLoaded){
      return <View></View>;
  }

  return (
    <NavigationContainer>
      <FilterProvider>
        <Routes />
      </FilterProvider>
    </NavigationContainer>
  );
}


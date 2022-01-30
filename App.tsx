import { NavigationContainer } from '@react-navigation/native'
import FilterProvider from './src/context/filter';
import { Routes } from './src/routes';

export default function App() {
  return (
    <NavigationContainer>
      <FilterProvider>
        <Routes />
      </FilterProvider>
    </NavigationContainer>
  );
}


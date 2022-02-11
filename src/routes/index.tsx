import { createStackNavigator } from '@react-navigation/stack';
import { colors } from '../assets/styles';
import { Detail } from '../pages/Detail';
import { Home } from '../pages/Home';

export type RootStackParamList = {
    Home: undefined;
    Detalhes: { team: number, league: number };
  };

const Router =  createStackNavigator<RootStackParamList>();

export const Routes = () => {
    return (
        <Router.Navigator initialRouteName='Home'>
            <Router.Screen 
                name="Home" 
                component={Home}
                options={{
                    headerStyle: {backgroundColor: '#dbdce0'},
                    headerTintColor: '#000',
                }}
            />
            <Router.Screen 
                name="Detalhes" 
                component={Detail} 
                options={{
                    headerStyle: {backgroundColor: '#dbdce0'},
                    headerTintColor: '#000',
                }}
            />
        </Router.Navigator>
    )   
}
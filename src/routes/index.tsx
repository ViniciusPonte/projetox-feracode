import { createStackNavigator } from '@react-navigation/stack';
import { Detail } from '../pages/Detail';
import { Home } from '../pages/Home';

const Router =  createStackNavigator();

export const Routes = () => {
    return (
        <Router.Navigator initialRouteName='Home'>
            <Router.Screen name="Home" component={Home}/>
            <Router.Screen name="Detail" component={Detail}/>
        </Router.Navigator>
    )   
}
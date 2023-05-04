import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import AllChaletHome from './allChaletHome';
import ImagesSlider from './imageSlider';
import MapChalet from './map';


const Stack = createStackNavigator();

export default function Stackk() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
    headerShown: false
  }}>
      <Stack.Screen name="ChaletPS" component={AllChaletHome} />
      <Stack.Screen name="ImagesSlider" component={ImagesSlider} />
      <Stack.Screen name="map" component={MapChalet} />
      
    </Stack.Navigator>
    </NavigationContainer>
    
  );
}
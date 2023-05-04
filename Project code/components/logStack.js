import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import AllChaletHome from './allChaletHome';
import ImagesSlider from './imageSlider';
import MapChalet from './map';
import Login from './login';
import SignUp from './signUp';
import Stackk from './stack';
import Home from './home';
import { UserProfile } from './userProfile';
import { Chat } from './chat';


const Stack = createStackNavigator();

export default function LogStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
    headerShown: false
  }}>
      <Stack.Screen name="login" component={Login} />
      <Stack.Screen name="signUp" component={SignUp} /> 
      <Stack.Screen name="home" component={Home} />
      <Stack.Screen name="ChaletPS" component={AllChaletHome} />
      <Stack.Screen name="ImagesSlider" component={ImagesSlider} />
      <Stack.Screen name="map" component={MapChalet} />      
      <Stack.Screen name="userProfile" component={UserProfile} /> 
      <Stack.Screen name="chatbox" component={Chat} />     

    </Stack.Navigator>
    </NavigationContainer>
    
  );
}
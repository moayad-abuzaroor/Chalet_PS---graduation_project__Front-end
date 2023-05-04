import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Dimensions, LogBox } from 'react-native';
import AllChaletHome from './components/allChaletHome';
import Home from './components/home';
import ImagesSlider from './components/imageSlider';
import Login from './components/login';
import LogStack from './components/logStack';
import MapChalet from './components/map';
import SignUp from './components/signUp';
import Stackk from './components/stack';
import { UserProfile } from './components/userProfile';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import React, { useState, useEffect, useRef } from 'react';

LogBox.ignoreAllLogs();


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {

  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  const [rent,setRent]=useState()

  function dec(){
    Notifications.presentNotificationAsync({
      title:"decline",
      body:"Your reservations has declined",
      data:{
        _displayInForeground: true
      }
    })
  }

  function appr(){
    Notifications.presentNotificationAsync({
      title:"Approved",
      body:"Your reservations has approved",
      data:{
        _displayInForeground: true
      }
    })
  }

  function sw(x){
    switch(x){
      case 'approved': appr(); break;
      case 'declined': dec(); break;
    }
  }

  async function decide(){
    await fetch("http://192.168.0.189:3500/getNot",{
        method:'GET',
        headers:{
            'Content-type':'application/json'
        }
    })
    .then(response => response.json())
    .catch((error) => console.log("fetch error", error))
    .then(json => {
        setRent(json[0].button)        
        sw(json[0].button);
        console.log(json[0].button)
    });
}

  useEffect(() => {

    decide();

    

    /*registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
      console.log(notification)
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
      console.log("dddd1")

    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };*/


  }, rent);

  return (
    <LogStack />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

/*async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token;
}*/
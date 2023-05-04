import React from 'react';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { API_Key } from '../key';
import { StyleSheet, View, Dimensions,Text } from 'react-native';
import MapViewDirections from 'react-native-maps-directions';


export default function MapChalet({route}) {

  const origin = {latitude: 32.240483, longitude: 35.237198};
  const destination = {latitude: 37.771707, longitude: -122.4053769};
  //const GOOGLE_MAPS_APIKEY = 'AIzaSyCfaJZC3LsxjXEX4yQs1ufrqIOgMJU7kA8';
  const GOOGLE_MAPS_APIKEY = 'AIzaSyDgoyx98YnSNxvvPTUDY8z5kU6nE6uetgU';
    const {width, height}=Dimensions.get('window');

    const ASPECT_RATIO = width / height;
    const LATITUDE_DELTA = 0.2;
    const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
    const INITIAL_POSITION = {
        //latitude:32.252428,
        //longitude:35.356168,
        latitude:parseFloat(route.params.locationX),
        longitude:parseFloat(route.params.locationY),
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
    };
    const coordinates=[
      {
        latitude:parseFloat(route.params.locationX),
        longitude:parseFloat(route.params.locationY)
      }
    ];
    const coordinates1=[
      {
        latitude:32.213707,
        longitude:35.272999
      }
    ];
    var markers = [
      {
        latitude: 45.65,
        longitude: -78.90,
        title: 'Foo Place',
        subtitle: '1234 Foo Drive'
      }
    ];

  return (
    <View style={styles.container}>
      <MapView style={styles.map} provider={PROVIDER_GOOGLE} initialRegion={INITIAL_POSITION} >
        <Marker coordinate={coordinates[0]} title={route.params.name} />
        <MapViewDirections
          origin={coordinates1[0]}
          destination={coordinates[0]}
          apikey={GOOGLE_MAPS_APIKEY}
        />
        
      </MapView>
      
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#fff',
    alignItems:'center',
    justifyContent:'center'
  },
  map: {
    width: '100%',
    height: '100%',
  },
  searchContainer:{
    position:'absolute',
    width:'90%',
    backgroundColor:'white',
    shadowColor:'black',
    shadowOffset:{width:2, height:2},
    shadowOpacity:0.5,
    shadowRadius:4,
    elevation:4,
    padding:8,
    borderRadius:8
  },
  input:{
    borderColor:'#888',
    borderWidth:1
  }
});
import React,{useState,useEffect} from 'react';
import MapView,{Marker} from 'react-native-maps';
import { StyleSheet, View,Button } from 'react-native';
import * as Location from 'expo-location';

export default function farmLocation() {
    const[mapRegion,setMapRegion]=useState({
        latitude:37,
        longitude: -122,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    const userLocation=async()=>{
        let{status}=await Location.requestForegroundPermissionsAsync();
        if(status!=='granted'){
            alert('Permission to access location was denied');
            return;
        }
        let location=await Location.getCurrentPositionAsync({enableHighAccuracy:true})
        setMapRegion({
            latitude:location.coords.latitude,
            longitude:location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        })
    }

    useEffect(()=>{
        userLocation();
    },[])
  return (
    <>
     <View style={styles.container}>
      <MapView style={styles.map}
      region={mapRegion} >
        <Marker coordinate={mapRegion} title='Marker'   key='user-location'/>
      </MapView>
     
      
    </View>
     <Button
      title='GET MY LOCATION'
      onPress={userLocation}>
            </Button>
    </>
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
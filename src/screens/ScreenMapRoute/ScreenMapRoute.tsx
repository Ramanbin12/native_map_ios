import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Alert,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import MapView, { Circle, Marker, Polygon, PROVIDER_GOOGLE,  } from 'react-native-maps';

import { GOOGLE_MAPS_API_KEYS, markers, markersPolygon } from '../../../constant/data';
import MapViewDirections from 'react-native-maps-directions';
import Geolocation from '@react-native-community/geolocation';
import ComponentBottomSheet from '../../components/ComponentBottomSheet/ComponentBottomSheet';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import ComponentLocationDetails from './components/componentLocationDetails/ComponentLocationDetails';
const ScreenMapRoute=()=>{
    const bottomSheetRef = useRef<BottomSheetModal>(null);
    const [activeLocation, setActiveLocation] = useState(markersPolygon[0].id);

    const [currentLocation, setCurrentLocation] = useState({
        latitude: 0,
                longitude: 0
      });
      const mapRef = useRef<MapView>(null);
    
      useEffect(() => {
        console.log('hii');
        requestLocationPermission();
      }, []);
    
      const requestLocationPermission = async () => {
        if (Platform.OS === 'android') {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Access Required',
              message: 'This App needs to access your location to provide accurate route directions.',
              buttonPositive: 'OK', 
              buttonNegative: 'Cancel', 
              buttonNeutral: 'Ask Me Later',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            getCurrentLocation();
          } else {
            Alert.alert('Permission Denied', 'Location permission is required to use this feature.');
          }
        } else {
          getCurrentLocation();
        }
      };

      const getCurrentLocation = () => {
        Geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            console.log(latitude,longitude,"latlong");
            setCurrentLocation({ latitude, longitude });
          },
          (error) => {
            console.log(error.code, error.message); 
            Alert.alert('Error', 'Unable to get your location');
            console.log(error);
          },
          {
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 10000,
          },
        );
      };
        useEffect(() => {
        const selectedLocation = markersPolygon.find(
          (location) => location.id === activeLocation
        );
    
        if (selectedLocation && mapRef.current) {
          mapRef.current.animateToRegion(
            {
              ...selectedLocation.coordinate,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            },
            10000000
          );
        }
      }, [activeLocation]);
      useEffect(() => {
        console.log(bottomSheetRef.current); // Check if the ref is correctly assigned
        bottomSheetRef.current?.present();
        // handlePresentModalPress()
        // bottomSheetRef?.current?.snapToIndex(0);
      }, []);
    return(
        <View style={styles.container}>
        <MapView
        ref={mapRef}
          provider={PROVIDER_GOOGLE} 
          style={styles.map}
          initialRegion={{
            latitude: markers.coordinate.latitude,
            longitude:markers.coordinate.longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
        >
          {currentLocation && (
             <Marker
               coordinate={currentLocation}
               title="Current Location"
               pinColor="green"
             />
           )}
         {markersPolygon.map((location)=>(
           <Marker
           key={location.id}
           coordinate={location.coordinate}
           pinColor={location.id === activeLocation ? "blue" : "red"}
           onPress={() => setActiveLocation(location.id)}
           title={location.title}/>
         ))}
                   {currentLocation && (
             <MapViewDirections
               origin={currentLocation}
               waypoints={markersPolygon.slice(0, -1).map((loc) => loc.coordinate)}
               destination={markersPolygon[markersPolygon.length - 1].coordinate}
               apikey={GOOGLE_MAPS_API_KEYS}
               strokeWidth={5}
               strokeColor="blue"
               optimizeWaypoints={true}
             />
           )}
        </MapView> 
        <ComponentBottomSheet sheetRef={bottomSheetRef} snapPoints={['35%', '35%']} onBackdropPress={() => bottomSheetRef.current?.close()}
          >
        <ComponentLocationDetails  locations={markersPolygon} setActiveLocation={setActiveLocation} activeLocation={activeLocation}/>
        </ComponentBottomSheet>
      </View>
    )
}
const styles = StyleSheet.create({
    container: {
    //   ...StyleSheet.absoluteFillObject,
    flex:1,
      // height: 800,
      // width: 400,
      // justifyContent: 'flex-end',
      // alignItems: 'center',
    },
    buttonContainer: {
      position: 'absolute',
      bottom: 20,
      left: 20,
      right: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
  });
  
export default ScreenMapRoute
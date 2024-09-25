import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { markersPolygon } from '../../../constant/data';
import MapViewDirections from 'react-native-maps-directions';
import Geolocation from '@react-native-community/geolocation';
import ComponentBottomSheet from '../../components/ComponentBottomSheet/ComponentBottomSheet';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import ComponentLocationDetails from './components/componentLocationDetails/ComponentLocationDetails';
import RNConfig from 'react-native-config';

const ScreenMapRoute = () => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const [activeLocation, setActiveLocation] = useState(markersPolygon[0].id);
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [distances, setDistances] = useState<number[]>([]); 
  const mapRef = useRef<MapView>(null);
  const googleMapsApiKey = RNConfig.GOOGLE_MAPS_API_KEYS;

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Access Required',
          message:
            'This App needs to access your location to provide accurate route directions.',
          buttonPositive: 'OK',
          buttonNegative: 'Cancel',
          buttonNeutral: 'Ask Me Later',
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        getCurrentLocation();
      } else {
        Alert.alert(
          'Permission Denied',
          'Location permission is required to use this feature.'
        );
      }
    } else {
      getCurrentLocation();
    }
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ latitude, longitude });
      },
      (error) => {
        Alert.alert('Error', 'Unable to get your location');
        console.log(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      }
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
        1000
      );
    }
  }, [activeLocation]);

  useEffect(() => {
    bottomSheetRef.current?.present();
  }, []);

  const handleDirectionsReady = (result: any, index: number) => {
    setDistances((prev) => {
      const newDistances = [...prev];
      newDistances[index] = result.distance;
      return newDistances;
    });
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: markersPolygon[0].coordinate.latitude,
          longitude: markersPolygon[0].coordinate.longitude,
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

        {markersPolygon.map((location, index) => (
          <Marker
            key={location.id}
            coordinate={location.coordinate}
            pinColor={location.id === activeLocation ? 'blue' : 'red'}
            onPress={() => setActiveLocation(location.id)}
            title={location.title}
          />
        ))}

        {currentLocation && markersPolygon.map((location, index) => {
          const origin = index === 0 ? currentLocation : markersPolygon[index - 1].coordinate;
          const destination = location.coordinate;

          return (
            <React.Fragment key={index}>
              <MapViewDirections
                origin={origin}
                destination={destination}
                apikey={googleMapsApiKey || ''}
                strokeWidth={5}
                strokeColor="blue"
                onReady={(result) => handleDirectionsReady(result, index)}
              />

              <Marker
                coordinate={{
                  latitude: (origin.latitude + destination.latitude) / 2,
                  longitude: (origin.longitude + destination.longitude) / 2,
                }}
              >
                <View style={styles.distanceLabel}>
                  <Text style={styles.distanceText}>
                    {distances[index]?.toFixed(2) || 0} km
                  </Text>
                </View>
              </Marker>
            </React.Fragment>
          );
        })}
      </MapView>

      <View style={styles.infoContainer}>
        {distances.map((distance, index) => (
          <Text key={index} style={styles.infoText}>
            Distance {index === 0 ? 'from Current' : `from ${index} to ${index + 1}`}: {distance?.toFixed(2)} km
          </Text>
        ))}
      </View>

      <ComponentBottomSheet
        sheetRef={bottomSheetRef}
        snapPoints={['35%', '35%']}
        onBackdropPress={() => bottomSheetRef.current?.close()}
      >
        <ComponentLocationDetails
          locations={markersPolygon}
          setActiveLocation={setActiveLocation}
          activeLocation={activeLocation}
        />
      </ComponentBottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  infoContainer: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 10,
    borderRadius: 5,
  },
  infoText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  distanceLabel: {
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 5,
    borderColor: 'gray',
    borderWidth: 1,
  },
  distanceText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default ScreenMapRoute;

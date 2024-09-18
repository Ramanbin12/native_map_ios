/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import MapView, { Circle, Marker, Polygon, PROVIDER_GOOGLE,  } from 'react-native-maps';

import { markers, markersPolygon } from './constant/data';

function App(): React.JSX.Element {

  return (
   
    <View style={styles.container}>
     <MapView
       provider={PROVIDER_GOOGLE} // remove if not using Google Maps
       style={styles.map}
       region={{
         latitude: markers.coordinate.latitude,
         longitude:markers.coordinate.longitude,
         latitudeDelta: 0.015,
         longitudeDelta: 0.0121,
       }}
     >
      
    <Circle 
      center={markers.coordinate}
      radius={200}
    />
    <Polygon 
       coordinates={markersPolygon.map(marker => (
        {
          latitude: marker.coordinate.latitude,
          longitude:marker.coordinate.longitude
        }
       ))}
    />
    {
      markersPolygon.map(marker => (
        <Marker
        key={marker.id}
      coordinate={marker.coordinate}
      title={marker.title}
      description={marker.description}
    />
      ))
    }
     </MapView>
   </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 800,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default App;

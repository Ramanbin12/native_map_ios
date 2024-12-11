import React from 'react';
import MapView, { Circle, Marker, Polygon, PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet, View } from 'react-native';
export const markers = {
    coordinate: {
        latitude: 28.609687,
        longitude: 77.370188
    },
    title: "Binmile Software",
    description: "Welcome to Binmile, need any tech solutions call us on @98XXXX",
    id: 1
}
export const markersPolygon = [
    {
        coordinate: {
            latitude: 28.597687 + 0.006 * 0.5,
            longitude: 77.369188 - 0.006 * 1.0
        },
        title: "Binmile Software Point 1",
        description: "Location Point 1 - Contact us at @98XXXX",
        id: 1
    },
    {
        coordinate: {
            latitude: 28.597687 + 0.006 * 1.0,
            longitude: 77.369188 - 0.006 * 0.5
        },
        title: "Binmile Software Point 2",
        description: "Location Point 2 - Contact us at @98XXXX",
        id: 2
    },
    {
        coordinate: {
            latitude: 28.597687 + 0.006 * 0.5,
            longitude: 77.369188 + 0.006 * 0.5
        },
        title: "Binmile Software Point 3",
        description: "Location Point 3 - Contact us at @98XXXX",
        id: 3
    },
    {
        coordinate: {
            latitude: 28.597687 - 0.006 * 0.5,
            longitude: 77.369188 + 0.006 * 1.0
        },
        title: "Binmile Software Point 4",
        description: "Location Point 4 - Contact us at @98XXXX",
        id: 4
    },
    {
        coordinate: {
            latitude: 28.597687 - 0.006 * 1.0,
            longitude: 77.369188 + 0.006 * 0.5
        },
        title: "Binmile Software Point 5",
        description: "Location Point 5 - Contact us at @98XXXX",
        id: 5
    },
    {
        coordinate: {
            latitude: 28.597687 - 0.006 * 0.5,
            longitude: 77.369188 - 0.006 * 0.5
        },
        title: "Binmile Software Point 6",
        description: "Location Point 6 - Contact us at @98XXXX",
        id: 6
    }
];
function ScreenGeo(){
  return (
    <View style={styles.container}>
        <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={{
            latitude: markers.coordinate.latitude,
            longitude:markers.coordinate.longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
        }}
        >
        {/* <Circle
        center={markers.coordinate}
        radius={200}
        /> */}
        <Polygon
        coordinates={markersPolygon.map(marker => (
            {
            latitude: marker.coordinate.latitude,
            longitude:marker.coordinate.longitude,
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
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    map: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
  });
export default ScreenGeo;










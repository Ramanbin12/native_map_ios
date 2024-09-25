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
// import Map from './component/map/Map';
import CameraComponent from './component/camera/Camera';
import ScreenMapRoute from './src/screens/ScreenMapRoute/ScreenMapRoute';


function App(): React.JSX.Element {
  return (

    <View style={styles.container}>
           <ScreenMapRoute/>

     <CameraComponent />
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

export default App;

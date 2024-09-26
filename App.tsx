/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

// import { GestureHandlerRootView } from "react-native-gesture-handler";
// import ScreenMapRoute from "./src/screens/ScreenMapRoute/ScreenMapRoute";



// function App(): React.JSX.Element {


// console.log('hello')
//   return (
//    <GestureHandlerRootView>

//      <ScreenMapRoute/>
//    </GestureHandlerRootView>
//   );
// }


// export default App;


// App.js
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ScreenMapRoute from "./src/screens/ScreenMapRoute/ScreenMapRoute";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ScreenGeo from './src/screens/ScreenGeo/ScreenGeo';

// Create the Tab Navigator
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
         <GestureHandlerRootView>
      <Tab.Navigator>
        <Tab.Screen name="Screen One" component={ScreenMapRoute} />
        <Tab.Screen name="Screen Two" component={ScreenGeo} />
      </Tab.Navigator>
      </GestureHandlerRootView>
    </NavigationContainer>
  );
}

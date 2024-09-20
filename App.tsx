/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { GestureHandlerRootView } from "react-native-gesture-handler";
import ScreenMapRoute from "./src/screens/ScreenMapRoute/ScreenMapRoute";



function App(): React.JSX.Element {


console.log('hello')
  return (
   <GestureHandlerRootView>

     <ScreenMapRoute/>
   </GestureHandlerRootView>
  );
}


export default App;

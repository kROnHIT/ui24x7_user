import React from "react";
import {NavigationContainer} from "@react-navigation/native";
// import Tabs from "./src/navigation/tabs";
import MainStackNavigator from "./src/navigationNew/StackNavigator";

const App = () => {
  return(
    <NavigationContainer>
      <MainStackNavigator />
    </NavigationContainer>
  )
}

export default App;
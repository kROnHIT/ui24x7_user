import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import Tabs from "./src/navigation/tabs";
import LoginScreen from "./src/screens/LoginScreen";

const App = () => {
  return(
    <NavigationContainer>
      <Tabs />
    </NavigationContainer>
  )
}

export default App;
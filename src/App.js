import React from "react";
import 'react-native-gesture-handler';
import { StatusBar, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import * as eva from '@eva-design/eva';
import theme from "../theme.json";
import { ApplicationProvider } from '@ui-kitten/components';
import AsyncStorage from "@react-native-community/async-storage";
import { Provider } from "react-redux";
import { configureStore } from "./redux/store";
import BottomNavigation from "./navigation";
import { Toast } from 'react-native-redux-toast';
// import Parse from "parse/react-native";
let Parse = require("parse/react-native");


class App extends React.Component {
  constructor(props) {
    super(props);
    Parse.setAsyncStorage(AsyncStorage);
    Parse.enableLocalDatastore();
    Parse.serverURL =
      "https://pg-app-bv2ddzwkb7rrzqv1ru1wxls7l1rle4.scalabl.cloud/1/"
      Parse.initialize(
        "MS0KGvWKL7H1hfYqct7UyuORiHb7NQWKRNU9GpRN",
        "2ctIpehO2SxKyGN7YziBT66WhR9RpLOHUNNKUbIG",
      );
    Text.defaultProps = Text.defaultProps || {};
    Text.defaultProps.allowFontScaling = false;
  }

  render() {
    return (
      <Provider store={configureStore({})}>
        <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
          <NavigationContainer>
            <StatusBar
              barStyle="light-content"
              hidden={false}
              backgroundColor="#5a67d8"
              // backgroundColor={theme['color-primary-700']}
            />
            <BottomNavigation />
            <Toast messageStyle={{ color: 'white' }} />
          </NavigationContainer>
        </ApplicationProvider>
      </Provider>
    )
  }
}

export default App;
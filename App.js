import React from 'react';
import Switch from "./components/SwitchComponent";
import Loading from "./components/LoadingComponent";
import { LogBox } from "react-native";
import { PersistGate } from "redux-persist/es/integration/react";
import { Provider } from "react-redux";
import { ConfigureStore } from "./redux/ConfigureStore";


const { persistor, store } = ConfigureStore();

export default function App() {
  

  return (
    <Provider store={store}>
      <PersistGate
        loading = {<Loading />}
        persistor={persistor}
      >
        <Switch />
      </PersistGate>
    </Provider>
  );
}

LogBox.ignoreLogs(["It appears that you"]);
LogBox.ignoreLogs(["interpolate() was renamed"]);

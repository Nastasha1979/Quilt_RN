import React from 'react';
import Switch from "./components/SwitchComponent";
import { Provider } from "react-redux";
import { ConfigureStore } from "./redux/ConfigureStore";
console.disableYellowBox = true;

const store = ConfigureStore();

export default function App() {
  return (
    <Provider store={store}>
      <Switch />
    </Provider>
  );
}



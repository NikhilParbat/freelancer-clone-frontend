import React from "react";
import ReactDOM from "react-dom/client"; // ✅ Use createRoot from ReactDOM
import "./index.css";
import App from "./App";
import * as serviceWorker from "./common/serviceWorker";
import reducer, { initialState } from "./common/reducer";
import { StateProvider } from "./common/StateProvider";

const root = ReactDOM.createRoot(document.getElementById("root")); // ✅ Correct way in React 18
root.render(
  <React.StrictMode>
    <StateProvider initialState={initialState} reducer={reducer}>
      <App />
    </StateProvider>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below.
serviceWorker.unregister();

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./style/main.css";
import FirebaseContext from "./contexts/firebase";
import { firebase, FieldValue } from "./libs/firebase";
ReactDOM.render(
  <FirebaseContext.Provider value={{ firebase, FieldValue }}>
    <App />
  </FirebaseContext.Provider>,
  document.getElementById("root")
);

// client side rendered app : react (cra)
// -> database which is firebase
// -> react-loading-skeleton
// -> tailwind

// folder structure
// -> components
// -> constants
// -> contexts
// -> helpers
// -> libs (firebase going to live in here)
// -> firebase (firebase functions in here)
// -> styles (talwind's folder)

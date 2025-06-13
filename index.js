import React from "react";
import ReactDOM from "react-dom/client";
import { Provider as JotaiProvider } from "jotai";
import App from "./App";
import { LocationProvider } from "./context/LocationContext";
import { BookingProvider } from "./context/BookingContext";
import { UserProvider } from "./context/UserContext";

// Mapbox token (in a real app, this would be in an environment variable)
import mapboxgl from "mapbox-gl";
mapboxgl.accessToken = "YOUR_MAPBOX_ACCESS_TOKEN";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <JotaiProvider>
      <UserProvider>
        <LocationProvider>
          <BookingProvider>
            <App />
          </BookingProvider>
        </LocationProvider>
      </UserProvider>
    </JotaiProvider>
  </React.StrictMode>
);

// Remove the loading indicator once React has mounted
window.addEventListener("load", () => {
  const loader = document.getElementById("initial-loader");
  if (loader) {
    loader.style.display = "none";
  }
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// import reportWebVitals from "./reportWebVitals";
// reportWebVitals();
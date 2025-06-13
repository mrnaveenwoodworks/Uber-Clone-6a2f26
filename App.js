import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "jotai";
import Navbar from "./components/Navigation/Navbar";
import HomePage from "./components/Home/HomePage";
import UserProfile from "./components/User/UserProfile";
import RideStatus from "./components/Ride/RideStatus";

const App = () => {
  return (
    <Provider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/ride-status" element={<RideStatus />} />
              {/* Add more routes as needed */}
            </Routes>
          </main>
          <footer className="bg-uber-black text-white py-4">
            <div className="container mx-auto text-center">
              <p>&copy; 2023 Uber Clone. All rights reserved.</p>
            </div>
          </footer>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
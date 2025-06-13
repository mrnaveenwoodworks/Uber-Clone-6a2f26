import { atom } from "jotai";
import React, { createContext, useContext } from "react";

// Initial user state for Jotai atom
// This reflects a logged-in user state, similar to mock data in components.
const initialUserState = {
  isLoggedIn: true,
  profile: {
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "https://images.unsplash.com/source-404?fit=crop&fm=jpg&h=800&q=60&w=1200",
    isDriver: false,
    phone: "+1 (555) 123-4567", // From UserProfile mock data
    rating: 4.85, // From UserProfile mock data
    memberSince: "January 2022", // From UserProfile mock data
  },
  preferences: {
    darkMode: false,
    notificationsEnabled: true,
  },
  // Other user-related data can be added here as needed, e.g.:
  // rideHistoryIds: [],
  // savedPlaceIds: [],
  // paymentMethodIds: [],
};

// Jotai atom for global user state management
export const userStateAtom = atom(initialUserState);

// --- Traditional React Context (to support existing <UserProvider> in index.js) ---

// Create a React Context for user-related data, if needed alongside Jotai
const UserContext = createContext(null);

/**
 * UserProvider component.
 * In this setup, primary user state is managed by Jotai's `userStateAtom`.
 * This Provider mainly serves to fit into the existing structure in `index.js`
 * where a <UserProvider> wraps parts of the application.
 * It can be expanded to provide other non-Jotai context values if necessary.
 */
export const UserProvider = ({ children }) => {
  // If this provider were to manage its own state or provide values:
  // const [someValue, setSomeValue] = useState("example");
  // const contextValue = { someValue, setSomeValue };
  // return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;

  // For now, as user state is via Jotai, it simply renders children.
  return <>{children}</>;
};

/**
 * Custom hook to consume UserContext.
 * This would be used if UserProvider was providing values through UserContext.
 */
export const useUser = () => {
  const context = useContext(UserContext);
  // If UserContext was intended to always provide a non-null value:
  // if (context === undefined || context === null) {
  //   throw new Error("useUser must be used within a UserProvider that provides a value.");
  // }
  return context; // Currently returns null as UserProvider doesn't set a value.
};

// No default export is strictly necessary if named exports are consistently used.
// export default UserContext; // Could export context if needed for direct Consumer usage.
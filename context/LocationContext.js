import { createContext, useContext, useState, useEffect } from "react";
import { atom, useAtom } from "jotai";

// Atoms for location state
export const currentLocationAtom = atom(null);
export const searchHistoryAtom = atom([]);
export const savedLocationsAtom = atom({
    home: null,
    work: null,
    favorites: []
});

// Create the context
const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
    const [currentLocation, setCurrentLocation] = useAtom(currentLocationAtom);
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
    const [savedLocations, setSavedLocations] = useAtom(savedLocationsAtom);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Get current location on mount
    useEffect(() => {
        getCurrentLocation();
    }, []);

    const getCurrentLocation = () => {
        if (!navigator.geolocation) {
            setError("Geolocation is not supported by your browser");
            return;
        }

        setIsLoading(true);
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                try {
                    const { latitude, longitude } = position.coords;
                    const location = {
                        coordinates: { lat: latitude, lng: longitude },
                        timestamp: new Date().toISOString()
                    };

                    // Reverse geocode to get address
                    const response = await fetch(
                        `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`
                    );
                    const data = await response.json();

                    if (data.features && data.features.length > 0) {
                        location.address = data.features[0].place_name;
                    }

                    setCurrentLocation(location);
                    setError(null);
                } catch (err) {
                    setError("Failed to get location details");
                    console.error("Geocoding error:", err);
                } finally {
                    setIsLoading(false);
                }
            },
            (err) => {
                setError("Failed to get your location");
                setIsLoading(false);
                console.error("Geolocation error:", err);
            }
        );
    };

    const addToSearchHistory = (location) => {
        setSearchHistory(prev => {
            const newHistory = [
                location,
                ...prev.filter(item => item.address !== location.address)
            ].slice(0, 10); // Keep only last 10 searches
            return newHistory;
        });
    };

    const clearSearchHistory = () => {
        setSearchHistory([]);
    };

    const saveLocation = (label, location) => {
        setSavedLocations(prev => {
            if (label === "home" || label === "work") {
                return { ...prev, [label]: location };
            } else {
                const favorites = [
                    location,
                    ...prev.favorites.filter(item => item.address !== location.address)
                ].slice(0, 20); // Limit to 20 favorite locations
                return { ...prev, favorites };
            }
        });
    };

    const removeSavedLocation = (label, address) => {
        setSavedLocations(prev => {
            if (label === "home" || label === "work") {
                return { ...prev, [label]: null };
            } else {
                return {
                    ...prev,
                    favorites: prev.favorites.filter(item => item.address !== address)
                };
            }
        });
    };

    const searchNearbyPlaces = async (query, radius = 1000) => {
        if (!currentLocation) {
            throw new Error("Current location not available");
        }

        try {
            setIsLoading(true);
            const { lng, lat } = currentLocation.coordinates;
            const response = await fetch(
                `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?proximity=${lng},${lat}&radius=${radius}&access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`
            );
            const data = await response.json();
            return data.features.map(feature => ({
                coordinates: {
                    lng: feature.center[0],
                    lat: feature.center[1]
                },
                address: feature.place_name,
                name: feature.text,
                type: feature.place_type[0]
            }));
        } catch (err) {
            console.error("Search nearby error:", err);
            throw new Error("Failed to search nearby places");
        } finally {
            setIsLoading(false);
        }
    };

    const contextValue = {
        currentLocation,
        searchHistory,
        savedLocations,
        isLoading,
        error,
        actions: {
            getCurrentLocation,
            addToSearchHistory,
            clearSearchHistory,
            saveLocation,
            removeSavedLocation,
            searchNearbyPlaces
        }
    };

    return (
        <LocationContext.Provider value={contextValue}>
            {children}
        </LocationContext.Provider>
    );
};

// Custom hook to use location context
export const useLocation = () => {
    const context = useContext(LocationContext);
    if (!context) {
        throw new Error("useLocation must be used within a LocationProvider");
    }
    return context;
};

export default LocationContext;
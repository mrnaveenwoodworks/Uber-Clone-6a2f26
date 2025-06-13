import React, { useState, useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

const LocationInput = ({ 
    label, 
    placeholder, 
    value, 
    onChange, 
    error, 
    required = false,
    currentLocationEnabled = true 
}) => {
    const [suggestions, setSuggestions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef(null);
    const suggestionTimeout = useRef(null);

    const fetchSuggestions = async (query) => {
        if (!query) {
            setSuggestions([]);
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch(
                `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=${mapboxgl.accessToken}&types=address,poi&limit=5`
            );
            const data = await response.json();
            setSuggestions(data.features || []);
        } catch (error) {
            console.error("Error fetching location suggestions:", error);
            setSuggestions([]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const newValue = e.target.value;
        onChange({ address: newValue, coordinates: null });

        // Debounce suggestions fetch
        if (suggestionTimeout.current) {
            clearTimeout(suggestionTimeout.current);
        }
        suggestionTimeout.current = setTimeout(() => {
            fetchSuggestions(newValue);
        }, 300);
    };

    const handleSuggestionClick = (suggestion) => {
        const address = suggestion.place_name;
        const [lng, lat] = suggestion.center;
        
        onChange({
            address,
            coordinates: { lng, lat }
        });
        setSuggestions([]);
        setIsFocused(false);
    };

    const getCurrentLocation = () => {
        if ("geolocation" in navigator) {
            setIsLoading(true);
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    try {
                        const { latitude, longitude } = position.coords;
                        const response = await fetch(
                            `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${mapboxgl.accessToken}`
                        );
                        const data = await response.json();
                        if (data.features && data.features.length > 0) {
                            handleSuggestionClick(data.features[0]);
                        }
                    } catch (error) {
                        console.error("Error getting current location:", error);
                    } finally {
                        setIsLoading(false);
                    }
                },
                (error) => {
                    console.error("Error getting location:", error);
                    setIsLoading(false);
                }
            );
        }
    };

    useEffect(() => {
        // Click outside handler
        const handleClickOutside = (event) => {
            if (inputRef.current && !inputRef.current.contains(event.target)) {
                setIsFocused(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={inputRef}>
            {/* Label */}
            {label && (
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}

            {/* Input wrapper */}
            <div className="relative flex items-center">
                {/* Location icon */}
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="20" height="20"><rect width="256" height="256" fill="none"/><circle cx="128" cy="64" r="32" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="128" y1="96" x2="128" y2="176" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M172,139.75c35.44,6.37,60,20.21,60,36.25,0,22.09-46.56,40-104,40S24,198.09,24,176c0-16,24.56-29.88,60-36.25" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
                </div>

                {/* Text input */}
                <input
                    type="text"
                    value={value?.address || ""}
                    onChange={handleInputChange}
                    onFocus={() => setIsFocused(true)}
                    placeholder={placeholder || "Enter location"}
                    className={`
                        w-full pl-10 pr-10 py-2 border rounded-lg
                        focus:ring-2 focus:ring-uber-blue focus:border-uber-blue
                        ${error ? "border-red-500" : "border-gray-300"}
                        ${isLoading ? "bg-gray-50" : "bg-white"}
                    `}
                />

                {/* Current location button */}
                {currentLocationEnabled && (
                    <button
                        type="button"
                        onClick={getCurrentLocation}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-uber-blue hover:text-uber-blue/80"
                        title="Use current location"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="20" height="20"><rect width="256" height="256" fill="none"/><line x1="128" y1="232" x2="128" y2="200" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><circle cx="128" cy="128" r="88" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="128" y1="24" x2="128" y2="56" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="24" y1="128" x2="56" y2="128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="232" y1="128" x2="200" y2="128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><circle cx="128" cy="128" r="32" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
                    </button>
                )}
            </div>

            {/* Error message */}
            {error && (
                <p className="mt-1 text-sm text-red-500">{error}</p>
            )}

            {/* Suggestions dropdown */}
            {isFocused && suggestions.length > 0 && (
                <div className="absolute z-50 w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 max-h-60 overflow-y-auto">
                    {suggestions.map((suggestion) => (
                        <button
                            key={suggestion.id}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="w-full px-4 py-2 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none"
                        >
                            <p className="text-sm text-gray-900 truncate">
                                {suggestion.place_name}
                            </p>
                            <p className="text-xs text-gray-500 truncate">
                                {suggestion.properties?.address || suggestion.text}
                            </p>
                        </button>
                    ))}
                </div>
            )}

            {/* Loading indicator */}
            {isLoading && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <div className="w-5 h-5 border-2 border-uber-blue border-t-transparent rounded-full animate-spin"></div>
                </div>
            )}
        </div>
    );
};

export default LocationInput;
import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";

// Fallback for Mapbox token if not set globally.
// Ideally, this token should be set in a single place (e.g., index.js or environment variables).
if (!mapboxgl.accessToken) {
  mapboxgl.accessToken = "YOUR_MAPBOX_ACCESS_TOKEN_PLACEHOLDER"; // This is a non-functional placeholder
  console.warn("MapView: Mapbox access token was not set globally, using a placeholder. Map features may not work.");
}


const MapView = ({
    pickupLocation,
    dropoffLocation,
    driverLocations = [],
    onMapClick,
    showDrivers = true
}) => {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(-73.935242); // Default to New York City
    const [lat, setLat] = useState(40.730610);
    const [zoom, setZoom] = useState(12);
    const driverMarkers = useRef([]); // Renamed for clarity
    const locationMarkers = useRef([]); // For pickup/dropoff markers
    const routeLayerId = "route-layer"; // Unique ID for the route layer

    // Initialize map
    useEffect(() => {
        if (map.current || !mapContainer.current) return;

        // Validate Mapbox access token
        if (!mapboxgl.accessToken || mapboxgl.accessToken === "YOUR_MAPBOX_ACCESS_TOKEN_PLACEHOLDER" || mapboxgl.accessToken === "YOUR_MAPBOX_TOKEN") {
            console.error(
              "Mapbox Access Token is not configured correctly. Please set a valid token in your application's entry point (e.g., index.js) or environment variables for map and geocoder functionality to work."
            );
            // Optionally, render an error message in the UI here
            return; // Prevent map initialization if token is invalid
        }

        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: "mapbox://styles/mapbox/streets-v12",
            center: [lng, lat],
            zoom: zoom,
            attributionControl: false // Optionally disable default attribution if custom is handled
        });
        map.current.addControl(new mapboxgl.AttributionControl({ compact: true }), "bottom-right");


        map.current.on("load", () => {
            if (!map.current) return; // Map might have been removed/unmounted

            // Add navigation controls (zoom, rotate)
            map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

            // Add search control (Mapbox Geocoder)
            try {
                const geocoder = new MapboxGeocoder({
                    accessToken: mapboxgl.accessToken,
                    mapboxgl: mapboxgl,
                    marker: false, // Do not automatically place a marker on geocode; we handle markers separately
                    placeholder: "Search for a location",
                    // flyTo: false, // Optional: disable automatic map movement to geocoded result
                });
                map.current.addControl(geocoder, "top-left");

                // geocoder.on("result", (e) => {
                //     // Handle geocoder result if needed, e.g., update state
                //     console.log("Geocoder result:", e.result);
                // });
            } catch (error) {
                console.error("Failed to initialize or add Mapbox Geocoder:", error);
            }
        });
        
        // Handle map clicks for custom interactions
        map.current.on("click", (e) => {
            if (onMapClick) {
                onMapClick({ lng: e.lngLat.lng, lat: e.lngLat.lat });
            }
        });
        
        // Update component state when map view changes
        map.current.on("move", () => {
            if (map.current) { // Ensure map exists
                setLng(map.current.getCenter().lng.toFixed(4));
                setLat(map.current.getCenter().lat.toFixed(4));
                setZoom(map.current.getZoom().toFixed(2));
            }
        });

        // Cleanup map instance on component unmount
        return () => {
            if (map.current) {
                map.current.remove();
                map.current = null;
            }
        };
    }, []); // Empty dependency array: effect runs only once on mount and cleanup on unmount

    // Manage pickup and dropoff location markers
    useEffect(() => {
        if (!map.current || !map.current.isStyleLoaded()) return; // Ensure map and style are loaded

        // Clear existing pickup/dropoff markers
        locationMarkers.current.forEach(marker => marker.remove());
        locationMarkers.current = [];

        const addLocationMarker = (location, type) => {
            if (location && typeof location.lng === "number" && typeof location.lat === "number") {
                const el = document.createElement("div");
                el.className = `${type}-marker`; // e.g., "pickup-marker"
                el.style.width = "14px";
                el.style.height = "14px";
                el.style.borderRadius = "50%";
                el.style.backgroundColor = type === "pickup" ? "green" : "red";
                el.style.border = "2px solid white";
                el.style.boxShadow = "0 0 0 2px rgba(0,0,0,0.1)";

                const marker = new mapboxgl.Marker(el)
                    .setLngLat([location.lng, location.lat])
                    .addTo(map.current);
                locationMarkers.current.push(marker);
            }
        };

        if (pickupLocation) {
            addLocationMarker(pickupLocation, "pickup");
        }
        if (dropoffLocation) {
            addLocationMarker(dropoffLocation, "dropoff");
        }
    }, [pickupLocation, dropoffLocation]); // Re-run when pickup/dropoff locations change

    // Update driver markers
    useEffect(() => {
        if (!map.current || !map.current.isStyleLoaded()) return;

        // Clear existing driver markers if showDrivers is false or new locations are coming
        driverMarkers.current.forEach(marker => marker.remove());
        driverMarkers.current = [];

        if (!showDrivers) {
            return;
        }

        driverLocations.forEach(location => {
            if (location && typeof location.lng === "number" && typeof location.lat === "number") {
                const el = document.createElement("div");
                el.className = "driver-marker";
                el.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="24" height="24"><rect width="256" height="256" fill="none"/><circle cx="66" cy="178" r="22" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><circle cx="190" cy="178" r="22" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="88" y1="176" x2="168" y2="176" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M212,176h24a8,8,0,0,0,8-8V128a8,8,0,0,0-8-8H208L162.34,74.34A8,8,0,0,0,156.69,72H48.28a8,8,0,0,0-6.65,3.56L12,120v48a8,8,0,0,0,8,8H44" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="208" y1="120" x2="12" y2="120" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>`;
                el.style.color = "#000000"; // SVG color

                const marker = new mapboxgl.Marker(el)
                    .setLngLat([location.lng, location.lat])
                    .addTo(map.current);
                driverMarkers.current.push(marker);
            }
        });
    }, [driverLocations, showDrivers]);

    // Draw route when pickup/dropoff locations change
    useEffect(() => {
        if (!map.current || !map.current.isStyleLoaded()) return;

        const removeRoute = () => {
            if (map.current) { // Check map instance existence
                if (map.current.getLayer(routeLayerId)) {
                    map.current.removeLayer(routeLayerId);
                }
                if (map.current.getSource(routeLayerId)) {
                    map.current.removeSource(routeLayerId);
                }
            }
        };

        if (!pickupLocation || !dropoffLocation) {
            removeRoute();
            return;
        }

        const getRoute = async () => {
            if (!map.current) return; // Check map instance again inside async function

            if (!mapboxgl.accessToken || mapboxgl.accessToken === "YOUR_MAPBOX_ACCESS_TOKEN_PLACEHOLDER" || mapboxgl.accessToken === "YOUR_MAPBOX_TOKEN") {
                console.error("MapView: Invalid Mapbox Access Token. Cannot fetch route.");
                return;
            }
            
            try {
                const response = await fetch(
                    `https://api.mapbox.com/directions/v5/mapbox/driving/${pickupLocation.lng},${pickupLocation.lat};${dropoffLocation.lng},${dropoffLocation.lat}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`
                );
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
                }
                const json = await response.json();
                
                if (!map.current) return; // Check map instance again before updating
                removeRoute(); // Clear previous route before adding new one

                if (json.routes && json.routes.length > 0) {
                    const routeGeometry = json.routes[0].geometry;
                    
                    map.current.addSource(routeLayerId, {
                        type: "geojson",
                        data: {
                            type: "Feature",
                            properties: {},
                            geometry: routeGeometry
                        }
                    });

                    map.current.addLayer({
                        id: routeLayerId,
                        type: "line",
                        source: routeLayerId,
                        layout: {
                            "line-join": "round",
                            "line-cap": "round"
                        },
                        paint: {
                            "line-color": "#276EF1", // Uber Blue
                            "line-width": 6,
                            "line-opacity": 0.8
                        }
                    });

                    if (routeGeometry.coordinates.length > 0) {
                        const bounds = routeGeometry.coordinates.reduce((currentBounds, coord) => {
                            return currentBounds.extend(coord);
                        }, new mapboxgl.LngLatBounds(routeGeometry.coordinates[0], routeGeometry.coordinates[0]));

                        map.current.fitBounds(bounds, {
                            padding: { top: 80, bottom: 80, left: 80, right: 80 } // Generous padding
                        });
                    }
                } else {
                    console.warn("MapView: No route found for the given locations.", json);
                }
            } catch (error) {
                console.error("MapView: Error fetching or drawing route:", error);
            }
        };

        getRoute();
        
        return () => { // Cleanup function for this effect
            if (map.current && map.current.isStyleLoaded()) {
                 removeRoute();
            }
        };
    }, [pickupLocation, dropoffLocation]);

    return (
        <div className="relative w-full h-[calc(100vh-64px)]"> {/* Adjust height based on Navbar height */}
            <div
                ref={mapContainer}
                className="absolute inset-0 rounded-lg shadow-lg" // Style the map container
            />
            {/* Improved Loading overlay: shown if map isn't initialized but container ref is set */}
            {(!map.current && mapContainer.current) && (
                <div className="absolute inset-0 bg-white bg-opacity-80 flex flex-col items-center justify-center z-10">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-uber-blue"></div>
                    <p className="ml-3 mt-2 text-uber-black text-sm">Loading Map...</p>
                </div>
            )}
        </div>
    );
};

export default MapView;
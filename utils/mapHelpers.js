import mapboxgl from "mapbox-gl";

// Constants for map calculations
const EARTH_RADIUS_KM = 6371;
const MILES_PER_KM = 0.621371;
const DEFAULT_ZOOM = 13;
const DEFAULT_PADDING = 50;

/**
 * Calculates the distance between two points using the Haversine formula
 */
export const calculateDistance = (point1, point2) => {
    const toRad = (x) => (x * Math.PI) / 180;
    
    const lat1 = toRad(point1.lat);
    const lon1 = toRad(point1.lng);
    const lat2 = toRad(point2.lat);
    const lon2 = toRad(point2.lng);
    
    const dLat = lat2 - lat1;
    const dLon = lon2 - lon1;
    
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1) * Math.cos(lat2) * 
              Math.sin(dLon/2) * Math.sin(dLon/2);
              
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    
    // Convert to miles
    return EARTH_RADIUS_KM * c * MILES_PER_KM;
};

/**
 * Calculates the center point between multiple coordinates
 */
export const calculateCenter = (coordinates) => {
    if (!coordinates || coordinates.length === 0) {
        return null;
    }
    
    const total = coordinates.reduce((acc, coord) => ({
        lat: acc.lat + coord.lat,
        lng: acc.lng + coord.lng
    }), { lat: 0, lng: 0 });
    
    return {
        lat: total.lat / coordinates.length,
        lng: total.lng / coordinates.length
    };
};

/**
 * Gets the bounds that encompass all provided coordinates
 */
export const getBounds = (coordinates) => {
    if (!coordinates || coordinates.length === 0) {
        return null;
    }
    
    const bounds = new mapboxgl.LngLatBounds();
    coordinates.forEach(coord => {
        bounds.extend([coord.lng, coord.lat]);
    });
    
    return bounds;
};

/**
 * Calculates optimal zoom level to show all coordinates
 */
export const getOptimalZoom = (bounds, mapWidth, mapHeight) => {
    const WORLD_WIDTH = 512;
    const ZOOM_MAX = 18;
    
    const ne = bounds.getNorthEast();
    const sw = bounds.getSouthWest();
    
    const latFraction = (ne.lat - sw.lat) / 180;
    const lngFraction = (ne.lng - sw.lng) / 360;
    
    const latZoom = Math.log2(mapHeight / WORLD_WIDTH / latFraction);
    const lngZoom = Math.log2(mapWidth / WORLD_WIDTH / lngFraction);
    
    return Math.min(Math.floor(Math.min(latZoom, lngZoom)), ZOOM_MAX);
};

/**
 * Creates a GeoJSON feature for a route line
 */
export const createRouteLineString = (coordinates) => {
    return {
        type: "Feature",
        properties: {},
        geometry: {
            type: "LineString",
            coordinates: coordinates.map(coord => [coord.lng, coord.lat])
        }
    };
};

/**
 * Formats duration into human-readable format
 */
export const formatDuration = (minutes) => {
    if (minutes < 60) {
        return `${Math.round(minutes)} min`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = Math.round(minutes % 60);
    return `${hours} hr ${remainingMinutes} min`;
};

/**
 * Calculates estimated arrival time
 */
export const calculateETA = (durationInMinutes) => {
    const now = new Date();
    const arrivalTime = new Date(now.getTime() + durationInMinutes * 60000);
    return arrivalTime.toLocaleTimeString([], { 
        hour: "numeric", 
        minute: "2-digit"
    });
};

/**
 * Optimizes a route between multiple waypoints
 */
export const optimizeRoute = (waypoints) => {
    if (waypoints.length <= 2) return waypoints;
    
    // Simple nearest neighbor algorithm for demo
    // In production, you'd want a more sophisticated algorithm
    const optimized = [waypoints[0]];
    const remaining = waypoints.slice(1, -1);
    const destination = waypoints[waypoints.length - 1];
    
    while (remaining.length > 0) {
        const current = optimized[optimized.length - 1];
        let nearestIdx = 0;
        let minDistance = calculateDistance(current, remaining[0]);
        
        for (let i = 1; i < remaining.length; i++) {
            const distance = calculateDistance(current, remaining[i]);
            if (distance < minDistance) {
                minDistance = distance;
                nearestIdx = i;
            }
        }
        
        optimized.push(remaining[nearestIdx]);
        remaining.splice(nearestIdx, 1);
    }
    
    optimized.push(destination);
    return optimized;
};

/**
 * Creates a marker element for the map
 */
export const createMarkerElement = (type) => {
    const element = document.createElement("div");
    element.className = "marker";
    
    switch (type) {
        case "pickup":
            element.innerHTML = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="24" height="24"><rect width="256" height="256" fill="none"/><circle cx="128" cy="128" r="96" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><circle cx="128" cy="96" r="16"/><circle cx="128" cy="160" r="16"/></svg>;
            break;
        case "dropoff":
            element.innerHTML = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="24" height="24"><rect width="256" height="256" fill="none"/><circle cx="128" cy="64" r="32" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="128" y1="96" x2="128" y2="176" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M172,139.75c35.44,6.37,60,20.21,60,36.25,0,22.09-46.56,40-104,40S24,198.09,24,176c0-16,24.56-29.88,60-36.25" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>;
            break;
        case "driver":
            element.innerHTML = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="24" height="24"><rect width="256" height="256" fill="none"/><line x1="16" y1="112" x2="240" y2="112" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M216,208H188a8,8,0,0,1-8-8V176H76v24a8,8,0,0,1-8,8H40a8,8,0,0,1-8-8V112L61.89,44.75A8,8,0,0,1,69.2,40H186.8a8,8,0,0,1,7.31,4.75L224,112v88A8,8,0,0,1,216,208Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>;
            break;
        default:
            element.innerHTML = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="24" height="24"><rect width="256" height="256" fill="none"/><circle cx="128" cy="128" r="96" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M176,211.16V176a8,8,0,0,0-8-8H88a8,8,0,0,0-8,8v35.16" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M96,168V136a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v32" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M147.84,128,135.71,84.44a8,8,0,0,0-15.42,0L108.16,128Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>;
    }
    
    return element;
};

/**
 * Animates marker movement along a route
 */
export const animateMarker = (marker, coordinates, duration = 3000) => {
    let start = null;
    const startPosition = coordinates[0];
    const endPosition = coordinates[coordinates.length - 1];
    
    function animate(timestamp) {
        if (!start) start = timestamp;
        const progress = (timestamp - start) / duration;
        
        if (progress < 1) {
            const currentLat = startPosition.lat + (endPosition.lat - startPosition.lat) * progress;
            const currentLng = startPosition.lng + (endPosition.lng - startPosition.lng) * progress;
            marker.setLngLat([currentLng, currentLat]);
            requestAnimationFrame(animate);
        }
    }
    
    requestAnimationFrame(animate);
};

export default {
    calculateDistance,
    calculateCenter,
    getBounds,
    getOptimalZoom,
    createRouteLineString,
    formatDuration,
    calculateETA,
    optimizeRoute,
    createMarkerElement,
    animateMarker
};
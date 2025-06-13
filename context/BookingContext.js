import { createContext, useContext, useState } from "react";
import { atom, useAtom } from "jotai";

// Atoms for booking state
export const bookingStateAtom = atom({
    pickup: null,
    dropoff: null,
    rideType: null,
    estimatedPrice: null,
    estimatedTime: null,
    rideStatus: null,
    driver: null
});

// Create the context
const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
    const [bookingState, setBookingState] = useAtom(bookingStateAtom);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Calculate ride estimate based on locations and ride type
    const calculateRideEstimate = async (pickup, dropoff, rideType) => {
        if (!pickup?.coordinates || !dropoff?.coordinates || !rideType) {
            return null;
        }

        setIsLoading(true);
        try {
            // Mock API call to calculate distance and time
            // In a real app, this would call a routing service API
            await new Promise(resolve => setTimeout(resolve, 1000));

            const baseRates = {
                uberx: { base: 5.50, perMile: 1.75, perMinute: 0.35 },
                comfort: { base: 8.50, perMile: 2.25, perMinute: 0.45 },
                uberxl: { base: 10.50, perMile: 2.75, perMinute: 0.55 },
                black: { base: 15.00, perMile: 3.50, perMinute: 0.75 }
            };

            // Mock distance calculation
            const { lng: lng1, lat: lat1 } = pickup.coordinates;
            const { lng: lng2, lat: lat2 } = dropoff.coordinates;
            
            // Simple distance calculation (not accurate for real use)
            const distance = Math.sqrt(
                Math.pow(lng2 - lng1, 2) + Math.pow(lat2 - lat1, 2)
            ) * 69; // Rough miles conversion

            const time = distance * 3; // Rough time estimate in minutes
            const rate = baseRates[rideType];
            const price = (
                rate.base +
                (distance * rate.perMile) +
                (time * rate.perMinute)
            ).toFixed(2);

            return {
                estimatedPrice: price,
                estimatedTime: Math.round(time),
                distance: distance.toFixed(1)
            };
        } catch (err) {
            console.error("Error calculating ride estimate:", err);
            setError("Failed to calculate ride estimate");
            return null;
        } finally {
            setIsLoading(false);
        }
    };

    // Book a ride
    const bookRide = async (paymentMethod) => {
        if (!bookingState.pickup || !bookingState.dropoff || !bookingState.rideType) {
            setError("Please complete all booking details");
            return false;
        }

        setIsLoading(true);
        try {
            // Mock API call to book ride
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Mock driver assignment
            const mockDriver = {
                id: "d-" + Math.random().toString(36).substr(2, 9),
                name: "Michael Chen",
                rating: 4.9,
                totalRides: 1243,
                avatar: "https://images.unsplash.com/source-404?fit=crop&fm=jpg&h=800&q=60&w=1200",
                vehicle: {
                    make: "Toyota",
                    model: "Camry",
                    color: "Silver",
                    plate: "ABC 123",
                    year: 2021
                },
                currentLocation: {
                    lat: bookingState.pickup.coordinates.lat + (Math.random() - 0.5) * 0.01,
                    lng: bookingState.pickup.coordinates.lng + (Math.random() - 0.5) * 0.01
                }
            };

            setBookingState(prev => ({
                ...prev,
                rideStatus: "confirmed",
                driver: mockDriver
            }));

            return true;
        } catch (err) {
            console.error("Error booking ride:", err);
            setError("Failed to book ride");
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    // Cancel a ride
    const cancelRide = async () => {
        setIsLoading(true);
        try {
            // Mock API call to cancel ride
            await new Promise(resolve => setTimeout(resolve, 1000));

            setBookingState({
                pickup: null,
                dropoff: null,
                rideType: null,
                estimatedPrice: null,
                estimatedTime: null,
                rideStatus: null,
                driver: null
            });

            return true;
        } catch (err) {
            console.error("Error canceling ride:", err);
            setError("Failed to cancel ride");
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    // Update ride status (for real-time updates)
    const updateRideStatus = (status) => {
        setBookingState(prev => ({
            ...prev,
            rideStatus: status
        }));
    };

    const contextValue = {
        bookingState,
        isLoading,
        error,
        actions: {
            setBookingState,
            calculateRideEstimate,
            bookRide,
            cancelRide,
            updateRideStatus
        }
    };

    return (
        <BookingContext.Provider value={contextValue}>
            {children}
        </BookingContext.Provider>
    );
};

// Custom hook to use booking context
export const useBooking = () => {
    const context = useContext(BookingContext);
    if (!context) {
        throw new Error("useBooking must be used within a BookingProvider");
    }
    return context;
};

export default BookingContext;
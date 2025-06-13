import React, { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { bookingStateAtom } from "../../context/BookingContext";
import LocationInput from "./LocationInput";
import RideOptions from "./RideOptions";

const BookingForm = () => {
    const [bookingState, setBookingState] = useAtom(bookingStateAtom);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleLocationChange = (type, value) => {
        setBookingState(prev => ({
            ...prev,
            [type]: value
        }));
        
        // Clear error when user starts typing
        if (errors[type]) {
            setErrors(prev => ({
                ...prev,
                [type]: null
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!bookingState.pickup?.address) {
            newErrors.pickup = "Pickup location is required";
        }
        if (!bookingState.dropoff?.address) {
            newErrors.dropoff = "Dropoff location is required";
        }
        if (!bookingState.rideType) {
            newErrors.rideType = "Please select a ride type";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);
        try {
            // In a real app, this would make an API call to book the ride
            await new Promise(resolve => setTimeout(resolve, 1500)); // Simulated API delay
            
            // Success notification
            alert("Ride booked successfully! A driver will be assigned shortly.");
            
            // Reset form
            setBookingState({
                pickup: null,
                dropoff: null,
                rideType: null,
                estimatedPrice: null,
                estimatedTime: null
            });
        } catch (error) {
            console.error("Error booking ride:", error);
            alert("Failed to book ride. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full mx-auto">
            <div className="flex items-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="24" height="24"><rect width="256" height="256" fill="none"/><circle cx="66" cy="178" r="22" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><circle cx="190" cy="178" r="22" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="88" y1="176" x2="168" y2="176" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M212,176h24a8,8,0,0,0,8-8V128a8,8,0,0,0-8-8H208L162.34,74.34A8,8,0,0,0,156.69,72H48.28a8,8,0,0,0-6.65,3.56L12,120v48a8,8,0,0,0,8,8H44" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="208" y1="120" x2="12" y2="120" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
                <h2 className="text-2xl font-semibold ml-2">Book a Ride</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Pickup Location */}
                <div>
                    <LocationInput
                        label="Pickup Location"
                        placeholder="Enter pickup address"
                        value={bookingState.pickup}
                        onChange={(value) => handleLocationChange("pickup", value)}
                        error={errors.pickup}
                        required
                        currentLocationEnabled
                    />
                </div>

                {/* Dropoff Location */}
                <div>
                    <LocationInput
                        label="Dropoff Location"
                        placeholder="Enter destination"
                        value={bookingState.dropoff}
                        onChange={(value) => handleLocationChange("dropoff", value)}
                        error={errors.dropoff}
                        required
                    />
                </div>

                {/* Ride Options */}
                <div>
                    <RideOptions />
                    {errors.rideType && (
                        <p className="mt-1 text-sm text-red-500">{errors.rideType}</p>
                    )}
                </div>

                {/* Price Estimate */}
                {bookingState.estimatedPrice && (
                    <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600">Estimated Price:</span>
                            <span className="text-lg font-semibold">${bookingState.estimatedPrice}</span>
                        </div>
                        {bookingState.estimatedTime && (
                            <div className="flex justify-between items-center mt-2">
                                <span className="text-gray-600">Estimated Time:</span>
                                <span>{bookingState.estimatedTime} min</span>
                            </div>
                        )}
                    </div>
                )}

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`
                        w-full py-3 px-4 rounded-lg text-white font-medium
                        transition-all duration-200
                        ${isSubmitting 
                            ? "bg-uber-blue/70 cursor-not-allowed"
                            : "bg-uber-blue hover:bg-uber-blue/90 active:transform active:scale-[0.98]"
                        }
                    `}
                >
                    {isSubmitting ? (
                        <div className="flex items-center justify-center">
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                            Booking your ride...
                        </div>
                    ) : (
                        "Book Ride"
                    )}
                </button>
            </form>

            {/* Policies & Info */}
            <div className="mt-6 text-sm text-gray-500">
                <p className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="16" height="16"><rect width="256" height="256" fill="none"/><path d="M216,112V56a8,8,0,0,0-8-8H48a8,8,0,0,0-8,8v56c0,96,88,120,88,120S216,208,216,112Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><polyline points="88 136 112 160 168 104" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
                    <span className="ml-2">Your booking is protected by our policies</span>
                </p>
                <p className="flex items-center mt-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="16" height="16"><rect width="256" height="256" fill="none"/><circle cx="128" cy="128" r="96" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="160" y1="160" x2="96" y2="96" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><polyline points="160 112 160 160 112 160" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
                    <span className="ml-2">Cancellation available up to 5 minutes before pickup</span>
                </p>
            </div>
        </div>
    );
};

export default BookingForm;
import React, { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { bookingStateAtom } from "../../context/BookingContext";
import MapView from "../Map/MapView";
import BookingForm from "../Booking/BookingForm";

const HomePage = () => {
    const [bookingState] = useAtom(bookingStateAtom);
    const [showMobileForm, setShowMobileForm] = useState(false);
    const [driverLocations, setDriverLocations] = useState([
        { lng: -73.935242, lat: 40.730610 },
        { lng: -73.940242, lat: 40.735610 },
        { lng: -73.932242, lat: 40.728610 },
    ]);

    // Simulate driver movement
    useEffect(() => {
        const interval = setInterval(() => {
            setDriverLocations(prev => prev.map(loc => ({
                lng: loc.lng + (Math.random() - 0.5) * 0.001,
                lat: loc.lat + (Math.random() - 0.5) * 0.001
            })));
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative h-screen">
            {/* Desktop Layout */}
            <div className="hidden md:flex h-full">
                {/* Left Panel - Booking Form */}
                <div className="w-[450px] h-full bg-white p-6 overflow-y-auto shadow-lg z-10">
                    <BookingForm />
                </div>

                {/* Right Panel - Map */}
                <div className="flex-1 relative">
                    <MapView
                        pickupLocation={bookingState.pickup?.coordinates}
                        dropoffLocation={bookingState.dropoff?.coordinates}
                        driverLocations={driverLocations}
                    />
                </div>
            </div>

            {/* Mobile Layout */}
            <div className="md:hidden h-full">
                {/* Map takes full screen on mobile */}
                <div className="h-full">
                    <MapView
                        pickupLocation={bookingState.pickup?.coordinates}
                        dropoffLocation={bookingState.dropoff?.coordinates}
                        driverLocations={driverLocations}
                    />
                </div>

                {/* Floating button to show/hide booking form */}
                <button
                    onClick={() => setShowMobileForm(!showMobileForm)}
                    className="fixed bottom-6 right-6 z-20 bg-uber-blue text-white p-4 rounded-full shadow-lg hover:bg-uber-blue/90 transition-all duration-200"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="24" height="24"><rect width="256" height="256" fill="none"/><circle cx="66" cy="178" r="22" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><circle cx="190" cy="178" r="22" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="88" y1="176" x2="168" y2="176" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M212,176h24a8,8,0,0,0,8-8V128a8,8,0,0,0-8-8H208L162.34,74.34A8,8,0,0,0,156.69,72H48.28a8,8,0,0,0-6.65,3.56L12,120v48a8,8,0,0,0,8,8H44" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="208" y1="120" x2="12" y2="120" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
                </button>

                {/* Mobile Booking Form Modal */}
                {showMobileForm && (
                    <div className="fixed inset-0 z-30">
                        {/* Backdrop */}
                        <div 
                            className="absolute inset-0 bg-black/50"
                            onClick={() => setShowMobileForm(false)}
                        />
                        
                        {/* Form Container */}
                        <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl max-h-[90vh] overflow-y-auto">
                            <div className="p-4">
                                {/* Handle for dragging */}
                                <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-4" />
                                
                                {/* Close button */}
                                <button
                                    onClick={() => setShowMobileForm(false)}
                                    className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-700"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="24" height="24"><rect width="256" height="256" fill="none"/><circle cx="128" cy="128" r="96" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><rect x="88" y="88" width="80" height="80" rx="12"/></svg>
                                </button>

                                <BookingForm />
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Status Bar - Shows when ride is booked */}
            {bookingState.rideStatus && (
                <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg p-4 z-40">
                    <div className="container mx-auto flex items-center justify-between">
                        <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="24" height="24"><rect width="256" height="256" fill="none"/><circle cx="66" cy="178" r="22" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><circle cx="190" cy="178" r="22" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="88" y1="176" x2="168" y2="176" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M212,176h24a8,8,0,0,0,8-8V128a8,8,0,0,0-8-8H208L162.34,74.34A8,8,0,0,0,156.69,72H48.28a8,8,0,0,0-6.65,3.56L12,120v48a8,8,0,0,0,8,8H44" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="208" y1="120" x2="12" y2="120" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
                            <div className="ml-4">
                                <p className="font-semibold">Your ride is {bookingState.rideStatus}</p>
                                {bookingState.estimatedTime && (
                                    <p className="text-sm text-gray-600">
                                        Arriving in {bookingState.estimatedTime} minutes
                                    </p>
                                )}
                            </div>
                        </div>
                        <button className="text-uber-blue hover:text-uber-blue/80">
                            View Details
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HomePage;
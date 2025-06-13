import React, { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { bookingStateAtom } from "../../context/BookingContext";
import { useNavigate } from "react-router-dom";

const RideStatus = () => {
    const [booking] = useAtom(bookingStateAtom);
    const navigate = useNavigate();
    const [timeLeft, setTimeLeft] = useState(null);
    
    // Mock driver data (in a real app, this would come from an API)
    const driverInfo = {
        name: "Michael Chen",
        rating: 4.8,
        totalRides: 1243,
        vehicle: {
            make: "Toyota",
            model: "Camry",
            color: "Silver",
            plate: "ABC 123"
        },
        avatar: "https://images.unsplash.com/source-404?fit=crop&fm=jpg&h=800&q=60&w=1200"
    };

    // Calculate ETA countdown
    useEffect(() => {
        if (!booking?.estimatedTime) return;
        
        setTimeLeft(booking.estimatedTime * 60); // Convert minutes to seconds
        
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 0) {
                    clearInterval(timer);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [booking?.estimatedTime]);

    const formatTimeLeft = (seconds) => {
        if (!seconds) return "Arriving";
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
    };

    if (!booking?.rideStatus) {
        navigate("/");
        return null;
    }

    const cancelRide = () => {
        // In a real app, this would make an API call
        if (window.confirm("Are you sure you want to cancel this ride?")) {
            navigate("/");
        }
    };

    const contactDriver = () => {
        // In a real app, this would open a chat/call interface
        alert("Connecting to driver...");
    };

    return (
        <div className="max-w-2xl mx-auto p-4">
            {/* Status Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                {/* Status Header */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Your ride is {booking.rideStatus}</h1>
                        <p className="text-lg text-gray-600">
                            Arriving in {formatTimeLeft(timeLeft)}
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="text-2xl font-bold text-uber-blue">${booking.estimatedPrice}</p>
                        <p className="text-sm text-gray-500">Est. fare</p>
                    </div>
                </div>

                {/* Driver Info */}
                <div className="flex items-center p-4 bg-gray-50 rounded-lg mb-6">
                    <img
                        src={driverInfo.avatar}
                        alt={driverInfo.name}
                        className="w-16 h-16 rounded-full object-cover mr-4"
                    />
                    <div className="flex-grow">
                        <div className="flex items-center">
                            <h2 className="text-lg font-semibold">{driverInfo.name}</h2>
                            <div className="ml-2 flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="16" height="16"><rect width="256" height="256" fill="none"/><path d="M152,206.4a88,88,0,0,1,0-156.8,88,88,0,1,0,0,156.8Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><polygon points="173.46 128 156 98.33 188.59 106.4 210.39 80 213.06 114.65 244 128 213.06 141.35 210.39 176 188.59 149.6 156 157.67 173.46 128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
                                <span className="ml-1 text-gray-600">{driverInfo.rating}</span>
                            </div>
                        </div>
                        <p className="text-gray-600">{driverInfo.totalRides} trips</p>
                    </div>
                    <div className="flex space-x-2">
                        <button 
                            onClick={contactDriver}
                            className="p-2 rounded-full bg-uber-blue text-white hover:bg-uber-blue/90"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="24" height="24"><rect width="256" height="256" fill="none"/><line x1="152" y1="56" x2="200" y2="104" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="200" y1="56" x2="152" y2="104" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M156.39,153.34a8,8,0,0,1,7.59-.69l47.16,21.13a8,8,0,0,1,4.8,8.3A48.33,48.33,0,0,1,168,224,136,136,0,0,1,32,88,48.33,48.33,0,0,1,73.92,40.06a8,8,0,0,1,8.3,4.8l21.13,47.2a8,8,0,0,1-.66,7.53L81.32,125a7.93,7.93,0,0,0-.54,7.81c8.27,16.93,25.77,34.22,42.75,42.41a7.92,7.92,0,0,0,7.83-.59Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
                        </button>
                        <button 
                            onClick={contactDriver}
                            className="p-2 rounded-full bg-uber-blue text-white hover:bg-uber-blue/90"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="24" height="24"><rect width="256" height="256" fill="none"/><line x1="96" y1="100" x2="160" y2="100" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="96" y1="140" x2="160" y2="140" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M105.07,192l16,28a8,8,0,0,0,13.9,0l16-28H216a8,8,0,0,0,8-8V56a8,8,0,0,0-8-8H40a8,8,0,0,0-8,8V184a8,8,0,0,0,8,8Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
                        </button>
                    </div>
                </div>

                {/* Vehicle Info */}
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="font-semibold text-gray-900">
                                {driverInfo.vehicle.make} {driverInfo.vehicle.model}
                            </h3>
                            <p className="text-gray-600">
                                {driverInfo.vehicle.color} · {driverInfo.vehicle.plate}
                            </p>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="48" height="48"><rect width="256" height="256" fill="none"/><circle cx="66" cy="178" r="22" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><circle cx="190" cy="178" r="22" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="88" y1="176" x2="168" y2="176" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M212,176h24a8,8,0,0,0,8-8V128a8,8,0,0,0-8-8H208L162.34,74.34A8,8,0,0,0,156.69,72H48.28a8,8,0,0,0-6.65,3.56L12,120v48a8,8,0,0,0,8,8H44" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="208" y1="120" x2="12" y2="120" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
                    </div>
                </div>

                {/* Trip Details */}
                <div className="space-y-4">
                    <div className="flex items-start">
                        <div className="mt-2 mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="12" height="12"><rect width="256" height="256" fill="none"/><circle cx="128" cy="128" r="96" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><circle cx="128" cy="96" r="16"/><circle cx="128" cy="160" r="16"/></svg>
                        </div>
                        <div>
                            <p className="font-medium">Pickup</p>
                            <p className="text-gray-600">{booking.pickup?.address}</p>
                        </div>
                    </div>
                    <div className="flex items-start">
                        <div className="mt-2 mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="12" height="12"><rect width="256" height="256" fill="none"/><circle cx="128" cy="64" r="32" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="128" y1="96" x2="128" y2="176" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M172,139.75c35.44,6.37,60,20.21,60,36.25,0,22.09-46.56,40-104,40S24,198.09,24,176c0-16,24.56-29.88,60-36.25" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
                        </div>
                        <div>
                            <p className="font-medium">Dropoff</p>
                            <p className="text-gray-600">{booking.dropoff?.address}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
                <button
                    onClick={cancelRide}
                    className="flex-1 py-3 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
                >
                    Cancel Ride
                </button>
                <button
                    onClick={() => navigate("/")}
                    className="flex-1 py-3 px-4 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors duration-200"
                >
                    Back to Home
                </button>
            </div>
        </div>
    );
};

export default RideStatus;
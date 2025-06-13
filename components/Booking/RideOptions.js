import React, { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { bookingStateAtom } from "../../context/BookingContext";

const RideOptions = () => {
    const [selectedRide, setSelectedRide] = useAtom(bookingStateAtom);
    const [estimatedTime, setEstimatedTime] = useState(null);

    const rideTypes = [
        {
            id: "uberx",
            name: "UberX",
            description: "Affordable, everyday rides",
            capacity: "4",
            basePrice: 5.50,
            pricePerMile: 1.75,
            icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="40" height="40"><rect width="256" height="256" fill="none"/><line x1="16" y1="112" x2="240" y2="112" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M216,208H188a8,8,0,0,1-8-8V176H76v24a8,8,0,0,1-8,8H40a8,8,0,0,1-8-8V112L61.89,44.75A8,8,0,0,1,69.2,40H186.8a8,8,0,0,1,7.31,4.75L224,112v88A8,8,0,0,1,216,208Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>,
            eta: "3-5"
        },
        {
            id: "comfort",
            name: "Comfort",
            description: "Newer cars with extra legroom",
            capacity: "4",
            basePrice: 8.50,
            pricePerMile: 2.25,
            icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="40" height="40"><rect width="256" height="256" fill="none"/><line x1="16" y1="112" x2="240" y2="112" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M216,208H188a8,8,0,0,1-8-8V176H76v24a8,8,0,0,1-8,8H40a8,8,0,0,1-8-8V112L61.89,44.75A8,8,0,0,1,69.2,40H186.8a8,8,0,0,1,7.31,4.75L224,112v88A8,8,0,0,1,216,208Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>,
            eta: "4-6"
        },
        {
            id: "uberxl",
            name: "UberXL",
            description: "SUVs and minivans",
            capacity: "6",
            basePrice: 10.50,
            pricePerMile: 2.75,
            icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="40" height="40"><rect width="256" height="256" fill="none"/><line x1="16" y1="112" x2="240" y2="112" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M216,208H188a8,8,0,0,1-8-8V176H76v24a8,8,0,0,1-8,8H40a8,8,0,0,1-8-8V112L61.89,44.75A8,8,0,0,1,69.2,40H186.8a8,8,0,0,1,7.31,4.75L224,112v88A8,8,0,0,1,216,208Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>,
            eta: "5-7"
        },
        {
            id: "black",
            name: "Uber Black",
            description: "Premium rides in luxury cars",
            capacity: "4",
            basePrice: 15.00,
            pricePerMile: 3.50,
            icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="40" height="40"><rect width="256" height="256" fill="none"/><line x1="16" y1="112" x2="240" y2="112" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M216,208H188a8,8,0,0,1-8-8V176H76v24a8,8,0,0,1-8,8H40a8,8,0,0,1-8-8V112L61.89,44.75A8,8,0,0,1,69.2,40H186.8a8,8,0,0,1,7.31,4.75L224,112v88A8,8,0,0,1,216,208Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>,
            eta: "7-10"
        }
    ];

    const calculatePrice = (basePrice, pricePerMile) => {
        // In a real app, this would use actual route distance
        const mockDistanceInMiles = 5.2;
        const surge = 1.2; // Mock surge pricing multiplier
        return ((basePrice + (pricePerMile * mockDistanceInMiles)) * surge).toFixed(2);
    };

    const handleRideSelect = (ride) => {
        setSelectedRide({
            ...selectedRide,
            rideType: ride.id,
            estimatedPrice: calculatePrice(ride.basePrice, ride.pricePerMile),
            estimatedTime: ride.eta
        });
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-semibold mb-4">Choose a ride</h2>
            
            <div className="space-y-3">
                {rideTypes.map((ride) => (
                    <button
                        key={ride.id}
                        onClick={() => handleRideSelect(ride)}
                        className={`w-full flex items-center p-3 rounded-lg transition-all duration-200 ${
                            selectedRide?.rideType === ride.id
                                ? "bg-uber-blue/10 border-2 border-uber-blue"
                                : "border-2 border-gray-100 hover:border-gray-200"
                        }`}
                    >
                        {/* Ride Icon */}
                        <div className="flex-shrink-0">
                            <div className="w-12 h-12 flex items-center justify-center">
                                {ride.icon}
                            </div>
                        </div>

                        {/* Ride Details */}
                        <div className="flex-grow ml-4">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-medium">{ride.name}</h3>
                                    <p className="text-sm text-gray-500">{ride.description}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-semibold">
                                        ${calculatePrice(ride.basePrice, ride.pricePerMile)}
                                    </p>
                                    <p className="text-sm text-gray-500">{ride.eta} min</p>
                                </div>
                            </div>

                            {/* Additional Info */}
                            <div className="flex items-center mt-2 text-sm text-gray-500">
                                <span className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="16" height="16"><rect width="256" height="256" fill="none"/><circle cx="128" cy="128" r="96" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><circle cx="128" cy="80" r="20"/><line x1="84" y1="120" x2="172" y2="120" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><polyline points="156 180 128 136 100 180" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="128" y1="120" x2="128" y2="136" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
                                    <span className="ml-1">Up to {ride.capacity}</span>
                                </span>
                                
                                {selectedRide?.rideType === ride.id && (
                                    <span className="ml-4 text-uber-blue font-medium">
                                        Best option
                                    </span>
                                )}
                            </div>
                        </div>
                    </button>
                ))}
            </div>

            {/* Surge Pricing Indicator (if applicable) */}
            <div className="mt-4 text-sm text-gray-500 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="16" height="16"><rect width="256" height="256" fill="none"/><polygon points="160 16 148 96 208 120 96 240 108 160 48 136 160 16" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
                <span className="ml-2">
                    Fares are higher due to increased demand
                </span>
            </div>
        </div>
    );
};

export default RideOptions;
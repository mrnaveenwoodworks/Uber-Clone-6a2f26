import React, { useState } from "react";
import { useAtom } from "jotai";
import { userStateAtom } from "../../context/UserContext";

const UserProfile = () => {
    const [activeTab, setActiveTab] = useState("rides");
    const [userState] = useAtom(userStateAtom);

    // Mock data (in a real app, this would come from an API)
    const mockUser = {
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "+1 (555) 123-4567",
        avatar: "https://images.unsplash.com/source-404?fit=crop&fm=jpg&h=800&q=60&w=1200",
        rating: 4.85,
        memberSince: "January 2022"
    };

    const rideHistory = [
        {
            id: 1,
            date: "2023-11-15",
            pickup: "123 Main St",
            dropoff: "456 Market St",
            price: 24.50,
            driver: {
                name: "Michael Chen",
                avatar: "https://images.unsplash.com/source-404?fit=crop&fm=jpg&h=800&q=60&w=1200",
                rating: 4.9
            },
            status: "completed"
        },
        {
            id: 2,
            date: "2023-11-14",
            pickup: "789 Park Ave",
            dropoff: "321 Lake St",
            price: 18.75,
            driver: {
                name: "Sarah Johnson",
                avatar: "https://images.unsplash.com/source-404?fit=crop&fm=jpg&h=800&q=60&w=1200",
                rating: 4.8
            },
            status: "completed"
        }
    ];

    const savedPlaces = [
        {
            id: 1,
            name: "Home",
            address: "123 Main Street, Apt 4B",
            icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="24" height="24"><rect width="256" height="256" fill="none"/><path d="M40,216H216V120a8,8,0,0,0-2.34-5.66l-80-80a8,8,0,0,0-11.32,0l-80,80A8,8,0,0,0,40,120Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
        },
        {
            id: 2,
            name: "Work",
            address: "456 Business Ave, Floor 12",
            icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="24" height="24"><rect width="256" height="256" fill="none"/><line x1="24" y1="216" x2="244" y2="216" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="84" y1="80" x2="92" y2="80" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="132" y1="80" x2="140" y2="80" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="84" y1="120" x2="92" y2="120" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="132" y1="120" x2="140" y2="120" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><polyline points="88 216 88 160 136 160 136 216" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="48" y1="40" x2="48" y2="216" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="176" y1="216" x2="176" y2="40" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="40" y1="40" x2="184" y2="40" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="220" y1="216" x2="220" y2="88" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="176" y1="88" x2="228" y2="88" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
        },
        {
            id: 3,
            name: "Gym",
            address: "789 Fitness Lane",
            icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="24" height="24"><rect width="256" height="256" fill="none"/><rect x="60" y="56" width="40" height="144" rx="8" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><rect x="156" y="56" width="40" height="144" rx="8" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M196,80h28a8,8,0,0,1,8,8v80a8,8,0,0,1-8,8H196" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M60,176H32a8,8,0,0,1-8-8V88a8,8,0,0,1,8-8H60" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="100" y1="128" x2="156" y2="128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="232" y1="128" x2="244" y2="128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="12" y1="128" x2="24" y2="128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
        }
    ];

    const paymentMethods = [
        {
            id: 1,
            type: "credit",
            last4: "4242",
            expiry: "12/24",
            brand: "Visa",
            icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="24" height="24"><rect width="256" height="256" fill="none"/><rect x="24" y="56" width="208" height="144" rx="8" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="164" y1="164" x2="196" y2="164" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="116" y1="164" x2="128" y2="164" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="24" y1="100" x2="232" y2="100" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
        },
        {
            id: 2,
            type: "paypal",
            email: "john.doe@example.com",
            icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="24" height="24"><rect width="256" height="256" fill="none"/><path d="M144,128a48,48,0,0,0,46.56-36.36h0A48,48,0,0,0,144,32H84a8,8,0,0,0-7.76,6.06l-36,144A8,8,0,0,0,48,192H79.51a8,8,0,0,0,7.76-6.06l13-51.88A8,8,0,0,1,108,128Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M87.27,185.94l-7,28.12A8,8,0,0,0,88,224h31.51a8,8,0,0,0,7.76-6.06l9-35.88A8,8,0,0,1,144,176h32a48,48,0,0,0,46.56-36.36h0A48,48,0,0,0,176,80H120a8,8,0,0,0-7.76,6.06l-12,48" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
        }
    ];

    const renderTab = () => {
        switch (activeTab) {
            case "rides":
                return (
                    <div className="space-y-4">
                        {rideHistory.map(ride => (
                            <div key={ride.id} className="bg-white rounded-lg shadow p-4">
                                <div className="flex items-center justify-between mb-3">
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            {new Date(ride.date).toLocaleDateString()}
                                        </p>
                                        <p className="font-medium">${ride.price.toFixed(2)}</p>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-sm ${
                                        ride.status === "completed" 
                                            ? "bg-green-100 text-green-800" 
                                            : "bg-yellow-100 text-yellow-800"
                                    }`}>
                                        {ride.status}
                                    </span>
                                </div>
                                
                                <div className="flex items-center space-x-3 mb-3">
                                    <img
                                        src={ride.driver.avatar}
                                        alt={ride.driver.name}
                                        className="w-10 h-10 rounded-full object-cover"
                                    />
                                    <div>
                                        <p className="font-medium">{ride.driver.name}</p>
                                        <div className="flex items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="16" height="16"><rect width="256" height="256" fill="none"/><path d="M152,206.4a88,88,0,0,1,0-156.8,88,88,0,1,0,0,156.8Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><polygon points="173.46 128 156 98.33 188.59 106.4 210.39 80 213.06 114.65 244 128 213.06 141.35 210.39 176 188.59 149.6 156 157.67 173.46 128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
                                            <span className="ml-1 text-sm text-gray-600">
                                                {ride.driver.rating}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center">
                                        <div className="w-6">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="16" height="16"><rect width="256" height="256" fill="none"/><circle cx="128" cy="128" r="96" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><circle cx="128" cy="96" r="16"/><circle cx="128" cy="160" r="16"/></svg>
                                        </div>
                                        <p className="text-sm text-gray-600">{ride.pickup}</p>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="w-6">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="16" height="16"><rect width="256" height="256" fill="none"/><circle cx="128" cy="64" r="32" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="128" y1="96" x2="128" y2="176" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M172,139.75c35.44,6.37,60,20.21,60,36.25,0,22.09-46.56,40-104,40S24,198.09,24,176c0-16,24.56-29.88,60-36.25" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
                                        </div>
                                        <p className="text-sm text-gray-600">{ride.dropoff}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                );

            case "places":
                return (
                    <div className="space-y-4">
                        {savedPlaces.map(place => (
                            <div key={place.id} className="bg-white rounded-lg shadow p-4 flex items-center">
                                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                                    {place.icon}
                                </div>
                                <div className="ml-4">
                                    <h3 className="font-medium">{place.name}</h3>
                                    <p className="text-sm text-gray-600">{place.address}</p>
                                </div>
                            </div>
                        ))}
                        <button className="w-full py-3 text-uber-blue hover:bg-gray-50 rounded-lg border-2 border-dashed border-uber-blue flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="20" height="20"><rect width="256" height="256" fill="none"/><circle cx="128" cy="128" r="96" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="88" y1="128" x2="168" y2="128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="128" y1="88" x2="128" y2="168" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
                            <span className="ml-2">Add New Place</span>
                        </button>
                    </div>
                );

            case "payment":
                return (
                    <div className="space-y-4">
                        {paymentMethods.map(method => (
                            <div key={method.id} className="bg-white rounded-lg shadow p-4 flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                                        {method.icon}
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="font-medium">
                                            {method.type === "credit" 
                                                ? `•••• ${method.last4}`
                                                : "PayPal"
                                            }
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            {method.type === "credit"
                                                ? `Expires ${method.expiry}`
                                                : method.email
                                            }
                                        </p>
                                    </div>
                                </div>
                                <button className="text-gray-400 hover:text-gray-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="20" height="20"><rect width="256" height="256" fill="none"/><rect x="48" y="120" width="88" height="88" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M208,188v12a8,8,0,0,1-8,8H180" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="208" y1="116" x2="208" y2="140" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M184,48h16a8,8,0,0,1,8,8V72" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="116" y1="48" x2="140" y2="48" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M48,76V56a8,8,0,0,1,8-8H68" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
                                </button>
                            </div>
                        ))}
                        <button className="w-full py-3 text-uber-blue hover:bg-gray-50 rounded-lg border-2 border-dashed border-uber-blue flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="20" height="20"><rect width="256" height="256" fill="none"/><circle cx="128" cy="128" r="96" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="88" y1="128" x2="168" y2="128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="128" y1="88" x2="128" y2="168" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
                            <span className="ml-2">Add Payment Method</span>
                        </button>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-4">
            {/* Profile Header */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                <div className="flex items-center">
                    <img
                        src={mockUser.avatar}
                        alt={mockUser.name}
                        className="w-20 h-20 rounded-full object-cover"
                    />
                    <div className="ml-6">
                        <h1 className="text-2xl font-bold">{mockUser.name}</h1>
                        <div className="flex items-center mt-1">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="16" height="16"><rect width="256" height="256" fill="none"/><path d="M152,206.4a88,88,0,0,1,0-156.8,88,88,0,1,0,0,156.8Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><polygon points="173.46 128 156 98.33 188.59 106.4 210.39 80 213.06 114.65 244 128 213.06 141.35 210.39 176 188.59 149.6 156 157.67 173.46 128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
                            <span className="ml-1 text-gray-600">{mockUser.rating}</span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">Member since {mockUser.memberSince}</p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="font-medium">{mockUser.email}</p>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-500">Phone</p>
                        <p className="font-medium">{mockUser.phone}</p>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="flex border-b">
                    <button
                        onClick={() => setActiveTab("rides")}
                        className={`flex-1 py-4 text-center font-medium ${
                            activeTab === "rides"
                                ? "text-uber-blue border-b-2 border-uber-blue"
                                : "text-gray-500 hover:text-gray-700"
                        }`}
                    >
                        Ride History
                    </button>
                    <button
                        onClick={() => setActiveTab("places")}
                        className={`flex-1 py-4 text-center font-medium ${
                            activeTab === "places"
                                ? "text-uber-blue border-b-2 border-uber-blue"
                                : "text-gray-500 hover:text-gray-700"
                        }`}
                    >
                        Saved Places
                    </button>
                    <button
                        onClick={() => setActiveTab("payment")}
                        className={`flex-1 py-4 text-center font-medium ${
                            activeTab === "payment"
                                ? "text-uber-blue border-b-2 border-uber-blue"
                                : "text-gray-500 hover:text-gray-700"
                        }`}
                    >
                        Payment
                    </button>
                </div>

                <div className="p-6">
                    {renderTab()}
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
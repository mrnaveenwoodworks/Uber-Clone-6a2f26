import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { userStateAtom } from "../../context/UserContext"; // Corrected import path

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [userDropdownOpen, setUserDropdownOpen] = useState(false);
    const [userState, setUserState] = useAtom(userStateAtom); // Use setUserState for actions like sign out
    const navigate = useNavigate();

    // User data now comes from userStateAtom
    const currentUser = userState.profile;
    const isLoggedIn = userState.isLoggedIn;

    const navigationItems = [
        { name: "Ride", path: "/", icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="20" height="20"><rect width="256" height="256" fill="none"/><line x1="16" y1="112" x2="240" y2="112" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M216,208H188a8,8,0,0,1-8-8V176H76v24a8,8,0,0,1-8,8H40a8,8,0,0,1-8-8V112L61.89,44.75A8,8,0,0,1,69.2,40H186.8a8,8,0,0,1,7.31,4.75L224,112v88A8,8,0,0,1,216,208Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg> },
        { name: "Drive", path: "/drive", icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="20" height="20"><rect width="256" height="256" fill="none"/><circle cx="128" cy="144" r="16"/><circle cx="128" cy="128" r="96" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M33.6,145.55a128,128,0,0,1,188.8,0" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M139.26,223.35l18.79-50.16a8,8,0,0,1,7.5-5.19H215.3" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M116.69,223.34,97.94,173.2a8,8,0,0,0-7.49-5.2H40.7" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg> },
        { name: "Business", path: "/business", icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="20" height="20"><rect width="256" height="256" fill="none"/><line x1="112" y1="100" x2="144" y2="100" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><rect x="32" y="60" width="192" height="144" rx="8" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M168,60V40a16,16,0,0,0-16-16H104A16,16,0,0,0,88,40V60" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M224,114.31A191.09,191.09,0,0,1,128,140a191.14,191.14,0,0,1-96-25.68" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg> },
    ];

    const handleSignOut = () => {
        // Example sign-out logic: update atom and navigate
        setUserState({
            isLoggedIn: false,
            profile: null,
            preferences: {
                darkMode: false,
                notificationsEnabled: true,
            }
        });
        navigate("/login"); // Or to home page, depending on app flow
        console.log("Sign out clicked");
    };

    const userMenuItems = [
        {
            name: "Trips",
            icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="20" height="20"><rect width="256" height="256" fill="none"/><circle cx="128" cy="128" r="96" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><polyline points="128 72 128 128 184 128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>,
            action: () => navigate("/profile") // Assuming profile page shows trips
        },
        {
            name: "Payment",
            icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="20" height="20"><rect width="256" height="256" fill="none"/><rect x="24" y="56" width="208" height="144" rx="8" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="164" y1="164" x2="196" y2="164" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="116" y1="164" x2="128" y2="164" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="24" y1="100" x2="232" y2="100" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>,
            action: () => navigate("/profile") // Assuming profile page shows payment
        },
        {
            name: "Settings",
            icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="20" height="20"><rect width="256" height="256" fill="none"/><circle cx="128" cy="128" r="40" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M41.43,178.09A99.14,99.14,0,0,1,31.36,153.8l16.78-21a81.59,81.59,0,0,1,0-9.64l-16.77-21a99.43,99.43,0,0,1,10.05-24.3l26.71-3a81,81,0,0,1,6.81-6.81l3-26.7A99.14,99.14,0,0,1,102.2,31.36l21,16.78a81.59,81.59,0,0,1,9.64,0l21-16.77a99.43,99.43,0,0,1,24.3,10.05l3,26.71a81,81,0,0,1,6.81,6.81l26.7,3a99.14,99.14,0,0,1,10.07,24.29l-16.78,21a81.59,81.59,0,0,1,0,9.64l16.77,21a99.43,99.43,0,0,1-10,24.3l-26.71,3a81,81,0,0,1-6.81,6.81l-3,26.7a99.14,99.14,0,0,1-24.29,10.07l-21-16.78a81.59,81.59,0,0,1-9.64,0l-21,16.77a99.43,99.43,0,0,1-24.3-10l-3-26.71a81,81,0,0,1-6.81-6.81Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>,
            action: () => navigate("/settings")
        },
        {
            name: "Help",
            icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="20" height="20"><rect width="256" height="256" fill="none"/><circle cx="128" cy="128" r="96" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>,
            action: () => navigate("/help")
        },
        {
            name: "Sign Out",
            icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="20" height="20"><rect width="256" height="256" fill="none"/><polyline points="112 40 48 40 48 216 112 216" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="112" y1="128" x2="224" y2="128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><polyline points="184 88 224 128 184 168" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>,
            action: handleSignOut
        }
    ];


    return (
        <nav className="bg-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Logo and Main Navigation */}
                    <div className="flex">
                        {/* Logo */}
                        <div className="flex-shrink-0 flex items-center">
                            <Link to="/" className="text-2xl font-bold text-uber-black">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="80" height="28"><rect width="256" height="256" fill="none"/><rect x="40" y="40" width="176" height="176" rx="8" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><rect x="96" y="96" width="64" height="64" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
                            </Link>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                            {navigationItems.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.path}
                                    className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:text-uber-blue"
                                >
                                    <span className="mr-2">{item.icon}</span>
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Right side menu */}
                    <div className="flex items-center">
                        {isLoggedIn && currentUser ? (
                            <>
                                {/* Notification Bell */}
                                <button className="p-2 rounded-full text-gray-600 hover:text-uber-blue hover:bg-gray-100">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="24" height="24"><rect width="256" height="256" fill="none"/><path d="M56,104a72,72,0,0,1,144,0c0,35.82,8.3,56.6,14.9,68A8,8,0,0,1,208,184H48a8,8,0,0,1-6.88-12C47.71,160.6,56,139.81,56,104Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="96" y1="224" x2="160" y2="224" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
                                </button>

                                {/* User Profile Dropdown */}
                                <div className="ml-3 relative">
                                    <button
                                        onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                                        className="flex items-center space-x-3 p-2 rounded-full hover:bg-gray-100 focus:outline-none"
                                    >
                                        <img
                                            className="h-8 w-8 rounded-full object-cover"
                                            src={currentUser.avatar || "https://images.unsplash.com/source-404?fit=crop&fm=jpg&h=800&q=60&w=1200"}
                                            alt="User avatar"
                                        />
                                        <span className="hidden md:inline-block text-sm font-medium text-gray-700">
                                            {currentUser.name}
                                        </span>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="20" height="20"><rect width="256" height="256" fill="none"/><path d="M216,112V56a8,8,0,0,0-8-8H48a8,8,0,0,0-8,8v56c0,96,88,120,88,120S216,208,216,112Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><polyline points="201.97 171.78 128 120 54.03 171.78" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
                                    </button>

                                    {/* Dropdown Menu */}
                                    {userDropdownOpen && (
                                        <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 z-50">
                                            {/* User Info */}
                                            <div className="px-4 py-3">
                                                <p className="text-sm font-medium text-gray-900">{currentUser.name}</p>
                                                <p className="text-sm text-gray-500 truncate">{currentUser.email}</p>
                                            </div>

                                            {/* Menu Items */}
                                            <div className="py-1">
                                                {userMenuItems.map((item) => (
                                                    <button
                                                        key={item.name}
                                                        onClick={() => {
                                                            setUserDropdownOpen(false);
                                                            item.action();
                                                        }}
                                                        className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                    >
                                                        <span className="mr-3">{item.icon}</span>
                                                        {item.name}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </>
                        ) : (
                            // Login/Signup buttons if not logged in
                            <div className="hidden sm:flex sm:items-center sm:space-x-4">
                                <Link
                                    to="/login"
                                    className="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-uber-blue hover:bg-gray-50"
                                >
                                    Log In
                                </Link>
                                <Link
                                    to="/signup"
                                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-uber-blue hover:bg-uber-blue/90"
                                >
                                    Sign Up
                                </Link>
                            </div>
                        )}


                        {/* Mobile menu button */}
                        <div className="flex items-center sm:hidden ml-3">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                            >
                                {isMenuOpen ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="24" height="24"><rect width="256" height="256" fill="none"/><rect x="40" y="40" width="176" height="176" rx="8" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="160" y1="96" x2="96" y2="160" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="96" y1="96" x2="160" y2="160" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="24" height="24"><rect width="256" height="256" fill="none"/><polyline points="24 180 68 164 108 180 148 164 188 180 232 164" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="24" y1="128" x2="232" y2="128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M208,172.73V184a32,32,0,0,1-32,32H80a32,32,0,0,1-32-32V171.27" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M48.2,92a8,8,0,0,1-7.83-10.29C49.49,53.24,85.26,32,128,32s78.52,21.25,87.63,49.73A8,8,0,0,1,207.8,92Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isMenuOpen && (
                <div className="sm:hidden">
                    <div className="pt-2 pb-3 space-y-1">
                        {navigationItems.map((item) => (
                            <Link
                                key={item.name}
                                to={item.path}
                                className="flex items-center px-4 py-2 text-base font-medium text-gray-700 hover:text-uber-blue hover:bg-gray-50"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <span className="mr-3">{item.icon}</span>
                                {item.name}
                            </Link>
                        ))}
                         {!isLoggedIn && (
                            <>
                                <Link
                                    to="/login"
                                    className="block px-4 py-2 text-base font-medium text-gray-700 hover:text-uber-blue hover:bg-gray-50"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Log In
                                </Link>
                                <Link
                                    to="/signup"
                                    className="block px-4 py-2 text-base font-medium text-white bg-uber-blue hover:bg-uber-blue/90 rounded-md mx-2"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
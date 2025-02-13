"use client";

import Navigation from './Navigation';
import Logo from './Logo';
import { useEffect, useState } from "react";


export default function Header() {

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    
    useEffect(() => {
    }, []);


    const closeSidebar = () => {
        setIsSidebarOpen(false);
    }

    return (
        <header className={`sticky h-24 top-0 z-50 bg-white px-48 max-[888px]:px-16 ${!isSidebarOpen ? "drop-shadow-xl" : ""}`}>
            <div className={`flex items-center justify-between w-full px-4 gap-16 h-full`}>
                <button
                    className="block min-[888px]:hidden p-2"
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    aria-label="Toggle Navigation"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                </button>

                    <div className="mx-auto min-[888px]:mx-0">
                        <Logo width={80} height={48} />
                    </div>

                    <div className={`hidden min-[888px]:block ${!isSidebarOpen ? "h-full" : ""}`}>
                        <Navigation />
                    </div>
            </div>
            {isSidebarOpen && (
            <div className={`fixed inset-0 z-40 min-[888px]:hidden ${isSidebarOpen ? "block" : "hidden"}`} >
                <div className={`fixed top-0 left-0 w-64 bg-white shadow-md z-50 flex flex-col ${isSidebarOpen ? "h-full" : ""}`}>
                    <button
                        className="p-4 self-end"
                        onClick={closeSidebar}
                        aria-label="Close Sidebar"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    <Navigation isSidebar closeSidebar={closeSidebar} />
                </div>
                <div className="fixed bg-gray-800 bg-opacity-50 w-full h-full" onClick={closeSidebar}>

                </div>
            </div>
            )}
        </header>
    );
}

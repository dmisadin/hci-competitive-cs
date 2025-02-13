"use client"

import { apiUrlBase } from "@/shared/constants";
import { Offer } from "@/shared/interfaces";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./navigation.module.css";
import { usePathname } from "next/navigation";

const getOffers = async () => {
    try {
        const res = await axios.get(`${apiUrlBase}/offers`);
        return res.data.data;
    } catch (error) {
        console.error('Error fetching offers:', error);
        return [];
    }
};

export default function Navigation({ isSidebar = false,  closeSidebar }: { isSidebar?: boolean, closeSidebar?: () => void }) {
    const [offersSubroutes, setOffersSubroutes] = useState<Subroute[]>([]);
    const pathname = usePathname();

    useEffect(() => {
        const fetchOffers = async () => {
            try {
                const offers = await getOffers();
                const mappedSubroutes = offers.map((o: Offer) => ({
                    name: o.attributes.Name,
                    href: `/offers/${o.id}`,
                }));
                setOffersSubroutes(mappedSubroutes);
            } catch (error) {
                console.error("Error in fetchOffers:", error);
            } finally {
                //setLoading(false);
            }
        };

        fetchOffers();
    }, [])

    const navigation = [
        {
            name: "Offers",
            href: offersSubroutes.at(0)?.href ?? "/offers",
            subroutes: offersSubroutes,
        },
        {
            name: "Cost Calculator",
            href: "/cost-calculator",
        },
        {
            name: "Contact",
            href: "/contact",
        },
        {
            name: "FAQ",
            href: "/faq",
        },
    ];

    const handleLinkClick = () => {
        if (isSidebar) {
            if(closeSidebar)
                closeSidebar();
        }
    };

    return (
        <nav className={`h-full ${isSidebar ? "mt-4" : "text-[#616161]"}`}>
            <ul className={`h-full ${isSidebar ? "flex flex-col gap-y-8" : "flex"}`}>
                {navigation.map((item) => {
                    const isActive = pathname.startsWith(item.href)
                    
                    return (
                        <li key={item.name} className={`${!isSidebar ? "h-full" : ""} relative group whitespace-nowrap`}>
                            <Link
                                href={item.href}
                                onClick={handleLinkClick}
                                className={`flex items-center ${styles['nav-route']} block ${
                                    isSidebar
                                        ? "h-16 px-6 text-lg font-bold hover:bg-blue-600 hover:text-white"
                                        : "h-full hover:bg-blue-600 hover:text-white transition duration-200 p-8"
                                } ${
                                    isActive
                                        ? "bg-blue-600 text-white font-bold"
                                        : ""}`}
                            >
                                {item.name}
                            </Link>

                            {item.subroutes && (
                                <ul
                                    className={`${styles['nav-subroute']} z-50 ${
                                        isSidebar
                                            ? "px-8 space-y-2"
                                            : "absolute left-0 mt-2 min-w-64 bg-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                                    }`}
                                >
                                    {item.subroutes.map((subitem) => (
                                        <li key={subitem.name}>
                                            <Link
                                                href={subitem.href}
                                                onClick={handleLinkClick}
                                                className={`block ${
                                                    isSidebar
                                                        ? "text-sm hover:underline"
                                                        : "p-4 hover:text-blue-600 transition duration-200"
                                                }`}
                                            >
                                                {subitem.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    )
                })}
            </ul>
        </nav>
    );
}

interface Subroute {
    name: string;
    href: string;
}
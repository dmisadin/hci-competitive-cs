"use client"

import { apiUrlBase } from '@/shared/constants';
import { Offer } from '@/shared/interfaces';
import axios from 'axios';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const getOffers = async () => {
    try {
        const res = await axios.get(`${apiUrlBase}/offers`);
        return res.data.data; // Adjust based on your API's response structure
    } catch (error) {
        console.error('Error fetching offers:', error);
        return [];
    }
};

export default function OffersLayout({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        document.title = 'Akrasol - Offers';
      }, []);

    const [offers, setOffers] = useState<Offer[]>([]);
    
    const pathname = usePathname();

    useEffect(() => {
        const fetchOffers = async () => {
            try {
                const offers = await getOffers();
                setOffers(offers);
            } catch (error) {
                console.error("Error in fetchOffers:", error);
            }
        };

        fetchOffers();
    }, []);



    return (
        <div className='px-48 max-[888px]:px-16 py-8'>
            <h1 className='mb-8'>Special Offers</h1>
            <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400" style={{ listStyle: 'none', gap: '1rem' }}>
                {offers.map((offer: Offer) => (
                    <Link href={`/offers/${offer.id}`} key={offer.id}>
                        <li className={pathname == `/offers/${offer.id}` 
                                    ? "inline-block p-4 rounded-t-lg active text-blue-600 bg-gray-100 dark:bg-gray-800 dark:text-blue-500 cursor-pointer"
                                    : "me-2 inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300 cursor-pointer"
                            }>
                            {offer.attributes.Name}
                        </li>
                    </Link>
                ))}
            </ul>
            <div>
                {children}
            </div>
        </div>
    );
}

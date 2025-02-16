import { apiUrlBase } from '@/shared/constants';
import axios from 'axios';
import { notFound } from 'next/navigation';
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Akrasol - Offers',
    description: 'Welcome to our offers',
  };


const fetchOffer = async (offerId: string) => {
    try {
        const res = await axios.get(`${apiUrlBase}/offers/${offerId}`);
        return res.data.data;
    } catch (error: any) {
        if (error.response?.status === 404) {
            console.error(`Offer ${offerId} not found.`);
            return null;  // Return null instead of throwing an error
        }
        throw error; // Re-throw for other errors
    }
};


export default async function OfferDetailsPage({ params }: { params: { offerId: string } }) {
    const offer = await fetchOffer(params.offerId);

    if (!offer) {
        return notFound();
    }

    const endingOn = new Date(offer.attributes.EndingOn);
    const formatter = new Intl.DateTimeFormat("en-US", {
        dateStyle: "long", // "Thursday, March 20, 2025"
    });


    return (
        /*
        <div>
            <h2>{offer.attributes.Name}</h2>
            <p>{offer.attributes.Description}</p>
            <p>Ending on: {offer.attributes.EndingOn}</p>
        </div>
        */
        <section className="bg-white px-4 py-8 antialiased dark:bg-gray-900 md:py-16">
            <div className="w-full grid rounded-lg bg-blue-50 p-4 dark:bg-blue-800 md:p-8 lg:grid-cols-12 lg:gap-8 lg:p-16 xl:gap-16 gap-8">
                <div className="lg:col-span-5 lg:mt-0">
                    <img className="mb-4 h-56 w-56 sm:h-96 sm:w-96 md:h-full md:w-full rounded-xl aspect-square max-w-[512px] md:max-w-none md:flex-grow" src={"/images/offers/" + params.offerId + ".webp"} alt="peripherals" />
                </div>
                <div className="h-full me-auto place-self-center lg:col-span-7 flex flex-col justify-between">
                    <h1 className="mb-3 text-2xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-4xl">
                        {offer.attributes.Name}
                    </h1>
                    <p className="mb-6 text-base md:text-xl text-gray-500 dark:text-gray-400 inline-block max-w-300px" style={{ lineHeight: "2em" }}>{offer.attributes.Description}</p>
                    <div>
                        <p className="mb-6 font-semibold text-gray-500 dark:text-gray-400">Offer is ending on: </p>
                        <p className="mb-6 text-xl text-gray-500 dark:text-gray-400">{formatter.format(endingOn)}</p>
                    </div>
                    <button className="inline-flex items-center justify-center rounded-lg bg-blue-700 px-5 py-3 text-center text-base font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"> Order now </button>
                </div>
            </div>
        </section>
    );
}

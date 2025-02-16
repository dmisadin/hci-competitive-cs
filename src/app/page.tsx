import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBolt, faSackDollar, faLeaf } from '@fortawesome/free-solid-svg-icons';
import Section from './components/Header/Section'
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Akrasol - Home',
    description: 'Welcome to the Akrasol Home page',
  };

export default function HomePage() {
    return (
        <div>
            <div className="w-full h-[582px] bg-cover bg-center px-48 max-[888px]:px-16" 
                style={{ backgroundImage: 'linear-gradient(0deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0) 100%), url(/images/panels-hero.png)' }}>
                <div className="min-[888px]:w-[461px] h-full bg-[#212121]/40 text-white flex flex-col justify-end p-10" >
                    <h1 className="text-5xl mb-8">Power Your Future with Solar</h1>
                    <p className="text-base mb-16">Take control of your energy with reliable, affordable, and sustainable solar solutions designed to save you money and protect the planet.</p>
                    <Link href="/cost-calculator">
                        <button className="bg-blue-600 hover:bg-blue-700 p-8 font-bold text-xl w-full">Get Your Free Quote</button>
                    </Link>
                </div>
            </div>
            <div className="p-8 px-48 max-[888px]:px-16 flex flex-col justify-center gap-x-20 gap-y-8 md:flex-row md:w-full">
                <div className="flex flex-row gap-4 justify-center md:flex-col">
                    <FontAwesomeIcon icon={faBolt} size="2x" className="text-[#616161]" />
                    <span className='text-sm text-[#616161] text-center inline-flex items-center'>Power your home</span>
                </div>
                <div className="flex flex-row gap-4 justify-center md:flex-col">
                    <FontAwesomeIcon icon={faSackDollar} size="2x" className="text-[#616161]" />
                    <span className='text-sm text-[#616161] text-center inline-flex items-center'>Save money</span>
                </div>
                <div className="flex flex-row gap-4 justify-center md:flex-col md:items-center">
                    <FontAwesomeIcon icon={faLeaf} size="2x" className="text-[#616161]" />
                    <span className='text-sm text-[#616161] text-center inline-flex items-center'>No emmisions</span>
                </div>
            </div>
            <div className='px-48 max-[888px]:px-16'>
                <Section image='/images/setup.png'
                         title='Expert Installation'
                         description='From consultation to completion, our certified professionals ensure a seamless and efficient installation process, delivering top-tier craftsmanship you can trust.'
                         direction='flex-row'>
                </Section>
                <Section outerBackgroundImage='/images/panel-closeup.jpg'
                         title='Tailored Solutions for Your Home'
                         description='We analyze your energy needs and preferences to design a custom solar solution that maximizes your savings and sustainability goals.'
                         direction='flex-row-reverse'
                         innerBackgroundColor='#212121'>
                </Section>
                <Section image='/images/layered-panel.png'
                         title='Innovative Solar Technology'
                         description='Discover the cutting-edge advancements powering our solar panels, from high-efficiency cells to robust durability for long-term performance.'
                         direction='flex-row-reverse'>
                </Section>
            </div>
        </div>
    );
}

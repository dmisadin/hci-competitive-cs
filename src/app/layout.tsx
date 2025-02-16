import type { Metadata } from 'next';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import Header from './components/Header/Header';
import './globals.css';
import { raleway } from '@/shared/fonts';
import Footer from './components/Footer/Footer';

config.autoAddCss = false;

export const metadata: Metadata = {
    title: 'Akrasol',
    description: 'Your place for everything solar',
    icons: {
        icon: '/svg/logo.svg',
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
                <meta name="description" content="Your place for everything solar" />
                <title>Akrasol</title>
            </head>
            <body className={`${raleway.className} antialiased flex flex-col min-h-screen bg-white`}>
                <Header />
                <main className='flex-grow'>{children}</main>
                <Footer />
            </body>
        </html>
    );
}

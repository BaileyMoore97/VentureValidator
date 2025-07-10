import Image from 'next/image';
import { Geist, Geist_Mono } from 'next/font/google';
import ShoppingListPlanner from '@/components/ShoppingListPlanner';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

const Index = () => {
    return (
        <div className="h-screen">
                <ShoppingListPlanner />
        </div>
    );
};

export default Index;

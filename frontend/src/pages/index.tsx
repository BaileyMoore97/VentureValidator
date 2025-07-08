import Image from 'next/image';
import { Geist, Geist_Mono } from 'next/font/google';
import ShoppingList from '@/components/ShoppingList';

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
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
            <div className="container mx-auto px-4 py-8">
                <header className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">
                        Shopping List Planner
                    </h1>
                    <p className="text-lg text-gray-600">
                        Never forget another item.
                    </p>
                </header>
                <ShoppingList />
            </div>
        </div>
    );
};

export default Index;

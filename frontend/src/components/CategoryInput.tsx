import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, X } from 'lucide-react';

interface CategoryInputProps {
    categoryName: string;
    categoryColor: string;
    categoryIcon: string;
    onAddItem: (category: string, item: string, quantity: number) => void;
}

const CategoryInput = ({
    categoryName,
    categoryColor,
    categoryIcon,
    onAddItem,
}: CategoryInputProps) => {
    const [inputValue, setInputValue] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [selectedHaveItems, setSelectedHaveItems] = useState<string[]>([]);

    const getAllSuggestions = (category: string) => {
        const allSuggestions: Record<string, string[]> = {
            Food: [
                'Milk',
                'Bread',
                'Eggs',
                'Bananas',
                'Chicken',
                'Rice',
                'Pasta',
                'Tomatoes',
                'Onions',
                'Cheese',
                'Yogurt',
                'Apples',
                'Potatoes',
                'Ground Beef',
                'Olive Oil',
            ],
            Cleaning: [
                'Dish Soap',
                'Paper Towels',
                'Toilet Paper',
                'All-Purpose Cleaner',
                'Laundry Detergent',
                'Glass Cleaner',
                'Disinfectant',
                'Sponges',
                'Trash Bags',
                'Fabric Softener',
            ],
            'Pet Goods': [
                'Dog Food',
                'Cat Litter',
                'Pet Treats',
                'Flea Shampoo',
                'Pet Toys',
                'Pet Bed',
                'Leash',
                'Food Bowls',
                'Litter Box',
                'Pet Carrier',
            ],
            'Personal Care': [
                'Toothpaste',
                'Shampoo',
                'Deodorant',
                'Body Wash',
                'Razor',
                'Soap',
                'Conditioner',
                'Lotion',
                'Toothbrush',
                'Face Wash',
            ],
            'Household Items': [
                'Light Bulbs',
                'Batteries',
                'Trash Bags',
                'Air Freshener',
                'Storage Containers',
                'Paper Plates',
                'Aluminum Foil',
                'Candles',
                'Extension Cord',
                'Duct Tape',
            ],
            Electronics: [
                'Phone Charger',
                'USB Cable',
                'Headphones',
                'Power Strip',
                'HDMI Cable',
                'Bluetooth Speaker',
                'Phone Case',
                'Screen Protector',
                'Wireless Mouse',
                'Keyboard',
            ],
        };
        return allSuggestions[category] || [];
    };

    const getFilteredSuggestions = (category: string, haveItems: string[]) => {
        const allSuggestions = getAllSuggestions(category);

        if (haveItems.length === 0) {
            return allSuggestions.slice(0, 5);
        }

        const filtered = allSuggestions.filter(
            (suggestion) =>
                !haveItems.some(
                    (haveItem) =>
                        suggestion
                            .toLowerCase()
                            .includes(haveItem.toLowerCase()) ||
                        haveItem
                            .toLowerCase()
                            .includes(suggestion.toLowerCase())
                )
        );

        return filtered.slice(0, 5);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputValue.trim() && quantity > 0) {
            onAddItem(categoryName, inputValue.trim(), quantity);
            setInputValue('');
            setQuantity(1);
        }
    };

    const handleSuggestionClick = (suggestion: string) => {
        onAddItem(categoryName, suggestion, 1);
    };

    const toggleHaveItem = (item: string) => {
        setSelectedHaveItems((prev) =>
            prev.includes(item)
                ? prev.filter((i) => i !== item)
                : [...prev, item]
        );
    };

    const removeHaveItem = (item: string) => {
        setSelectedHaveItems((prev) => prev.filter((i) => i !== item));
    };

    const suggestions = getFilteredSuggestions(categoryName, selectedHaveItems);
    const haveItemOptions = getAllSuggestions(categoryName).slice(0, 8);

    return (
        <Card className={`${categoryColor}`}>
            <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                    <span className="text-2xl">{categoryIcon}</span>
                    {categoryName}
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {/* What do you have at home - Multi-select */}
                <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-600">
                        What do you have at home?
                    </p>
                    <div className="flex flex-wrap gap-2 mb-2">
                        {haveItemOptions.map((item) => (
                            <Button
                                key={item}
                                variant={
                                    selectedHaveItems.includes(item)
                                        ? 'default'
                                        : 'outline'
                                }
                                size="sm"
                                onClick={() => toggleHaveItem(item)}
                                className={`text-xs transition-colors ${
                                    selectedHaveItems.includes(item)
                                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                        : 'bg-white/60 hover:bg-white/80 border-white/50'
                                }`}
                            >
                                {item}
                            </Button>
                        ))}
                    </div>
                    {selectedHaveItems.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                            {selectedHaveItems.map((item) => (
                                <div
                                    key={item}
                                    className="flex items-center gap-1 bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-xs"
                                >
                                    <span>{item}</span>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => removeHaveItem(item)}
                                        className="h-4 w-4 p-0 hover:bg-blue-200"
                                    >
                                        <X className="h-3 w-3" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Suggestions */}
                <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-600">
                        Quick suggestions:
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {suggestions.map((suggestion) => (
                            <Button
                                key={suggestion}
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                    handleSuggestionClick(suggestion)
                                }
                                className="text-xs bg-white/60 hover:bg-white/80 border-white/50 transition-colors"
                            >
                                {suggestion}
                            </Button>
                        ))}
                    </div>
                </div>

                {/* Manual Input */}
                <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-600">
                        Add custom item:
                    </p>
                    <form onSubmit={handleSubmit} className="flex gap-2">
                        <Input
                            type="text"
                            placeholder={`Add ${categoryName.toLowerCase()} item...`}
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            className="flex-1 bg-white/80 border-white/50 focus:bg-white transition-colors"
                        />
                        <Button
                            type="submit"
                            size="sm"
                            className="bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                        >
                            <Plus className="h-4 w-4" />
                        </Button>
                    </form>
                </div>
            </CardContent>
        </Card>
    );
};

export default CategoryInput;

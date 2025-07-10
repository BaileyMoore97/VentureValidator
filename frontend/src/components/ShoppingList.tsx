import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ShoppingBag, Trash2, X, Minus, Plus } from 'lucide-react';
import { ShoppingItem } from './ShoppingListPlanner';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
} from '@/components/ui/dropdown-menu';

interface GeneratedListProps {
    items: ShoppingItem[];
    frequency: string;
    setFrequency: (value: 'weekly' | 'fortnightly' | 'monthly') => void;
    numberOfPeople: number;
    onRemoveItem: (id: string) => void;
    onToggleItem: (id: string) => void;
    onUpdateQuantity: (id: string, quantity: number) => void;
    onClearAll: () => void;
}

const GeneratedList = ({
    items,
    frequency,
    setFrequency,
    numberOfPeople,
    onRemoveItem,
    onToggleItem,
    onUpdateQuantity,
    onClearAll,
}: GeneratedListProps) => {
    const completedCount = items.filter((item) => item.completed).length;
    const totalCount = items.length;

    const groupedItems = items.reduce(
        (acc, item) => {
            if (!acc[item.category]) {
                acc[item.category] = [];
            }
            acc[item.category].push(item);
            return acc;
        },
        {} as Record<string, ShoppingItem[]>
    );

    return (
        <Card className="h-fit bg-white/90 backdrop-blur-sm border-gray-200 shadow-lg">
            <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                        <ShoppingBag className="h-5 w-5 text-blue-600" />
                        <div>
                            Your
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="link">
                                        <div>{frequency}</div>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    className="w-56"
                                    align="start"
                                >
                                    <DropdownMenuRadioGroup
                                        value={frequency}
                                        onValueChange={setFrequency}
                                    >
                                        <DropdownMenuRadioItem value="weekly">
                                            Weekly
                                        </DropdownMenuRadioItem>
                                        <DropdownMenuRadioItem value="fortnightly">
                                            Fortnightly
                                        </DropdownMenuRadioItem>
                                        <DropdownMenuRadioItem value="monthly">
                                            Monthly
                                        </DropdownMenuRadioItem>
                                    </DropdownMenuRadioGroup>
                                </DropdownMenuContent>
                                Shopping List
                            </DropdownMenu>
                        </div>
                    </CardTitle>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={onClearAll}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        disabled={!totalCount}
                    >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Clear All
                    </Button>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>{totalCount} items total</span>
                    <Separator orientation="vertical" className="h-400" />
                    <span>
                        For {numberOfPeople}{' '}
                        {numberOfPeople === 1 ? 'person' : 'people'}
                    </span>
                    {completedCount > 0 && (
                        <>
                            <Separator orientation="vertical" className="h-4" />
                            <span className="text-green-600">
                                {completedCount} completed
                            </span>
                        </>
                    )}
                </div>
                {totalCount > 0 && (
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                        <div
                            className="bg-green-500 h-2 rounded-full transition-all duration-300"
                            style={{
                                width: `${(completedCount / totalCount) * 100}%`,
                            }}
                        />
                    </div>
                )}
            </CardHeader>
            {items.length === 0 ? (
                <CardContent>
                    <div className="text-center py-12 text-gray-500">
                        <ShoppingBag className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p className="text-lg font-medium mb-2">
                            Your list is empty
                        </p>
                        <p className="text-sm">
                            Start adding items from the categories on the left
                        </p>
                    </div>
                </CardContent>
            ) : (
                <CardContent>
                    <ScrollArea className="h-[500px] pr-4">
                        <div className="space-y-6">
                            {Object.entries(groupedItems).map(
                                ([category, categoryItems]) => (
                                    <div key={category}>
                                        <div className="flex items-center gap-2 mb-3">
                                            <Badge
                                                variant="secondary"
                                                className="text-xs"
                                            >
                                                {category}
                                            </Badge>
                                            <span className="text-xs text-gray-500">
                                                {categoryItems.length} item
                                                {categoryItems.length !== 1
                                                    ? 's'
                                                    : ''}
                                            </span>
                                        </div>
                                        <div className="space-y-2">
                                            {categoryItems.map((item) => (
                                                <div
                                                    key={item.id}
                                                    className={`flex items-center gap-3 p-3 rounded-lg border transition-all hover:shadow-sm ${
                                                        item.completed
                                                            ? 'bg-green-50 border-green-200'
                                                            : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                                                    }`}
                                                >
                                                    <Checkbox
                                                        checked={item.completed}
                                                        onCheckedChange={() =>
                                                            onToggleItem(
                                                                item.id
                                                            )
                                                        }
                                                        className="data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                                                    />
                                                    <span
                                                        className={`flex-1 transition-all ${
                                                            item.completed
                                                                ? 'line-through text-gray-500'
                                                                : 'text-gray-800'
                                                        }`}
                                                    >
                                                        {item.name}
                                                    </span>

                                                    {/* Quantity Controls */}
                                                    <div className="flex items-center gap-1 bg-white rounded border px-2 py-1">
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() =>
                                                                onUpdateQuantity(
                                                                    item.id,
                                                                    item.quantity -
                                                                        1
                                                                )
                                                            }
                                                            className="h-6 w-6 p-0 hover:bg-gray-100"
                                                            disabled={
                                                                item.quantity <=
                                                                1
                                                            }
                                                        >
                                                            <Minus className="h-3 w-3" />
                                                        </Button>
                                                        <Input
                                                            type="number"
                                                            value={
                                                                item.quantity
                                                            }
                                                            onChange={(e) =>
                                                                onUpdateQuantity(
                                                                    item.id,
                                                                    parseInt(
                                                                        e.target
                                                                            .value
                                                                    ) || 1
                                                                )
                                                            }
                                                            className="w-12 h-6 text-center text-xs border-0 bg-transparent p-0"
                                                            min="1"
                                                        />
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() =>
                                                                onUpdateQuantity(
                                                                    item.id,
                                                                    item.quantity +
                                                                        1
                                                                )
                                                            }
                                                            className="h-6 w-6 p-0 hover:bg-gray-100"
                                                        >
                                                            <Plus className="h-3 w-3" />
                                                        </Button>
                                                    </div>

                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() =>
                                                            onRemoveItem(
                                                                item.id
                                                            )
                                                        }
                                                        className="text-gray-400 hover:text-red-600 hover:bg-red-50 h-8 w-8 p-0"
                                                    >
                                                        <X className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )
                            )}
                        </div>
                    </ScrollArea>
                </CardContent>
            )}
        </Card>
    );
};

export default GeneratedList;

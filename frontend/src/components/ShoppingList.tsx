
import { useState } from "react";
import CategoryInput from "./CategoryInput";
import GeneratedList from "./ListOptions";
import { ShoppingCart } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";

export interface ShoppingItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  completed: boolean;
}

const ShoppingListGenerator = () => {
  const [items, setItems] = useState<ShoppingItem[]>([]);
  const [frequency, setFrequency] = useState<string>("weekly");
  const [numberOfPeople, setNumberOfPeople] = useState<number>(1);
  const [enabledCategories, setEnabledCategories] = useState<Set<string>>(new Set());

  const categories = [
    { name: "Food", color: "bg-green-100 border-green-300", icon: "🥕" },
    { name: "Cleaning", color: "bg-blue-100 border-blue-300", icon: "🧽" },
    { name: "Pet Goods", color: "bg-purple-100 border-purple-300", icon: "🐕" },
    { name: "Personal Care", color: "bg-pink-100 border-pink-300", icon: "🧴" },
    { name: "Household Items", color: "bg-yellow-100 border-yellow-300", icon: "🏠" },
  ];

  const addItem = (categoryName: string, itemName: string, quantity: number) => {
    const newItem: ShoppingItem = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      name: itemName,
      category: categoryName,
      quantity: quantity,
      completed: false
    };
    setItems(prev => [...prev, newItem]);
  };

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const toggleItem = (id: string) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const updateQuantity = (id: string, quantity: number) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
    ));
  };

  const clearAllItems = () => {
    setItems([]);
  };

  const toggleCategory = (categoryName: string, checked: boolean) => {
    setEnabledCategories(prev => {
      const newSet = new Set(prev);
      if (checked) {
        newSet.add(categoryName);
      } else {
        newSet.delete(categoryName);
      }
      return newSet;
    });
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
      {/* Left side - Input categories */}
      <Card className="h-fit bg-white/80 backdrop-blur-sm border-gray-200">
        <CardHeader className="flex items-center gap-2 mb-6">
          <ShoppingCart className="h-6 w-6 text-blue-600" />
          <h2 className="text-2xl font-semibold text-gray-800">List Builder</h2>
        </CardHeader>
        {/* Shopping Settings */}
        <CardContent className="bg-white/60 p-4 rounded-lg border border-white/50 space-y-4">
          {/* Shopping Frequency Toggle */}
          <div>
            <p className="text-sm font-medium text-gray-700 mb-3">Shopping frequency:</p>
            <ToggleGroup 
              type="single" 
              value={frequency} 
              onValueChange={(value: "weekly" | "fortnightly" | "monthly") => value && setFrequency(value)}
              className="justify-start"
            >
              <ToggleGroupItem value="weekly" className="text-sm">
                Weekly
              </ToggleGroupItem>
              <ToggleGroupItem value="fortnightly" className="text-sm">
                Bi-weekly
              </ToggleGroupItem>
              <ToggleGroupItem value="monthly" className="text-sm">
                Monthly
              </ToggleGroupItem>
            </ToggleGroup>
          </div>

          {/* Number of People */}
          <div>
            <Label htmlFor="numberOfPeople" className="text-sm font-medium text-gray-700">
              Number of people:
            </Label>
            <Input
              id="numberOfPeople"
              type="number"
              value={numberOfPeople}
              onChange={(e) => setNumberOfPeople(Math.max(1, parseInt(e.target.value) || 1))}
              min="1"
              className="w-20 mt-1 bg-white/80 border-white/50 focus:bg-white"
            />
          </div>
        <Tabs defaultValue = "Food" className="w-full">
        {/* Category Tabs */}
          <p className="text-sm font-medium text-gray-700 mb-3">Categories:</p>
            <TabsList>
                {categories.map((category) => (
                    <TabsTrigger value={category.name}>{category.name}</TabsTrigger>
                ))}
            </TabsList>
        
          {categories
            .map((category) => (
                <TabsContent value={category.name}>
                    <CategoryInput
                        key={category.name}
                        categoryName={category.name}
                        categoryColor={category.color}
                        categoryIcon={category.icon}
                        onAddItem={addItem}
                    />
              </TabsContent>
            ))}
        </Tabs>
        </CardContent>
      </Card>
      {/* Right side - Generated shopping list */}
      <div className="lg:sticky lg:top-8 lg:self-start">
        <GeneratedList
          items={items}
          frequency={frequency}
          numberOfPeople={numberOfPeople}
          onRemoveItem={removeItem}
          onToggleItem={toggleItem}
          onUpdateQuantity={updateQuantity}
          onClearAll={clearAllItems}
        />
      </div>
    </div>
  );
};

export default ShoppingListGenerator;

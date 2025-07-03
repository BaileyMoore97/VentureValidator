
import { useState } from "react";
import { Plus, X, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface CanvasSectionProps {
  title: string;
  items: string[];
  onUpdate: (items: string[]) => void;
  color: "blue" | "orange" | "green" | "gold";
  className?: string;
}

export const CanvasCard = ({ title, items, onUpdate, color, className }: CanvasSectionProps) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newItem, setNewItem] = useState("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingText, setEditingText] = useState("");

  const addItem = () => {
    if (newItem.trim()) {
      onUpdate([...items, newItem.trim()]);
      setNewItem("");
      setIsAdding(false);
    }
  };

  const removeItem = (index: number) => {
    onUpdate(items.filter((_, i) => i !== index));
  };

  const startEditing = (index: number) => {
    setEditingIndex(index);
    setEditingText(items[index]);
  };

  const saveEdit = () => {
    if (editingIndex !== null && editingText.trim()) {
      const newItems = [...items];
      newItems[editingIndex] = editingText.trim();
      onUpdate(newItems);
    }
    setEditingIndex(null);
    setEditingText("");
  };

  const cancelEdit = () => {
    setEditingIndex(null);
    setEditingText("");
  };

  const colourClasses = {
    blue: "bg-blue-50 border-blue-200",
    orange: "bg-orange-50 border-orange-200",
    gold: "bg-yellow-50 border-yellow-200",
    green:  "bg-green-50 border-green-200"
  }

  return (
    <Card className={cn("p-4 flex flex-col", colourClasses[color], className)}>
      <h3 className="font-semibold text-sm text-gray-700 mb-3 text-center border-b pb-2">
        {title}
      </h3>
      
      <div className="flex-1 overflow-y-auto">
        {items.map((item, index) => (
          <div key={index} className="group relative">
            {editingIndex === index ? (
              <div className="space-y-2">
                <Textarea
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                  className="min-h-[60px] text-sm resize-none"
                  autoFocus
                />
                <div className="flex gap-1">
                  <Button size="sm" onClick={saveEdit} className="h-6 px-2 text-xs">
                    Save
                  </Button>
                  <Button size="sm" variant="outline" onClick={cancelEdit} className="h-6 px-2 text-xs">
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="bg-white p-2 rounded border text-sm relative group hover:shadow-sm transition-shadow">
                <p className="text-gray-700 leading-relaxed">{item}</p>
                <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => startEditing(index)}
                    className="h-5 w-5 p-0"
                  >
                    <Edit2 className="h-3 w-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => removeItem(index)}
                    className="h-5 w-5 p-0 hover:text-red-600"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        ))}
        
        {isAdding && (
          <div className="space-y-2">
            <Textarea
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              placeholder="Enter your item..."
              className="min-h-[60px] text-sm resize-none"
              autoFocus
            />
            <div className="flex gap-1">
              <Button size="sm" onClick={addItem} className="h-6 px-2 text-xs">
                Add
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setIsAdding(false);
                  setNewItem("");
                }}
                className="h-6 px-2 text-xs"
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </div>
      
      {!isAdding && (
        <Button
          onClick={() => setIsAdding(true)}
          variant="ghost"
          size="sm"
          className="mt-2 w-full border-2 border-dashed border-gray-300 hover:border-gray-400 text-gray-500 hover:text-gray-600"
        >
          <Plus className="h-4 w-4 mr-1" />
          Add Item
        </Button>
      )}
    </Card>
  );
};

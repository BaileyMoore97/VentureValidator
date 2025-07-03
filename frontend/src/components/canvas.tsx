
import { useState } from "react";
import { Download, Save, Plus, Bluetooth } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CanvasCard } from "@/components/canvasCard";

export interface BusinessModelData {
  keyPartnerships: string[];
  keyActivities: string[];
  keyResources: string[];
  valuePropositions: string[];
  customerRelationships: string[];
  channels: string[];
  customerSegments: string[];
  costStructure: string[];
  revenueStreams: string[];
}

const initialData: BusinessModelData = {
  keyPartnerships: [],
  keyActivities: [],
  keyResources: [],
  valuePropositions: [],
  customerRelationships: [],
  channels: [],
  customerSegments: [],
  costStructure: [],
  revenueStreams: [],
};

export const Canvas = () => {
  const [data, setData] = useState<BusinessModelData>(initialData);

  const updateSection = (section: keyof BusinessModelData, items: string[]) => {
    setData(prev => ({
      ...prev,
      [section]: items
    }));
  };

  const exportCanvas = () => {
    const dataStr = JSON.stringify(data, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = 'business-model-canvas.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();

  };

  const saveCanvas = () => {
    localStorage.setItem('businessModelCanvas', JSON.stringify(data));

  };

  const loadCanvas = () => {
    const saved = localStorage.getItem('businessModelCanvas');
    if (saved) {
      setData(JSON.parse(saved));

    }
  };

  return (
    <div className="w-full mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-2">
          <Button onClick={saveCanvas} variant="outline" className="flex items-center gap-2">
            <Save className="h-4 w-4" />
            Save
          </Button>
          <Button onClick={loadCanvas} variant="outline">
            Load Saved
          </Button>
        </div>
        <Button onClick={exportCanvas} className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Export JSON
        </Button>
      </div>

      <Card className="p-6 bg-white shadow-xl">
        <div className="grid grid-cols-10 grid-rows-3 gap-4 h-[800px]">
          {/* Row 1 */}
          <CanvasCard
            title="Key Partnerships"
            items={data.keyPartnerships}
            onUpdate={(items) => updateSection('keyPartnerships', items)}
            color="blue"
            className="col-span-2 row-span-2"
          />
          <CanvasCard
            title="Key Activities"
            items={data.keyActivities}
            onUpdate={(items) => updateSection('keyActivities', items)}
            color="blue"
            className="col-span-2"
          />
          <CanvasCard
            title="Value Propositions"
            items={data.valuePropositions}
            onUpdate={(items) => updateSection('valuePropositions', items)}
            color="gold"
            className="col-span-2 row-span-2"
          />
          <CanvasCard
            title="Customer Relationships"
            items={data.customerRelationships}
            onUpdate={(items) => updateSection('customerRelationships', items)}
            color="orange"
            className="col-span-2"
          />
          <CanvasCard
            title="Customer Segments"
            items={data.customerSegments}
            onUpdate={(items) => updateSection('customerSegments', items)}
            color="orange"
            className="col-span-2 row-span-2"
          />

          {/* Row 2 */}
          <CanvasCard
            title="Key Resources"
            items={data.keyResources}
            onUpdate={(items) => updateSection('keyResources', items)}
            color="blue"
            className="col-span-2"
          />
          <CanvasCard
            title="Channels"
            items={data.channels}
            onUpdate={(items) => updateSection('channels', items)}
            color="orange"
            className="col-span-2"
          />

          {/* Row 3 */}
          <CanvasCard
            title="Cost Structure"
            items={data.costStructure}
            onUpdate={(items) => updateSection('costStructure', items)}
            color="green"
            className="col-span-5"
          />
          <CanvasCard
            title="Revenue Streams"
            items={data.revenueStreams}
            onUpdate={(items) => updateSection('revenueStreams', items)}
            color="green"
            className="col-span-5"
          />
        </div>
      </Card>
    </div>
  );
};

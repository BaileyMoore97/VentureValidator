// frontend/src/App.js
import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, CheckCircle, AlertCircle } from 'lucide-react';
import './App.css';

// Step Components
const IdeaInput = ({ data, onUpdate }) => (
  <div className="space-y-6">
    <div className="text-center mb-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Describe Your Business Idea</h2>
      <p className="text-lg text-gray-600">
        Tell us about your business concept and we'll generate a complete business model canvas for you
      </p>
    </div>
    
    <div className="max-w-3xl mx-auto">
      <div className="bg-gradient-to-r from-primary-50 to-primary-100 p-6 rounded-lg mb-6">
        <h3 className="text-lg font-semibold text-primary-800 mb-2">What to include:</h3>
        <ul className="text-primary-700 space-y-1">
          <li>• The problem you're solving</li>
          <li>• Your proposed solution</li>
          <li>• Target customers</li>
          <li>• How you'll make money</li>
          <li>• Any other relevant details</li>
        </ul>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Business Idea Description *
        </label>
        <textarea
          className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-base"
          rows={12}
          value={data.description || ''}
          onChange={(e) => onUpdate({ ...data, description: e.target.value })}
          placeholder="Example: I want to create a mobile app that helps busy parents meal plan for their families. The app would suggest healthy recipes based on dietary restrictions, generate shopping lists, and offer quick 15-minute meal options. Parents struggle with finding time to plan nutritious meals, and this would solve that problem. I'd monetize through premium recipe collections and partnerships with grocery stores..."
        />
        <div className="mt-2 text-sm text-gray-500">
          {data.description ? `${data.description.length} characters` : '0 characters'} 
          {data.description && data.description.length < 200 && ' (consider adding more detail)'}
        </div>
      </div>
    </div>
  </div>
);

const BusinessModelCanvas = ({ canvas, loading }) => {
  const canvasItems = [
    {
      title: 'Key Partners',
      content: canvas?.keyPartners,
      description: 'Who are your key partners and suppliers?',
      color: 'bg-blue-50 border-blue-200'
    },
    {
      title: 'Key Activities',
      content: canvas?.keyActivities,
      description: 'What key activities does your business require?',
      color: 'bg-green-50 border-green-200'
    },
    {
      title: 'Key Resources',
      content: canvas?.keyResources,
      description: 'What key resources does your business require?',
      color: 'bg-purple-50 border-purple-200'
    },
    {
      title: 'Value Propositions',
      content: canvas?.valuePropositions,
      description: 'What value do you deliver to customers?',
      color: 'bg-red-50 border-red-200'
    },
    {
      title: 'Customer Relationships',
      content: canvas?.customerRelationships,
      description: 'How do you interact with customers?',
      color: 'bg-yellow-50 border-yellow-200'
    },
    {
      title: 'Channels',
      content: canvas?.channels,
      description: 'How do you reach and deliver to customers?',
      color: 'bg-indigo-50 border-indigo-200'
    },
    {
      title: 'Customer Segments',
      content: canvas?.customerSegments,
      description: 'Who are your most important customers?',
      color: 'bg-pink-50 border-pink-200'
    },
    {
      title: 'Cost Structure',
      content: canvas?.costStructure,
      description: 'What are the most important costs?',
      color: 'bg-orange-50 border-orange-200'
    },
    {
      title: 'Revenue Streams',
      content: canvas?.revenueStreams,
      description: 'How does your business make money?',
      color: 'bg-teal-50 border-teal-200'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Your Business Model Canvas</h2>
        <p className="text-lg text-gray-600">
          AI-generated strategic overview of your business model
        </p>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mb-4"></div>
          <p className="text-lg text-gray-600">Analyzing your idea and building your business model canvas...</p>
          <p className="text-sm text-gray-500 mt-2">This may take a moment</p>
        </div>
      ) : canvas ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {canvasItems.map((item, index) => (
            <div key={index} className={`p-6 rounded-lg border-2 ${item.color} transition-all hover:shadow-md`}>
              <h3 className="text-lg font-bold text-gray-800 mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600 mb-4">{item.description}</p>
              <div className="space-y-2">
                {item.content && Array.isArray(item.content) ? (
                  item.content.map((point, pointIndex) => (
                    <div key={pointIndex} className="flex items-start">
                      <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <p className="text-gray-700 text-sm leading-relaxed">{point}</p>
                    </div>
                  ))
                ) : item.content ? (
                  <p className="text-gray-700 text-sm leading-relaxed">{item.content}</p>
                ) : (
                  <p className="text-gray-500 text-sm italic">No content generated</p>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-gray-500">
          <AlertCircle className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <p className="text-lg">No business model canvas available</p>
        </div>
      )}

      {canvas && (
        <div className="mt-8 bg-gradient-to-r from-primary-50 to-primary-100 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-primary-800 mb-3">Next Steps</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-primary-700 mb-2">Validate Your Assumptions</h4>
              <ul className="text-sm text-primary-600 space-y-1">
                <li>• Test your value proposition with potential customers</li>
                <li>• Research your target market size</li>
                <li>• Validate pricing assumptions</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-primary-700 mb-2">Refine Your Model</h4>
              <ul className="text-sm text-primary-600 space-y-1">
                <li>• Identify your riskiest assumptions</li>
                <li>• Plan your minimum viable product (MVP)</li>
                <li>• Develop your go-to-market strategy</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Main App Component
function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [ideaData, setIdeaData] = useState({});
  const [canvas, setCanvas] = useState(null);
  const [loading, setLoading] = useState(false);

  const steps = [
    { title: 'Describe Idea', component: IdeaInput },
    { title: 'Business Model Canvas', component: BusinessModelCanvas }
  ];

  const generateCanvas = async () => {
    setLoading(true);
    try {
      // This would call your backend API that connects to the local LLM
      const response = await fetch('/api/generate-canvas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description: ideaData.description })
      });
      const data = await response.json();
      setCanvas(data.canvas);
    } catch (error) {
      console.error('Error generating canvas:', error);
      // Fallback canvas for demo purposes
      setCanvas({
        keyPartners: [
          "Technology partners for app development",
          "Grocery stores for ingredient partnerships",
          "Nutritionists for recipe validation",
          "Marketing agencies for customer acquisition"
        ],
        keyActivities: [
          "Recipe curation and development",
          "App development and maintenance",
          "Customer support and engagement",
          "Partnership management"
        ],
        keyResources: [
          "Recipe database and algorithms",
          "Mobile app platform",
          "Nutritionist expertise",
          "Customer data and analytics"
        ],
        valuePropositions: [
          "Save time on meal planning (15-minute meals)",
          "Healthy, family-friendly recipes",
          "Automatic shopping list generation",
          "Dietary restriction accommodation",
          "Reduce food waste through planned meals"
        ],
        customerRelationships: [
          "Self-service mobile app",
          "Community features and recipe sharing",
          "Personal meal recommendations",
          "Customer support chat"
        ],
        channels: [
          "Mobile app stores (iOS/Android)",
          "Social media marketing",
          "Parenting blogs and influencers",
          "Grocery store partnerships"
        ],
        customerSegments: [
          "Busy working parents (primary)",
          "Health-conscious families",
          "New parents learning to cook",
          "Families with dietary restrictions"
        ],
        costStructure: [
          "App development and maintenance",
          "Recipe licensing and creation",
          "Marketing and customer acquisition",
          "Staff salaries (developers, nutritionists)",
          "Cloud hosting and data storage"
        ],
        revenueStreams: [
          "Premium subscription ($9.99/month)",
          "Grocery store affiliate commissions",
          "Premium recipe pack purchases",
          "Corporate wellness partnerships"
        ]
      });
    }
    setLoading(false);
  };

  const nextStep = async () => {
    if (currentStep === 0) {
      await generateCanvas();
    }
    setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const canProceed = () => {
    if (currentStep === 0) {
      return ideaData.description && ideaData.description.trim().length >= 50;
    }
    return true;
  };

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Business Model Canvas Generator</h1>
          <p className="text-gray-600 mt-1">Transform your business idea into a strategic framework</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-center max-w-md mx-auto">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center">
                <div className={`
                  w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium
                  ${index <= currentStep 
                    ? 'bg-primary-500 text-white' 
                    : 'bg-gray-200 text-gray-600'
                  }
                `}>
                  {index + 1}
                </div>
                <span className={`ml-3 text-sm font-medium ${
                  index <= currentStep ? 'text-primary-600' : 'text-gray-500'
                }`}>
                  {step.title}
                </span>
                {index < steps.length - 1 && (
                  <ChevronRight className="w-5 h-5 text-gray-400 mx-6" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <CurrentStepComponent
            data={ideaData}
            onUpdate={setIdeaData}
            canvas={canvas}
            loading={loading}
          />
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className="flex items-center px-6 py-3 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </button>
          
          {currentStep < steps.length - 1 && (
            <button
              onClick={nextStep}
              disabled={!canProceed() || loading}
              className="flex items-center px-8 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Generating Canvas...
                </>
              ) : (
                <>
                  Generate Business Model
                  <ChevronRight className="w-4 h-4 ml-2" />
                </>
              )}
            </button>
          )}
          
          {currentStep === steps.length - 1 && (
            <button
              onClick={() => {
                setCurrentStep(0);
                setIdeaData({});
                setCanvas(null);
              }}
              className="flex items-center px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 font-medium"
            >
              Start Over
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
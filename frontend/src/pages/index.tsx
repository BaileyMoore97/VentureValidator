import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import { Canvas } from "@/components/canvas";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const Index = () => {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Business Model Canvas</h1>
          <p className="text-lg text-gray-600">AI Assisted business model canvas</p>
        </div>
        <Canvas />
      </div>
    </div>
  );
};

export default Index;
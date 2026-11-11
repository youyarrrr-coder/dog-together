import React, { useRef } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BreedMatcherSection } from './components/BreedMatcherSection';
import { ChecklistSection } from './components/ChecklistSection';
import { PrecautionsSection } from './components/PrecautionsSection';
import { CostCalculatorSection } from './components/CostCalculatorSection';
import { RoadmapSection } from './components/RoadmapSection';
import { WalkSpotsSection } from './components/WalkSpotsSection';
import { Footer } from './components/Footer';

export default function App() {
  const quizSectionRef = useRef<HTMLDivElement | null>(null);

  const scrollToQuiz = () => {
    const el = document.getElementById('precautions');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-stone-800">
      <Navbar onOpenQuiz={scrollToQuiz} />

      <main className="flex-1">
        <Hero onStartQuiz={scrollToQuiz} />
        <BreedMatcherSection />
        <ChecklistSection />
        <PrecautionsSection quizRef={quizSectionRef} />
        <CostCalculatorSection />
        <RoadmapSection />
        <WalkSpotsSection />
      </main>

      <Footer />
    </div>
  );
}

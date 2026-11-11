import React, { useState } from 'react';
import { TRAINING_ROADMAP_STAGES } from '../data/roadmapData';
import { CheckCircle, XCircle, Award, Stethoscope, ChevronRight, BookOpen } from 'lucide-react';

export const RoadmapSection: React.FC = () => {
  const [selectedStageId, setSelectedStageId] = useState<string>('year0-1');

  const currentStage =
    TRAINING_ROADMAP_STAGES.find((s) => s.id === selectedStageId) || TRAINING_ROADMAP_STAGES[0];

  return (
    <section id="roadmap" className="py-16 lg:py-24 bg-[#FAF8F5] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <div className="text-xs font-semibold text-stone-500 tracking-wider uppercase">
            Section 04 · Growth & Year-by-Year Training Roadmap
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-900 tracking-tight">
            1년마다 달라지는 성장 단계별 <br />
            맞춤 훈육 & 행동 교정 로드맵
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            강아지의 1년은 인간의 5~7년과 같습니다. 
            생후 2개월 퍼피기 배변 훈련부터 청소년기 개춘기, 젠틀 산책 예절, 
            노령견 인지장애 예방까지 시기별 핵심 훈련법을 단계별로 마스터하세요.
          </p>
        </div>

        {/* Age Stage Selector Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 p-1.5 bg-stone-200/70 rounded-2xl">
          {TRAINING_ROADMAP_STAGES.map((stage) => {
            const isSelected = stage.id === selectedStageId;
            return (
              <button
                key={stage.id}
                onClick={() => setSelectedStageId(stage.id)}
                className={`p-3.5 rounded-xl text-left transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-white text-stone-900 shadow-sm border border-stone-300/80 font-bold'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100/70'
                }`}
              >
                <span className="text-xs font-semibold text-amber-700">{stage.ageRange}</span>
                <span className="text-sm font-bold tracking-tight mt-1">{stage.stageName}</span>
              </button>
            );
          })}
        </div>

        {/* Active Stage Content Display */}
        <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs">
          {/* Stage Hero Banner */}
          <div className="p-6 sm:p-8 lg:p-10 border-b border-stone-100 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-stone-50/50">
            <div className="lg:col-span-8 space-y-3">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-900 bg-amber-100 px-3 py-1 rounded-full">
                <span>{currentStage.stageName}</span>
                <span>·</span>
                <span>{currentStage.ageRange}</span>
              </div>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-stone-900 tracking-tight">
                {currentStage.headline}
              </h3>
              <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
                {currentStage.description}
              </p>
            </div>

            {/* Visual asset showcasing positive training */}
            <div className="lg:col-span-4 rounded-2xl overflow-hidden aspect-[4/3] bg-stone-200 border border-stone-200">
              <img
                src="/src/assets/images/dog_training_bonding_1794378459977.jpg"
                alt="보호자와 강아지의 긍정 강화 훈련 모습"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Stage Details Grid */}
          <div className="p-6 sm:p-8 lg:p-10 space-y-10">
            {/* 1. Core Milestone Goals */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-stone-900 font-bold text-base sm:text-lg">
                <Award className="w-5 h-5 text-amber-600" />
                <span>이 시기 반드시 달성해야 할 4대 핵심 목표</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentStage.keyGoals.map((goal, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-stone-50 border border-stone-200/80 flex items-start gap-3"
                  >
                    <span className="w-6 h-6 rounded-md bg-amber-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      0{idx + 1}
                    </span>
                    <p className="text-xs sm:text-sm font-medium text-stone-800 leading-relaxed">
                      {goal}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. DOs vs DONTs side by side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* DO Box */}
              <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-200 space-y-4">
                <div className="flex items-center gap-2 text-emerald-900 font-bold text-base">
                  <CheckCircle className="w-5 h-5 text-emerald-700" />
                  <span>반드시 실천해야 할 올바른 훈육법 (DO)</span>
                </div>
                <ul className="space-y-3 text-xs sm:text-sm text-stone-700">
                  {currentStage.dos.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="text-emerald-700 font-bold mt-0.5">✓</span>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* DONT Box */}
              <div className="p-6 rounded-2xl bg-rose-50/50 border border-rose-200 space-y-4">
                <div className="flex items-center gap-2 text-rose-900 font-bold text-base">
                  <XCircle className="w-5 h-5 text-rose-700" />
                  <span>초보 견주가 흔히 저지르는 치명적 실수 (DON'T)</span>
                </div>
                <ul className="space-y-3 text-xs sm:text-sm text-stone-700">
                  {currentStage.donts.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="text-rose-700 font-bold mt-0.5">✕</span>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 3. Essential Commands & Healthcare Checklist */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-4 border-t border-stone-100">
              {/* Essential Commands */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center gap-2 text-stone-900 font-bold text-base">
                  <BookOpen className="w-5 h-5 text-stone-700" />
                  <span>이 시기 마스터할 필수 명령어</span>
                </div>
                <div className="space-y-2.5">
                  {currentStage.essentialCommands.map((cmd, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs sm:text-sm"
                    >
                      <span className="font-bold text-stone-900">{cmd.command}</span>
                      <span className="text-stone-600">{cmd.explanation}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Vet Healthcare Checklist */}
              <div className="lg:col-span-5 space-y-4">
                <div className="flex items-center gap-2 text-stone-900 font-bold text-base">
                  <Stethoscope className="w-5 h-5 text-amber-700" />
                  <span>동물병원 필수 검진 일정</span>
                </div>
                <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200/80 space-y-2.5">
                  {currentStage.vetCareChecklist.map((check, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-stone-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-700 shrink-0" />
                      <span>{check}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

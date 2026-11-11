import React from 'react';
import { CheckCircle2, Calculator, Compass, Sparkles } from 'lucide-react';

interface HeroProps {
  onStartQuiz: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartQuiz }) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Value proposition & actions */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-800 tracking-wide">
              <span>예비 견주 & 초보 견주를 위한 종합 가이드북</span>
              <span aria-hidden="true">·</span>
              <span>수의학 & 동물행동학 기반</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-stone-900 tracking-tight leading-[1.2] text-balance">
              새로운 생명을 가족으로 맞이하는{' '}
              <span className="text-stone-950 underline decoration-amber-300 decoration-4 underline-offset-6">
                가장 현명하고 따뜻한 첫걸음
              </span>
            </h1>

            <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-2xl">
              설레는 첫 만남 전 필요한 필수 준비물과 안전 수칙부터, 15년 평생 들어가는 현실적인 양육 비용, 
              성장 단계별 훈육 원칙과 전국 산책 명소까지 — 건강한 반려생활의 모든 순간을 안내합니다.
            </p>

            {/* Quick action buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#breed-matcher"
                className="px-5 py-3 text-sm font-semibold text-white bg-stone-900 rounded-xl hover:bg-stone-800 active:scale-[0.98] transition-all shadow-sm flex items-center gap-2 whitespace-nowrap"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>견종 성향 매칭 테스트</span>
              </a>
              <a
                href="#checklist"
                className="px-5 py-3 text-sm font-semibold text-stone-800 bg-stone-100 hover:bg-stone-200 rounded-xl active:scale-[0.98] transition-all flex items-center gap-2 whitespace-nowrap border border-stone-300/80"
              >
                <CheckCircle2 className="w-4 h-4 text-stone-600" />
                <span>입양 전 필수 준비물 점검</span>
              </a>
              <a
                href="#calculator"
                className="px-4 py-3 text-sm font-semibold text-amber-900 bg-amber-50 hover:bg-amber-100 rounded-xl active:scale-[0.98] transition-all flex items-center gap-1.5 whitespace-nowrap border border-amber-200"
              >
                <Calculator className="w-4 h-4 text-amber-700" />
                <span>생애 비용 계산기</span>
              </a>
            </div>

            {/* Quick trust metrics */}
            <div className="pt-6 border-t border-stone-200 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
              <div>
                <p className="text-xl sm:text-2xl font-bold text-stone-900 tabular-nums">17종</p>
                <p className="text-xs text-stone-500 font-medium">실용 준비물 체크</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold text-stone-900 tabular-nums">15년</p>
                <p className="text-xs text-stone-500 font-medium">생애 비용 시뮬레이션</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold text-stone-900 tabular-nums">5단계</p>
                <p className="text-xs text-stone-500 font-medium">연차별 훈육 로드맵</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold text-stone-900 tabular-nums">12개소+</p>
                <p className="text-xs text-stone-500 font-medium">전국 검증 산책지</p>
              </div>
            </div>
          </div>

          {/* Right Column: Hero visual asset */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-stone-200/80 bg-stone-100 aspect-[4/3] lg:aspect-[16/11]">
              <img
                src="/src/assets/images/dog_hero_welcome_1794378458296.jpg"
                alt="새 가족을 맞이하는 따뜻하고 아늑한 실내와 사랑스러운 강아지"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transform hover:scale-[1.02] transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-stone-950/20 to-transparent flex flex-col justify-end p-5 text-white">
                <span className="text-xs uppercase tracking-wider text-amber-200 font-semibold mb-1">
                  PUPPY WELCOME ESSENTIALS
                </span>
                <p className="text-base font-semibold text-stone-100 leading-snug">
                  "강아지의 첫날은 평생 기억됩니다. 따뜻한 보금자리와 준비된 마음으로 맞아주세요."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

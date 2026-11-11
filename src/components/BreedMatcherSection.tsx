import React, { useState } from 'react';
import { BREED_QUESTIONS, BREED_MATCH_RESULTS, BreedMatchResult } from '../data/breedMatcherData';
import { Sparkles, ArrowRight, ArrowLeft, RotateCcw, Copy, Check, Heart, ShieldCheck, ChevronRight } from 'lucide-react';

export const BreedMatcherSection: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [result, setResult] = useState<BreedMatchResult | null>(null);
  const [copyFeedback, setCopyFeedback] = useState<boolean>(false);

  const totalQuestions = BREED_QUESTIONS.length;
  const currentQuestion = BREED_QUESTIONS[currentQuestionIndex];
  const isSelected = selectedAnswers[currentQuestion.id] !== undefined;

  const handleSelectOption = (optionIndex: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optionIndex,
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      calculateResult();
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const calculateResult = () => {
    const scores: Record<string, number> = {
      cityGentle: 0,
      activeRunner: 0,
      gentleGiant: 0,
      independent: 0,
      uniqueMix: 0,
    };

    BREED_QUESTIONS.forEach((q) => {
      const selectedOptIdx = selectedAnswers[q.id];
      if (selectedOptIdx !== undefined) {
        const weights = q.options[selectedOptIdx].tagWeights;
        scores.cityGentle += weights.cityGentle;
        scores.activeRunner += weights.activeRunner;
        scores.gentleGiant += weights.gentleGiant;
        scores.independent += weights.independent;
        scores.uniqueMix += weights.uniqueMix;
      }
    });

    // Find highest score
    let highestKey: keyof typeof scores = 'cityGentle';
    let highestScore = -999;

    (Object.keys(scores) as (keyof typeof scores)[]).forEach((key) => {
      if (scores[key] > highestScore) {
        highestScore = scores[key];
        highestKey = key;
      }
    });

    setResult(BREED_MATCH_RESULTS[highestKey] || BREED_MATCH_RESULTS.cityGentle);
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setCurrentQuestionIndex(0);
    setResult(null);
  };

  const handleCopyResult = () => {
    if (!result) return;
    const text = `[반려첫걸음] 나와 잘 맞는 견종 성향 테스트 결과\n\n타입: ${result.title} (${result.subtitle})\n추천 견종: ${result.recommendedBreeds.join(', ')}\n활동량: ${result.specs.activityLevel} | 털빠짐: ${result.specs.hairShedding}\n권장 주거: ${result.specs.bestLivingSpace}\n전문가 조언: ${result.expertAdvice}`;
    navigator.clipboard.writeText(text);
    setCopyFeedback(true);
    setTimeout(() => setCopyFeedback(false), 2000);
  };

  return (
    <section id="breed-matcher" className="py-16 lg:py-24 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <div className="text-xs font-semibold text-stone-500 tracking-wider uppercase">
            Interactive Test · Lifestyle & Breed Compatibility
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-900 tracking-tight">
            나와 15년을 함께할 <br />
            '반려견 성향 매칭 테스트'
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            단순히 외모나 유행만 보고 입양했다가 파양되는 비극을 막아야 합니다. 
            나의 주거 환경, 하루 산책 가능 시간, 털 빠짐 감수도, 반려 성향을 분석하여 
            가장 조화롭게 어우러질 최적의 견종 타입을 추천해 드립니다.
          </p>
        </div>

        {/* Top Hero Banner with Generated Lineup Photo */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 bg-stone-50 rounded-2xl border border-stone-200">
          <div className="lg:col-span-5 rounded-xl overflow-hidden aspect-[16/9] bg-stone-200">
            <img
              src="/src/assets/images/dog_breeds_lineup_1794379767193.jpg"
              alt="다양한 반려견 견종 라인업 사진"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="lg:col-span-7 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-800">
              <Sparkles className="w-4 h-4 text-amber-700" />
              <span>5문항 1분 완성 라이프스타일 매칭</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-stone-900">
              견종마다 수백 년간 축적된 고유의 본능과 에너지가 다릅니다
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              보더콜리는 하루 2시간의 지적 자극이 없으면 스트레스를 받고, 푸들은 사람과의 밀접한 애착이 중요합니다. 
              내 삶의 속도와 가장 어울리는 친구를 찾아보세요.
            </p>
            <div className="flex flex-wrap gap-2 pt-1 text-xs text-stone-600">
              <span className="bg-white border border-stone-200 px-2.5 py-1 rounded-md">✓ 주거 공간 평가</span>
              <span className="bg-white border border-stone-200 px-2.5 py-1 rounded-md">✓ 산책 및 운동량 매칭</span>
              <span className="bg-white border border-stone-200 px-2.5 py-1 rounded-md">✓ 털 빠짐 관리 현실도</span>
            </div>
          </div>
        </div>

        {/* Quiz Flow or Result Display */}
        {!result ? (
          <div className="max-w-3xl mx-auto bg-stone-50 rounded-2xl border border-stone-200/90 p-6 sm:p-8 space-y-8 shadow-xs">
            {/* Step Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-bold text-stone-600">
                <span>질문 {currentQuestionIndex + 1} / {totalQuestions}</span>
                <span className="font-mono text-amber-800">
                  {Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100)}% 진행
                </span>
              </div>
              <div className="w-full h-2 bg-stone-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-600 transition-all duration-300"
                  style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
                />
              </div>
            </div>

            {/* Question Heading */}
            <div className="space-y-1.5">
              <span className="text-xs font-mono font-bold text-amber-700">QUESTION 0{currentQuestion.id}</span>
              <h3 className="text-lg sm:text-xl font-bold text-stone-900">
                {currentQuestion.question}
              </h3>
              <p className="text-xs text-stone-500">{currentQuestion.hint}</p>
            </div>

            {/* Options List */}
            <div className="space-y-3">
              {currentQuestion.options.map((option, idx) => {
                const isOptionSelected = selectedAnswers[currentQuestion.id] === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full text-left p-4 rounded-xl border transition-all ${
                      isOptionSelected
                        ? 'bg-amber-50 border-amber-400 text-stone-900 ring-2 ring-amber-300/60 shadow-xs'
                        : 'bg-white border-stone-200 text-stone-700 hover:border-stone-300 hover:bg-stone-50/50'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <p className="text-sm sm:text-base font-bold text-stone-900">{option.text}</p>
                        {option.subtext && (
                          <p className="text-xs text-stone-500 leading-relaxed">{option.subtext}</p>
                        )}
                      </div>
                      <span
                        className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 border text-xs font-bold ${
                          isOptionSelected
                            ? 'bg-amber-600 text-white border-amber-600'
                            : 'border-stone-300 text-transparent'
                        }`}
                      >
                        ✓
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Stepper Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-stone-200">
              <button
                disabled={currentQuestionIndex === 0}
                onClick={handlePrev}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-colors ${
                  currentQuestionIndex === 0
                    ? 'text-stone-300 cursor-not-allowed'
                    : 'text-stone-700 hover:bg-stone-200/60'
                }`}
              >
                <ArrowLeft className="w-4 h-4" />
                <span>이전 질문</span>
              </button>

              <button
                disabled={!isSelected}
                onClick={handleNext}
                className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all ${
                  isSelected
                    ? 'bg-stone-900 text-white hover:bg-stone-800 shadow-sm cursor-pointer'
                    : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                }`}
              >
                <span>{currentQuestionIndex === totalQuestions - 1 ? '매칭 결과 보기' : '다음 질문'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          /* Result Card */
          <div className="max-w-4xl mx-auto bg-stone-50 rounded-3xl border border-stone-200 p-6 sm:p-8 lg:p-10 space-y-8 shadow-xs">
            {/* Header Badge & Title */}
            <div className="space-y-3 text-center sm:text-left">
              <div className="inline-flex items-center gap-2 text-xs font-bold px-3 py-1 rounded-full bg-amber-100 text-amber-900">
                <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                <span>성향 적합도 96% 매칭 완료</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
                {result.title}
              </h3>
              <p className="text-stone-600 text-sm sm:text-base font-medium">{result.subtitle}</p>
            </div>

            {/* Recommended Breeds Spotlight */}
            <div className="p-5 bg-white rounded-2xl border border-stone-200 space-y-3">
              <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block">
                추천 대표 견종
              </span>
              <div className="flex flex-wrap gap-2">
                {result.recommendedBreeds.map((breed, idx) => (
                  <span
                    key={idx}
                    className="px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-bold bg-amber-50 text-amber-950 border border-amber-200"
                  >
                    🐾 {breed}
                  </span>
                ))}
              </div>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed pt-1">
                {result.summary}
              </p>
            </div>

            {/* Spec Matrix Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3.5 bg-white rounded-xl border border-stone-200 space-y-1">
                <span className="text-stone-400 block font-medium">활동량 레벨</span>
                <span className="text-sm font-bold text-stone-900">{result.specs.activityLevel}</span>
              </div>
              <div className="p-3.5 bg-white rounded-xl border border-stone-200 space-y-1">
                <span className="text-stone-400 block font-medium">털 빠짐 정도</span>
                <span className="text-sm font-bold text-stone-900">{result.specs.hairShedding}</span>
              </div>
              <div className="p-3.5 bg-white rounded-xl border border-stone-200 space-y-1">
                <span className="text-stone-400 block font-medium">양육 난이도</span>
                <span className="text-sm font-bold text-amber-800">{result.specs.careDifficulty}</span>
              </div>
              <div className="p-3.5 bg-white rounded-xl border border-stone-200 space-y-1">
                <span className="text-stone-400 block font-medium">권장 주거 형태</span>
                <span className="text-sm font-bold text-stone-900 truncate block">
                  {result.specs.bestLivingSpace}
                </span>
              </div>
            </div>

            {/* Advice & Health Points */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="p-5 bg-white rounded-2xl border border-stone-200 space-y-2">
                <div className="flex items-center gap-2 text-rose-800 font-bold">
                  <ShieldCheck className="w-4 h-4 text-rose-600" />
                  <span>주의해야 할 주요 유전 질환</span>
                </div>
                <p className="text-stone-600 leading-relaxed">{result.healthCheckPoints}</p>
              </div>

              <div className="p-5 bg-white rounded-2xl border border-stone-200 space-y-2">
                <div className="flex items-center gap-2 text-stone-900 font-bold">
                  <Heart className="w-4 h-4 text-amber-600" />
                  <span>초보 견주를 위한 양육 팁</span>
                </div>
                <p className="text-stone-600 leading-relaxed">{result.expertAdvice}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-stone-200">
              <button
                onClick={handleReset}
                className="px-4 py-2.5 rounded-xl border border-stone-300 text-stone-700 text-xs sm:text-sm font-semibold hover:bg-white flex items-center gap-1.5 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                <span>테스트 다시하기</span>
              </button>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleCopyResult}
                  className="px-4 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-colors"
                >
                  {copyFeedback ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  <span>{copyFeedback ? '결과 복사 완료!' : '결과 복사하기'}</span>
                </button>
                <a
                  href="#checklist"
                  className="px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow-sm transition-colors"
                >
                  <span>필수 준비물 챙기러 가기</span>
                  <ChevronRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

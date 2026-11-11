import React, { useState } from 'react';
import { READINESS_QUESTIONS, THREE_THREE_THREE_RULE, TOXIC_FOODS_DATA, LEGAL_REGULATIONS } from '../data/precautionsData';
import { AlertTriangle, ShieldCheck, HeartHandshake, Search, Scale, Sparkles, CheckCircle2 } from 'lucide-react';

interface PrecautionsSectionProps {
  quizRef?: React.RefObject<HTMLDivElement | null>;
}

export const PrecautionsSection: React.FC<PrecautionsSectionProps> = ({ quizRef }) => {
  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showQuizResult, setShowQuizResult] = useState(false);

  // Toxic food search & filter state
  const [foodSearch, setFoodSearch] = useState('');
  const [foodFilter, setFoodFilter] = useState<'all' | 'high' | 'medium' | 'safe'>('all');
  const [activeTab, setActiveTab] = useState<'quiz' | 'threeRule' | 'toxic' | 'law'>('quiz');

  const handleSelectAnswer = (qId: number, optionIdx: number) => {
    setSelectedAnswers((prev) => ({ ...prev, [qId]: optionIdx }));
  };

  const answeredCount = Object.keys(selectedAnswers).length;
  const isQuizComplete = answeredCount === READINESS_QUESTIONS.length;

  const totalScore = READINESS_QUESTIONS.reduce((sum, q) => {
    const selectedIdx = selectedAnswers[q.id];
    if (selectedIdx !== undefined) {
      return sum + q.options[selectedIdx].score;
    }
    return sum;
  }, 0);

  const maxScore = READINESS_QUESTIONS.length * 5; // 25
  const scorePercent = Math.round((totalScore / maxScore) * 100);

  const getQuizVerdict = (score: number) => {
    if (score >= 22) {
      return {
        badge: '준비 완료 (Ready to Adopt)',
        title: '훌륭합니다! 따뜻하고 지혜로운 반려인이 되실 준비가 충분합니다.',
        description: '시간, 경제력, 가족의 동의, 15년 책임감까지 높은 이해도를 갖추고 계십니다. 추천 준비물을 미리 세팅하고 행복한 인연을 맞이하세요.',
        color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
      };
    } else if (score >= 15) {
      return {
        badge: '보완 권장 (Requires Check)',
        title: '반려 의지는 훌륭하나, 1~2가지 현실적인 생활 여건 보완이 필요합니다.',
        description: '장시간 부재 문제, 알레르기 사전 검사, 혹은 비상 의료비 대책을 먼저 가족들과 상의한 후 입양을 결정하시길 권장합니다.',
        color: 'text-amber-800 bg-amber-50 border-amber-200',
      };
    } else {
      return {
        badge: '입양 신중 재고 (Think Twice)',
        title: '지금 당장 입양하기보다는 생활 여건과 환경을 먼저 정비해 주세요.',
        description: '강아지는 혼자 있는 시간이 길거나 경제적 준비가 결핍되면 심한 스트레스와 분리불안을 겪습니다. 15년의 생명을 온전히 품을 수 있을 때 다시 도전해 주세요.',
        color: 'text-rose-700 bg-rose-50 border-rose-200',
      };
    }
  };

  const filteredFoods = TOXIC_FOODS_DATA.filter((food) => {
    const matchesSearch =
      food.name.toLowerCase().includes(foodSearch.toLowerCase()) ||
      food.reason.toLowerCase().includes(foodSearch.toLowerCase()) ||
      food.symptoms.toLowerCase().includes(foodSearch.toLowerCase());
    if (foodFilter === 'all') return matchesSearch;
    return matchesSearch && food.riskLevel === foodFilter;
  });

  return (
    <section id="precautions" className="py-16 lg:py-24 bg-[#FAF8F5] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <div className="text-xs font-semibold text-stone-500 tracking-wider uppercase">
            Section 02 · Pre & Post Adoption Precautions
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-900 tracking-tight">
            입양 전·후 반드시 알아야 할 <br />
            유의사항과 마음가짐 체크
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            단순한 귀여움 뒤에는 15년 이상의 무거운 책임이 따릅니다. 
            준비도 자가진단, 입양 첫 3-3-3 법칙, 치명적인 금기 음식과 동물보호법을 철저히 확인하세요.
          </p>
        </div>

        {/* Navigation Tabs between Submodules */}
        <div className="flex flex-wrap items-center gap-2 border-b border-stone-200 pb-3">
          <button
            onClick={() => setActiveTab('quiz')}
            className={`px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-lg transition-colors flex items-center gap-2 ${
              activeTab === 'quiz'
                ? 'bg-stone-900 text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>01. 견주 준비도 자가진단 (Quiz)</span>
          </button>
          <button
            onClick={() => setActiveTab('threeRule')}
            className={`px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-lg transition-colors flex items-center gap-2 ${
              activeTab === 'threeRule'
                ? 'bg-stone-900 text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
            }`}
          >
            <HeartHandshake className="w-4 h-4 text-amber-300" />
            <span>02. 입양 적응 3-3-3 법칙</span>
          </button>
          <button
            onClick={() => setActiveTab('toxic')}
            className={`px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-lg transition-colors flex items-center gap-2 ${
              activeTab === 'toxic'
                ? 'bg-stone-900 text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
            }`}
          >
            <AlertTriangle className="w-4 h-4 text-amber-300" />
            <span>03. 치명적 위험 음식 사전</span>
          </button>
          <button
            onClick={() => setActiveTab('law')}
            className={`px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-lg transition-colors flex items-center gap-2 ${
              activeTab === 'law'
                ? 'bg-stone-900 text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
            }`}
          >
            <Scale className="w-4 h-4 text-amber-300" />
            <span>04. 동물보호법 필수 상식</span>
          </button>
        </div>

        {/* Tab 1: Readiness Quiz */}
        {activeTab === 'quiz' && (
          <div ref={quizRef} className="space-y-8 bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-4">
              <div>
                <h3 className="text-lg font-bold text-stone-900">
                  예비 견주 5대 준비도 자가진단
                </h3>
                <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
                  솔직하게 답변해 주세요. 입양 전 놓치기 쉬운 필수 조건들을 점검합니다.
                </p>
              </div>
              <div className="text-xs font-semibold text-stone-500 font-mono tabular-nums">
                답변 진행: <span className="text-stone-900 text-sm font-bold">{answeredCount}</span> / {READINESS_QUESTIONS.length}
              </div>
            </div>

            {/* Questions list */}
            <div className="space-y-6">
              {READINESS_QUESTIONS.map((q) => {
                const selectedOptionIdx = selectedAnswers[q.id];
                return (
                  <div key={q.id} className="p-4 sm:p-5 rounded-xl bg-stone-50 border border-stone-200/80 space-y-3">
                    <div className="flex items-start gap-2.5">
                      <span className="w-6 h-6 rounded-full bg-stone-900 text-white text-xs font-bold flex items-center justify-center shrink-0">
                        {q.id}
                      </span>
                      <h4 className="text-sm sm:text-base font-bold text-stone-900 pt-0.5">
                        {q.question}
                      </h4>
                    </div>

                    <div className="grid grid-cols-1 gap-2 pt-1">
                      {q.options.map((opt, idx) => {
                        const isSelected = selectedOptionIdx === idx;
                        return (
                          <button
                            key={idx}
                            onClick={() => handleSelectAnswer(q.id, idx)}
                            className={`w-full text-left p-3 rounded-lg text-xs sm:text-sm transition-all border ${
                              isSelected
                                ? 'bg-amber-50 border-amber-400 text-amber-950 font-medium ring-1 ring-amber-300'
                                : 'bg-white border-stone-200 hover:border-stone-300 text-stone-700'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span>{opt.text}</span>
                              {isSelected && <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 ml-2" />}
                            </div>
                            {isSelected && (
                              <p className="mt-2 text-xs text-amber-900/90 bg-amber-100/60 p-2 rounded leading-relaxed">
                                💡 <strong>가이드:</strong> {opt.insight}
                              </p>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quiz Submit & Result Display */}
            <div className="pt-4 border-t border-stone-200 flex flex-col items-center">
              {!showQuizResult ? (
                <button
                  disabled={!isQuizComplete}
                  onClick={() => setShowQuizResult(true)}
                  className={`px-6 py-3 rounded-xl font-bold text-sm transition-all ${
                    isQuizComplete
                      ? 'bg-stone-900 text-white hover:bg-stone-800 shadow-sm cursor-pointer'
                      : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                  }`}
                >
                  {isQuizComplete ? '진단 결과 확인하기' : `모든 질문에 응답해 주세요 (${answeredCount}/5)`}
                </button>
              ) : (
                <div className="w-full space-y-4">
                  {(() => {
                    const verdict = getQuizVerdict(totalScore);
                    return (
                      <div className={`p-6 rounded-xl border ${verdict.color} space-y-3`}>
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-white/80 border border-current">
                            {verdict.badge}
                          </span>
                          <span className="text-lg font-bold font-mono tabular-nums">
                            {totalScore}점 / {maxScore}점 ({scorePercent}%)
                          </span>
                        </div>
                        <h4 className="text-lg sm:text-xl font-bold">{verdict.title}</h4>
                        <p className="text-sm leading-relaxed">{verdict.description}</p>
                        <div className="pt-2 flex gap-3">
                          <a
                            href="#calculator"
                            className="text-xs font-semibold underline underline-offset-4 hover:opacity-80"
                          >
                            → 현실적인 생애 양육 비용 계산해보기
                          </a>
                          <button
                            onClick={() => {
                              setSelectedAnswers({});
                              setShowQuizResult(false);
                            }}
                            className="text-xs font-semibold text-stone-600 underline underline-offset-4 ml-auto"
                          >
                            테스트 다시하기
                          </button>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 2: 3-3-3 Rule */}
        {activeTab === 'threeRule' && (
          <div className="space-y-6">
            <div className="p-4 bg-amber-50/80 border border-amber-200 rounded-xl text-xs sm:text-sm text-stone-700 leading-relaxed">
              <strong>🐾 3-3-3 법칙이란?</strong> 유기견 보호소나 임시보호처, 브리더로부터 새 가족을 맞이할 때 강아지가 겪는 심리적 탈압박과 적응의 3단계를 의미합니다. 첫날부터 완벽한 복종이나 애교를 기대하기보다 묵묵히 기다려주는 배려가 필요합니다.
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {THREE_THREE_THREE_RULE.map((rule, idx) => (
                <div key={idx} className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs flex flex-col justify-between space-y-4">
                  <div>
                    <div className="text-xs font-bold text-amber-700 tracking-wider mb-1 font-mono">
                      PHASE 0{idx + 1}
                    </div>
                    <h3 className="text-lg font-bold text-stone-900">{rule.stage}</h3>
                    <p className="text-xs font-semibold text-stone-500 mt-1">{rule.keyword}</p>
                    <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed">
                      {rule.summary}
                    </p>
                  </div>

                  <div className="space-y-3 pt-3 border-t border-stone-100 text-xs">
                    <div>
                      <strong className="text-emerald-800 font-semibold block mb-1">
                        ✓ 꼭 해주세요 (DO)
                      </strong>
                      <ul className="space-y-1 text-stone-600 list-disc list-inside">
                        {rule.dos.map((d, dIdx) => (
                          <li key={dIdx} className="leading-snug">{d}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <strong className="text-rose-800 font-semibold block mb-1">
                        ✕ 절대 하지 마세요 (DON'T)
                      </strong>
                      <ul className="space-y-1 text-stone-600 list-disc list-inside">
                        {rule.donts.map((d, dIdx) => (
                          <li key={dIdx} className="leading-snug">{d}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Toxic Food Lookup */}
        {activeTab === 'toxic' && (
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-xs space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-stone-900">
                  반려견 절대 금기 & 위험 음식 검색기
                </h3>
                <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
                  사람에겐 건강식이어도 강아지에겐 1알로 생명을 위협하는 치명적 독소가 있습니다.
                </p>
              </div>

              {/* Search input */}
              <div className="relative min-w-[240px]">
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={foodSearch}
                  onChange={(e) => setFoodSearch(e.target.value)}
                  placeholder="음식명 검색 (예: 초콜릿, 양파, 뼈...)"
                  className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-stone-400"
                />
              </div>
            </div>

            {/* Risk filter buttons */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setFoodFilter('all')}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                  foodFilter === 'all'
                    ? 'bg-stone-900 text-white'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                전체 보기
              </button>
              <button
                onClick={() => setFoodFilter('high')}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                  foodFilter === 'high'
                    ? 'bg-red-600 text-white'
                    : 'bg-red-50 text-red-700 border border-red-200'
                }`}
              >
                🚨 치명적 위험 (절대 금지)
              </button>
              <button
                onClick={() => setFoodFilter('medium')}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                  foodFilter === 'medium'
                    ? 'bg-amber-600 text-white'
                    : 'bg-amber-50 text-amber-800 border border-amber-200'
                }`}
              >
                ⚠️ 섭취 주의
              </button>
              <button
                onClick={() => setFoodFilter('safe')}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                  foodFilter === 'safe'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                }`}
              >
                ✓ 적정 급여 가능
              </button>
            </div>

            {/* Foods Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredFoods.map((food) => (
                <div
                  key={food.id}
                  className={`p-4 rounded-xl border space-y-2.5 transition-all ${
                    food.riskLevel === 'high'
                      ? 'bg-red-50/40 border-red-200'
                      : food.riskLevel === 'medium'
                      ? 'bg-amber-50/40 border-amber-200'
                      : 'bg-emerald-50/40 border-emerald-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-base font-bold text-stone-900">{food.name}</h4>
                    <span
                      className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                        food.riskLevel === 'high'
                          ? 'bg-red-100 text-red-800'
                          : food.riskLevel === 'medium'
                          ? 'bg-amber-100 text-amber-900'
                          : 'bg-emerald-100 text-emerald-900'
                      }`}
                    >
                      {food.category}
                    </span>
                  </div>

                  <p className="text-xs text-stone-600 leading-relaxed">{food.reason}</p>

                  <div className="pt-2 border-t border-stone-200/60 space-y-1 text-xs">
                    <div>
                      <strong className="text-stone-700 font-semibold">증상:</strong>{' '}
                      <span className="text-stone-600">{food.symptoms}</span>
                    </div>
                    <div>
                      <strong className="text-stone-700 font-semibold">대처:</strong>{' '}
                      <span className="text-stone-800 font-medium">{food.emergencyAction}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredFoods.length === 0 && (
              <div className="text-center py-8 text-stone-400 text-sm">
                일치하는 음식 정보가 없습니다.
              </div>
            )}
          </div>
        )}

        {/* Tab 4: Legal Regulations */}
        {activeTab === 'law' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {LEGAL_REGULATIONS.map((law, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-3">
                <div className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center text-stone-800 font-bold text-sm">
                  0{idx + 1}
                </div>
                <h3 className="text-base font-bold text-stone-900">{law.title}</h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">{law.content}</p>
                <div className="pt-3 border-t border-stone-100">
                  <div className="text-xs font-semibold text-rose-700 bg-rose-50 p-2.5 rounded-lg border border-rose-200">
                    ⚖️ {law.penalty}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

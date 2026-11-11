import React, { useState } from 'react';
import { COST_PRESETS, COMMON_UNEXPECTED_MEDICAL_EXPENSES } from '../data/costData';
import { Calculator, Wallet, AlertCircle, TrendingUp, Sparkles, ShieldAlert } from 'lucide-react';

export const CostCalculatorSection: React.FC = () => {
  const [selectedSize, setSelectedSize] = useState<'small' | 'medium' | 'large'>('small');
  const [foodQualityMultiplier, setFoodQualityMultiplier] = useState<number>(1.0); // 0.8: 실속, 1.0: 프리미엄, 1.4: 최고급 화식/동결건조
  const [groomingAtShop, setGroomingAtShop] = useState<boolean>(true);
  const [customMedicalReserve, setCustomMedicalReserve] = useState<number>(50000); // 월 비상적립금

  const preset = COST_PRESETS[selectedSize];

  // Base initial cost
  const initialCost = preset.initialItems.reduce((sum, item) => sum + item.cost, 0);

  // Monthly items calculation
  const calculatedMonthlyItems = preset.monthlyItems.map((item) => {
    let cost = item.cost;
    if (item.name.includes('사료')) {
      cost = Math.round(cost * foodQualityMultiplier);
    }
    if (item.name.includes('미용')) {
      cost = groomingAtShop ? cost : Math.round(cost * 0.25); // 집에서 셀프 미용 시 25%만 소모품 비용
    }
    return { ...item, cost };
  });

  const baseMonthlyTotal = calculatedMonthlyItems.reduce((sum, item) => sum + item.cost, 0);
  const monthlyTotalWithReserve = baseMonthlyTotal + customMedicalReserve;

  // Annual recurring medical / checkup
  const annualTotal = preset.annualItems.reduce((sum, item) => sum + item.cost, 0);

  // 1st Year total: initial setup + 12 months maintenance + annual items
  const firstYearTotal = initialCost + monthlyTotalWithReserve * 12 + annualTotal;

  // Subsequent annual cost (Year 2 to 15)
  const annualSubsequentCost = monthlyTotalWithReserve * 12 + annualTotal;

  // Lifetime 15 years calculation
  const lifetimeYears = 15;
  const lifetimeTotal = firstYearTotal + annualSubsequentCost * (lifetimeYears - 1);

  // Breakdown percentages for 15-year lifetime
  const lifetimeFood = calculatedMonthlyItems.find((i) => i.name.includes('사료'))?.cost || 0;
  const lifetimeSnacks = calculatedMonthlyItems.find((i) => i.name.includes('간식'))?.cost || 0;
  const lifetimeFoodTotal = (lifetimeFood + lifetimeSnacks) * 12 * lifetimeYears;

  const lifetimeMedical =
    (annualTotal + customMedicalReserve * 12 + (preset.monthlyItems.find((i) => i.name.includes('구충제'))?.cost || 0) * 12) *
      lifetimeYears +
    (preset.initialItems.find((i) => i.name.includes('접종'))?.cost || 0) +
    (preset.initialItems.find((i) => i.name.includes('중성화'))?.cost || 0);

  const lifetimeHygieneGrooming =
    ((calculatedMonthlyItems.find((i) => i.name.includes('미용'))?.cost || 0) +
      (calculatedMonthlyItems.find((i) => i.name.includes('패드'))?.cost || 0)) *
    12 *
    lifetimeYears;

  const lifetimeOthers = lifetimeTotal - (lifetimeFoodTotal + lifetimeMedical + lifetimeHygieneGrooming);

  const foodPercent = Math.round((lifetimeFoodTotal / lifetimeTotal) * 100);
  const medicalPercent = Math.round((lifetimeMedical / lifetimeTotal) * 100);
  const hygienePercent = Math.round((lifetimeHygieneGrooming / lifetimeTotal) * 100);
  const othersPercent = 100 - (foodPercent + medicalPercent + hygienePercent);

  return (
    <section id="calculator" className="py-16 lg:py-24 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <div className="text-xs font-semibold text-stone-500 tracking-wider uppercase">
            Section 03 · Realistic Cost Simulator
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-900 tracking-tight">
            강아지를 데려온 후, <br />
            실제로 들어가는 평생 양육 비용 계산기
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            "사료값 얼마 안 들겠지" 하는 생각은 금물입니다. 
            견종 크기별 초기 세팅비, 매월 고정비, 연간 예방접종, 비상 의료비까지 
            15년 생애 주기 통계를 바탕으로 투명하게 시뮬레이션해 드립니다.
          </p>
        </div>

        {/* Size Selection Tabs */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-2 bg-stone-100 rounded-2xl border border-stone-200">
          <div className="flex items-center gap-1.5 w-full sm:w-auto">
            {(['small', 'medium', 'large'] as const).map((sizeKey) => {
              const p = COST_PRESETS[sizeKey];
              const isSelected = selectedSize === sizeKey;
              return (
                <button
                  key={sizeKey}
                  onClick={() => setSelectedSize(sizeKey)}
                  className={`flex-1 sm:flex-none px-5 py-3 rounded-xl text-sm font-bold transition-all text-center whitespace-nowrap ${
                    isSelected
                      ? 'bg-stone-900 text-white shadow-sm'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
                  }`}
                >
                  {p.sizeName}
                </button>
              );
            })}
          </div>
          <div className="px-4 py-2 text-xs text-stone-600 bg-white/70 rounded-xl border border-stone-200/80">
            <strong>선택 체급:</strong> {preset.weightRange}
          </div>
        </div>

        {/* Interactive Customization Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-stone-50 rounded-2xl border border-stone-200">
          {/* Control 1: Food Quality */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-stone-800 uppercase tracking-wide block">
              1. 사료 등급 선택
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {[
                { label: '실속 프리미엄', mult: 0.85 },
                { label: '홀리스틱 (추천)', mult: 1.0 },
                { label: '유기농 화식/동결', mult: 1.4 },
              ].map((opt) => (
                <button
                  key={opt.label}
                  onClick={() => setFoodQualityMultiplier(opt.mult)}
                  className={`py-2 px-1 text-xs rounded-lg font-medium border transition-colors ${
                    foodQualityMultiplier === opt.mult
                      ? 'bg-amber-100 border-amber-400 text-amber-900 font-bold'
                      : 'bg-white border-stone-200 text-stone-600 hover:bg-stone-50'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            <p className="text-[11px] text-stone-500">
              * 영양 불균형 방지를 위해 AAFCO 인증 완료 사료를 권장합니다.
            </p>
          </div>

          {/* Control 2: Grooming Method */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-stone-800 uppercase tracking-wide block">
              2. 미용 & 스파 방식
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setGroomingAtShop(true)}
                className={`py-2 px-3 text-xs rounded-lg font-medium border transition-colors ${
                  groomingAtShop
                    ? 'bg-amber-100 border-amber-400 text-amber-900 font-bold'
                    : 'bg-white border-stone-200 text-stone-600 hover:bg-stone-50'
                }`}
              >
                전문 펫숍 정기 미용
              </button>
              <button
                onClick={() => setGroomingAtShop(false)}
                className={`py-2 px-3 text-xs rounded-lg font-medium border transition-colors ${
                  !groomingAtShop
                    ? 'bg-amber-100 border-amber-400 text-amber-900 font-bold'
                    : 'bg-white border-stone-200 text-stone-600 hover:bg-stone-50'
                }`}
              >
                홈 셀프 케어 & 목욕
              </button>
            </div>
            <p className="text-[11px] text-stone-500">
              * 장모종(푸들, 말티즈 등)은 4~6주 주기 위생 미용이 필수입니다.
            </p>
          </div>

          {/* Control 3: Medical Emergency Reserve */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-bold text-stone-800">
              <span>3. 월 비상 의료비 적립금</span>
              <span className="text-amber-800 font-mono">{customMedicalReserve.toLocaleString()}원/월</span>
            </div>
            <input
              type="range"
              min={30000}
              max={150000}
              step={10000}
              value={customMedicalReserve}
              onChange={(e) => setCustomMedicalReserve(Number(e.target.value))}
              className="w-full accent-amber-600 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-stone-400">
              <span>월 3만원 (기본)</span>
              <span>월 15만원 (집중 대비)</span>
            </div>
          </div>
        </div>

        {/* Calculation Result Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: 1st Year */}
          <div className="p-6 rounded-2xl bg-stone-900 text-white space-y-4 shadow-sm relative overflow-hidden">
            <div className="text-xs uppercase tracking-wider text-amber-300 font-bold flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              <span>첫 1년차 총 지출</span>
            </div>
            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-extrabold font-mono tabular-nums text-white">
                {firstYearTotal.toLocaleString()}원
              </div>
              <p className="text-xs text-stone-300">
                초기 용품 + 1~5차 기초 백신 + 중성화 + 12개월 유지비 포함
              </p>
            </div>
            <div className="pt-3 border-t border-stone-800 text-xs space-y-1.5 text-stone-300">
              <div className="flex justify-between">
                <span>초기 일회성 비용</span>
                <span className="font-mono">{initialCost.toLocaleString()}원</span>
              </div>
              <div className="flex justify-between">
                <span>첫해 12개월 월별 합계</span>
                <span className="font-mono">{(monthlyTotalWithReserve * 12).toLocaleString()}원</span>
              </div>
              <div className="flex justify-between">
                <span>연간 정기 접종 & 검진</span>
                <span className="font-mono">{annualTotal.toLocaleString()}원</span>
              </div>
            </div>
          </div>

          {/* Card 2: Year 2+ Monthly */}
          <div className="p-6 rounded-2xl bg-amber-50 border border-amber-200 space-y-4 shadow-xs">
            <div className="text-xs uppercase tracking-wider text-amber-900 font-bold flex items-center gap-1.5">
              <Wallet className="w-4 h-4 text-amber-700" />
              <span>2년차 이후 월평균 지출</span>
            </div>
            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-extrabold font-mono tabular-nums text-stone-900">
                {monthlyTotalWithReserve.toLocaleString()}원
              </div>
              <p className="text-xs text-stone-600">
                매월 고정 사료, 구충, 위생패드, 미용 및 비상 적립금
              </p>
            </div>
            <div className="pt-3 border-t border-amber-200/80 text-xs space-y-1.5 text-stone-700">
              <div className="flex justify-between">
                <span>기본 고정 유지비</span>
                <span className="font-mono font-semibold">{baseMonthlyTotal.toLocaleString()}원</span>
              </div>
              <div className="flex justify-between">
                <span>비상 의료 적립금</span>
                <span className="font-mono text-amber-800 font-semibold">+{customMedicalReserve.toLocaleString()}원</span>
              </div>
              <div className="flex justify-between text-stone-500 pt-1">
                <span>(연간 정기비용 월 환산)</span>
                <span className="font-mono">+{Math.round(annualTotal / 12).toLocaleString()}원</span>
              </div>
            </div>
          </div>

          {/* Card 3: 15-Year Lifetime Total */}
          <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200 space-y-4 shadow-xs">
            <div className="text-xs uppercase tracking-wider text-stone-600 font-bold flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-stone-700" />
              <span>15년 생애 누적 예상 비용</span>
            </div>
            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-extrabold font-mono tabular-nums text-amber-900">
                {lifetimeTotal.toLocaleString()}원
              </div>
              <p className="text-xs text-stone-500">
                15년간 반려견을 건강하게 돌보기 위한 현실적 총액
              </p>
            </div>
            <div className="pt-3 border-t border-stone-200 text-xs space-y-1.5 text-stone-600">
              <div className="flex justify-between">
                <span>연평균 환산액</span>
                <span className="font-mono font-semibold text-stone-900">
                  약 {Math.round(lifetimeTotal / 15).toLocaleString()}원 / 년
                </span>
              </div>
              <div className="flex justify-between">
                <span>일평균 커피값 환산</span>
                <span className="font-mono text-stone-900">
                  하루 약 {Math.round(lifetimeTotal / (15 * 365)).toLocaleString()}원
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 15-Year Lifetime Expense Distribution Bar */}
        <div className="p-6 bg-stone-50 rounded-2xl border border-stone-200 space-y-4">
          <div className="flex items-center justify-between text-xs font-bold text-stone-700">
            <span>15년 생애 지출 카테고리별 비중</span>
            <span className="text-stone-500">총 100% 비율</span>
          </div>

          {/* Visual Bar */}
          <div className="h-5 w-full rounded-lg overflow-hidden flex bg-stone-200">
            <div
              style={{ width: `${foodPercent}%` }}
              className="bg-amber-600 h-full transition-all"
              title={`사료 및 간식: ${foodPercent}%`}
            />
            <div
              style={{ width: `${medicalPercent}%` }}
              className="bg-red-500 h-full transition-all"
              title={`의료 및 백신: ${medicalPercent}%`}
            />
            <div
              style={{ width: `${hygienePercent}%` }}
              className="bg-blue-500 h-full transition-all"
              title={`미용 및 위생: ${hygienePercent}%`}
            />
            <div
              style={{ width: `${othersPercent}%` }}
              className="bg-stone-500 h-full transition-all"
              title={`초기 용품 및 기타: ${othersPercent}%`}
            />
          </div>

          {/* Legend */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-1">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm bg-amber-600 shrink-0" />
              <span className="text-stone-700 font-medium">사료 & 간식: {foodPercent}%</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm bg-red-500 shrink-0" />
              <span className="text-stone-700 font-medium">의료 & 예방: {medicalPercent}%</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm bg-blue-500 shrink-0" />
              <span className="text-stone-700 font-medium">미용 & 위생: {hygienePercent}%</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm bg-stone-500 shrink-0" />
              <span className="text-stone-700 font-medium">초기 & 기타: {othersPercent}%</span>
            </div>
          </div>
        </div>

        {/* Detailed Itemized Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Initial Costs Table */}
          <div className="border border-stone-200 rounded-2xl overflow-hidden bg-white shadow-xs">
            <div className="bg-stone-100 px-5 py-3.5 border-b border-stone-200 flex justify-between items-center">
              <h3 className="font-bold text-stone-900 text-sm">입양 초기 1회성 세팅 비용</h3>
              <span className="font-mono text-xs font-bold text-stone-900 tabular-nums">
                소계: {initialCost.toLocaleString()}원
              </span>
            </div>
            <div className="divide-y divide-stone-100 text-xs sm:text-sm">
              {preset.initialItems.map((item, idx) => (
                <div key={idx} className="p-4 flex justify-between items-start gap-4">
                  <div>
                    <p className="font-bold text-stone-800">{item.name}</p>
                    <p className="text-stone-500 text-xs mt-0.5">{item.desc}</p>
                  </div>
                  <span className="font-mono font-semibold text-stone-900 shrink-0 tabular-nums">
                    {item.cost.toLocaleString()}원
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Monthly Recurring Costs Table */}
          <div className="border border-stone-200 rounded-2xl overflow-hidden bg-white shadow-xs">
            <div className="bg-stone-100 px-5 py-3.5 border-b border-stone-200 flex justify-between items-center">
              <h3 className="font-bold text-stone-900 text-sm">매월 고정 유지 비용 (정기)</h3>
              <span className="font-mono text-xs font-bold text-stone-900 tabular-nums">
                월 합계: {monthlyTotalWithReserve.toLocaleString()}원
              </span>
            </div>
            <div className="divide-y divide-stone-100 text-xs sm:text-sm">
              {calculatedMonthlyItems.map((item, idx) => (
                <div key={idx} className="p-4 flex justify-between items-start gap-4">
                  <div>
                    <p className="font-bold text-stone-800">{item.name}</p>
                    <p className="text-stone-500 text-xs mt-0.5">{item.desc}</p>
                  </div>
                  <span className="font-mono font-semibold text-stone-900 shrink-0 tabular-nums">
                    {item.cost.toLocaleString()}원
                  </span>
                </div>
              ))}
              <div className="p-4 flex justify-between items-start gap-4 bg-amber-50/50">
                <div>
                  <p className="font-bold text-amber-900">비상 의료 적립금 (선택 설정)</p>
                  <p className="text-amber-800/80 text-xs mt-0.5">슬개골, 치과, 급성 질환 대비 월 저축</p>
                </div>
                <span className="font-mono font-semibold text-amber-900 shrink-0 tabular-nums">
                  {customMedicalReserve.toLocaleString()}원
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Unexpected Medical Risk Box */}
        <div className="p-6 bg-red-50/50 border border-red-200 rounded-2xl space-y-4">
          <div className="flex items-center gap-2 text-red-800 font-bold text-sm">
            <ShieldAlert className="w-5 h-5 text-red-600" />
            <span>꼭 알아야 할 돌발 비상 의료비 (실제 수의학 통계)</span>
          </div>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            반려견은 국민건강보험 적용이 되지 않아 단 한 번의 큰 수술로도 수백만원의 목돈이 발생합니다. 
            많은 초보 견주들이 입양 전 이를 간과해 곤경에 처합니다.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            {COMMON_UNEXPECTED_MEDICAL_EXPENSES.map((med, idx) => (
              <div key={idx} className="bg-white p-4 rounded-xl border border-red-200/80 space-y-2">
                <h4 className="font-bold text-stone-900 text-xs sm:text-sm">{med.name}</h4>
                <p className="text-xs font-mono font-bold text-red-700">{med.range}</p>
                <p className="text-[11px] text-stone-500 leading-relaxed">{med.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

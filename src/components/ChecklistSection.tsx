import React, { useState, useEffect } from 'react';
import { INITIAL_CHECKLIST_ITEMS, CHECKLIST_CATEGORIES } from '../data/checklistData';
import { ChecklistItem } from '../types';
import { Check, Copy, CheckCheck, RefreshCw, AlertCircle, Info, ChevronDown, ChevronUp } from 'lucide-react';

export const ChecklistSection: React.FC = () => {
  const [items] = useState<ChecklistItem[]>(INITIAL_CHECKLIST_ITEMS);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [onlyEssential, setOnlyEssential] = useState<boolean>(false);
  const [checkedIds, setCheckedIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('pawstep_checked_items');
      return saved ? new Set(JSON.parse(saved)) : new Set(['c1', 'c2', 'c3', 'c6', 'c7']);
    } catch {
      return new Set(['c1', 'c2', 'c3', 'c6', 'c7']);
    }
  });
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [copyFeedback, setCopyFeedback] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('pawstep_checked_items', JSON.stringify(Array.from(checkedIds)));
    } catch {
      // ignore
    }
  }, [checkedIds]);

  const toggleCheck = (id: string) => {
    setCheckedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const checkAllVisible = () => {
    const next = new Set(checkedIds);
    filteredItems.forEach((item) => next.add(item.id));
    setCheckedIds(next);
  };

  const resetAll = () => {
    setCheckedIds(new Set());
  };

  const filteredItems = items.filter((item) => {
    if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;
    if (onlyEssential && !item.isEssential) return false;
    return true;
  });

  const totalItemsCount = items.length;
  const totalCheckedCount = items.filter((it) => checkedIds.has(it.id)).length;
  const progressPercent = Math.round((totalCheckedCount / totalItemsCount) * 100);

  const checkedTotalCost = items
    .filter((it) => checkedIds.has(it.id))
    .reduce((sum, it) => sum + it.estimatedCost, 0);

  const totalPossibleCost = items.reduce((sum, it) => sum + it.estimatedCost, 0);

  const handleCopySummary = () => {
    const text = items
      .map(
        (it) =>
          `[${checkedIds.has(it.id) ? 'V' : ' '}] ${it.isEssential ? '(필수)' : '(권장)'} ${it.title} - 예상 ${it.estimatedCost.toLocaleString()}원`
      )
      .join('\n');
    navigator.clipboard.writeText(`[반려첫걸음] 강아지 입양 전 필수 준비물 체크리스트\n\n${text}`);
    setCopyFeedback(true);
    setTimeout(() => setCopyFeedback(false), 2000);
  };

  return (
    <section id="checklist" className="py-16 lg:py-24 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="text-xs font-semibold text-stone-500 tracking-wider uppercase">
              Section 01 · Pre-Adoption Preparation
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-900 tracking-tight">
              강아지를 데려오기 전, <br className="hidden sm:inline" />
              반드시 준비해야 할 17가지 필수품
            </h2>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              도착 당일 당황하지 않도록 미끄럼 방지 매트부터 배변패드, 켄넬, 하네스까지 
              직접 체크하며 꼼꼼하게 홈 세팅을 완성하세요.
            </p>
          </div>

          {/* Quick Progress Indicator */}
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 min-w-[280px]">
            <div className="flex items-center justify-between text-xs font-semibold text-stone-700 mb-2">
              <span>준비 진행률</span>
              <span className="font-mono tabular-nums text-amber-700 text-sm">
                {totalCheckedCount} / {totalItemsCount}개 ({progressPercent}%)
              </span>
            </div>
            <div className="w-full bg-stone-200 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-amber-600 h-full rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="mt-2 text-[13px] text-stone-500 flex justify-between items-center tabular-nums">
              <span>현재 체크 예산</span>
              <span className="font-semibold text-stone-900">
                {checkedTotalCost.toLocaleString()}원 / {totalPossibleCost.toLocaleString()}원
              </span>
            </div>
          </div>
        </div>

        {/* Featured Visual & Puppy-Proofing Tip Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center p-6 bg-stone-50 rounded-2xl border border-stone-200/90">
          <div className="lg:col-span-4 rounded-xl overflow-hidden aspect-[4/3] bg-stone-200">
            <img
              src="/src/assets/images/dog_supplies_flatlay_1794378459467.jpg"
              alt="입양 전 필수 준비물 플랫레이"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="lg:col-span-8 space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-800">
              <Info className="w-4 h-4 text-amber-700" />
              <span>전문 훈련사가 전하는 홈 세팅 골든룰</span>
            </div>
            <h3 className="text-lg font-bold text-stone-900">
              데려오기 24시간 전 '퍼피 프루핑(Puppy-Proofing)' 완료하기
            </h3>
            <p className="text-sm text-stone-600 leading-relaxed">
              강아지의 시선(바닥에서 30cm)으로 집안을 둘러보세요. 
              스마트폰 충전기 선, 바닥에 떨어진 동전이나 머리끈, 쓰레기통, 베란다 난간 틈새, 
              삼키면 치명적인 독성 화분(몬스테라, 백합, 아이비 등)을 미리 높은 곳으로 치워야 불의의 사고를 방지할 수 있습니다.
            </p>
            <div className="pt-2 flex flex-wrap gap-2 text-xs text-stone-600">
              <span className="bg-white border border-stone-200 px-2.5 py-1 rounded-md">✓ 바닥 전선 몰딩 처리</span>
              <span className="bg-white border border-stone-200 px-2.5 py-1 rounded-md">✓ 미끄럼 방지 롤매트 시공</span>
              <span className="bg-white border border-stone-200 px-2.5 py-1 rounded-md">✓ 주방/현관 안전문 장착</span>
            </div>
          </div>
        </div>

        {/* Category Filter & Control Bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-2">
          {/* Category Tabs (interactive button pills) */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-stone-100 rounded-xl border border-stone-200/80">
            {CHECKLIST_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
                  selectedCategory === cat.id
                    ? 'bg-white text-stone-900 shadow-sm font-semibold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Action Toolbar */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <button
              onClick={() => setOnlyEssential(!onlyEssential)}
              className={`px-3 py-2 rounded-lg font-medium border transition-colors ${
                onlyEssential
                  ? 'bg-amber-100 border-amber-300 text-amber-900 font-semibold'
                  : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
              }`}
            >
              {onlyEssential ? '★ 필수 품목만 보는 중' : '필수 품목만 필터'}
            </button>
            <button
              onClick={checkAllVisible}
              className="px-3 py-2 bg-white hover:bg-stone-50 border border-stone-200 rounded-lg text-stone-700 flex items-center gap-1.5"
            >
              <CheckCheck className="w-3.5 h-3.5 text-stone-600" />
              <span>현재 항목 모두 완료</span>
            </button>
            <button
              onClick={resetAll}
              className="px-3 py-2 bg-white hover:bg-stone-50 border border-stone-200 rounded-lg text-stone-700 flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5 text-stone-500" />
              <span>초기화</span>
            </button>
            <button
              onClick={handleCopySummary}
              className="px-3 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-lg flex items-center gap-1.5 font-medium shadow-xs"
            >
              <Copy className="w-3.5 h-3.5 text-amber-300" />
              <span>{copyFeedback ? '복사 완료!' : '체크리스트 복사'}</span>
            </button>
          </div>
        </div>

        {/* Checklist Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredItems.map((item) => {
            const isChecked = checkedIds.has(item.id);
            const isExpanded = expandedId === item.id;

            return (
              <div
                key={item.id}
                className={`p-4 sm:p-5 rounded-xl border transition-all duration-200 ${
                  isChecked
                    ? 'bg-stone-50/80 border-stone-300/80 opacity-90'
                    : 'bg-white border-stone-200 hover:border-stone-300 shadow-xs'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  {/* Custom Checkbox */}
                  <button
                    onClick={() => toggleCheck(item.id)}
                    aria-label={`${item.title} 체크 토글`}
                    className={`mt-0.5 w-6 h-6 rounded-md flex items-center justify-center shrink-0 transition-colors ${
                      isChecked
                        ? 'bg-amber-600 text-white'
                        : 'border-2 border-stone-300 bg-white hover:border-amber-500'
                    }`}
                  >
                    {isChecked && <Check className="w-4 h-4 stroke-[3]" />}
                  </button>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-xs font-semibold px-2 py-0.5 rounded ${
                            item.isEssential
                              ? 'bg-red-50 text-red-700 border border-red-200'
                              : 'bg-stone-100 text-stone-600 border border-stone-200'
                          }`}
                        >
                          {item.isEssential ? '필수' : '권장'}
                        </span>
                        <h4
                          className={`text-base font-bold tracking-tight truncate ${
                            isChecked ? 'line-through text-stone-400' : 'text-stone-900'
                          }`}
                        >
                          {item.title}
                        </h4>
                      </div>
                      <span className="text-xs font-semibold text-stone-500 font-mono tabular-nums whitespace-nowrap">
                        약 {item.estimatedCost.toLocaleString()}원
                      </span>
                    </div>

                    <p className="mt-1 text-xs sm:text-sm text-stone-600 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Expandable Advice */}
                    <div className="mt-3 pt-3 border-t border-stone-100 flex items-center justify-between">
                      <button
                        onClick={() => setExpandedId(isExpanded ? null : item.id)}
                        className="text-xs font-medium text-stone-600 hover:text-stone-900 flex items-center gap-1"
                      >
                        <span>{isExpanded ? '상세 팁 닫기' : '왜 필요할까요? & 구매 팁'}</span>
                        {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </button>
                    </div>

                    {isExpanded && (
                      <div className="mt-3 p-3 bg-amber-50/70 border border-amber-200/70 rounded-lg space-y-2 text-xs">
                        <div>
                          <strong className="text-amber-900 font-semibold block mb-0.5">💡 왜 꼭 필요한가요?</strong>
                          <p className="text-stone-700 leading-relaxed">{item.whyNeeded}</p>
                        </div>
                        <div>
                          <strong className="text-amber-900 font-semibold block mb-0.5">🛍️ 추천 구매 팁</strong>
                          <p className="text-stone-700 leading-relaxed">{item.tips}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12 text-stone-500">
            조건에 맞는 준비물 항목이 없습니다.
          </div>
        )}
      </div>
    </section>
  );
};

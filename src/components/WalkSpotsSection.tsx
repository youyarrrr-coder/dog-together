import React, { useState } from 'react';
import { WALK_SPOTS, WALK_ESSENTIALS_CHECKLIST } from '../data/walkSpotsData';
import { WalkSpot } from '../types';
import {
  MapPin,
  Clock,
  Car,
  Droplets,
  Trash2,
  Shield,
  Sun,
  Search,
  CheckSquare,
  Sparkles,
  ThermometerSun,
  ExternalLink,
} from 'lucide-react';

export const WalkSpotsSection: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<string>('전체');
  const [selectedTag, setSelectedTag] = useState<string>('전체');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showBagModal, setShowBagModal] = useState<boolean>(false);
  const [bagChecked, setBagChecked] = useState<Record<number, boolean>>({});

  const regions = ['전체', '서울', '경기', '인천', '강원', '충청', '경상/부산', '전라/제주'];
  const tags = ['전체', '반려견놀이터', '수변공원', '숲길/트레킹', '잔디광장'];

  const filteredSpots = WALK_SPOTS.filter((spot) => {
    if (selectedRegion !== '전체' && spot.region !== selectedRegion) return false;
    if (selectedTag !== '전체' && spot.tag !== selectedTag) return false;
    if (
      searchQuery &&
      !spot.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !spot.city.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !spot.address.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const toggleBagItem = (idx: number) => {
    setBagChecked((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const bagProgress = Math.round(
    (Object.values(bagChecked).filter(Boolean).length / WALK_ESSENTIALS_CHECKLIST.length) * 100
  );

  return (
    <section id="walkspots" className="py-16 lg:py-24 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-3xl space-y-3">
            <div className="text-xs font-semibold text-stone-500 tracking-wider uppercase">
              Section 05 · Curated Dog-Friendly Walk Spots
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-900 tracking-tight">
              반려견과 함께 걷기 좋은 <br />
              전국 대표 산책로 & 도그파크 추천
            </h2>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              목줄 없이 자유롭게 뛰놀 수 있는 공공 오프리시 놀이터부터, 
              평지 흙길로 관절에 부담 없는 수변공원과 힐링 숲길까지 검증된 명소를 소개합니다.
            </p>
          </div>

          {/* Walk Bag Packing Quick Action */}
          <button
            onClick={() => setShowBagModal(true)}
            className="px-5 py-3 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold text-xs sm:text-sm flex items-center gap-2 transition-all border border-amber-300 shadow-xs whitespace-nowrap"
          >
            <CheckSquare className="w-4 h-4 text-amber-800" />
            <span>외출 전 산책가방 체크리스트</span>
          </button>
        </div>

        {/* Featured Visual & Safe Walk Guide Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center p-6 bg-stone-50 rounded-2xl border border-stone-200">
          <div className="lg:col-span-5 rounded-xl overflow-hidden aspect-[16/10] bg-stone-200">
            <img
              src="/src/assets/images/dog_walk_park_trail_1794378459707.jpg"
              alt="산책하기 좋은 나무 데크길과 자연 공원"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-800">
              <ThermometerSun className="w-4 h-4 text-amber-700" />
              <span>사계절 안전 산책 핵심 팁</span>
            </div>
            <h3 className="text-lg font-bold text-stone-900">
              여름철 '아스팔트 7초 법칙'과 겨울철 염화칼슘 주의보
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-stone-600">
              <div className="p-3 bg-white rounded-lg border border-stone-200">
                <strong className="text-amber-900 block mb-1 font-semibold">☀️ 여름철 화상 방지:</strong>
                햇볕이 강할 땐 손등을 아스팔트에 7초간 대보세요. 뜨거워서 뗄 정도면 강아지 발바닥 패드는 2도 화상을 입습니다.
              </div>
              <div className="p-3 bg-white rounded-lg border border-stone-200">
                <strong className="text-blue-900 block mb-1 font-semibold">❄️ 겨울철 화학 화상 방지:</strong>
                제설용 염화칼슘은 강아지 발 패드를 부식시키고 핥으면 위장염을 일으킵니다. 산책 후 반드시 미온수로 발을 세척하세요.
              </div>
            </div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="space-y-4 pt-2">
          {/* Region Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
            <span className="text-xs font-bold text-stone-500 mr-2 shrink-0">권역:</span>
            {regions.map((region) => (
              <button
                key={region}
                onClick={() => setSelectedRegion(region)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  selectedRegion === region
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {region}
              </button>
            ))}
          </div>

          {/* Tag & Search Row */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              <span className="text-xs font-bold text-stone-500 mr-2 shrink-0">테마:</span>
              {tags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-3 py-1 rounded-md text-xs font-medium whitespace-nowrap border transition-colors ${
                    selectedTag === tag
                      ? 'bg-amber-100 border-amber-300 text-amber-900 font-bold'
                      : 'bg-white border-stone-200 text-stone-600 hover:bg-stone-50'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>

            <div className="relative min-w-[240px]">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="장소명, 지역 검색 (예: 월드컵, 광교)"
                className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-stone-400"
              />
            </div>
          </div>
        </div>

        {/* Spots Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSpots.map((spot) => (
            <div
              key={spot.id}
              className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs hover:border-stone-300 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                {/* Header: Badges & Name */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-stone-500">{spot.city}</span>
                    <div className="flex items-center gap-1">
                      {spot.leashFreeAllowed ? (
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                          오프리시 가능
                        </span>
                      ) : (
                        <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-stone-100 text-stone-600">
                          목줄 필수 (2m)
                        </span>
                      )}
                      <span className="text-[11px] font-medium px-1.5 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
                        {spot.tag}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-stone-900 tracking-tight">
                    {spot.name}
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {spot.description}
                </p>

                {/* Amenities Icons Strip */}
                <div className="pt-2 border-t border-stone-100 flex flex-wrap gap-2 text-[11px] text-stone-600">
                  {spot.amenities.parking && (
                    <span className="inline-flex items-center gap-1 bg-stone-50 px-2 py-1 rounded border border-stone-200/80">
                      <Car className="w-3.5 h-3.5 text-stone-500" /> 주차 가능
                    </span>
                  )}
                  {spot.amenities.fencedArea && (
                    <span className="inline-flex items-center gap-1 bg-stone-50 px-2 py-1 rounded border border-stone-200/80">
                      <Shield className="w-3.5 h-3.5 text-stone-500" /> 안전 펜스
                    </span>
                  )}
                  {spot.amenities.waterStation && (
                    <span className="inline-flex items-center gap-1 bg-stone-50 px-2 py-1 rounded border border-stone-200/80">
                      <Droplets className="w-3.5 h-3.5 text-stone-500" /> 음수대
                    </span>
                  )}
                  {spot.amenities.poopBagDispenser && (
                    <span className="inline-flex items-center gap-1 bg-stone-50 px-2 py-1 rounded border border-stone-200/80">
                      <Trash2 className="w-3.5 h-3.5 text-stone-500" /> 배변봉투함
                    </span>
                  )}
                  {spot.amenities.lighting && (
                    <span className="inline-flex items-center gap-1 bg-stone-50 px-2 py-1 rounded border border-stone-200/80">
                      <Sun className="w-3.5 h-3.5 text-stone-500" /> 야간 조명
                    </span>
                  )}
                </div>
              </div>

              {/* Tips & Address Footer */}
              <div className="pt-3 border-t border-stone-100 space-y-2 text-xs">
                <div className="flex items-start gap-1.5 text-stone-500">
                  <Clock className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                  <span>{spot.recommendedTime}</span>
                </div>
                <div className="flex items-start gap-1.5 text-stone-500">
                  <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0 mt-0.5" />
                  <span className="truncate">{spot.address}</span>
                </div>
                <div className="p-2.5 bg-amber-50/70 border border-amber-200/60 rounded-lg text-amber-950 leading-relaxed">
                  <strong>💡 방문 팁:</strong> {spot.tips}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredSpots.length === 0 && (
          <div className="text-center py-12 text-stone-400 text-sm">
            선택한 조건에 해당하는 산책 명소가 없습니다.
          </div>
        )}

        {/* Walk Essentials Bag Modal */}
        {showBagModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/40 backdrop-blur-xs p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-5 border border-stone-200 shadow-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckSquare className="w-5 h-5 text-amber-700" />
                  <h3 className="text-lg font-bold text-stone-900">외출 전 산책가방 체크리스트</h3>
                </div>
                <button
                  onClick={() => setShowBagModal(false)}
                  className="text-stone-400 hover:text-stone-700 text-sm font-semibold"
                >
                  ✕ 닫기
                </button>
              </div>

              <p className="text-xs text-stone-600">
                산책을 나가기 전 가방에 꼭 챙겼는지 하나씩 터치해 확인하세요.
              </p>

              {/* Progress bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-semibold text-stone-600">
                  <span>가방 패킹 상태</span>
                  <span className="font-mono">{bagProgress}%</span>
                </div>
                <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-600 transition-all duration-300"
                    style={{ width: `${bagProgress}%` }}
                  />
                </div>
              </div>

              {/* Checklist items */}
              <div className="space-y-2 max-h-[280px] overflow-y-auto pr-1">
                {WALK_ESSENTIALS_CHECKLIST.map((item, idx) => {
                  const isChecked = !!bagChecked[idx];
                  return (
                    <button
                      key={idx}
                      onClick={() => toggleBagItem(idx)}
                      className={`w-full text-left p-3 rounded-lg border text-xs sm:text-sm flex items-center justify-between transition-colors ${
                        isChecked
                          ? 'bg-amber-50 border-amber-300 text-stone-900 font-medium'
                          : 'bg-stone-50 border-stone-200 text-stone-600'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-4 h-4 rounded flex items-center justify-center text-xs ${
                            isChecked ? 'bg-amber-700 text-white font-bold' : 'border border-stone-300'
                          }`}
                        >
                          {isChecked && '✓'}
                        </span>
                        <span className={isChecked ? 'line-through text-stone-400' : ''}>
                          {item.item}
                        </span>
                      </div>
                      {item.required && (
                        <span className="text-[10px] text-red-600 font-bold">필수</span>
                      )}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => setShowBagModal(false)}
                className="w-full py-2.5 bg-stone-900 text-white rounded-xl text-xs sm:text-sm font-bold hover:bg-stone-800 transition-colors"
              >
                확인 완료 & 즐거운 산책 시작하기
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

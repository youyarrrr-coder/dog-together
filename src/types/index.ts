export interface ChecklistItem {
  id: string;
  category: 'living' | 'feeding' | 'walk' | 'medical';
  title: string;
  description: string;
  isEssential: boolean; // 필수 vs 권장
  estimatedCost: number; // KRW
  whyNeeded: string;
  tips: string;
}

export interface ReadinessQuestion {
  id: number;
  question: string;
  options: {
    text: string;
    score: number; // 1 to 5
    insight: string;
  }[];
}

export interface ToxicFoodItem {
  id: string;
  name: string;
  category: '치명적 위험' | '섭취 주의' | '적정 급여 가능';
  riskLevel: 'high' | 'medium' | 'safe';
  reason: string;
  symptoms: string;
  emergencyAction: string;
}

export interface CostPreset {
  size: 'small' | 'medium' | 'large';
  sizeName: string;
  weightRange: string;
  initialItems: { name: string; cost: number; desc: string }[];
  monthlyItems: { name: string; cost: number; desc: string }[];
  annualItems: { name: string; cost: number; desc: string }[];
  medicalReserveMonthly: number;
}

export interface TrainingRoadmapStage {
  id: string;
  stageName: string;
  ageRange: string;
  headline: string;
  description: string;
  keyGoals: string[];
  dos: string[];
  donts: string[];
  essentialCommands: { command: string; explanation: string }[];
  vetCareChecklist: string[];
}

export interface WalkSpot {
  id: string;
  name: string;
  region: '서울' | '경기' | '인천' | '강원' | '충청' | '경상/부산' | '전라/제주';
  city: string;
  address: string;
  tag: '반려견놀이터' | '수변공원' | '숲길/트레킹' | '잔디광장';
  description: string;
  leashFreeAllowed: boolean;
  largeDogAllowed: boolean;
  amenities: {
    parking: boolean;
    waterStation: boolean;
    poopBagDispenser: boolean;
    fencedArea: boolean;
    lighting: boolean;
  };
  recommendedTime: string;
  tips: string;
  imageUrl?: string;
}

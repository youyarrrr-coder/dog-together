import { CostPreset } from '../types';

export const COST_PRESETS: Record<'small' | 'medium' | 'large', CostPreset> = {
  small: {
    size: 'small',
    sizeName: '소형견',
    weightRange: '10kg 미만 (말티즈, 푸들, 포메라니안, 비숑, 시츄 등)',
    initialItems: [
      { name: '기본 용품 세팅 (켄넬, 매트, 식기, 하네스 등)', cost: 380000, desc: '거실 미끄럼방지 매트, 이동장, 배변판 등' },
      { name: '어린 강아지 기초 1~5차 예방접종 + 항체가 검사', cost: 350000, desc: 'DHPPL, 코로나, 켄넬코프, 광견병, 인플루엔자' },
      { name: '중성화 수술 및 마취 전 혈액검사', cost: 380000, desc: '수술, 수액, 진통제, 넥카라 (암/수 평균)' },
      { name: '마이크로칩 내장형 동물등록', cost: 40000, desc: '동물병원 등록 대행 및 칩 삽입' },
    ],
    monthlyItems: [
      { name: '주식 사료 (프리미엄 홀리스틱 등급 2~3kg)', cost: 45000, desc: '체중 4~7kg 기준 일일 급여량 소모' },
      { name: '배변패드 및 위생 물티슈 소모품', cost: 25000, desc: '월 100~150매 내외 사용' },
      { name: '심장사상충 및 내외부 기생충 구충제 (월 1회)', cost: 24000, desc: '넥스가드 스펙트라 또는 하트가드' },
      { name: '보상용 건강 간식 및 덴탈껌', cost: 30000, desc: '노즈워크 및 훈련 보상' },
      { name: '정기 위생 미용 및 스파 (주기 분할)', cost: 50000, desc: '위생 미용 및 털 엉킴 방지' },
    ],
    annualItems: [
      { name: '연간 1회 보강 예방접종 (종합+광견병 등)', cost: 120000, desc: '항체 유지 필수 백신' },
      { name: '연간 기본 건강검진 (청진, 혈액, X-ray)', cost: 250000, desc: '초기 질환 조기 발견' },
    ],
    medicalReserveMonthly: 50000, // 슬개골 탈구, 치과 등 대비 권장 적립액
  },
  medium: {
    size: 'medium',
    sizeName: '중형견',
    weightRange: '10kg ~ 25kg 미만 (시바견, 웰시코기, 비글, 보더콜리 등)',
    initialItems: [
      { name: '중형견용 튼튼한 용품 일체 (대형 켄넬, 매트, 리드줄 등)', cost: 480000, desc: '체격과 턱 힘을 견디는 튼튼한 장비' },
      { name: '기초 1~5차 예방접종 + 항체가 검사', cost: 370000, desc: '체중에 따른 용량 백신 및 검사' },
      { name: '중성화 수술 및 입원/처치', cost: 480000, desc: '체중에 따른 마취약 및 모니터링 비용 증액' },
      { name: '내장형 동물등록 및 인식표', cost: 40000, desc: '법적 동물등록 칩' },
    ],
    monthlyItems: [
      { name: '주식 사료 (6~10kg 급여)', cost: 85000, desc: '활동량이 많은 중형견 대용량 사료' },
      { name: '배변패드 (특대형) 또는 실외배변 봉투 소모품', cost: 35000, desc: '실외/실내 배변 위생 관리' },
      { name: '심장사상충 및 내외부 구충제 (중형 규격)', cost: 28000, desc: '체중 구간별 정기 투약' },
      { name: '치석 껌, 천연 건조 간식, 장난감', cost: 45000, desc: '치악력에 맞춘 내구성 토이' },
      { name: '목욕 및 위생 그루밍 케어', cost: 65000, desc: '이중모 빗질 및 관리' },
    ],
    annualItems: [
      { name: '연간 보강 접종', cost: 130000, desc: 'DHPPL, 켄넬코프 등' },
      { name: '연간 정기 건강검진', cost: 320000, desc: '관절 및 장기 초음파 포함' },
    ],
    medicalReserveMonthly: 70000,
  },
  large: {
    size: 'large',
    sizeName: '대형견',
    weightRange: '25kg 이상 (골든리트리버, 래브라도, 사모예드, 셰퍼드 등)',
    initialItems: [
      { name: '대형견 전용 특대형 켄넬, 방석, 안전펜스', cost: 650000, desc: 'XL 하드 켄넬, 대형 견인줄' },
      { name: '기초 1~5차 예방접종 + 항체가 검사', cost: 400000, desc: '백신 및 종합 항체 확인' },
      { name: '대형견 중성화 수술 (호흡마취 & 정밀 수액)', cost: 680000, desc: '체중 비례 마취 비용' },
      { name: '내장형 동물등록 및 대형 인식표', cost: 40000, desc: '의무 등록 완료' },
    ],
    monthlyItems: [
      { name: '대용량 프리미엄 사료 (월 12~18kg 소모)', cost: 150000, desc: '골격 및 관절 강화 사료' },
      { name: '실외 배변 위생용품 및 대용량 생분해 봉투', cost: 35000, desc: '대형 배설물 수거 전용 키트' },
      { name: '심장사상충 및 내외부 구충제 (대형견용)', cost: 35000, desc: '대형 체중 구간 구충제' },
      { name: '대형견 뼈 간식, 관절 영양제(글루코사민)', cost: 65000, desc: '고관절 이형성증 예방 영양제' },
      { name: '셀프 워시 / 전문 대형견 목욕 시설', cost: 80000, desc: '대형견 드라이룸 및 세척' },
    ],
    annualItems: [
      { name: '연간 정기 보강 백신', cost: 150000, desc: '추가 접종 4종' },
      { name: '연간 종합 건강검진 (고관절 정밀 엑스레이)', cost: 450000, desc: '고관절 및 대형견 취약 질환 검사' },
    ],
    medicalReserveMonthly: 100000,
  },
};

export const COMMON_UNEXPECTED_MEDICAL_EXPENSES = [
  { name: '슬개골 탈구 수술 (1~4기)', range: '1,200,000원 ~ 2,500,000원 (한쪽 다리 기준)', detail: '소형견 10마리 중 7마리가 겪는 대표 질환. 양측 동시 수술 시 250만~400만원 소요' },
  { name: '치과 스케일링 & 발치', range: '350,000원 ~ 800,000원', detail: '치주염 방치 시 노령기에 전신 호흡 마취 하에 다발성 발치 필요' },
  { name: '이물질 섭취 내시경 / 개복 수술', range: '800,000원 ~ 2,000,000원', detail: '자두씨, 장난감 고무, 양말 등을 삼켰을 때 응급 수술 비용' },
  { name: '노령기 심장병 / 신부전 정기 관리', range: '월 200,000원 ~ 500,000원', detail: '8세 이후 심장약, 피하수액, 정밀 혈액 검사 유지 비용' },
];

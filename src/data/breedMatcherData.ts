export interface BreedQuestionOption {
  text: string;
  subtext?: string;
  tagWeights: {
    cityGentle: number; // 도심 아파트 힐링견
    activeRunner: number; // 아웃도어 활동견
    gentleGiant: number; // 온화한 대형견
    independent: number; // 차분한 독립견
    uniqueMix: number; // 믹스/하이브리드견
  };
}

export interface BreedQuestion {
  id: number;
  question: string;
  hint: string;
  options: BreedQuestionOption[];
}

export interface BreedMatchResult {
  typeKey: 'cityGentle' | 'activeRunner' | 'gentleGiant' | 'independent' | 'uniqueMix';
  title: string;
  subtitle: string;
  recommendedBreeds: string[];
  summary: string;
  personalityTraits: string[];
  specs: {
    activityLevel: '낮음' | '보통' | '높음' | '매우 높음';
    hairShedding: '매우 적음' | '보통' | '많음' | '매우 많음';
    barkingLevel: '거의 없음' | '적음' | '보통' | '주의 필요';
    careDifficulty: '초보자 추천' | '보통' | '경험자 권장';
    bestLivingSpace: string;
  };
  healthCheckPoints: string;
  expertAdvice: string;
}

export const BREED_QUESTIONS: BreedQuestion[] = [
  {
    id: 1,
    question: '현재 거주하시는 주거 형태와 주변 환경은 어떤가요?',
    hint: '주거 환경은 강아지의 짖음과 활동 반경에 직접적인 영향을 줍니다.',
    options: [
      {
        text: '도심 아파트 또는 다세대 주택 / 빌라',
        subtext: '이웃 간 소음 차단과 실내 생활 적응력이 중요한 환경',
        tagWeights: { cityGentle: 3, activeRunner: 0, gentleGiant: 1, independent: 2, uniqueMix: 2 },
      },
      {
        text: '원룸 또는 소형 오피스텔 (1인 가구)',
        subtext: '실내 공간이 컴팩트하고 층간 소음 관리가 필수적인 공간',
        tagWeights: { cityGentle: 3, activeRunner: -1, gentleGiant: -2, independent: 2, uniqueMix: 1 },
      },
      {
        text: '마당이 있는 단독주택 또는 전원주택',
        subtext: '실내외를 오가며 자유롭게 뛰놀 수 있는 넉넉한 공간',
        tagWeights: { cityGentle: 1, activeRunner: 3, gentleGiant: 3, independent: 1, uniqueMix: 2 },
      },
    ],
  },
  {
    id: 2,
    question: '평일 기준, 매일 강아지와 야외 산책 및 놀이에 쏟을 수 있는 시간은?',
    hint: '강아지의 에너지 소비량과 보호자의 체력이 맞아야 행복합니다.',
    options: [
      {
        text: '하루 20~30분 정도 가벼운 동네 산책',
        subtext: '바쁜 일상 속 가벼운 릴랙스 산책과 실내 노즈워크 중심',
        tagWeights: { cityGentle: 3, activeRunner: -2, gentleGiant: 0, independent: 2, uniqueMix: 1 },
      },
      {
        text: '하루 40분 ~ 1시간 정도 규칙적인 산책',
        subtext: '퇴근 후 공원 산책을 즐기며 반려견과 교감하는 패턴',
        tagWeights: { cityGentle: 2, activeRunner: 2, gentleGiant: 2, independent: 2, uniqueMix: 3 },
      },
      {
        text: '하루 1.5시간 이상 활발한 조깅, 등산 및 운동',
        subtext: '주말 어질리티나 야외 러닝을 함께할 파트너를 원함',
        tagWeights: { cityGentle: -1, activeRunner: 4, gentleGiant: 3, independent: 0, uniqueMix: 2 },
      },
    ],
  },
  {
    id: 3,
    question: '강아지 털 빠짐과 매일 빗질 관리에 대해 어떻게 생각하시나요?',
    hint: '털 관리는 청소 스트레스 및 알레르기와 직결되는 중요한 요소입니다.',
    options: [
      {
        text: '털 빠짐이 거의 없어야 함 (옷이나 가구에 묻는 것 부담)',
        subtext: '비염/알레르기가 있거나 청결 관리에 민감한 편',
        tagWeights: { cityGentle: 4, activeRunner: -1, gentleGiant: -2, independent: 0, uniqueMix: 2 },
      },
      {
        text: '하루 한 번 빗질해주는 정도의 털 빠짐은 감수 가능',
        subtext: '주기적인 털 정리와 돌봄에 시간을 낼 수 있음',
        tagWeights: { cityGentle: 2, activeRunner: 2, gentleGiant: 2, independent: 3, uniqueMix: 3 },
      },
      {
        text: '털 날림이나 털 뿜뿜은 전혀 개의치 않음',
        subtext: '풍성한 모량과 털의 부드러운 감촉을 훨씬 좋아함',
        tagWeights: { cityGentle: 0, activeRunner: 3, gentleGiant: 4, independent: 1, uniqueMix: 2 },
      },
    ],
  },
  {
    id: 4,
    question: '선호하는 반려견의 기질과 성향 스타일은 무엇인가요?',
    hint: '반려견의 타고난 기질과 보호자의 성향이 잘 맞아야 갈등이 없습니다.',
    options: [
      {
        text: '애교가 많고 항상 사람 곁에 붙어있는 사랑둥이 힐링형',
        subtext: '눈을 마주치며 따뜻하게 안아주는 교감을 선호',
        tagWeights: { cityGentle: 4, activeRunner: 1, gentleGiant: 3, independent: -1, uniqueMix: 2 },
      },
      {
        text: '지능이 매우 높고 새로운 훈련/개인기 배우기를 즐기는 영리한 타입',
        subtext: '보호자와 적극적으로 두뇌 플레이와 지시를 수행하는 파트너',
        tagWeights: { cityGentle: 1, activeRunner: 4, gentleGiant: 2, independent: 0, uniqueMix: 2 },
      },
      {
        text: '지나치게 끈적이지 않고 조용하며 자기 공간을 즐기는 차분한 마이웨이형',
        subtext: '헛짖음이 적고 의젓하며 독립적인 기질을 선호',
        tagWeights: { cityGentle: 1, activeRunner: 0, gentleGiant: 1, independent: 4, uniqueMix: 2 },
      },
      {
        text: '천사처럼 온화하고 어린아이와도 잘 지내는 듬직한 대형 패밀리독',
        subtext: '인내심이 깊고 누구에게나 친절한 평화주의자',
        tagWeights: { cityGentle: 0, activeRunner: 1, gentleGiant: 5, independent: 0, uniqueMix: 2 },
      },
    ],
  },
  {
    id: 5,
    question: '보호자의 반려견 양육 경험과 낮 시간대 부재 환경은?',
    hint: '초보자에게 적합한 견종과 훈련 난이도를 판단합니다.',
    options: [
      {
        text: '완전 처음 키우는 초보 견주 & 낮에 출근 시간 있음 (4~6시간)',
        subtext: '성격이 무던하고 훈련이 수월한 견종이 유리함',
        tagWeights: { cityGentle: 3, activeRunner: -2, gentleGiant: 1, independent: 2, uniqueMix: 3 },
      },
      {
        text: '초보이지만 가족이 늘 집에 상주함 (돌봄 공백 없음)',
        subtext: '충분한 시간을 쏟아 애정과 교육을 함께 해줄 수 있음',
        tagWeights: { cityGentle: 2, activeRunner: 2, gentleGiant: 3, independent: 1, uniqueMix: 3 },
      },
      {
        text: '반려견을 키워본 경험이 있으며 훈련과 통제에 자신 있음',
        subtext: '활동량이 많거나 고집이 있는 견종도 리드할 수 있음',
        tagWeights: { cityGentle: 1, activeRunner: 3, gentleGiant: 3, independent: 3, uniqueMix: 3 },
      },
    ],
  },
];

export const BREED_MATCH_RESULTS: Record<string, BreedMatchResult> = {
  cityGentle: {
    typeKey: 'cityGentle',
    title: '도심 아파트 안성맞춤 힐링 메이트',
    subtitle: '털 빠짐이 적고 실내 환경 적응력이 뛰어난 소형 반려견',
    recommendedBreeds: ['토이/미니어처 푸들', '말티즈', '비숑 프리제', '시츄', '꼬똥 드 툴레아'],
    summary: '주거 환경이 아파트이거나 털 날림에 민감한 분, 처음 반려생활을 시작하는 초보 견주에게 최적화된 타입입니다. 실내 공간에서도 충분히 안정감을 느끼며 보호자와의 깊은 애착 교감을 형성합니다.',
    personalityTraits: ['높은 사람 친화력', '적은 털 빠짐 (싱글코트)', '온순한 성품', '도심 실내 적응력 우수'],
    specs: {
      activityLevel: '보통',
      hairShedding: '매우 적음',
      barkingLevel: '적음',
      careDifficulty: '초보자 추천',
      bestLivingSpace: '아파트, 빌라, 원룸',
    },
    healthCheckPoints: '소형견 특성상 슬개골 탈구 발병률이 높으므로 거실 미끄럼 방지 매트 시공과 체중 조절이 필수적입니다.',
    expertAdvice: '보호자에 대한 의존도가 높은 편이므로 어릴 때부터 켄넬을 활용한 건강한 독립 휴식(분리불안 예방 훈련)을 미리 실천해 주세요.',
  },
  activeRunner: {
    typeKey: 'activeRunner',
    title: '지칠 줄 모르는 에너자이저 & 아웃도어 러너',
    subtitle: '뛰어난 지능과 넘치는 호기심을 지닌 활동형 중형견',
    recommendedBreeds: ['보더콜리', '웰시코기', '잭 러셀 테리어', '비글'],
    summary: '야외 활동과 운동을 즐기며, 반려견과 함께 조깅, 어질리티, 트레킹을 하며 활동적인 라이프스타일을 함께할 보호자에게 최고의 파트너입니다.',
    personalityTraits: ['천재적인 지능', '지치지 않는 체력', '명확한 작업 열정', '장난기 가득한 성격'],
    specs: {
      activityLevel: '매우 높음',
      hairShedding: '많음',
      barkingLevel: '보통',
      careDifficulty: '경험자 권장',
      bestLivingSpace: '단독주택, 넓은 아파트 (매일 1시간 이상 운동 필수)',
    },
    healthCheckPoints: '웰시코기는 긴 허리로 인한 디스크 주의, 보더콜리는 고관절 및 털갈이 시즌 이중모 브러싱 관리가 중요합니다.',
    expertAdvice: '단순히 몸만 지치게 하기보다 냄새 맡기(노즈워크), 퍼즐 토이, 어질리티 명령어를 통해 뇌 에너지를 소모해 주어야 집안 파괴 행동을 막을 수 있습니다.',
  },
  gentleGiant: {
    typeKey: 'gentleGiant',
    title: '온 가족을 품는 다정다감 젠틀 자이언트',
    subtitle: '천사 같은 인내심과 듬직함을 겸비한 대형 반려견',
    recommendedBreeds: ['골든 리트리버', '래브라도 리트리버', '사모예드', '버니즈 마운틴 독'],
    summary: '어린아이부터 노인, 다른 동물까지 누구에게나 친절한 평화주의자입니다. 듬직한 체구와 따뜻한 눈빛으로 온 가족에게 무조건적인 위로와 안식처가 되어 줍니다.',
    personalityTraits: ['극상의 인내심', '누구에게나 열린 친화력', '공감 능력 우수', '듬직하고 우직함'],
    specs: {
      activityLevel: '높음',
      hairShedding: '많음',
      barkingLevel: '거의 없음',
      careDifficulty: '보통',
      bestLivingSpace: '단독주택, 마당, 혹은 산책로가 인접한 대형 아파트',
    },
    healthCheckPoints: '성장기 급격한 체중 증가로 인한 고관절 이형성증 주의, 사료비와 대형 배변 처리 등 물리적 양육비가 큽니다.',
    expertAdvice: '체격이 크기 때문에 어릴 때 줄 당김 없는 젠틀 워킹과 흥분 시 사람에게 올라타지 않는 기본 예절을 완벽히 교육해야 성견 시 안전하게 통제할 수 있습니다.',
  },
  independent: {
    typeKey: 'independent',
    title: '조용하고 깔끔한 마이웨이 독립파',
    subtitle: '헛짖음이 적고 자기 공간을 존중할 줄 아는 품격 있는 반려견',
    recommendedBreeds: ['시바견', '이탈리안 그레이하운드', '닥스훈트', '바셋 하운드'],
    summary: '보호자에게 과도하게 칭얼대지 않고, 고양이처럼 깔끔하며 차분한 일상을 즐기는 성향입니다. 헛짖음이 적어 실내 소음에 민감한 이웃이 있는 주거 환경에도 잘 어울립니다.',
    personalityTraits: ['독립적인 자율성', '적은 헛짖음', '자기 관리 및 청결성', '은근하고 깊은 충성심'],
    specs: {
      activityLevel: '보통',
      hairShedding: '보통',
      barkingLevel: '거의 없음',
      careDifficulty: '보통',
      bestLivingSpace: '아파트, 오피스텔, 단독주택',
    },
    healthCheckPoints: '이탈리안 그레이하운드는 가는 뼈 골절 주의, 닥스훈트는 척추 디스크(추간판 탈구) 주의, 시바견은 피부 아토피 관리가 필요합니다.',
    expertAdvice: '자기만의 주관과 고집이 있는 편이므로 강압적인 훈련보다는 좋아하는 간식과 칭찬을 이용한 긍정 강화 교육이 훨씬 효과적입니다.',
  },
  uniqueMix: {
    typeKey: 'uniqueMix',
    title: '세상에 단 하나뿐인 기적, 하이브리드 & 믹스견',
    subtitle: '뛰어난 유전적 건강성과 특별한 개성을 지닌 생명의 축복',
    recommendedBreeds: ['유기동물 보호소의 사랑스러운 믹스견', '말티푸', '코카푸', '시골 누렁이'],
    summary: '특정 순종의 근친 교배로 인한 유전병 위험이 적고 면역력이 뛰어난 가장 이상적인 반려견입니다. 세상에 둘도 없는 독창적인 외모와 순수한 충성심을 선물해 줍니다.',
    personalityTraits: ['유전적 높은 건강성', '강인한 생명력', '다채롭고 독창적인 개성', '깊은 감사와 유대감'],
    specs: {
      activityLevel: '보통',
      hairShedding: '보통',
      barkingLevel: '보통',
      careDifficulty: '초보자 추천',
      bestLivingSpace: '모든 형태의 주거 공간',
    },
    healthCheckPoints: '혼합 유전자로 인해 순종보다 유전 질환 발생률이 훨씬 낮으며 장수하는 편입니다.',
    expertAdvice: '포인핸드 등 지자체 유기동물 보호소에서 가족을 기다리는 천사들을 만나보세요. 정부 및 지자체에서 중성화 및 초기 진료비(최대 15~25만원) 지원 혜택도 제공합니다.',
  },
};

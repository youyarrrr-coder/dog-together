import React from 'react';
import { ShieldCheck, PhoneCall, ExternalLink, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-900 text-stone-300 py-12 lg:py-16 text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Top Info Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 rounded-2xl bg-stone-800/80 border border-stone-700/60">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-amber-300 font-bold text-xs uppercase tracking-wider">
              <PhoneCall className="w-4 h-4" />
              <span>야간 24시 응급 동물병원 이용 팁</span>
            </div>
            <p className="text-stone-300 text-xs leading-relaxed">
              출발 전 반드시 병원에 미리 전화하여 수술실 및 산소치료기 가동 여부를 확인하세요. 
              이물질 섭취 시 섭취 물질의 포장지나 사진을 지참하면 진료 시간이 절반으로 단축됩니다.
            </p>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-amber-300 font-bold text-xs uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>동물등록 변경 신고 (의무)</span>
            </div>
            <p className="text-stone-300 text-xs leading-relaxed">
              소유자 주소, 전화번호 변경, 또는 반려견 분실 시 30일 이내에 '국가동물보호정보시스템' 또는 관할 시·군·구청에 변경 신고를 완료해야 합니다.
            </p>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-amber-300 font-bold text-xs uppercase tracking-wider">
              <Heart className="w-4 h-4" />
              <span>사지 말고 입양하세요</span>
            </div>
            <p className="text-stone-300 text-xs leading-relaxed">
              포인핸드, 종합유기동물보호센터 등 공공 유기동물 보호소에는 평생의 사랑을 기다리는 수많은 천사들이 있습니다. 입양 지원금(최대 15만원) 혜택도 확인하세요.
            </p>
          </div>
        </div>

        {/* Links & Brand */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pt-6 border-t border-stone-800">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-white tracking-tight">반려첫걸음</span>
              <span className="text-xs text-amber-400 font-mono">PawStep Guide</span>
            </div>
            <p className="text-stone-400 text-xs">
              예비 견주와 초보 견주의 건강하고 따뜻한 동행을 위한 안내서
            </p>
          </div>

          <div className="flex flex-wrap gap-4 text-xs text-stone-400">
            <a href="#breed-matcher" className="hover:text-white transition-colors">
              견종 성향 매칭
            </a>
            <a href="#checklist" className="hover:text-white transition-colors">
              입양 전 준비물
            </a>
            <a href="#precautions" className="hover:text-white transition-colors">
              필수 유의사항
            </a>
            <a href="#calculator" className="hover:text-white transition-colors">
              생애 비용 계산기
            </a>
            <a href="#roadmap" className="hover:text-white transition-colors">
              연차별 훈육 로드맵
            </a>
            <a href="#walkspots" className="hover:text-white transition-colors">
              산책 명소 추천
            </a>
            <a
              href="https://www.animal.go.kr"
              target="_blank"
              rel="noreferrer"
              className="hover:text-amber-300 transition-colors flex items-center gap-1"
            >
              <span>국가동물보호정보시스템</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="text-[11px] text-stone-500 border-t border-stone-800/80 pt-4 leading-relaxed">
          면책 조항: 본 웹사이트에 제공된 모든 정보(비용 추정치, 훈육 지침, 의료 예방 가이드)는 한국농촌경제연구원 반려동물 양육 실태 조사 및 일반적인 수의학 지침을 바탕으로 제작된 참고 자료입니다. 실제 양육 비용은 병원 정책 및 강아지의 건강 상태에 따라 달라질 수 있으며, 응급 질환 및 심각한 공격성/불안 문제는 전문 수의사 및 자격 훈련사와 상담하시기 바랍니다.
          <p className="mt-1">
            © {new Date().getFullYear()} 반려첫걸음 PawStep. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

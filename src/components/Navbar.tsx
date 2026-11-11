import React, { useState } from 'react';
import { Menu, X, Heart } from 'lucide-react';

interface NavbarProps {
  onOpenQuiz: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenQuiz }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: '입양 전 준비물', href: '#checklist' },
    { label: '견종 성향 매칭', href: '#breed-matcher' },
    { label: '필수 유의사항', href: '#precautions' },
    { label: '생애 비용 계산기', href: '#calculator' },
    { label: '연차별 훈육 로드맵', href: '#roadmap' },
    { label: '산책 명소 추천', href: '#walkspots' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-stone-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand wordmark (one clean text element) */}
        <a href="#" className="flex items-center gap-2 group whitespace-nowrap shrink-0">
          <span className="w-8 h-8 rounded-lg bg-stone-900 text-amber-100 flex items-center justify-center font-bold text-sm tracking-tighter">
            🐾
          </span>
          <span className="text-xl font-bold tracking-tight text-stone-900">
            반려첫걸음 <span className="text-xs font-semibold text-amber-700 tracking-wider">PawStep</span>
          </span>
        </a>

        {/* Zone 2: Nav links (single-line, clean typography) */}
        <nav className="hidden md:flex items-center gap-7 text-[15px] font-medium text-stone-600">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 hover:underline decoration-stone-300 underline-offset-4"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Primary action button */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenQuiz}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-white bg-stone-900 rounded-lg hover:bg-stone-800 active:scale-[0.98] transition-all whitespace-nowrap shrink-0 shadow-sm"
          >
            <Heart className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
            <span>견주 준비도 진단</span>
          </button>
        </div>

        {/* Mobile menu hamburger */}
        <div className="flex md:hidden items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-stone-700 hover:text-stone-900 rounded-md focus:outline-none"
            aria-label="메뉴 열기"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-stone-200 bg-[#FAF8F5] px-4 pt-2 pb-5 space-y-3">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-medium text-stone-700 hover:bg-stone-100 rounded-md transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="pt-2 border-t border-stone-200">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuiz();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-stone-900 rounded-lg"
            >
              <Heart className="w-4 h-4 text-amber-300 fill-amber-300" />
              <span>견주 준비도 진단 시작하기</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

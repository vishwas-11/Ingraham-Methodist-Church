'use client';

import { useRouter } from 'next/navigation';
import { usePageLoader } from '@/context/LoadingContext';

export default function GoBackButton() {
  const router = useRouter();
  const { startLoading } = usePageLoader();

  return (
    <button
      onClick={() => {
        startLoading("Grace & Peace");
        router.back();
      }}
      className="bg-transparent border border-[rgba(205,170,99,0.35)] text-[#D9C7B3] px-8 py-3.5 rounded-full font-label-md text-[14px] hover:bg-[rgba(205,170,99,0.05)] active:scale-95 transition-all duration-300 inline-flex items-center justify-center mt-4 sm:mt-0 cursor-pointer"
    >
      <span className="material-symbols-outlined mr-2 text-[18px]">arrow_back</span> Go Back
    </button>
  );
}

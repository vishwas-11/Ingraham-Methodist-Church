'use client'; // Error components must be Client Components

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col font-body-md text-[#D9C7B3] bg-[#190808] antialiased">
        <main className="flex-grow flex flex-col justify-center items-center px-4 md:px-0 text-center relative z-10">
          <div className="absolute inset-0 bg-[rgba(25,8,8,0.55)] pointer-events-none z-0"></div>
          <div className="relative z-10 flex flex-col items-center">
            <span className="font-label-md tracking-[0.3em] uppercase text-[14px] text-[#CDAA63] mb-4">Critical Error</span>
            <h1 className="font-display-lg text-[48px] md:text-[64px] lg:text-[72px] text-[#F4E7D3] mb-6 drop-shadow-sm" style={{ textShadow: '0 2px 12px rgba(0,0,0,.22)' }}>
              Application Error
            </h1>
            <div className="h-px w-full max-w-[200px] bg-[rgba(205,170,99,0.35)] mb-6"></div>
            <p className="font-body-md text-[#D9C7B3] text-[16px] md:text-[18px] max-w-md mb-10 drop-shadow-sm" style={{ textShadow: '0 2px 12px rgba(0,0,0,.22)' }}>
              A critical error occurred while rendering the application. We apologize for the inconvenience.
            </p>
            <button
              onClick={() => reset()}
              className="bg-[#651A2D] text-[#F4E7D3] px-8 py-3.5 rounded-full font-label-md text-[14px] hover:bg-[#7A2338] transition-all duration-300 inline-flex items-center justify-center border border-transparent"
            >
              <span className="material-symbols-outlined mr-2 text-[18px]">refresh</span> Try Again
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}

"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";

interface LoadingContextType {
  isLoading: boolean;
  loadingMessage: string;
  startLoading: (message?: string) => void;
  stopLoading: () => void;
}

const LoadingContext = createContext<LoadingContextType>({
  isLoading: false,
  loadingMessage: "Grace & Peace",
  startLoading: () => {},
  stopLoading: () => {},
});

export const usePageLoader = () => useContext(LoadingContext);

const DEFAULT_MESSAGE = "Grace & Peace";
const SAFETY_TIMEOUT_MS = 8000;

function RouteChangeListener({ onStop }: { onStop: () => void }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    onStop();
  }, [pathname, searchParams, onStop]);

  return null;
}

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState(DEFAULT_MESSAGE);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const activeElementRef = useRef<HTMLElement | null>(null);

  // Clear any existing active button styles
  const clearActiveButtonFeedback = useCallback(() => {
    if (activeElementRef.current) {
      activeElementRef.current.classList.remove("btn-navigating-active");
      activeElementRef.current = null;
    }
    // Also cleanup any stray navigating classes in DOM
    document.querySelectorAll(".btn-navigating-active").forEach((el) => {
      el.classList.remove("btn-navigating-active");
    });
  }, []);

  const stopLoading = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsLoading(false);
    clearActiveButtonFeedback();
    // Reset to default message after fade-out transition
    setTimeout(() => {
      setLoadingMessage(DEFAULT_MESSAGE);
    }, 400);
  }, [clearActiveButtonFeedback]);

  const startLoading = useCallback((message?: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setLoadingMessage(message || DEFAULT_MESSAGE);
    setIsLoading(true);

    // Safety fallback: auto-dismiss if route transition or action takes longer than 8s
    timeoutRef.current = setTimeout(() => {
      stopLoading();
    }, SAFETY_TIMEOUT_MS);
  }, [stopLoading]);

  // Global Link / Button Click Interceptor for Page Navigation
  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      // Find closest anchor or button
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const link = target.closest("a") as HTMLAnchorElement | null;
      if (!link) return;

      const href = link.getAttribute("href");
      if (!href) return;

      // Ignore external links, mailto, tel, hashes on the current page, new tab targets
      if (
        link.target === "_blank" ||
        link.hasAttribute("download") ||
        link.getAttribute("rel")?.includes("external") ||
        href.startsWith("http://") ||
        href.startsWith("https://") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        href.startsWith("#") ||
        href.startsWith("javascript:")
      ) {
        return;
      }

      // Check if target points to the same origin
      try {
        const targetUrl = new URL(href, window.location.href);
        const currentUrl = new URL(window.location.href);

        // If exact same path and search, and only hash changed or nothing changed, ignore
        if (
          targetUrl.pathname === currentUrl.pathname &&
          targetUrl.search === currentUrl.search
        ) {
          return;
        }

        // Apply instant tactile feedback to the clicked element / button
        clearActiveButtonFeedback();
        const buttonOrLink = (link.closest("button") || link) as HTMLElement;
        buttonOrLink.classList.add("btn-navigating-active");
        activeElementRef.current = buttonOrLink;

        // Start the bespoke loader immediately
        startLoading(DEFAULT_MESSAGE);
      } catch {
        // invalid URL, ignore
      }
    };

    // Listen for custom window events for action forms and interactive buttons
    const handleStartEvent = (e: Event) => {
      const customEvent = e as CustomEvent<{ message?: string }>;
      startLoading(customEvent.detail?.message || DEFAULT_MESSAGE);
    };

    const handleStopEvent = () => {
      stopLoading();
    };

    document.addEventListener("click", handleDocumentClick, true);
    window.addEventListener("church:start-loading", handleStartEvent);
    window.addEventListener("church:stop-loading", handleStopEvent);

    return () => {
      document.removeEventListener("click", handleDocumentClick, true);
      window.removeEventListener("church:start-loading", handleStartEvent);
      window.removeEventListener("church:stop-loading", handleStopEvent);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [startLoading, stopLoading, clearActiveButtonFeedback]);

  return (
    <LoadingContext.Provider value={{ isLoading, loadingMessage, startLoading, stopLoading }}>
      <React.Suspense fallback={null}>
        <RouteChangeListener onStop={stopLoading} />
      </React.Suspense>
      {children}
    </LoadingContext.Provider>
  );
}

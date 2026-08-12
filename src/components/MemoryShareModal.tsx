"use client";

import React, { useState } from "react";

interface MemoryShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MemoryShareModal({ isOpen, onClose }: MemoryShareModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [memory, setMemory] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setName("");
    setEmail("");
    setMemory("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in-up">
      <div 
        className="relative w-full max-w-lg bg-[#F4E7D3] border-2 border-[#8B6A4F]/40 rounded-2xl shadow-2xl p-6 md:p-8 text-[#1F1F1F]"
        style={{
          backgroundImage: "url('/paper_background.png')",
          backgroundRepeat: "repeat",
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#4A0F1A] hover:bg-[#4A0F1A]/10 p-2 rounded-full transition-colors"
          aria-label="Close modal"
        >
          <span className="material-symbols-outlined text-2xl">close</span>
        </button>

        <div className="text-center mb-6">
          <span className="font-label-md text-xs uppercase tracking-[0.2em] text-[#CDAA63] block mb-1">
            Living Church Archive
          </span>
          <h3 className="font-headline-md text-2xl text-[#3B0B14] font-serif font-bold">
            Share a Church Memory
          </h3>
          <p className="font-body-md text-xs text-[#5D4129] max-w-sm mx-auto mt-1">
            Do you have a personal memory, photograph, or account of Ingraham Methodist Church? Help us preserve our history.
          </p>
        </div>

        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-14 h-14 bg-[#CDAA63]/20 text-[#4A0F1A] rounded-full flex items-center justify-center mx-auto">
              <span className="material-symbols-outlined text-3xl">verified</span>
            </div>
            <h4 className="font-serif text-xl font-bold text-[#3B0B14]">Thank You for Sharing</h4>
            <p className="text-xs text-[#5D4129] max-w-xs mx-auto">
              Your submission has been recorded for church review and archive preservation.
            </p>
            <button
              onClick={handleReset}
              className="mt-4 bg-[#4A0F1A] text-[#F4E7D3] px-6 py-2.5 rounded-xl font-label-md text-xs uppercase tracking-wider font-bold shadow-md hover:bg-[#3B0B14] transition-all"
            >
              Close Window
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#3B0B14] uppercase tracking-wider mb-1">
                Your Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Samuel Patterson"
                className="w-full bg-white/70 border border-[#8B6A4F]/30 rounded-lg px-3 py-2 text-sm text-[#1F1F1F] focus:outline-none focus:border-[#4A0F1A]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#3B0B14] uppercase tracking-wider mb-1">
                Email Address (Optional)
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full bg-white/70 border border-[#8B6A4F]/30 rounded-lg px-3 py-2 text-sm text-[#1F1F1F] focus:outline-none focus:border-[#4A0F1A]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#3B0B14] uppercase tracking-wider mb-1">
                Your Historical Memory or Note
              </label>
              <textarea
                required
                rows={4}
                value={memory}
                onChange={(e) => setMemory(e.target.value)}
                placeholder="Share your memories, family connections, or unrecorded events from Ingraham Methodist Church..."
                className="w-full bg-white/70 border border-[#8B6A4F]/30 rounded-lg px-3 py-2 text-sm text-[#1F1F1F] focus:outline-none focus:border-[#4A0F1A]"
              ></textarea>
            </div>

            <div className="pt-2 flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg text-xs font-bold text-[#5D4129] hover:bg-black/5"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-[#4A0F1A] text-[#F4E7D3] px-5 py-2 rounded-xl font-label-md text-xs uppercase tracking-wider font-bold shadow-md hover:bg-[#3B0B14] transition-all"
              >
                Submit Memory
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

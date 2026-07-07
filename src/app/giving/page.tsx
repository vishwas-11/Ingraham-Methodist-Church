"use client";
import React, { useState } from 'react';

export default function OnlineGiving() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full h-[614px] min-h-[500px] flex items-center justify-center -mt-[72px]">
        <div className="absolute inset-0 z-0 bg-[#4A0F1A]">
          <img 
            alt="Church Sanctuary" 
            className="w-full h-full object-cover opacity-40 mix-blend-luminosity" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDfIQ-Qr2TrfGjHa96wc0euz1PpTih9G8q1e8aB4rmFSXB1mlH3WGV7AyrIavJWMDdmdwN9QzQGfWul-64qv6soman5tRce2izU9Xt0rnjxWPjlBfmCC5ET4a2ZYzScaxPhmkw8qYy67Ez7agpSG8IJKeLu57Q1ILsCNJIVg9fEoHtn4A6C2VaYNd_kDLJ9pIh3K5GiLkQMbpH1hW9CXFFgozCpiMqc_EGl49X1tne2tJ0Wz_ZSEf6-" 
          />
          <div className="absolute inset-0 bg-[rgba(25,8,8,0.35)] pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#f3e7d3] to-transparent z-10"></div>
        </div>
        <div className="relative z-10 text-center px-margin-mobile md:px-margin-desktop max-w-[800px] mx-auto mt-24">
          <div className="flex flex-col items-center mb-6 w-full">
            <span className="text-[#CDAA63] font-label-md tracking-[0.2em] uppercase text-[12px] md:text-[13px] mb-3" style={{ textShadow: '0 2px 12px rgba(0,0,0,.22)' }}>Generosity</span>
            <div className="h-px w-32 bg-[rgba(205,170,99,0.35)]"></div>
          </div>
          <h1 className="font-display-lg text-[48px] md:text-[72px] leading-[1.05] text-[#F4E7D3] mb-6 animate-fade-in-up" style={{ textShadow: '0 2px 12px rgba(0,0,0,.22)' }}>
            Support Our Mission
          </h1>
          <p className="font-body-lg text-[#D9C7B3] max-w-2xl mx-auto animate-fade-in-up delay-100" style={{ textShadow: '0 2px 12px rgba(0,0,0,.22)' }}>
            Your generosity enables us to serve our community, maintain our historic sanctuary, and spread love and grace. Join us in making a lasting impact.
          </p>
          <div className="pt-8 flex items-center justify-center space-x-4 opacity-80 animate-fade-in-up delay-200">
            <span className="material-symbols-outlined text-[#CDAA63]">lock</span>
            <span className="font-caption text-[#D9C7B3]">Secure &amp; Encrypted Giving</span>
          </div>
        </div>
      </section>

      {/* Giving Options Bento Grid */}
      <section className="py-stack-lg px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto reveal-on-scroll">
        <div className="text-center mb-stack-lg">
          <h2 className="font-headline-md text-primary-container">Ways to Give</h2>
          <div className="w-12 h-1 bg-outline-variant/30 mx-auto mt-4 rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
          {/* Primary: Online Giving */}
          <div className="md:col-span-8 bg-secondary-container rounded-[24px] p-stack-md flex flex-col justify-between shadow-ambient transition-transform hover:-translate-y-1 duration-300">
            <div className="space-y-4 mb-stack-md">
              <div className="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center text-on-primary">
                <span className="material-symbols-outlined">credit_card</span>
              </div>
              <h3 className="font-headline-sm text-primary-container">Give Online</h3>
              <p className="font-body-md text-on-secondary-container">
                The most convenient way to support our ministries. Make a one-time gift or set up recurring donations securely through our online portal.
              </p>
            </div>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                <button className="py-2 border border-primary-container/20 rounded-lg text-primary-container hover:bg-primary-container hover:text-on-primary transition-colors font-label-md" type="button">$25</button>
                <button className="py-2 border border-primary-container/20 rounded-lg text-primary-container hover:bg-primary-container hover:text-on-primary transition-colors font-label-md" type="button">$50</button>
                <button className="py-2 bg-primary-container text-on-primary rounded-lg font-label-md shadow-ambient" type="button">$100</button>
                <button className="py-2 border border-primary-container/20 rounded-lg text-primary-container hover:bg-primary-container hover:text-on-primary transition-colors font-label-md" type="button">Other</button>
              </div>
              <button className="w-full bg-primary-container text-on-primary py-3 rounded-lg font-label-md hover:opacity-90 transition-opacity" type="submit">
                Continue to Secure Payment
              </button>
            </form>
          </div>
          
          {/* Secondary Options Stack */}
          <div className="md:col-span-4 flex flex-col gap-gutter">
            {/* Bank Transfer */}
            <div className="flex-1 bg-surface rounded-[24px] p-stack-md border border-warm-brown/30 flex flex-col justify-center">
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-surface-variant rounded-lg text-primary-container">
                  <span className="material-symbols-outlined">account_balance</span>
                </div>
                <div>
                  <h3 className="font-label-md text-primary-container mb-1">Bank Transfer</h3>
                  <p className="font-caption text-on-surface-variant mb-4">Direct ACH transfers with lower processing fees, ensuring more of your gift goes to ministry.</p>
                  <a className="font-label-md text-primary-container underline hover:opacity-80" href="#">View Instructions</a>
                </div>
              </div>
            </div>
            {/* In Person */}
            <div className="flex-1 bg-surface rounded-[24px] p-stack-md border border-warm-brown/30 flex flex-col justify-center relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <span className="material-symbols-outlined text-[64px]">church</span>
              </div>
              <div className="relative z-10 flex items-start space-x-4">
                <div className="p-2 bg-surface-variant rounded-lg text-primary-container">
                  <span className="material-symbols-outlined">volunteer_activism</span>
                </div>
                <div>
                  <h3 className="font-label-md text-primary-container mb-1">In Person</h3>
                  <p className="font-caption text-on-surface-variant mb-4">Place your gift in the offering plates during any of our Sunday worship services.</p>
                  <span className="font-caption text-outline italic">Envelopes available in pews.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-surface-container-low py-stack-lg px-margin-mobile md:px-margin-desktop mt-stack-lg reveal-on-scroll">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-stack-md">
            <h2 className="font-headline-sm text-primary-container">Giving FAQ</h2>
          </div>
          <div className="space-y-4">
            
            {/* FAQ Item 1 */}
            <div 
              className="bg-surface rounded-xl border border-warm-brown/30 p-6 cursor-pointer hover:bg-surface-bright transition-colors"
              onClick={() => toggleFaq(1)}
            >
              <div className="flex justify-between items-center">
                <h3 className="font-label-md text-on-surface">Is my online giving secure?</h3>
                <span className="material-symbols-outlined text-outline">
                  {openFaq === 1 ? 'expand_less' : 'expand_more'}
                </span>
              </div>
              {openFaq === 1 && (
                <div className="mt-4 font-body-md text-on-surface-variant">
                  Yes, we use industry-standard encryption and partner with leading payment processors to ensure your financial information is kept completely secure and private.
                </div>
              )}
            </div>

            {/* FAQ Item 2 */}
            <div 
              className="bg-surface rounded-xl border border-warm-brown/30 p-6 cursor-pointer hover:bg-surface-bright transition-colors"
              onClick={() => toggleFaq(2)}
            >
              <div className="flex justify-between items-center">
                <h3 className="font-label-md text-on-surface">Can I set up recurring donations?</h3>
                <span className="material-symbols-outlined text-outline">
                  {openFaq === 2 ? 'expand_less' : 'expand_more'}
                </span>
              </div>
              {openFaq === 2 && (
                <div className="mt-4 font-body-md text-on-surface-variant">
                  Yes, you can easily set up recurring weekly or monthly donations through our secure payment portal.
                </div>
              )}
            </div>

            {/* FAQ Item 3 */}
            <div 
              className="bg-surface rounded-xl border border-warm-brown/30 p-6 cursor-pointer hover:bg-surface-bright transition-colors"
              onClick={() => toggleFaq(3)}
            >
              <div className="flex justify-between items-center">
                <h3 className="font-label-md text-on-surface">Are my donations tax-deductible?</h3>
                <span className="material-symbols-outlined text-outline">
                  {openFaq === 3 ? 'expand_less' : 'expand_more'}
                </span>
              </div>
              {openFaq === 3 && (
                <div className="mt-4 font-body-md text-on-surface-variant">
                  Yes, all donations are tax-deductible to the extent allowed by law. You will receive an annual statement of your giving for tax purposes.
                </div>
              )}
            </div>

          </div>
        </div>
      </section>
    </>
  );
}

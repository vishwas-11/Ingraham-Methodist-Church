"use client";

import React from 'react';
import Link from 'next/link';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  href?: string;
  className?: string;
  isLoading?: boolean;
  children: React.ReactNode;
}

export default function Button({ 
  variant = 'primary', 
  href, 
  className = '', 
  isLoading = false,
  children, 
  disabled,
  ...props 
}: ButtonProps) {
  
  const baseClasses = "inline-flex items-center justify-center font-label-md text-label-md transition-all duration-300 rounded-full active:scale-[0.97] cursor-pointer";
  
  const variantClasses = {
    primary: "bg-primary-container text-on-primary hover:bg-primary shadow-ambient hover:shadow-lg hover:scale-105 active:scale-[0.98] px-8 py-3",
    secondary: "bg-stone-beige text-primary-container hover:bg-surface-container-highest shadow-none hover:shadow-md hover:scale-105 active:scale-[0.98] px-8 py-3",
    ghost: "bg-transparent text-warm-brown hover:underline px-4 py-2"
  };

  const loadingClasses = isLoading ? "opacity-75 pointer-events-none cursor-wait" : "";
  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${loadingClasses} ${className}`;

  if (href) {
    return (
      <Link href={href} className={combinedClasses}>
        {isLoading ? (
          <span className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
            <span>{children}</span>
          </span>
        ) : children}
      </Link>
    );
  }

  return (
    <button 
      className={combinedClasses} 
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
          <span>{children}</span>
        </span>
      ) : children}
    </button>
  );
}

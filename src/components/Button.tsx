import React from 'react';
import Link from 'next/link';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  href?: string;
  className?: string;
  children: React.ReactNode;
}

export default function Button({ 
  variant = 'primary', 
  href, 
  className = '', 
  children, 
  ...props 
}: ButtonProps) {
  
  const baseClasses = "inline-flex items-center justify-center font-label-md text-label-md transition-all duration-300 rounded-full";
  
  const variantClasses = {
    primary: "bg-primary-container text-on-primary hover:bg-primary shadow-ambient hover:shadow-lg hover:scale-105 px-8 py-3",
    secondary: "bg-stone-beige text-primary-container hover:bg-surface-container-highest shadow-none hover:shadow-md hover:scale-105 px-8 py-3",
    ghost: "bg-transparent text-warm-brown hover:underline px-4 py-2"
  };

  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={combinedClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button className={combinedClasses} {...props}>
      {children}
    </button>
  );
}

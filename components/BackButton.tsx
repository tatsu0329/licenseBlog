"use client";

import { useRouter } from "next/navigation";

interface BackButtonProps {
  href?: string;
  label?: string;
  className?: string;
  variant?: "default" | "minimal" | "gradient";
  floating?: boolean;
  position?: "bottom-left" | "bottom-right" | "top-left";
}

export default function BackButton({ 
  href,
  label = "戻る", 
  className = "",
  variant = "default",
  floating = false,
  position = "bottom-left"
}: BackButtonProps) {
  const router = useRouter();

  const handleBack = () => {
    if (href) {
      router.push(href);
    } else {
      router.back();
    }
  };

  const baseClasses = "group inline-flex items-center gap-2.5 px-5 py-2.5 text-sm font-semibold rounded-xl transition-all duration-300 ease-out transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 z-40";
  
  const variantClasses = {
    default: "bg-white text-gray-700 border-2 border-gray-200 shadow-sm hover:shadow-md hover:border-gray-300 hover:bg-gray-50 focus:ring-gray-400",
    minimal: "text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:ring-gray-400",
    gradient: "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-indigo-700 focus:ring-blue-400"
  };

  const floatingClasses = floating ? {
    "bottom-left": "fixed bottom-6 left-6 md:bottom-8 md:left-8",
    "bottom-right": "fixed bottom-6 right-6 md:bottom-8 md:right-8",
    "top-left": "fixed top-20 left-6 md:top-24 md:left-8"
  }[position] : "";

  return (
    <button
      onClick={handleBack}
      className={`${baseClasses} ${variantClasses[variant]} ${floatingClasses} ${className}`}
      aria-label="前のページに戻る"
    >
      <svg
        className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2.5}
          d="M15 19l-7-7 7-7"
        />
      </svg>
      {floating ? (
        <span className="hidden sm:inline relative">
          {label}
        </span>
      ) : (
        <span className="relative">
          {label}
          <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-current transition-all duration-300 hover:w-full"></span>
        </span>
      )}
    </button>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { clsx } from 'clsx';

interface ButtonProps {
  children: React.ReactNode;
  to?: string;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost' | 'champagne';
  size?: 'sm' | 'md' | 'lg';
  icon?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  target?: string;
  rel?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  to,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  icon = false,
  className = '',
  type = 'button',
  disabled = false,
  target,
  rel,
}) => {
  const baseStyles = 'group relative inline-flex items-center justify-center font-sans font-medium transition-all duration-300 ease-out focus-visible:outline-none select-none tracking-wide';

  const sizeStyles = {
    sm: 'text-xs px-4 py-2 gap-2 tracking-wider uppercase',
    md: 'text-sm px-6 py-3.5 gap-2.5',
    lg: 'text-base px-8 py-4 gap-3',
  };

  const variantStyles = {
    primary:
      'bg-studio-100 text-studio-950 hover:bg-champagne-300 active:scale-[0.98] border border-studio-100 hover:border-champagne-300 font-semibold shadow-sm',
    champagne:
      'bg-champagne-500/10 text-champagne-300 border border-champagne-500/30 hover:bg-champagne-500 hover:text-studio-950 hover:border-champagne-500 transition-colors',
    secondary:
      'bg-transparent text-studio-200 border border-studio-700 hover:border-champagne-500/60 hover:text-studio-50 hover:bg-studio-850/60',
    ghost:
      'bg-transparent text-studio-400 hover:text-champagne-300 p-0 border-none justify-start hover:underline underline-offset-8 decoration-champagne-500/40',
  };

  const combinedStyles = clsx(
    baseStyles,
    sizeStyles[size],
    variantStyles[variant],
    disabled && 'opacity-40 cursor-not-allowed pointer-events-none',
    className
  );

  const iconElement = icon ? (
    <ArrowUpRight className="w-4 h-4 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
  ) : null;

  if (to) {
    return (
      <Link to={to} className={combinedStyles}>
        <span>{children}</span>
        {iconElement}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        className={combinedStyles}
        target={target || (href.startsWith('http') ? '_blank' : undefined)}
        rel={rel || (href.startsWith('http') ? 'noopener noreferrer' : undefined)}
      >
        <span>{children}</span>
        {iconElement}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedStyles}
    >
      <span>{children}</span>
      {iconElement}
    </button>
  );
};

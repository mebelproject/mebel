import React from 'react';

export default function LuxuryButton({
  children,
  href,
  onClick,
  variant = 'gold',
  className = '',
  icon: Icon,
}) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/40 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent';

  const styles =
    variant === 'dark'
      ? 'bg-ink text-ivory shadow-luxury hover:bg-[#1a120c] hover:-translate-y-0.5'
      : 'bg-gold text-white shadow-luxury hover:bg-[#a88241] hover:-translate-y-0.5';

  const props = {
    className: `${base} ${styles} ${className}`,
    ...(href ? { href } : {}),
    ...(onClick ? { onClick } : {}),
  };

  const content = (
    <>
      <span>{children}</span>
      {Icon ? <Icon className="h-4 w-4" /> : null}
    </>
  );

  if (href) {
    return <a {...props}>{content}</a>;
  }

  return (
    <button type="button" {...props}>
      {content}
    </button>
  );
}

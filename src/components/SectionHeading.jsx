import React from 'react';

export default function SectionHeading({ eyebrow, title, description, centered = false }) {
  return (
    <div className={centered ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
      {eyebrow ? (
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-gold">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="font-serif text-4xl leading-none text-ink sm:text-5xl lg:text-6xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-5 text-sm leading-7 text-ink/78 sm:text-base">{description}</p>
      ) : null}
    </div>
  );
}

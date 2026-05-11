import React from 'react';
import { motion } from 'framer-motion';
import { stats } from '../data';

export default function StatsBar() {
  return (
    <div className="luxury-container relative z-20 -mt-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="grid overflow-hidden rounded-[2rem] luxury-border bg-white/[0.88] shadow-luxury backdrop-blur-md md:grid-cols-4"
      >
        {stats.map((item, index) => (
          <div
            key={item.label}
            className={`px-6 py-8 text-center md:px-8 ${
              index !== stats.length - 1 ? 'md:border-r md:border-ink/[0.08]' : ''
            }`}
          >
            <div className="font-serif text-4xl text-ink sm:text-5xl">{item.value}</div>
            <div className="mt-2 text-sm uppercase tracking-[0.24em] text-ink/60">{item.label}</div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

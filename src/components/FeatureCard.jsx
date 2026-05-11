import React from 'react';
import { motion } from 'framer-motion';

export default function FeatureCard({ title, description, Icon, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.65, delay: index * 0.08 }}
      whileHover={{ y: -6 }}
      className="group rounded-[1.75rem] luxury-border bg-white/[0.86] p-8 shadow-soft transition-shadow duration-300 hover:shadow-luxury"
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald/10 text-emerald transition-transform duration-300 group-hover:scale-105">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="mt-6 font-serif text-3xl text-ink">{title}</h3>
      <p className="mt-4 text-sm leading-7 text-ink/74">{description}</p>
    </motion.article>
  );
}

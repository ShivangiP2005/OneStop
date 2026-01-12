import React from 'react';
import { motion } from 'framer-motion';

const Preloader = () => {
  const coins = Array.from({ length: 20 });

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[100] bg-[#0B1120] flex items-center justify-center overflow-hidden"
    >
      {coins.map((_, i) => (
        <div
          key={i}
          className="coin-fall absolute text-4xl"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${3 + Math.random() * 2}s`,
          }}
        >
          💰
        </div>
      ))}
      
      <div className="z-10 text-center">
        <h1 className="font-manrope font-bold text-4xl md:text-6xl text-white tracking-tight">
          ONE STOP
        </h1>
        <h2 className="font-manrope font-bold text-3xl md:text-5xl text-emerald-400 tracking-tight mt-2">
          FINANCIAL ADVISOR
        </h2>
      </div>
    </motion.div>
  );
};

export default Preloader;
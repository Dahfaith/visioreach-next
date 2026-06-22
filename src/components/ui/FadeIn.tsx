"use client";
import React from "react";
import { motion } from "framer-motion";

interface FadeInProps {
  children: React.ReactNode;
  direction?: "up" | "down" | "left" | "right" | "none";
  delay?: number;
  duration?: number;
  className?: string;
  id?: string;
}

export default function FadeIn({ 
  children, 
  direction = "up", 
  delay = 0, 
  duration = 0.7,
  className = "",
  id
}: FadeInProps) {
  
  const getInitialPosition = () => {
    switch (direction) {
      case "up": return { opacity: 0, y: 40 };
      case "down": return { opacity: 0, y: -40 };
      case "left": return { opacity: 0, x: -46 };
      case "right": return { opacity: 0, x: 46 };
      default: return { opacity: 0 };
    }
  };

  const getAnimatePosition = () => {
    switch (direction) {
      case "up": case "down": return { opacity: 1, y: 0 };
      case "left": case "right": return { opacity: 1, x: 0 };
      default: return { opacity: 1 };
    }
  };

  const actualDelay = delay > 10 ? delay / 1000 : delay;

  return (
    <motion.div
      initial={getInitialPosition()}
      whileInView={getAnimatePosition()}
      viewport={{ once: true, margin: "0px" }}
      transition={{ duration, delay: actualDelay, ease: [0.4, 0, 0.2, 1] }}
      className={className}
      id={id}
    >
      {children}
    </motion.div>
  );
}

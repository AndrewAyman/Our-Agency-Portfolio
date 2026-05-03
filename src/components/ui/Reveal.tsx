"use client";

import { motion, useInView } from "framer-motion";
import { useRef, CSSProperties } from "react";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  style?: CSSProperties;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  once?: boolean;
}

export function Reveal({ children, className, style, delay = 0, direction = "up", once = true }: RevealProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: "-80px" });
  const dir = { up:{y:30,x:0}, down:{y:-30,x:0}, left:{x:40,y:0}, right:{x:-40,y:0}, none:{x:0,y:0} };
  return (
    <motion.div ref={ref} initial={{ opacity:0, ...dir[direction] }} animate={inView ? { opacity:1, x:0, y:0 } : {}}
      transition={{ duration:0.7, delay, ease:[0.22,1,0.36,1] }} className={className} style={style}>
      {children}
    </motion.div>
  );
}

interface StaggerProps {
  children: React.ReactNode;
  className?: string;
  style?: CSSProperties;
  staggerDelay?: number;
  once?: boolean;
}

export function StaggerContainer({ children, className, style, staggerDelay = 0.1, once = true }: StaggerProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: "-60px" });
  return (
    <motion.div ref={ref} initial="hidden" animate={inView ? "visible" : "hidden"}
      variants={{ hidden:{}, visible:{ transition:{ staggerChildren: staggerDelay } } }}
      className={className} style={style}>
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className, style, direction = "up" }: { children: React.ReactNode; className?: string; style?: CSSProperties; direction?: "up"|"left"|"right"|"none" }) {
  const dir = { up:{y:30,x:0}, left:{x:40,y:0}, right:{x:-40,y:0}, none:{x:0,y:0} };
  return (
    <motion.div
      variants={{ hidden:{ opacity:0, ...dir[direction] }, visible:{ opacity:1, x:0, y:0, transition:{ duration:0.65, ease:[0.22,1,0.36,1] } } }}
      className={className} style={style}>
      {children}
    </motion.div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface CounterProps {
  value: string;
  duration?: number;
}

export default function AnimatedCounter({
  value,
  duration = 2000,
}: CounterProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [displayed, setDisplayed] = useState("0");
  const hasStarted = useRef(false);

  useEffect(() => {
    if (!inView || hasStarted.current) return;
    hasStarted.current = true;

    const match = value.match(/^(\d+\.?\d*)(.*)$/);
    if (!match) {
      setDisplayed(value);
      return;
    }

    const target = parseFloat(match[1]);
    const suffix = match[2];
    const steps = 60;
    const stepDur = duration / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += 1;
      const progress = current / steps;
      const eased = 1 - Math.pow(1 - progress, 3);
      const num = target * eased;
      const formatted =
        target >= 100
          ? Math.floor(num).toLocaleString()
          : num.toFixed(num < 10 ? 1 : 0);
      setDisplayed(formatted + suffix);
      if (current >= steps) {
        clearInterval(timer);
        setDisplayed(value);
      }
    }, stepDur);

    return () => clearInterval(timer);
  }, [inView, value, duration]);

  // ✅ FIX: notranslate prevents Google Translate from wrapping the number
  // which breaks the animation counter
  return (
    <span ref={ref} className="notranslate" translate="no">
      {displayed}
    </span>
  );
}

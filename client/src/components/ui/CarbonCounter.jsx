import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function CarbonCounter({ value }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let start = 0;
    const interval = setInterval(() => {
      start += value / 30;
      if (start >= value) {
        setDisplay(value);
        clearInterval(interval);
      } else {
        setDisplay(Math.floor(start));
      }
    }, 30);
  }, [value]);

  return (
    <motion.h1
      initial={{ scale: 0.8 }}
      animate={{ scale: 1 }}
      className="text-5xl font-bold text-primary"
    >
      {display} kg
    </motion.h1>
  );
}
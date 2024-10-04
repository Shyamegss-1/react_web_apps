/* eslint-disable react/prop-types */
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";

const AnimatedCounter = ({ from = 0, to, duration = 1 }) => {
  const count = useMotionValue(from);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    const controls = animate(count, to, { duration: duration });
    return controls.stop;
  }, []);

  return <motion.span>{rounded}</motion.span>;
};

export default AnimatedCounter;

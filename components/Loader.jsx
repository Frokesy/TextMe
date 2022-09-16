import React from "react";
import { motion } from "framer-motion";

const loadingContainer = {
  width: "4rem",
  height: "4rem",
  display: "flex",
  justifyContent: "space-around",
  gap: "0.5rem"
};

const loadingCircle = {
  display: "block",
  width: "3rem",
  height: "3rem",
  backgroundColor: "#0fa84e",
  borderRadius: "5rem"
};

const loadingContainerVariants = {
  start: {
    transition: {
      staggerChildren: 0.3
    }
  },
  end: {
    transition: {
      staggerChildren: 0.3
    }
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.5
    }
  }
};

const loadingCircleVariants = {
  start: {
    y: "50%"
  },
  end: {
    y: "150%"
  }
};

const loadingCircleTransition = {
  duration: 0.5,
  yoyo: Infinity,
  ease: "easeInOut"
};

export default function Loader() {
  return (
    <div className="flex justify-center items-center h-[90vh] w-screen">
    <motion.div
      style={loadingContainer}
      variants={loadingContainerVariants}
      initial="start"
      animate="end"
      exit="exit"
    >
      <motion.span
        style={loadingCircle}
        variants={loadingCircleVariants}
        transition={loadingCircleTransition}
      />
      <motion.span
        style={loadingCircle}
        variants={loadingCircleVariants}
        transition={loadingCircleTransition}
      />
      <motion.span
        style={loadingCircle}
        variants={loadingCircleVariants}
        transition={loadingCircleTransition}
      />
    </motion.div>
    </div>
  );
}
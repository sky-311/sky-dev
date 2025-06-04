import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const buttonsData = [
  { id: 1, color: "#EF4444", text: "Web development" },
  { id: 2, color: "#3B82F6", text: "Front-end" },
  { id: 3, color: "#10B981", text: "Back-end" },
  { id: 4, color: "#F59E0B", text: "JAVA" },
];

const flipVariants = {
  initial: { rotateX: 0 },
  hovered: { rotateX: 180 },
};

const FlipText = ({ text, className = "" }) => (
  <motion.div className={`flex ${className}`} initial="initial" whileHover="hovered">
    {text.split("").map((char, i) => (
      <div
        key={i}
        className="relative w-8 h-10 sm:w-10 sm:h-14 md:w-12 md:h-16 mx-[1px]"
        style={{ perspective: 800 }}
      >
        <motion.div
          className="w-full h-full absolute"
          style={{ transformStyle: "preserve-3d" }}
          variants={flipVariants}
          transition={{ duration: 0.6, delay: i * 0.05 }}
        >
          <span className="absolute w-full h-full flex items-center justify-center text-white text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold" style={{ backfaceVisibility: "hidden" }}>
            {char}
          </span>
          <span className="absolute w-full h-full flex items-center justify-center text-white text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold" style={{ transform: "rotateX(180deg)", backfaceVisibility: "hidden" }}>
            {char}
          </span>
        </motion.div>
      </div>
    ))}
  </motion.div>
);

const Section = ({ title, subtitle, delay = 0, children }) => {
  const [hoveredButton, setHoveredButton] = useState(null);

  return (
    <motion.div
      className="relative min-h-screen flex flex-col justify-center items-center text-white text-center px-4 sm:px-8"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay }}
    >
      {/* Left Buttons — Responsive and Non-overlapping */}
      <div className="absolute left-2 sm:left-4 md:left-6 top-1/2 -translate-y-1/2 flex flex-col gap-3 sm:gap-4 md:gap-5">
        {buttonsData.map((btn) => (
          <div
            key={btn.id}
            className="relative flex items-center justify-center"
            onMouseEnter={() => setHoveredButton(btn.id)}
            onMouseLeave={() => setHovered2Button(null)}
          >
            <motion.div
              className="w-8 h-6 sm:w-10 sm:h-8 md:w-12 md:h-10 lg:w-14 lg:h-12 cursor-pointer"
              style={{
                backgroundColor: btn.color,
                clipPath: "polygon(0 0, 80% 0, 100% 50%, 80% 100%, 0 100%)",
              }}
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
            <AnimatePresence>
              {hoveredButton === btn.id && (
                <motion.div
                  initial={{ opacity: 0, x: -20, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -20, scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="absolute left-12 sm:left-16 top-1/2 -translate-y-1/2 w-36 sm:w-44 md:w-52 p-2 sm:p-3 bg-black text-white shadow-xl z-10"
                  style={{ clipPath: "polygon(0 0, 90% 0, 100% 50%, 90% 100%, 0 100%)" }}
                >
                  <div className="text-xs sm:text-sm">{btn.text}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* Main Content — Non-overlapping */}
      <div className="w-full max-w-md sm:max-w-xl md:max-w-2xl pl-12 sm:pl-20 md:pl-28 pr-4">
        {title && (
          <div className="mb-2 sm:mb-4 flex flex-col gap-1 sm:gap-2 items-center justify-center">
            <FlipText text="sky/" />
            <FlipText text="dev." />
          </div>
        )}
        {subtitle && (
          <p className="mt-2 sm:mt-4 text-sm sm:text-lg text-gray-300">
            {subtitle}
          </p>
        )}
        {children}
      </div>
    </motion.div>
  );
};

export default Section;

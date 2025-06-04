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

const FlipText = ({ text, className = "" }) => {
  return (
    <motion.div
      className={`flex ${className}`}
      initial="initial"
      whileHover="hovered"
    >
      {text.split("").map((char, i) => (
        <div
          key={i}
          className="relative w-10 h-14 sm:w-12 sm:h-16 mx-[1px]"
          style={{ perspective: 800 }}
        >
          <motion.div
            className="w-full h-full absolute"
            style={{ transformStyle: "preserve-3d" }}
            variants={flipVariants}
            transition={{ duration: 0.6, delay: i * 0.05 }}
          >
            <span
              className="absolute w-full h-full flex items-center justify-center text-white text-5xl sm:text-6xl md:text-8xl font-bold"
              style={{ backfaceVisibility: "hidden" }}
            >
              {char}
            </span>
            <span
              className="absolute w-full h-full flex items-center justify-center text-white text-5xl sm:text-6xl md:text-8xl font-bold"
              style={{
                transform: "rotateX(180deg)",
                backfaceVisibility: "hidden",
              }}
            >
              {char}
            </span>
          </motion.div>
        </div>
      ))}
    </motion.div>
  );
};

const Section = ({ title, subtitle, delay = 0, children }) => {
  const [hoveredButton, setHoveredButton] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <motion.div
      className="relative min-h-screen flex flex-col justify-center items-center text-white text-center px-4"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay }}
    >
      {/* Desktop Buttons - visible on sm and up */}
      <div className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 flex-col gap-6">
        {buttonsData.map((btn) => (
          <div
            key={btn.id}
            className="relative flex items-center justify-center"
            onMouseEnter={() => setHoveredButton(btn.id)}
            onMouseLeave={() => setHoveredButton(null)}
          >
            <motion.div
              className="w-14 h-12 cursor-pointer"
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
                  className="absolute left-16 top-1/2 -translate-y-1/2 w-52 p-4 bg-black text-white shadow-xl z-10"
                  style={{
                    clipPath: "polygon(0 0, 90% 0, 100% 50%, 90% 100%, 0 100%)",
                  }}
                >
                  <div className="text-sm">{btn.text}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* Mobile Button - visible only on small screens */}
      <div className="sm:hidden absolute top-6 left-4 z-50">
        <motion.div
          className="w-12 h-12 bg-gray-700 rounded-md flex items-center justify-center cursor-pointer"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          whileTap={{ scale: 0.95 }}
        >
          <span className="text-xl">{mobileMenuOpen ? "×" : "≡"}</span>
        </motion.div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="mt-3 flex flex-col gap-2"
            >
              {buttonsData.map((btn) => (
                <div
                  key={btn.id}
                  className="w-40 px-4 py-2 rounded shadow text-white text-sm"
                  style={{ backgroundColor: btn.color }}
                >
                  {btn.text}
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Flip Title */}
      {title && (
        <div className="mb-4 flex flex-col gap-2 items-center justify-center mt-8 sm:mt-0">
          <FlipText text="sky/" />
          <FlipText text="dev." />
        </div>
      )}

      {/* Subtitle */}
      {subtitle && (
        <p className="mt-6 text-base sm:text-lg text-gray-300 max-w-xl px-2">
          {subtitle}
        </p>
      )}

      {/* Children */}
      {children}
    </motion.div>
  );
};

export default Section;

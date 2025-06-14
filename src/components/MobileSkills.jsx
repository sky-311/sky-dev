import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

const skills = [
  { id: 1, title: "Web Development", color: "bg-red-500" },
  { id: 2, title: "Front-End", color: "bg-blue-500" },
  { id: 3, title: "Back-End", color: "bg-green-500" },
  { id: 4, title: "Java", color: "bg-yellow-500" },
];

const SCROLL_DELAY = 500; // ms

const gravityTransition = {
  type: "spring",
  stiffness: 300,
  damping: 24,
  mass: 1.2,
};

const tiltAngles = [10, -10, 8, -8]; // Example tilt for each card

const MobileSkills = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollLocked, setScrollLocked] = useState(true);
  const containerRef = useRef(null);
  const throttleRef = useRef(false);

  // For touch gesture
  const touchStartY = useRef(null);

  useEffect(() => {
    const handleWheel = (e) => {
      if (!scrollLocked) return;
      e.preventDefault();

      if (throttleRef.current) return;
      throttleRef.current = true;
      setTimeout(() => {
        throttleRef.current = false;
      }, SCROLL_DELAY);

      if (e.deltaY > 0 && activeIndex < skills.length - 1) {
        setActiveIndex((i) => Math.min(i + 1, skills.length - 1));
      } else if (e.deltaY < 0 && activeIndex > 0) {
        setActiveIndex((i) => Math.max(i - 1, 0));
      } else if (e.deltaY > 0 && activeIndex === skills.length - 1) {
        setScrollLocked(false);
      }
    };

    // --- Touch handlers for mobile ---
    const handleTouchStart = (e) => {
      if (!scrollLocked) return;
      if (e.touches.length === 1) {
        touchStartY.current = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e) => {
      if (!scrollLocked) return;
      if (touchStartY.current !== null) e.preventDefault();
    };

    const handleTouchEnd = (e) => {
      if (!scrollLocked) return;
      if (touchStartY.current === null) return;
      const touchEndY = e.changedTouches[0].clientY;
      const deltaY = touchStartY.current - touchEndY;
      touchStartY.current = null;

      if (Math.abs(deltaY) < 40) return; // Ignore small swipes

      if (throttleRef.current) return;
      throttleRef.current = true;
      setTimeout(() => {
        throttleRef.current = false;
      }, SCROLL_DELAY);

      if (deltaY > 0 && activeIndex < skills.length - 1) {
        // Swipe up
        setActiveIndex((i) => Math.min(i + 1, skills.length - 1));
      } else if (deltaY < 0 && activeIndex > 0) {
        // Swipe down
        setActiveIndex((i) => Math.max(i - 1, 0));
      } else if (deltaY > 0 && activeIndex === skills.length - 1) {
        setScrollLocked(false);
      }
    };

    const node = containerRef.current;
    if (node && scrollLocked) {
      node.addEventListener("wheel", handleWheel, { passive: false });
      node.addEventListener("touchstart", handleTouchStart, { passive: false });
      node.addEventListener("touchmove", handleTouchMove, { passive: false });
      node.addEventListener("touchend", handleTouchEnd, { passive: false });
    }
    return () => {
      if (node) {
        node.removeEventListener("wheel", handleWheel);
        node.removeEventListener("touchstart", handleTouchStart);
        node.removeEventListener("touchmove", handleTouchMove);
        node.removeEventListener("touchend", handleTouchEnd);
      }
    };
  }, [activeIndex, scrollLocked]);

  // Re-lock scroll if user scrolls back up into the card section
  useEffect(() => {
    const handleScroll = () => {
      if (
        !scrollLocked &&
        window.scrollY < containerRef.current.offsetTop + 10
      ) {
        setScrollLocked(true);
        setActiveIndex(skills.length - 1);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollLocked]);

  // When scroll lock is released, scroll the page past the card section
  useEffect(() => {
    if (!scrollLocked) {
      const container = containerRef.current;
      if (container) {
        const rect = container.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        window.scrollTo({
          top: scrollTop + rect.bottom,
          behavior: "smooth",
        });
      }
    }
  }, [scrollLocked]);

  return (
    <div
      ref={containerRef}
      className="sm:hidden relative w-full"
      style={{
        height: "100vh",
        overflow: scrollLocked ? "hidden" : "auto",
        position: "relative",
        zIndex: 10,
        touchAction: "none", // Prevent default scroll on mobile
      }}
    >
      <div className="w-full h-full flex items-center justify-center">
        {skills.map((skill, index) => (
          <motion.div
            key={skill.id}
            initial={{
              opacity: 0,
              scale: 0.95,
              y: 100,
              rotateZ: tiltAngles[index % tiltAngles.length],
            }}
            animate={
              index === activeIndex
                ? {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    rotateZ: 0,
                    transition: gravityTransition,
                  }
                : {
                    opacity: 0,
                    scale: 0.95,
                    y: -100 * (activeIndex - index),
                    rotateZ: tiltAngles[index % tiltAngles.length],
                    transition: gravityTransition,
                  }
            }
            className={`absolute top-0 left-0 w-full h-full rounded-2xl shadow-2xl flex items-center justify-center text-white text-3xl font-bold ${skill.color}`}
            style={{
              pointerEvents: index === activeIndex ? "auto" : "none",
            }}
          >
            {skill.title}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MobileSkills;

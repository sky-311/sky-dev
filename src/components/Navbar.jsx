import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

const Navbar = ({ refs }) => {
  const [position, setPosition] = useState({ left: 0, width: 0, opacity: 0 });

  const handleClick = (section) => {
    const ref = refs?.[section];
    if (ref && ref.current) ref.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed top-0 left-0 z-50 w-full flex items-center justify-between px-4 sm:px-6 py-2 bg-neutral-100 shadow-sm">
      <ul
        onMouseLeave={() => setPosition(pv => ({ ...pv, opacity: 0 }))}
        className="relative flex w-fit rounded-full border-2 border-black bg-white p-1"
      >
        <Tab setPosition={setPosition} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          Home
        </Tab>
        <Tab setPosition={setPosition} onClick={() => handleClick("projects")}>
          Projects
        </Tab>
        <Tab setPosition={setPosition} onClick={() => handleClick("about")}>
          About
        </Tab>
        <Tab setPosition={setPosition} onClick={() => handleClick("contact")}>
          Contact
        </Tab>
        <Tab setPosition={setPosition} showTooltip>
          Blog
        </Tab>
        <Cursor position={position} />
      </ul>
      <span className="ml-2 sm:ml-6 font-extrabold text-4xl sm:text-5xl md:text-7xl text-black select-none">
        aakash
      </span>
    </nav>
  );
};

const Tab = ({ children, setPosition, onClick, showTooltip }) => {
  const ref = useRef(null);
  const [show, setShow] = useState(false);

  return (
    <li
      ref={ref}
      onClick={onClick}
      onMouseEnter={() => {
        if (!ref?.current) return;
        const { width } = ref.current.getBoundingClientRect();
        setPosition({ left: ref.current.offsetLeft, width, opacity: 1 });
        if (showTooltip) setShow(true);
      }}
      onMouseLeave={() => { if (showTooltip) setShow(false); }}
      className="relative z-10 block cursor-pointer px-2 py-1 text-xs sm:px-3 sm:py-1 uppercase text-white mix-blend-difference md:px-5 md:py-2 md:text-base"
    >
      {children}
      {show && (
        <div className="absolute top-full mt-1 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-black text-white text-xs px-2 py-1 shadow-lg">
          In Progress
        </div>
      )}
    </li>
  );
};

const Cursor = ({ position }) => (
  <motion.li
    animate={{ ...position }}
    className="absolute z-0 h-6 sm:h-7 rounded-full bg-black md:h-10"
    style={{ top: 0 }}
  />
);

export default Navbar;

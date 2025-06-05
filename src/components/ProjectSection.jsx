import { motion, useScroll, animate, useMotionValue, useMotionValueEvent } from "framer-motion";
import { useRef, useState } from "react";

const cards = [
  {
    url: "/imgs/abstract/2.jpg",
    title: "Voting App",
    id: 2,
    link: "https://voting-app-demo.com"
  },
  {
    url: "/imgs/abstract/4.jpg",
    title: "Farming Product Website called 'Dmocil'",
    id: 4,
    link: "https://dmocil.com/"
  },
  {
    url: "/imgs/abstract/5.jpg",
    title: "Personal Notes App",
    id: 5,
    link: "https://personal-notes-app-eta.vercel.app/"
  },
  {
    url: "/imgs/abstract/6.jpg",
    title: "In Progress",
    id: 6,
    link: "https://example.com/project-6"
  },
  {
    url: "/imgs/abstract/7.jpg",
    title: "In Progress",
    id: 7,
    link: "https://example.com/project-7"
  }
];

const left = `0%`;
const right = `100%`;
const leftInset = `20%`;
const rightInset = `80%`;
const transparent = `#0000`;
const opaque = `#000`;

function useScrollOverflowMask(scrollXProgress) {
  const maskImage = useMotionValue(
    `linear-gradient(90deg, ${opaque}, ${opaque} ${left}, ${opaque} ${rightInset}, ${transparent})`
  );

  useMotionValueEvent(scrollXProgress, "change", (value) => {
    if (value === 0) {
      animate(
        maskImage,
        `linear-gradient(90deg, ${opaque}, ${opaque} ${left}, ${opaque} ${rightInset}, ${transparent})`
      );
    } else if (value === 1) {
      animate(
        maskImage,
        `linear-gradient(90deg, ${transparent}, ${opaque} ${leftInset}, ${opaque} ${right}, ${opaque})`
      );
    } else if (
      scrollXProgress.getPrevious() === 0 ||
      scrollXProgress.getPrevious() === 1
    ) {
      animate(
        maskImage,
        `linear-gradient(90deg, ${transparent}, ${opaque} ${leftInset}, ${opaque} ${rightInset}, ${transparent})`
      );
    }
  });

  return maskImage;
}

const ProjectSection = () => {
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-black opacity-90 z-[-1]" />
      <HorizontalScrollCarousel />
      <StyleSheet />
    </div>
  );
};

const HorizontalScrollCarousel = () => {
  const targetRef = useRef(null);
  const { scrollXProgress } = useScroll({ container: targetRef });
  const maskImage = useScrollOverflowMask(scrollXProgress);

  return (
    <section className="relative w-full max-w-[600px] mx-auto h-[600px]">
      {/* Progress Indicator */}
      <svg id="progress" width="80" height="80" viewBox="0 0 100 100" style={{ position: "absolute", top: -65, left: -15, transform: "rotate(-90deg)" }}>
        <circle cx="50" cy="50" r="30" pathLength="1" className="bg" />
        <motion.circle
          cx="50"
          cy="50"
          r="30"
          className="indicator"
          style={{ pathLength: scrollXProgress }}
        />
      </svg>
      {/* Scrollable Card List */}
      <motion.ul
        ref={targetRef}
        style={{ maskImage, WebkitMaskImage: maskImage }}
        className="flex list-none h-[520px] overflow-x-scroll py-5 gap-8 px-4"
      >
        {cards.map((card) => (
          <li key={card.id} className="flex-shrink-0">
            <Card card={card} />
          </li>
        ))}
      </motion.ul>
    </section>
  );
};

const Card = ({ card }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="relative h-[520px] w-[450px] bg-neutral-200 rounded-xl overflow-hidden cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {/* Background Image */}
      <div
        style={{
          backgroundImage: `url(${card.url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="absolute inset-0 z-0"
      />

      {/* Title Overlay */}
      <div className="absolute inset-0 bg-black/40 grid place-content-center z-10">
        <p className="text-white text-3xl font-bold">{card.title}</p>
      </div>

      {/* Floating Detail Overlay */}
      {hovered && (
        <motion.div
          className="absolute z-20 bg-black/90 text-white p-6 rounded-xl shadow-xl"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1.05 }}
          exit={{ opacity: 0, scale: 0.95 }}
          style={{
            top: "-10px",
            left: "-10px",
            width: "470px",
            height: "540px",
          }}
        >
          <div className="flex flex-col justify-end h-full">
            <h2 className="text-3xl font-bold mb-2">{card.title}</h2>
            <p className="text-sm">
              <a
                href={card.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 underline"
              >
                click here
              </a>
            </p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

// Inline styles for mask/progress indicator
function StyleSheet() {
  return (
    <style>{`
      #progress .bg {
        stroke: #0b1011;
        stroke-width: 10%;
        fill: none;
      }
      #progress circle {
        stroke-dashoffset: 0;
        stroke-width: 10%;
        fill: none;
      }
      #progress .indicator {
        stroke: #38bdf8;
        stroke-width: 10%;
        fill: none;
      }
      ul::-webkit-scrollbar {
        height: 5px;
        background: #fff3;
        border-radius: 1ex;
      }
      ul::-webkit-scrollbar-thumb {
        background: #38bdf8;
        border-radius: 1ex;
      }
      ul::-webkit-scrollbar-corner {
        background: #fff3;
      }
    `}</style>
  );
}

export default ProjectSection;

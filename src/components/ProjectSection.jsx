import { motion, useTransform, useScroll } from "framer-motion";
import { useRef, useState } from "react";

const cards = [
  { url: "/imgs/abstract/2.jpg", title: "Voting App", id: 2, link: "https://voting-app-demo.com" },
  { url: "/imgs/abstract/4.jpg", title: "Farming Product Website called 'Dmocil'", id: 4, link: "https://dmocil.com/" },
  { url: "/imgs/abstract/5.jpg", title: "Personal Notes App", id: 5, link: "https://personal-notes-app-eta.vercel.app/" },
  { url: "/imgs/abstract/6.jpg", title: "In Progress", id: 6, link: "https://example.com/project-6" },
  { url: "/imgs/abstract/7.jpg", title: "In Progress", id: 7, link: "https://example.com/project-7" }
];

const ProjectSection = () => (
  <div className="relative">
    <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-black opacity-90 z-[-1]" />
    <HorizontalScrollCarousel />
  </div>
);

const HorizontalScrollCarousel = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: targetRef });
  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"]);

  return (
    <section ref={targetRef} className="relative h-[120vh] sm:h-[120vh]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-4 sm:gap-8 px-2 sm:px-4">
          {cards.map((card) => (
            <Card key={card.id} card={card} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const Card = ({ card }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="relative h-[300px] w-[300px] sm:h-[400px] sm:w-[400px] md:h-[450px] md:w-[450px] bg-neutral-200 rounded-xl overflow-hidden cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div
        style={{ backgroundImage: `url(${card.url})`, backgroundSize: "cover", backgroundPosition: "center" }}
        className="absolute inset-0 z-0"
      />
      <div className="absolute inset-0 bg-black/40 grid place-content-center z-10">
        <p className="text-white text-xl sm:text-2xl md:text-3xl font-bold">{card.title}</p>
      </div>
      {hovered && (
        <motion.div
          className="absolute z-20 bg-black/90 text-white p-4 sm:p-6 rounded-xl shadow-xl"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1.05 }}
          exit={{ opacity: 0, scale: 0.95 }}
          style={{
            top: "-8px",
            left: "-8px",
            width: "calc(100% + 16px)",
            height: "calc(100% + 16px)",
          }}
        >
          <div className="flex flex-col justify-end h-full">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">{card.title}</h2>
            <p className="text-xs sm:text-sm">
              <a href={card.link} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">
                click here
              </a>
            </p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ProjectSection;

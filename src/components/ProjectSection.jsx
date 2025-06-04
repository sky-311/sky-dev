import { motion, useTransform, useScroll } from "framer-motion";
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

const ProjectSection = () => {
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-black opacity-90 z-[-1]" />
      <HorizontalScrollCarousel />
    </div>
  );
};

const HorizontalScrollCarousel = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: targetRef });
  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"]);

  return (
    <section ref={targetRef} className="relative h-[120vh]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-8 px-4">
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
      className="relative h-[450px] w-[450px] bg-neutral-200 rounded-xl overflow-hidden cursor-pointer"
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
            height: "470px",
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

export default ProjectSection;

import Section from "./Section";
import { motion } from "framer-motion";

const AboutSection = () => (
  <div className="min-h-screen flex items-center justify-center px-4 bg-blue text-white">
    <div className="max-w-6xl w-full flex flex-col md:flex-row items-center gap-10">
      
      {/* Left: Text content */}
      <motion.div
        className="flex-1 text-left"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-5xl md:text-6xl font-bold mb-4">About Me</h1>
        <p className="text-lg text-gray-300">
          Hi, I'm Aakash! I'm a passionate developer with a love for creating
          innovative solutions. With expertise in web development and a keen eye
          for design, I strive to build user-friendly applications that make a
          difference. Let's connect and bring your ideas to life!
        </p>
      </motion.div>

      {/* Right: Image */}
      <motion.img
        src="/images/img2.jpg"
        alt="Aakash - Developer"
        className="w-64 h-96 rounded-xl shadow-2xl object-cover border-4 border-white"
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
      />
    </div>
  </div>
);

export default AboutSection;

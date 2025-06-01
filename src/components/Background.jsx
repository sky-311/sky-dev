import { motion } from "framer-motion";

const Background = () => (
  <motion.div
    className="fixed inset-0 bg-gradient-to-br from-blue-900 to-black opacity-90 z-0"
    initial={{ scale: 1.2 }}
    animate={{ scale: 1 }}
    transition={{ duration: 2 }}
  />
);

export default Background;

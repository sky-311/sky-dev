import React, { useRef } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import emailjs from "emailjs-com";

const ContactSection = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_kg1f4wl",
        "template_lb0ainq",
        form.current,
        "elhebDIxWYy3Iwcgp"
      )
      .then(
        (result) => {
          alert("Message sent successfully!");
          e.target.reset();
        },
        (error) => {
          alert("Failed to send message, please try again.");
          console.error(error.text);
        }
      );
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col justify-center items-center text-white text-center px-4 sm:px-6"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-2 sm:mb-4">
        Contact
      </h1>
      <p className="text-sm sm:text-lg text-gray-300 max-w-xs sm:max-w-md md:max-w-xl mb-4 sm:mb-8">
        Let's work together! You can reach me via email or connect with me on social platforms.
      </p>
      <form
        ref={form}
        onSubmit={sendEmail}
        className="w-full max-w-xs sm:max-w-md md:max-w-xl bg-white/10 p-4 sm:p-6 rounded-2xl border border-white/20 backdrop-blur shadow-lg space-y-3 sm:space-y-4"
      >
        {/* <input
          type="text"
          name="from_name"
          placeholder="Your Name"
          className="w-full px-3 sm:px-4 py-2 rounded-md bg-black/30 text-white border border-white/30 placeholder-gray-400 text-sm sm:text-base"
          required
        /> */}
        <input
          type="email"
          name="reply_to"
          placeholder="Your Email"
          className="w-full px-3 sm:px-4 py-2 rounded-md bg-black/30 text-white border border-white/30 placeholder-gray-400 text-sm sm:text-base"
          required
        />
        <textarea
          name="message"
          rows="4"
          placeholder="Your Message"
          className="w-full px-3 sm:px-4 py-2 rounded-md bg-black/30 text-white border border-white/30 placeholder-gray-400 text-sm sm:text-base"
          required
        ></textarea>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white text-sm sm:text-base font-medium transition"
        >
          Send Message
        </button>
      </form>
      <div className="flex gap-4 mt-6">
        <a href="#" className="text-white hover:text-blue-400 transition">
          <FaGithub size={24} />
        </a>
        <a href="#" className="text-white hover:text-blue-400 transition">
          <FaLinkedin size={24} />
        </a>
        <a href="#" className="text-white hover:text-blue-400 transition">
          <FaEnvelope size={24} />
        </a>
      </div>
    </motion.div>
  );
};

export default ContactSection;

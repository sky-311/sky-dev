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
      className="min-h-screen flex flex-col justify-center items-center text-white text-center px-6"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <h1 className="text-5xl md:text-7xl font-bold mb-4">Contact</h1>
      <p className="text-lg text-gray-300 max-w-xl mb-8">
        Let's work together! You can reach me via email or connect with me on social platforms.
      </p>
      <form
        ref={form}
        onSubmit={sendEmail}
        className="w-full max-w-xl bg-white/10 p-6 rounded-2xl border border-white/20 backdrop-blur shadow-lg space-y-4"
      >
        <input
          type="text"
          name="from_name"
          placeholder="Your Name"
          className="w-full px-4 py-2 rounded-md bg-black/30 text-white border border-white/30 placeholder:text-white/70 placeholder:text-sm md:placeholder:text-base"
          required
        />
        <input
          type="email"
          name="reply_to"
          placeholder="Your Email"
          className="w-full px-4 py-2 rounded-md bg-black/30 text-white border border-white/30 placeholder:text-white/70 placeholder:text-sm md:placeholder:text-base"
          required
        />
        <textarea
          name="message"
          rows="5"
          placeholder="Your Message"
          className="w-full px-4 py-2 rounded-md bg-black/30 text-white border border-white/30 placeholder:text-white/70 placeholder:text-sm md:placeholder:text-base"
          required
        ></textarea>
        <button
          type="submit"
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 transition rounded-md font-semibold"
        >
          Send Message
        </button>
      </form>
      <div className="flex gap-6 mt-8 text-3xl">
        <a href="https://github.com/sky-311" target="_blank" rel="noopener noreferrer">
          <FaGithub className="hover:text-blue-400 transition" />
        </a>
        <a href="https://www.linkedin.com/in/skyp311/" target="_blank" rel="noopener noreferrer">
          <FaLinkedin className="hover:text-blue-400 transition" />
        </a>
        <a href="mailto:skypolist11@gmail.com">
          <FaEnvelope className="hover:text-blue-400 transition" />
        </a>
      </div>
    </motion.div>
  );
};

export default ContactSection;

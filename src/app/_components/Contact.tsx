"use client";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import clsx from "clsx";
import { montaga } from "../../fonts";
import { BiLoader } from "react-icons/bi";
import PopIn from "../_utils/popIn";

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null!);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [emailStatus, setEmailStatus] = useState({
    status: "",
    isSuccess: true,
  });

  const handleChange = (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target as HTMLInputElement | HTMLTextAreaElement;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (form.name === "" || form.email === "" || form.message === "") {
      setEmailStatus({
        status: "Please fill out all fields",
        isSuccess: false,
      });
      setLoading(false);
      return;
    }

    emailjs
      .send(
        "service_hv2mjna",
        "template_p8f56gd",
        {
          to_name: "Danyal",
          from_name: form.name,
          from_email: form.email,
          message: form.message,
        },
        "Ac72CRSyyzze_1zPs"
      )
      .then(
        () => {
          setLoading(false);
          setEmailStatus({
            status: "Thank you! I'll get back to you soon.",
            isSuccess: true,
          });

          setForm({
            name: "",
            email: "",
            message: "",
          });
        },
        (error) => {
          setLoading(false);

          console.log(error);

          setEmailStatus({ status: "Something went wrong", isSuccess: false });
        }
      );
  };

  return (
    <article id="contact" className="m-8">
      <h2 className={`text-3xl ${montaga.className} my-4`}>Contact</h2>
      <h3 className="text-sm md:text-base">
        Feel free to reach out about open positions, potential project
        opportunities, or just to connect!
      </h3>
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="flex flex-col my-6"
      >
        <PopIn>
          <label className="flex flex-col mb-6 ">
            <span>Your Name</span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your name"
              className="p-2 bg-standard-100 border border-standard-300 rounded-lg focus:bg-white text-standard-900 max-w-4xl"
            />
          </label>
        </PopIn>
        <PopIn>
          <label className="flex flex-col mb-6">
            <span>Your Email Address</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="What's your email address?"
              className="p-2 bg-standard-100 border border-standard-300 rounded-lg focus:bg-white text-standard-900 max-w-4xl"
            />
          </label>
        </PopIn>
        <PopIn>
          <label className="flex flex-col">
            <span>Your Message</span>
            <textarea
              rows={7}
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="What do you want to say?"
              className="p-2 bg-standard-100 border border-standard-300 rounded-lg focus-bg-white text-standard-900 max-w-9xl"
            />
          </label>
        </PopIn>
        <p
          className={clsx(
            "",
            emailStatus.isSuccess
              ? "text-standard-confirm dark:text-standard-darkconfirm"
              : "text-standard-delete dark:text-standard-darkdelete"
          )}
        >
          {emailStatus.status}
        </p>
        <PopIn>
          <motion.button
            type="submit"
            className="w-fit h-8 rounded-full text-lg mb-12 px-4 bg-standard-primary dark:bg-standard-darkprimary mt-6"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {loading ? "Sending... " : "Send "}
            {loading ? <BiLoader className="inline animate-spin" /> : null}
          </motion.button>
        </PopIn>
      </form>
    </article>
  );
}

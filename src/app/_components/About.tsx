"use client";
import { montaga } from "../../fonts";
import PopIn from "../_utils/popIn";
import { technologies } from "../about/constants/technologies";
import { TbSeparator } from "react-icons/tb";

export default function About() {
  return (
    <article
      className="bg-standard-900 dark:bg-standard-100 text-standard-100 dark:text-standard-900 w-full mx-0 pt-24"
      id="about"
    >
      <header className="mb-12">
        <h2 className={`text-center text-6xl ${montaga.className}`}>
          About Me
        </h2>
        <TbSeparator className="mx-auto" size={40} />
        <p className="text-center">
          Here you'll find some information about me, my current skills, and
          what I'm working on now
        </p>
      </header>
      <div className="flex flex-col md:flex-row lg:gap-12 mb-8">
        <section className="flex flex-col gap-2 flex-grow basis-0 m-8">
          <h3 className="text-3xl font-semibold">Get to know me!</h3>
          <p>
            I am a self-taught software developer currently working on building
            my skills as a <strong>full-stack engineer</strong>. I'm passionate
            about building things, and I'm excited to continue learning and
            applying new things every day.
          </p>
          <p>
            While I'm still new to the web development community, I have had a
            lot of valuable experiences learning from people and making
            connections. If you have thoughts or want to connect, feel free to
            Connect or Follow me on my{" "}
            <a href="www.linkedin.com/in/danyal-ahmed-b187a22b">LinkedIn</a>, or
            make a pull request to my GitHub! I am open to freelance work for
            both personal and business websites.
          </p>
          <p>
            My love for design and technology inspired me throughout my
            background in astrophysics and chemistry. I like to leverage a wide
            array of experiences and influences to create with both elegance and
            functionality in mind. I am{" "}
            <strong className="text-standard-darkconfirm dark:text-standard-confirm">
              open
            </strong>{" "}
            to job opportunities where I can contribute, learn, and grow. If you
            have a good opportunity that matches my skills and skillset, please
            feel free to contact me!
          </p>
        </section>
        <section className="flex-grow basis-0 m-8">
          <h2 className="text-3xl font-semibold mb-2">My Skills</h2>
          <div className="flex flex-wrap gap-2">
            {technologies.map((technology) => {
              return (
                <PopIn>
                  <span className="border border-standard-600 dark:border-standard-300 rounded-md py-1 px-2 bg-standard-800 dark:bg-standard-200 text-xs md:text-base mb-2">
                    <img
                      src={technology.icon}
                      className="w-4 md:w-6 inline align-middle md:align-top mr-1"
                    />
                    {technology.name}
                  </span>
                </PopIn>
              );
            })}
          </div>
        </section>
      </div>
      <svg
        viewBox="0 0 900 96"
        className="bg-standard-100 dark:bg-standard-900"
      >
        <path
          d="M0 43L60 91L120 52L180 59L240 44L300 84L360 56L420 77L480 65L540 61L600 85L660 82L720 96L780 85L840 91L900 64L900 0L840 0L780 0L720 0L660 0L600 0L540 0L480 0L420 0L360 0L300 0L240 0L180 0L120 0L60 0L0 0Z"
          className="fill-standard-200 dark:fill-standard-800"
        ></path>
        <path
          d="M0 80L60 66L120 57L180 45L240 74L300 39L360 59L420 39L480 51L540 46L600 46L660 80L720 50L780 69L840 70L900 37L900 0L840 0L780 0L720 0L660 0L600 0L540 0L480 0L420 0L360 0L300 0L240 0L180 0L120 0L60 0L0 0Z"
          className="fill-standard-300 dark:fill-standard-700"
        ></path>
        <path
          d="M0 63L60 31L120 55L180 55L240 56L300 53L360 63L420 51L480 54L540 46L600 54L660 60L720 36L780 33L840 63L900 63L900 0L840 0L780 0L720 0L660 0L600 0L540 0L480 0L420 0L360 0L300 0L240 0L180 0L120 0L60 0L0 0Z"
          className="fill-standard-500 dark:standard-400"
        ></path>
        <path
          d="M0 36L60 36L120 23L180 37L240 27L300 42L360 29L420 18L480 26L540 28L600 24L660 46L720 19L780 21L840 30L900 44L900 0L840 0L780 0L720 0L660 0L600 0L540 0L480 0L420 0L360 0L300 0L240 0L180 0L120 0L60 0L0 0Z"
          className="fill-standard-700 dark:fill-standard-300"
        ></path>
        <path
          d="M0 16L60 24L120 23L180 29L240 20L300 16L360 19L420 23L480 9L540 21L600 23L660 12L720 17L780 27L840 22L900 29L900 0L840 0L780 0L720 0L660 0L600 0L540 0L480 0L420 0L360 0L300 0L240 0L180 0L120 0L60 0L0 0Z"
          className="fill-standard-900 dark:fill-standard-100"
        ></path>
      </svg>
    </article>
  );
}

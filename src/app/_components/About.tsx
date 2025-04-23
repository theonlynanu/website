"use client";
import { montaga } from "../../fonts";
import PopIn from "../_utils/popIn";
import { technologies } from "../_constants/technologies";
import { TbSeparator, TbBrandLinkedin, TbBrandGithub } from "react-icons/tb";
import Image from "next/image";

function Cert({ src, alt, link }: { src: string; alt: string; link?: string }) {
  return (
    <PopIn>
      <a href={link} target="_blank" rel="noopener noreferrer">
        <Image src={src} alt={alt} height={150} width={150} />
      </a>
    </PopIn>
  );
}

export default function About() {
  return (
    <article
      className="mx-0 w-full bg-standard-900 pt-24 text-standard-100 dark:bg-standard-100 dark:text-standard-900"
      id="about"
    >
      <header className="mb-12">
        <h2 className={`text-center text-6xl ${montaga.className}`}>
          About Me
        </h2>
        <TbSeparator className="mx-auto" size={40} />
        <p className="mx-8 text-center">
          Here you'll find some information about me, my current skills, and
          what I'm working on now
        </p>
      </header>
      <div className="mb-8 flex flex-col md:flex-row lg:gap-12">
        <section className="m-8 flex flex-grow basis-0 flex-col gap-2">
          <h3 className="text-3xl font-semibold">Get to know me!</h3>
          <p>
            I am a software developer, astronomy lover, and full-time nerd,
            currently working on building my skills as a{" "}
            <strong>full-stack engineer</strong>. I'm passionate about building
            things, and I'm excited to continue learning and applying new things
            every day.
          </p>
          <p>
            I love the web development community, I've had a lot of valuable
            experiences learning from people and making connections across all
            fields. I'd love to get the chance to make you a part of my
            community! Feel free to Connect or Follow me on my{" "}
            <TbBrandLinkedin className="inline text-standard-500 dark:text-standard-800" />
            <a
              href="https://www.linkedin.com/in/danyal-ahmed-b187a22b"
              target="_blank"
              className="font-semibold text-standard-500 hover:underline dark:text-standard-800"
            >
              LinkedIn
            </a>
            , or make a pull request to my{" "}
            <TbBrandGithub className="inline text-standard-500 dark:text-standard-800" />
            <a
              href="https://github.com/theonlynanu"
              target="_blank"
              className="font-semibold text-standard-500 hover:underline dark:text-standard-800"
            >
              GitHub
            </a>
            ! I am open to freelance work for both personal and business
            websites.
          </p>
          <p>
            My love for design and technology inspired me throughout my
            background in astrophysics and chemistry. I like to leverage my wide
            array of experiences and influences to create, both with elegance
            and functionality in mind. I am currently{" "}
            <strong className="text-standard-darkconfirm dark:text-standard-confirm">
              open
            </strong>{" "}
            to job opportunities where I can contribute, learn, and grow. If you
            have a good opportunity that matches my experience and skillset,
            please feel free to contact me!
          </p>
        </section>
        <section className="m-8 flex-grow basis-0">
          <h2 className="mb-2 text-3xl font-semibold">My Skills</h2>
          <div className="flex flex-wrap gap-2">
            {technologies.map((technology, index) => {
              return (
                <PopIn key={index}>
                  <span
                    key={`child-${index}`}
                    className="mb-2 rounded-md border border-standard-600 bg-standard-800 px-2 py-1 text-xs md:text-base dark:border-standard-300 dark:bg-standard-200"
                  >
                    <img
                      src={technology.icon}
                      alt={technology.name}
                      className="mr-1 inline w-4 align-middle md:w-6 md:align-top"
                    />
                    {technology.name}
                  </span>
                </PopIn>
              );
            })}
          </div>
          <h2 className="mb-2 mt-4 text-3xl font-semibold"> Certifications</h2>
          <div className="flex flex-shrink flex-row gap-2">
            <Cert
              src="/AWS-Cloud-Prac.png"
              alt="AWS Cloud Practitioner"
              link="https://www.credly.com/badges/17daf863-ea8c-4961-acfa-e70569040b2d"
            />
            <Cert
              src="/GCC-IT-Badge.png"
              alt="Google IT Certificate"
              link="https://www.coursera.org/account/accomplishments/specialization/W3YE8JKJJX5C"
            />
          </div>
          <div className="mt-12">
            Want to grab a copy of my resume? Download it{" "}
            <a
              href="/files/Danyal-Ahmed-Resume.pdf"
              className="font-semibold hover:underline"
              download
            >
              here!
            </a>
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
          className="dark:standard-400 fill-standard-500"
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

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
      <div className="flex flex-col md:flex-row lg:gap-12">
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
      <p className="h-96"></p>
    </article>
  );
}

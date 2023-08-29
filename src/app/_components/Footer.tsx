import { montaga } from "../../fonts";
import { BsLinkedin, BsGithub, BsTelegram } from "react-icons/bs";

const Footer = () => {
  return (
    <footer className="h-fit bg-standard-900 dark:bg-standard-100 text-standard-100 dark:text-standard-900 my-0 py-8 px-8 flex flex-row justify-between">
      <div
        className={`${montaga.className} flex flex-col justify-around h-full`}
      >
        <p className="text-xl">Danyal Ahmed</p>
        <p className="text-sm">
          Written with React in NextJS. Deployed with Vercel.
        </p>
      </div>
      <div className="flex flex-row gap-4 self-center">
        <a href="https://github.com/theonlynanu">
          <BsGithub className="fill-standard-100 dark:fill-standard-900 w-6 h-6" />
        </a>
        <a href="www.linkedin.com/in/danyal-ahmed-b187a22b">
          <BsLinkedin className="fill-standard-100 dark:fill-standard-900 w-6 h-6" />
        </a>
        <a href="https://t.me/theonlynanu">
          <BsTelegram className="fill-standard-100 dark:fill-standard-900 w-6 h-6" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;

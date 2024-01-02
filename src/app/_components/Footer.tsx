import { montaga } from "../../fonts";
import { BsLinkedin, BsGithub, BsTelegram } from "react-icons/bs";

const Footer = () => {
  return (
    <footer className="bottom-0 my-0 flex h-fit w-full flex-row justify-between bg-standard-900 px-8 py-8 text-standard-100 dark:bg-standard-100 dark:text-standard-900">
      <div
        className={`${montaga.className} flex h-full flex-col justify-around`}
      >
        <p className="text-xl">Danyal Ahmed</p>
        <p className="text-sm">
          Written with React in NextJS. Deployed with Vercel.
        </p>
      </div>
      <div className="flex flex-row gap-4 self-center">
        <a target="_blank" href="https://github.com/theonlynanu">
          <BsGithub className="h-6 w-6 fill-standard-100 dark:fill-standard-900" />
        </a>
        <a
          target="_blank"
          href="https://www.linkedin.com/in/danyal-ahmed-b187a22b"
        >
          <BsLinkedin className="h-6 w-6 fill-standard-100 dark:fill-standard-900" />
        </a>
        <a target="_blank" href="https://t.me/theonlynanu">
          <BsTelegram className="h-6 w-6 fill-standard-100 dark:fill-standard-900" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;

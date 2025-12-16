import Link from "next/link";
import DarkModeBtn from "./DarkModeBtn";

const Header = () => {
  return (
    <header className="flex gap-6">
      <Link className="text-2xl" href="/">
        Danyal Ahmed
      </Link>
      <DarkModeBtn />
    </header>
  );
};

export default Header;

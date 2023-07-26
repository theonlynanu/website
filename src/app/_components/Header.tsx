import DarkModeBtn from "./DarkModeBtn";

const Header = () => {
  return (
    <header className="flex gap-6">
      <a className="text-2xl" href="/">
        Danyal Ahmed
      </a>
      <DarkModeBtn />
    </header>
  );
};

export default Header;

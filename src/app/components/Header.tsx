import DarkModeBtn from "./DarkModeBtn"

const Header = () => {
    return (
        <header className="flex gap-6">
            <div className="text-2xl">Danyal Ahmed</div>
            <DarkModeBtn />
        </header>
    )
}

export default Header;
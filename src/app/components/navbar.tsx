'use client'
import { motion } from 'framer-motion'
import { ReactNode } from '@mdx-js/react/lib'
import { useState } from 'react' 
import DarkModeBtn from './DarkModeBtn'
import NavToggle from './NavToggle'
import {} from 'react-icons'


function Logo() {
    return (
        <div className='flex w-fit items-center justify-center gap-2'>
            <h1 className="text-xl sm:text-4xl">DA</h1>
        </div>
    )
}

function NavLink({href, children}: {href:string, children: ReactNode}) {
    return (
        <a className='hover:bg-standard-200 dark:hover:bg-standard-800 rounded-full py-2 px-3 text-md lg:text-xl'
            href={href}
        >
            {children}
        </a>
    )
}

function FramerNav() {
    const [isOpen, setIsOpen] = useState(true);

    // TODO - implement null keyframing to reduce lag if the menu toggle is rapidly triggered
    const variants = {
        open: { 
            opacity: 1, 
            x: 0, 
            transition: {
                type: "spring",
                duration: 0.8
            }
        },
        closed: { 
            opacity: 1,
            x: -1500,
            transition: {
                type: 'spring',
                duration: 1.2
            }
        },
    }

    function handleToggle() {
        setIsOpen(!isOpen)
    }

    // TODO - once other pages are present, add an animated background to indicate current page in Navbar.
    return (
        <motion.nav className='flex flex-row gap-1 fixed inset-x-0 justify-start top-12 flex-wrap-reverse px-0'>
            <NavToggle toggleHandler={handleToggle}/>
            <motion.nav
                animate={isOpen ? "open" : "closed"}
                initial={{x: -1500}}
                variants={variants}
                className='flex flex-row justify-self-center z-9 w-[95vw] max-w-[650px] mx-auto min-[718px]:ml-0 justify-between last:justify-self-end items-center py-2 px-6 inset-x-0 drop-shadow-xl bg-standard-300 dark:bg-standard-700 rounded-full'
            >
                <Logo />
                <NavLink href='/'>Home</NavLink>
                <NavLink href='/about'>About</NavLink>
                <NavLink href='/contact'>Contact</NavLink>
                <DarkModeBtn />
            </motion.nav>
        </motion.nav>
    )
}

export default function NavBar() {
        return <FramerNav />
}
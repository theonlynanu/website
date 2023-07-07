'use client'
import { motion } from 'framer-motion'
import { ReactNode } from '@mdx-js/react/lib'
import { useEffect, useState } from 'react' 
import DarkModeBtn from './DarkModeBtn'


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

    const variants = {
        open: { opacity: 1, x: 0 },
        closed: { opacity: 1, x: -2000 },
    }

    return (
        <div className='flex flex-row gap-1'>
        <button className="fixed w-16 h-16 top-12 z-10 bg-standard-primary dark:bg-standard-darkprimary rounded-full border-2 border-standard-800 dark:border-standard-200 drop-shadow-xl" 
            onClick={() => setIsOpen(isOpen => !isOpen)}
        >
            X
        </button>
        <motion.nav
            animate={isOpen ? "open" : "closed"}
            initial={{x: -2000}}
            variants={variants}
            className='fixed flex flex-row top-12 z-9 w-[95vw] max-w-[650px] justify-between last:justify-self-end items-center py-2 px-6 inset-x-0 mx-auto drop-shadow-xl bg-standard-300 dark:bg-standard-700 rounded-full'
        >
            <Logo />
            <NavLink href='/'>Home</NavLink>
            <NavLink href='/about'>About</NavLink>
            <NavLink href='/contact'>Contact</NavLink>
            <DarkModeBtn />
        </motion.nav>
        </div>
    )
}

export default function NavBar() {
        return <FramerNav />
}
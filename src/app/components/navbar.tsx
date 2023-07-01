'use client'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { clsx } from 'clsx'
import { ReactNode } from '@mdx-js/react/lib'
import { useState } from 'react' 
import DarkModeBtn from './DarkModeBtn'

function Logo() {
    return (
        <div className='flex w-fit items-center justify-center gap-2'>
            <h1>Danyal Ahmed</h1>
        </div>
    )
}

function NavLink({href, children}: {href:string, children: ReactNode}) {
    return (
        <a className='hover:bg-slate-200 dark:hover:bg-slate-900 rounded-full p-2' href={href}>{children}</a>
    )
}

function NavLinks({inverted}: {inverted: boolean}) {
    return (
        <motion.div
            className={clsx(
                'flex items-center gap-8 px-8 text-xl transition-all',
                inverted ? 'text-primary' : 'text-black dark:text-white'
            )}>
            <NavLink href='/'>Home</NavLink>
            <NavLink href='/about'>About</NavLink>
            <NavLink href='/contact'>Contact</NavLink>
            <DarkModeBtn />
        </motion.div>
    )
}

export default function NavBar() {
    const {scrollYProgress} = useScroll();
    const [atPageStart, setAtPageStart] = useState(true);
    const [scrollingUp, setScrollingUp] = useState(true);

    useMotionValueEvent(scrollYProgress, 'change', (v) => {
        setAtPageStart(v < 0.001);
        setScrollingUp(v < 0.15 || v == 1);
        if (scrollYProgress.getVelocity() < 0) {
            setScrollingUp(true);
        }
    });

    return (
        <motion.nav
            className={clsx('fixed top-0 z-10 flex h-20 w-11/12 items-center  justify-between px-8 font-title text-3xl lg:px-24 lg:text-2xl rounded-full',
            atPageStart ? "bg-transparent border-none" : "bg-inherit dark:bg-inherit border",
            scrollingUp ? "visible" : "hidden"
            )}
            animate={[
                atPageStart ? 'solid' : 'transparent',
                scrollingUp ? 'show' : "hidden",
            ]}
            layout>
            <Logo/>
            <NavLinks inverted={!atPageStart}/>
        </motion.nav>
    )
}
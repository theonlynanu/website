'use client'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { clsx } from 'clsx'
import { ReactNode } from '@mdx-js/react/lib'
import { useEffect, useState } from 'react' 
import DarkModeBtn from './DarkModeBtn'
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/20/solid'


function Logo() {
    return (
        <div className='flex w-fit items-center justify-center gap-2'>
            <h1 className="text-4xl">Danyal Ahmed</h1>
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

function NavBarDesktop() {
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
            className={clsx('fixed top-0 z-10 flex w-full h-20 navbar-class items-center justify-between px-8 font-title text-3xl lg:px-24 lg:text-2xl',
            atPageStart ? "bg-transparent border-none" : "bg-inherit dark:bg-inherit border-b-2 border-black dark:border-white",
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

function NavBarMobile() {
    const [open, setOpen] = useState(false);
    const toggleOpen = () => setOpen((o) => !o);

    return (
        <motion.nav className="fixed top-0 z-10 flex w-full flex-col items-center justify-start font-title text-3xl">
            <div className="flex h-20 w-full items-center justify-between bg-white px-8 shadow">
                <Logo />
                <button onClick={toggleOpen}>
                    {open ? <ChevronUpIcon className='h-12'/> : <ChevronDownIcon className='h-12'/>}
                </button>
            </div>

                {open && (
                    <motion.div>
                        <NavLinks inverted={false}/>
                    </motion.div>
                )}
        </motion.nav>
    )

}

export default function NavBar() {
    const [width, setWidth] = useState<number>(window.innerWidth);
    const handleWindowSizeChange = () => {
        setWidth(window.innerWidth);
    }

    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange)
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);

    const isMobile = width <= 768;

    if (isMobile) {
        return <NavBarMobile />
    }
    return <NavBarDesktop />
}
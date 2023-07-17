"use client"
import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { motion } from 'framer-motion'
import { clsx } from 'clsx'

const DarkModeBtn = () => {
    const [mounted, setMounted] = useState(false);
    const { systemTheme, theme, setTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, [])

    if (!mounted) {
        return null;
    }
    
    const currentTheme = theme === "system" ? systemTheme: theme;
    const isThemeLight = currentTheme == "light";
    const toggleSwitch = () => {
        isThemeLight ? setTheme('dark') : setTheme('light')
    }

    const switchVariants:any = {
        rest: {
            scale: 1,
            x: 1,
        },
        hover: {
            scale:[null, 1.1],
            transition: {duration: .3}
        },
        tap: {
            scale: 0.8,
            transition: {duration: 0.4}
        }
    }

    return (
        <motion.div className={clsx("w-16 h-10 flex rounded-full p-2 cursor-pointer",
            !isThemeLight ? "justify-end bg-standard-400": "justify-start bg-standard-200")} 
            onClick={toggleSwitch}
            whileHover="hover"
            whileTap="tap"
            animate='rest'
        >
            <motion.div className={
                clsx("w-6 h-6 rounded-full", 
                isThemeLight ? "bg-standard-900" : "bg-standard-100")} 
                layout 
                transition={spring} 
                variants={switchVariants}
            />
        </motion.div>

    )
}

const spring = {
    type: "spring",
    stiffness: 700,
    damping: 30,
}

export default DarkModeBtn
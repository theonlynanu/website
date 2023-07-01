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

    return (
        <div>
            <div className={clsx("w-16 h-10 flex rounded-full p-2 cursor-pointer", !isThemeLight ? "justify-end bg-slate-500": "justify-start bg-slate-200")} onClick={toggleSwitch}>
                <motion.div className={clsx("w-6 h-6 rounded-full", isThemeLight ? "bg-slate-800" : "bg-white")} layout transition={spring}/>
            </div>
        </div>
    )
}

const spring = {
    type: "spring",
    stiffness: 700,
    damping: 30,
}

export default DarkModeBtn
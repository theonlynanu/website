import { motion, useCycle } from "framer-motion"

// TODO - Better handle props typing for additional reactive animation
const HamLine = (props: any) => (
    <motion.path 
        fill='transparent'
        stroke='#000'
        strokeWidth='4'
        strokeLinecap='round'
        {...props}
    />
)


export default function NavToggle({toggleHandler}:{toggleHandler():void}) {
const [isOpen, toggleOpen] = useCycle(true, false)

    return (
        <motion.div className="flex items-center shrink-0 w-16 h-16 z-10 bg-standard-primary dark:bg-standard-darkprimary rounded-full drop-shadow-lg cursor-pointer" 
        onClick={toggleHandler}  
        whileTap={{scale: 0.9, transition:{duration: 0.2}}}
        whileHover={{scale: [null, 1.05], transition:{duration:0.2}}}      
    >
        <motion.svg
            width='80'
            height='65'
            onClick={() => toggleOpen()}
            viewBox='0 0 80 65'
                initial='closed'
                animate = {isOpen ? 'open' : 'closed'}
            >
            <HamLine 
                variants={{
                    closed: {
                        opacity: 1,
                        d: 'M28 22 L52 22'},
                    open: {
                        opacity: 1,
                        d: 'M33 40 L47 25',
                        strokeWidth: 3,
                    }
                }}
                transition={{duration: 0.5}}
            />
            <HamLine 
                variants={{
                    closed: {
                        opacity: 1,
                        d: 'M28 32 L52 32'
                    },
                    open: {opacity: 0}
                }}
                />
            <HamLine 
                variants={{
                    closed: {
                        opacity: 1,
                        d: 'M28 42 L52 42'
                    },
                    open: {
                        opacity: 1,
                        d: 'M33 25 L47 40',
                        strokeWidth: 3
                    }
                }}
                tranistion={{duration: 0.5}}
            />
        </motion.svg>

    </motion.div>
    )
}


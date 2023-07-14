'use client'
import { motion } from 'framer-motion'
// TODO - externalize components so that this page need not be a client component

export default function Index() {

  return (
    <div>
      {
        // TODO - Framer Motion components will need to be externalized
      }
      <motion.img className='h-24 w-24' src='/profile.png' initial={{y:200}}whileInView={{y: 0}}/>
    </div>
  )
}

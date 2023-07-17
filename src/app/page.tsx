'use client'
import Link from 'next/link'
// TODO - externalize components so that this page need not be a client component

export default function Index() {

  return (
    <div>
      {
        // TODO - Framer Motion components will need to be externalized
      }
      <div>This site is under construction, feel free to check out the preview branch of this project on my Github!</div>
      <br />
      <Link href='/tictactoe' className='rounded-full bg-standard-primary dark:bg-standard-darkprimary py-2 px-4 my-6 text-standard-900 hover:border-2 hover:border-standard-900 dark:hover:border-standard-100'>
          Check out the tictactoe demo here! 
      </Link>
      {/* <motion.img className='h-24 w-24' src='/profile.png' initial={{y:200}}whileInView={{y: 0}}/> */}
    </div>
  )
}

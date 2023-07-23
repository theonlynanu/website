import Link from 'next/link'
import PopIn from './utils/popIn'

export default function Index() {

  return (
    <div>
      {
        // TODO - Framer Motion components will need to be externalized
      }
      <div>This site is under construction, feel free to check out the preview branch of this project on my Github!</div>
      <br />
      <PopIn>
      <Link 
        href='/tictactoe' 
        className='rounded-full bg-standard-primary dark:bg-standard-darkprimary py-2 px-4 my-6 text-standard-900 hover:border-2 hover:border-standard-900 dark:hover:border-standard-100 drop-shadow-lg'
      >
          Check out the tictactoe demo here! 
      </Link>
      </PopIn>
      {
        // TODO - Add link to palette page
      }
      {/* <motion.img className='h-24 w-24' src='/profile.png' initial={{y:200}}whileInView={{y: 0}}/> */}
    </div>
  )
}

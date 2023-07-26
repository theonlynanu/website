import Link from "next/link";
import PopIn from "./_utils/popIn";

export default function Index() {
  return (
    <div>
      {
        // TODO - Framer Motion components will need to be externalized
      }
      <div>
        This site is under construction, feel free to check out the preview
        branch of this project on my Github!
      </div>
      <br />
      <PopIn>
        <Link
          href="/tictactoe"
          className="my-6 rounded-full bg-standard-primary px-4 py-2 text-standard-900 drop-shadow-lg hover:border-2 hover:border-standard-900 dark:bg-standard-darkprimary dark:hover:border-standard-100"
        >
          Check out the tictactoe demo here!
        </Link>
      </PopIn>
      {
        // TODO - Add link to palette page
      }
      {/* <motion.img className='h-24 w-24' src='/profile.png' initial={{y:200}}whileInView={{y: 0}}/> */}
    </div>
  );
}

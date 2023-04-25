import Image from 'next/image'
import Link from 'next/link'
import { useSession } from 'next-auth/react'

function Hero() {
  const { data: session, status } = useSession()
  return (
    <>
      <div className="hero min-h-screen" id="home">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <Image
            src="/img/trackv2.png"
            alt="track"
            width={380}
            height={380}
            className="max-w-sm"
          />
          <div className="text-center md:text-left font-mono  text-custom-green ml-5">
            <h1 className="py-2 text-4xl md:text-6xl font-bold ">
              Welcome to Plan-It, Manage & Create Tasks Together.
            </h1>
            <p className="py-12 text-md md:text-2xl">
              Add tasks, deadlines and collaborate with your colleagues. Lets
              get oraganized together.
            </p>
            <button className="btn bg-custom-green max-w-md">
              <Link href={session ? `/u/${session.user.uid}` : '/login'}>
                {' '}
                Get Started{' '}
              </Link>{' '}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

// export default function Home({ sess }) {
//   const { data: session, status } = useSession()
//   console.log(sess);
//   console.log(session);
//   return (
//     <>
//       <div className="flex justify-center h-screen">
//         <h1 className="my-auto font-semibold">Agenda Builder</h1>
//         {session ? <button onClick={()=>signOut()} className="my-auto font-semibold text-primary"> &nbsp;Sign Out</button> : <Link href="/login" className="my-auto font-semibold text-primary">&nbsp;Login</Link>}

//         {/* <button className="btn btn-primary">Button</button> */}
//       </div>
//     </>
//   )
// }

export default Hero

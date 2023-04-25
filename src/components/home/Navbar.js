import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { HiMenu } from 'react-icons/hi'
import { IoClose } from 'react-icons/io5'
import { useSession, getSession, signOut } from 'next-auth/react'
function Navbar() {
  const { data: session, status } = useSession()
  console.log(session)

  const [navbar, setNavbar] = useState(false)
  return (
    <>
      <nav className="w-full fixed top-0 left-0 z-10 glass opacity-90 shadow-lg">
        <div className="justify-between  mx-4 lg:max-w-7xl md:items-center md:flex md:px-8">
          <div>
            <div className="items-center py-3 left-0 md:inline-block">
              <Link href="/">
                <Image
                  src="/svg/Planit.png"
                  width={200}
                  height={200}
                  alt="logo"

                />

              </Link>

              <div className="md:hidden">
                <button
                  className="text-gray-700 right-8 absolute top-4" //rounded-md outline-none focus:border-gray-400 focus:border
                  onClick={() => setNavbar(!navbar)}
                >
                  {navbar ? (
                    <IoClose className=" text-primary  w-6 h-6 ml-[480px]" />
                  ) : (
                    <HiMenu className="text-primary w-6 h-6 ml-[480px]" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <div>
            <div
              className={`flex-1  md:block   ${navbar ? 'md:p-0 block' : 'hidden'
                }`}
            >
              <ul className="h-screen md:h-auto items-center justify-center md:flex font-mono mt-20 md:mt-0">
                <li className="text-xl text-neutral py-2 px-6 text-center  border-b-2  md:border-b-0   border-primary  md:hover:text-custom-green md:hover:underline md:absolute right-[23rem]">
                  <Link href="#home" onClick={() => setNavbar(!navbar)}>
                    Home
                  </Link>
                </li>
                <li className="text-xl text-neutral py-2 text-primary-6 text-center  border-b-2 md:border-b-0  border-primary  md:hover:text-custom-green md:hover:underline md:absolute right-52">
                  <Link href="#footer" onClick={() => setNavbar(!navbar)}>
                    About
                  </Link>
                </li>
                <li className="text-xl text-neutral py-2 px-6 text-center  border-b-2 md:border-b-0  border-primary  md:hover:text-custom-green md:hover:underline md:absolute right-64">
                  <Link href="#footer" onClick={() => setNavbar(!navbar)}>
                    Contacts
                  </Link>
                </li>
                <li className="text-xl text-neutral py-2 px-6 text-center md:absolute right-5">
                  {!session ? (
                    <button className="btn-active w-32 h-12 rounded-md text bg-transparent md:bg-neutral md:text-custom-gray md:hover:bg-custom-green">
                      <Link href="/signup"> Sign Up </Link>
                    </button>
                  ) : (
                    <button
                      className="btn-active w-32 h-12 rounded-md text bg-transparent md:bg-neutral md:text-custom-gray md:hover:bg-custom-green "
                      onClick={() => signOut()}
                    >
                      Sign Out
                    </button>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

const Title = () => <h5 className="text-custom-green">Plan-it!</h5>;

export default Navbar

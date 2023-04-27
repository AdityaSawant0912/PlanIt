import {
  FaSearch,
  FaHashtag,
  FaRegBell,
  FaUserCircle,
  FaMoon,
  FaSun,
} from 'react-icons/fa';
import {
  AiFillCaretLeft,
  AiFillCaretRight
} from 'react-icons/ai';

import Link from 'next/link'
import styles from '@/styles/SideBar.module.css'
// import useDarkMode from '../hooks/useDarkMode';
import { useSession } from "next-auth/react"
import Image from 'next/image';
const TopNavigation = ({ nextWeek, prevWeek }) => {

  let userImage
  const { data: session, status } = useSession()
  if (session) {
    userImage = session.user.image;
  }
  return (
    <div className='top-navigation min-w-full'>

      <div className='flex min-w-fit ml-24'>
        <span onClick={prevWeek} className='m-[0.35rem] mx-2 cursor-pointer'>
          <AiFillCaretLeft className='' />
        </span>
        <Link href={`?$=${new Date().getMonth() + 1}/${new Date().toLocaleString("en-US", { day: '2-digit' })}/${new Date().getFullYear()}`} className='title-text'>
          <h5>
            {new Date().toLocaleString("en-US", { month: "long" })}, {new Date().toLocaleString("en-US", { day: '2-digit' })}
          </h5>

        </Link>
        <span onClick={nextWeek} className='m-[0.35rem] mx-2 cursor-pointer'>
          <AiFillCaretRight />
        </span>

      </div>
      {/* </div> */}
      {/* <div className='@apply flex justify-items-end'> */}
      <div className='flex min-w-fit items-center mr-7'>
        <BellIcon />
        <Search />
        {(session) ? <img src={userImage} alt="User Image" height='40' width='40' className='rounded-3xl ml-auto mr-4;' /> : <UserCircle />}
      </div>
      {/* </div> */}
    </div>
  );
};

// const ThemeIcon = () => {
//   // const [darkTheme, setDarkTheme] = useDarkMode();
//   // let darkTheme = false;
//   const handleMode = () => setDarkTheme(!darkTheme);
//   return (
//     <span onClick={handleMode}>
//       {/* {darkTheme ? (
//         <FaSun size='24' className='top-navigation-icon' />
//       ) : (
//         <FaMoon size='24' className='top-navigation-icon' />
//       )} */}
//     </span>
//   );
// };

const SideBarLogo = ({ icon, text = 'Plan-it ' }) => (
  <div className="sidebar-logo group">
    {icon}
  </div>
);

const Search = () => (
  <div className='search'>
    <input className='search-input' type='text' placeholder='Search...' />
    <FaSearch size='18' className='text-secondary my-auto' />
  </div>
);
const BellIcon = () => <FaRegBell size='24' className='top-navigation-icon' />;
const UserCircle = () => <FaUserCircle size='24' />;
// const HashtagIcon = () => <FaHashtag size='20' className='title-hashtag' />;


export default TopNavigation;
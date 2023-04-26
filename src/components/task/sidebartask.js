import { BsPlus } from 'react-icons/bs';
import { IoMdCheckmark } from 'react-icons/io';
import { FiSettings } from 'react-icons/fi';
import Image from 'next/image'
import Link from 'next/link'
import styles from '@/styles/SideBar.module.css'
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import AddTask from './AddTask';
import DoneTask from './DoneTasks';
import NotDoneTask from './NotDoneTasks';
import { MdOutlinePendingActions } from 'react-icons/md'



const SideBar = ({ refresh }) => {
  const taskAdded = () => toast.success("Task Added")
  const [addTaskVisible, setAddTaskVisible] = useState(false);
  const [doneTaskVisible, setDoneTaskVisible] = useState(false);
  const [notdoneTaskVisible, setNotDoneTaskVisible] = useState(false);
  return (
    <div>
      <Toaster />
      <div className="fixed top-0 left-0 h-screen w-16 flex flex-col flex-start
                  bg-custom-cream shadow-lg">

        <Link href="/"><SideBarLogo icon={<Image src="/svg/Planit2.svg" alt='Add' width={90} height={72} />} /></Link>
        <Divider />
        <button onClick={() => { setAddTaskVisible(true) }}><SideBarIcon icon={<BsPlus size="32" />} text={"Add"} /></button>
        <AddTask modalIsOpen={addTaskVisible} toggleModal={() => { setAddTaskVisible(false) }} taskadded={() => { taskAdded(); refresh() } } ></AddTask>
        <button onClick={() => { setDoneTaskVisible(true) }}><SideBarIcon icon={<IoMdCheckmark size="32" />} text={"Done"} /></button>
        <DoneTask modalIsOpen={doneTaskVisible} toggleModal={() => { setDoneTaskVisible(false) }} ></DoneTask>
        <button onClick={() => { setNotDoneTaskVisible(true) }}><SideBarIcon icon={<MdOutlinePendingActions size="24" />} text={"Pending"} /></button>
        <NotDoneTask modalIsOpen={notdoneTaskVisible} toggleModal={() => { setNotDoneTaskVisible(false) }} ></NotDoneTask>
        <Divider />
      </div>
      <div className="fixed left-0 bottom-0 pb-3 flex flex-col w-16 shadow-lg">
        <Divider />
        <SideBarIcon icon={<FiSettings size="22" />} text={"Settings"} />
      </div>
    </div >
  );
};


const SideBarIcon = ({ icon, text }) => (
  <div className={["group", styles.sidebaricon].join(" ")}>
    {icon}
    <span className={["group-hover:scale-100", styles.sidebartooltip].join(" ")}>
      {text}
    </span>
  </div>
);

const SideBarLogo = ({ icon, text = 'Plan-it ' }) => (
  <div className="sidebar-logo group">
    {icon}
    <span className={["group-hover:scale-100", styles.sidebartooltip].join(" ")}>
      {text}
    </span>
  </div>
);

const Divider = () => <hr className={styles.sidebarhr} />;

export default SideBar;
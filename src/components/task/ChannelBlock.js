import { useState, useEffect } from 'react';
import { FiCheckSquare } from 'react-icons/fi';
import { IoMdCheckmark } from 'react-icons/io';
import { MdDelete } from 'react-icons/md'
import { FaChevronDown, FaChevronRight, FaPlus } from 'react-icons/fa';
import AddTask from './AddTask';
import ViewTask from './ViewTask';
import { useSession } from "next-auth/react"
import toast, { Toaster } from 'react-hot-toast';
import Link from 'next/link'
import useSWR from 'swr'
import styles from "@/styles/SideBar.module.css";
import { GoPrimitiveDot } from 'react-icons/go'
const fetcher = (...args) => fetch(...args).then((res) => res.json())


const taskAdded = () => toast.success("Task Added")
const taskCompleted = () => toast.success("Task Completed")
const taskDeleted = () => toast.success("Task Deleted")

const ChannelBar = (props) => {
  const { data: session, status } = useSession()
  const [Tasks, setTasks] = useState(null);
  // setTasks(props.task)
  let date = new Date(props.date);
  if (props.inc != 0) {
    date.setDate(date.getDate() + props.inc)
  }


  const month = date.toLocaleString("en-US", { month: "long" })
  const day = date.toLocaleString("en-US", { day: "2-digit" })
  const dayFull = date.toLocaleDateString('en-US', { weekday: 'long' });
  let today = [];
  props.task?.forEach(task => {
    let taskDate = new Date(task?.Start)
    if (date.getDate() == taskDate.getDate()) {
      today.push(task)
    }
  });

  today.sort((a, b) => a.Duration - b.Duration)
  today.sort((a, b) => b.Priority - a.Priority)
  today.sort((a, b) => Number(a.Completed) - Number(b.Completed))

  let todaySet = new Set(today)
  today = Array.from(todaySet)
  // console.log(today);

  return (
    <div className='channel-bar m-0 border-r-2 mt-16'>
      <Dropdown header={month + ', ' + day} tasks={today} date={date} dayFull={dayFull } />
    </div>
  );
};

const Dropdown = ({ header, tasks, date, dayFull }) => {
  const [expanded, setExpanded] = useState(true);
  const [addTaskVisible, setAddTaskVisible] = useState(false);
  const [CObjectId, setCObjectId] = useState(null);
  const [DObjectId, setDObjectId] = useState(null);
  const [PObjectId, setPObjectId] = useState(null);
  const [viewTaskVisible, setViewTaskVisible] = useState(false);

  const TopicSelection = ({ task }) => (

    <div className='dropdown-selection'>
      <button onClick={() => { setViewTaskVisible(true) }}>
        <FaChevronRight size='18' className='text-gray-400 mr-2' />
        <h5 className='dropdown-selection-text'>{task.Title}</h5>
      </button>
      <ViewTask modalIsOpen={viewTaskVisible} toggleModal={() => { setViewTaskVisible(false) }} task={task} />
    </div>

  );
  const { cdata, cerror } = useSWR(CObjectId ? `http://localhost:3000/api/task/complete?ObjectId=${CObjectId}` : null, fetcher)
  if (cdata) {
    setCObjectId(null)
    taskCompleted
  } else if (cerror) {
    console.log(cerror);
  }
  const { ddata, derror } = useSWR(DObjectId ? `http://localhost:3000/api/task/delete?ObjectId=${DObjectId}` : null, fetcher)
  if (ddata) {
    setDObjectId(null)
    taskDeleted
  } else if (derror) {
    console.log(derror);
  }
  const { pdata, perror } = useSWR(PObjectId ? `http://localhost:3000/api/task/priority?ObjectId=${PObjectId[0]}&Priority=${PObjectId[1]}` : null, fetcher)
  if (pdata) {
    setPObjectId(null)
    toast.success("Task Priority Updated")
  } else if (perror) {
    console.log(perror);
  }

  return (
    <div className='dropdown mt-2 flex flex-col'>
      <Toaster />
      <div className='flex'>
        <div className='dropdown-header'>
          {/* <ChevronIcon expanded={expanded} /> */}
          <Link href={`?$=${date.getMonth() + 1}/${date.toLocaleString("en-US", { day: '2-digit' })}/${date.getFullYear()}`}>
            <h5
              className={expanded ? 'dropdown-header-text-selected' : 'dropdown-header-text'}
            >
              {header}
              <br />
              { dayFull }
            </h5>
          </Link>
          <button onClick={() => { setAddTaskVisible(true) }}><FaPlus size='16' className='text-accent text-opacity-80 my-auto ml-40 mr-2' /></button>
          <AddTask modalIsOpen={addTaskVisible} toggleModal={() => { setAddTaskVisible(false) }} date={date} taskadded={taskAdded} ></AddTask>
        </div>
        <Divider />
      </div>
      <div>
        <Divider />
      </div>
      {
        expanded &&
        tasks &&
        // tasks.map((task, i) => <TopicSelection key={i} task={task} />)}
        tasks.map((task, i) => (

          <div key={i} className='dropdown-selection justify-between' >
            <div className='flex'>
              <GoPrimitiveDot size='22' className='mr-2 -ml-2' fill={task.Priority == 0 ? "#7ED957" : (task.Priority == 1 ? "grey" : task.Priority == 2 ? "#FFDE59" : (task.Priority == 3 ? "#FF5757" : "blue"))} />
              {/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill={task.Priority == 0 ? "#7ED957" : (task.Priority == 1 ? "grey" : task.Priority == 2 ? "#FFDE59" : (task.Priority == 3 ? "#FF5757" : "blue"))} class="bi bi-flag-fill" viewBox="0 0 16 16">
                <path d="M14.778.085A.5.5 0 0 1 15 .5V8a.5.5 0 0 1-.314.464L14.5 8l.186.464-.003.001-.006.003-.023.009a12.435 12.435 0 0 1-.397.15c-.264.095-.631.223-1.047.35-.816.252-1.879.523-2.71.523-.847 0-1.548-.28-2.158-.525l-.028-.01C7.68 8.71 7.14 8.5 6.5 8.5c-.7 0-1.638.23-2.437.477A19.626 19.626 0 0 0 3 9.342V15.5a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 1 0v.282c.226-.079.496-.17.79-.26C4.606.272 5.67 0 6.5 0c.84 0 1.524.277 2.121.519l.043.018C9.286.788 9.828 1 10.5 1c.7 0 1.638-.23 2.437-.477a19.587 19.587 0 0 0 1.349-.476l.019-.007.004-.002h.001" />
              </svg> */}
              {task.Completed == true ? <strike><h5 className='dropdown-selection-text ml-2'>{task.Title}</h5></strike> : <h5 className='dropdown-selection-text ml-2'>{task.Title}</h5>}
            </div>
            <div className='flex  items-center justify-evenly '>

              <h5 className='dropdown-selection-text mr-4'>{task.Duration} m</h5>
              {/* <input type="number" value={task.Priority} onChange={(e) => { console.log("heya, " + e.target.value); setPObjectId([task._id, e.target.value]) }} min="0" max="3" ></input> */}
              <select className='dropdown-selection-text' name="priority" id="priority" value={task.Priority} disabled={task.Completed} onChange={(e) => { console.log("heya, " + e.target.value); setPObjectId([task._id, e.target.value]) }} >
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
              <button onClick={() => { setCObjectId(task._id) }}><Icon icon={<IoMdCheckmark size="20" />} disabled={task.Completed} /></button>
              {/* <h5 className='dropdown-selection-text'>{task.Description}</h5> */}
              <button onClick={() => { setDObjectId(task._id) }}><Icon icon={<MdDelete size="20" />} /></button>
            </div>
          </div>
        ))
      }
    </div >
  );
};

const ChevronIcon = ({ expanded }) => {
  const chevClass = 'text-accent text-opacity-80 my-auto mr-4';
  return expanded ? (
    <FaChevronDown size='14' className={chevClass} />
  ) : (
    <FaChevronRight size='14' className={chevClass} />
  );
};
const Icon = ({ icon }) => (
  <div className={["group", styles.icon].join(" ")}>
    {icon}
  </div>
);
const CurDate = () => (

  <div className='channel-block'>
    <h5 className='channel-block-text'>{new Date().toLocaleString("en-US", { month: "long" })}, {new Date().toLocaleString("en-US", { day: '2-digit' })}</h5>
  </div>
);
const Divider = () => <hr className="content-hr" />;
export default ChannelBar;
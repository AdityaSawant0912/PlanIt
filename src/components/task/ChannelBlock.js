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
      <Dropdown header={month + ', ' + day} tasks={today} date={date} dayFull={dayFull} />
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
              {dayFull}
            </h5>
          </Link>
          <button onClick={() => { setAddTaskVisible(true) }}><FaPlus size='16' className='text-accent text-opacity-80 ml-20' /></button>
          <AddTask modalIsOpen={addTaskVisible} toggleModal={() => { setAddTaskVisible(false) }} date={date} taskadded={taskAdded} ></AddTask>
        </div>
      </div>
      <Divider />
      {
        expanded &&
        tasks &&
        // tasks.map((task, i) => <TopicSelection key={i} task={task} />)}
        tasks.map((task, i) => (

          <div key={i} className='dropdown-selection task-outline' >

            <div className='flex w-full justify-center items-center pr-3'>  {/* heading */}
              <GoPrimitiveDot size='22' className='-ml-2' fill={task.Priority == 0 ? "#7ED957" : (task.Priority == 1 ? "grey" : task.Priority == 2 ? "#FFDE59" : (task.Priority == 3 ? "#FF5757" : "blue"))} />
              {task.Completed == true ? <strike><h5 className='dropdown-selection-text ml-2'>{task.Title}</h5></strike> : <h5 className='dropdown-selection-text ml-2'>{task.Title}</h5>}
              <h5 className='dropdown-selection-text ml-3'>{task.Duration} m</h5>
            </div>

            <div className='flex'>
              <div className='flex items-center justify-evenly '>
                <select className='dropdown-selection-text' name="priority" id="priority" value={task.Priority} disabled={task.Completed} onChange={(e) => { console.log("heya, " + e.target.value); setPObjectId([task._id, e.target.value]) }} >
                  <option value="0">0</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
              </div>
              <div className='flex'>
                <button onClick={() => { setCObjectId(task._id) }}><Icon icon={<IoMdCheckmark size="20" />} disabled={task.Completed} />
                </button>
                {/* <h5 className='dropdown-selection-text'>{task.Description}</h5> */}
                <button onClick={() => { setDObjectId(task._id) }}><Icon icon={<MdDelete size="20" />} /></button>
              </div>
            </div>



          </div>
        ))
      }
    </div >
  );
};

const ChevronIcon = ({ expanded }) => {
  const chevClass = 'text-accent text-opacity-80 mr-4';
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
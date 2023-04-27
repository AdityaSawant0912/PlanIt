import React from 'react'
import Modal from 'react-modal'
import { useSession } from "next-auth/react"
import { useState } from 'react'
Modal.setAppElement('#__next')
import styles from '@/styles/Task.module.css'
import { AiOutlineClose } from 'react-icons/ai';
import toast, { Toaster } from 'react-hot-toast';
import useSWR from 'swr'
const fetcher = (...args) => fetch(...args).then((res) => res.json())

const notify = () => { const notify = new Notification("Planned IT!") }

export default function DoneTask(props) {
  const { data: session, loading } = useSession();
  const { data, error } = useSWR(`http://localhost:3000/api/task/completed?email=${session?.user?.uid}`, fetcher, { refreshInterval: 1000 })
  let Tasks = data?.tasks
  console.log("hhe");
  console.log(Tasks);
  let doneTasks = [];
  Tasks?.forEach(task => {
    doneTasks.push(task)
  });

  // let taskDone = Tasks.filter((a) => { if (a.Completed == true) { return (a) } })


  return (
    <>
      <Modal
        isOpen={props.modalIsOpen}
        onRequestClose={props.toggleModal}
        style={{
          overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.7)'
          },
          content: {
            position: 'absolute',
            top: '15%',
            left: '31%',
            right: '31%',
            bottom: '15%',
            border: '2px solid #E0E0E0',
            background: '#fff',
            overflow: 'auto',
            WebkitOverflowScrolling: 'touch',
            // borderRadius: '4px',
            outline: 'none',
            padding: '20px'
          }
        }}
      >
        <div>
          <Toaster />
          <h1 className={styles.head}>
            <div>
              Completed Tasks
            </div>
            <button className={styles.cl} onClick={props.toggleModal}>
              < Icon icon={<AiOutlineClose size="16" />} />
            </button>
          </h1>
          <Divider />
          {doneTasks?.map((task, i) => {
            return (
              <>
                <div className='flex flex-row justify-between'>
                  <h1 className={styles.inp2}> {task?.Title}</h1>
                  <h1 className={styles.inp2}> {task?.Description}</h1>
                </div>
              </>)
          })}


        </div>

      </Modal>

    </>
  )
}

const Icon = ({ icon }) => (
  <div>
    {icon}
  </div>
);

const Divider = () => <hr className={styles.barhr} />;
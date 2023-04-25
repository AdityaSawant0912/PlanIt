import Head from 'next/head'
import { useState, useEffect } from 'react';
import SideBar from '@/components/task/sidebartask'
import ChannelBar from '@/components/task/ChannelBlock'
import styles from '@/styles/Home.module.css'
import ContentContainer from '@/components/task/Content'
import TopNavigation from '@/components/task/TopNavigation'
import InfiniteScroll from "react-infinite-scroll-component";
import { useSession } from "next-auth/react"
import { useRouter } from 'next/router'
import useSWR from 'swr'
const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function Home() {
  const { data: session, status } = useSession()
  const router = useRouter()
  // const [Tasks, setTasks] = useState(null);

  const { data, error } = useSWR(`http://localhost:3000/api/task/get?email=${session?.user?.email}`, fetcher, { refreshInterval: 1000 })
  // const fetchTasks = () => {
  //   fetch(`http://localhost:3000/api/getTasks?email=${session?.user?.email}`)
  //     .then((response) => {
  //       return response.json()
  //     })
  //     .then((data) => (setTasks(data?.tasks)))
  // };
  // fetchTasks()
  let Today = new Date()
  let { $ } = router.query
  if ($) {
    Today = new Date($)
  }
  let Tasks = data?.tasks
  // listen for scroll event and load more images if we reach the bottom of window

  return (
    <div>
      <div className='appview'>
        <TopNavigation />
        <SideBar />
        {/* <ContentContainer /> */}
      </div>
      <div className='flex flex-row ml-20' >
        <div>
          <hr />
          <InfiniteScroll
            dataLength={100}
            next={() => { return (<ChannelBar date={Today} inc={11} />) }}
            hasMore={true}
            loader={<h4>View</h4>} className='flex flex-row'
          >
            <ChannelBar date={Today} inc={0} task={Tasks} />
            <ChannelBar date={Today} inc={1} task={Tasks} />
            <ChannelBar date={Today} inc={2} task={Tasks} />
            <ChannelBar date={Today} inc={3} task={Tasks} />
            <ChannelBar date={Today} inc={4} task={Tasks} />
            <ChannelBar date={Today} inc={5} task={Tasks} />
            <ChannelBar date={Today} inc={6} task={Tasks} />
            <ChannelBar date={Today} inc={7} task={Tasks} />
            <ChannelBar date={Today} inc={8} task={Tasks} />
            <ChannelBar date={Today} inc={9} task={Tasks} />
            <ChannelBar date={Today} inc={10} task={Tasks} />
            <ChannelBar date={Today} inc={11} task={Tasks} />
            <ChannelBar date={Today} inc={12} task={Tasks} />
            <ChannelBar date={Today} inc={13} task={Tasks} />
            <ChannelBar date={Today} inc={14} task={Tasks} />
            <ChannelBar date={Today} inc={15} task={Tasks} />
            <ChannelBar date={Today} inc={16} task={Tasks} />
          </InfiniteScroll>
        </div>

      </div>
      {/* {
        window.addEventListener('scroll', () => {
          console.log("scrolled", window.scrollY) //scrolled from top
          console.log(window.innerHeight) //visible part of screen
          if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight) {
            loadImages();
          }
        })
      } */}
    </div>
  )
}

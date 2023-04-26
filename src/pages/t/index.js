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
  let week = 1
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
            <ChannelBar date={Today} inc={0 + (week * 7)} task={Tasks} />
            <ChannelBar date={Today} inc={1 + (week * 7)} task={Tasks} />
            <ChannelBar date={Today} inc={2 + (week * 7)} task={Tasks} />
            <ChannelBar date={Today} inc={3 + (week * 7)} task={Tasks} />
            <ChannelBar date={Today} inc={4 + (week * 7)} task={Tasks} />
            <ChannelBar date={Today} inc={5 + (week * 7)} task={Tasks} />
            <ChannelBar date={Today} inc={6 + (week * 7)} task={Tasks} />
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

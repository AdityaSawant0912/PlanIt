import SideBar from '@/components/task/sidebartask'
import ChannelBar from '@/components/task/ChannelBlock'
import styles from '@/styles/Home.module.css'
import ContentContainer from '@/components/task/Content'
import TopNavigation from '@/components/task/TopNavigation'
import InfiniteScroll from "react-infinite-scroll-component";
import { useSession, getSession } from "next-auth/react"
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { useState, useEffect } from 'react'
// const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function Home() {
  const { data: session, status } = useSession()
  const router = useRouter()
  // const [Tasks, setTasks] = useState(null);

  // const { data, error } = useSWR(`http://localhost:3000/api/task/get?email=${session?.user?.uid}`, fetcher)
  // const fetchTasks = () => {
  //   fetch(`http://localhost:3000/api/getTasks?email=${session?.user?.email}`)
  //     .then((response) => {
  //       return response.json()
  //     })
  //     .then((data) => (setTasks(data?.tasks)))
  // };
  // fetchTasks()
  const [Tasks, setTasks] = useState([]);
  const [refresh, setRefresh] = useState(true);
  useEffect(() => {
    fetch(`/api/task/get?email=${session?.user?.uid}`)
      .then(res => res.json())
      .then(data => {
        setTasks(data.tasks)
        console.log(data);
        console.log('Updated')
      })
  }, [session?.user?.uid, refresh])
  const [Today, setToday] = useState(new Date());
  const [week, setWeek] = useState(0);
  const [offset, setOffset] = useState(Today.getDay());
  // listen for scroll event and load more images if we reach the bottom of window

  return (
    <>
      <div className='appview'>
        <TopNavigation nextWeek={() => { setWeek(week + 1); console.log(week); }} prevWeek={() => { setWeek(week - 1); }} />
        <SideBar refresh={() => { setRefresh(!refresh) }} />
        {/* <ContentContainer /> */}
      </div>
      <div className='flex flex-row pl-16 -z-50' >
        <div className='flex max-w-full'>
          {
            [...Array(7)].map((day, i) => {
              return <ChannelBar date={Today} inc={i + (week * 7) - offset} task={Tasks} day={i} key={i} refresh={() => { setRefresh(!refresh) }} />
            })

          }
          {/* <ChannelBar date={Today} inc={0 + (week * 7) - offset} task={Tasks} />
            <ChannelBar date={Today} inc={1 + (week * 7) - offset} task={Tasks} />
            <ChannelBar date={Today} inc={2 + (week * 7) - offset} task={Tasks} />
            <ChannelBar date={Today} inc={3 + (week * 7) - offset} task={Tasks} />
            <ChannelBar date={Today} inc={4 + (week * 7) - offset} task={Tasks} />
            <ChannelBar date={Today} inc={5 + (week * 7) - offset} task={Tasks} />
          <ChannelBar date={Today} inc={6 + (week * 7) - offset} task={Tasks} /> */}
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
    </>
  )
}
export async function getServerSideProps(context) {
  const session = await getSession(context)
  if (!session) {
    return {
      redirect: {
        destination: '/login'
      }
    }
  }

  return {
    props: {
      
    }
  }

  return {
    redirect: {
      destination: '/'
    }
  }
}
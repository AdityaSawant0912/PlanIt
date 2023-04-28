import React from 'react'
import { timelines, releases } from '@/lib/projectData'
import { Release } from '@/components/releases/release'
import { Timeline } from '@/components/releases/timeline'

const ReleasesPage = () => {
  const releasesKeys = Object.keys(releases).reverse()
  const timelineKeys = Object.keys(timelines)
  return (
    <>
      <div className="grid grid-flow-col gap-4 justify-around">
        <div className="bg-white rounded-lg shadow max-w-fit sticky left-0 top-0">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-3xl font-medium text-gray-900">Timeline</h2>
            <hr className="mb-12 mt-6 h-0.5 border-t-0 w-full lg:w-1/3  bg-indigo-600 opacity-100 dark:opacity-50" />
            <Timeline timeline={timelines} timelineKeys={timelineKeys} />
          </div>
        </div>
        <div className="">
          <h2 className="text-3xl font-medium text-gray-900 pt-5 sm:pt-6">
            All Releases
          </h2>
          <hr className="mb-8 mt-6 h-0.5 border-t-0 w-full lg:w-1/3 bg-indigo-600 opacity-100 dark:opacity-50" />
          {releasesKeys.map(releaseTitle => (
            <div key={releaseTitle}>
              <Release release={releases[releaseTitle]} />
            </div>
          ))}
        </div>
      </div>

      {/* Fixed left col */}
      {/* <div className='grid grid-flow-col gap-4 justify-center'>
        <div className="fixed max-w-fit">
          <div className="bg-white rounded-lg shadow overflow-hidden w-96">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-3xl font-medium text-gray-900">Timeline</h2>
              <hr className="mb-12 mt-6 h-0.5 border-t-0 w-full lg:w-1/3 bg-indigo-600 opacity-100 dark:opacity-50" />
              <div className="max-h-screen overflow-y-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                <style>
                  {`
              .max-h-screen::-webkit-scrollbar {
                display: none;
              }
            `}
                </style>
                <Timeline timeline={timelines} timelineKeys={timelineKeys} />
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <h2 className="text-3xl font-medium text-gray-900 pt-5 sm:pt-6">All Releases</h2>
          <hr className="mb-8 mt-6 h-0.5 border-t-0 w-full lg:w-1/3 bg-indigo-600 opacity-100 dark:opacity-50" />
          {releasesKeys.map((releaseTitle) => (
            <div key={releaseTitle}>
              <Release release={releases[releaseTitle]} />
            </div>
          ))}
        </div>
      </div> */}
    </>
  )
}

export default ReleasesPage

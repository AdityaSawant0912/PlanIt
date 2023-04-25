import React from 'react'

export const Release = ({ release }) => {
  const { version, date, title, description, features } = release

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden max-w-4xl">
      <div className="px-4 py-5 sm:p-6">
        <h2 className="text-lg font-medium text-gray-900">{title}</h2>
        <div className="mt-4">
          <p className="text-sm font-medium text-gray-500">
            Version {version} ({date})
          </p>
          <p className="mt-2 text-base text-gray-500">{description}</p>
          <div className="mt-6 w-fit">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Features
            </h3>
            <div className="mt-2 grid grid-cols-1 gap-5 lg:grid-cols-2">
              {Object.keys(features).map((category, index) => {
                const s = index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'
                const l = index % 3 === 0 ? 'bg-gray-100' : 'bg-gray-200'
                return (
                  <div
                    key={category}
                    className={`${
                      index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'
                    } ${
                      index % 3 === 0 ? 'lg:bg-gray-100' : 'lg:bg-gray-200'
                    } rounded-lg shadow lg:w-64`}
                  >
                    <div className="px-4 py-5 sm:p-6">
                      <h4 className="text-md font-medium text-gray-900 capitalize">
                        {category}
                      </h4>
                      <ul className="mt-4 space-y-4 ">
                        {features[category].map((feature, index) => (
                          <li key={index} className="flex">
                            <div className="flex-shrink-0">
                              <svg
                                className="h-5 w-5 text-green-400"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <circle cx="10" cy="10" r="10" />
                                <path
                                  d="M5.38 10.553l3.48 3.48 7.905-7.904a.75.75 0 111.06 1.06l-8.655 8.654a1.5 1.5 0 01-2.12 0L2.22 11.08a.75.75 0 111.06-1.06l2.1 2.1z"
                                  fill="#fff"
                                />
                              </svg>
                            </div>
                            <span className="ml-3 text-gray-700">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

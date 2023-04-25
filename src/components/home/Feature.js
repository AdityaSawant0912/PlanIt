import Image from 'next/image'

const Feature = () => {
  return (
    <div className="h-screen bg-white w-full">
      <div className="flex-col text-custom-green font-mono p-16 text-center">
        {/* <h4 className="text-md text-neutral">Agenda Builder 101 </h4> */}
        <h1 className="text-6xl font-extrabold">Organise Your Task</h1>
      </div>
      <div className="flex justify-around flex-wrap">
        <Image
          src="/svg/todo.svg"
          alt="track"
          width={400}
          height={400}
          className="hidden lg:block"
        />
        <div className="text-xl text-custom-green text-left space-x-6 ml-4">
          <h1 className="text-4xl font-semibold mb-6">Features:</h1>
          <li className="mb-4">
            {' '}
            To seamlessly help people involved collaborate and <br /> build an
            agenda.
          </li>
          <li className="mb-4">
            {' '}
            To design an application system that manages the user&apos;s
            <br /> time according to priority of tasks.
          </li>
          <li className="mb-4">
            {' '}
            To improve overall efficiency by organizing the workload
            <br /> in a balanced manner and tracking users habits.
          </li>
          <li className="mb-4">
            {' '}
            To provide links to materials relevant to the scheduled <br />
            tasks and ease the modification using drag and drop method.
          </li>
        </div>
      </div>
    </div>
  )
}

export default Feature

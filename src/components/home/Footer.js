import Image from 'next/image'
import { BsTwitter, BsFacebook, BsYoutube } from 'react-icons/bs'
import { SiGmail } from 'react-icons/si'
import { IoCall } from 'react-icons/io5'

const Footer = () => {
  return (
    <footer className="footer p-10 bg-neutral text-neutral-content" id="footer">
      <div>
        <Image src="/svg/Planit2.svg" width={125} height={50} alt="i1" />
        {/* <p className="text-center">
          Agile Builder Ltd.
          <br />
          Providing reliable tech Solutions
        </p> */}
      </div>

      <div>
        <span className="footer-title text-center lg:text-left">About Us</span>
        <div className="">
          <p>
            {' '}
            Optimising time with efficient allocation  <br />
            and scheduling of tasks. The website can become a <br />
            one-stop platform to schedule tasks, assign a time slot <br />
            to said tasks and prioritise it based on the due date.
            {' '}
          </p>
        </div>
      </div>

      <div>
        <span className="footer-title text-center lg:text-left">Group Members:</span>
        <div className="grid grid-flow-row gap-4">
          {' '}
          Alefiya Rampurawala <br />
          Dhara Shah <br />
          Aditya Sawant <br />
          Snehil Shah
          {' '}
        </div>
      </div>

      <div>
        <span className="footer-title text-center lg:text-left">Contact Us:</span>
        <div className="grid grid-flow-col gap-4">
          {' '}
          alefiya.rampurawala15491@sakec.ac.in<br />
          dhara.shah15875@sakec.ac.in <br />
          aditya.sawant15529@sakec.ac.in <br />
          snehil.shah15485@sakec.ac.in
          {' '}
        </div>
      </div>
    </footer>
  )
}

export default Footer

import styles from '@/styles/Use.module.css'
import Image from 'next/image'

const Use = () => {
  return (
    <div className="h-auto bg-custom-green w-full">
      <div className="flex-col text-gray-200 font-mono pt-10 pb-32  text-center text-6xl font-extrabold">
        <h1>Manage Your Work Smartly</h1>
      </div>

      <div className={styles.row}>
        <section className={styles.workcard_container}>
          <div className={styles.workcard}>
            <div className={styles.imgbox}>
              <img src="img/image1.png" alt="i1" />
            </div>
            <div className={styles.content}>
              <h2>Step I</h2>
              <p>Create A Workspace</p>
            </div>
          </div>
          <div className={styles.workcard}>
            <div className={styles.imgbox}>
              <img src="img/image2.png" alt="i2" />
            </div>
            <div className={styles.content}>
              <h2>Step II</h2>
              <p>Invite Team Members</p>
            </div>
          </div>
          <div className={styles.workcard}>
            <div className={styles.imgbox}>
              <img src="img/image3.png" alt="i3" />
            </div>
            <div className={styles.content}>
              <h2>Step III</h2>
              <p>Collaborate Together</p>
            </div>
          </div>
          <div className={styles.workcard}>
            <div className={styles.imgbox}>
              <img src="img/image4.png" alt="i4" />
            </div>
            <div className={styles.content}>
              <h2>Step IV</h2>
              <p>Finish Tasks Quickly</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Use

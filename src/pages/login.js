import { React, useState } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { RxDotFilled } from 'react-icons/rx'
import Link from 'next/link'
import login_validate from '@/lib/validate'
import { getProviders, signIn, getSession } from 'next-auth/react'
import { useFormik, Field, ErrorMessage, FormikProvider } from 'formik'
import Image from 'next/image'
import Router from 'next/router'
import toast, { Toaster } from 'react-hot-toast'
import { ChakraProvider } from '@chakra-ui/react'

function Login() {
  const router = Router
  const [error, setError] = useState('')
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validate: login_validate,
    onSubmit
  })
  async function onSubmit(values) {
    const status = await signIn('credentials', {
      redirect: false,
      email: values.email,
      password: values.password,
      callbackUrl: '/api/w/get'
    })
    if (status.ok) router.push(status.url)
    if (status.status === 401) setError(status.error)
    if (status.error) toast.error(status.error)
  }

  return (
    <FormikProvider value={formik}>
      <Toaster />
      <div className="mt-20 flex flex-col">
        {/* <div className="flex shrink-0 items-center justify-center mx-52 bg-red-400"> */}
        <div className="max-w-full mx-auto my-6 sm:block">
          <Image
            className=""
            src="svg/Planit1.svg"
            alt="agenda"
            width={200}
            height={100}
          />
        </div>
        {/* </div> */}

        <section className="w-full p-5">
          <div className="mx-auto my-0 shadow-[0px_0px_50px_2px_rgb(0,0,0,0.2)] w-96 max-w-lg  py-[25px] px-[40px] rounded-sm bg-white">
            <h1 className="mt-3 mb-6 font-mono text-base font-semibold tracking-tight text-center text-gray-500">
              Log In
            </h1>
            <div className="">
              <form className="block mt-0 w-50" onSubmit={formik.handleSubmit}>
                <input
                  type="text"
                  placeholder="Enter Email"
                  className="w-full h-10 mt-2 transition-all duration-500 border-2 border-gray-300 rounded-sm input-md bg-gray-50"
                  {...formik.getFieldProps('email')}
                />
                {formik.touched.email && formik.errors.email ? (
                  <span>{formik.errors.email}</span>
                ) : (
                  <></>
                )}
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full h-10 my-2 transition-all duration-500 border-2 border-gray-300 rounded-sm input-md input-bordered bg-gray-50"
                  {...formik.getFieldProps('password')}
                />
                {formik.touched.password && formik.errors.password ? (
                  <span>{formik.errors.password}</span>
                ) : (
                  <></>
                )}
                <button
                  className="w-full h-10 my-2 font-mono font-bold text-gray-100 rounded-md btn-active bg-primary"
                  type="submit"
                >
                  Log In
                </button>
              </form>
              <div className="my-3 text-xs text-center text-gray-500"> OR </div>
              {/* <button className="items-center justify-center w-full h-10 text-center border-2 rounded-sm shadow-lg border-gray-50"
                  onClick={() => {
                    signIn('Google')
                  }}>
                  <FcGoogle className="inline w-5 h-auto mx-2 my-2 " />
                  <div className="inline font-bold text-slate-600">
                    Continue with Google
                  </div>
                </button> */}
              <button
                onClick={() => signIn('google', { callbackUrl: '/' })}
                className="items-center justify-center w-full h-10 text-center border-2 rounded-sm shadow-lg border-gray-50"
              >
                <FcGoogle className="inline w-5 h-auto mx-2 my-2 " />
                <div className="inline font-bold text-slate-600">
                  Continue with Google
                </div>
              </button>
              <div className="h-1 my-6 divider"></div>
              <div className="inline mx-10 text-sm text-gray-400">
                Don&apos;t have an account?{' '}
                <RxDotFilled className="inline text-gray-800" />{' '}
                <Link
                  className="text-blue-400 hover:underline"
                  href={'/signup'}
                >
                  Sign Up!
                </Link>
              </div>
            </div>
          </div>
        </section>
        <div>
          <Image
            src="svg/checklist.svg"
            alt="image1"
            className="scale-y-[-1] scale-x-[-1] absolute  top-[-6.7px]  left-14 hidden md:hidden lg:block -z-10"
            width={400}
            height={500}
          />
          <Image
            src="svg/business.svg"
            alt="image2"
            className="absolute bottom-0 right-0 -z-10 hidden lg:block"
            width={500}
            height={600}
          />
        </div>
        {/* <ErrorAlert message='Task Failed Successfully' /> */}
      </div>
    </FormikProvider>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)
  if (session) {
    return {
      redirect: {
        destination: '/api/w/get',
        permanent: false
      }
    }
  }
  return {
    props: {}
  }
}

export default Login

import { React, useState, useEffect } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { RxDotFilled } from 'react-icons/rx'
import { getProviders, signIn, getSession } from 'next-auth/react'
import Link from 'next/link'
import { useFormik, FormikProvider, Form, Field, ErrorMessage } from 'formik'
import registerValidate from '@/lib/validate'
import Image from 'next/image'
import Router from 'next/router'

function Signup({ providers }) {
  const [error, setError] = useState('')
  const router = Router
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      cpassword: ''
    },
    validate: async values => {
      const errors = {}
      if (!values.email) {
        errors.email = 'Please enter valid email address'
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = 'Invalid email address'
      }

      // validate confirm password
      if (!values.cpassword) {
        errors.cpassword = 'Please confirm your password'
      } else if (values.password !== values.cpassword) {
        errors.cpassword = 'Password Not Match...!'
      } else if (values.cpassword.includes(' ')) {
        errors.cpassword = 'Invalid Confirm Password'
      }

      // validation for password
      if (!values.password) {
        errors.password = 'Please enter your password'
      } else if (values.password.length < 8 || values.password.length > 20) {
        errors.password =
          ' Must be greater then 8 and less then 20 characters long'
      } else if (values.password.includes(' ')) {
        errors.password = 'Invalid Password'
      }

      // validation for designation
      if (!values.name) {
        errors.name = 'Please enter your name'
      } else if (values.name.length < 3 || values.name.length > 20) {
        errors.name = 'Must be greater then 3 and less then 20 characters long'
      }

      return errors
    },

    onSubmit
  })
  async function onSubmit(values) {
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: values.name,
        email: values.email,
        password: values.password
      })
    })
    console.log(res)
    console.log(res)
    if (res.ok) {
      const status = await signIn('credentials', {
        email: values.email,
        password: values.password,
        callbackUrl: '/newuser'
      })

      if (status.status === 201) {
        router.push('/api/w/get')
      } else if (status.status === 409) {
        setError(status.error)
      } else if (status.status === 500) {
        setError(status.error)
      }

      if (status.error) toast.error(status.error)
    }
  }

  return (
    <FormikProvider value={formik}>
      <div className="mt-10 flex flex-col">
        {/* <div className="flex items-center justify-center mx-52 bg-red-400"> */}
        <div className="max-w-full mx-auto my-1 sm:block">
          <Image
            className=""
            src="svg/Planit1.svg"
            alt="agenda"
            width={200}
            height={100}
          />
          {/* </div> */}
        </div>

        <section className="w-full p-5">
          <div className="mx-auto my-0 shadow-[0px_0px_50px_2px_rgb(0,0,0,0.2)] w-96 max-w-lg  py-[25px] px-[40px] rounded-sm bg-white">
            <h1 className="text-center text-base mt-3 mb-4 font-mono font-semibold tracking-tight text-gray-500">
              Sign Up for your account
            </h1>
            <div className="form-control ">
              <form className="block mt-0 w-50" onSubmit={formik.handleSubmit}>
                <div>
                  <input
                    type="text"
                    placeholder="User Name*"
                    className="input-md mt-2 transition-all duration-500 w-full h-10 rounded-sm border-gray-300 border-2 bg-gray-50"
                    {...formik.getFieldProps('name')}
                  />
                  {formik.touched.name && formik.errors.name ? (
                    <div className="error">{formik.errors.name}</div>
                  ) : null}
                </div>
                <input
                  type="text"
                  placeholder="Email*"
                  className="input-md mt-2 transition-all duration-500 w-full h-10 rounded-sm border-gray-300 border-2 bg-gray-50"
                  {...formik.getFieldProps('email')}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="error">{formik.errors.email}</div>
                ) : null}
                <input
                  type="password"
                  placeholder="Password*"
                  className="input-md my-2 transition-all duration-500 input-bordered w-full h-10 rounded-sm  border-gray-300 border-2  bg-gray-50"
                  {...formik.getFieldProps('password')}
                />
                {formik.touched.password && formik.errors.password ? (
                  <div className="error">{formik.errors.password}</div>
                ) : null}
                <input
                  type="password"
                  placeholder=" Confirm Password*"
                  className="input-md my-2 transition-all duration-500 input-bordered w-full h-10 rounded-sm  border-gray-300 border-2  bg-gray-50"
                  {...formik.getFieldProps('cpassword')}
                />
                {formik.touched.cpassword && formik.errors.cpassword ? (
                  <div className="error">{formik.errors.cpassword}</div>
                ) : null}
                <button className="btn-active w-full h-10 rounded-md font-mono my-2 font-bold text-gray-100 bg-primary">
                  Sign Up
                </button>
              </form>
              <div className="text-center text-gray-500 text-xs my-3"> OR </div>
              <button
                onClick={() => signIn('google', { callbackUrl: '/' })}
                className="items-center justify-center w-full h-10 text-center border-2 rounded-sm shadow-lg border-gray-50"
              >
                <FcGoogle className="inline w-5 h-auto mx-2 my-2 " />
                <div className="inline font-bold text-slate-600">
                  Continue with Google
                </div>
              </button>
              <div className="divider my-6 h-1"></div>
              <div className="inline mx-10 text-gray-400 text-sm">
                Already have an account?{' '}
                <RxDotFilled className="inline text-gray-800" />{' '}
                <Link className="text-blue-400 hover:underline" href={'/login'}>
                  Log In
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
      </div>
    </FormikProvider>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)
  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }
  return {
    props: {
      providers: await getProviders(context)
    }
  }
}

export default Signup

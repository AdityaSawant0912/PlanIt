import UnsplashReact, { Base64Uploader, withDefaultProps } from 'unsplash-react'

const MY_ACCESS_KEY = 'Agenda Builder'

const TestSplash = () => {
  return (
    <UnsplashReact
      accessKey={MY_ACCESS_KEY}
      Uploader={withDefaultProps(Base64Uploader, { name: 'event[logo]' })}
    />
  )
}

export default TestSplash

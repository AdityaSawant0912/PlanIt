import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
  DocumentInitialProps
} from 'next/document'
import React from 'react'
import { resetServerContext } from 'react-beautiful-dnd'

class MyDocument extends Document {
  /*
   * fix the clinet/server error using resetServerContext()
   */
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    resetServerContext()
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang="en">
        <Head></Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument

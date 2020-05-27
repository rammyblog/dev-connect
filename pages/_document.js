// / _document is only rendered on the server side and not on the client side
// Event handlers like onClick can't be added to this file
import React from "react"
// ./pages/_document.js
import Document, { Html, Head, Main, NextScript } from "next/document"

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps =
      (Document.getInitialProps ? await Document.getInitialProps(ctx) : null) ||
      {}
    if (initialProps.statusCode && ctx.res) {
      ctx.res.statusCode = initialProps.statusCode
    }
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head>
          {/* <script
            src="https://kit.fontawesome.com/833e0cadb7.js"
            crossOrigin="anonymous"
          ></script>
          <link
            href="https://fonts.googleapis.com/css?family=Raleway"
            rel="stylesheet"
          ></link> */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
export default MyDocument

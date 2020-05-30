// / _document is only rendered on the server side and not on the client side
// Event handlers like onClick can't be added to this file
import React from "react"
// ./pages/_document.js
import Document, { Html, Head, Main, NextScript } from "next/document"

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <script
            src="https://kit.fontawesome.com/833e0cadb7.js"
            crossOrigin="anonymous"
          ></script>
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins"
            rel="stylesheet"
          />
          <meta httpEquiv="content-language" content="en"></meta>
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

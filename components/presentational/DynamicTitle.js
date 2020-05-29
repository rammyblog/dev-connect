import Head from "next/head"

export default function DynamicTitle({ title }) {
  return (
    <Head>
      <title> {title} | Devconnectz</title>
    </Head>
  )
}

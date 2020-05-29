import React from "react"
import EditProfile from "../components/EditProfile"
import DynamicTitle from "../components/presentational/DynamicTitle"

export default function edit_profile() {
  return (
    <>
      <DynamicTitle title="Edit Profile" />
      <EditProfile />
    </>
  )
}

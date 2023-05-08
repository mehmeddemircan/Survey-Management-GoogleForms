import { Descriptions } from 'antd'
import React from 'react'
import { useSelector } from 'react-redux'

const UserProfileDescriptions = () => {

    const getProfile = useSelector((state) => state.user.getProfile)

  return (
    <Descriptions  className="" title="User Info">
    <Descriptions.Item style={{ display: "inline-block" }} label="İsim">
      {getProfile.user.firstname}
    </Descriptions.Item>
    <Descriptions.Item
      style={{ display: "inline-block" }}
      label="Soyisim"
    >
         {getProfile.user.lastname}
    </Descriptions.Item>
    <Descriptions.Item style={{ display: "inline-block" }} label="Email">
  {getProfile.user.email}
    </Descriptions.Item>

    <Descriptions.Item></Descriptions.Item>
  </Descriptions>
  )
}

export default UserProfileDescriptions
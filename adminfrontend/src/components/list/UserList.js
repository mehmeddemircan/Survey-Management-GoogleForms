import { List } from 'antd'
import React, { Fragment } from 'react'

import UserItem from '../listItem.js/UserItem'
import { useSelector } from 'react-redux'


const UserList = () => {

    const getAllUser = useSelector((state) => state.user.getAllUser)

  return (
    <Fragment>
        

        <List className='my-4' itemLayout="horizontal">
          {getAllUser.users.map((user) => (
            <UserItem key={user._id} user={user} />
          ))}
        </List>
   
    </Fragment>
  )
}

export default UserList
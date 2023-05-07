import { List } from 'antd'
import React, { Fragment } from 'react'

import UserItem from '../listItem.js/UserItem'
import { useSelector } from 'react-redux'
import LoadingSpinner from '../spinner/LoadingSpinner'
import EmptyComponent from '../empty/EmptyComponent'


const UserList = () => {

    const getAllUser = useSelector((state) => state.user.getAllUser)

  return (
    <Fragment>
        

        {getAllUser.loading ? <LoadingSpinner /> : getAllUser.users.length === 0 ? <EmptyComponent /> :   (
          <List className='my-4' itemLayout="horizontal">
          {getAllUser.users.map((user) => (
            <UserItem key={user._id} user={user} />
          ))}
        </List>
        )}
   
    </Fragment>
  )
}

export default UserList
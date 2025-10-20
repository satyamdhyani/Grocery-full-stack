import React from 'react'
import { useSelector } from 'react-redux'
import IsAdmin from '../utils/IsAdmin'

const AdminPermission = ({children}) => {
    const user = useSelector(state => state.user)
  return (
    <>
      {
        IsAdmin(user.role) ? children : <p className='text-red-600 bg-red-100 p-4'>Dont have permision</p>
      }
    </>
  )
}

export default AdminPermission

import React from 'react'
import {useDispatch} from 'react-redux'
import authService from '../../appwrite/auth'
import {logout} from '../../store/authSlice'

function LogoutBtn() {
    const dispatch = useDispatch()
    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout())
        })
    }
  return (
    <button
    className='inline-block px-6 py-2 border border-blue-500 text-blue-500 rounded-full font-medium transition duration-300 hover:scale-105 hover:shadow-lg bg-blue-100 active:scale-95'
    onClick={logoutHandler}
    >Logout</button>
  )
}

export default LogoutBtn
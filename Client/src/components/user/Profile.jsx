import React, { useContext } from 'react'
import AppContext from '../../context/AppContext'



const Profile = () => {
    const {user} = useContext(AppContext)
  return (
    <div>
      <div className="container text-center my-5">
        <h1>Wecome,{user?.name}</h1>
        <h3>{user?.email}</h3>
      </div>
    </div>
  )
}

export default Profile

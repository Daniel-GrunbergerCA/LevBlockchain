import React, { useState, useEffect } from 'react'
import { getManager, getUserProfile } from '../axios_requests'
import UserChat from './UserChat'
import PropTypes, { string } from 'prop-types'
import { CContainer, CSpinner } from '@coreui/react'

ManagerChat.propTypes = {
  currentUser: PropTypes.shape({
    username: PropTypes.string,
    email: PropTypes.string,
    address: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    image: PropTypes.string,
  }),
}

export default function ManagerChat() {
  const [manager, setManager] = useState()
  const [currentUser, setCurrentUser] = useState()

  const getManagerData = async () => {
    let manager = await (await getManager()).data
    setManager(manager)
  }

  const getCurrentUser = async () => {
    let user = await (await getUserProfile()).data
    setCurrentUser(user)
  }

  useEffect(() => {
    getManagerData()
    getCurrentUser()
  }, [])

  if (currentUser === undefined || manager === undefined) {
    return (
      <>
        <CSpinner color="success" /> <br /> Loading...{' '}
      </>
    )
  }

  return (
    <div className='container h-100'>
      <UserChat  currentUser={currentUser} userToChat={manager} />
    </div>
  )
}

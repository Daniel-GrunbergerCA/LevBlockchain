import React from 'react'
import PropTypes from 'prop-types';
import {
    CModalHeader,
    CModalTitle,
} from '@coreui/react'


UserChatHeader.propTypes  = {
    currentUser: PropTypes.shape({
        username: PropTypes.string,
        email: PropTypes.string,
        address: PropTypes.string,
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        image: PropTypes.string,
      })
}

export default function UserChatHeader({currentUser}) {
  return (
    <div>
         <CModalHeader>
            <img src={`data:image/svg+xml;base64,${currentUser.image}`} alt="" width="32" height="34"
            style={{ margin: '10px'}} />
            {currentUser.username}
         </CModalHeader>
    </div>
  )
}

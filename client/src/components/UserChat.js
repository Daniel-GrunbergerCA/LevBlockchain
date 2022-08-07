import React, { useEffect, useState } from 'react'
import PropTypes, { string } from 'prop-types';
import { sendMessage, getCurrentUser, getAllMessages } from '../axios_requests'
import '../scss/userChat.css'
import { CSpinner } from '@coreui/react';

UserChat.propTypes  = {
    userToChat: PropTypes.shape({
        username: PropTypes.string,
        email: PropTypes.string,
        address: PropTypes.string,
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        image: PropTypes.string,
      }),
      currentUser: PropTypes.shape({
        username: PropTypes.string,
        email: PropTypes.string,
        address: PropTypes.string,
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        image: PropTypes.string,
      }),
}


export default function UserChat({userToChat, currentUser}) {

    async function getAllMessagesData() {
       
    const resp =  (await getAllMessages(userToChat)).data;
    console.log(resp);
    setAllMessages(resp);
    }

    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const handleSend = async () => {
    await sendMessage(userToChat.username, msg);
    getAllMessagesData();
    setMsg('');
}

    useEffect( () => {
        getAllMessagesData();
    }, []);


    const [msg, setMsg] = useState('');

    const [allMessages, setAllMessages] = useState([]);


  return (
    <div>
      <div className="col-12 px-0">
      <div className="px-14 py-15 chat-box bg-white">

      {allMessages.map((message) => (
        message.fromSelf
      ? (
        <div className='senderChat'>
        <div style={{"float": "right"}}  className="media w-50  ml-auto mb-3"><img src={`data:image/svg+xml;base64,${currentUser.image}`} height={50}  alt="user"  className="rounded-circle"/>
        <div className="media-body ml-3">
          <div className="bg-light rounded py-2 px-3 mb-2">
            <p className="text-small mb-0 text-muted">{message.message}</p>
          </div>
          <p className="small text-muted">{message.updatedAt}</p>
        </div>
      </div>
      </div>
      )
      : (
        <div className='receiver-chat'>
        <div className="media w-50 ml-auto mb-3" >
            <img src={`data:image/svg+xml;base64,${userToChat.image}`} alt="user" height={50} className="rounded-circle"/>
        <div className="media-body mb-3">
            <div className="bg-primary rounded py-2 px-3 mb-2">
            <p className="text-small mb-0 text-white">{message.message}</p>
            </div>
            <p className="small text-muted">{message.updateAt}</p>
        </div>
    </div>
    </div>
      )
    ))}
        </div>
        </div>
        <footer className='footer'> 
        <div className="input-group mb-3">
        <input type="text" className="form-control" placeholder="Type your message..."
         aria-label="Recipient's username" aria-describedby="basic-addon2"
         value={msg}
         onChange={(e) => setMsg(e.target.value) }
         />
        <button  className="input-group-text" id="basic-addon2" onClick={handleSend}>Send</button>
        </div>
        </footer>
    </div>
  )
}

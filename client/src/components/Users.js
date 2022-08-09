import React, { useEffect, useState } from 'react'
import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CButton,
  CModal,
  CModalBody,
  CModalHeader,
  CModalFooter,
  CModalTitle,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilPeople
} from '@coreui/icons'

import { getAllUsers, deleteUser, getUserProfile } from '../axios_requests'
import  EditForm  from './EditForm'
import { BsFillChatLeftTextFill , BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";
import UserChat from './UserChat'
import UserChatHeader from './UserChatHeader'



export default function Users() {


  const [visible, setVisible] = useState(false)
  const [username, setUsername] = useState('')
  const [currentUser, setcurrentUser] = useState()

  const [openChat, setOpenChat] = useState(false)

  const [users, setUsers] = useState([]);

  const getUsersData = async () => {
        try {
            const data = await getAllUsers();
            const users = data.data;
            setUsers(users);
        } catch (e) {
            console.log(e);
        }
    };

    const handleEdit = (username) => {
       setVisible(true);
       setUsername(username);
    }

    const isVisible = (currUsername) => {
      return visible && currUsername === username;
    }

    const isVisibleChat = (currUsername) => { 
      return openChat && currUsername === username;
    }

    const handleClose = async () => {
      setVisible(false)
      setUsername('');
      await getUsersData();
    };

    const handleCloseChat = async () => {
      setOpenChat(false);
      setUsername('');
      await getUsersData();
    };

    const handleOpenChat = async (user) => {
      let currUser = await getUserProfile();
      setcurrentUser(currUser.data);
      setUsername(user);
      setOpenChat(true);
      
    }


    const handleDelete = async (username) => {
    
    const data = new URLSearchParams();
    data.append("username", username)
      deleteUser(data)
          .catch(err => console.log(err))

    await getUsersData();
    }


    useEffect(()=> {
        getUsersData();
    }, []);


  return (
    <div>
      <CTable align="middle" className="mb-0 border" hover responsive>
        <CTableHead color="dark">
          <CTableRow>
            <CTableHeaderCell className="text-center">
              <CIcon icon={cilPeople} />
            </CTableHeaderCell>
            <CTableHeaderCell className="text-center">FirstName</CTableHeaderCell>
            <CTableHeaderCell className="text-center">LastName</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Username</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Email</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Address</CTableHeaderCell>
            <CTableHeaderCell className="text-center"></CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {users.map((item, index) => (
            <CTableRow v-for="item in tableItems" key={index}>
              <CTableDataCell className="text-center">
              <img  src={`data:image/svg+xml;base64,${item.image}`} />
              </CTableDataCell>
              <CTableDataCell className="text-center">
                <div>{item.firstName}</div>
              </CTableDataCell>
              <CTableDataCell className="text-center">
                <div>{item.lastName}</div>
              </CTableDataCell>
              <CTableDataCell className="text-center">
                <div>{item.username}</div>
              </CTableDataCell>
              <CTableDataCell className="text-center">
                <div>{item.email}</div>
              </CTableDataCell>
              <CTableDataCell className="text-center">
                <div>{item.address}</div>
              </CTableDataCell>
              <button type="button" className="btn btn-info  rounded-pill" onClick={() => {handleEdit(item.username)} }>
                <BsFillPencilFill color='green'/>
              </button>
              <button type="button" className="btn btn-info  rounded-pill" onClick={() => handleDelete(item.username)}>
                <BsFillTrashFill color='green' />
              </button>
              <button  className="btn btn-info  rounded-pill"  onClick={() => {handleOpenChat(item.username)}}>
                 <BsFillChatLeftTextFill color='green'/> 
                </button>
              <CModal visible={isVisible(item.username)}>
              <CModalHeader>
              <CModalTitle>Edit user</CModalTitle>
              </CModalHeader>
              <CModalBody>
              <EditForm user={item}  onClose={handleClose}/>
              </CModalBody>
              <CModalFooter>
              <CButton color="secondary" onClick={handleClose}>
                Close
              </CButton>
            </CModalFooter>
              </CModal>

              <CModal visible={isVisibleChat(item.username)}>
             <UserChatHeader currentUser={item}/>
              <CModalBody>
              <UserChat userToChat={item} currentUser={currentUser}  onClose={handleCloseChat}/>
              </CModalBody>
              </CModal>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </div>
  )
}

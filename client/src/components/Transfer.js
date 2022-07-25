import React, { useEffect, useState } from 'react'
import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CAvatar,
  CButton,
  CModal,
  CModalBody,
  CModalHeader,
  CModalFooter,
  CModalTitle,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CFormSelect
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilPeople
} from '@coreui/icons'

import { getAllUsers, deleteUser, getUserProfile, getCoinValueInUSD, getCoinValueInNIS , sendMoney} from '../axios_requests'
import Avatar from '@material-ui/core/Avatar'
import { cilLockLocked, cilUser } from '@coreui/icons'
import  EditForm  from './EditForm'
import { BsFillChatLeftTextFill , BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";
import UserChat from './UserChat'
import UserChatHeader from './UserChatHeader'


const currencies = {
    LevCoin: "LevCoin",
    USD: "USD",
    NIS: "NIS",
}
export default function Transfer() {


  const [visible, setVisible] = useState(false)
  const [username, setUsername] = useState('');
  const [currency, setCurrency] = useState(currencies.LevCoin);
  const [ammount, setAmmount] = useState(0);


  const [users, setUsers] = useState([]);

  const handleCurrencyChange = async (e) => {
    setCurrency(e.target.value);
    let resp, coinValue;
    if (e.target.value === currencies.USD) {
        resp = await getCoinValueInUSD();
        coinValue = resp.data.value;
    } else if (e.target.value === currencies.NIS) {
        resp = await getCoinValueInNIS();
        coinValue = resp.data.value;
    } else {
        coinValue = 1;
    }

};

  const getUsersData = async () => {
        try {
            const data = await getAllUsers();
            const users = data.data;
            setUsers(users);
        } catch (e) {
            console.log(e);
        }
    };

    const isVisible = (currUsername) => {
      return visible && currUsername === username;
    }

    const handleClose = async () => {
      setVisible(false)
      setUsername('');
      await getUsersData();
    };

    const handleTransferModal = async (user) => {
        setUsername(user);
        setVisible(true);
    };

    const handleTransfer = async () => {
        console.log(username, ammount, currency);
   //     await sendMoney(username, ammount,currency);
    };




    useEffect(async ()=> {
        getUsersData();
    }, []);


  return (
    <div>
      <CTable align="middle" className="mb-0 border" hover responsive>
        <CTableHead color="light">
          <CTableRow>
            <CTableHeaderCell className="text-center">
              <CIcon icon={cilPeople} />
            </CTableHeaderCell>
            <CTableHeaderCell className="text-center">FirstName</CTableHeaderCell>
            <CTableHeaderCell className="text-center">LastName</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Username</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Email</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Address</CTableHeaderCell>
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
              <CButton color="info" shape="rounded-pill" onClick={() => {handleTransferModal(item.username)}}>Transfer</CButton>
        
              <CModal visible={isVisible(item.username)}>
              <CModalHeader>
              <CModalTitle>Transfer</CModalTitle>
              </CModalHeader>
              <CModalBody>
                            <CInputGroup className="mb-2"  >
                            <CFormInput  style={{"width": "30%"}}  onChange={e => setAmmount(e.target.value)}  />
                            <CFormSelect  onChange={((e) => {handleCurrencyChange(e)})} value={currency}>
                            <option value="LevCoin">LevCoin</option>
                            <option value="USD">USD</option>
                            <option value="NIS">NIS</option>
                            </CFormSelect>
                            </CInputGroup>
              </CModalBody>
              <CModalFooter>
              <CButton color="success" onClick={handleTransfer}>
                Send
              </CButton>
              <CButton color="secondary" onClick={handleClose}>
                Close
              </CButton>
            </CModalFooter>
              </CModal>

            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </div>
  )
}
